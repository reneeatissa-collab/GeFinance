import React, { useState } from 'react';
import { CountryConfig, MacroeconomicFactor } from '../types';
import { MACROECONOMIC_FACTORS } from '../data/macroTopics';
import { 
  TrendingUp, 
  Landmark, 
  HelpCircle, 
  Calculator, 
  ChevronDown, 
  ChevronUp, 
  ShieldAlert, 
  Lightbulb, 
  BookOpen, 
  Coins, 
  Globe2, 
  ArrowRight,
  Info
} from 'lucide-react';

interface MacroeconomicsViewProps {
  country: CountryConfig;
  onCountryChange: (code: any) => void;
  allCountries: CountryConfig[];
}

export const MacroeconomicsView: React.FC<MacroeconomicsViewProps> = ({
  country,
  onCountryChange,
  allCountries,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('inflation');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // Inflation Calculator State
  const [calcCost, setCalcCost] = useState<number>(1000);
  const [calcInflationRate, setCalcInflationRate] = useState<number>(country.annualInflationRate || 5);
  const [calcTargetMargin, setCalcTargetMargin] = useState<number>(25); // %

  // Interest Rate Loan Simulator State
  const [calcLoanAmount, setCalcLoanAmount] = useState<number>(1000000);
  const [calcBankSpread, setCalcBankSpread] = useState<number>(6.5); // % above benchmark
  const [calcLoanTermMonths, setCalcLoanTermMonths] = useState<number>(24);

  const activeTopic =
    MACROECONOMIC_FACTORS.find((t) => t.id === selectedTopicId) ||
    MACROECONOMIC_FACTORS[0];

  // Inflation calculations
  const inflatedCost = calcCost * (1 + calcInflationRate / 100);
  const recommendedPrice = inflatedCost / (1 - calcTargetMargin / 100);
  const oldPrice = calcCost / (1 - calcTargetMargin / 100);
  const priceDifference = recommendedPrice - oldPrice;
  const marginWithoutAdjustment = ((oldPrice - inflatedCost) / oldPrice) * 100;

  // Loan interest calculation
  const totalAnnualRate = country.benchmarkRateValue + calcBankSpread;
  const monthlyRate = totalAnnualRate / 12 / 100;
  // PMT formula
  const monthlyPayment =
    (calcLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, calcLoanTermMonths)) /
    (Math.pow(1 + monthlyRate, calcLoanTermMonths) - 1);
  const totalRepayment = monthlyPayment * calcLoanTermMonths;
  const totalInterestPaid = totalRepayment - calcLoanAmount;

  const formatMoney = (val: number) => {
    return `${country.currencySymbol} ${val.toLocaleString('pt-PT', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div id="macroeconomics-view-container" className="space-y-6">
      {/* 1. Header with Country Context */}
      <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white">
                Fatores Macroeconômicos & Análise de Mercado
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Compreenda didaticamente como a inflação, taxas de juro ({country.benchmarkRateName}) e variações cambiais afetam o caixa da sua empresa.
            </p>
          </div>

          {/* Inline country switcher */}
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <Globe2 className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-400">Ver cenário de:</span>
            <select
              value={country.code}
              onChange={(e) => onCountryChange(e.target.value)}
              className="bg-transparent font-bold text-emerald-400 focus:outline-none cursor-pointer"
            >
              {allCountries.map((c) => (
                <option key={c.code} value={c.code} className="bg-slate-900 text-slate-100">
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Country Card */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800 text-xs">
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[11px] block">Banco Central:</span>
            <span className="font-bold text-slate-200 mt-0.5 block">{country.centralBank}</span>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[11px] block">Taxa de Juro Oficial:</span>
            <span className="font-bold text-cyan-400 mt-0.5 block">
              {country.benchmarkRateName} ({country.benchmarkRateValue}%)
            </span>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[11px] block">Inflação Anual Média:</span>
            <span className="font-bold text-amber-400 mt-0.5 block">
              {country.annualInflationRate}% a.a.
            </span>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[11px] block">Imposto IVA / VAT:</span>
            <span className="font-bold text-emerald-400 mt-0.5 block">
              {country.taxStandardRate}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. Topic Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {MACROECONOMIC_FACTORS.map((factor) => {
          const isSelected = factor.id === selectedTopicId;
          return (
            <button
              key={factor.id}
              type="button"
              onClick={() => setSelectedTopicId(factor.id)}
              className={`
                p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex flex-col justify-between
                ${isSelected
                  ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 font-bold shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'}
              `}
            >
              <span className="line-clamp-2 leading-tight">{factor.title.split(' ')[0]} {factor.title.split(' ')[1]}</span>
              <span className="text-[10px] text-slate-500 mt-1">Guia & Estratégias</span>
            </button>
          );
        })}
      </div>

      {/* 3. Deep Topic View */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg space-y-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
            <BookOpen className="w-4 h-4" />
            <span>Guia Econômico Prático para Empreendedores</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            {activeTopic.title}
          </h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            {activeTopic.shortDefinition}
          </p>
        </div>

        {/* Detailed Explanation */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Como Funciona a Dinâmica Macroeconômica:
          </h4>
          <div className="text-xs text-slate-300 leading-relaxed space-y-2 whitespace-pre-line bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            {activeTopic.deepExplanation}
          </div>
        </div>

        {/* Two Columns: Why It Matters & How to Mitigate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Why It Matters */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <ShieldAlert className="w-4 h-4" />
              <span>Por Que Afeta Diretamente o Seu Negócio:</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {activeTopic.whyItMattersForEntrepreneurs.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Strategic Actions to Mitigate */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Lightbulb className="w-4 h-4" />
              <span>Estratégias de Blindagem Financeira:</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {activeTopic.strategiesToMitigate.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Calculation Case */}
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
            <Calculator className="w-4 h-4" />
            <span>Exemplo Prático de Cálculo de Impacto:</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-mono">
            {activeTopic.practicalCalculationExample}
          </p>
        </div>

        {/* Glossary Terms */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Termos-Chave e Conceitos Financeiros:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {activeTopic.keyTerms.map((term, i) => (
              <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                <span className="font-bold text-emerald-300 block mb-1">{term.term}</span>
                <span className="text-slate-400 text-[11px] leading-relaxed">{term.definition}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Interactive Macro Calculators (Inflação & Juros) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calculator 1: Repasse da Inflação no Preço de Venda */}
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-lg space-y-4">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Calculadora de Repasse de Inflação
              </h3>
              <p className="text-[11px] text-slate-400">
                Descubra qual deve ser o novo preço de venda para não perder margem
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">
                Custo Unitário Atual ({country.currencySymbol}):
              </label>
              <input
                type="number"
                value={calcCost}
                onChange={(e) => setCalcCost(Number(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 font-mono focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">
                  Inflação de Custos (%):
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={calcInflationRate}
                  onChange={(e) => setCalcInflationRate(Number(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">
                  Margem Alvo Desejada (%):
                </label>
                <input
                  type="number"
                  value={calcTargetMargin}
                  onChange={(e) => setCalcTargetMargin(Number(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Results Box */}
            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Custo Ajustado com Inflação:</span>
                <span className="font-mono font-bold text-amber-400">
                  {formatMoney(inflatedCost)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Novo Preço de Venda Recomendado:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {formatMoney(recommendedPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800">
                <span className="text-rose-400 font-semibold">
                  Se você NÃO reajustar o preço:
                </span>
                <span className="font-mono text-rose-400">
                  Margem despenca para {marginWithoutAdjustment.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Calculator 2: Custo do Financiamento Bancário com Taxa MIMO / Selic */}
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-lg space-y-4">
          <div className="flex items-center gap-2">
            <Landmark className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Simulador de Custo do Empréstimo Bancário
              </h3>
              <p className="text-[11px] text-slate-400">
                Taxa {country.benchmarkRateName} ({country.benchmarkRateValue}%) + Spread Comercial
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">
                Valor do Empréstimo Solicitado ({country.currencySymbol}):
              </label>
              <input
                type="number"
                value={calcLoanAmount}
                onChange={(e) => setCalcLoanAmount(Number(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">
                  Spread Bancário Adicional (% a.a.):
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={calcBankSpread}
                  onChange={(e) => setCalcBankSpread(Number(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">
                  Prazo de Amortização (Meses):
                </label>
                <input
                  type="number"
                  value={calcLoanTermMonths}
                  onChange={(e) => setCalcLoanTermMonths(Number(e.target.value) || 1)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Loan Results Box */}
            <div className="p-4 bg-slate-950 rounded-xl border border-cyan-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Taxa Efetiva Anual (MIMO + Spread):</span>
                <span className="font-mono font-bold text-cyan-400">
                  {totalAnnualRate.toFixed(2)}% a.a.
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Prestação Mensal Estimada:</span>
                <span className="font-mono font-bold text-white text-sm">
                  {formatMoney(monthlyPayment)}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800">
                <span className="text-slate-400">Total de Juros Pagos ao Banco:</span>
                <span className="font-mono font-bold text-rose-400">
                  {formatMoney(totalInterestPaid)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
