import React from 'react';
import { CountryConfig } from '../types';
import { Landmark, TrendingUp, Percent, FileText, Info } from 'lucide-react';

interface CountryContextBannerProps {
  country: CountryConfig;
  onCountryChange: (code: any) => void;
  allCountries: CountryConfig[];
}

export const CountryContextBanner: React.FC<CountryContextBannerProps> = ({
  country,
  onCountryChange,
  allCountries,
}) => {
  return (
    <div
      id="country-context-banner"
      className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800 px-4 py-3 text-xs text-slate-300"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Country Selector & Flag */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="text-xl" role="img" aria-label={country.name}>
              {country.flag}
            </span>
            <label htmlFor="country-select-dropdown" className="font-semibold text-slate-200">
              País Ativo:
            </label>
            <select
              id="country-select-dropdown"
              value={country.code}
              onChange={(e) => onCountryChange(e.target.value)}
              className="bg-transparent font-bold text-emerald-400 focus:outline-none cursor-pointer pr-1"
            >
              {allCountries.map((c) => (
                <option key={c.code} value={c.code} className="bg-slate-900 text-slate-100">
                  {c.flag} {c.name} ({c.currencySymbol} - {c.currencyCode})
                </option>
              ))}
            </select>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
            <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate max-w-md">{country.economicNotes}</span>
          </div>
        </div>

        {/* Live Macro Indicators Bar */}
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap text-[11px]">
          <div className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-md border border-slate-800">
            <Landmark className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">{country.benchmarkRateName}:</span>
            <span className="font-bold text-cyan-300">{country.benchmarkRateValue}% a.a.</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-md border border-slate-800">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Inflação (IPC):</span>
            <span className="font-bold text-amber-300">{country.annualInflationRate}% a.a.</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-md border border-slate-800">
            <Percent className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">IVA / VAT:</span>
            <span className="font-bold text-emerald-300">{country.taxStandardRate}%</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-md border border-slate-800">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-400">IRPC / Corp:</span>
            <span className="font-bold text-indigo-300">{country.corporateTaxRate}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
