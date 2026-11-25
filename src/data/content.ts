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
  featured: boolean;
  kind?: 'Profissional' | 'Pessoal' | 'Universitário';
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
  repoUrl?: string;
  details?: { title: string; paragraphs: string[] }[];
};

// Cada trabalho é cadastrado uma única vez. Altere featured para escolher a vitrine.
export const works: (Project | CatalogWork)[] = [
  {
    featured: true, kind: 'Profissional',
    slug: 'estoquesensor', number: '01', title: 'EstoqueSensor',
    subtitle: 'Gestão interna de estoque.', category: 'Sistema corporativo',
    year: 'Projeto profissional',
    summary: 'Sistema interno de gerenciamento de estoque desenvolvido para apoiar os fluxos da Sensor Ocupacional.',
    tags: ['Web', 'Sistemas internos', 'Gestão de estoque', 'Software aplicado'],
    art: 'projects/estoquesensor/01-visao-geral-dark.png', images: [
      { src: 'projects/estoquesensor/demo-estoque-sensor.webm', type: 'video', poster: 'projects/estoquesensor/01-visao-geral-dark.png', alt: 'Demonstração de navegação pelo sistema de estoque', caption: 'Demonstração do EstoqueSensor' },
      { src: 'projects/estoquesensor/01-visao-geral-dark.png', alt: 'Painel geral no tema escuro', caption: 'Visão geral' },
      { src: 'projects/estoquesensor/02-produtos-dark.png', alt: 'Catálogo de produtos e saldos', caption: 'Produtos e estoque' },
      { src: 'projects/estoquesensor/03-pedido-venda-dark.png', alt: 'Tela de pedido de venda', caption: 'Pedido de venda' },
      { src: 'projects/estoquesensor/06-historico-estoque-dark.png', alt: 'Histórico de entradas e saídas', caption: 'Histórico de estoque' },
      { src: 'projects/estoquesensor/04-visao-geral-light.png', alt: 'Painel geral no tema claro', caption: 'Tema claro' },
    ], accent: '#66bfd0',
    challenge: 'Sistema interno criado para ajudar a Sensor Ocupacional a organizar e acompanhar seu estoque.',
    approach: 'O desenvolvimento foi orientado às rotinas de controle de produtos e movimentações da empresa.',
    outcome: 'O sistema reúne consultas de estoque, histórico de movimentações e pedidos de venda em uma única interface.',
    details: [
      { title: 'Sobre o sistema', paragraphs: ['O EstoqueSensor foi desenvolvido para apoiar a gestão interna de estoque da Sensor Ocupacional, reunindo informações e tarefas do dia a dia em um só lugar.'] },
      { title: 'Funcionalidades', paragraphs: ['As telas apresentam uma visão geral do estoque, catálogo de produtos, pedidos de venda e histórico de entradas e saídas. A interface também oferece temas claro e escuro.'] },
    ],
  },
  {
    featured: true, kind: 'Universitário',
    slug: 'vita', number: '02', title: 'V.I.T.A.', repoUrl: 'https://github.com/mathsNS/V.I.T.A',
    subtitle: 'Validação Inteligente de Triagem e Atendimento.', category: 'Produto acadêmico',
    year: 'Projeto acadêmico',
    summary: 'Proposta de sistema voltado à pré-triagem e à gestão do atendimento, desenvolvida no contexto de engenharia de requisitos e IHC.',
    tags: ['Mobile', 'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'IHC', 'Requisitos', 'Engenharia de Requisitos'],
    art: 'projects/vita/mobile-01-inicio.png', images: [
      { src: 'projects/vita/mobile-demo.mp4', type: 'video', poster: 'projects/vita/mobile-01-inicio.png', portrait: true, alt: 'Demonstração das telas do V.I.T.A.', caption: 'Demonstração do V.I.T.A.' },
      { src: 'projects/vita/mobile-01-inicio.png', portrait: true, alt: 'Tela inicial do paciente', caption: 'Início do paciente' },
      { src: 'projects/vita/mobile-02-triagem-chat.png', portrait: true, alt: 'Conversa de pré-triagem', caption: 'Pré-triagem' },
      { src: 'projects/vita/mobile-03-triagem-resultado.png', portrait: true, alt: 'Resultado da pré-triagem', caption: 'Resultado da pré-triagem' },
      { src: 'projects/vita/mobile-04-agendamento.png', portrait: true, alt: 'Tela de agendamento de consulta', caption: 'Agendamento' },
      { src: 'projects/vita/mobile-05-fila-profissional.png', portrait: true, alt: 'Fila de atendimento do profissional', caption: 'Fila de atendimento' },
      { src: 'projects/vita/mobile-06-conduta-clinica.png', portrait: true, alt: 'Tela de conduta clínica', caption: 'Conduta clínica' },
    ], accent: '#7ba8ce',
    challenge: 'O V.I.T.A. é uma proposta de pré-triagem e gestão do atendimento em saúde, criada nas disciplinas de IHC e Engenharia de Requisitos da UFCA.',
    approach: 'A equipe mapeou as jornadas de pacientes e profissionais e criou um protótipo navegável com React, TypeScript e Tailwind CSS.',
    outcome: 'O protótipo apresenta telas de pré-triagem, agendamento, fila de atendimento e conduta clínica. Os dados são simulados e não há integração com backend.',
    details: [
      { title: 'Contexto', paragraphs: ['V.I.T.A. significa Validação Inteligente de Triagem e Atendimento. O projeto foi desenvolvido como atividade prática das disciplinas de Interação Humano-Computador e Engenharia de Requisitos da Universidade Federal do Cariri.', 'A proposta considera as jornadas de pacientes e profissionais de saúde, desde a pré-triagem até o atendimento.'] },
      { title: 'Pesquisa e definição dos fluxos', paragraphs: ['A equipe produziu um mapa de jornada para registrar etapas, objetivos, dificuldades e momentos importantes da experiência. Um diagrama de fluxo de interação descreve a navegação, as decisões e as alternativas do protótipo.'] },
      { title: 'Protótipo e tecnologias', paragraphs: ['O protótipo navegável de alta fidelidade reúne telas de início, conversa de pré-triagem, resultado, agendamento, fila profissional e conduta clínica.', 'A interface foi construída com React, Vite e TypeScript, usando Tailwind CSS, shadcn/ui, Lucide Icons e Framer Motion. As informações são simuladas: o protótipo não possui integração com backend nem representa uma implantação clínica.'] },
    ],
  },
  {
    featured: true,
    slug: 'ecotech', number: '03', title: 'EcoTech', repoUrl: 'https://github.com/mathsNS/Ecotech',
    subtitle: 'Gestão do descarte de eletrônicos.', category: 'Sustentabilidade & software',
    year: 'Projeto em equipe',
    summary: 'Plataforma de gestão do descarte de resíduos eletrônicos, conectando solicitações, pontos de coleta e rastreabilidade em um fluxo digital.',
    tags: ['Web', 'Mobile', 'Python', 'Flask', 'SQLite', 'Sustentabilidade', 'Logística reversa'],
    art: 'projects/ecotech/web-01-landing.png', images: [
      { src: 'projects/ecotech/mobile-demo-cidadao.mp4', type: 'video', poster: 'projects/ecotech/mobile-01-dashboard-cidadao.png', portrait: true, alt: 'Demonstração da jornada do cidadão no EcoTech', caption: 'Demonstração da jornada do cidadão' },
      { src: 'projects/ecotech/mobile-01-dashboard-cidadao.png', portrait: true, alt: 'Painel do cidadão', caption: 'Painel do cidadão' },
      { src: 'projects/ecotech/mobile-02-nova-solicitacao.png', portrait: true, alt: 'Tela de nova solicitação', caption: 'Nova solicitação' },
      { src: 'projects/ecotech/mobile-04-dashboard-empresa.png', portrait: true, alt: 'Painel da empresa', caption: 'Painel da empresa' },
      { src: 'projects/ecotech/mobile-05-oportunidades-empresa.png', portrait: true, alt: 'Oportunidades de coleta para empresas', caption: 'Oportunidades de coleta' },
      { src: 'projects/ecotech/web-01-landing.png', alt: 'Página inicial web do EcoTech', caption: 'Página inicial web' },
    ], accent: '#69b8d5',
    challenge: 'O EcoTech conecta cidadãos, empresas e pontos de coleta para facilitar o descarte e o acompanhamento de resíduos eletrônicos.',
    approach: 'Desenvolvi o controle dos estados das solicitações e os métodos de tratamento, em equipe com Abner Levi e Maria Antônia. O sistema utiliza Python, Flask e SQLite.',
    outcome: 'A plataforma permite cadastrar dispositivos, solicitar e acompanhar coletas, consultar relatórios e gerenciar pontos de coleta. A coleta domiciliar também inclui chat e negociação de agendamento.',
    details: [
      { title: 'O projeto', paragraphs: ['O EcoTech é um sistema de gerenciamento do descarte de lixo eletrônico. A plataforma conecta cidadãos e empresas a pontos de coleta e organiza o acompanhamento dos dispositivos ao longo do processo de descarte e tratamento.'] },
      { title: 'Equipe e contribuição', paragraphs: ['O projeto foi desenvolvido por Abner Levi, Maria Antônia e Matheus Nogueira. Abner trabalhou no módulo de dispositivos eletrônicos e nos testes; Maria, no sistema de usuários e nos relatórios ambientais; e eu implementei o sistema de estados das solicitações e os métodos de tratamento.'] },
      { title: 'Funcionalidades', paragraphs: ['O sistema oferece jornadas para cidadãos, empresas e administradores, cadastro de usuários e dispositivos, solicitações e rastreamento de coletas, gerenciamento de pontos de coleta, cálculo de impacto ambiental e relatórios de sustentabilidade.', 'Na coleta domiciliar, há verificação de elegibilidade, ofertas progressivas, aceite, chat privado e negociação de agendamento. A aplicação também registra eventos e oferece diagnóstico operacional do despacho.'] },
      { title: 'Arquitetura e tecnologias', paragraphs: ['A aplicação utiliza Python, Flask e SQLite e está organizada em camadas de domínio, aplicação e infraestrutura. O domínio concentra as regras de negócio; os serviços coordenam os casos de uso; e a infraestrutura trata da interface web e da persistência.', 'O projeto usa os padrões State para o ciclo de vida das solicitações, Strategy para os métodos de tratamento e Factory para criação de objetos. O repositório documenta testes automatizados para domínio, serviços, persistência e jornadas web.'] },
    ],
  },
  { featured: false, title: 'Transparência de Obras', summary: 'Projeto de banco de dados para organizar e consultar informações sobre obras públicas.', kind: 'Universitário', tags: ['Banco de dados', 'SQL', 'Dados públicos'], details: 'Trabalho acadêmico com foco em modelagem e consultas de informações sobre obras públicas.' },
];

// Trabalhos sem galeria podem aparecer no catálogo com uma descrição simples.
export type CatalogWork = {
  featured: false;
  title: string;
  summary: string;
  kind?: 'Profissional' | 'Pessoal' | 'Universitário';
  tags: string[];
  details?: string;
};

export const isProject = (work: Project | CatalogWork): work is Project => 'images' in work;
export const projects = works.filter(isProject);
export const featuredProjects = projects.filter((project) => project.featured);

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
