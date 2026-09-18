import React, { useState, useEffect } from 'react';
import { CountryCode, CountryConfig } from './types';
import { COUNTRIES } from './data/countries';
import { Header, ActiveTab } from './components/Header';
import { CountryContextBanner } from './components/CountryContextBanner';
import { StrategicModelsView } from './components/StrategicModelsView';
import { CashFlowView } from './components/CashFlowView';
import { ESGInvestorsView } from './components/ESGInvestorsView';
import { MacroeconomicsView } from './components/MacroeconomicsView';
import { ExecutiveReportView } from './components/ExecutiveReportView';
import { CentralRefreshButton } from './components/CentralRefreshButton';
import { 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  HeartHandshake, 
  CheckCircle2,
  ArrowUp
} from 'lucide-react';

export default function App() {
  // Default country is Moçambique (MZ) as explicitly requested by user
  const [currentCountryCode, setCurrentCountryCode] = useState<CountryCode>(() => {
    const saved = localStorage.getItem('app_active_country');
    return (saved as CountryCode) || 'MZ';
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    const saved = localStorage.getItem('app_active_tab');
    return (saved as ActiveTab) || 'strategic';
  });

  const [refreshKey, setRefreshKey] = useState(0);

  const currentCountry: CountryConfig = COUNTRIES[currentCountryCode] || COUNTRIES.MZ;
  const allCountriesList = Object.values(COUNTRIES);

  const handleCountryChange = (code: CountryCode) => {
    setCurrentCountryCode(code);
    localStorage.setItem('app_active_country', code);
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    localStorage.setItem('app_active_tab', tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRefreshApp = () => {
    // Soft refresh: increment key to trigger recalculations and state refresh
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div key={refreshKey} className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* 1. Sticky Navigation Header with Centered Curved Rectangular Refresh Button */}
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        currentCountry={currentCountry}
        onRefresh={handleRefreshApp}
      />

      {/* 2. Country Context & Real-time Macro Bar (Moçambique & others) */}
      <CountryContextBanner
        country={currentCountry}
        onCountryChange={handleCountryChange}
        allCountries={allCountriesList}
      />

      {/* 3. Main Workspace Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'strategic' && (
          <StrategicModelsView countryName={currentCountry.name} />
        )}

        {activeTab === 'cashflow' && (
          <CashFlowView country={currentCountry} />
        )}

        {activeTab === 'esg' && (
          <ESGInvestorsView country={currentCountry} />
        )}

        {activeTab === 'macro' && (
          <MacroeconomicsView
            country={currentCountry}
            onCountryChange={handleCountryChange}
            allCountries={allCountriesList}
          />
        )}

        {activeTab === 'report' && (
          <ExecutiveReportView country={currentCountry} />
        )}
      </main>

      {/* 4. Footer with Quick Floating Refresh and Country Indicator */}
      <footer className="border-t border-slate-900 bg-slate-950/95 py-8 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
              {currentCountry.flag}
            </div>
            <div>
              <p className="font-bold text-slate-200 flex items-center gap-1.5">
                <span className="text-emerald-400">GeFinance</span>
                <span className="text-slate-400 font-normal">• Gestão Estratégica & Financeira</span>
              </p>
              <p className="text-[11px] text-slate-500">
                Moçambique ({currentCountry.currencySymbol} - Taxa MIMO {COUNTRIES.MZ.benchmarkRateValue}%) e Mercados Globais
              </p>
            </div>
          </div>

          {/* Centralized Curved Refresh Button reminder in footer */}
          <div className="flex flex-col items-center gap-1.5">
            <CentralRefreshButton onSoftRefresh={handleRefreshApp} />
            <span className="text-[10px] text-slate-500">
              Sincronização em tempo real de modelos e caixa
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Voltar ao Topo</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
