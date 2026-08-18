"use client";

import { useState } from "react";

interface EventTalk {
  id: string;
  year: string;
  category: string;
  title: string;
  description: string;
  location: string;
  quoteSvg: string;
  images: { src: string; alt: string }[];
}

const talksData: EventTalk[] = [
  {
    id: "hackathon-2024",
    year: "2024",
    category: "HACKATHON & INNOVATION",
    title: "Innovation 2.0 & All India Hackathon",
    description:
      "Collaborated with an agile engineering team to architect and build innovative real-time AI and IoT solutions under high-pressure competitive constraints.",
    location: "Meghnad Saha Institute of Technology",
    quoteSvg:
      "M302.258 176.221C320.678 176.221 329.889 185.432 329.889 203.853V278.764C329.889 297.185 320.678 306.395 302.258 306.395H231.031C212.61 306.395 203.399 297.185 203.399 278.764V203.853C203.399 160.871 207.902 123.415 216.908 91.4858C226.323 59.1472 244.539 30.902 271.556 6.75027C280.562 -1.02739 288.135 -2.05076 294.275 3.68014L321.906 29.4692C328.047 35.2001 326.614 42.1591 317.608 50.3461C303.69 62.6266 292.228 80.4334 283.223 103.766C274.626 126.69 270.328 150.842 270.328 176.221H302.258ZM99.629 176.221C118.05 176.221 127.26 185.432 127.26 203.853V278.764C127.26 297.185 118.05 306.395 99.629 306.395H28.402C9.98126 306.395 0.770874 297.185 0.770874 278.764V203.853C0.770874 160.871 5.27373 123.415 14.2794 91.4858C23.6945 59.1472 41.9106 30.902 68.9277 6.75027C77.9335 -1.02739 85.5064 -2.05076 91.6467 3.68014L119.278 29.4692C125.418 35.2001 123.985 42.1591 114.98 50.3461C101.062 62.6266 89.6 80.4334 80.5942 103.766C71.9979 126.69 67.6997 150.842 67.6997 176.221H99.629Z",
    images: [
      { src: "/talks/inno1.jpg", alt: "Hackathon Photo 1" },
      { src: "/talks/inno2.jpg", alt: "Hackathon Photo 2" },
      { src: "/talks/inno3.jpg", alt: "Hackathon Photo 3" },
      { src: "/talks/inno4.jpg", alt: "Hackathon Photo 4" },
    ],
  },
  {
    id: "devfest-2023",
    year: "2023",
    category: "CONFERENCE & COMMUNITY",
    title: "Google DevFest Kolkata",
    description:
      "Attended leading sessions on Web Technologies, AI/ML models, Firebase architecture, and connected with developer community leaders across industry.",
    location: "Dhono Dhanyo Auditorium",
    quoteSvg:
      "M302.258 176.221C320.678 176.221 329.889 185.432 329.889 203.853V278.764C329.889 297.185 320.678 306.395 302.258 306.395H231.031C212.61 306.395 203.399 297.185 203.399 278.764V203.853C203.399 160.871 207.902 123.415 216.908 91.4858C226.323 59.1472 244.539 30.902 271.556 6.75027C280.562 -1.02739 288.135 -2.05076 294.275 3.68014L321.906 29.4692C328.047 35.2001 326.614 42.1591 317.608 50.3461C303.69 62.6266 292.228 80.4334 283.223 103.766C274.626 126.69 270.328 150.842 270.328 176.221H302.258ZM99.629 176.221C118.05 176.221 127.26 185.432 127.26 203.853V278.764C127.26 297.185 118.05 306.395 99.629 306.395H28.402C9.98126 306.395 0.770874 297.185 0.770874 278.764V203.853C0.770874 160.871 5.27373 123.415 14.2794 91.4858C23.6945 59.1472 41.9106 30.902 68.9277 6.75027C77.9335 -1.02739 85.5064 -2.05076 91.6467 3.68014L119.278 29.4692C125.418 35.2001 123.985 42.1591 114.98 50.3461C101.062 62.6266 89.6 80.4334 80.5942 103.766C71.9979 126.69 67.6997 150.842 67.6997 176.221H99.629Z",
    images: [
      { src: "/talks/dev1.jpg", alt: "DevFest Photo 1" },
      { src: "/talks/dev2.jpg", alt: "DevFest Photo 2" },
      { src: "/talks/dev3.jpg", alt: "DevFest Photo 3" },
      { src: "/talks/dev4.jpg", alt: "DevFest Photo 4" },
    ],
  },
];

function StackedPhotoDeck({
  images,
  onImageClick,
}: {
  images: { src: string; alt: string }[];
  onImageClick: (src: string) => void;
}) {
  const [topIndex, setTopIndex] = useState(0);

  const cycleNext = () => {
    setTopIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="photo-deck-container" onClick={cycleNext}>
      <div className="photo-deck-stack">
        {images.map((img, idx) => {
          // Calculate relative stack offset
          const stackPos = (idx - topIndex + images.length) % images.length;
          const isTop = stackPos === 0;

          return (
            <div
              key={img.src}
              className={`photo-deck-card ${isTop ? "is-top" : ""}`}
              style={
                {
                  "--stack-pos": stackPos,
                  zIndex: images.length - stackPos,
                } as React.CSSProperties
              }
              onClick={(e) => {
                if (isTop) {
                  e.stopPropagation();
                  onImageClick(img.src);
                }
              }}
            >
              <img src={img.src} alt={img.alt} />
              {isTop && (
                <div className="photo-deck-hint">
                  <span>Click to view • Tap to shuffle ({topIndex + 1}/{images.length})</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Talks() {
  const [modalImg, setModalImg] = useState<string | null>(null);

  return (
    <section className="talks section container" id="talks">
      {/* Header */}
      <div className="talks-header">
        <h2 className="section__title talks-title">
          Talks &amp; <span className="talks-title-gradient">Events</span>
        </h2>
        <p className="talks-subtitle">
          Keynotes, developer conferences, and competitive hackathons.
        </p>
      </div>

      {/* Grid of Split 3D Deck Quote Cards */}
      <div className="talks-split-grid">
        {talksData.map((talk) => (
          <div key={talk.id} className="split-talk-card">
            {/* Left Info Column */}
            <div className="split-talk-info">
              <div className="talk-card-name">
                <span className="talk-year-tag">{talk.year}</span> • {talk.category}
              </div>

              {/* Background Quote SVG Icon */}
              <div className="talk-quote-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 330 307"
                  height="60"
                  width="60"
                >
                  <path fill="currentColor" d={talk.quoteSvg}></path>
                </svg>
              </div>

              <h3 className="talk-card-title">{talk.title}</h3>
              <p className="talk-body-text">{talk.description}</p>

              <div className="talk-author-footer">
                <div className="talk-location">
                  <span className="talk-pin">📍</span> {talk.location}
                </div>
                <svg
                  className="talk-heart-icon"
                  height="18"
                  width="18"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0H24V24H0z" fill="none"></path>
                  <path
                    fill="#f472b6"
                    d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"
                  ></path>
                </svg>
              </div>
            </div>

            {/* Right Interactive 3D Photo Deck Column */}
            <div className="split-talk-gallery">
              <StackedPhotoDeck
                images={talk.images}
                onImageClick={(src) => setModalImg(src)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {modalImg && (
        <div className="talk-modal-backdrop" onClick={() => setModalImg(null)}>
          <div className="talk-modal-content">
            <button
              className="talk-modal-close"
              onClick={() => setModalImg(null)}
            >
              <i className="ri-close-line"></i>
            </button>
            <img src={modalImg} alt="Event Preview Full" />
          </div>
        </div>
      )}
    </section>
  );
}
