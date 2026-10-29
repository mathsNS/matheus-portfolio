import { Atmosphere } from '../components/Atmosphere';
import type { PointerEvent } from 'react';
import { ArrowUpRight } from '../components/Icons';
import { Magnetic } from '../components/Magnetic';
import { SectionLabel } from '../components/SectionLabel';
import { identity } from '../data/content';

const socials = [
  { label: 'GitHub', url: identity.github },
  { label: 'LinkedIn', url: identity.linkedin },
  { label: 'E-mail', url: identity.email ? `mailto:${identity.email}` : '' },
  { label: 'Currículo', url: identity.resume },
];
export function Contact() {
  const spotlight = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
  };
  return <footer onPointerMove={spotlight} className="contact-section" id="contact"><div className="contact-spotlight" aria-hidden="true"/><Atmosphere variant="contact" dome /><div className="wrap">
    <div className="contact-kicker"><SectionLabel number="06">CONTATO</SectionLabel></div>
    <div className="contact-heading" data-reveal><span>VAMOS</span><span className="contact-heading-last">CONVERSAR<span className="contact-star">.</span></span></div>
    <div className="contact-bottom"><p>Disponível para conversar sobre projetos, desenvolvimento de software e oportunidades profissionais.</p><Magnetic><a className="contact-orb" href={identity.email ? `mailto:${identity.email}` : '#social-links'} aria-label={identity.email ? 'Enviar e-mail' : 'Ver canais de contato'}><ArrowUpRight size={42} strokeWidth={1.4}/></a></Magnetic></div>
    <div className="contact-links" id="social-links">{socials.map((s) => s.url ? <a href={s.url} key={s.label} target={s.url.startsWith('http') ? '_blank' : undefined} rel={s.url.startsWith('http') ? 'noopener noreferrer' : undefined}>{s.label}<ArrowUpRight size={16}/></a> : <span className="social-pending" key={s.label} title="Link ainda não configurado">{s.label} <span>em breve</span></span>)}</div>
    <div className="footer-bottom"><a className="footer-logo" href="#home">MN<span>.</span></a><span>© {new Date().getFullYear()} MATHEUS NOGUEIRA</span><a href="#home" className="back-top">VOLTAR AO TOPO ↑</a></div>
  </div></footer>;
}
