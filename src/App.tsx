import { useState, useEffect, useCallback } from 'react';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Work } from './sections/Work';
import { Experience } from './sections/Experience';
import { Expertise } from './sections/Expertise';
import { About } from './sections/About';
import { Education } from './sections/Education';
import { Contact } from './sections/Contact';
import { Cursor } from './components/Cursor';
import { CaseStudy } from './components/CaseStudy';
import { projects } from './data/content';
import type { Project } from './data/content';
import { gsap, useReducedMotion, useScrollReveals, useSmoothScroll } from './hooks/useMotion';

function getProjectFromHash(): Project | null {
  const match = window.location.hash.match(/^#project\/(.+)$/);
  return match ? projects.find((project) => project.slug === match[1]) ?? null : null;
}
export default function App() {
  const reduced = useReducedMotion();
  const [activeProject, setActiveProject] = useState<Project | null>(getProjectFromHash);
  const [preloaded, setPreloaded] = useState(false);
  useSmoothScroll(!reduced && !activeProject);
  useScrollReveals(reduced);

  const closeProject = useCallback(() => {
    if (window.location.hash.startsWith('#project/')) {
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}#work`);
    }
    setActiveProject(null);
  }, []);
  const openProject = useCallback((p: Project) => {
    history.pushState(null, '', `${window.location.pathname}${window.location.search}#project/${p.slug}`);
    setActiveProject(p);
  }, []);
  useEffect(() => {
    const syncHash = () => setActiveProject(getProjectFromHash());
    window.addEventListener('hashchange', syncHash);
    window.addEventListener('popstate', syncHash);
    return () => { window.removeEventListener('hashchange', syncHash); window.removeEventListener('popstate', syncHash); };
  }, []);
  useEffect(() => {
    if (reduced) { setPreloaded(true); return; }
    const timeline = gsap.timeline({ onComplete: () => setPreloaded(true) });
    timeline.to('.intro-overlay', { yPercent: -103, duration: .8, ease: 'power4.inOut' }, '+=.05');
    return () => { timeline.kill(); };
  }, [reduced]);
  return <>
    {!preloaded && !reduced && <div className="intro-overlay" aria-hidden="true"><div className="intro-wordmark">MN<span>.</span></div></div>}
    <Cursor />
    <Header />
    <main><Hero /><Work onOpen={openProject}/><Experience/><Expertise/><About/><Education/></main>
    <Contact />
    {activeProject && <CaseStudy project={activeProject} onClose={closeProject} />}
  </>;
}
