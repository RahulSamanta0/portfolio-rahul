"use client";

import React, { useEffect, useRef } from "react";
import {
  TOTAL_FRAMES,
  IMAGE_WIDTH,
  IMAGE_HEIGHT,
  LERP_FACTOR,
} from "./character.config";

interface CharacterCanvasProps {
  targetProgressRef: React.MutableRefObject<number>;
  currentProgressRef: React.MutableRefObject<number>;
  getImage: (frame: number) => HTMLImageElement | null;
  isReady: boolean;
  isReducedMotion?: boolean;
  onHUDUpdate?: (frame: number, degrees: number) => void;
}

export const CharacterCanvas: React.FC<CharacterCanvasProps> = ({
  targetProgressRef,
  currentProgressRef,
  getImage,
  isReady,
  isReducedMotion = false,
  onHUDUpdate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastDrawnImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const updateSize = () => {
      if (!container || !canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    const renderLoop = () => {
      animationId = requestAnimationFrame(renderLoop);

      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      // Handle reduced motion
      if (isReducedMotion) {
        const img = getImage(TOTAL_FRAMES - 1) || getImage(0) || lastDrawnImgRef.current;
        if (img && img.complete && img.naturalWidth > 0) {
          lastDrawnImgRef.current = img;
          ctx.fillStyle = "#000000";
          ctx.fillRect(0, 0, width, height);
          drawCharacter(ctx, img, width, height);
          onHUDUpdate?.(TOTAL_FRAMES - 1, 0);
        }
        return;
      }

      // Smooth Lerp Interpolation
      const target = Math.max(0, Math.min(1, targetProgressRef.current));
      const current = currentProgressRef.current;
      const diff = target - current;

      currentProgressRef.current = Math.max(0, Math.min(1, current + diff * LERP_FACTOR));

      // Map progress 0.0 -> Frame 189 (0° Front view) down to progress 1.0 -> Frame 0 (180° Back view)
      const frameIndex = Math.max(
        0,
        Math.min(TOTAL_FRAMES - 1, Math.round((1 - currentProgressRef.current) * (TOTAL_FRAMES - 1)))
      );

      const degrees = Math.round(currentProgressRef.current * 180);

      let img = getImage(frameIndex);
      if (!img || !img.complete || img.naturalWidth === 0) {
        img = lastDrawnImgRef.current;
      }

      if (img && img.complete && img.naturalWidth > 0) {
        lastDrawnImgRef.current = img;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);
        drawCharacter(ctx, img, width, height);
      }

      onHUDUpdate?.(frameIndex, degrees);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [getImage, isReducedMotion, onHUDUpdate, targetProgressRef, currentProgressRef]);

  return (
    <div
      ref={containerRef}
      className="character-canvas-wrapper"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#000000",
      }}
    >
      <canvas
        ref={canvasRef}
        aria-label="Interactive character animation view of Rahul Samanta"
        role="img"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

function drawCharacter(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  viewportWidth: number,
  viewportHeight: number
) {
  const isDesktop = viewportWidth >= 992;
  const isTablet = viewportWidth >= 640 && viewportWidth < 992;

  let scale: number;
  let offsetX = 0;
  let offsetY = 0;

  if (isDesktop) {
    const scaleH = (viewportHeight * 1.05) / IMAGE_HEIGHT;
    const scaleW = (viewportWidth * 0.75) / IMAGE_WIDTH;
    scale = Math.max(scaleH, scaleW);
    offsetX = viewportWidth * 0.16;
    offsetY = viewportHeight * 0.02;
  } else if (isTablet) {
    scale = Math.max((viewportHeight * 0.95) / IMAGE_HEIGHT, (viewportWidth * 0.85) / IMAGE_WIDTH);
    offsetX = viewportWidth * 0.08;
    offsetY = viewportHeight * 0.04;
  } else {
    scale = Math.max((viewportHeight * 0.75) / IMAGE_HEIGHT, (viewportWidth * 0.95) / IMAGE_WIDTH);
    offsetX = 0;
    offsetY = viewportHeight * 0.10;
  }

  const drawWidth = IMAGE_WIDTH * scale;
  const drawHeight = IMAGE_HEIGHT * scale;

  const x = (viewportWidth - drawWidth) / 2 + offsetX;
  const y = (viewportHeight - drawHeight) / 2 + offsetY;

  ctx.drawImage(img, x, y, drawWidth, drawHeight);
}
