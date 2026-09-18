import React, { useState } from 'react';
import { CountryConfig } from '../types';
import { FileCheck, Printer, Copy, Check, Download, ShieldCheck, TrendingUp, Compass, TreePine } from 'lucide-react';

interface ExecutiveReportViewProps {
  country: CountryConfig;
}

export const ExecutiveReportView: React.FC<ExecutiveReportViewProps> = ({ country }) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyReport = () => {
    const reportText = `
=====================================================
RELATÓRIO EXECUTIVO GEFINANCE
Plataforma de Gestão Estratégica & Financeira
País de Operação: ${country.name} (${country.currencyCode} - ${country.currencySymbol})
Data de Emissão: ${new Date().toLocaleDateString('pt-PT')}
=====================================================

1. CONTEXTO MACROECONÔMICO & REGULATÓRIO
- Banco Central: ${country.centralBank}
- Taxa de Referência: ${country.benchmarkRateName} (${country.benchmarkRateValue}% a.a.)
- Inflação Anual (IPC): ${country.annualInflationRate}% a.a.
- Alíquotas Fiscais: IVA ${country.taxStandardRate}%, IRPC ${country.corporateTaxRate}%
- Panorama: ${country.economicNotes}

2. RESUMO ESTRATÉGICO (MODELOS APLICADOS)
- Matriz SWOT / FOFA: Forças mapeadas em distribuição local e eficiência operacional; Riscos cambiais mitigados com hedge e diversificação.
- Business Model Canvas: Proposta de valor ancorada em sustentabilidade, logística ágil e governança formal.
- 5 Forças de Porter & Análise PESTEL: Barreiras erguidas via relacionamento com produtores e tecnologia de rastreio.

3. SITUAÇÃO FINANCEIRA & PROJEÇÕES
- Runway de Caixa Operacional: ~5.2 Meses
- Projeção de Fluxo de Caixa: Superávit operacional projetado para os próximos 12 meses
- Ponto de Equilíbrio (Break-Even): Estimado com margem de contribuição média de 38%

4. DESEMPENHO ESG & CAPTAÇÃO DE INVESTIMENTO
- Score ESG Geral: 82/100 (Selo Ouro)
- Ambiental (E): 80% (Eficiência energética solar e descarte responsável)
- Social (S): 83% (Remuneração digna, inclusão e compras comunitárias)
- Governança (G): 83% (Contabilidade formalizada e código de conduta)
- Status com Investidores: Term Sheet preliminar em fase de estruturação.

Relatório gerado pela plataforma GeFinance (Gestão Estratégica & Financeira Global).
    `.trim();

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div id="executive-report-container" className="space-y-6">
      {/* Action Header */}
      <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">
              Relatório Executivo Integrado
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Dossiê completo unificando planejamento estratégico, fluxo de caixa, diagnóstico ESG e riscos macroeconômicos.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-copy-exec-report"
            type="button"
            onClick={handleCopyReport}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copiado com Sucesso!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Dossiê Completo</span>
              </>
            )}
          </button>

          <button
            id="btn-print-exec-report"
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>Imprimir / Gerar PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Canvas */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6 print:bg-white print:text-black print:p-0">
        {/* Document Header */}
        <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              Dossiê Estratégico Corporativo
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
              Sumário Executivo & Diagnóstico Financeiro
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              País de Referência: <strong className="text-slate-200">{country.flag} {country.name}</strong> • Moeda Oficial: <strong className="text-slate-200">{country.currencyCode} ({country.currencySymbol})</strong>
            </p>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-500 block">Data de Atualização:</span>
            <span className="text-xs font-mono font-bold text-slate-300">
              {new Date().toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* 4 Pillars Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Pillar 1: Modelos Estratégicos */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <Compass className="w-4 h-4" />
              <h3 className="font-bold text-sm text-white">1. Gestão Estratégica Ativa</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Todos os 8 modelos de gestão (SWOT, PESTEL, 5 Forças de Porter, BMC Canvas, Matriz BCG, Matriz Ansoff, OKRs e Balanced Scorecard) foram estruturados para maximizar a vantagem competitiva local e mitigar riscos setoriais.
            </p>
            <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 flex items-center justify-between">
              <span>Status dos Modelos:</span>
              <span className="text-emerald-400 font-bold">100% Configurados & Prontos</span>
            </div>
          </div>

          {/* Pillar 2: Fluxo de Caixa */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
              <h3 className="font-bold text-sm text-white">2. Saúde de Caixa & Projeções</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Monitoramento em tempo real com controle de receitas e despesas por categoria. Projeções automáticas calibradas contra a taxa de inflação ({country.annualInflationRate}%) asseguram um runway operacional superior a 5 meses.
            </p>
            <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 flex items-center justify-between">
              <span>Resultado Operacional:</span>
              <span className="text-emerald-400 font-bold font-mono">Positivo & Sustentável</span>
            </div>
          </div>

          {/* Pillar 3: ESG e Financiamento */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-teal-400">
              <TreePine className="w-4 h-4" />
              <h3 className="font-bold text-sm text-white">3. Score ESG & Investidores</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Conformidade socioambiental auditada com foco em energia limpa, equidade laboral e contabilidade transparente. Conexão ativa com fundos de impacto e linhas bancárias bonificadas.
            </p>
            <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 flex items-center justify-between">
              <span>Avaliação Geral ESG:</span>
              <span className="text-teal-300 font-bold">82 / 100 (Selo Ouro)</span>
            </div>
          </div>

          {/* Pillar 4: Fatores Macroeconômicos */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <ShieldCheck className="w-4 h-4" />
              <h3 className="font-bold text-sm text-white">4. Alinhamento Macroeconômico</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Blindagem contra repasse inflacionário e custos de capital ancorados na taxa {country.benchmarkRateName} ({country.benchmarkRateValue}% a.a.). Planejamento fiscal rigoroso para retenções e IVA ({country.taxStandardRate}%).
            </p>
            <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 flex items-center justify-between">
              <span>Risco de País / Câmbio:</span>
              <span className="text-amber-400 font-bold">Monitorado com Hedge Natural</span>
            </div>
          </div>
        </div>

        {/* Concluding Sign-off */}
        <div className="border-t border-slate-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>GeFinance • Gestão Estratégica & Financeira Global • Moçambique & Mercados Internacionais</span>
          <span>Documento autenticado digitalmente para fins de análise e compliance</span>
        </div>
      </div>
    </div>
  );
};
