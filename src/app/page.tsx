import Loader from "@/components/Loader";
import Header from "@/components/Header";
import Home from "@/components/Home";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Capabilities from "@/components/Capabilities";
import Projects from "@/components/Projects";
import Talks from "@/components/Talks";
import Contact from "@/components/Contact";
import DotBackground from "@/components/DotBackground";

export default function Page() {
  return (
    <>
      <DotBackground />
      <Loader />
      <Header />
      <main className="main">
        <Home />
        <TechStack />
        <Experience />
        <Education />
        <Capabilities />
        <Projects />
        <Talks />
        <Contact />
      </main>
    </>
  );
}

