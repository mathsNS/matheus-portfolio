import { useRef } from 'react';
import { gsap } from '../hooks/useMotion';
import type { ReactNode, MouseEvent } from 'react';
export function Magnetic({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const onMove = (event: MouseEvent<HTMLSpanElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    gsap.to(ref.current, { x: (event.clientX - (rect.left + rect.width / 2)) * 0.17, y: (event.clientY - (rect.top + rect.height / 2)) * 0.17, duration: 0.4, ease: 'power3.out' });
  };
  const reset = () => { if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1,0.5)' }); };
  return <span ref={ref} className={`magnetic ${className}`} onMouseMove={onMove} onMouseLeave={reset}>{children}</span>;
}
