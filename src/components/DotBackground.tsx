"use client";

import { useEffect, useRef } from "react";

export default function DotBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 170,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const gap = 24; // Dot spacing matching dark grid pattern
    const baseRadius = 1.5;
    const maxRadius = 5.5;

    const render = () => {
      // Smooth lerp mouse positioning
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Start drawing dot background from the top of page (including hero section)
      let startY = 0;

      // Draw dark grey-black combined gradient background across the whole page
      const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGrad.addColorStop(0, "#0b0f19");   // Deep dark slate-grey
      bgGrad.addColorStop(0.5, "#080c14"); // Dark charcoal-grey
      bgGrad.addColorStop(1, "#030406");   // Pitch black
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / gap) + 1;
      const rows = Math.ceil((canvas.height - startY) / gap) + 1;

      const startRowIndex = Math.floor(startY / gap);

      for (let i = 0; i < cols; i++) {
        for (let j = startRowIndex; j < startRowIndex + rows; j++) {
          const x = i * gap;
          const y = j * gap;

          if (y < startY) continue;

          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const factor = 1 - dist / mouse.radius;
            const easeFactor = factor * factor;

            const r = baseRadius + (maxRadius - baseRadius) * easeFactor;

            // Halo Aura
            ctx.beginPath();
            ctx.arc(x, y, r * 1.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 111, 0, ${(0.35 * easeFactor).toFixed(2)})`;
            ctx.fill();

            // Glowing Accent Dot
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 140, 30, ${(0.7 + 0.3 * easeFactor).toFixed(2)})`;
            ctx.fill();
          } else {
            // Subtle dark grid dot matching reference photo
            ctx.beginPath();
            ctx.arc(x, y, baseRadius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
