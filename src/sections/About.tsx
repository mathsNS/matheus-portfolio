import { Atmosphere } from '../components/Atmosphere';
import { ArrowUpRight } from '../components/Icons';
import { SectionLabel } from '../components/SectionLabel';
export function About() {
  return <section className="about-section" id="about"><Atmosphere variant="about" dome /><div className="wrap about-content">
    <SectionLabel number="04" light>QUEM ESTÁ POR TRÁS DO CÓDIGO</SectionLabel>
    <div className="about-grid"><div className="about-copy"><h2 className="about-statement" data-reveal>Do problema<br/>à <span>implementação.</span></h2><div className="about-underline" data-reveal/></div><div className="about-aside"><div className="about-symbol" aria-hidden="true"><img className="brand-image" src={`${import.meta.env.BASE_URL}logo-mn.png`} alt=""/></div><p data-reveal>Estudo Engenharia de Software na UFCA, sou estagiário de TI na Unimed Cariri e presidente da Calang.io. Entre a faculdade e o trabalho, desenvolvo soluções, automatizo processos e aprendo a liderar equipes.</p><p data-reveal>Gosto de entender o problema antes de escrever código. Tenho interesse em <strong>back-end, arquitetura de software, automação e inteligência artificial</strong>, especialmente quando a tecnologia pode melhorar um processo ou resolver uma necessidade concreta.</p><p data-reveal>Valorizo comunicação clara, autonomia e troca de conhecimento. Quero continuar aprofundando minha base técnica e construir produtos que façam sentido para as pessoas e para o negócio.</p><a href="#contact" className="about-link">Entrar em contato <ArrowUpRight size={18}/></a></div></div>
    
  </div></section>;
}
