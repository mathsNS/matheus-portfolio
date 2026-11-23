/** EDIT HERE — all externally visible personal data lives in this file. */
export const identity = {
  name: 'Matheus Nogueira',
  role: 'Engenharia de Software',
  shortline: 'Desenvolvimento de sistemas, automações e soluções web.',
  location: 'Ceará, Brasil',
  github: 'https://github.com/mathsNS',
  linkedin: 'https://www.linkedin.com/in/matheus-nogueira1',
  email: 'matheusnogueira.005@gmail.com',
  resume: 'mailto:matheusnogueira.005@gmail.com?subject=Solicita%C3%A7%C3%A3o%20de%20curr%C3%ADculo',
} as const;

export type ProjectImage = { src: string; alt: string; caption?: string; type?: 'video'; poster?: string; portrait?: boolean };

export type Project = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  summary: string;
  tags: string[];
  art: string; // Lead illustration, kept for case-study header.
  images: ProjectImage[]; // Add screenshots to public/projects/ and list them here.
  accent: string;
  challenge: string;
  approach: string;
  outcome: string;
  caution?: string;
};

export const projects: Project[] = [
  {
    slug: 'estoquesensor', number: '01', title: 'EstoqueSensor',
    subtitle: 'Gestão interna de estoque.', category: 'Sistema corporativo',
    year: 'Projeto profissional',
    summary: 'Sistema interno de gerenciamento de estoque desenvolvido para apoiar os fluxos da Sensor Ocupacional.',
    tags: ['Sistemas internos', 'Gestão de estoque', 'Software aplicado'],
    art: 'projects/estoquesensor/01-visao-geral-dark.png', images: [
      { src: 'projects/estoquesensor/demo-estoque-sensor.webm', type: 'video', poster: 'projects/estoquesensor/01-visao-geral-dark.png', alt: 'Demonstração de navegação pelo sistema de estoque', caption: 'Demonstração do EstoqueSensor' },
      { src: 'projects/estoquesensor/01-visao-geral-dark.png', alt: 'Painel geral no tema escuro', caption: 'Visão geral' },
      { src: 'projects/estoquesensor/02-produtos-dark.png', alt: 'Catálogo de produtos e saldos', caption: 'Produtos e estoque' },
      { src: 'projects/estoquesensor/03-pedido-venda-dark.png', alt: 'Tela de pedido de venda', caption: 'Pedido de venda' },
      { src: 'projects/estoquesensor/06-historico-estoque-dark.png', alt: 'Histórico de entradas e saídas', caption: 'Histórico de estoque' },
      { src: 'projects/estoquesensor/04-visao-geral-light.png', alt: 'Painel geral no tema claro', caption: 'Tema claro' },
    ], accent: '#66bfd0',
    challenge: 'Apoiar a organização e o acompanhamento de materiais em um contexto operacional real.',
    approach: 'Desenvolvimento de uma solução interna orientada ao fluxo de gerenciamento de estoque.',
    outcome: 'Sistema desenvolvido para uso interno. Indicadores e resultados quantitativos não publicados.',
  },
  {
    slug: 'vita', number: '02', title: 'V.I.T.A.',
    subtitle: 'Pré-triagem e atendimento.', category: 'Produto acadêmico',
    year: 'Projeto acadêmico',
    summary: 'Proposta de sistema voltado à pré-triagem e à gestão do atendimento, desenvolvida no contexto de engenharia de requisitos e IHC.',
    tags: ['IHC', 'Requisitos', 'Fluxos de atendimento'],
    art: 'projects/vita/mobile-01-inicio.png', images: [
      { src: 'projects/vita/mobile-demo.mp4', type: 'video', poster: 'projects/vita/mobile-01-inicio.png', portrait: true, alt: 'Demonstração das telas do V.I.T.A.', caption: 'Demonstração do V.I.T.A.' },
      { src: 'projects/vita/mobile-01-inicio.png', portrait: true, alt: 'Tela inicial do paciente', caption: 'Início do paciente' },
      { src: 'projects/vita/mobile-02-triagem-chat.png', portrait: true, alt: 'Conversa de pré-triagem', caption: 'Pré-triagem' },
      { src: 'projects/vita/mobile-03-triagem-resultado.png', portrait: true, alt: 'Resultado da pré-triagem', caption: 'Resultado da pré-triagem' },
      { src: 'projects/vita/mobile-04-agendamento.png', portrait: true, alt: 'Tela de agendamento de consulta', caption: 'Agendamento' },
      { src: 'projects/vita/mobile-05-fila-profissional.png', portrait: true, alt: 'Fila de atendimento do profissional', caption: 'Fila de atendimento' },
      { src: 'projects/vita/mobile-06-conduta-clinica.png', portrait: true, alt: 'Tela de conduta clínica', caption: 'Conduta clínica' },
    ], accent: '#7ba8ce',
    challenge: 'Organizar informações e etapas do atendimento com foco em clareza, acessibilidade e contexto de uso.',
    approach: 'Estruturação de requisitos, jornadas e propostas de interface para etapas de pré-triagem e gestão.',
    outcome: 'Projeto acadêmico. Resultados clínicos, implantação e indicadores não alegados.',
  },
  {
    slug: 'ecotech', number: '03', title: 'EcoTech',
    subtitle: 'Projeto EcoTech.', category: 'Sustentabilidade & software',
    year: 'Projeto pessoal',
    summary: 'Plataforma de gestão do descarte de resíduos eletrônicos, conectando solicitações, pontos de coleta e rastreabilidade em um fluxo digital.',
    tags: ['Python & Flask', 'SQLite', 'Logística reversa'],
    art: 'projects/ecotech/web-01-landing.png', images: [
      { src: 'projects/ecotech/mobile-demo-cidadao.mp4', type: 'video', poster: 'projects/ecotech/mobile-01-dashboard-cidadao.png', portrait: true, alt: 'Demonstração da jornada do cidadão no EcoTech', caption: 'Demonstração da jornada do cidadão' },
      { src: 'projects/ecotech/mobile-01-dashboard-cidadao.png', portrait: true, alt: 'Painel do cidadão', caption: 'Painel do cidadão' },
      { src: 'projects/ecotech/mobile-02-nova-solicitacao.png', portrait: true, alt: 'Tela de nova solicitação', caption: 'Nova solicitação' },
      { src: 'projects/ecotech/mobile-04-dashboard-empresa.png', portrait: true, alt: 'Painel da empresa', caption: 'Painel da empresa' },
      { src: 'projects/ecotech/mobile-05-oportunidades-empresa.png', portrait: true, alt: 'Oportunidades de coleta para empresas', caption: 'Oportunidades de coleta' },
      { src: 'projects/ecotech/web-01-landing.png', alt: 'Página inicial web do EcoTech', caption: 'Página inicial web' },
    ], accent: '#69b8d5',
    challenge: 'Contribuir para uma jornada de descarte de eletrônicos que seja acompanhável, organizada e orientada à destinação responsável.',
    approach: 'Desenvolvimento de uma aplicação em Python/Flask e SQLite, com separação entre camadas de infraestrutura, aplicação e domínio e modelagem do ciclo de solicitações.',
    outcome: 'Projeto pessoal voltado à organização do descarte de resíduos eletrônicos.',
  },
];

// Catálogo separado da vitrine: novos trabalhos podem ser adicionados sem precisar de imagens.
export type CatalogWork = {
  title: string;
  summary: string;
  kind?: 'Profissional' | 'Pessoal' | 'Universitário';
  tags: string[];
  projectSlug?: string;
  details?: string;
};

export const catalogWorks: CatalogWork[] = [
  { title: 'EstoqueSensor', summary: 'Sistema interno para gestão de estoque da Sensor Ocupacional.', kind: 'Profissional', tags: ['Web', 'Gestão de estoque'], projectSlug: 'estoquesensor' },
  { title: 'V.I.T.A.', summary: 'Proposta acadêmica de pré-triagem e gestão do atendimento.', kind: 'Universitário', tags: ['Mobile', 'IHC', 'Requisitos'], projectSlug: 'vita' },
  { title: 'EcoTech', summary: 'Plataforma de gestão do descarte de resíduos eletrônicos.', kind: 'Pessoal', tags: ['Web', 'Mobile', 'Python', 'Flask', 'SQLite', 'Sustentabilidade'], projectSlug: 'ecotech' },
  { title: 'Transparência de Obras', summary: 'Projeto de banco de dados para organizar e consultar informações sobre obras públicas.', kind: 'Universitário', tags: ['Banco de dados', 'SQL', 'Dados públicos'], details: 'Trabalho acadêmico com foco em modelagem e consultas de informações sobre obras públicas.' },
];

export const experiences = [
  { index: '01', org: 'Unimed Cariri', role: 'Estagiário de TI', period: '2026 — atual', type: 'Tecnologia corporativa', description: 'Desenvolvimento e suporte a automações, APIs, integrações e soluções em ambientes corporativos.', keys: ['Automações', 'APIs', 'Integrações'] },
  { index: '02', org: 'Sensor Ocupacional', role: 'Analista de Sistemas Júnior', period: 'Experiência profissional', type: 'Sistemas de negócio', description: 'Desenvolvimento de sistemas internos, incluindo soluções de estoque, ferramentas web e melhorias de processos.', keys: ['Sistemas internos', 'Web', 'Processos'] },
  { index: '03', org: 'Calang.io', role: 'Diretor Presidente', period: '2026 — atual', type: 'Liderança & tecnologia', description: 'Liderança de uma empresa júnior de tecnologia, com atuação em projetos, gestão de equipes e desenvolvimento de soluções.', keys: ['Liderança', 'Projetos', 'Estratégia'] },
];

export const expertise = [
  { id: 'frontend', index: '01', label: 'Frontend', headline: 'Interfaces e aplicações web.', items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'], short: 'Interface, experiência e precisão visual.' },
  { id: 'backend', index: '02', label: 'Backend', headline: 'APIs e serviços.', items: ['Python', 'Flask', 'FastAPI', 'Node.js', 'Express'], short: 'APIs, serviços e lógica de negócio.' },
  { id: 'database', index: '03', label: 'Databases', headline: 'Modelagem e consultas.', items: ['SQL', 'MySQL', 'SQLite', 'Oracle'], short: 'Modelagem, consulta e organização de dados.' },
  { id: 'tools', index: '04', label: 'Tools & Infra', headline: 'Ferramentas e infraestrutura.', items: ['Git', 'GitHub', 'Docker', 'Postman', 'Google Cloud'], short: 'Ferramentas para construir e entregar.' },
];

export const education = [
  { type: 'GRADUAÇÃO', title: 'Engenharia de Software', org: 'Universidade Federal do Cariri — UFCA', note: 'Graduação em andamento' },
  { type: 'APRENDIZADO AWS', title: 'AWS Technical Essentials', org: 'Treinamento concluído', note: '' },
  { type: 'BADGE AWS', title: 'AWS Cloud Quest: Cloud Practitioner', org: 'Badge de aprendizado', note: '' },
];
