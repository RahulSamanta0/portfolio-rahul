"use client";

interface ExperienceItem {
  id: string;
  date: string;
  role: string;
  company: string;
  side: "left" | "right";
  nodeColor: string;
  bullets: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: "1",
    date: "Dec 2025 - Present",
    role: "Software Developer, DBA & Technical Trainer",
    company: "Swami Vivekananda University",
    side: "left",
    nodeColor: "#ff758c",
    bullets: [
      "Managing database administration, migration pipelines, and server schema optimization.",
      "Developing robust APIs and core logic modules as a Backend Developer.",
      "Handling cloud deployments, system monitoring, and DevOps orchestration.",
      "Training students in engineering fundamentals, database designs, and full-stack programming."
    ],
  },
  {
    id: "2",
    date: "Jul 2025 - Dec 2025",
    role: "Backend & Database Developer",
    company: "NexIntel Synergy Pvt. Ltd.",
    side: "right",
    nodeColor: "#a855f7",
    bullets: [
      "Engineered backend application architectures and structured database designs.",
      "Focused exclusively on database integration, API endpoints, and microservice efficiency."
    ],
  },
  {
    id: "3",
    date: "Jul 2024 - Jul 2025",
    role: "Frontend Developer Intern",
    company: "Encryptix",
    side: "left",
    nodeColor: "#6366f1",
    bullets: [
      "Built responsive, interactive, and semantic user interfaces as a Frontend Developer.",
      "Collaborated on designing fluid client-side animations and state management setups."
    ],
  },
];

export default function Experience() {
  return (
    <section className="experience section container" id="experience">
      <div className="experience__header">
        <h2 className="section__title experience__title">
          Professional <span className="experience__title-gradient">Experience</span>
        </h2>
        <p className="experience__subtitle">
          My journey building and teaching technology.
        </p>
      </div>

      <div className="timeline__container">
        {/* Glowing vertical center line */}
        <div className="timeline__line"></div>

        <div className="timeline__items">
          {experiences.map((item) => (
            <div
              key={item.id}
              className={`timeline__item timeline__item--${item.side}`}
            >
              {/* Timeline Center Node Dot */}
              <div
                className="timeline__node"
                style={
                  {
                    "--node-color": item.nodeColor,
                    borderColor: item.nodeColor,
                    boxShadow: `0 0 12px ${item.nodeColor}`,
                  } as React.CSSProperties
                }
              >
                <div
                  className="timeline__node-inner"
                  style={{ backgroundColor: item.nodeColor }}
                ></div>
              </div>

              {/* Card Box */}
              <div className="timeline__card">
                {/* Minecraft Torch Easter Egg in the Top Right Corner */}
                <div className="card-torch-container">
                  <label className="minecraft-torch-label">
                    <input defaultChecked={true} type="checkbox" className="torch-checkbox" />
                    <div className="minecraft-torch">
                      <div className="torch-head">
                        <div className="torch-face torch-top">
                          <div></div><div></div><div></div><div></div>
                        </div>
                        <div className="torch-face torch-left">
                          <div></div><div></div><div></div><div></div>
                        </div>
                        <div className="torch-face torch-right">
                          <div></div><div></div><div></div><div></div>
                        </div>
                      </div>
                      <div className="torch-stick">
                        <div className="torch-side torch-side-left">
                          <div></div><div></div><div></div><div></div>
                          <div></div><div></div><div></div><div></div>
                          <div></div><div></div><div></div><div></div>
                          <div></div><div></div><div></div><div></div>
                        </div>
                        <div className="torch-side torch-side-right">
                          <div></div><div></div><div></div><div></div>
                          <div></div><div></div><div></div><div></div>
                          <div></div><div></div><div></div><div></div>
                          <div></div><div></div><div></div><div></div>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>

                <span className="timeline__date-badge">{item.date}</span>
                <h3 className="timeline__role">{item.role}</h3>
                <p className="timeline__company">
                  <span className="timeline__building-icon">🏢</span>{" "}
                  {item.company}
                </p>
                <ul className="timeline__bullets">
                  {item.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
