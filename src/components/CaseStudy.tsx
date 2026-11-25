import { useEffect, useRef } from 'react';
import type { Project } from '../data/content';
import { X, ArrowLeft, ArrowUpRight } from './Icons';
import { ProjectGallery } from './ProjectGallery';
export function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (document.querySelector('.gallery-lightbox')) return;
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const focusables = [...document.querySelectorAll<HTMLElement>('.case-study button, .case-study a[href]')];
        const first = focusables[0]; const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = previousOverflow; document.documentElement.style.overflow = previousRootOverflow; document.removeEventListener('keydown', onKey); previousFocus?.focus(); };
  }, [onClose]);
  return <div className="case-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="case-study" data-lenis-prevent role="dialog" aria-modal="true" aria-labelledby="case-title">
      <div className="case-toolbar"><span>MN / PROJETOS - {project.number}</span><button type="button" ref={closeRef} onClick={onClose} aria-label="Fechar estudo de caso"><X size={23}/></button></div>
      <div className="case-body"><span className="case-category">{project.category} / {project.year}</span><h2 id="case-title">{project.title}<span>.</span></h2><p className="case-tagline">{project.subtitle}</p>
        <div className="case-content"><div className="case-cover"><ProjectGallery project={project} /></div>
        <div className="case-columns"><div><span className="case-eyebrow">01 / SOBRE O PROJETO</span><p>{project.challenge}</p></div><div><span className="case-eyebrow">02 / DESENVOLVIMENTO</span><p>{project.approach}</p></div><div><span className="case-eyebrow">03 / O QUE FOI FEITO</span><p>{project.outcome}</p></div></div></div>
        <div className="case-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        {project.repoUrl && <a className="case-repo" href={project.repoUrl} target="_blank" rel="noopener noreferrer">Ver repositório no GitHub <ArrowUpRight size={18}/></a>}
        {project.details && <div className="case-details" aria-label="Mais detalhes do projeto">{project.details.map((section) => <section className="case-detail-section" key={section.title}><h3>{section.title}</h3><div>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>)}</div>}
        {project.caution && <p className="case-notice">NOTA: {project.caution}</p>}
        <button type="button" className="case-back" onClick={onClose}><ArrowLeft size={20}/> Voltar aos projetos</button>
      </div>
    </section>
  </div>;
}
