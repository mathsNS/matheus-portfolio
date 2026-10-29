import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, useGSAP);
export { gsap, ScrollTrigger, useGSAP };

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduced;
}

/** A single GSAP-driven Lenis loop; no additional RAF loop and full teardown. */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled || window.matchMedia('(pointer: coarse)').matches) return;
    const lenis = new Lenis({ duration: 1.08, smoothWheel: true, wheelMultiplier: 0.95 });
    const sync = () => ScrollTrigger.update();
    const tick = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', sync);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();
    return () => {
      lenis.off('scroll', sync);
      gsap.ticker.remove(tick);
      lenis.destroy();
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, [enabled]);
}

/** Every section gets a distinct motion language, with only transform/opacity/clip-path.
 *  All ScrollTriggers are automatically reverted when unmounted or reduced-motion changes.
 */
export function useScrollReveals(reduced: boolean) {
  useGSAP(() => {
    if (reduced) return;
    const q = gsap.utils.toArray<HTMLElement>;

    // Editorial section titles: clipped reveal, not a generic fade-in.
    q('.section-heading').forEach(el => {
      gsap.fromTo(el, { clipPath: 'inset(0 0 95% 0)', y: 38 }, {
        clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.2, ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 89%', once: true },
      });
    });
    q('[data-reveal]:not(.section-heading):not(.about-statement):not(.contact-heading):not(.education-row)').forEach(el => {
      gsap.fromTo(el, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 1,
        ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 91%', once: true },
      });
    });

    // Image panels emerge from alternating edges; internal artwork floats at a different rate.
    q('.project-panel').forEach((panel, i) => {
      const gallery = panel.querySelector<HTMLElement>('.gallery-viewport');
      const info = panel.querySelector<HTMLElement>('.project-information');
      if (!gallery || !info) return;
      const direction = i % 2 ? -1 : 1;
      gsap.fromTo(gallery, { clipPath: direction > 0 ? 'inset(0 18% 0 0)' : 'inset(0 0 0 18%)', x: 28 * direction }, {
        clipPath: 'inset(0 0 0 0)', x: 0, duration: 1.3, ease: 'power3.inOut',
        scrollTrigger: { trigger: panel, start: 'top 82%', once: true },
      });
      gsap.fromTo(info.querySelectorAll('[data-panel]'), { y: 45, opacity: 0 }, {
        y: 0, opacity: 1, duration: .95, stagger: .105, ease: 'power3.out',
        scrollTrigger: { trigger: panel, start: 'top 77%', once: true },
      });
      gsap.to(gallery.querySelectorAll('.gallery-slide img'), {
        yPercent: i % 2 ? 5 : -5, ease: 'none',
        scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
      });
    });

    // Timeline itself draws while the user reads; each role enters with a lateral shift.
    const list = document.querySelector<HTMLElement>('.experience-list');
    if (list) gsap.fromTo(list, { '--timeline-progress': '0%' }, {
      '--timeline-progress': '100%', ease: 'none',
      scrollTrigger: { trigger: list, start: 'top 77%', end: 'bottom 45%', scrub: .6 },
    });
    q('.experience-item').forEach((row, i) => {
      gsap.fromTo(row, { x: i % 2 ? 22 : -22, opacity: .45 }, {
        x: 0, opacity: 1, duration: .9, ease: 'power2.out',
        scrollTrigger: { trigger: row, start: 'top 85%', once: true },
      });
    });

    // Skill section: line grid moves behind the already-interactive tab panel.
    const skillPanel = document.querySelector('.expertise-display');
    if (skillPanel) gsap.fromTo(skillPanel, { clipPath: 'inset(0 0 16% 0)' }, {
      clipPath: 'inset(0 0 0 0)', ease: 'power3.out', duration: 1.15,
      scrollTrigger: { trigger: '.expertise-grid', start: 'top 77%', once: true },
    });

    // About: a light editorial interlude, with its own wipe / underline gesture.
    gsap.fromTo('.about-statement', { clipPath: 'inset(0 0 100% 0)', y: 50 }, {
      clipPath: 'inset(0 0 0% 0)', y: 0, ease: 'power4.out', duration: 1.45,
      scrollTrigger: { trigger: '.about-section', start: 'top 70%', once: true },
    });
    gsap.fromTo('.about-underline', { scaleX: 0 }, {
      scaleX: 1, transformOrigin: 'left center', ease: 'power3.inOut', duration: 1.6,
      scrollTrigger: { trigger: '.about-section', start: 'top 61%', once: true },
    });
    gsap.fromTo('.about-symbol', { y: 70, rotation: -20 }, { y: 0, rotation: -8,
      ease: 'power3.out', duration: 1.4, scrollTrigger: { trigger: '.about-aside', start: 'top 90%', once: true },
    });

    // Education enters in staggered sequence; the rule under each row draws as it appears.
    q('.education-row').forEach((row, i) => {
      gsap.fromTo(row, { opacity: 0, x: i % 2 ? 25 : -25 }, {
        opacity: 1, x: 0, duration: .95, ease: 'power3.out',
        scrollTrigger: { trigger: row, start: 'top 89%', once: true },
      });
      gsap.fromTo(row, { '--rule-reveal': '0%' }, {
        '--rule-reveal': '100%', duration: 1.3, ease: 'power2.out',
        scrollTrigger: { trigger: row, start: 'top 89%', once: true },
      });
    });

    // The final scene animates its own type instead of covering other sections with 3D.
    gsap.fromTo('.contact-heading>span', { yPercent: 95, opacity: 0, rotation: 2 }, {
      yPercent: 0, opacity: 1, rotation: 0, stagger: .19, duration: 1.45, ease: 'expo.out',
      scrollTrigger: { trigger: '.contact-section', start: 'top 76%', once: true },
    });
    gsap.fromTo('.contact-orb', { scale: .7, opacity: 0, rotation: -50 }, {
      scale: 1, opacity: 1, rotation: 0, duration: 1.25, ease: 'back.out(1.4)',
      scrollTrigger: { trigger: '.contact-bottom', start: 'top 88%', once: true },
    });

    // V5: chapter silhouettes and quiet line-work, inspired by ROTOR's scroll rhythm.
    // Drawn behind the content; no on-top floating object or expensive 3D canvas.
    const sceneMedia = gsap.matchMedia();
    sceneMedia.add('(min-width: 761px)', () => {
      q('.scene-backdrop').forEach((background, i) => {
        const section = background.parentElement;
        const map = background.querySelector('.scene-map');
        const nodes = background.querySelector('.scene-nodes');
        const curves = background.querySelector('.scene-routes');
        if (!section || !map || !curves || !nodes) return;
        gsap.fromTo(map, { y: i % 2 ? -55 : 55, rotation: i % 2 ? -5 : 5 }, {
          y: i % 2 ? 65 : -65, rotation: i % 2 ? 5 : -5,
          ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.1 },
        });
        gsap.fromTo(nodes, { opacity: .12 }, { opacity: .9, ease: 'none',
          scrollTrigger: { trigger: section, start: 'top 85%', end: 'bottom 50%', scrub: 1 },
        });
        gsap.to(curves, { x: i % 2 ? 24 : -24, duration: 11 + i, repeat: -1, yoyo: true,
          ease: 'sine.inOut', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', toggleActions: 'play pause resume pause' },
        });
        const dome = section.querySelector('.scene-dome');
        if (dome) gsap.fromTo(dome, { scaleY: .25 }, { scaleY: 1, ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'top 55%', scrub: .7 },
        });
      });
      q('.experience-item').forEach(item => ScrollTrigger.create({
        trigger: item, start: 'top 58%', end: 'bottom 42%',
        onToggle: self => item.classList.toggle('is-reading', self.isActive),
      }));
    });
    q('.project-panel').forEach(item => ScrollTrigger.create({
      trigger: item, start: 'top 75%', end: 'bottom 25%',
      onToggle: self => item.classList.toggle('is-current', self.isActive),
    }));
    // A quiet connective line between work and the professional history.
    const seam = document.querySelector('.transition-band-line');
    if (seam) gsap.fromTo(seam, { scaleX: 0, xPercent: -20 }, {
      scaleX: 1, xPercent: 0, ease: 'none',
      scrollTrigger: { trigger: '.transition-band', start: 'top bottom', end: 'bottom 45%', scrub: .65 },
    });
  }, { dependencies: [reduced], revertOnUpdate: true });
}
