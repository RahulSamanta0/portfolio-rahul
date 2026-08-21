"use client";

import React, { useRef, useCallback } from "react";
import { useScrollProgress } from "./useScrollProgress";
import { useImageSequence } from "./useImageSequence";
import { CharacterCanvas } from "./CharacterCanvas";

export default function CharacterSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const degreeTextRef = useRef<HTMLSpanElement>(null);
  const progressRingRef = useRef<SVGCircleElement>(null);

  const {
    targetProgressRef,
    currentProgressRef,
    hasInteracted,
    isReducedMotion,
    setManualProgress,
  } = useScrollProgress({ containerRef });

  const { loadProgress, isReady, getImage } = useImageSequence();

  // Direct DOM updater — bypasses React re-render for 60fps HUD
  const handleHUDUpdate = useCallback((frame: number, degrees: number) => {
    if (degreeTextRef.current) {
      degreeTextRef.current.textContent = `${degrees}°`;
    }
    if (progressRingRef.current) {
      const circumference = 2 * Math.PI * 14;
      const progressRatio = Math.min(1, Math.max(0, degrees / 180));
      const offset = circumference - progressRatio * circumference;
      progressRingRef.current.style.strokeDashoffset = `${offset}`;
    }
  }, []);

  const handleAngleQuickSelect = (deg: number) => {
    setManualProgress(deg / 180);
  };

  return (
    // Full-screen background stage — fills the entire hero-sticky container
    <div
      ref={containerRef}
      className="character-background"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
        zIndex: 0,
      }}
    >
      {/* ── 2D Full-Screen Canvas ─────────────────────────────── */}
      <CharacterCanvas
        targetProgressRef={targetProgressRef}
        currentProgressRef={currentProgressRef}
        getImage={getImage}
        isReady={isReady}
        isReducedMotion={isReducedMotion}
        onHUDUpdate={handleHUDUpdate}
      />

      {/* ── Preload Badge ──────────────────────────────────────────── */}
      {!isReady && (
        <div
          style={{
            position: "absolute",
            bottom: "clamp(24px, 4vh, 48px)",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(11, 15, 25, 0.85)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "8px 18px",
            borderRadius: "999px",
            zIndex: 20,
            color: "#f8fafc",
            fontFamily: "var(--mono-font)",
            fontSize: "0.75rem",
          }}
        >
          <span style={{ color: "#94a3b8" }}>INITIALIZING 3D</span>
          <div
            style={{
              width: "50px",
              height: "3px",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${loadProgress}%`,
                height: "100%",
                background: "#ea580c",
                transition: "width 0.2s ease-out",
              }}
            />
          </div>
          <span style={{ color: "#ea580c", fontWeight: 700 }}>{loadProgress}%</span>
        </div>
      )}

      {/* ── 360° Rotation Controls — anchored viewport bottom-right ─── */}
      <div
        className="hero-floating-controls"
        style={{
          position: "absolute",
          bottom: "clamp(24px, 4vh, 60px)",
          right: "clamp(24px, 4vw, 70px)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          padding: "7px 16px",
          borderRadius: "999px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          zIndex: 3,
          pointerEvents: "auto",
        }}
      >
        {/* Circular Mini Gauge */}
        <div style={{ position: "relative", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="24" height="24" viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="2.5" />
            <circle
              ref={progressRingRef}
              cx="18" cy="18" r="14"
              fill="none" stroke="#ea580c" strokeWidth="2.5"
              strokeDasharray="88" strokeDashoffset="88" strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Live Degree */}
        <span
          ref={degreeTextRef}
          style={{ fontFamily: "var(--mono-font)", fontSize: "0.82rem", fontWeight: 700, color: "#fb923c", minWidth: "38px" }}
        >
          0°
        </span>

        <span style={{ width: "1px", height: "14px", backgroundColor: "rgba(255, 255, 255, 0.15)" }} />

        {/* Quick Angle Buttons */}
        <div style={{ display: "flex", gap: "4px" }}>
          {[0, 45, 90, 135, 180].map((deg) => (
            <button
              key={deg}
              type="button"
              onClick={(e) => { e.stopPropagation(); handleAngleQuickSelect(deg); }}
              style={{
                fontFamily: "var(--mono-font)", fontSize: "0.72rem", color: "#94a3b8",
                background: "transparent", border: "none", padding: "2px 6px",
                borderRadius: "4px", cursor: "pointer", transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#ea580c"; e.currentTarget.style.backgroundColor = "rgba(234, 88, 12, 0.18)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              {deg}°
            </button>
          ))}
        </div>
      </div>

      {/* ── Interaction Hint Badge ──────────────────────────────────── */}
      <div
        className={`interaction-hint ${hasInteracted ? "interaction-hint--hidden" : ""}`}
        style={{
          position: "absolute",
          top: "clamp(24px, 4vh, 48px)",
          right: "clamp(24px, 4vw, 70px)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(11, 15, 25, 0.8)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(234, 88, 12, 0.4)",
          padding: "6px 14px",
          borderRadius: "999px",
          fontFamily: "var(--mono-font)",
          fontSize: "0.72rem",
          color: "#fed7aa",
          letterSpacing: "0.06em",
          boxShadow: "0 0 20px rgba(234, 88, 12, 0.25)",
          pointerEvents: "none",
          zIndex: 3,
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#ea580c", boxShadow: "0 0 8px #ea580c" }} />
        <span>DRAG / SCROLL TO ROTATE</span>
      </div>
    </div>
  );
}
