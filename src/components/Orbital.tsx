import { useRef } from 'react';
import type { PointerEvent } from 'react';
import { gsap, useGSAP } from '../hooks/useMotion';
import { useReducedMotion } from '../hooks/useMotion';

/** Purpose-built, lightweight SVG orbital diagram: zero canvas/WebGL cost. */
export function Orbital() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useGSAP(() => {
    if (reduced) return;
    gsap.to('.orbit-outer', { rotation: 360, duration: 65, repeat: -1, ease: 'none', transformOrigin: '50% 50%' });
    gsap.to('.orbit-middle', { rotation: -360, duration: 38, repeat: -1, ease: 'none', transformOrigin: '50% 50%' });
    gsap.to('.orbit-core', { rotation: 360, duration: 22, repeat: -1, ease: 'none', transformOrigin: '50% 50%' });
    gsap.fromTo('.orbital-stage', { scale: 0.78, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6, delay: 0.3, ease: 'expo.out' });
  }, { scope: root, dependencies: [reduced], revertOnUpdate: true });
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || !root.current || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = root.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(root.current.querySelector('.orbital-stage'), { x: x * 28, y: y * 28, rotationY: x * 8, rotationX: -y * 8, duration: 0.9, ease: 'power3.out' });
  };
  const leave = () => gsap.to(root.current?.querySelector('.orbital-stage') ?? {}, { x: 0, y: 0, rotationX: 0, rotationY: 0, duration: 1, ease: 'power3.out' });
  return <div ref={root} className="orbital" onPointerMove={move} onPointerLeave={leave} aria-hidden="true">
    <div className="orbital-glow" />
    <div className="orbital-stage">
      <svg viewBox="0 0 600 600" role="presentation">
        <defs>
          <linearGradient id="orbitGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#66BFD0" stopOpacity="0.9"/><stop offset="1" stopColor="#66BFD0" stopOpacity="0.05"/></linearGradient>
        </defs>
        <circle cx="300" cy="300" r="280" fill="none" stroke="#66bfd0" strokeOpacity=".06" />
        <circle cx="300" cy="300" r="224" fill="none" stroke="#66bfd0" strokeOpacity=".12" strokeDasharray="1 10" />
        <path d="M300 12v576M12 300h576" stroke="#66bfd0" strokeOpacity=".085" strokeDasharray="3 9" />
        <g className="orbit-outer">
          <ellipse cx="300" cy="300" rx="278" ry="113" transform="rotate(-34 300 300)" fill="none" stroke="url(#orbitGrad)" strokeWidth="1.5" />
          <circle cx="60" cy="161" r="7" fill="#66bfd0"/><circle cx="60" cy="161" r="17" fill="none" stroke="#66bfd0" strokeOpacity=".2" />
          <path d="M300 14v16M300 570v16M14 300h16M570 300h16" stroke="#66bfd0" strokeOpacity=".5" />
        </g>
        <g className="orbit-middle">
          <ellipse cx="300" cy="300" rx="239" ry="127" transform="rotate(54 300 300)" fill="none" stroke="#66bfd0" strokeOpacity=".32" />
          <circle cx="486" cy="450" r="4" fill="#fff" />
          <circle cx="300" cy="300" r="186" fill="none" stroke="#66bfd0" strokeOpacity=".18" strokeDasharray="130 30 2 60" strokeWidth="1.4" />
        </g>
        <g className="orbit-core">
          <circle cx="300" cy="300" r="123" fill="none" stroke="#66bfd0" strokeOpacity=".6" strokeDasharray="2 5" strokeWidth="1.5" />
          <path d="M300 167 A133 133 0 0 1 430 310" stroke="#66bfd0" strokeWidth="4" strokeLinecap="round" fill="none" />
        </g>
        <circle cx="300" cy="300" r="91" fill="#071a2a" stroke="#66bfd0" strokeOpacity=".4" />
        <circle cx="300" cy="300" r="75" fill="#66bfd0" fillOpacity=".04" />
        <path d="M261 322v-47l21 27 18-27v47M315 322v-47l28 47v-47" fill="none" stroke="#66bfd0" strokeWidth="7" strokeLinejoin="miter" strokeLinecap="square" />
        <circle cx="300" cy="300" r="6" fill="none" stroke="#66bfd0" strokeOpacity=".13" />
      </svg>
    </div>
  </div>;
}
