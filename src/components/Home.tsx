import CharacterSequence from "@/components/character/CharacterSequence";

export default function Home() {
  return (
    <section className="home" id="home">
      <div className="home__container container grid">
        <div className="home__data">
          <h1 className="home__name">Rahul Samanta_</h1>
          <p className="home__work">AI / ML & Full Stack Developer</p>

          <div className="home__socials">
            <a
              href="https://github.com/RahulSamanta0"
              target="_blank"
              rel="noreferrer"
              className="home__social-link"
            >
              <i className="ri-github-fill"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/rahul-samanta-665910255/"
              target="_blank"
              rel="noreferrer"
              className="home__social-link"
            >
              <i className="fa-brands fa-google-scholar" aria-hidden="true"></i>
            </a>
            <a
              href="mailto:rahulsamantaofficial00@gmail.com"
              className="home__social-link"
            >
              <i className="ri-mail-fill"></i>
            </a>
            <a
              href="/assets/img/RahulSamanta_n resume.pdf"
              className="animated-button"
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
        <CharacterSequence />
      </div>
    </section>
  );
}
