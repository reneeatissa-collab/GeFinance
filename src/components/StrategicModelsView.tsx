import React, { useState } from 'react';
import { STRATEGIC_MODELS } from '../data/strategicModels';
import { StrategicModelDefinition, StrategicModelId } from '../types';
import { 
  Copy, 
  Check, 
  BookOpen, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  Flame, 
  Building, 
  TrendingUp, 
  Users, 
  Cpu, 
  Leaf, 
  Scale, 
  Swords, 
  Truck, 
  DoorOpen, 
  Repeat, 
  Gift, 
  Send, 
  HeartHandshake, 
  DollarSign, 
  Layers, 
  CheckCircle2, 
  Briefcase, 
  Wallet, 
  Coins, 
  HelpCircle, 
  AlertCircle, 
  Target, 
  PackagePlus, 
  Globe, 
  Compass, 
  Award, 
  BadgePercent, 
  Smile, 
  Cog, 
  GraduationCap
} from 'lucide-react';

interface StrategicModelsViewProps {
  countryName: string;
}

// Icon mapper for dynamic model sections
const renderIcon = (iconName: string, className = "w-4 h-4") => {
  switch (iconName) {
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'AlertTriangle': return <AlertTriangle className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Flame': return <Flame className={className} />;
    case 'Building': return <Building className={className} />;
    case 'TrendingUp': return <TrendingUp className={className} />;
    case 'Users': return <Users className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'Leaf': return <Leaf className={className} />;
    case 'Scale': return <Scale className={className} />;
    case 'Swords': return <Swords className={className} />;
    case 'Truck': return <Truck className={className} />;
    case 'DoorOpen': return <DoorOpen className={className} />;
    case 'Repeat': return <Repeat className={className} />;
    case 'Gift': return <Gift className={className} />;
    case 'Send': return <Send className={className} />;
    case 'HeartHandshake': return <HeartHandshake className={className} />;
    case 'DollarSign': return <DollarSign className={className} />;
    case 'Layers': return <Layers className={className} />;
    case 'CheckCircle2': return <CheckCircle2 className={className} />;
    case 'Briefcase': return <Briefcase className={className} />;
    case 'Wallet': return <Wallet className={className} />;
    case 'Coins': return <Coins className={className} />;
    case 'HelpCircle': return <HelpCircle className={className} />;
    case 'AlertCircle': return <AlertCircle className={className} />;
    case 'Target': return <Target className={className} />;
    case 'PackagePlus': return <PackagePlus className={className} />;
    case 'Globe': return <Globe className={className} />;
    case 'Compass': return <Compass className={className} />;
    case 'Award': return <Award className={className} />;
    case 'BadgePercent': return <BadgePercent className={className} />;
    case 'Smile': return <Smile className={className} />;
    case 'Cog': return <Cog className={className} />;
    case 'GraduationCap': return <GraduationCap className={className} />;
    default: return <Sparkles className={className} />;
  }
};

export const StrategicModelsView: React.FC<StrategicModelsViewProps> = ({ countryName }) => {
  const [selectedModelId, setSelectedModelId] = useState<StrategicModelId>('swot');
  const [userModelData, setUserModelData] = useState<Record<string, Record<string, string[]>>>(() => {
    // Initialize default items from STRATEGIC_MODELS
    const initial: Record<string, Record<string, string[]>> = {};
    STRATEGIC_MODELS.forEach((model) => {
      initial[model.id] = {};
      model.sections.forEach((sec) => {
        initial[model.id][sec.id] = [...sec.items];
      });
    });
    return initial;
  });

  const [newInputs, setNewInputs] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [activeTabSub, setActiveTabSub] = useState<'matrix' | 'guide' | 'example'>('matrix');

  const currentModel = STRATEGIC_MODELS.find((m) => m.id === selectedModelId) || STRATEGIC_MODELS[0];
  const currentSectionsData = userModelData[currentModel.id] || {};

  const handleAddItem = (sectionId: string) => {
    const text = newInputs[sectionId]?.trim();
    if (!text) return;

    setUserModelData((prev) => {
      const modelData = prev[currentModel.id] || {};
      const currentItems = modelData[sectionId] || [];
      return {
        ...prev,
        [currentModel.id]: {
          ...modelData,
          [sectionId]: [...currentItems, text],
        },
      };
    });

    setNewInputs((prev) => ({ ...prev, [sectionId]: '' }));
  };

  const handleRemoveItem = (sectionId: string, indexToRemove: number) => {
    setUserModelData((prev) => {
      const modelData = prev[currentModel.id] || {};
      const currentItems = modelData[sectionId] || [];
      return {
        ...prev,
        [currentModel.id]: {
          ...modelData,
          [sectionId]: currentItems.filter((_, idx) => idx !== indexToRemove),
        },
      };
    });
  };

  const handleLoadExample = () => {
    const exampleData = currentModel.businessExample.data;
    setUserModelData((prev) => ({
      ...prev,
      [currentModel.id]: {
        ...prev[currentModel.id],
        ...exampleData,
      },
    }));
  };

  const handleResetToDefault = () => {
    const defaults: Record<string, string[]> = {};
    currentModel.sections.forEach((sec) => {
      defaults[sec.id] = [...sec.items];
    });
    setUserModelData((prev) => ({
      ...prev,
      [currentModel.id]: defaults,
    }));
  };

  const handleCopyModel = () => {
    let markdown = `# ${currentModel.name} (${currentModel.acronym})\n`;
    markdown += `*${currentModel.tagline}*\n\n`;
    markdown += `**Criador/Origem**: ${currentModel.creator}\n`;
    markdown += `**Contexto Territorial**: ${countryName}\n\n`;

    currentModel.sections.forEach((sec) => {
      markdown += `### ${sec.title}\n`;
      const items = currentSectionsData[sec.id] || [];
      if (items.length === 0) {
        markdown += `*(Nenhum item adicionado)*\n`;
      } else {
        items.forEach((it) => {
          markdown += `- ${it}\n`;
        });
      }
      markdown += `\n`;
    });

    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div id="strategic-models-container" className="space-y-6">
      {/* Top Models Navigation Grid */}
      <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-md">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">
              Modelos de Gestão Estratégica
            </h2>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Escolha um instrumento para visualizar, copiar e aplicar ao seu negócio
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {STRATEGIC_MODELS.map((model) => {
            const isSelected = model.id === selectedModelId;
            return (
              <button
                key={model.id}
                id={`model-btn-${model.id}`}
                type="button"
                onClick={() => setSelectedModelId(model.id)}
                className={`
                  flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer
                  ${isSelected
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 font-bold shadow-sm'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'}
                `}
              >
                <span className="text-xs font-bold tracking-tight">{model.acronym}</span>
                <span className="text-[10px] text-slate-500 truncate w-full mt-0.5">
                  {model.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Model Header & Actions Bar */}
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {currentModel.acronym}
              </span>
              <h1 className="text-xl font-bold text-white tracking-tight">
                {currentModel.name}
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1.5 max-w-3xl">
              {currentModel.tagline}
            </p>
          </div>

          {/* Action Buttons: Copiar, Carregar Exemplo, Reset */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              id="btn-copy-strategic-model"
              type="button"
              onClick={handleCopyModel}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Modelo Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-white" />
                  <span>Copiar Modelo (1-Clique)</span>
                </>
              )}
            </button>

            <button
              id="btn-load-example-model"
              type="button"
              onClick={handleLoadExample}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
              title="Preenche com dados de uma empresa real em Moçambique"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver Caso Prático</span>
            </button>

            <button
              id="btn-reset-strategic-model"
              type="button"
              onClick={handleResetToDefault}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-all cursor-pointer"
              title="Restaura os itens de fábrica do modelo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar</span>
            </button>
          </div>
        </div>

        {/* Sub-view switcher: Matriz / Guia Prático / Caso de Estudo */}
        <div className="flex gap-2 text-xs">
          <button
            type="button"
            onClick={() => setActiveTabSub('matrix')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTabSub === 'matrix'
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Matriz Interativa ({currentModel.sections.length} seções)
          </button>
          <button
            type="button"
            onClick={() => setActiveTabSub('guide')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTabSub === 'guide'
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Guia de Aplicação & Criador
          </button>
          <button
            type="button"
            onClick={() => setActiveTabSub('example')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTabSub === 'example'
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Exemplo Prático: {currentModel.businessExample.companyName}
          </button>
        </div>
      </div>

      {/* SUB-VIEW 1: Interactive Matrix */}
      {activeTabSub === 'matrix' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentModel.sections.map((section) => {
            const items = currentSectionsData[section.id] || [];
            const inputVal = newInputs[section.id] || '';

            return (
              <div
                key={section.id}
                id={`model-section-${section.id}`}
                className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 flex flex-col justify-between shadow-md hover:border-slate-700 transition-all"
              >
                <div>
                  {/* Header of the section */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-xl bg-slate-800 text-emerald-400 border border-slate-700">
                      {renderIcon(section.iconName, 'w-4 h-4')}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-100">
                        {section.title}
                      </h3>
                      {section.subtitle && (
                        <p className="text-[11px] text-slate-400">
                          {section.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* List of items */}
                  <div className="space-y-2 mt-3 max-h-64 overflow-y-auto pr-1">
                    {items.length === 0 ? (
                      <p className="text-xs text-slate-500 italic py-2">
                        Nenhum item nesta seção. Adicione um abaixo.
                      </p>
                    ) : (
                      items.map((item, idx) => (
                        <div
                          key={idx}
                          className="group flex items-start justify-between gap-2 p-2 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 hover:border-slate-700"
                        >
                          <span className="leading-relaxed flex-1">{item}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(section.id, idx)}
                            title="Remover este item"
                            className="text-slate-500 hover:text-rose-400 opacity-60 group-hover:opacity-100 transition-opacity p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Quick Add Input */}
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <div className="flex gap-2">
                    <input
                      id={`input-add-${section.id}`}
                      type="text"
                      value={inputVal}
                      onChange={(e) =>
                        setNewInputs((prev) => ({
                          ...prev,
                          [section.id]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddItem(section.id);
                      }}
                      placeholder={section.placeholder}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/70"
                    />
                    <button
                      id={`btn-add-item-${section.id}`}
                      type="button"
                      onClick={() => handleAddItem(section.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors text-xs font-semibold flex items-center justify-center cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SUB-VIEW 2: Application Guide */}
      {activeTabSub === 'guide' && (
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <BookOpen className="w-5 h-5" />
                <h3 className="font-bold text-white text-base">
                  Quando e Por Que Utilizar o {currentModel.name}
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentModel.description}
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                <strong className="text-slate-200">Criador/Origem:</strong> {currentModel.creator}
              </div>

              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mt-4">
                Casos de Uso Principais:
              </h4>
              <ul className="space-y-2">
                {currentModel.whenToUse.map((useCase, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-400">
                <Target className="w-5 h-5" />
                <h3 className="font-bold text-white text-base">
                  Passo a Passo de Aplicação Prática
                </h3>
              </div>
              <div className="space-y-3">
                {currentModel.howToApplyGuide.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed"
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: Practical Business Example */}
      {activeTabSub === 'example' && (
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Caso Prático de Aplicação
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                {currentModel.businessExample.companyName}
              </h3>
              <p className="text-xs text-slate-400">
                Setor: {currentModel.businessExample.sector}
              </p>
            </div>
            <button
              type="button"
              onClick={handleLoadExample}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 transition-colors"
            >
              Carregar este caso na minha Matriz
            </button>
          </div>

          <p className="text-xs text-slate-300 italic bg-slate-950 p-3 rounded-xl border border-slate-800">
            "{currentModel.businessExample.summary}"
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(currentModel.businessExample.data).map(([secKey, items]) => {
              const secDef = currentModel.sections.find((s) => s.id === secKey);
              return (
                <div
                  key={secKey}
                  className="bg-slate-950/90 p-4 rounded-xl border border-slate-800 text-xs space-y-2"
                >
                  <h4 className="font-bold text-emerald-400 flex items-center gap-2">
                    {secDef?.title || secKey}
                  </h4>
                  <ul className="space-y-1.5 pl-2">
                    {items.map((it, i) => (
                      <li key={i} className="text-slate-300 flex items-start gap-1.5">
                        <span className="text-emerald-500">•</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
