/** EDIT HERE — all externally visible personal data lives in this file. */
export const identity = {
  name: 'Matheus Nogueira',
  role: 'Engenharia de Software',
  shortline: 'Desenvolvimento de sistemas, automações e soluções web.',
  location: 'Ceará, Brasil',
  // TODO: Fill these only after verifying the URL or address.
  github: '',
  linkedin: 'https://www.linkedin.com/in/matheus-nogueira1',
  email: '',
  resume: '', // Place resume.pdf in public/ and set this to `${import.meta.env.BASE_URL}resume.pdf`.
} as const;

export type ProjectImage = { src: string; alt: string; caption?: string };

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
    art: 'art/estoquesensor.svg', images: [{ src: 'art/estoquesensor.svg', alt: 'Ilustração de abertura', caption: 'Arte conceitual' }, { src: 'art/estoquesensor-detail.svg', alt: 'Estudo gráfico complementar', caption: 'Arte conceitual' }, { src: 'art/estoquesensor-structure.svg', alt: 'Composição visual de estrutura', caption: 'Arte conceitual' }], accent: '#66bfd0',
    challenge: 'Apoiar a organização e o acompanhamento de materiais em um contexto operacional real.',
    approach: 'Desenvolvimento de uma solução interna orientada ao fluxo de gerenciamento de estoque.',
    outcome: 'Sistema desenvolvido para uso interno. Indicadores e resultados quantitativos não publicados.',
    caution: 'Representação visual conceitual. Interface e código proprietários não são exibidos.',
  },
  {
    slug: 'vita', number: '02', title: 'V.I.T.A.',
    subtitle: 'Pré-triagem e atendimento.', category: 'Produto acadêmico',
    year: 'Projeto acadêmico',
    summary: 'Proposta de sistema voltado à pré-triagem e à gestão do atendimento, desenvolvida no contexto de engenharia de requisitos e IHC.',
    tags: ['IHC', 'Requisitos', 'Fluxos de atendimento'],
    art: 'art/vita.svg', images: [{ src: 'art/vita.svg', alt: 'Ilustração de abertura', caption: 'Arte conceitual' }, { src: 'art/vita-detail.svg', alt: 'Estudo gráfico complementar', caption: 'Arte conceitual' }, { src: 'art/vita-structure.svg', alt: 'Composição visual de estrutura', caption: 'Arte conceitual' }], accent: '#7ba8ce',
    challenge: 'Organizar informações e etapas do atendimento com foco em clareza, acessibilidade e contexto de uso.',
    approach: 'Estruturação de requisitos, jornadas e propostas de interface para etapas de pré-triagem e gestão.',
    outcome: 'Projeto acadêmico. Resultados clínicos, implantação e indicadores não alegados.',
    caution: 'Arte conceitual. Não representa produto clínico implantado.',
  },
  {
    slug: 'transparencia-obras', number: '03', title: 'Transparência de Obras',
    subtitle: 'Banco de dados para obras públicas.', category: 'Dados & transparência',
    year: 'Projeto acadêmico',
    summary: 'Projeto acadêmico de banco de dados sobre organização e consulta de informações relativas a obras públicas.',
    tags: ['Banco de dados', 'SQL', 'Dados públicos'],
    art: 'art/obras.svg', images: [{ src: 'art/obras.svg', alt: 'Ilustração de abertura', caption: 'Arte conceitual' }, { src: 'art/obras-detail.svg', alt: 'Estudo gráfico complementar', caption: 'Arte conceitual' }, { src: 'art/obras-structure.svg', alt: 'Composição visual de estrutura', caption: 'Arte conceitual' }], accent: '#5facc5',
    challenge: 'Tornar informações estruturadas sobre obras públicas mais organizadas e compreensíveis.',
    approach: 'Aplicação de conceitos de modelagem e consulta de bancos de dados no domínio de obras públicas.',
    outcome: 'Trabalho acadêmico. Link e documentação técnica detalhada a adicionar.',
    caution: 'Visualização artística, sem dados ou estatísticas reais.',
  },
  {
    slug: 'ecotech', number: '04', title: 'EcoTech',
    subtitle: 'Projeto EcoTech.', category: 'Sustentabilidade & software',
    year: 'Projeto em desenvolvimento',
    summary: 'Plataforma de gestão do descarte de resíduos eletrônicos, conectando solicitações, pontos de coleta e rastreabilidade em um fluxo digital.',
    tags: ['Python & Flask', 'SQLite', 'Logística reversa'],
    art: 'art/ecotech.svg', images: [
      { src: 'art/ecotech.svg', alt: 'Identidade visual conceitual de descarte eletrônico e economia circular', caption: 'Arte conceitual — não é captura de tela' },
      { src: 'art/ecotech-flow.svg', alt: 'Fluxo conceitual entre solicitação, coleta e destinação', caption: 'Fluxo ilustrativo, não documentação operacional' },
      { src: 'art/ecotech-structure.svg', alt: 'Estrutura conceitual do software e suas camadas', caption: 'Ilustração conceitual da arquitetura' },
    ], accent: '#69b8d5',
    challenge: 'Contribuir para uma jornada de descarte de eletrônicos que seja acompanhável, organizada e orientada à destinação responsável.',
    approach: 'Desenvolvimento de uma aplicação em Python/Flask e SQLite, com separação entre camadas de infraestrutura, aplicação e domínio e modelagem do ciclo de solicitações.',
    outcome: 'Projeto em desenvolvimento. Não são apresentados indicadores de impacto ou adoção sem comprovação.',
    caution: 'As imagens exibidas são ilustrações conceituais; não representam telas ou operações reais da plataforma.',
  },
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
  { type: 'APRENDIZADO AWS', title: 'AWS Technical Essentials', org: 'Treinamento concluído', note: 'Link de verificação a adicionar' },
  { type: 'BADGE AWS', title: 'AWS Cloud Quest: Cloud Practitioner', org: 'Badge de aprendizado', note: 'Link de verificação a adicionar' },
];
