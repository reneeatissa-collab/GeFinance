export type CountryCode = 'MZ' | 'AO' | 'BR' | 'PT' | 'ZA' | 'US';

export interface CountryConfig {
  code: CountryCode;
  name: string;
  flag: string;
  currencyCode: string;
  currencySymbol: string;
  currencyRateToUSD: number; // For comparative calculations
  centralBank: string;
  benchmarkRateName: string; // e.g., Taxa MIMO, Selic, BNA
  benchmarkRateValue: number; // in %
  annualInflationRate: number; // in %
  taxStandardRate: number; // IVA/VAT in %
  corporateTaxRate: number; // IRPC / Corporate tax in %
  economicNotes: string;
}

export type StrategicModelId = 
  | 'swot'
  | 'pestel'
  | 'porter'
  | 'bmc'
  | 'bcg'
  | 'ansoff'
  | 'okr'
  | 'bsc';

export interface ModelSection {
  id: string;
  title: string;
  subtitle?: string;
  color: string;
  iconName: string;
  items: string[];
  placeholder: string;
}

export interface StrategicModelDefinition {
  id: StrategicModelId;
  name: string;
  acronym: string;
  tagline: string;
  description: string;
  creator: string;
  whenToUse: string[];
  howToApplyGuide: string[];
  sections: ModelSection[];
  businessExample: {
    companyName: string;
    sector: string;
    summary: string;
    data: Record<string, string[]>;
  };
}

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  type: TransactionType;
  category: string;
  amount: number;
  status: 'paid' | 'pending';
  paymentMethod: string;
  recurring?: boolean;
}

export interface CashFlowProjection {
  month: string;
  projectedIncome: number;
  projectedExpense: number;
  netCashFlow: number;
  cumulativeCash: number;
}

export interface ESGScorecard {
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
  totalScore: number;
  badgeLevel: 'Não Avaliado' | 'Iniciante' | 'Bronze' | 'Prata' | 'Ouro' | 'Líder ESG';
  responses: Record<string, number>; // questionId -> rating 0-5
}

export interface CompanyFundingProfile {
  id: string;
  companyName: string;
  country: CountryCode;
  sector: string;
  foundedYear: number;
  employees: number;
  stage: 'Ideação' | 'Validação / Seed' | 'Tração Inicial' | 'Crescimento' | 'Escala';
  fundingSought: number;
  valuationEstimate: number;
  useOfFunds: string;
  problemStatement: string;
  solutionSummary: string;
  revenueModel: string;
  monthlyRevenue: number;
  esgScore: number;
  pitchDeckSubmitted: boolean;
}

export interface Investor {
  id: string;
  name: string;
  organization: string;
  type: 'Fundo de Impacto' | 'Capital de Risco / VC' | 'Banco de Desenvolvimento' | 'Investidor Anjo' | 'Fundo ESG Internacional';
  location: string;
  targetSectors: string[];
  minTicket: number;
  maxTicket: number;
  esgPreference: 'Alto' | 'Médio' | 'Qualquer';
  bio: string;
  avatarUrl: string;
  feedbackTemplates: {
    approved: string;
    moreInfoNeeded: string;
    rejected: string;
  };
}

export interface InvestorChatMessage {
  id: string;
  sender: 'entrepreneur' | 'investor' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  actionOffer?: {
    type: 'Term Sheet Proposto' | 'Solicitação de Documentos' | 'Reunião Agendada';
    amount?: number;
    equityOrInterest?: string;
  };
}

export interface MacroeconomicFactor {
  id: string;
  title: string;
  shortDefinition: string;
  deepExplanation: string;
  whyItMattersForEntrepreneurs: string[];
  strategiesToMitigate: string[];
  practicalCalculationExample: string;
  keyTerms: { term: string; definition: string }[];
}
