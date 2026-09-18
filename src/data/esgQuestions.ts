export interface ESGQuestion {
  id: string;
  pillar: 'E' | 'S' | 'G';
  category: string;
  title: string;
  description: string;
  options: { label: string; points: number }[];
}

export const ESG_QUESTIONS: ESGQuestion[] = [
  // Environmental (E)
  {
    id: 'e1',
    pillar: 'E',
    category: 'Energia & Clima',
    title: 'Uso de Fontes de Energia Limpa e Eficiência Energética',
    description: 'A empresa adota energia solar fotovoltaica, biomassa ou equipamentos certificados com baixo consumo elétrico?',
    options: [
      { label: 'Não consideramos eficiência energética ou fontes renováveis', points: 0 },
      { label: 'Implementamos pequenas medidas de economia de energia na iluminação', points: 3 },
      { label: 'Possuímos painéis solares parciais ou plano formal de redução de consumo', points: 7 },
      { label: 'Operação sustentada majoritariamente por energia solar/limpa e auditoria energética', points: 10 },
    ],
  },
  {
    id: 'e2',
    pillar: 'E',
    category: 'Resíduos & Circularidade',
    title: 'Gestão, Reciclagem e Destinação de Resíduos Sólidos',
    description: 'Como a empresa descarta ou reaproveita sobras de produção, embalagens plásticas e detritos operacionais?',
    options: [
      { label: 'Descarte convencional comum sem separação', points: 0 },
      { label: 'Separação básica de papelão, plástico e metais para catadores locais', points: 4 },
      { label: 'Parceria formal com cooperativas de reciclagem e compostagem de orgânicos', points: 7 },
      { label: 'Política Zero Waste (Aterro Zero) e embalagens 100% biodegradáveis ou recicladas', points: 10 },
    ],
  },
  {
    id: 'e3',
    pillar: 'E',
    category: 'Recursos Hídricos & Meio Ambiente',
    title: 'Conservação da Água e Preservação de Ecossistemas',
    description: 'Medidas para captação de água pluvial, reuso e proteção de rios e solos contra contaminação química.',
    options: [
      { label: 'Sem monitoramento específico do consumo de água', points: 0 },
      { label: 'Monitoramento mensal de hidrômetros e reparo ágil de vazamentos', points: 4 },
      { label: 'Sistemas de captação de água da chuva ou tratamento de efluentes', points: 8 },
      { label: 'Reuso industrial fechado de água e reflorestamento de áreas nativas', points: 10 },
    ],
  },
  // Social (S)
  {
    id: 's1',
    pillar: 'S',
    category: 'Trabalho & Bem-estar',
    title: 'Saúde, Segurança Ocupacional e Remuneração Justa',
    description: 'A empresa fornece Equipamentos de Proteção Individual (EPI), seguro de acidentes e paga acima do piso mínimo legal?',
    options: [
      { label: 'Apenas o cumprimento básico informal da legislação', points: 1 },
      { label: 'Fornecimento regular de EPIs e pagamento rigorosamente em dia', points: 5 },
      { label: 'Plano de saúde ou subsídio médico e remuneração acima da média do setor', points: 8 },
      { label: 'Programa integral de bem-estar, saúde mental, seguro de vida e bônus por resultados', points: 10 },
    ],
  },
  {
    id: 's2',
    pillar: 'S',
    category: 'Inclusão & Diversidade',
    title: 'Diversidade, Liderança Feminina e Oportunidades Juvenis',
    description: 'Proporção de mulheres em cargos de chefia, inclusão de pessoas com deficiência e primeiro emprego jovem.',
    options: [
      { label: 'Sem política intencional de diversidade', points: 1 },
      { label: 'Pelo menos 25% da liderança ocupada por mulheres e contratação de estagiários', points: 5 },
      { label: 'Paridade de gênero em cargos de gerência e programas de mentoria jovem', points: 8 },
      { label: 'Liderança equitativa, políticas antidiscriminação ativas e inclusão social comunitária', points: 10 },
    ],
  },
  {
    id: 's3',
    pillar: 'S',
    category: 'Impacto Comunitário',
    title: 'Desenvolvimento Local e Conteúdo Nacional',
    description: 'Prioridade para compra de insumos de pequenos agricultores e fornecedores locais da comunidade vizinha.',
    options: [
      { label: 'Compras focadas estritamente em menor preço sem olhar origem local', points: 0 },
      { label: 'Pelo menos 30% das compras realizadas com fornecedores da província/comunidade', points: 5 },
      { label: 'Mais de 60% de compras locais com apoio técnico e capacitação de pequenos produtores', points: 8 },
      { label: 'Cadeia de valor compartilhada com projetos educacionais comunitários financiados', points: 10 },
    ],
  },
  // Governance (G)
  {
    id: 'g1',
    pillar: 'G',
    category: 'Transparência Financeira',
    title: 'Contabilidade Formal e Auditoria das Contas',
    description: 'A empresa possui escrituração contábil formal assinada por profissional certificado e demonstrações financeiras anuais?',
    options: [
      { label: 'Controles informais em cadernos ou planilhas sem validação contábil', points: 0 },
      { label: 'Contabilidade regular terceirizada com balancetes trimestrais emitidos', points: 5 },
      { label: 'Demonstrações Financeiras completas anuais (Balanço, DRE, DFC) com relatórios executivos', points: 8 },
      { label: 'Auditoria externa independente anual e comitê consultivo fiscal estabelecido', points: 10 },
    ],
  },
  {
    id: 'g2',
    pillar: 'G',
    category: 'Ética & Anticorrupção',
    title: 'Código de Conduta, Compliance e Prevenção de Fraudes',
    description: 'Políticas escritas e claras que proíbem subornos, propinas, fraudes fiscais e conflitos de interesse.',
    options: [
      { label: 'Não possuímos código formalizado de conduta', points: 1 },
      { label: 'Princípios éticos comunicados verbalmente nas contratações', points: 4 },
      { label: 'Código de Ética e Conduta por escrito assinado por todos os colaboradores e diretores', points: 8 },
      { label: 'Canal anônimo de denúncias, auditoria interna de compras e compliance rigoroso', points: 10 },
    ],
  },
  {
    id: 'g3',
    pillar: 'G',
    category: 'Estrutura Societária & Sucessão',
    title: 'Governança dos Sócios, Direitos de Minoritários e Planejamento',
    description: 'Acordo de acionistas formalizado, reuniões periódicas de diretoria documentadas e divisão clara de funções.',
    options: [
      { label: 'Decisões centralizadas em uma única pessoa sem atas formais', points: 1 },
      { label: 'Reuniões mensais dos sócios com anotação das deliberações', points: 5 },
      { label: 'Conselho Consultivo formal constituído com pelo menos 1 membro independente', points: 8 },
      { label: 'Conselho de Administração atuante, acordo de sócios registrado e plano de sucessão', points: 10 },
    ],
  },
];
