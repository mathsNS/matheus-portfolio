import { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from '../components/Icons';

const links = [
  { label: 'Projetos', href: '#work', id: 'work' },
  { label: 'Experiência', href: '#experience', id: 'experience' },
  { label: 'Expertise', href: '#expertise', id: 'expertise' },
  { label: 'Sobre', href: '#about', id: 'about' },
];

export function Header() {
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((items) => {
      const visible = items.filter((it) => it.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.1, 0.3, 0.6] });
    [...links.map((l) => l.id), 'education', 'contact'].forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);
  return <>
    <header className="site-header" id="top">
      <a className="brand" href="#home" aria-label="Matheus Nogueira, início"><span className="brand-box">MN<span className="brand-dot">.</span></span></a>
      <nav className="nav-desktop" aria-label="Navegação principal">
        {links.map((link) => <a key={link.id} className={active === link.id ? 'nav-active' : ''} href={link.href}>{link.label}</a>)}
      </nav>
      <a className="nav-contact" href="#contact"><span>Vamos conversar</span><ArrowUpRight size={17} strokeWidth={1.8}/></a>
      <button className="mobile-menu-toggle" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X size={26}/> : <Menu size={26}/>}</button>
    </header>
    <nav id="mobile-menu" className={`mobile-menu ${open ? 'mobile-menu--open' : ''}`} aria-label="Navegação para celular" aria-hidden={!open}>
      {[...links, { id: 'contact', label: 'Contato', href: '#contact' }].map((l, i) => <a href={l.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} key={l.id}><span>0{i + 1}</span>{l.label}<ArrowUpRight size={22}/></a>)}
    </nav>
  </>;
}
