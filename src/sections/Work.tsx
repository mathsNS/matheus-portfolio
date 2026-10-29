import { Atmosphere } from '../components/Atmosphere';
import { ArrowUpRight } from '../components/Icons';
import { SectionLabel } from '../components/SectionLabel';
import { ProjectGallery } from '../components/ProjectGallery';
import { projects } from '../data/content';
import type { Project } from '../data/content';

export function Work({ onOpen }: { onOpen: (project: Project) => void }) {
  return <section className="work-section" id="work">
    <Atmosphere variant="work" />
    <div className="work-intro wrap"><SectionLabel number="01">PROJETOS</SectionLabel>
      <h2 className="section-heading" data-reveal>Projetos <span className="serif-italic">selecionados</span><span className="text-accent">.</span></h2>
    </div>
    <div className="project-list wrap">{projects.map(p => <article className="project-panel" key={p.slug}>
      <ProjectGallery project={p}/>
      <div className="project-information"><span className="project-number" data-panel>/{p.number}</span>
        <div className="project-identity" data-panel><h3>{p.title}</h3><p>{p.summary}</p><div className="project-chip-row">{p.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
        <button type="button" className="project-details" data-panel onClick={() => onOpen(p)} aria-label={`Ver detalhes e estudo de caso de ${p.title}`}>
          Ver projeto <ArrowUpRight size={19}/>
        </button>
      </div>
    </article>)}</div><div className="transition-band" aria-hidden="true"><span className="transition-band-line"/></div>
  </section>;
}
