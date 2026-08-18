"use client";
import { useState } from "react";

interface TechItem {
  name: string;
  iconSrc: string;
  glowColor: string;
  level: string;
  desc: string;
}

interface TechCategory {
  id: string;
  title: string;
  icon: string;
  focusArea: string;
  experienceYear: string;
  description: string;
  stats: { label: string; value: string }[];
  items: TechItem[];
}

const techCategories: TechCategory[] = [
  {
    id: "ai",
    title: "AI / ML & GenAI",
    icon: "ri-brain-line",
    focusArea: "Generative AI, Computer Vision, RAG & LLM Orchestration",
    experienceYear: "2+ Years",
    description: "Developing intelligent agents, automated retrieval systems, and predictive models using deep learning pipelines.",
    stats: [
      { label: "Models Deployed", value: "8+" },
      { label: "Core Library", value: "PyTorch/LangChain" },
    ],
    items: [
      {
        name: "Python",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        glowColor: "rgba(55, 115, 165, 0.5)",
        level: "Expert",
        desc: "Core scripting & pipelines",
      },
      {
        name: "TensorFlow",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
        glowColor: "rgba(255, 110, 0, 0.4)",
        level: "Advanced",
        desc: "Neural network training",
      },
      {
        name: "PyTorch",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
        glowColor: "rgba(238, 76, 44, 0.5)",
        level: "Advanced",
        desc: "Deep learning & tensor ops",
      },
      {
        name: "OpenCV",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
        glowColor: "rgba(0, 255, 0, 0.35)",
        level: "Advanced",
        desc: "Real-time computer vision",
      },
      {
        name: "LangChain",
        iconSrc: "https://raw.githubusercontent.com/devicons/devicon/master/icons/langchain/langchain-original.svg",
        glowColor: "rgba(25, 165, 120, 0.5)",
        level: "Advanced",
        desc: "LLM agents & chain prompt tools",
      },
      {
        name: "Anaconda",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/anaconda/anaconda-original.svg",
        glowColor: "rgba(67, 176, 42, 0.4)",
        level: "Advanced",
        desc: "Environment isolation & packages",
      },
      {
        name: "Jupyter",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
        glowColor: "rgba(243, 118, 38, 0.5)",
        level: "Expert",
        desc: "Interactive exploration",
      },
    ],
  },
  {
    id: "backend",
    title: "Backend Engineering",
    icon: "ri-server-line",
    focusArea: "Robust Microservices, Database Optimization & Secure REST/GraphQL APIs",
    experienceYear: "3+ Years",
    description: "Designing high-throughput server application architectures, relational schemas, and real-time database endpoints.",
    stats: [
      { label: "API Uptime Goal", value: "99.9%" },
      { label: "Primary Stack", value: "Node/Java/SQL" },
    ],
    items: [
      {
        name: "Node.js",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        glowColor: "rgba(131, 205, 41, 0.5)",
        level: "Expert",
        desc: "Asynchronous runtime & APIs",
      },
      {
        name: "Express.js",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        glowColor: "rgba(255, 255, 255, 0.25)",
        level: "Expert",
        desc: "Lightweight REST servers",
      },
      {
        name: "Java",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        glowColor: "rgba(83, 130, 161, 0.5)",
        level: "Advanced",
        desc: "Enterprise system building",
      },
      {
        name: "Spring Boot",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
        glowColor: "rgba(109, 179, 63, 0.5)",
        level: "Advanced",
        desc: "Robust backend microservices",
      },
      {
        name: "MongoDB",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        glowColor: "rgba(79, 165, 78, 0.5)",
        level: "Advanced",
        desc: "Flexible NoSQL scaling",
      },
      {
        name: "MySQL",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        glowColor: "rgba(0, 117, 143, 0.5)",
        level: "Expert",
        desc: "Structured query optimizations",
      },
      {
        name: "PostgreSQL",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        glowColor: "rgba(51, 103, 145, 0.5)",
        level: "Advanced",
        desc: "Reliable relational management",
      },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    icon: "ri-settings-5-line",
    focusArea: "Container Orchestration, CI/CD Pipeline Automation & Infrastructure as Code",
    experienceYear: "2+ Years",
    description: "Automating cloud build/test phases, maintaining node clusters, and shipping isolated container services.",
    stats: [
      { label: "Build Success", value: "98%" },
      { label: "Deployment Time", value: "<5 min" },
    ],
    items: [
      {
        name: "Docker",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        glowColor: "rgba(36, 150, 237, 0.5)",
        level: "Expert",
        desc: "Container image isolation",
      },
      {
        name: "Kubernetes",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
        glowColor: "rgba(50, 108, 230, 0.5)",
        level: "Advanced",
        desc: "Cluster node orchestration",
      },
      {
        name: "Git",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        glowColor: "rgba(240, 80, 50, 0.5)",
        level: "Expert",
        desc: "Distributed version control",
      },
      {
        name: "GitHub Actions",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        glowColor: "rgba(255, 255, 255, 0.3)",
        level: "Advanced",
        desc: "Automated test-build pipelines",
      },
      {
        name: "Linux",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
        glowColor: "rgba(252, 190, 2, 0.4)",
        level: "Advanced",
        desc: "Terminal shell scripting",
      },
    ],
  },
  {
    id: "languages",
    title: "Languages & Client Stack",
    icon: "ri-code-box-line",
    focusArea: "Type-Safe Client Interfaces, Fast Compiles & Performance Optimization",
    experienceYear: "4+ Years",
    description: "Writing highly responsive interfaces and algorithmic logic systems using clean code standards.",
    stats: [
      { label: "Core Languages", value: "C/C++/TS" },
      { label: "FPS Score", value: "60+" },
    ],
    items: [
      {
        name: "C++",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        glowColor: "rgba(0, 89, 156, 0.5)",
        level: "Expert",
        desc: "Memory management & DSA",
      },
      {
        name: "C",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
        glowColor: "rgba(104, 159, 199, 0.5)",
        level: "Expert",
        desc: "Low-level system programs",
      },
      {
        name: "React",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        glowColor: "rgba(97, 218, 251, 0.5)",
        level: "Expert",
        desc: "Component lifecycle & state",
      },
      {
        name: "TypeScript",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        glowColor: "rgba(49, 120, 198, 0.5)",
        level: "Advanced",
        desc: "Strict type static checking",
      },
      {
        name: "JavaScript",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        glowColor: "rgba(247, 223, 30, 0.5)",
        level: "Expert",
        desc: "Dynamic web functionality",
      },
      {
        name: "HTML5 & CSS3",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        glowColor: "rgba(227, 79, 38, 0.5)",
        level: "Expert",
        desc: "Semantic responsive markup",
      },
      {
        name: "VS Code",
        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        glowColor: "rgba(0, 122, 204, 0.5)",
        level: "Expert",
        desc: "Integrated environment optimization",
      },
    ],
  },
];

export default function TechStack() {
  const [activeTab, setActiveTab] = useState<string>("ai");
  const [hoveredItem, setHoveredItem] = useState<TechItem | null>(null);

  const currentCategory =
    techCategories.find((cat) => cat.id === activeTab) || techCategories[0];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg";
  };

  return (
    <section className="tech-stack-section section container" id="tech-stack">
      
      {/* 1. TOP SUBSECTION: Redesigned Services Flow Cards (Uiverse Floating Badge layout) */}
      <div className="services-flow-wrapper">
        <div className="services-header">
          <h2 className="section__title services-title">Services</h2>
        </div>

        <div className="services-cards-container">
          
          {/* 1. Front-end Card */}
          <div className="service-flow-card service-flow-card--frontend">
            <span className="service-top-badge service-top-badge--frontend">
              <i className="ri-code-s-slash-line" aria-hidden="true"></i>
            </span>
            <h5 className="service-card-tag">CLIENT SYSTEMS</h5>
            <h3 className="service-card-heading">front-end development</h3>
            <p className="service-card-desc">
              Designing user-focused interfaces using HTML, CSS, JavaScript, and Bootstrap/React frameworks. I construct responsive web applications with smooth UX structures, fast loading configurations, and fluid layouts.
            </p>
            <div className="service-card-footer">
              <button 
                onClick={() => {
                  setActiveTab("languages");
                  document.getElementById("tech-stack")?.scrollIntoView({ behavior: "smooth" });
                }} 
                className="service-footer-link"
              >
                More Options
              </button>
              <a href="#contact" className="service-footer-btn">
                Contact Us
              </a>
            </div>
          </div>

          {/* Flow Play Indicator */}
          <div className="services-flow-indicator">
            <i className="ri-play-fill" aria-hidden="true"></i>
          </div>

          {/* 2. Back-end Card */}
          <div className="service-flow-card service-flow-card--backend">
            <span className="service-top-badge service-top-badge--backend">
              <i className="ri-magic-line" aria-hidden="true"></i>
            </span>
            <h5 className="service-card-tag">SERVER SYSTEMS</h5>
            <h3 className="service-card-heading">Back-end Development</h3>
            <p className="service-card-desc">
              Developing robust web logic using PHP, SQL, Laravel, Node.js, and Java Spring Boot. I specialize in designing scalable backend APIs, database management systems, security implementations, and deployments.
            </p>
            <div className="service-card-footer">
              <button 
                onClick={() => {
                  setActiveTab("backend");
                  document.getElementById("tech-stack")?.scrollIntoView({ behavior: "smooth" });
                }} 
                className="service-footer-link"
              >
                More Options
              </button>
              <a href="#contact" className="service-footer-btn">
                Contact Us
              </a>
            </div>
          </div>

          {/* Flow Play Indicator */}
          <div className="services-flow-indicator">
            <i className="ri-play-fill" aria-hidden="true"></i>
          </div>

          {/* 3. Database Administration Card */}
          <div className="service-flow-card service-flow-card--dba">
            <span className="service-top-badge service-top-badge--dba">
              <i className="ri-database-2-line" aria-hidden="true"></i>
            </span>
            <h5 className="service-card-tag">DATA ARCHITECTURE</h5>
            <h3 className="service-card-heading">database admin (DBA)</h3>
            <p className="service-card-desc">
              Architecting normalized relational and NoSQL database schemas. I specialize in query profiling, indexing configurations, replication setup, backup automation, and high-performance server tuning.
            </p>
            <div className="service-card-footer">
              <button 
                onClick={() => {
                  setActiveTab("backend");
                  document.getElementById("tech-stack")?.scrollIntoView({ behavior: "smooth" });
                }} 
                className="service-footer-link"
              >
                More Options
              </button>
              <a href="#contact" className="service-footer-btn">
                Contact Us
              </a>
            </div>
          </div>

          {/* Flow Play Indicator */}
          <div className="services-flow-indicator">
            <i className="ri-play-fill" aria-hidden="true"></i>
          </div>

          {/* 4. AI & GenAI Agents Card */}
          <div className="service-flow-card service-flow-card--ai">
            <span className="service-top-badge service-top-badge--ai">
              <i className="ri-robot-line" aria-hidden="true"></i>
            </span>
            <h5 className="service-card-tag">INTELLIGENT AGENTS</h5>
            <h3 className="service-card-heading">AI & GenAI Systems</h3>
            <p className="service-card-desc">
              Building intelligent autonomous agents, prompt engines, and RAG document search systems. I integrate LLMs (OpenAI, Groq), LangChain pipelines, vector search (ChromaDB), and data crawlers.
            </p>
            <div className="service-card-footer">
              <button 
                onClick={() => {
                  setActiveTab("ai");
                  document.getElementById("tech-stack")?.scrollIntoView({ behavior: "smooth" });
                }} 
                className="service-footer-link"
              >
                More Options
              </button>
              <a href="#contact" className="service-footer-btn">
                Contact Us
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 2. BOTTOM SUBSECTION: My Skills Interactive Dashboard */}
      <div className="tech-header">
        <h2 className="section__title tech-title">
          My <span className="tech-title-gradient">Skills</span>
        </h2>
        <p className="tech-subtitle">
          Hover cards to query tool intelligence. Interactive stack breakdown below.
        </p>
      </div>

      {/* Cyberpunk Split Console Dashboard */}
      <div className="tech-dashboard">
        
        {/* Left Column: Stack Radar & Analytics Console */}
        <div className="tech-console">
          <div className="tech-console-header">
            <span className="console-neon-dot"></span>
            <span className="console-title-text">SYSTEM STATUS // STACK INFO</span>
          </div>

          <div className="tech-console-body">
            <h3 className="console-category-title">
              <i className={currentCategory.icon} aria-hidden="true"></i> {currentCategory.title}
            </h3>
            <p className="console-focus-badge">{currentCategory.focusArea}</p>
            <p className="console-desc-text">{currentCategory.description}</p>

            <div className="console-stats-grid">
              {currentCategory.stats.map((stat, i) => (
                <div key={i} className="console-stat-box">
                  <span className="console-stat-val">{stat.value}</span>
                  <span className="console-stat-lbl">{stat.label}</span>
                </div>
              ))}
              <div className="console-stat-box">
                <span className="console-stat-val text-pink">{currentCategory.experienceYear}</span>
                <span className="console-stat-lbl">Deployment Exp</span>
              </div>
            </div>

            <div className="console-tool-preview">
              {hoveredItem ? (
                <div className="tool-preview-active">
                  <div className="tool-preview-top">
                    <img
                      src={hoveredItem.iconSrc}
                      alt={hoveredItem.name}
                      onError={hoveredItem.name === "LangChain" ? handleImageError : undefined}
                      className="tool-preview-img"
                    />
                    <div>
                      <h4 className="tool-preview-name">{hoveredItem.name}</h4>
                      <span className="tool-preview-level">{hoveredItem.level} Level</span>
                    </div>
                  </div>
                  <p className="tool-preview-desc">// {hoveredItem.desc}</p>
                </div>
              ) : (
                <div className="tool-preview-placeholder">
                  <i className="ri-radar-line animate-radar" aria-hidden="true"></i>
                  <p>Hover a skill card to decode execution metrics.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Node Grid with Interactive Tabs */}
        <div className="tech-grid-panel">
          <div className="tech-dashboard-tabs">
            {techCategories.map((category) => (
              <button
                key={category.id}
                className={`dashboard-tab-btn ${activeTab === category.id ? "dashboard-tab-btn--active" : ""}`}
                onClick={() => {
                  setActiveTab(category.id);
                  setHoveredItem(null);
                }}
              >
                <i className={category.icon} aria-hidden="true"></i>
                <span className="tab-btn-text">{category.title.split(" ")[0]}</span>
              </button>
            ))}
          </div>

          <div className="tech-dashboard-grid">
            {currentCategory.items.map((tech) => (
              <div
                className="tech-dashboard-card"
                key={tech.name}
                onMouseEnter={() => setHoveredItem(tech)}
                onMouseLeave={() => setHoveredItem(null)}
                style={
                  {
                    "--glow-rgb": tech.glowColor,
                  } as React.CSSProperties
                }
              >
                <div className="card-scanner-line"></div>
                <div className="tech-card-glow-bg"></div>
                
                <div className="tech-card-body">
                  <div className="tech-card-icon-wrap">
                    <img
                      src={tech.iconSrc}
                      alt={tech.name}
                      onError={tech.name === "LangChain" ? handleImageError : undefined}
                      className="tech-card-icon-img"
                    />
                  </div>
                  <h4 className="tech-card-item-title">{tech.name}</h4>
                  <span className="tech-card-item-badge">{tech.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
