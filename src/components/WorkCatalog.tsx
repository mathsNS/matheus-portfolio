import { useMemo, useState } from 'react';
import { works, isProject } from '../data/content';
import type { Project } from '../data/content';
import { ArrowUpRight } from './Icons';

export function WorkCatalog({ onOpen }: { onOpen: (project: Project) => void }) {
  const [kind, setKind] = useState('Todos');
  const [tag, setTag] = useState('Todas');
  const [query, setQuery] = useState('');
  const tags = useMemo(() => [...new Set(works.flatMap((work) => work.tags))].sort((a, b) => a.localeCompare(b, 'pt-BR')), []);
  const filtered = works.filter((work) => {
    const searchable = [work.title, work.summary, work.kind ?? '', ...work.tags].join(' ').toLocaleLowerCase('pt-BR');
    return (kind === 'Todos' || work.kind === kind) && (tag === 'Todas' || work.tags.includes(tag)) && searchable.includes(query.trim().toLocaleLowerCase('pt-BR'));
  });

  return <section className="work-catalog" id="todos-os-trabalhos" aria-labelledby="catalog-title">
    <div className="catalog-heading"><div><span className="catalog-kicker">ARQUIVO / PROJETOS</span><h3 id="catalog-title">Todos os <em>trabalhos</em><span>.</span></h3></div><p>Uma seleção mais ampla de projetos, estudos e soluções, com ou sem interface.</p></div>
    <div className="catalog-filters">
      <label>Buscar<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nome, área ou tecnologia" /></label>
      <label>Tipo<select value={kind} onChange={(event) => setKind(event.target.value)}><option>Todos</option><option>Profissional</option><option>Pessoal</option><option>Universitário</option></select></label>
      <label>Área ou tecnologia<select value={tag} onChange={(event) => setTag(event.target.value)}><option>Todas</option>{tags.map((item) => <option key={item}>{item}</option>)}</select></label>
    </div>
    <p className="catalog-count" role="status">{filtered.length} {filtered.length === 1 ? 'trabalho encontrado' : 'trabalhos encontrados'}</p>
    <div className="catalog-list">{filtered.map((work) => {
      const project = isProject(work) ? work : undefined;
      return <article className="catalog-item" key={work.title}>
        <div><h4>{work.title}</h4><p>{work.summary}</p><div className="catalog-tags">{work.kind && <span>{work.kind}</span>}{work.tags.map((item) => <span key={item}>{item}</span>)}</div></div>
        {project ? <button type="button" className="catalog-open" onClick={() => onOpen(project)} aria-label={`Ver projeto ${work.title}`}>Ver projeto <ArrowUpRight size={17}/></button> : !isProject(work) && work.details ? <details className="catalog-detail"><summary>Sobre o projeto</summary><p>{work.details}</p></details> : null}
      </article>;
    })}</div>
    {filtered.length === 0 && <p className="catalog-empty">Nenhum trabalho encontrado. Experimente outros filtros ou termos de busca.</p>}
  </section>;
}
