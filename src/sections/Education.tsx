import { Atmosphere } from '../components/Atmosphere';
import { SectionLabel } from '../components/SectionLabel';
import { education } from '../data/content';
export function Education() {
  return <section className="education-section" id="education"><Atmosphere variant="education" dome /><div className="wrap"><div className="education-header"><div><SectionLabel number="05">FORMAÇÃO & APRENDIZADO</SectionLabel><h2 className="section-heading" data-reveal>Formação <span className="serif-italic">contínua</span><span className="text-accent">.</span></h2></div></div><div className="education-list">{education.map((entry, i) => <div className="education-row" key={entry.title} data-reveal><div className="education-index">0{i + 1} / {entry.type}</div><div className="education-name"><h3>{entry.title}</h3><span>{entry.org}</span></div><div className="education-note">{entry.note}</div><div className="education-plus" aria-hidden="true">↗</div></div>)}</div><p className="education-disclaimer">Certificados exibidos como histórico de aprendizado, não como certificações profissionais por exame. Links de verificação serão adicionados quando disponíveis.</p></div></section>;
}
