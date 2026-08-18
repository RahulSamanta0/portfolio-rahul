"use client";

interface CapabilityItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  deliverables: string[];
  technologies: string[];
  glowColor: string;
}

const capabilities: CapabilityItem[] = [
  {
    id: "ai-agents",
    title: "AI Agents & Intelligence",
    subtitle: "Cognitive Applications",
    icon: "ri-robot-line",
    description: "Developing custom autonomous AI agents, semantic retrieval pipelines (RAG), and integrated natural language processing models.",
    deliverables: [
      "Context-aware LLM agents (LangChain / Groq)",
      "Semantic vector search networks (ChromaDB / Vector stores)",
      "Personalized outreach engines & automated scrapers",
      "Predictive machine learning classifiers"
    ],
    technologies: ["Python", "LangChain", "Groq LLM", "ChromaDB", "YOLO"],
    glowColor: "rgba(244, 114, 182, 0.3)" // Pink glow
  },
  {
    id: "backend-systems",
    title: "Scalable Backend Systems",
    subtitle: "Robust Microservices",
    icon: "ri-cpu-line",
    description: "Building high-performance server architectures, structured REST/GraphQL APIs, and secure microservices capable of handling heavy concurrent loads.",
    deliverables: [
      "Modular microservices (Spring Boot / Node.js)",
      "High-speed data scraping & parsing microservices",
      "Secure authentication gates (JWT / OAuth)",
      "Real-time event streams & web sockets"
    ],
    technologies: ["Node.js", "Express", "Java", "Spring Boot", "REST APIs"],
    glowColor: "rgba(168, 85, 247, 0.3)" // Purple glow
  },
  {
    id: "db-architecture",
    title: "Database Administration (DBA)",
    subtitle: "Storage & Query Tuning",
    icon: "ri-database-2-line",
    description: "Architecting reliable database models, optimizing query execution plans, and managing advanced data replication configurations.",
    deliverables: [
      "Normalized relational schemas & NoSQL document stores",
      "Query indexing, caching & indexing optimization",
      "Secure backup, restore, and migration automation",
      "Transactional integrity & concurrency controls"
    ],
    technologies: ["MySQL", "PostgreSQL", "MongoDB", "SQL tuning"],
    glowColor: "rgba(59, 130, 246, 0.3)" // Blue glow
  },
  {
    id: "cloud-devops",
    title: "DevOps & Cloud Deployments",
    subtitle: "Automated Orchestration",
    icon: "ri-cloud-line",
    description: "Orchestrating containerized infrastructures, automating build/test deployment lifecycles, and managing secure hosting configurations.",
    deliverables: [
      "Isolated container deployments (Docker)",
      "Automated cluster deployments (Kubernetes)",
      "Continuous Integration pipelines (GitHub Actions)",
      "Linux terminal shell automation scripting"
    ],
    technologies: ["Docker", "Kubernetes", "Git", "GitHub Actions", "Linux"],
    glowColor: "rgba(34, 197, 94, 0.3)" // Green glow
  }
];

export default function Capabilities() {
  return (
    <section className="capabilities-section section container" id="capabilities">
      {/* Section Header */}
      <div className="capabilities-header">
        <h2 className="section__title capabilities-title">
          Product <span className="capabilities-title-gradient">Engineering</span>
        </h2>
        <p className="capabilities-subtitle">
          Core capabilities I bring to product development from architectural design to deployment.
        </p>
      </div>

      {/* Grid of Capabilities */}
      <div className="capabilities-grid">
        {capabilities.map((item) => (
          <div
            key={item.id}
            className="capabilities-card"
            style={{ "--card-glow": item.glowColor } as React.CSSProperties}
          >
            {/* Header Area */}
            <div className="cap-card-top">
              <div className="cap-icon-wrap">
                <i className={item.icon} aria-hidden="true"></i>
              </div>
              <div className="cap-card-title-block">
                <span className="cap-card-sub">{item.subtitle}</span>
                <h3 className="cap-card-title">{item.title}</h3>
              </div>
            </div>

            {/* Description */}
            <p className="cap-card-desc">{item.description}</p>

            {/* Deliverables Checklist */}
            <div className="cap-deliverables">
              <h4 className="cap-section-title">WHAT I DEVELOP</h4>
              <ul className="cap-deliverables-list">
                {item.deliverables.map((del, idx) => (
                  <li key={idx} className="cap-deliverable-item">
                    <i className="ri-checkbox-circle-line cap-check-icon" aria-hidden="true"></i>
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Stack Tags */}
            <div className="cap-tags">
              {item.technologies.map((tech) => (
                <span key={tech} className="cap-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
