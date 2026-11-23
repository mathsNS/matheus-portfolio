import { Atmosphere } from '../components/Atmosphere';
import { useEffect, useState } from 'react';
import { ScrollTrigger } from '../hooks/useMotion';
import { ArrowUpRight } from '../components/Icons';
import { SectionLabel } from '../components/SectionLabel';
import { ProjectGallery } from '../components/ProjectGallery';
import { WorkCatalog } from '../components/WorkCatalog';
import { projects } from '../data/content';
import type { Project } from '../data/content';

export function Work({ onOpen, galleryEnabled }: { onOpen: (project: Project) => void; galleryEnabled: boolean }) {
  const [catalogOpen, setCatalogOpen] = useState(false);
  useEffect(() => { ScrollTrigger.refresh(); }, [catalogOpen]);
  return <section className="work-section" id="work">
    <Atmosphere variant="work" />
    <div className="work-intro wrap"><SectionLabel number="01">PROJETOS</SectionLabel>
      <h2 className="section-heading" data-reveal>Projetos <span className="serif-italic">selecionados</span><span className="text-accent">.</span></h2>
    </div>
    <div className="project-list wrap">{projects.map(p => <article className="project-panel" key={p.slug}>
      <ProjectGallery project={p} enabled={galleryEnabled}/>
      <div className="project-information"><span className="project-number" data-panel>/{p.number}</span>
        <div className="project-identity" data-panel><h3>{p.title}</h3><p>{p.summary}</p><div className="project-chip-row">{p.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
        <button type="button" className="project-details" data-panel onClick={() => onOpen(p)} aria-label={`Ver detalhes e estudo de caso de ${p.title}`}>
          Ver projeto <ArrowUpRight size={19}/>
        </button>
      </div>
    </article>)}</div>
    <div className="work-catalog-wrap wrap">
      <button type="button" className="catalog-toggle" aria-expanded={catalogOpen} aria-controls="todos-os-trabalhos" onClick={() => {
        if (!catalogOpen) {
          setCatalogOpen(true);
          window.requestAnimationFrame(() => document.getElementById('todos-os-trabalhos')?.scrollIntoView({ block: 'start' }));
        } else setCatalogOpen(false);
      }}>{catalogOpen ? 'Fechar todos os trabalhos' : 'Ver todos os trabalhos'} <ArrowUpRight size={21}/></button>
      {catalogOpen && <WorkCatalog onOpen={onOpen} />}
    </div>
    <div className="transition-band" aria-hidden="true"><span className="transition-band-line"/></div>
  </section>;
}
