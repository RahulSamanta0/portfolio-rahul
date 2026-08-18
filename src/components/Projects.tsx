"use client";
import { useState } from "react";

interface BentoProject {
  id: string;
  badge: string;
  title: string;
  description: string;
  img?: string;
  tags: string[];
  githubUrl?: string;
  webUrl?: string;
  gridSpan: "large" | "medium";
}

const aiProjects: BentoProject[] = [
  {
    id: "cold-email",
    badge: "AI / LLM",
    title: "ColdReach AI – Cold Email Generator",
    description:
      "AI-powered cold email generator that scrapes job postings and crafts hyper-personalized outreach emails using LangChain and Groq LLM, with portfolio-matched skill context for maximum impact.",
    img: "/projects/cold-email.png",
    tags: ["Python", "LangChain", "Groq LLM", "ChromaDB"],
    githubUrl: "https://github.com/RahulSamanta0/cold-email-genarator-.git",
    gridSpan: "large",
  },
  {
    id: "plant-d",
    badge: "AI / ML",
    title: "Plant Disease Detection",
    description:
      "An intelligent system utilizing computer vision and deep learning to identify and diagnose diseases in crops from leaf images, providing actionable insights for farmers.",
    img: "/projects/Plant-d.png",
    tags: ["Python", "TensorFlow", "OpenCV"],
    githubUrl: "https://github.com/RahulSamanta0/plant-disease-detection.git",
    gridSpan: "medium",
  },
  {
    id: "plate-detect",
    badge: "AI / Vision",
    title: "Automatic Car Number Plate Detection",
    description:
      "Deep learning computer vision system for real-time vehicle license plate detection and character extraction using YOLO architecture.",
    img: "/projects/plat-dect.png",
    tags: ["Python", "YOLO", "OpenCV"],
    githubUrl: "https://github.com/RahulSamanta0/LicensePlate-Detction.git",
    gridSpan: "medium",
  },
  {
    id: "ardu-bot",
    badge: "Robotics & Vision",
    title: "Ardu-VisionAgro Robo Bot",
    description:
      "Integrated hardware-software solution combining Arduino robotics with computer vision for automated agricultural monitoring and intervention tasks.",
    img: "/projects/ardu-bot.jpg",
    tags: ["Python", "Arduino", "OpenCV"],
    githubUrl: "https://github.com/RahulSamanta0/Adruino-Argo-RoboBot.git",
    gridSpan: "large",
  },
];

const webProjects: BentoProject[] = [
  {
    id: "gez-shop",
    badge: "Full Stack",
    title: "gez-shop.com",
    description:
      "Modern web shopping platform featuring dynamic product showcase, cart state management, and a responsive user experience built on the MERN stack.",
    img: "/projects/gez-shop.png",
    tags: ["React", "Node.js", "MongoDB"],
    webUrl: "https://shopping-gez-frontend-vercel.vercel.app/",
    githubUrl: "https://github.com/RahulSamanta0/Shopping-ecom.git",
    gridSpan: "large",
  },
  {
    id: "eat-ezy",
    badge: "Full Stack",
    title: "Eat Ezy",
    description:
      "A robust food delivery platform built with the MERN stack, featuring real-time order tracking, secure payment gateways, and a scalable backend architecture.",
    img: "/projects/food.png",
    tags: ["MERN", "React", "Node.js"],
    webUrl: "https://rahulsamanta0.github.io/EatEzy/",
    githubUrl: "https://rahulsamanta0.github.io/EatEzy/",
    gridSpan: "medium",
  },
  {
    id: "snackscart",
    badge: "E-Commerce",
    title: "Snackscart.com",
    description:
      "Comprehensive e-commerce solution with inventory management, Stripe payment integration, and seamless checkout flows.",
    img: "/projects/snackscart.png",
    tags: ["MERN", "Stripe", "React"],
    webUrl: "https://resturent-frontend-versal.vercel.app/",
    githubUrl: "https://github.com/RahulSamanta0/footcart.git",
    gridSpan: "medium",
  },
];

function ProjectCard({ project }: { project: BentoProject }) {
  return (
    <div className={`bento-card bento-card--${project.gridSpan}`}>
      <div className="bento-card-content">
        <div className="bento-card-top">
          <span className="bento-badge">{project.badge}</span>
          <div className="bento-actions">
            {project.webUrl && (
              <a
                href={project.webUrl}
                target="_blank"
                rel="noreferrer"
                className="bento-icon-btn"
                title="Visit Website"
              >
                <i className="ri-external-link-line" aria-hidden="true"></i>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="bento-icon-btn"
                title="View Source Code"
              >
                <i className="ri-code-s-slash-line" aria-hidden="true"></i>
              </a>
            )}
          </div>
        </div>

        <h3 className="bento-card-title">{project.title}</h3>
        <p className="bento-card-desc">{project.description}</p>

        {project.img && (
          <div className="bento-img-wrapper">
            <img src={project.img} alt={project.title} className="bento-img" />
          </div>
        )}
      </div>

      <div className="bento-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="bento-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState<"ai" | "web">("ai");

  const projects = activeTab === "ai" ? aiProjects : webProjects;

  return (
    <section className="bento-projects section container" id="projects-section">
      {/* Section Header */}
      <div className="bento-header">
        <h2 className="section__title bento-title">
          Selected <span className="bento-title-gradient">Work</span>
        </h2>
        <p className="bento-subtitle">
          Showcasing impactful projects across AI/ML and Full Stack domains.
        </p>

        {/* Stack Switcher Tabs */}
        <div className="project-tab-switcher">
          <button
            id="tab-ai"
            className={`project-tab ${activeTab === "ai" ? "project-tab--active" : ""}`}
            onClick={() => setActiveTab("ai")}
          >
            <i className="ri-brain-line" aria-hidden="true"></i>
            AI / ML Stack
          </button>
          <button
            id="tab-web"
            className={`project-tab ${activeTab === "web" ? "project-tab--active" : ""}`}
            onClick={() => setActiveTab("web")}
          >
            <i className="ri-layout-grid-line" aria-hidden="true"></i>
            Web Stack
          </button>
        </div>
      </div>

      {/* Bento Grid Container */}
      <div className="bento-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
