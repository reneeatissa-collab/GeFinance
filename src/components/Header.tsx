import React from 'react';
import { CountryConfig } from '../types';
import { CentralRefreshButton } from './CentralRefreshButton';
import { 
  Compass, 
  Wallet, 
  TreePine, 
  TrendingUp, 
  FileCheck,
  Building2,
} from 'lucide-react';

export type ActiveTab = 'strategic' | 'cashflow' | 'esg' | 'macro' | 'report';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  currentCountry: CountryConfig;
  onRefresh: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  currentCountry,
  onRefresh,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 flex items-center justify-center text-white shadow-md shadow-emerald-900/30 border border-emerald-400/30">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-tight text-white font-sans bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  GeFinance
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {currentCountry.flag} {currentCountry.currencySymbol}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Gestão Estratégica & Financeira • Modelos • Projeções • ESG
              </p>
            </div>
          </div>
        </div>

        {/* Centralized Curved Rectangular Refresh Button */}
        <div className="w-full md:w-auto flex justify-center order-first md:order-none py-1 md:py-0">
          <CentralRefreshButton onSoftRefresh={onRefresh} />
        </div>

        {/* Quick Country Pill indicator */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Moeda Ativa: <strong className="text-slate-200">{currentCountry.currencyCode} ({currentCountry.currencySymbol})</strong></span>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto scrollbar-none border-t border-slate-900/80">
        <nav className="flex space-x-1 sm:space-x-2 py-2" aria-label="Abas Principais">
          <button
            id="tab-nav-strategic"
            type="button"
            onClick={() => onTabChange('strategic')}
            className={`
              flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer
              ${activeTab === 'strategic' 
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-900/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}
            `}
          >
            <Compass className="w-4 h-4" />
            <span>1. Modelos Estratégicos (SWOT, Canvas, etc.)</span>
          </button>

          <button
            id="tab-nav-cashflow"
            type="button"
            onClick={() => onTabChange('cashflow')}
            className={`
              flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer
              ${activeTab === 'cashflow' 
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-900/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}
            `}
          >
            <Wallet className="w-4 h-4" />
            <span>2. Fluxo de Caixa & Projeções Automáticas</span>
          </button>

          <button
            id="tab-nav-esg"
            type="button"
            onClick={() => onTabChange('esg')}
            className={`
              flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer
              ${activeTab === 'esg' 
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-900/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}
            `}
          >
            <TreePine className="w-4 h-4" />
            <span>3. Modelo ESG & Sala com Investidores</span>
          </button>

          <button
            id="tab-nav-macro"
            type="button"
            onClick={() => onTabChange('macro')}
            className={`
              flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer
              ${activeTab === 'macro' 
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-900/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}
            `}
          >
            <TrendingUp className="w-4 h-4" />
            <span>4. Fatores Macroeconômicos (Inflação, Câmbio, Juros)</span>
          </button>

          <button
            id="tab-nav-report"
            type="button"
            onClick={() => onTabChange('report')}
            className={`
              flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer
              ${activeTab === 'report' 
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-900/30' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}
            `}
          >
            <FileCheck className="w-4 h-4" />
            <span>5. Relatório Executivo</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
