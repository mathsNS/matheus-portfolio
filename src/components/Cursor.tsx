import { useEffect, useRef } from 'react';
import { gsap } from '../hooks/useMotion';

export function Cursor() {
  const cursor = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches || !cursor.current || !ring.current) return;
    const element = cursor.current;
    const circle = ring.current;
    const setX = gsap.quickTo(circle, 'x', { duration: 0.3, ease: 'power3.out' });
    const setY = gsap.quickTo(circle, 'y', { duration: 0.3, ease: 'power3.out' });
    const move = (e: PointerEvent) => {
      if (!circle.classList.contains('cursor--visible')) gsap.set(circle, { x: e.clientX, y: e.clientY });
      element.style.left = `${e.clientX}px`;
      element.style.top = `${e.clientY}px`;
      setX(e.clientX);
      setY(e.clientY);
      element.classList.add('cursor--visible');
      circle.classList.add('cursor--visible');
    };
    const hover = (e: PointerEvent) => circle.classList.toggle('cursor--active', !!(e.target as HTMLElement).closest('a, button, [data-cursor]'));
    const leave = () => { element.classList.remove('cursor--visible'); circle.classList.remove('cursor--visible'); };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', hover, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerover', hover); document.removeEventListener('pointerleave', leave); gsap.killTweensOf(circle); };
  }, []);
  return <><div aria-hidden="true" ref={cursor} className="custom-cursor"><span /></div><span aria-hidden="true" ref={ring} className="custom-cursor-ring" /></>;
}
