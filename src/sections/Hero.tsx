import { useRef } from 'react';
import { ArrowUpRight } from '../components/Icons';
import { Orbital } from '../components/Orbital';
import { gsap, useGSAP, useReducedMotion } from '../hooks/useMotion';
import { identity } from '../data/content';

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useGSAP(() => {
    if (reduced) return;
    gsap.timeline({ defaults: { ease: 'power4.out' }, delay: .08 })
      .from('.hero-line .line-inner', { yPercent: 115, rotate: 2, duration: 1.35, stagger: .15 }, '-=.38')
      .from('.hero-bottom > *', { y: 35, opacity: 0, duration: 1, stagger: .1 }, '-=.7')
      .from('.hero-index', { opacity: 0, x: 16, duration: 1 }, '-=.7');
    gsap.to('.hero-title', {
      yPercent: -16, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  }, { scope: root, dependencies: [reduced], revertOnUpdate: true });
  return <section ref={root} className="hero" id="home" aria-label="Apresentação">
    <div className="hero-grid" aria-hidden="true" />
    
    <div className="hero-main wrap">
      <div className="hero-typography">
        <div className="hero-superline"><span>Graduando em Engenharia de Software</span></div>
        <h1 className="hero-title" aria-label="Matheus Nogueira">
          <span className="hero-line"><span className="line-inner">MATHEUS</span></span>
          <span className="hero-line"><span className="line-inner outline-title">NOGUEIRA<span className="title-period">.</span></span></span>
        </h1>
        <div className="hero-bottom">
          <div className="hero-bottom-left"><p>{identity.shortline}</p></div>
          <div className="hero-bottom-actions"><a className="action-primary" href="#work">Explorar projetos <ArrowUpRight size={19}/></a><a className="action-text" href="#contact">Entrar em contato <ArrowUpRight size={18}/></a></div>
        </div>
      </div>
      <div className="hero-visual"><Orbital /></div>
    </div>
    <div className="hero-index wrap" aria-hidden="true"><div className="scroll-track"><span/></div></div>
  </section>;
}
