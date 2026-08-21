"use client";

import React, { useState, useEffect } from "react";
import CharacterSequence from "@/components/character/CharacterSequence";

export default function Home() {
  const [displayedBio, setDisplayedBio] = useState("");
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const fullName = "Rahul Samanta";
  const fullBio =
    "Hello, I’m Rahul — I engineer intelligent solutions for complex problems, blending AI, software engineering, and cloud technologies to create systems that are built to think, adapt, and scale.";

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayedBio(fullBio);
      return;
    }

    let bioIdx = 0;
    let timer: NodeJS.Timeout;

    // Type the bio with glowing neon dot cursor
    const typeBio = () => {
      if (bioIdx < fullBio.length) {
        bioIdx++;
        setDisplayedBio(fullBio.slice(0, bioIdx));
        const jitter = (Math.random() - 0.5) * 15;
        timer = setTimeout(typeBio, Math.max(15, 24 + jitter));
      }
    };

    const startTimer = setTimeout(typeBio, 350);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  return (
    <div className="hero-scroll-container" id="home">
      <section className="hero-sticky">
        {/* ── 360° Full-Screen Background Animation ────────────────────── */}
        <CharacterSequence />

        {/* ── Left-to-Right Readability Overlay ───────────────────────── */}
        <div className="hero-overlay" aria-hidden="true" />

        {/* ── Bottom Fade to Next Section ─────────────────────────────── */}
        <div className="hero-bottom-fade" aria-hidden="true" />

        {/* ── Foreground Content ──────────────────────────────────────── */}
        <div className="hero-content">
          <div className="hero-copy">
            <h1
              className={`hero-name ${mousePos ? "hero-name--spotlight" : ""}`}
              aria-label={fullName}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={
                mousePos
                  ? ({
                      "--mouse-x": `${mousePos.x}px`,
                      "--mouse-y": `${mousePos.y}px`,
                    } as React.CSSProperties)
                  : undefined
              }
            >
              <span className="hero-name-text">Rahul Samanta</span>
              <span className="hero-cursor" aria-hidden="true">_</span>
            </h1>

            <p className="hero-work">AI / ML &amp; Full Stack Developer</p>

            <p className="hero-bio" aria-label={fullBio}>
              <span>{displayedBio}</span>
              <span className="hero-bio-dot" aria-hidden="true" />
            </p>

            <div className="hero-actions hero-actions-mobile">
              <a
                href="https://github.com/RahulSamanta0"
                target="_blank"
                rel="noreferrer"
                className="hero-social-link"
                aria-label="GitHub Profile"
              >
                <i className="ri-github-fill"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/rahul-samanta-665910255/"
                target="_blank"
                rel="noreferrer"
                className="hero-social-link"
                aria-label="Google Scholar"
              >
                <i className="fa-brands fa-google-scholar" aria-hidden="true"></i>
              </a>
              <a
                href="mailto:rahulsamantaofficial00@gmail.com"
                className="hero-social-link"
                aria-label="Send Email"
              >
                <i className="ri-mail-fill"></i>
              </a>
              <a
                href="/assets/img/RahulSamanta_n resume.pdf"
                className="animated-button hero-cv-btn"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                </svg>
                <span className="text">DOWNLOAD CV</span>
                <span className="circle"></span>
                <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
