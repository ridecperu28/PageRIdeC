"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  Children,
  type ReactNode,
} from "react";

export default function Slider({
  children,
  visibleCount = 3,
}: {
  children: ReactNode;
  visibleCount?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [cardWidth, setCardWidth] = useState(336);
  const count = Children.count(children);
  const maxIdx = Math.max(0, count - visibleCount);

  useEffect(() => {
    function measure() {
      if (trackRef.current) {
        const first = trackRef.current.children[0] as HTMLElement;
        if (first) {
          const gap = parseInt(getComputedStyle(trackRef.current).gap) || 24;
          setCardWidth(first.offsetWidth + gap);
        }
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const clamp = useCallback(
    (i: number) => Math.max(0, Math.min(i, maxIdx)),
    [maxIdx]
  );

  return (
    <div className="relative overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-6 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ transform: `translateX(-${slideIdx * cardWidth}px)` }}
      >
        {children}
      </div>

      {slideIdx > 0 && (
        <button
          className="absolute left-0 top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-[1.2rem] text-[#0d2c4f] shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-colors duration-200 hover:bg-slate-200"
          onClick={() => setSlideIdx((i) => clamp(i - 1))}
          aria-label="Anterior"
        >
          &#8249;
        </button>
      )}
      {slideIdx < maxIdx && (
        <button
          className="absolute right-0 top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-[1.2rem] text-[#0d2c4f] shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-colors duration-200 hover:bg-slate-200"
          onClick={() => setSlideIdx((i) => clamp(i + 1))}
          aria-label="Siguiente"
        >
          &#8250;
        </button>
      )}
    </div>
  );
}
