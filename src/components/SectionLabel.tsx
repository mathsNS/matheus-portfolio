import type { ReactNode } from 'react';
type Props = { number: string; children: ReactNode; light?: boolean };
export function SectionLabel({ number, children, light = false }: Props) {
  return <div className={`section-label ${light ? 'section-label--dark' : ''}`}><span className="section-label-dot" /> <span>[ {number} ]</span><span>{children}</span></div>;
}
