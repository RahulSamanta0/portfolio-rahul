"use client";

import React, { useRef, useState, useCallback } from "react";
import { useScrollProgress } from "./useScrollProgress";
import { useImageSequence } from "./useImageSequence";
import { CharacterCanvas } from "./CharacterCanvas";
import { TOTAL_FRAMES } from "./character.config";

export default function CharacterSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const degreeTextRef = useRef<HTMLSpanElement>(null);
  const frameTextRef = useRef<HTMLSpanElement>(null);
  const compassDialRef = useRef<HTMLDivElement>(null);
  const progressRingRef = useRef<SVGCircleElement>(null);

  const {
    targetProgressRef,
    currentProgressRef,
    hasInteracted,
    isReducedMotion,
    setManualProgress,
  } = useScrollProgress({ containerRef });

  const { loadProgress, isReady, getTexture } = useImageSequence();

  // Direct DOM updater for HUD to bypass React re-rendering during 60FPS animation
  const handleHUDUpdate = useCallback((frame: number, degrees: number) => {
    if (degreeTextRef.current) {
      degreeTextRef.current.textContent = `${degrees}°`;
    }
    if (frameTextRef.current) {
      frameTextRef.current.textContent = `FRAME ${String(frame + 1).padStart(3, "0")} / ${TOTAL_FRAMES}`;
    }
    if (compassDialRef.current) {
      compassDialRef.current.style.transform = `rotate(${degrees}deg)`;
    }
    if (progressRingRef.current) {
      const circumference = 2 * Math.PI * 18; // r=18 -> ~113.1
      const offset = circumference - (degrees / 360) * circumference;
      progressRingRef.current.style.strokeDashoffset = `${offset}`;
    }
  }, []);

  const handleAngleQuickSelect = (deg: number) => {
    setManualProgress(deg / 360);
  };

  return (
    <div
      ref={containerRef}
      className="character-viewer-card"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "480px",
        aspectRatio: "1 / 1",
        margin: "0 auto",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
        background: "radial-gradient(circle at center, rgba(30, 41, 59, 0.45) 0%, rgba(11, 15, 25, 0.85) 100%)",
        border: "1px solid rgba(255, 255, 255, 0.09)",
        boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.7), 0 0 30px -5px rgba(234, 88, 12, 0.12)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* ── Background Cyber Grid & Glow Accents ───────────────────────── */}
      <div
        className="character-glow-aura"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          height: "70%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(234, 88, 12, 0.16) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 75%)",
          pointerEvents: "none",
          filter: "blur(24px)",
          zIndex: 0,
        }}
      />

      {/* Cyber Corner Decors */}
      <div className="cyber-corner cyber-corner--tl" />
      <div className="cyber-corner cyber-corner--tr" />
      <div className="cyber-corner cyber-corner--bl" />
      <div className="cyber-corner cyber-corner--br" />

      {/* ── Top HUD Header ────────────────────────────────────────────── */}
      <div
        className="character-hud-top"
        style={{
          position: "absolute",
          top: "14px",
          left: "16px",
          right: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <div
          className="hud-badge"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            background: "rgba(15, 23, 42, 0.75)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            padding: "5px 12px",
            borderRadius: "999px",
            fontSize: "0.72rem",
            fontFamily: "var(--mono-font)",
            color: "#e2e8f0",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: isReady ? "#22c55e" : "#ea580c",
              boxShadow: isReady
                ? "0 0 10px #22c55e"
                : "0 0 10px #ea580c",
              animation: "pulse 2s infinite",
            }}
          />
          <span>360° INTERACTIVE</span>
        </div>

        {/* Degree & Frame Monitor */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {/* Circular Rotation Gauge */}
          <div
            style={{
              position: "relative",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 44 44" style={{ transform: "rotate(-90deg)" }}>
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="3"
              />
              <circle
                ref={progressRingRef}
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="#ea580c"
                strokeWidth="3"
                strokeDasharray="113.1"
                strokeDashoffset="113.1"
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.05s linear" }}
              />
            </svg>
            <div
              ref={compassDialRef}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  width: "2px",
                  height: "8px",
                  backgroundColor: "#fff",
                  position: "absolute",
                  top: "4px",
                  borderRadius: "1px",
                }}
              />
            </div>
          </div>

          <div
            className="hud-degree-pill"
            style={{
              background: "rgba(15, 23, 42, 0.75)",
              border: "1px solid rgba(234, 88, 12, 0.35)",
              padding: "5px 11px",
              borderRadius: "999px",
              fontFamily: "var(--mono-font)",
              fontSize: "0.82rem",
              fontWeight: 700,
              color: "#fb923c",
              minWidth: "48px",
              textAlign: "center",
              boxShadow: "0 0 15px rgba(234, 88, 12, 0.2)",
            }}
          >
            <span ref={degreeTextRef}>0°</span>
          </div>
        </div>
      </div>

      {/* ── Main Three.js Character WebGL Canvas ────────────────────────── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          zIndex: 5,
        }}
      >
        <CharacterCanvas
          targetProgressRef={targetProgressRef}
          currentProgressRef={currentProgressRef}
          getTexture={getTexture}
          isReady={isReady}
          isReducedMotion={isReducedMotion}
          onHUDUpdate={handleHUDUpdate}
        />
      </div>

      {/* ── Progressive Loading Overlay ─────────────────────────────────── */}
      {!isReady && (
        <div
          className="character-loader-overlay"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(11, 15, 25, 0.92)",
            backdropFilter: "blur(8px)",
            zIndex: 20,
            padding: "24px",
            color: "#f8fafc",
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono-font)",
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              color: "#94a3b8",
              marginBottom: "12px",
              textTransform: "uppercase",
            }}
          >
            INITIALIZING 3D ASSETS
          </div>

          {/* Futuristic Progress Bar */}
          <div
            style={{
              width: "180px",
              height: "4px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "2px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                width: `${loadProgress}%`,
                height: "100%",
                background: "linear-gradient(90deg, #ea580c, #f97316, #a855f7)",
                transition: "width 0.2s ease-out",
                boxShadow: "0 0 10px rgba(234, 88, 12, 0.8)",
              }}
            />
          </div>

          <div
            style={{
              marginTop: "8px",
              fontFamily: "var(--mono-font)",
              fontSize: "0.75rem",
              color: "#ea580c",
              fontWeight: 600,
            }}
          >
            {loadProgress}%
          </div>
        </div>
      )}

      {/* ── Bottom HUD Footer ───────────────────────────────────────────── */}
      <div
        className="character-hud-bottom"
        style={{
          position: "absolute",
          bottom: "12px",
          left: "14px",
          right: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 10,
          pointerEvents: "auto",
        }}
      >
        {/* Frame Info */}
        <div
          style={{
            fontFamily: "var(--mono-font)",
            fontSize: "0.68rem",
            color: "rgba(226, 232, 240, 0.65)",
            background: "rgba(15, 23, 42, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "3px 8px",
            borderRadius: "6px",
            letterSpacing: "0.06em",
          }}
        >
          <span ref={frameTextRef}>FRAME 001 / {TOTAL_FRAMES}</span>
        </div>

        {/* Quick Angle Selectors */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          {[
            { label: "0°", deg: 0 },
            { label: "90°", deg: 90 },
            { label: "180°", deg: 180 },
            { label: "270°", deg: 270 },
          ].map((angle) => (
            <button
              key={angle.label}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleAngleQuickSelect(angle.deg);
              }}
              style={{
                fontFamily: "var(--mono-font)",
                fontSize: "0.68rem",
                color: "#94a3b8",
                background: "rgba(15, 23, 42, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                padding: "3px 7px",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ea580c";
                e.currentTarget.style.borderColor = "rgba(234, 88, 12, 0.5)";
                e.currentTarget.style.background = "rgba(234, 88, 12, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#94a3b8";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.background = "rgba(15, 23, 42, 0.6)";
              }}
            >
              {angle.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Scroll / Drag Interaction Hint (Fades out when interacted) ───── */}
      <div
        className={`interaction-hint ${hasInteracted ? "interaction-hint--hidden" : ""}`}
        style={{
          position: "absolute",
          bottom: "44px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(11, 15, 25, 0.82)",
          border: "1px solid rgba(234, 88, 12, 0.4)",
          padding: "6px 14px",
          borderRadius: "999px",
          fontFamily: "var(--mono-font)",
          fontSize: "0.72rem",
          color: "#fed7aa",
          letterSpacing: "0.06em",
          boxShadow: "0 0 20px rgba(234, 88, 12, 0.25)",
          pointerEvents: "none",
          zIndex: 15,
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path d="M12 8v8" />
          <path d="M8 12l4 4 4-4" />
        </svg>
        <span>SCROLL OR DRAG TO ROTATE</span>
      </div>
    </div>
  );
}
