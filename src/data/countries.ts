import { CountryCode, CountryConfig } from '../types';

export const COUNTRIES: Record<CountryCode, CountryConfig> = {
  MZ: {
    code: 'MZ',
    name: 'Moçambique',
    flag: '🇲🇿',
    currencyCode: 'MZN',
    currencySymbol: 'MT',
    currencyRateToUSD: 63.85,
    centralBank: 'Banco de Moçambique (BdM)',
    benchmarkRateName: 'Taxa MIMO (Política Monetária)',
    benchmarkRateValue: 14.25,
    annualInflationRate: 3.48,
    taxStandardRate: 16.0, // IVA em Moçambique
    corporateTaxRate: 32.0, // IRPC
    economicNotes: 'Economia impulsionada por agricultura, gás natural (GNL da Bacia do Rovuma), energia hídrica e corredor logístico de Maputo e Beira. O Banco de Moçambique utiliza a Taxa MIMO para ancorar expectativas inflacionárias e estabilidade cambial do Metical.',
  },
  AO: {
    code: 'AO',
    name: 'Angola',
    flag: '🇦🇴',
    currencyCode: 'AOA',
    currencySymbol: 'Kz',
    currencyRateToUSD: 915.0,
    centralBank: 'Banco Nacional de Angola (BNA)',
    benchmarkRateName: 'Taxa Básica BNA',
    benchmarkRateValue: 19.5,
    annualInflationRate: 28.2,
    taxStandardRate: 14.0, // IVA
    corporateTaxRate: 25.0, // Imposto Industrial
    economicNotes: 'Maior produtor petrolífero lusófono em processo contínuo de diversificação econômica (agronegócio, mineração e indústria ligeira). Fortes pressões cambiais exigem gestão rigorosa de custos de importação e tesouraria.',
  },
  BR: {
    code: 'BR',
    name: 'Brasil',
    flag: '🇧🇷',
    currencyCode: 'BRL',
    currencySymbol: 'R$',
    currencyRateToUSD: 5.65,
    centralBank: 'Banco Central do Brasil (BCB)',
    benchmarkRateName: 'Taxa Selic Meta',
    benchmarkRateValue: 10.75,
    annualInflationRate: 4.42,
    taxStandardRate: 17.5, // Média ICMS/IVA Dual em transição
    corporateTaxRate: 34.0, // IRPJ + CSLL
    economicNotes: 'Maior economia da América Latina, líder em agronegócio, fintechs e energia renovável. O regime de metas para a inflação guia a taxa Selic com forte impacto no crédito corporativo e custo de capital (WACC).',
  },
  PT: {
    code: 'PT',
    name: 'Portugal / Zona Euro',
    flag: '🇵🇹',
    currencyCode: 'EUR',
    currencySymbol: '€',
    currencyRateToUSD: 0.92,
    centralBank: 'Banco Central Europeu (BCE) & Banco de Portugal',
    benchmarkRateName: 'Taxa de Refinanciamento BCE',
    benchmarkRateValue: 3.5,
    annualInflationRate: 2.2,
    taxStandardRate: 23.0, // IVA padrão
    corporateTaxRate: 21.0, // IRC padrão
    economicNotes: 'Mercado integrado à União Europeia com forte dinamismo em turismo, tecnologia e serviços partilhados. Estabilidade de moeda e acesso facilitado a fundos comunitários como o PRR (Plano de Recuperação e Resiliência).',
  },
  ZA: {
    code: 'ZA',
    name: 'África do Sul',
    flag: '🇿🇦',
    currencyCode: 'ZAR',
    currencySymbol: 'R',
    currencyRateToUSD: 17.6,
    centralBank: 'South African Reserve Bank (SARB)',
    benchmarkRateName: 'SARB Repo Rate',
    benchmarkRateValue: 8.0,
    annualInflationRate: 4.4,
    taxStandardRate: 15.0, // VAT
    corporateTaxRate: 27.0, // Corporate Income Tax
    economicNotes: 'Hub industrial e financeiro do Sul de África e principal parceiro comercial de Moçambique (fronteira de Ressano Garcia/Komatipoort). Flutuações do Rand afetam diretamente o custo de alimentos e bens importados em Moçambique.',
  },
  US: {
    code: 'US',
    name: 'EUA / Padrão Global',
    flag: '🇺🇸',
    currencyCode: 'USD',
    currencySymbol: '$',
    currencyRateToUSD: 1.0,
    centralBank: 'Federal Reserve (Fed)',
    benchmarkRateName: 'Federal Funds Rate',
    benchmarkRateValue: 4.75,
    annualInflationRate: 2.5,
    taxStandardRate: 7.0, // State sales tax médio
    corporateTaxRate: 21.0, // Federal corporate rate
    economicNotes: 'Moeda de reserva internacional predominante no comércio exterior de commodities, petróleo, gás e financiamento multilateral para PMEs e projetos de infraestrutura em África.',
  },
};
