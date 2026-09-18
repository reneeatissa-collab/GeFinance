import React, { useState, useMemo } from 'react';
import { CountryConfig, Transaction, TransactionType } from '../types';
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet, 
  TrendingUp, 
  AlertCircle, 
  Clock, 
  Trash2, 
  Calendar, 
  CheckCircle2, 
  BarChart3, 
  Zap,
  Sliders
} from 'lucide-react';

interface CashFlowViewProps {
  country: CountryConfig;
}

const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_1',
    date: '2026-09-02',
    description: 'Venda de produtos agrícolas beneficiados - Contrato B2B',
    type: 'income',
    category: 'Vendas Corporativas',
    amount: 380000,
    status: 'paid',
    paymentMethod: 'Transferência Bancária (BCI)',
  },
  {
    id: 'tx_2',
    date: '2026-09-05',
    description: 'Pagamento de cooperativas de produtores rurais (Chókwè)',
    type: 'expense',
    category: 'Custo de Mercadoria / Insumos',
    amount: 145000,
    status: 'paid',
    paymentMethod: 'Transferência Eletrônica',
  },
  {
    id: 'tx_3',
    date: '2026-09-08',
    description: 'Folha de salários operacionais e técnicos',
    type: 'expense',
    category: 'Salários & Encargos',
    amount: 98000,
    status: 'paid',
    paymentMethod: 'Transferência Bancária',
  },
  {
    id: 'tx_4',
    date: '2026-09-12',
    description: 'Recebimento de entregas expressas via carteira móvel',
    type: 'income',
    category: 'Vendas Diretas',
    amount: 76500,
    status: 'paid',
    paymentMethod: 'M-Pesa / Carteira Móvel',
  },
  {
    id: 'tx_5',
    date: '2026-09-15',
    description: 'Guia de recolhimento de IVA (16%) à Autoridade Tributária',
    type: 'expense',
    category: 'Impostos & Taxas Fiscais',
    amount: 32000,
    status: 'paid',
    paymentMethod: 'Débito Fiscal',
  },
  {
    id: 'tx_6',
    date: '2026-09-18',
    description: 'Combustível e manutenção preventiva de viaturas de distribuição',
    type: 'expense',
    category: 'Logística & Transporte',
    amount: 24500,
    status: 'paid',
    paymentMethod: 'Cartão Corporativo',
  },
  {
    id: 'tx_7',
    date: '2026-09-22',
    description: 'Fornecimento para rede hoteleira de Maputo (A receber)',
    type: 'income',
    category: 'Vendas Corporativas',
    amount: 215000,
    status: 'pending',
    paymentMethod: 'Transferência Bancária',
  },
  {
    id: 'tx_8',
    date: '2026-09-28',
    description: 'Aluguel do armazém refrigerado central em Matola',
    type: 'expense',
    category: 'Aluguel & Infraestrutura',
    amount: 45000,
    status: 'pending',
    paymentMethod: 'Transferência Bancária',
  },
];

export const CashFlowView: React.FC<CashFlowViewProps> = ({ country }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(DEFAULT_TRANSACTIONS);
  const [initialCashBalance, setInitialCashBalance] = useState<number>(450000);
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Projection scenario tuning
  const [scenarioMode, setScenarioMode] = useState<'realistic' | 'optimistic' | 'conservative'>('realistic');
  const [revenueGrowthRate, setRevenueGrowthRate] = useState<number>(8); // % monthly
  const [fixedCostsMonthly, setFixedCostsMonthly] = useState<number>(180000);

  // New Transaction Form State
  const [isAddingTx, setIsAddingTx] = useState(false);
  const [newDesc, setNewDesc] = useState('');
  const [newType, setNewType] = useState<TransactionType>('income');
  const [newCategory, setNewCategory] = useState('Vendas Corporativas');
  const [newAmount, setNewAmount] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newStatus, setNewStatus] = useState<'paid' | 'pending'>('paid');
  const [newPaymentMethod, setNewPaymentMethod] = useState('Transferência Bancária');

  // Currency Formatter
  const formatMoney = (value: number) => {
    return `${country.currencySymbol} ${value.toLocaleString('pt-PT', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Real-time calculations
  const totals = useMemo(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    let pendingIncome = 0;
    let pendingExpense = 0;

    transactions.forEach((tx) => {
      if (tx.type === 'income') {
        if (tx.status === 'paid') totalIncome += tx.amount;
        else pendingIncome += tx.amount;
      } else {
        if (tx.status === 'paid') totalExpense += tx.amount;
        else pendingExpense += tx.amount;
      }
    });

    const netOperating = totalIncome - totalExpense;
    const currentActualCash = initialCashBalance + netOperating;
    const projectedShortTermCash = currentActualCash + pendingIncome - pendingExpense;

    return {
      totalIncome,
      totalExpense,
      pendingIncome,
      pendingExpense,
      netOperating,
      currentActualCash,
      projectedShortTermCash,
    };
  }, [transactions, initialCashBalance]);

  // Average Burn Rate & Runway Calculation
  const { burnRate, runwayMonths, breakEvenRevenue } = useMemo(() => {
    // Average monthly expenses
    const avgMonthlyExpense = totals.totalExpense > 0 ? totals.totalExpense : 200000;
    const netBurn = Math.max(0, avgMonthlyExpense - totals.totalIncome);
    
    // Runway: current cash / net burn (if burning) or cash / monthly expense
    const runway = netBurn > 0 
      ? totals.currentActualCash / netBurn 
      : totals.currentActualCash / (avgMonthlyExpense * 0.5 || 1);

    // Break-even: Fixed Costs / Contribution Margin (assuming ~35% contribution margin)
    const contributionMargin = 0.38;
    const breakEven = fixedCostsMonthly / contributionMargin;

    return {
      burnRate: netBurn,
      runwayMonths: Math.max(0.5, runway),
      breakEvenRevenue: breakEven,
    };
  }, [totals, fixedCostsMonthly]);

  // Automatic Projections for 3, 6, 12 Months
  const projections = useMemo(() => {
    const months = ['Mês +1', 'Mês +2', 'Mês +3', 'Mês +4', 'Mês +5', 'Mês +6', 'Mês +9', 'Mês +12'];
    
    // Scenario multipliers
    let revFactor = 1.0;
    let expFactor = 1.0;
    if (scenarioMode === 'optimistic') {
      revFactor = 1.15;
      expFactor = 1.02;
    } else if (scenarioMode === 'conservative') {
      revFactor = 0.88;
      expFactor = 1.06 + (country.annualInflationRate / 100);
    }

    let runningCash = totals.currentActualCash;
    const baseRev = Math.max(totals.totalIncome, 350000);
    const baseExp = Math.max(totals.totalExpense, 240000);

    return months.map((m, idx) => {
      const growthFactor = Math.pow(1 + (revenueGrowthRate / 100), idx + 1);
      const projectedIncome = baseRev * growthFactor * revFactor;
      const projectedExpense = baseExp * Math.pow(1 + (country.annualInflationRate / 1200), idx + 1) * expFactor;
      const net = projectedIncome - projectedExpense;
      runningCash += net;

      return {
        month: m,
        projectedIncome,
        projectedExpense,
        netCashFlow: net,
        cumulativeCash: runningCash,
      };
    });
  }, [totals, scenarioMode, revenueGrowthRate, country.annualInflationRate]);

  // Add Transaction Handler
  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(newAmount);
    if (!newDesc || isNaN(amountNum) || amountNum <= 0) return;

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      description: newDesc,
      type: newType,
      category: newCategory,
      amount: amountNum,
      date: newDate,
      status: newStatus,
      paymentMethod: newPaymentMethod,
    };

    setTransactions((prev) => [newTx, ...prev]);
    setNewDesc('');
    setNewAmount('');
    setIsAddingTx(false);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === 'paid' ? 'pending' : 'paid' } : t
      )
    );
  };

  const filteredTransactions = transactions.filter((t) => {
    if (filterType !== 'all' && t.type !== filterType) return false;
    if (searchQuery) {
      return (
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div id="cashflow-view-container" className="space-y-6">
      {/* 1. Real-time KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Saldo de Caixa Atual */}
        <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Saldo Atual em Caixa ({country.currencySymbol})</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-white tracking-tight">
            {formatMoney(totals.currentActualCash)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
            <span>Saldo inicial ajustável:</span>
            <input
              type="number"
              value={initialCashBalance}
              onChange={(e) => setInitialCashBalance(Number(e.target.value) || 0)}
              className="w-20 bg-slate-950 px-1 py-0.5 rounded text-emerald-400 border border-slate-800 text-[10px]"
            />
          </div>
        </div>

        {/* Receitas Realizadas */}
        <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Entradas / Receitas do Período</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-emerald-400 tracking-tight">
            {formatMoney(totals.totalIncome)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            + {formatMoney(totals.pendingIncome)} a receber
          </div>
        </div>

        {/* Despesas Pagas */}
        <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Saídas / Despesas Operacionais</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-rose-400 tracking-tight">
            {formatMoney(totals.totalExpense)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            + {formatMoney(totals.pendingExpense)} contas a pagar
          </div>
        </div>

        {/* Runway & Sobrevivência */}
        <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Runway Estimado (Sobrevivência)</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-black text-amber-400 tracking-tight">
            {runwayMonths.toFixed(1)} Meses
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Break-even mensal: {formatMoney(breakEvenRevenue)}
          </div>
        </div>
      </div>

      {/* 2. Seção de Projeções Automáticas */}
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-lg space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">
                Projeções Automáticas de Caixa (3 a 12 Meses)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulação dinâmica com ajuste à taxa de inflação de {country.name} ({country.annualInflationRate}% a.a.)
            </p>
          </div>

          {/* Scenario Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-medium">Cenário:</span>
            <button
              type="button"
              onClick={() => setScenarioMode('realistic')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                scenarioMode === 'realistic'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Realista (Base)
            </button>
            <button
              type="button"
              onClick={() => setScenarioMode('optimistic')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                scenarioMode === 'optimistic'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Otimista (+15%)
            </button>
            <button
              type="button"
              onClick={() => setScenarioMode('conservative')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                scenarioMode === 'conservative'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Conservador / Estresse
            </button>
          </div>
        </div>

        {/* Projection Parameters Control */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
          <div>
            <label className="text-slate-400 block mb-1">
              Crescimento Mensal de Vendas Esperado (%):
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={revenueGrowthRate}
                onChange={(e) => setRevenueGrowthRate(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <span className="font-bold text-emerald-400 w-10 text-right">
                {revenueGrowthRate}%
              </span>
            </div>
          </div>

          <div>
            <label className="text-slate-400 block mb-1">
              Custos Fixos Mensais ({country.currencySymbol}):
            </label>
            <input
              type="number"
              value={fixedCostsMonthly}
              onChange={(e) => setFixedCostsMonthly(Number(e.target.value) || 0)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-200 font-semibold focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">
              Impacto da Taxa MIMO / Juros no Crédito:
            </label>
            <div className="text-slate-300 font-bold flex items-center gap-1.5 py-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{country.benchmarkRateValue}% a.a. (Custo de Oportunidade)</span>
            </div>
          </div>
        </div>

        {/* Projections Table & Cards */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Horizonte</th>
                <th className="py-2.5 px-3">Receita Projetada</th>
                <th className="py-2.5 px-3">Despesa Projetada</th>
                <th className="py-2.5 px-3">Resultado Líquido</th>
                <th className="py-2.5 px-3 text-right">Saldo Acumulado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {projections.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-sans font-bold text-slate-200">
                    {p.month}
                  </td>
                  <td className="py-2.5 px-3 text-emerald-400">
                    {formatMoney(p.projectedIncome)}
                  </td>
                  <td className="py-2.5 px-3 text-rose-400">
                    {formatMoney(p.projectedExpense)}
                  </td>
                  <td
                    className={`py-2.5 px-3 font-bold ${
                      p.netCashFlow >= 0 ? 'text-emerald-300' : 'text-rose-300'
                    }`}
                  >
                    {p.netCashFlow >= 0 ? '+' : ''}
                    {formatMoney(p.netCashFlow)}
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-white">
                    {formatMoney(p.cumulativeCash)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Lançamentos em Tempo Real e Gestão */}
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">
              Lançamentos de Fluxo de Caixa em Tempo Real
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
              {transactions.length} registros
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-open-add-tx"
              type="button"
              onClick={() => setIsAddingTx(!isAddingTx)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Lançamento</span>
            </button>
          </div>
        </div>

        {/* Modal / Inline Add Form */}
        {isAddingTx && (
          <form
            onSubmit={handleAddTransaction}
            className="bg-slate-950 p-4 rounded-xl border border-emerald-500/40 space-y-3 animate-in fade-in duration-200"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-emerald-400">
                Registrar Movimentação Financeira
              </h4>
              <button
                type="button"
                onClick={() => setIsAddingTx(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                Cancelar
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Descrição</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Faturação de consultoria, Compra de adubo..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Tipo</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as TransactionType)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="income">Receita / Entrada (+)</option>
                  <option value="expense">Despesa / Saída (-)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">
                  Valor ({country.currencySymbol})
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  placeholder="0.00"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Categoria</label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Data</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Método / Canal</label>
                <select
                  value={newPaymentMethod}
                  onChange={(e) => setNewPaymentMethod(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Transferência Bancária">Transferência Bancária</option>
                  <option value="M-Pesa / Carteira Móvel">M-Pesa / Carteira Móvel</option>
                  <option value="e-Mola">e-Mola</option>
                  <option value="Cartão de Crédito/Débito">Cartão de Crédito/Débito</option>
                  <option value="Numerário / Dinheiro">Numerário / Dinheiro</option>
                  <option value="Cheque Bancário">Cheque Bancário</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as 'paid' | 'pending')}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="paid">Liquidado / Pago</option>
                  <option value="pending">Pendente / A Receber/Pagar</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Salvar Lançamento no Fluxo de Caixa
            </button>
          </form>
        )}

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filterType === 'all'
                  ? 'bg-slate-800 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Todos
            </button>
            <button
              type="button"
              onClick={() => setFilterType('income')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filterType === 'income'
                  ? 'bg-emerald-600/30 text-emerald-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Receitas (+)
            </button>
            <button
              type="button"
              onClick={() => setFilterType('expense')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filterType === 'expense'
                  ? 'bg-rose-600/30 text-rose-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Despesas (-)
            </button>
          </div>

          <input
            type="text"
            placeholder="Buscar por descrição, canal ou categoria..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Transactions List */}
        <div className="space-y-2">
          {filteredTransactions.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center italic">
              Nenhum lançamento encontrado com os filtros atuais.
            </p>
          ) : (
            filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl ${
                      tx.type === 'income'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-rose-500/10 text-rose-400'
                    }`}
                  >
                    {tx.type === 'income' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownLeft className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-100">{tx.description}</h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span>{tx.date}</span>
                      <span>•</span>
                      <span>{tx.category}</span>
                      <span>•</span>
                      <span>{tx.paymentMethod}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(tx.id)}
                    title="Clique para alternar entre Pago e Pendente"
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase cursor-pointer ${
                      tx.status === 'paid'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {tx.status === 'paid' ? 'Pago' : 'Pendente'}
                  </button>

                  <span
                    className={`font-mono font-bold text-sm ${
                      tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {tx.type === 'income' ? '+' : '-'} {formatMoney(tx.amount)}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleDeleteTransaction(tx.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                    title="Excluir lançamento"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
