(() => {
'use strict';
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const menu = $('#mobile-menu'), toggle = $('.mobile-menu-toggle');
toggle.addEventListener('click', () => {const open = menu.classList.toggle('mobile-menu--open');menu.setAttribute('aria-hidden', String(!open));toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');toggle.textContent=open?'✕':'☰';document.body.classList.toggle('menu-open',open);});
$$('.mobile-menu a').forEach(a => a.addEventListener('click',()=> {menu.classList.remove('mobile-menu--open');menu.setAttribute('aria-hidden','true');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰';document.body.classList.remove('menu-open')}));
const io = new IntersectionObserver(entries=>entries.forEach(e => {if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target);}}),{threshold:.08,rootMargin:'0px 0px -5% 0px'});
$$('[data-reveal],.project-panel').forEach(el=>io.observe(el));
// A fully clipped headline has zero intersection area in some browsers.
// Observe its parent scene so it can always be revealed when About enters the viewport.
const aboutScene = $('.about-section');
if (aboutScene) {
 const aboutObserver = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) {
   $('.about-statement')?.classList.add('in-view');
   aboutObserver.unobserve(e.target);
  }
 }), {threshold:.08});
 aboutObserver.observe(aboutScene);
}

const sections = $$('#work,#experience,#expertise,#about,#education,#contact');
const navObserver = new IntersectionObserver(entries=>{entries.filter(x=>x.isIntersecting).forEach(e=>$$('.nav-desktop a').forEach(a=>a.classList.toggle('nav-active',a.getAttribute('href')==='#'+e.target.id)))},{rootMargin:'-25% 0px -60% 0px'});
sections.forEach(el=>navObserver.observe(el));
const skillSets = [
{index:'01',short:'Interface, experiência e precisão visual.',headline:'Interfaces e aplicações web.',items:['React','TypeScript','JavaScript','HTML','CSS']},
{index:'02',short:'APIs, serviços e lógica de negócio.',headline:'APIs e serviços.',items:['Python','Flask','FastAPI','Node.js','Express']},
{index:'03',short:'Modelagem, consulta e organização de dados.',headline:'Modelagem e consultas.',items:['SQL','MySQL','SQLite','Oracle']},
{index:'04',short:'Ferramentas para construir e entregar.',headline:'Ferramentas e infraestrutura.',items:['Git','GitHub','Docker','Postman','Google Cloud']},
];
$$('[data-tab]').forEach((button,i)=>{
button.setAttribute('tabindex',i===0?'0':'-1');
button.addEventListener('keydown',e=>{let next=i;
if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(i+1)%skillSets.length;
else if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(i-1+skillSets.length)%skillSets.length;
else if(e.key==='Home')next=0;
else if(e.key==='End')next=skillSets.length-1;
else return;
e.preventDefault();const target=$$('[data-tab]')[next];target.click();target.focus();});
button.addEventListener('click',()=>{const n=Number(button.dataset.tab),s=skillSets[n];$$('[data-tab]').forEach(b=>{b.classList.toggle('expertise-tab--active',b===button);b.setAttribute('aria-selected',String(b===button));b.setAttribute('tabindex',b===button?'0':'-1');});$('#tab-subtitle').textContent=s.short;$('#tab-headline').textContent=s.headline;$('#tab-skills').replaceChildren(...s.items.map((t,i)=>{let span=document.createElement('span');span.className='expertise-skill';let sub=document.createElement('span');sub.className='skill-enum';sub.textContent=String(i+1).padStart(2,'0');span.append(sub,document.createTextNode(t));return span;}));});});
// Four independent galleries. Autoplay pauses only on mouse hover over the image,
// browser inactivity, fullscreen or reduced-motion preference. Static build intentionally uses no runtime dependencies.
const galleries = [...document.querySelectorAll('[data-gallery]')].map(panel => {
 const root=panel.querySelector('.project-gallery');
 const slides=[...root.querySelectorAll('.gallery-slide')];
 const dots=[...root.querySelectorAll('.gallery-dot')];
 const position=root.querySelector('.gallery-position');
 const state={panel,root,slides,index:0,paused:false};
 function schedule(){clearTimeout(state.timer);
  if(slides.length<2||reduced||state.paused)return;
  state.timer=setTimeout(()=>{
   if(!document.hidden&&galleryLightbox.hidden)go(state.index+1);
   else schedule();
  },3200);
 }
 function go(i){state.index=(i+slides.length)%slides.length;
  slides.forEach((slide,n)=>{const active=n===state.index;slide.classList.toggle('is-active',active);slide.setAttribute('aria-hidden',String(!active));slide.tabIndex=active?0:-1;slide.disabled=!active;});
  dots.forEach((dot,n)=>{dot.classList.toggle('is-active',n===state.index);if(n===state.index)dot.setAttribute('aria-current','true');else dot.removeAttribute('aria-current');});
  position.textContent=`${String(state.index+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
  schedule();
 }
 state.go=go;
 dots.forEach((b,n)=>b.addEventListener('click',()=>go(n)));
 root.querySelector('.gallery-prev').addEventListener('click',()=>go(state.index-1));
 root.querySelector('.gallery-next').addEventListener('click',()=>go(state.index+1));
 const viewport=root.querySelector('.gallery-viewport');
 viewport.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){state.paused=true;clearTimeout(state.timer);}});
 viewport.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'){state.paused=false;schedule();}});
 slides.forEach(b=>b.addEventListener('click',()=>openGalleryLightbox(state)));
 schedule();
 return state;
});
const galleryLightbox=document.querySelector('#gallery-lightbox');
let galleryActive=null, galleryPreviousFocus=null;
function galleryRender(){if(!galleryActive)return;
 const {panel,slides,index}=galleryActive;
 document.querySelector('#lightbox-title').textContent=`${panel.querySelector('.project-identity h3').textContent} / ${index+1} de ${slides.length}`;
 const image=slides[index].querySelector('img');const target=document.querySelector('#lightbox-image');target.src=image.currentSrc||image.src;target.alt=image.alt;
}
function openGalleryLightbox(state){galleryPreviousFocus=document.activeElement;galleryActive=state;
 galleryLightbox.hidden=false;document.body.style.overflow='hidden';galleryRender();document.querySelector('#lightbox-close').focus();
}
function closeGalleryLightbox(){if(galleryLightbox.hidden)return;
 galleryLightbox.hidden=true;galleryActive=null;document.body.style.overflow='';galleryPreviousFocus?.focus();
}
document.querySelector('#lightbox-close').addEventListener('click',closeGalleryLightbox);
document.querySelector('#lightbox-prev').addEventListener('click',()=>{if(galleryActive){galleryActive.go(galleryActive.index-1);galleryRender();}});
document.querySelector('#lightbox-next').addEventListener('click',()=>{if(galleryActive){galleryActive.go(galleryActive.index+1);galleryRender();}});
galleryLightbox.addEventListener('mousedown',e=>{if(e.target===galleryLightbox)closeGalleryLightbox()});
document.addEventListener('keydown',e=>{if(galleryLightbox.hidden)return;
 if(e.key==='Escape'){e.preventDefault();closeGalleryLightbox();}
 else if(e.key==='ArrowLeft'){e.preventDefault();document.querySelector('#lightbox-prev').click();}
 else if(e.key==='ArrowRight'){e.preventDefault();document.querySelector('#lightbox-next').click();}
 else if(e.key==='Tab'){
  const buttons=[...galleryLightbox.querySelectorAll('button')];
  if(e.shiftKey&&document.activeElement===buttons[0]){e.preventDefault();buttons.at(-1).focus();}
  else if(!e.shiftKey&&document.activeElement===buttons.at(-1)){e.preventDefault();buttons[0].focus();}
 }
});

const cases = {
'ecotech':{number:'04',title:'EcoTech',type:'Sustentabilidade & software / Projeto em desenvolvimento',tagline:'Tecnologia para o ciclo certo.',art:'art/ecotech.svg',challenge:'Contribuir para uma jornada de descarte de eletrônicos acompanhável, organizada e orientada à destinação responsável.',approach:'Desenvolvimento de uma aplicação em Python/Flask e SQLite, com separação entre camadas de infraestrutura, aplicação e domínio e modelagem do ciclo de solicitações.',outcome:'Projeto em desenvolvimento. Não são apresentados indicadores de impacto ou adoção sem comprovação.',tags:['Python & Flask','SQLite','Logística reversa'],caution:'As imagens exibidas são ilustrações conceituais; não representam telas ou operações reais da plataforma.'},
'estoquesensor':{number:'01',title:'EstoqueSensor',type:'Sistema corporativo / Projeto profissional',tagline:'Organização que vira operação.',art:'art/estoquesensor.svg',challenge:'Apoiar a organização e o acompanhamento de materiais em um contexto operacional real.',approach:'Desenvolvimento de uma solução interna orientada ao fluxo de gerenciamento de estoque.',outcome:'Sistema desenvolvido para uso interno. Indicadores e resultados quantitativos não publicados.',tags:['Sistemas internos','Gestão de estoque','Software aplicado'],caution:'Representação visual conceitual. Interface e código proprietários não são exibidos.'},
'vita':{number:'02',title:'V.I.T.A.',type:'Produto acadêmico / Projeto acadêmico',tagline:'Tecnologia no fluxo do cuidado.',art:'art/vita.svg',challenge:'Organizar informações e etapas do atendimento com foco em clareza, acessibilidade e contexto de uso.',approach:'Estruturação de requisitos, jornadas e propostas de interface para etapas de pré-triagem e gestão.',outcome:'Projeto acadêmico. Resultados clínicos, implantação e indicadores não alegados.',tags:['IHC','Requisitos','Fluxos de atendimento'],caution:'Arte conceitual. Não representa produto clínico implantado.'},
 'transparencia-obras':{number:'03',title:'Transparência de Obras',type:'Dados & transparência / Projeto acadêmico',tagline:'Dados públicos. Melhor leitura.',art:'art/obras.svg',challenge:'Tornar informações estruturadas sobre obras públicas mais organizadas e compreensíveis.',approach:'Aplicação de conceitos de modelagem e consulta de bancos de dados no domínio de obras públicas.',outcome:'Trabalho acadêmico. Link e documentação técnica detalhada a adicionar.',tags:['Banco de dados','SQL','Dados públicos'],caution:'Visualização artística, sem dados ou estatísticas reais.'}
};
let lastFocus = null;
function openCase(id,changeUrl=true) {const p=cases[id];if(!p)return;lastFocus=document.activeElement;$('#case-toolbar').textContent='MN / PROJETOS — '+p.number;$('#case-category').textContent=p.type;$('#case-title').textContent=p.title+'.';$('#case-tagline').textContent=p.tagline;$('#case-image').src=p.art;$('#case-image').alt='Visual conceitual do projeto '+p.title;$('#case-challenge').textContent=p.challenge;$('#case-approach').textContent=p.approach;$('#case-outcome').textContent=p.outcome;$('#case-caution').textContent='NOTA: '+p.caution;$('#case-tags').replaceChildren(...p.tags.map(t=>{let x=document.createElement('span');x.textContent=t;return x}));$('#case-overlay').hidden=false;document.body.style.overflow='hidden';$('#case-close').focus();if(changeUrl)history.pushState(null,'','#project/'+id);}
function closeCase(changeUrl=true){if($('#case-overlay').hidden)return;$('#case-overlay').hidden=true;document.body.style.overflow='';if(changeUrl)history.replaceState(null,'','#work');lastFocus?.focus();}
$$('[data-project]').forEach(el=>el.addEventListener('click',()=>openCase(el.dataset.project)));
['#case-close','#case-back'].forEach(q=>$(q).addEventListener('click',()=>closeCase()));
$('#case-overlay').addEventListener('mousedown',e=>{if(e.target===e.currentTarget)closeCase()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCase();if(e.key==='Tab'&&!$('#case-overlay').hidden){const focusable=$$('#case-overlay button');if(e.shiftKey&&document.activeElement===focusable[0]){e.preventDefault();focusable.at(-1).focus()}if(!e.shiftKey&&document.activeElement===focusable.at(-1)){e.preventDefault();focusable[0].focus()}}});
function syncHash(){const found=location.hash.match(/^#project\/(.+)$/);if(found&&cases[found[1]])openCase(found[1],false);else closeCase(false);}
window.addEventListener('hashchange',syncHash);window.addEventListener('popstate',syncHash);syncHash();
if(!reduced&&!window.matchMedia('(pointer: coarse)').matches){const cursor=$('.custom-cursor');let x=0,y=0,px=0,py=0;window.addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;cursor.classList.add('cursor--visible');cursor.classList.toggle('cursor--active',Boolean(e.target.closest('a,button')))},{passive:true});function cursorLoop(){px+=(x-px)*.22;py+=(y-py)*.22;cursor.style.transform=`translate(${px}px,${py}px)`;requestAnimationFrame(cursorLoop)}requestAnimationFrame(cursorLoop);}

// Section-specific movements in the no-build version. All scroll updates use a single RAF.
if(!reduced){
 const motionObserver=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in-view');motionObserver.unobserve(e.target);}
 }),{rootMargin:'0px 0px -12% 0px',threshold:.04});
 $$('.experience-item,.about-statement,.education-row,.contact-heading').forEach(el=>motionObserver.observe(el));
 const timeline=$('.experience-list');
 const seam=$('.transition-band-line');
 const band=$('.transition-band');
 const projectPanels=$$('.project-panel');
 let scheduled=false;
 const update=()=>{
  scheduled=false;
  const h=window.innerHeight;
  if(timeline){const r=timeline.getBoundingClientRect();const p=Math.min(1,Math.max(0,(h*.77-r.top)/(r.height+h*.32)));timeline.style.setProperty('--timeline-progress',`${(p*100).toFixed(2)}%`)}
  if(band&&seam){const r=band.getBoundingClientRect();const p=Math.min(1,Math.max(0,(h-r.top)/(r.height+h*.55)));seam.style.transform=`scaleX(${p})`}
  projectPanels.forEach((panel,i)=>{const r=panel.getBoundingClientRect();if(r.bottom<0||r.top>h)return;
   const p=(h-r.top)/(r.height+h);
   panel.querySelectorAll('.gallery-slide img').forEach(img=>{img.style.transform=`translate3d(0,${((p-.5)*(i%2?-14:14)).toFixed(1)}px,0)`});
  });
 };
 const queue=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update)}};
 window.addEventListener('scroll',queue,{passive:true});window.addEventListener('resize',queue,{passive:true});queue();
 const contact=$('.contact-section');if(contact)contact.addEventListener('pointermove',e=>{
  if(e.pointerType!=='mouse')return;const r=contact.getBoundingClientRect();
  contact.style.setProperty('--pointer-x',`${e.clientX-r.left}px`);contact.style.setProperty('--pointer-y',`${e.clientY-r.top}px`);
 },{passive:true});
}

})();
