import { MacroeconomicFactor } from '../types';

export const MACROECONOMIC_FACTORS: MacroeconomicFactor[] = [
  {
    id: 'inflation',
    title: 'Inflação e Erosão do Poder de Compra',
    shortDefinition: 'A alta generalizada e contínua dos preços que reduz o poder de compra da moeda e corrói a rentabilidade real das empresas.',
    deepExplanation: `A inflação representa o aumento persistente no nível geral de preços de bens e serviços em uma economia durante um determinado período. Quando a inflação sobe, cada unidade de moeda (seja o Metical moçambicano, o Kwanza angolano ou o Real brasileiro) compra menos mercadorias do que antes.

Para os empreendedores e gestores financeiros, a inflação é um dos fatores mais perigosos porque:
1. Inflação de Custos (Cost-Push): Ocorre quando matérias-primas, combustíveis, energia e fretes encarecem. Em Moçambique, por exemplo, como boa parte dos produtos manufaturados e insumos agrícolas é importada da África do Sul ou da Ásia, o aumento do frete marítimo internacional ou a desvalorização cambial gera inflação imediata de custos.
2. Inflação de Demanda (Demand-Pull): Ocorre quando a procura agregada por produtos supera a capacidade produtiva das indústrias, puxando os preços para cima.
3. Erosão do Capital de Giro: Se a empresa vende com prazo de recebimento de 60 dias sem correção, o dinheiro recebido no futuro comprará menos insumos para repor o estoque, gerando descapitalização gradual silenciosa.`,
    whyItMattersForEntrepreneurs: [
      'Preços defasados: Se você não reajustar seus preços no mesmo ritmo ou antecipadamente à inflação dos custos, sua margem líquida evaporará.',
      'Aumento do custo de reposição de estoque: O valor que você faturou hoje pode não ser suficiente para recomprar a mesma quantidade de insumos amanhã.',
      'Pressão salarial e retenção de colaboradores: Com o custo de vida mais alto, os funcionários demandam aumentos salariais reais.',
      'Contratos de longo prazo desvantajosos: Fechar contratos fixos sem cláusula de reajuste automático (gatilho inflacionário) pode levar a prejuízos severos.',
    ],
    strategiesToMitigate: [
      'Insira Cláusulas de Atualização Monetária em contratos com clientes corporativos (reajuste vinculado ao IPC/IPC provincial ou índice oficial).',
      'Monitore o Custo de Reposição, e não o custo histórico de aquisição, ao definir a tabela de preços de venda.',
      'Negocie prazos de pagamento mais longos com fornecedores ou realize compras conjuntas para obter descontos por volume.',
      'Acelere o giro de estoques para evitar manter mercadorias paradas perdendo valor ou sofrendo avarias.',
    ],
    practicalCalculationExample: 'Se o seu custo unitário era de 1.000 MT e a inflação acumulada de insumos foi de 8%, o novo custo será de 1.080 MT. Para manter uma margem de lucro de 25% sobre a venda: Preço = Custo / (1 - Margem) = 1.080 / 0.75 = 1.440 MT (em vez dos 1.333 MT anteriores). Sem o reajuste, sua margem real despencaria de 25% para menos de 19%!',
    keyTerms: [
      { term: 'IPC (Índice de Preços ao Consumidor)', definition: 'Mede a variação do custo de uma cesta de bens e serviços consumidos pelas famílias.' },
      { term: 'Deflação', definition: 'Queda sustentada do nível geral de preços (o oposto de inflação).' },
      { term: 'Estagflação', definition: 'Cenário desafiador onde a economia apresenta estagnação do crescimento econômico combinada com alta inflação.' },
    ],
  },
  {
    id: 'interest_rates',
    title: 'Taxas de Juro de Política Monetária (Taxa MIMO, Selic, etc.)',
    shortDefinition: 'O custo do dinheiro fixado pelos Bancos Centrais para controlar a inflação e regular o ritmo do crédito.',
    deepExplanation: `As taxas de juro de referência fixadas pelas autoridades monetárias — como a Taxa MIMO (Taxa de Política Monetária) do Banco de Moçambique, a Taxa BNA em Angola ou a Taxa Selic no Brasil — determinam o preço pelo qual os bancos comerciais captam e emprestam recursos.

Como funciona a engrenagem:
1. Quando a inflação acelera, o Banco Central sobe a taxa de juro de referência. Isso encarece os empréstimos bancários, desestimula o consumo a prazo e o endividamento, reduzindo a liquidez em circulação para frear os aumentos de preços.
2. Quando a economia está desaquecida e a inflação está controlada, o Banco Central pode cortar as taxas para estimular investimentos e consumo.
3. Spread Bancário: A taxa que a PME paga no banco não é a taxa de referência básica, mas sim a Taxa de Referência + o Spread (margem de lucro do banco comercial + risco de inadimplência + custos operacionais). Em economias emergentes como Moçambique e Angola, o spread bancário pode adicionar de 6% a 15% acima da taxa básica, resultando em juros anuais efetivos de 20% a 30% ao ano no crédito corporativo.`,
    whyItMattersForEntrepreneurs: [
      'Custo do endividamento: Linhas de crédito bancário, descobertos em conta-corrente e financiamento de viaturas ficam muito caros em ciclos de alta de juros.',
      'Custo de Oportunidade do Capital: Investidores exigirão retornos maiores do seu negócio (ROI) para compensar não deixarem o dinheiro rendendo em títulos públicos livres de risco.',
      'Inadimplência de Clientes: Com juros altos, os clientes da sua empresa também enfrentam dificuldades financeiras, aumentando o risco de atrasos e calotes.',
      'Desaceleração das Vendas a Prazo: Projetos de expansão dos seus clientes corporativos tendem a ser postergados.',
    ],
    strategiesToMitigate: [
      'Priorize o Autofinanciamento com fluxo de caixa livre gerado pelas próprias operações antes de recorrer a empréstimos com taxas elevadas.',
      'Busque Linhas de Crédito Bonificadas ou Fundos de Desenvolvimento (ex: fundos de apoio a PMEs com juros subsidiados por agências multilaterais).',
      'Substitua dívida bancária cara por investidores sócios (Equity / Venture Capital / Anjos) ou dívida conversível com carência inicial.',
      'Evite o uso de cheque especial ou descoberto bancário, que cobram as maiores taxas do sistema financeiro.',
    ],
    practicalCalculationExample: 'Empréstimo bancário de 1.000.000 MT a uma taxa anual de 22% custa 220.000 MT só em juros ao ano (cerca de 18.333 MT mensais). Se a sua margem operacional é de apenas 15%, o serviço da dívida consumirá todo o lucro líquido da sua empresa!',
    keyTerms: [
      { term: 'Taxa MIMO (Moçambique)', definition: 'Taxa de juro do mercado interbancário monetário definida pelo Comité de Política Monetária (CPMO) do Banco de Moçambique.' },
      { term: 'Spread Bancário', definition: 'Diferença entre o que o banco paga para captar recursos e o que cobra para emprestar ao cliente final.' },
      { term: 'Custo Efetivo Total (CET)', definition: 'Soma de todos os juros, taxas, seguros e comissões cobrados em um financiamento.' },
    ],
  },
  {
    id: 'exchange_rates',
    title: 'Taxas de Câmbio e Volatilidade Cambial',
    shortDefinition: 'O valor relativo da moeda nacional frente a moedas fortes (USD, EUR, ZAR) e seu reflexo no comércio e dívida.',
    deepExplanation: `A taxa de câmbio é o preço de uma unidade monetária estrangeira expressa na moeda nacional (por exemplo, quantos Meticais são necessários para comprar 1 Dólar Americano ou 1 Rand Sul-Africano).

Em economias dependentes de importação, a desvalorização da moeda nacional produz efeitos em cadeia imediatos:
1. Impacto direto nos custos: Bens essenciais, combustíveis, maquinários fabris, fertilizantes, embalagens e produtos de consumo chegam ao porto mais caros em moeda local.
2. Exposição cambial de passivos: Se a empresa contratou uma dívida ou leasing cotado em Dólares (USD) e fatura exclusivamente em Meticais (MZN), qualquer depreciação cambial aumenta o valor contábil e as parcelas da dívida em moeda local de forma automática.
3. Oportunidade para exportadores e produtores locais: Uma moeda nacional desvalorizada torna os produtos fabricados localmente mais competitivos frente aos concorrentes importados e eleva as receitas de quem exporta.`,
    whyItMattersForEntrepreneurs: [
      'Risco de Descasamento de Moedas: Custos em USD/ZAR e receitas em moeda local (MZN/AOA) é a fórmula mais comum de insolvência de PMEs em países africanos.',
      'Previsibilidade de Orçamento: Orçamentos anuais para aquisição de equipamentos no exterior podem estourar subitamente em caso de desvalorização.',
      'Disponibilidade de Divisas: Em certos momentos, além do preço do câmbio, o acesso a divisas estrangeiras nos bancos comerciais pode exigir filas de espera.',
    ],
    strategiesToMitigate: [
      'Hedge Natural: Tente gerar receitas em moedas fortes (exportações, prestação de serviços a clientes multinacionais) para cobrir despesas importadas.',
      'Substituição de Insumos: Desenvolva fornecedores locais para substituir insumos cotados em moeda estrangeira.',
      'Fixação de Preços em Moeda Forte com Liquidação Local: Em contratos B2B de médio prazo, preveja cláusula de ajuste caso a cotação oficial varie mais de 5%.',
      'Manter Reserva em Moeda Estrangeira: Para compras inevitáveis de reposição de peças de maquinário crítico importado.',
    ],
    practicalCalculationExample: 'Uma máquina que custa 10.000 USD comprada a um câmbio de 63.85 MT/USD custa 638.500 MT. Se o Metical desvalorizar para 70.00 MT/USD, a mesma máquina passará a custar 700.000 MT — um acréscimo imprevisto de 61.500 MT (+9.6%) no seu caixa sem nenhuma alteração no preço do fabricante.',
    keyTerms: [
      { term: 'Desvalorização Cambial', definition: 'Perda de valor da moeda nacional em relação a uma moeda estrangeira no mercado cambial.' },
      { term: 'Hedge Cambial', definition: 'Instrumento ou estratégia de proteção financeira contra variações adversas nas cotações de moedas.' },
      { term: 'Reservas Internacionais Líquidas', definition: 'Montante em moeda estrangeira mantido pelo Banco Central para assegurar importações e estabilidade.' },
    ],
  },
  {
    id: 'gdp_and_cycles',
    title: 'PIB e Ciclos Econômicos (Expansão x Recessão)',
    shortDefinition: 'A dinâmica da atividade econômica global e nacional que dita o apetite de consumo e investimentos.',
    deepExplanation: `O Produto Interno Bruto (PIB) soma toda a riqueza em bens e serviços finais produzidos em um país. A economia opera em ciclos naturais: Expansão (crescimento rápido, otimismo, alta demanda), Pico, Contração/Recessão (queda na atividade, desemprego, restrição de crédito) e Fundo (início da recuperação).

Em economias africanas como Moçambique, o PIB frequentemente é dinamizado por Grandes Projetos de Investimento (Megaprojetos de Energia, Gás Natural Liquefeito na Bacia do Rovuma, Mineração de Grafite e Areias Pesadas, Infraestrutura Portuária e Corredores de Transporte).

A chave para o empreendedor é saber navegar em cada fase do ciclo:
- Na expansão: Alavancar o crescimento, captar clientes com rapidez, investir em capacidade produtiva, mas manter rigor nos custos fixos.
- Na desaceleração: Proteger a liquidez em caixa, renegociar contratos, focar na eficiência máxima e eliminar linhas deficitárias.`,
    whyItMattersForEntrepreneurs: [
      'Dimensionamento de Capacidade: Evitar comprar capacidade produtiva em excesso no topo do ciclo econômico para não ficar ocioso na recessão.',
      'Sensibilidade da Demanda: Bens essenciais (alimentos básicos, remédios) sofrem menos em recessões; bens discricionários (luxo, reformas caras) caem rapidamente.',
      'Aproveitamento de Oportunidades: Períodos de baixa geram oportunidades de contratar talentos qualificados e adquirir ativos a preços atrativos.',
    ],
    strategiesToMitigate: [
      'Mantenha uma estrutura de custos o mais flexível e variável possível (terceirização pontual vs custos fixos permanentes gigantes).',
      'Construa um fundo de reserva de emergência equivalente a pelo menos 3 a 6 meses de custos fixos da empresa.',
      'Diversifique a carteira entre clientes do setor público, setor privado local e corporações multinacionais.',
    ],
    practicalCalculationExample: 'Ponto de Equilíbrio (Break-Even): Se seus custos fixos mensais são de 200.000 MT e sua margem de contribuição média é de 40%, seu faturamento mínimo para não ter prejuízo é de 500.000 MT/mês (200.000 / 0.40). Reduzir custos fixos para 140.000 MT baixa o seu ponto de sobrevivência para 350.000 MT/mês, tornando a empresa resistente a crises.',
    keyTerms: [
      { term: 'Recessão Técnica', definition: 'Dois trimestres consecutivos de crescimento negativo do PIB.' },
      { term: 'Margem de Contribuição', definition: 'Receita de vendas menos os custos e despesas variáveis correspondentes.' },
    ],
  },
  {
    id: 'taxes_and_fiscality',
    title: 'Regime Tributário e Gestão Fiscal para PMEs',
    shortDefinition: 'Cumprimento das obrigações fiscais (IVA, IRPC/IRPJ, INSS) sem sufocar a saúde de caixa da empresa.',
    deepExplanation: `A carga tributária e as obrigações acessórias são fatores determinantes para a viabilidade de qualquer negócio. No contexto de Moçambique, a Autoridade Tributária (AT) fiscaliza tributos centrais:
1. IVA (Imposto sobre o Valor Acrescentado): Taxa padrão de 16% (reduzida de 17% nas reformas do Pacote de Medidas de Aceleração Econômica - PAE). O IVA não é custo para a empresa inscrita no regime normal, mas sim um valor repassado ao Estado (IVA Liquidado menos IVA Suportado). No entanto, gerenciar mal o caixa do IVA arrecadado pode criar sérios problemas fiscais.
2. IRPC (Imposto sobre o Rendimento das Pessoas Colectivas): Taxa geral de 32% sobre os lucros tributáveis no encerramento do exercício, com regimes simplificados para micro e pequenas empresas (ISPC - Imposto Simplificado para Pequenos Contribuintes).
3. Retenções na Fonte e Segurança Social (INSS): Retenção de IRPS sobre vencimentos e remunerações de trabalhadores, além de contribuições obrigatórias ao INSS (4% empresa + 3% trabalhador).`,
    whyItMattersForEntrepreneurs: [
      'Confusão entre Caixa da Empresa e Impostos: O dinheiro do IVA cobrado na fatura pertence ao Estado e deve ser recolhido até ao dia do vencimento legal.',
      'Acesso a Grandes Clientes: Multinacionais e o Estado só contratam empresas com Certidão de Quitação Fiscal e Situação Regularizada perante a AT e o INSS.',
      'Multas e Juros de Mora: O não cumprimento de prazos tributários gera multas pesadas que desestruturam o fluxo de caixa de uma PME.',
    ],
    strategiesToMitigate: [
      'Abra uma sub-conta bancária de Provisão Fiscal e transfira semanalmente o valor estimado de IVA e retenções.',
      'Mantenha contabilidade organizada desde o primeiro dia com apoio de contabilista certificado registrado na OCAM (Ordem dos Contabilistas e Auditores de Moçambique) ou órgão correspondente.',
      'Aproveite benefícios e incentivos fiscais legais para setores prioritários (agricultura, energias renováveis, zonas francas industriais).',
    ],
    practicalCalculationExample: 'Emissão de fatura de 100.000 MT + IVA (16%) = 116.000 MT recebidos. Se teve 40.000 MT de compras com 6.400 MT de IVA suportado dedutível, você terá de recolher à Autoridade Tributária 9.600 MT (16.000 - 6.400). Apenas 100.000 MT é receita bruta da empresa!',
    keyTerms: [
      { term: 'ISPC (Moçambique)', definition: 'Imposto Simplificado para Pequenos Contribuintes com taxa de 3% sobre o volume de negócios para faturamento anual até limite legal.' },
      { term: 'Crédito de IVA', definition: 'Valor de imposto pago em compras de matérias-primas e serviços que pode ser deduzido do imposto devido em vendas.' },
    ],
  },
];
