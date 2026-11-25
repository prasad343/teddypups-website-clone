import { useEffect, useRef } from 'react';
import './PawTrail.css';

// One reusable paw SVG. The visual copy for each footprint is created only
// when the user actually moves a mouse (never for touch input).
function PawSvg() {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true" focusable="false">
      <ellipse cx="14" cy="24" rx="6" ry="8" transform="rotate(-25 14 24)" />
      <ellipse cx="26" cy="13" rx="6" ry="8" transform="rotate(-8 26 13)" />
      <ellipse cx="40" cy="14" rx="6" ry="8" transform="rotate(12 40 14)" />
      <ellipse cx="51" cy="27" rx="6" ry="8" transform="rotate(28 51 27)" />
      <path d="M32 27c-6.8 0-11 5.4-14.7 10.1C13.7 42 13 44.1 13 48.4 13 54.2 17.4 58 23 58c3.8 0 6.1-2.3 9-2.3s5.2 2.3 9 2.3c5.6 0 10-3.8 10-9.6 0-4.3-.7-6.4-4.3-11.3C43 32.4 38.8 27 32 27Z" />
    </svg>
  );
}

export default function PawTrail() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const lastRef = useRef({ x: -1000, y: -1000, time: 0 });

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) return;

    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    const html = document.documentElement;
    html.classList.add('teddy-paw-mode');
    const pawIcon = cursor.querySelector('svg');
    let previousTime = 0;
    let last = lastRef.current;

    function pointerMove(event) {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      const x = event.clientX;
      const y = event.clientY;
      cursor.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0)`;
      cursor.style.opacity = '1';

      const now = performance.now();
      const distance = Math.hypot(x - last.x, y - last.y);
      if (now - previousTime < 85 || distance < 15) return;
      previousTime = now;
      last = { x, y, time: now };
      lastRef.current = last;

      const print = document.createElement('span');
      print.className = 'teddy-paw-print';
      print.style.left = `${x}px`;
      print.style.top = `${y}px`;
      print.style.setProperty('--paw-turn', `${Math.round(Math.random() * 44 - 22)}deg`);
      print.appendChild(pawIcon.cloneNode(true));
      trail.appendChild(print);

      print.addEventListener('animationend', () => print.remove(), { once: true });
      // Fallback when animations are interrupted (e.g. background tab).
      window.setTimeout(() => print.remove(), 1300);
    }

    function hideCursor() { cursor.style.opacity = '0'; }
    document.addEventListener('pointermove', pointerMove, { passive: true });
    document.addEventListener('pointerleave', hideCursor);
    window.addEventListener('blur', hideCursor);

    return () => {
      document.removeEventListener('pointermove', pointerMove);
      document.removeEventListener('pointerleave', hideCursor);
      window.removeEventListener('blur', hideCursor);
      html.classList.remove('teddy-paw-mode');
      trail.replaceChildren();
    };
  }, []);

  return (
    <div className="teddy-paw-effects" aria-hidden="true">
      <div className="teddy-paw-trails" ref={trailRef} />
      <div className="teddy-paw-cursor" ref={cursorRef}><PawSvg /></div>
    </div>
  );
}
