import { Atmosphere } from '../components/Atmosphere';
import { ArrowUpRight } from '../components/Icons';
import { SectionLabel } from '../components/SectionLabel';
export function About() {
  return <section className="about-section" id="about"><Atmosphere variant="about" dome /><div className="wrap about-content">
    <SectionLabel number="04" light>QUEM ESTÁ POR TRÁS DO CÓDIGO</SectionLabel>
    <div className="about-grid"><div className="about-copy"><h2 className="about-statement" data-reveal>Do problema<br/>à <span>implementação.</span></h2><div className="about-underline" data-reveal/></div><div className="about-aside"><div className="about-symbol" aria-hidden="true"><span>MN</span><ArrowUpRight size={30}/></div><p data-reveal>Sou graduando em Engenharia de Software na UFCA. Trabalho no encontro entre <strong>desenvolvimento, sistemas de negócio e experiência do usuário.</strong></p><p data-reveal>Já atuei em produtos internos, automações e contextos corporativos. Na Calang.io, também desenvolvo a dimensão de liderança e gestão de projetos tecnológicos.</p><a href="#contact" className="about-link">Entrar em contato <ArrowUpRight size={18}/></a></div></div>
    
  </div></section>;
}
