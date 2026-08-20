"use client";

import { useEffect, useRef } from "react";

// 17 frames: 0.png → 16.png in exact rotation sequence
const TOTAL_FRAMES = 17;
const frameSrc = (i: number) => `/hero img/${i}.png`;

// Spring physics constants
const SPRING_STIFFNESS = 0.10;  // how strongly it snaps to target
const SPRING_DAMPING   = 0.72;  // how quickly oscillation dies (< 1 = smooth)

export default function CharacterRotation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d")!;

    // ── Load all frames ────────────────────────────────────────────────────
    const images: HTMLImageElement[] = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new Image();
      img.src = frameSrc(i);
      return img;
    });

    let loadedCount = 0;
    let ready = false;
    images.forEach(img => {
      img.onload  = () => { if (++loadedCount === TOTAL_FRAMES) ready = true; };
      img.onerror = () => { loadedCount++; };
    });

    // ── Canvas resize ──────────────────────────────────────────────────────
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = container.clientWidth;
      const h = container.clientHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // ── Spring state ───────────────────────────────────────────────────────
    let targetFrame  = 0;   // where we want to be (driven by input)
    let currentFrame = 0;   // current spring position (real number 0–16)
    let velocity     = 0;   // spring velocity

    // ── Render loop ────────────────────────────────────────────────────────
    let rafId: number;

    const render = () => {
      rafId = requestAnimationFrame(render);

      // Spring physics: F = -k·Δx − c·v
      const delta = targetFrame - currentFrame;
      velocity     = velocity * SPRING_DAMPING + delta * SPRING_STIFFNESS;
      currentFrame += velocity;

      // Clamp to valid range
      currentFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, currentFrame));

      if (!ready) return;

      const w = container.clientWidth;
      const h = container.clientHeight;

      // Which two frames to blend
      const lo = Math.floor(currentFrame);
      const hi = Math.min(lo + 1, TOTAL_FRAMES - 1);
      const t  = currentFrame - lo;           // 0 → 1 blend factor

      const imgA = images[lo];
      const imgB = images[hi];

      ctx.clearRect(0, 0, w, h);

      if (!imgA?.complete) return;

      // Draw image A at full opacity – cover the container maintaining aspect ratio
      const draw = (img: HTMLImageElement, alpha: number) => {
        if (!img?.complete || !img.naturalWidth) return;
        ctx.globalAlpha = alpha;

        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        const scale = Math.min(w / iw, h / ih);
        const dw = iw * scale;
        const dh = ih * scale;
        const dx = (w - dw) / 2;
        const dy = (h - dh) / 2;

        ctx.drawImage(img, dx, dy, dw, dh);
        ctx.globalAlpha = 1;
      };

      draw(imgA, 1);
      if (t > 0.001) draw(imgB, t);
    };

    render();

    // ── Wheel: scroll over the element to rotate ───────────────────────────
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      // deltaY > 0 → scroll down → advance rotation (right→left)
      targetFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, targetFrame + e.deltaY * 0.035));
    };
    container.addEventListener("wheel", onWheel, { passive: false });

    // ── Pointer drag ───────────────────────────────────────────────────────
    let dragging = false;
    let lastX    = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      container.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      // Drag left → increase frame (right-to-left rotation)
      targetFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, targetFrame - dx * 0.06));
    };
    const onUp = () => { dragging = false; };

    container.addEventListener("pointerdown", onDown);
    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerup",   onUp);
    container.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      container.removeEventListener("wheel",        onWheel);
      container.removeEventListener("pointerdown",  onDown);
      container.removeEventListener("pointermove",  onMove);
      container.removeEventListener("pointerup",    onUp);
      container.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="home__animation"
      style={{ touchAction: "none", cursor: "grab" }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
