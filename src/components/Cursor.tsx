import { useEffect, useRef } from 'react';
import { gsap } from '../hooks/useMotion';

export function Cursor() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches || !cursor.current) return;
    const element = cursor.current;
    const setX = gsap.quickTo(element, 'x', { duration: 0.22, ease: 'power3.out' });
    const setY = gsap.quickTo(element, 'y', { duration: 0.22, ease: 'power3.out' });
    const move = (e: PointerEvent) => { setX(e.clientX); setY(e.clientY); element.classList.add('cursor--visible'); };
    const hover = (e: PointerEvent) => element.classList.toggle('cursor--active', !!(e.target as HTMLElement).closest('a, button, [data-cursor]'));
    const leave = () => element.classList.remove('cursor--visible');
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', hover, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerover', hover); document.removeEventListener('pointerleave', leave); };
  }, []);
  return <div aria-hidden="true" ref={cursor} className="custom-cursor"><span /></div>;
}
