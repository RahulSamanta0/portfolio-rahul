"use client";

interface EducationItem {
  id: string;
  year: string;
  degree: string;
  institution: string;
  university: string;
  location: string;
  gradeBadge: string;
  glowColor: string;
  icon: string;
  courses: string[];
}

const educationDetails: EducationItem[] = [
  {
    id: "mca",
    year: "2023 – 2025",
    degree: "Master of Computer Application (MCA)",
    institution: "Meghnad Saha Institute of Technology (MSIT)",
    university: "MAKAUT University, Kolkata",
    location: "Kolkata, WB, India",
    gradeBadge: "Masters",
    glowColor: "rgba(244, 114, 182, 0.4)", // Pink glow
    icon: "ri-graduation-cap-line",
    courses: [
      "Advanced Database Systems & DBA",
      "Artificial Intelligence & Machine Learning",
      "Object-Oriented Programming (Java/C++)",
      "Software Design & Algorithms"
    ],
  },
  {
    id: "bca",
    year: "2020 – 2023",
    degree: "Bachelor of Computer Application (BCA)",
    institution: "Panskura Banamali College",
    university: "Vidyasagar University",
    location: "Medinipur, WB, India",
    gradeBadge: "Graduated",
    glowColor: "rgba(168, 85, 247, 0.4)", // Purple glow
    icon: "ri-book-open-line",
    courses: [
      "Data Structures & Core Algorithms",
      "Database Management Systems (RDBMS)",
      "Web Technologies & Client Coding",
      "Structured Systems Analysis"
    ],
  },
  {
    id: "hs",
    year: "2018 – 2020",
    degree: "Higher Secondary (10+2 Science)",
    institution: "Sonakhali High School",
    university: "WBBSE / WBCHSE Board",
    location: "Sonakhali, WB, India",
    gradeBadge: "First Class",
    glowColor: "rgba(99, 102, 241, 0.4)", // Indigo glow
    icon: "ri-school-line",
    courses: [
      "Mathematics & Computer Science",
      "Physics & Chemical Equations",
      "Core Science Foundations",
      "Analytical Reasoning & Statistics"
    ],
  },
];

export default function Education() {
  return (
    <section className="education-section section container" id="curriculumvitae">
      {/* Section Header */}
      <div className="education-header">
        <h2 className="section__title education-title">
          Academic <span className="education-title-gradient">Pathways</span>
        </h2>
        <p className="education-subtitle">
          My academic foundation in computing, software paradigms, and core sciences.
        </p>
      </div>

      {/* Modern Card Grid */}
      <div className="education-grid">
        {educationDetails.map((edu) => (
          <div
            key={edu.id}
            className="education-card"
            style={
              {
                "--card-glow": edu.glowColor,
              } as React.CSSProperties
            }
          >
            {/* Top Bar with Icon & Status */}
            <div className="edu-card-top">
              <div className="edu-icon-wrap">
                <i className={edu.icon} aria-hidden="true"></i>
              </div>
              <span className="edu-status-badge">{edu.gradeBadge}</span>
            </div>

            {/* Date and Title */}
            <span className="edu-year">{edu.year}</span>
            <h3 className="edu-degree">{edu.degree}</h3>

            {/* Institutions */}
            <div className="edu-details">
              <p className="edu-inst">
                <i className="ri-building-line" aria-hidden="true"></i> {edu.institution}
              </p>
              <p className="edu-univ">
                <i className="ri-government-line" aria-hidden="true"></i> {edu.university}
              </p>
              <p className="edu-loc">
                <i className="ri-map-pin-line" aria-hidden="true"></i> {edu.location}
              </p>
            </div>

            {/* Key Focus Areas */}
            <div className="edu-courses">
              <h4 className="edu-courses-title">Core Disciplines</h4>
              <ul className="edu-courses-list">
                {edu.courses.map((course, idx) => (
                  <li key={idx} className="edu-course-item">
                    <span className="course-dot"></span>
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
