import { Atmosphere } from '../components/Atmosphere';
import { useState, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { ArrowUpRight } from '../components/Icons';
import { SectionLabel } from '../components/SectionLabel';
import { expertise } from '../data/content';
import { gsap, useGSAP, useReducedMotion } from '../hooks/useMotion';
export function Expertise() {
  const [selected, setSelected] = useState(0);
  const handleTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % expertise.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + expertise.length) % expertise.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = expertise.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    document.getElementById(`tab-${expertise[next].id}`)?.focus();
  };
  const resultRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useGSAP(() => {
    if (reduced) return;
    gsap.fromTo('[data-switch]', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, stagger: .055, ease: 'power3.out' });
  }, { scope: resultRef, dependencies: [selected, reduced], revertOnUpdate: true });
  const selectedItem = expertise[selected];
  return <section className="expertise-section" id="expertise"><Atmosphere variant="expertise" dome /><div className="wrap">
    <div className="expertise-header"><SectionLabel number="03">ÁREAS DE ATUAÇÃO</SectionLabel><h2 className="section-heading" data-reveal>Tecnologias <span className="serif-italic">e áreas</span><span className="text-accent">.</span></h2></div>
    <div className="expertise-grid">
      <div className="expertise-menu" role="tablist" aria-label="Categorias de tecnologia">{expertise.map((item, i) => <button id={`tab-${item.id}`} aria-selected={selected === i} aria-controls="expertise-content" role="tab" tabIndex={selected === i ? 0 : -1} onKeyDown={(event) => handleTabKey(event, i)} type="button" key={item.id} className={`expertise-tab ${selected === i ? 'expertise-tab--active' : ''}`} onClick={() => setSelected(i)}><span>{item.index}</span><strong>{item.label}</strong><ArrowUpRight size={22}/></button>)}</div>
      <div className="expertise-display" role="tabpanel" id="expertise-content" aria-labelledby={`tab-${selectedItem.id}`} tabIndex={0} ref={resultRef} key={selectedItem.id}>
        
        <p className="expertise-display-subtitle" data-switch>{selectedItem.short}</p>
        <h3 data-switch>{selectedItem.headline}</h3>
        <div className="expertise-skills" data-switch>{selectedItem.items.map((tech, i) => <span className="expertise-skill" key={tech}><span className="skill-enum">{String(i + 1).padStart(2, '0')}</span>{tech}</span>)}</div>
        
        
      </div>
    </div>
  </div></section>;
}
