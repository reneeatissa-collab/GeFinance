import React, { useState, useMemo } from 'react';
import { CountryConfig, CompanyFundingProfile, Investor, InvestorChatMessage } from '../types';
import { ESG_QUESTIONS } from '../data/esgQuestions';
import { INVESTORS } from '../data/investors';
import { 
  TreePine, 
  Award, 
  Send, 
  Building, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  DollarSign, 
  MessageSquare, 
  Briefcase, 
  ShieldCheck, 
  Users, 
  Leaf, 
  ArrowRight,
  FileCheck
} from 'lucide-react';

interface ESGInvestorsViewProps {
  country: CountryConfig;
}

const DEFAULT_COMPANY: CompanyFundingProfile = {
  id: 'comp_1',
  companyName: 'AgroLogística Verde Moçambique, Lda.',
  country: 'MZ',
  sector: 'Agronegócio & Cadeia de Frio Sustentável',
  foundedYear: 2022,
  employees: 18,
  stage: 'Tração Inicial',
  fundingSought: 4500000, // 4.5M MT
  valuationEstimate: 22000000,
  useOfFunds: 'Aquisição de 2 câmaras frias solares e capital de giro para adiantamento a 60 agricultores em Chókwè e Manhiça.',
  problemStatement: 'Perda pós-colheita de até 40% de hortícolas por falta de refrigeração e atrasos no transporte em Moçambique.',
  solutionSummary: 'Rede descentralizada de frio alimentada a energia solar com coleta móvel e venda direta a supermercados e restaurantes.',
  revenueModel: 'Margem na comercialização de produtos beneficiados (32%) + taxa de frete refrigerado.',
  monthlyRevenue: 480000,
  esgScore: 82,
  pitchDeckSubmitted: true,
};

export const ESGInvestorsView: React.FC<ESGInvestorsViewProps> = ({ country }) => {
  const [activeSubTab, setActiveSubTab] = useState<'assessment' | 'company_profile' | 'pitch_room'>('pitch_room');
  
  // ESG Questionnaire State
  const [esgAnswers, setEsgAnswers] = useState<Record<string, number>>({
    e1: 7,
    e2: 7,
    e3: 8,
    s1: 8,
    s2: 8,
    s3: 8,
    g1: 8,
    g2: 8,
    g3: 8,
  });

  // Company Profile State
  const [companyProfile, setCompanyProfile] = useState<CompanyFundingProfile>(DEFAULT_COMPANY);
  const [isSavedCompanyToast, setIsSavedCompanyToast] = useState(false);

  // Selected Investor and Chat History
  const [selectedInvestorId, setSelectedInvestorId] = useState<string>(INVESTORS[0].id);
  const selectedInvestor = INVESTORS.find((inv) => inv.id === selectedInvestorId) || INVESTORS[0];

  const [chatHistories, setChatHistories] = useState<Record<string, InvestorChatMessage[]>>({
    inv_1: [
      {
        id: 'msg_1',
        sender: 'investor',
        senderName: INVESTORS[0].name,
        text: 'Olá! Sou gestora do Fundo Moçambique Crescimento Verde. Avaliamos empresas moçambicanas com compromisso socioambiental comprovado. Como podemos apoiar o crescimento da sua empresa?',
        timestamp: '10:15',
      },
    ],
    inv_2: [
      {
        id: 'msg_bci_1',
        sender: 'investor',
        senderName: INVESTORS[1].name,
        text: 'Bom dia! Pelo programa de apoio às PMEs e linhas do PAE, disponibilizamos linhas de financiamento de até 25.000.000 MT com taxas bonificadas para produção nacional.',
        timestamp: '09:30',
      },
    ],
  });

  const [chatInput, setChatInput] = useState('');

  // Calculate ESG Score
  const esgScorecard = useMemo(() => {
    let ePoints = 0;
    let sPoints = 0;
    let gPoints = 0;

    ESG_QUESTIONS.forEach((q) => {
      const pts = esgAnswers[q.id] || 0;
      if (q.pillar === 'E') ePoints += pts;
      else if (q.pillar === 'S') sPoints += pts;
      else if (q.pillar === 'G') gPoints += pts;
    });

    const maxPerPillar = 30; // 3 questions x 10 pts
    const eScore = Math.round((ePoints / maxPerPillar) * 100);
    const sScore = Math.round((sPoints / maxPerPillar) * 100);
    const gScore = Math.round((gPoints / maxPerPillar) * 100);
    const total = Math.round((eScore + sScore + gScore) / 3);

    let badgeLevel: 'Não Avaliado' | 'Iniciante' | 'Bronze' | 'Prata' | 'Ouro' | 'Líder ESG' = 'Iniciante';
    if (total >= 85) badgeLevel = 'Líder ESG';
    else if (total >= 75) badgeLevel = 'Ouro';
    else if (total >= 60) badgeLevel = 'Prata';
    else if (total >= 40) badgeLevel = 'Bronze';

    return {
      eScore,
      sScore,
      gScore,
      total,
      badgeLevel,
    };
  }, [esgAnswers]);

  const formatMoney = (amount: number) => {
    return `${country.currencySymbol} ${amount.toLocaleString('pt-PT', {
      maximumFractionDigits: 0,
    })}`;
  };

  const handleSaveCompanyProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setCompanyProfile((prev) => ({
      ...prev,
      esgScore: esgScorecard.total,
    }));
    setIsSavedCompanyToast(true);
    setTimeout(() => setIsSavedCompanyToast(false), 2500);
  };

  // Send message to investor & simulate response
  const handleSendMessage = (customText?: string) => {
    const textToSend = customText || chatInput.trim();
    if (!textToSend) return;

    const userMsg: InvestorChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'entrepreneur',
      senderName: companyProfile.companyName || 'Empreendedor',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const currentHistory = chatHistories[selectedInvestor.id] || [];
    const updatedHistory = [...currentHistory, userMsg];

    setChatHistories((prev) => ({
      ...prev,
      [selectedInvestor.id]: updatedHistory,
    }));

    if (!customText) setChatInput('');

    // Simulate smart investor response
    setTimeout(() => {
      let replyText = '';
      let actionOffer: any = undefined;

      if (textToSend.includes('Score ESG') || textToSend.includes('Apresentar')) {
        if (esgScorecard.total >= 70) {
          replyText = `Recebemos o seu dossiê! O seu Score ESG de ${esgScorecard.total}/100 (${esgScorecard.badgeLevel}) atende perfeitamente à nossa tese de investimento sustentável em ${country.name}. O valor procurado de ${formatMoney(companyProfile.fundingSought)} está dentro do nosso ticket de alocação.`;
          actionOffer = {
            type: 'Term Sheet Proposto',
            amount: companyProfile.fundingSought,
            equityOrInterest: selectedInvestor.type === 'Banco de Desenvolvimento' ? 'Taxa Bonificada: MIMO + 3%' : 'Equity: 12% a 15%',
          };
        } else {
          replyText = `Agradecemos a apresentação. Seu Score ESG atual (${esgScorecard.total}/100) ainda está em nível ${esgScorecard.badgeLevel}. Recomendamos que sua empresa formalize auditoria contábil externa e adote certificações ambientais para se qualificar aos nossos recursos.`;
        }
      } else if (textToSend.includes('Term Sheet') || textToSend.includes('financiamento')) {
        replyText = `Com certeza. Para emissão formal do Term Sheet vinculativo no montante de ${formatMoney(companyProfile.fundingSought)}, nossa equipe de due diligence precisa: 1. Balancetes dos últimos 24 meses; 2. Certidão de não dívida da Autoridade Tributária; 3. Licença ambiental simplificada. Podemos marcar uma conferência online nesta quinta-feira?`;
        actionOffer = {
          type: 'Reunião Agendada',
        };
      } else {
        replyText = `Excelente ponto levantado sobre ${companyProfile.sector}. Estamos muito atentos ao dinamismo do mercado em ${country.name}. Como vocês estruturaram a proteção contra o risco cambial (Metical/USD) na importação dos insumos?`;
      }

      const replyMsg: InvestorChatMessage = {
        id: `msg_inv_${Date.now()}`,
        sender: 'investor',
        senderName: selectedInvestor.name,
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionOffer,
      };

      setChatHistories((prev) => ({
        ...prev,
        [selectedInvestor.id]: [...(prev[selectedInvestor.id] || []), replyMsg],
      }));
    }, 1000);
  };

  return (
    <div id="esg-investors-container" className="space-y-6">
      {/* Top Banner & Quick Sub-Nav */}
      <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <TreePine className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white">
                Módulo ESG & Captação de Financiamento
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Avalie a conformidade Ambiental, Social e Governança da sua empresa e conecte-se diretamente com investidores de impacto.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveSubTab('pitch_room')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeSubTab === 'pitch_room'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Sala com Investidores
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('company_profile')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeSubTab === 'company_profile'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Cadastro da Empresa
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('assessment')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeSubTab === 'assessment'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Autoavaliação ESG ({esgScorecard.total} pts)
            </button>
          </div>
        </div>
      </div>

      {/* SUB-VIEW 1: Interactive Pitch & Matchmaking Room */}
      {activeSubTab === 'pitch_room' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: List of Investors */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span>Investidores Disponíveis ({INVESTORS.length})</span>
            </h3>

            <div className="space-y-3">
              {INVESTORS.map((inv) => {
                const isSelected = inv.id === selectedInvestor.id;
                return (
                  <div
                    key={inv.id}
                    onClick={() => setSelectedInvestorId(inv.id)}
                    className={`
                      p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5
                      ${isSelected
                        ? 'bg-emerald-950/30 border-emerald-500 shadow-md'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'}
                    `}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={inv.avatarUrl}
                          alt={inv.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-white leading-tight">
                            {inv.name}
                          </h4>
                          <span className="text-[11px] text-emerald-400 block font-medium">
                            {inv.organization}
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-slate-800 text-slate-300">
                        {inv.type}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {inv.bio}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1 border-t border-slate-800/80">
                      <span>Ticket: {formatMoney(inv.minTicket)} - {formatMoney(inv.maxTicket)}</span>
                      <span className="text-emerald-400 font-semibold">ESG: {inv.esgPreference}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 2 Columns: Chat & Negotiation Simulator */}
          <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between shadow-xl min-h-[560px]">
            {/* Header of Active Chat */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedInvestor.avatarUrl}
                  alt={selectedInvestor.name}
                  className="w-11 h-11 rounded-xl object-cover border border-slate-700"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-sm">
                      {selectedInvestor.name}
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-xs text-slate-400">
                    {selectedInvestor.organization} • {selectedInvestor.location}
                  </p>
                </div>
              </div>

              {/* Company Match Badge */}
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] text-slate-400 uppercase">Seu Score ESG</span>
                <span className="text-xs font-bold text-emerald-400">
                  {esgScorecard.total} / 100 ({esgScorecard.badgeLevel})
                </span>
              </div>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto my-4 space-y-3.5 pr-2">
              {(chatHistories[selectedInvestor.id] || []).map((msg) => {
                const isMe = msg.sender === 'entrepreneur';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1 px-1">
                      <span>{msg.senderName}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`
                        max-w-lg p-3.5 rounded-2xl text-xs leading-relaxed
                        ${isMe
                          ? 'bg-emerald-600 text-white rounded-br-none'
                          : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-bl-none'}
                      `}
                    >
                      {msg.text}

                      {/* Action Offer (Term Sheet, Reunião, etc.) */}
                      {msg.actionOffer && (
                        <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-emerald-500/50 text-emerald-300 text-xs space-y-1">
                          <div className="flex items-center gap-1.5 font-bold">
                            <Sparkles className="w-4 h-4 text-emerald-400" />
                            <span>{msg.actionOffer.type}</span>
                          </div>
                          {msg.actionOffer.amount && (
                            <p className="text-white font-mono">
                              Valor Pré-Aprovado: {formatMoney(msg.actionOffer.amount)}
                            </p>
                          )}
                          {msg.actionOffer.equityOrInterest && (
                            <p className="text-slate-300">
                              Condições: {msg.actionOffer.equityOrInterest}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Action Prompts for the Entrepreneur */}
            <div className="border-t border-slate-800 pt-3 space-y-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px]">
                <span className="text-slate-500 shrink-0">Ações Rápidas:</span>
                <button
                  type="button"
                  onClick={() =>
                    handleSendMessage(
                      `Prezados, apresentamos a ${companyProfile.companyName}. Faturamos ${formatMoney(
                        companyProfile.monthlyRevenue
                      )}/mês e buscamos ${formatMoney(
                        companyProfile.fundingSought
                      )} para expansão. Nosso Score ESG é ${esgScorecard.total} pontos (${esgScorecard.badgeLevel}).`
                    )
                  }
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap transition-colors"
                >
                  📄 Enviar Pitch & Score ESG
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSendMessage(
                      `Gostaríamos de solicitar os termos preliminares de financiamento (Term Sheet) para o montante de ${formatMoney(
                        companyProfile.fundingSought
                      )} com foco em ativos sustentáveis.`
                    )
                  }
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap transition-colors"
                >
                  💼 Solicitar Term Sheet
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSendMessage(
                      `Como o fundo avalia os riscos cambiais e o impacto da Taxa MIMO na taxa de juro cobrada para empresas em Moçambique?`
                    )
                  }
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap transition-colors"
                >
                  💬 Perguntar sobre Condições
                </button>
              </div>

              {/* Text input form */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  placeholder={`Escreva uma mensagem ou tire dúvidas com ${selectedInvestor.name}...`}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center justify-center cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: Company Registration Form */}
      {activeSubTab === 'company_profile' && (
        <form
          onSubmit={handleSaveCompanyProfile}
          className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg space-y-6"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white">
                Cadastro da Empresa para Investidores
              </h3>
              <p className="text-xs text-slate-400">
                Preencha os dados do seu negócio para ser apresentado aos fundos de investimento e bancos parceiros.
              </p>
            </div>
            {isSavedCompanyToast && (
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-bold border border-emerald-500/30">
                Dados Salvos com Sucesso!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Nome da Empresa / Razão Social</label>
              <input
                type="text"
                required
                value={companyProfile.companyName}
                onChange={(e) =>
                  setCompanyProfile({ ...companyProfile, companyName: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Setor de Atuação</label>
              <input
                type="text"
                value={companyProfile.sector}
                onChange={(e) =>
                  setCompanyProfile({ ...companyProfile, sector: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Estágio Atual</label>
              <select
                value={companyProfile.stage}
                onChange={(e) =>
                  setCompanyProfile({ ...companyProfile, stage: e.target.value as any })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="Ideação">Ideação</option>
                <option value="Validação / Seed">Validação / Seed</option>
                <option value="Tração Inicial">Tração Inicial</option>
                <option value="Crescimento">Crescimento</option>
                <option value="Escala">Escala</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">
                Financiamento Procurado ({country.currencySymbol})
              </label>
              <input
                type="number"
                value={companyProfile.fundingSought}
                onChange={(e) =>
                  setCompanyProfile({
                    ...companyProfile,
                    fundingSought: Number(e.target.value) || 0,
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">
                Faturamento Médio Mensal ({country.currencySymbol})
              </label>
              <input
                type="number"
                value={companyProfile.monthlyRevenue}
                onChange={(e) =>
                  setCompanyProfile({
                    ...companyProfile,
                    monthlyRevenue: Number(e.target.value) || 0,
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Número de Colaboradores</label>
              <input
                type="number"
                value={companyProfile.employees}
                onChange={(e) =>
                  setCompanyProfile({
                    ...companyProfile,
                    employees: Number(e.target.value) || 0,
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-slate-400 mb-1">Destinação dos Recursos (Uso dos Fundos)</label>
              <textarea
                rows={2}
                value={companyProfile.useOfFunds}
                onChange={(e) =>
                  setCompanyProfile({ ...companyProfile, useOfFunds: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-emerald-500"
                placeholder="Ex: Aquisição de maquinário, ampliação do estoque, contratação de equipe comercial..."
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow-md"
          >
            Salvar e Atualizar Perfil de Captação
          </button>
        </form>
      )}

      {/* SUB-VIEW 3: Complete ESG Assessment */}
      {activeSubTab === 'assessment' && (
        <div className="space-y-6">
          {/* Score Header Card */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">
                  Scorecard ESG da Empresa
                </h3>
              </div>
              <p className="text-xs text-slate-300 max-w-xl">
                O índice avalia a aderência aos padrões globais de Sustentabilidade Ambiental, Responsabilidade Social e Governança Corporativa.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-400 tracking-tight">
                  {esgScorecard.total}
                  <span className="text-sm text-slate-500">/100</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wide">
                  Selo: {esgScorecard.badgeLevel}
                </span>
              </div>

              <div className="h-12 w-px bg-slate-800" />

              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-teal-400" /> Ambiental (E):
                  </span>
                  <span className="font-bold text-teal-300">{esgScorecard.eScore}%</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-400" /> Social (S):
                  </span>
                  <span className="font-bold text-blue-300">{esgScorecard.sScore}%</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Governança (G):
                  </span>
                  <span className="font-bold text-purple-300">{esgScorecard.gScore}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Questionnaire Grid */}
          <div className="space-y-4">
            {ESG_QUESTIONS.map((q) => {
              const currentVal = esgAnswers[q.id] ?? 0;
              return (
                <div
                  key={q.id}
                  className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-slate-800 text-emerald-400">
                          {q.pillar === 'E'
                            ? 'Ambiental'
                            : q.pillar === 'S'
                            ? 'Social'
                            : 'Governança'}{' '}
                          • {q.category}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1.5">
                        {q.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">{q.description}</p>
                    </div>

                    <span className="text-xs font-mono font-bold text-emerald-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 shrink-0">
                      {currentVal} pts
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = currentVal === opt.points;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() =>
                            setEsgAnswers((prev) => ({ ...prev, [q.id]: opt.points }))
                          }
                          className={`
                            p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex flex-col justify-between
                            ${isSelected
                              ? 'bg-emerald-600/20 border-emerald-500 text-emerald-200 font-semibold'
                              : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'}
                          `}
                        >
                          <span className="leading-snug">{opt.label}</span>
                          <span className="text-[10px] text-slate-500 mt-2 font-mono">
                            +{opt.points} pontos
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
