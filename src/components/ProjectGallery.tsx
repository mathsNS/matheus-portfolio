import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, X } from './Icons';
import { useReducedMotion } from '../hooks/useMotion';
import type { Project, ProjectImage } from '../data/content';
import type { ReactNode } from 'react';

const SLIDE_DURATION = 3200;
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
const phone = (content: ReactNode, portrait?: boolean) => portrait ? <span className="phone-frame" style={{ backgroundImage: `url('${asset('art/iphone-frame.png')}')` }}><span className="phone-screen">{content}</span><span className="phone-notch" aria-hidden="true" /></span> : content;

/** Real image gallery, ready for files in public/projects/. No fictitious product screenshots. */
export function ProjectGallery({ project, allowFullscreen = true, enabled = true }: { project: Project; allowFullscreen?: boolean; enabled?: boolean }) {
  const images = project.images;
  const reduced = useReducedMotion();
  const closeButton = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [wide, setWide] = useState(() => window.matchMedia('(min-width: 701px)').matches);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const [inView, setInView] = useState(false);
  const slides = useMemo(() => {
    const groups: ProjectImage[][] = [];
    for (let i = 0; i < images.length; i++) {
      const item = images[i];
      const next = images[i + 1];
      if (wide && item.portrait && item.type !== 'video' && next?.portrait && next.type !== 'video') {
        groups.push([item, next]);
        i++;
      } else groups.push([item]);
    }
    return groups;
  }, [images, wide]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 701px)');
    const update = () => { setWide(media.matches); setIndex(0); };
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.3), { threshold: 0.3 });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (enabled && inView && pageVisible && !fullscreen && !reduced) video.play().catch(() => {});
    else video.pause();
  }, [enabled, inView, pageVisible, fullscreen, reduced, index]);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  useEffect(() => {
    if (!enabled || !inView || slides.length < 2 || reduced || paused || userPaused || focusWithin || fullscreen || !pageVisible || slides[index]?.[0].type === 'video') return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % slides.length), SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [slides, reduced, paused, userPaused, focusWithin, fullscreen, pageVisible, enabled, inView, index]);

  useEffect(() => {
    if (!fullscreen) return;
    lastFocus.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setFullscreen(false); }
      else if (event.key === 'ArrowLeft' && !(event.target instanceof HTMLVideoElement)) { event.preventDefault(); setExpandedIndex(i => (i - 1 + images.length) % images.length); }
      else if (event.key === 'ArrowRight' && !(event.target instanceof HTMLVideoElement)) { event.preventDefault(); setExpandedIndex(i => (i + 1) % images.length); }
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

  const go = (step: number) => setIndex((current) => (current + step + slides.length) % slides.length);
  const goExpanded = (step: number) => setExpandedIndex((current) => (current + step + images.length) % images.length);
  const imageDescription = (img: ProjectImage) => `${project.title}: ${img.alt}`;
  const current = images[expandedIndex];
  return <>
    <div className="project-gallery" aria-label={`Galeria de imagens de ${project.title}`} onFocus={() => setFocusWithin(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocusWithin(false); }}>
      <div ref={viewportRef} className={`gallery-viewport ${slides[index]?.[0].portrait ? 'gallery-viewport--portrait' : ''}`} onPointerEnter={(event) => { if (event.pointerType === "mouse") setPaused(true); }} onPointerLeave={(event) => { if (event.pointerType === "mouse") setPaused(false); }}>
        {slides.map((group, i) => <div key={group[0].src} className={`gallery-slide ${group[0].type === 'video' ? 'gallery-video-slide' : ''} ${group[0].portrait ? 'gallery-slide--portrait' : ''} ${index === i ? 'is-active' : ''}`} aria-hidden={index !== i}>
          {group[0].type === 'video' ? index === i && phone(<video ref={videoRef} src={asset(group[0].src)} poster={group[0].poster ? asset(group[0].poster) : undefined} muted loop playsInline controls preload="metadata" aria-label={imageDescription(group[0])} />, group[0].portrait) :
            <div className={`gallery-photo-group ${group.length > 1 ? 'gallery-photo-group--pair' : ''}`}>
              {group.map((img) => {
                const content = phone(<img src={asset(img.src)} alt={imageDescription(img)} loading={i === 0 ? 'eager' : 'lazy'} />, img.portrait);
                return allowFullscreen ? <button type="button" className="gallery-photo" key={img.src} tabIndex={index === i ? 0 : -1} disabled={index !== i} onClick={() => { setExpandedIndex(images.indexOf(img)); setFullscreen(true); }} aria-label={`Ampliar ${imageDescription(img)}`}>{content}{img.portrait ? <span className="gallery-photo-caption">{img.caption} <span aria-hidden="true">↗</span></span> : <span className="gallery-zoom">Ampliar ↗</span>}</button> : <div className="gallery-photo" key={img.src}>{content}{img.portrait && <span className="gallery-photo-caption">{img.caption}</span>}</div>;
              })}
            </div>}
        </div>)}
        <div className="gallery-bottom" aria-hidden="true"><span>{String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span></div>
      </div>
      {slides.length > 1 && <div className="gallery-controls">
        <div className="gallery-pagination" aria-label="Selecionar imagem">
          {slides.map((group, i) => <button key={group[0].src} type="button" className={`gallery-dot ${index === i ? 'is-active' : ''}`}
            onClick={() => setIndex(i)} aria-label={`Mostrar imagem ${i + 1}`} aria-current={index === i ? 'true' : undefined}><span /></button>)}
        </div>
        <div className="gallery-arrows">{!reduced && <button type="button" className="gallery-pause" onClick={() => setUserPaused((value) => !value)} aria-label={`${userPaused ? 'Retomar' : 'Pausar'} troca automática de imagens de ${project.title}`} aria-pressed={userPaused}>{userPaused ? '▶' : 'Ⅱ'}</button>}<button type="button" aria-label={`Imagem anterior de ${project.title}`} onClick={() => go(-1)}><ArrowLeft size={18}/></button><button type="button" aria-label={`Próxima imagem de ${project.title}`} onClick={() => go(1)}><ArrowRight size={18}/></button></div>
      </div>}
    </div>
    {fullscreen && createPortal(<div className="gallery-lightbox" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setFullscreen(false); }}>
      <section className="gallery-lightbox-dialog" role="dialog" aria-modal="true" aria-label={`Imagem ampliada de ${project.title}`}>
        <div className="gallery-lightbox-toolbar"><span>{project.title} <span aria-hidden="true">/</span> {expandedIndex + 1} de {images.length}</span><button type="button" onClick={() => setFullscreen(false)} ref={closeButton} aria-label="Fechar imagem ampliada"><X size={25}/></button></div>
        <div className={`gallery-lightbox-stage ${current.portrait ? 'gallery-lightbox-stage--portrait' : ''}`}>{phone(current.type === 'video' ? <video key={current.src} src={asset(current.src)} poster={current.poster ? asset(current.poster) : undefined} controls autoPlay={!reduced} muted playsInline preload="metadata" aria-label={imageDescription(current)} /> : <img key={current.src} src={asset(current.src)} alt={imageDescription(current)} />, current.portrait)}</div>
        <div className="gallery-lightbox-foot"><span>{current.caption || 'Visual conceitual do projeto'}</span><div>{images.length > 1 && <><button type="button" aria-label="Imagem anterior" onClick={() => goExpanded(-1)}><ArrowLeft size={23}/></button><button type="button" aria-label="Próxima imagem" onClick={() => goExpanded(1)}><ArrowRight size={23}/></button></>}</div></div>
      </section>
    </div>, document.body)}
  </>;
}
