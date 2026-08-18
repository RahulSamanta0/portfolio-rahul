const interests = [
  { emoji: "🤖", animClass: "bounce", label: "AI & ML Developer" },
  { emoji: "🌐", animClass: "pulse", label: "IoT" },
  { emoji: "🖥️", animClass: "rotate", label: "Backend Engineer" },
  { emoji: "⚙️", animClass: "swing", label: "DevOps" },
  { emoji: "💻", animClass: "wiggle", label: "Full Stack Developer" },
];

export default function About() {
  return (
    <section className="about section container">
      <h2 className="section__title">Research Interest</h2>
      <ul className="about__details text-lg">
        {interests.map((item) => (
          <li key={item.label}>
            <span className={`emoji ${item.animClass}`}>{item.emoji}</span>
            {item.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
