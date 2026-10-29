/* Standalone atmospheric animation: local GSAP, no external service or build step. */
(() => {
  'use strict';
  if (!window.gsap || !window.ScrollTrigger || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();
  mm.add('(min-width: 761px)', () => {
    document.querySelectorAll('.scene-backdrop').forEach((background, i) => {
      const section = background.parentElement;
      const map = background.querySelector('.scene-map');
      const nodes = background.querySelector('.scene-nodes');
      const curves = background.querySelector('.scene-routes');
      gsap.fromTo(map, { y: i % 2 ? -55 : 55, rotation: i % 2 ? -5 : 5 }, {
        y: i % 2 ? 65 : -65, rotation: i % 2 ? 5 : -5,
        ease:'none', scrollTrigger:{trigger:section,start:'top bottom',end:'bottom top',scrub:1.1}
      });
      gsap.fromTo(nodes, {opacity:.12}, {opacity:.9,ease:'none',scrollTrigger:{trigger:section,start:'top 85%',end:'bottom 50%',scrub:1}});
      gsap.to(curves, { x: i % 2 ? 24 : -24, duration:11+i,repeat:-1,yoyo:true,ease:'sine.inOut',
        scrollTrigger:{trigger:section,start:'top bottom',end:'bottom top',toggleActions:'play pause resume pause'}});
      const dome = section.querySelector('.scene-dome');
      if(dome) gsap.fromTo(dome,{scaleY:.25},{scaleY:1,ease:'none',scrollTrigger:{trigger:section,start:'top bottom',end:'top 55%',scrub:.7}});
    });
    document.querySelectorAll('.experience-item').forEach(item => ScrollTrigger.create({trigger:item,start:'top 58%',end:'bottom 42%',
      onToggle: s => item.classList.toggle('is-reading',s.isActive)}));
    document.querySelectorAll('.project-panel').forEach(item => ScrollTrigger.create({trigger:item,start:'top 75%',end:'bottom 25%',
      onToggle: s => item.classList.toggle('is-current',s.isActive)}));
  });
  mm.add('(max-width: 760px)', () => {
    document.querySelectorAll('.project-panel').forEach(item => ScrollTrigger.create({trigger:item,start:'top 80%',end:'bottom 18%',
      onToggle: s => item.classList.toggle('is-current',s.isActive)}));
  });
  window.addEventListener('load', () => ScrollTrigger.refresh(), {once:true});
})();
