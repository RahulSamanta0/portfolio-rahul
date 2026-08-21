"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * SmoothScrollProvider
 * --------------------
 * Wraps the app in a Lenis smooth-scroll instance.
 * Lenis intercepts the native scroll position and feeds a
 * momentum-eased value to all downstream `scroll` listeners,
 * including useScrollProgress — so the frame animation inherits
 * the smoothing automatically with zero changes elsewhere.
 *
 * Tuning:
 *   duration  — overall glide time in seconds (0.8 = fast, 1.4 = cinematic)
 *   easing    — any easing function (t) => t
 *   lerp      — alternative to duration; direct lerp factor (0–1)
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,           // seconds — cinematic glide
      easing: (t: number) =>   // custom cubic ease-out
        t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
      smoothWheel: true,       // smooth mouse-wheel
      touchMultiplier: 1.5,    // slightly amplify touch scroll
    });

    lenisRef.current = lenis;

    // Drive Lenis on every animation frame
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
