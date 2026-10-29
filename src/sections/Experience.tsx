import { Atmosphere } from '../components/Atmosphere';
import { SectionLabel } from '../components/SectionLabel';
import { ArrowUpRight } from '../components/Icons';
import { experiences } from '../data/content';
export function Experience() {
  return <section className="experience-section" id="experience"><Atmosphere variant="experience" dome /><div className="wrap experience-layout">
    <div className="experience-intro"><SectionLabel number="02">EXPERIÊNCIA</SectionLabel><h2 className="section-heading" data-reveal>Experiência<br/><span className="outline-title">profissional</span><span className="text-accent">.</span></h2><p data-reveal>Desenvolvimento, automações e liderança em contextos reais.</p></div>
    <div className="experience-list">{experiences.map((e) => <article key={e.org} className="experience-item"><div className="experience-item-head"><span className="experience-num">/ {e.index}</span><span className="experience-period">{e.period}</span></div><div className="experience-item-main"><div><h3>{e.org}</h3><p className="experience-role">{e.role}</p></div><ArrowUpRight className="experience-arrow" size={25}/></div><p className="experience-description">{e.description}</p></article>)}</div>
  </div></section>;
}
