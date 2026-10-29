import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, X } from './Icons';
import { useReducedMotion } from '../hooks/useMotion';
import type { Project, ProjectImage } from '../data/content';

const SLIDE_DURATION = 3200;
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

/** Real image gallery, ready for files in public/projects/. No fictitious product screenshots. */
export function ProjectGallery({ project }: { project: Project }) {
  const images = project.images;
  const reduced = useReducedMotion();
  const closeButton = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  useEffect(() => {
    if (images.length < 2 || reduced || paused || fullscreen || !pageVisible) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % images.length), SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [images.length, reduced, paused, fullscreen, pageVisible, index]);

  useEffect(() => {
    if (!fullscreen) return;
    lastFocus.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setFullscreen(false); }
      else if (event.key === 'ArrowLeft') { event.preventDefault(); setIndex(i => (i - 1 + images.length) % images.length); }
      else if (event.key === 'ArrowRight') { event.preventDefault(); setIndex(i => (i + 1) % images.length); }
      else if (event.key === 'Tab') {
        const controls = [...document.querySelectorAll<HTMLButtonElement>('.gallery-lightbox button')];
        if (!controls.length) return;
        const first = controls[0]; const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', keydown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', keydown); lastFocus.current?.focus(); };
  }, [fullscreen, images.length]);

  const go = (step: number) => setIndex((current) => (current + step + images.length) % images.length);
  const imageDescription = (img: ProjectImage) => `${project.title}: ${img.alt}`;
  const current = images[index];
  return <>
    <div className="project-gallery" aria-label={`Galeria de imagens de ${project.title}`}>
      <div className="gallery-viewport" onPointerEnter={(event) => { if (event.pointerType === "mouse") setPaused(true); }} onPointerLeave={(event) => { if (event.pointerType === "mouse") setPaused(false); }}>
        {images.map((img, i) => <button type="button" key={img.src} className={`gallery-slide ${index === i ? 'is-active' : ''}`}
          tabIndex={index === i ? 0 : -1} aria-hidden={index !== i} disabled={index !== i}
          onClick={() => setFullscreen(true)} aria-label={`Ampliar imagem ${i + 1} de ${images.length} de ${project.title}`}>
          <img src={asset(img.src)} alt={imageDescription(img)} loading={i === 0 ? 'eager' : 'lazy'} />
          <span className="gallery-zoom">Ampliar <span aria-hidden="true">↗</span></span>
        </button>)}
        <div className="gallery-bottom" aria-hidden="true"><span>{String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span></div>
      </div>
      {images.length > 1 && <div className="gallery-controls">
        <div className="gallery-pagination" aria-label="Selecionar imagem">
          {images.map((img, i) => <button key={img.src} type="button" className={`gallery-dot ${index === i ? 'is-active' : ''}`}
            onClick={() => setIndex(i)} aria-label={`Mostrar imagem ${i + 1}`} aria-current={index === i ? 'true' : undefined}><span /></button>)}
        </div>
        <div className="gallery-arrows"><button type="button" aria-label={`Imagem anterior de ${project.title}`} onClick={() => go(-1)}><ArrowLeft size={18}/></button><button type="button" aria-label={`Próxima imagem de ${project.title}`} onClick={() => go(1)}><ArrowRight size={18}/></button></div>
      </div>}
    </div>
    {fullscreen && createPortal(<div className="gallery-lightbox" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setFullscreen(false); }}>
      <section className="gallery-lightbox-dialog" role="dialog" aria-modal="true" aria-label={`Imagem ampliada de ${project.title}`}>
        <div className="gallery-lightbox-toolbar"><span>{project.title} <span aria-hidden="true">/</span> {index + 1} de {images.length}</span><button type="button" onClick={() => setFullscreen(false)} ref={closeButton} aria-label="Fechar imagem ampliada"><X size={25}/></button></div>
        <div className="gallery-lightbox-stage"><img key={current.src} src={asset(current.src)} alt={imageDescription(current)} /></div>
        <div className="gallery-lightbox-foot"><span>{current.caption || 'Visual conceitual do projeto'}</span><div>{images.length > 1 && <><button type="button" aria-label="Imagem anterior" onClick={() => go(-1)}><ArrowLeft size={23}/></button><button type="button" aria-label="Próxima imagem" onClick={() => go(1)}><ArrowRight size={23}/></button></>}</div></div>
      </section>
    </div>, document.body)}
  </>;
}
