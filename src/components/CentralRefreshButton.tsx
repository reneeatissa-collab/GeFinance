import React, { useState } from 'react';
import { RefreshCw, Check, Sparkles } from 'lucide-react';

interface CentralRefreshButtonProps {
  onSoftRefresh?: () => void;
  className?: string;
}

export const CentralRefreshButton: React.FC<CentralRefreshButtonProps> = ({
  onSoftRefresh,
  className = '',
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setShowToast(true);

    if (onSoftRefresh) {
      onSoftRefresh();
    }

    setTimeout(() => {
      setIsRefreshing(false);
      setTimeout(() => setShowToast(false), 2400);
    }, 600);
  };

  const handleHardReload = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.reload();
  };

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Botão Centralizado Retangular Curvo para Atualização da Página */}
      <div className="flex items-center gap-2">
        <button
          id="btn-central-refresh"
          type="button"
          onClick={handleRefresh}
          title="Clique para atualizar em tempo real ou clique duas vezes para recarregar tudo"
          className={`
            group relative inline-flex items-center justify-center gap-2.5 px-6 py-2.5
            rounded-xl text-sm font-semibold tracking-wide
            transition-all duration-300 shadow-md cursor-pointer select-none
            border border-emerald-500/40 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600
            text-white hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500
            hover:shadow-lg hover:shadow-emerald-900/30 hover:scale-[1.02] active:scale-[0.98]
            focus:outline-none focus:ring-2 focus:ring-emerald-400/50
            ${isRefreshing ? 'opacity-90 ring-2 ring-emerald-400' : ''}
          `}
        >
          <RefreshCw
            className={`w-4 h-4 transition-transform duration-700 ${
              isRefreshing ? 'animate-spin text-white' : 'group-hover:rotate-180'
            }`}
          />
          <span className="whitespace-nowrap">
            {isRefreshing ? 'Atualizando Sistema...' : 'Atualizar Página & Dados'}
          </span>
          <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider bg-black/30 text-emerald-200 border border-emerald-400/20">
            F5 Sync
          </span>
        </button>

        {/* Botão rápido para recarga completa do navegador se o utilizador preferir */}
        <button
          id="btn-hard-reload-browser"
          type="button"
          onClick={handleHardReload}
          title="Recarregar navegador (Hard reload)"
          className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors text-xs flex items-center justify-center"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
        </button>
      </div>

      {/* Feedback Toast flutuante */}
      {showToast && (
        <div
          id="refresh-feedback-toast"
          className="absolute top-12 z-50 flex items-center gap-2 px-4 py-2 bg-slate-900/95 text-emerald-400 border border-emerald-500/40 rounded-xl shadow-xl text-xs font-medium backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>Modelos estratégicos e fluxo de caixa recalculados!</span>
        </div>
      )}
    </div>
  );
};
