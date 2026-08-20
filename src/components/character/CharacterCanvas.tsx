"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  TOTAL_FRAMES,
  IMAGE_WIDTH,
  IMAGE_HEIGHT,
  LERP_FACTOR,
  DPR_MAX_DESKTOP,
  DPR_MAX_MOBILE,
} from "./character.config";

interface CharacterCanvasProps {
  targetProgressRef: React.MutableRefObject<number>;
  currentProgressRef: React.MutableRefObject<number>;
  getTexture: (frame: number) => THREE.Texture | null;
  isReady: boolean;
  isReducedMotion?: boolean;
  onHUDUpdate?: (frame: number, degrees: number) => void;
}

export const CharacterCanvas: React.FC<CharacterCanvasProps> = ({
  targetProgressRef,
  currentProgressRef,
  getTexture,
  isReady,
  isReducedMotion = false,
  onHUDUpdate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previousFrameRef = useRef<number>(-1);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // ── 1. Three.js Scene Setup ──────────────────────────────────────────
    const scene = new THREE.Scene();

    // Responsive Orthographic Camera
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
    camera.position.z = 10;

    // WebGL Renderer with Alpha transparency & high performance
    const isMobile = window.innerWidth <= 768;
    const maxDpr = isMobile ? DPR_MAX_MOBILE : DPR_MAX_DESKTOP;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
    });
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);

    // Character Plane Mesh (unit geometry scaled to match aspect ratio)
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      toneMapped: false,
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // ── 2. Responsive Sizing (Contain Aspect Ratio) ──────────────────────
    const updateSize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth || 300;
      const height = container.clientHeight || 300;

      renderer.setSize(width, height, false);

      // Orthographic camera coordinates centered at (0, 0)
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();

      // Fit character image with object-fit: contain
      const scale = Math.min(width / IMAGE_WIDTH, height / IMAGE_HEIGHT);
      plane.scale.set(IMAGE_WIDTH * scale, IMAGE_HEIGHT * scale, 1);
      plane.position.set(0, 0, 0);
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    // ── 3. Optimized Render Loop (Zero React Rerenders) ─────────────────
    let animationId: number;

    const renderLoop = () => {
      animationId = requestAnimationFrame(renderLoop);

      // If reduced motion is active, freeze at default front angle (frame 0)
      if (isReducedMotion) {
        if (previousFrameRef.current !== 0) {
          const texture = getTexture(0);
          if (texture) {
            material.map = texture;
            material.needsUpdate = true;
            previousFrameRef.current = 0;
            onHUDUpdate?.(0, 0);
          }
        }
        renderer.render(scene, camera);
        return;
      }

      // Smooth Lerp Interpolation
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      
      // Shortest angle / wrap distance handling for smooth rotation
      let diff = target - current;
      // When wrapping across 0 <-> 1 boundaries
      if (diff > 0.5) diff -= 1.0;
      if (diff < -0.5) diff += 1.0;

      currentProgressRef.current = (current + diff * LERP_FACTOR + 1.0) % 1.0;

      // Calculate corresponding frame index (0 to 239)
      const frameIndex = Math.max(
        0,
        Math.min(TOTAL_FRAMES - 1, Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1)))
      );

      // Calculate degrees (0° to 360°)
      const degrees = Math.round(currentProgressRef.current * 360) % 360;

      // Update Three.js texture only when the frame actually changes
      if (frameIndex !== previousFrameRef.current) {
        const texture = getTexture(frameIndex);
        if (texture) {
          material.map = texture;
          material.needsUpdate = true;
          previousFrameRef.current = frameIndex;
        }
      }

      // Direct lightweight HUD update
      onHUDUpdate?.(frameIndex, degrees);

      // Render Three.js frame
      renderer.render(scene, camera);
    };

    renderLoop();

    // ── 4. Lifecycle Cleanup ────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();

      // Dispose Three.js objects
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, [getTexture, isReducedMotion, onHUDUpdate, targetProgressRef, currentProgressRef]);

  return (
    <div
      ref={containerRef}
      className="character-canvas-wrapper"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        aria-label="Interactive 360 degree character view of Rahul Samanta"
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
