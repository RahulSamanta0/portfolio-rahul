import { useEffect, useRef, useState } from "react";
import {
  TOTAL_FRAMES,
  LERP_FACTOR,
  DRAG_SENSITIVITY,
  WHEEL_SENSITIVITY,
} from "./character.config";

export interface ScrollProgressOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  onFrameChange?: (frame: number, degrees: number) => void;
}

export function useScrollProgress({ containerRef, onFrameChange }: ScrollProgressOptions) {
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const hasInteractedRef = useRef<boolean>(false);

  const [hasInteracted, setHasInteracted] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Scroll event & viewport calculation
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (isDraggingRef.current) return;

      const scrollY = window.scrollY;
      velocityRef.current = scrollY - lastScrollY;
      lastScrollY = scrollY;

      // The hero uses a 300vh scroll container with a 100svh sticky viewport.
      // This means 200vh of actual scroll travel drives the animation.
      // Map that 200vh range linearly to 0→1 (one full 360° rotation).
      const scrollTravel = window.innerHeight * 2; // 200vh
      const rawProgress = Math.min(scrollY / scrollTravel, 1);
      targetProgressRef.current = rawProgress;

      if (!hasInteractedRef.current && scrollY > 20) {
        hasInteractedRef.current = true;
        setHasInteracted(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Direct container pointer drag & wheel interactions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startX = 0;
    let startY = 0;
    let lastX = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      startX = e.clientX;
      startY = e.clientY;
      lastX = e.clientX;
      container.setPointerCapture(e.pointerId);

      if (!hasInteractedRef.current) {
        hasInteractedRef.current = true;
        setHasInteracted(true);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - lastX;
      lastX = e.clientX;

      // Dragging left advances rotation (towards back), dragging right rotates towards front
      targetProgressRef.current = Math.max(
        0,
        Math.min(1, targetProgressRef.current + deltaX * DRAG_SENSITIVITY)
      );
    };

    const onPointerUp = (e: PointerEvent) => {
      isDraggingRef.current = false;
      try {
        if (container.hasPointerCapture(e.pointerId)) {
          container.releasePointerCapture(e.pointerId);
        }
      } catch {
        // ignore if already released
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        targetProgressRef.current = Math.max(
          0,
          Math.min(1, targetProgressRef.current + e.deltaY * WHEEL_SENSITIVITY)
        );

        if (!hasInteractedRef.current) {
          hasInteractedRef.current = true;
          setHasInteracted(true);
        }
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);
    container.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("wheel", onWheel);
    };
  }, [containerRef]);

  const setManualProgress = (val: number) => {
    targetProgressRef.current = Math.max(0, Math.min(1, val));
    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true;
      setHasInteracted(true);
    }
  };

  return {
    targetProgressRef,
    currentProgressRef,
    currentFrameRef,
    velocityRef,
    isDraggingRef,
    hasInteracted,
    isReducedMotion,
    setManualProgress,
  };
}
