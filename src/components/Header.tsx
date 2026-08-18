"use client";

import { useEffect, useState } from "react";

const navItems = [
  { href: "#home", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#curriculumvitae", label: "Education" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#projects-section", label: "Projects" },
  { href: "#talks", label: "Talks" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setMenuOpen(false);
  };

  return (
    <header
      className={`header${scrolled ? " scroll-header" : ""}`}
      id="header"
    >
      <nav className="nav container">
        {/* Brand Logo */}
        <a href="#home" className="nav__logo" onClick={() => handleNavClick("#home")}>
          RahulSamanta_
        </a>

        {/* Mobile Menu / Drawer */}
        <div
          className={`nav__menu${menuOpen ? " show-menu" : ""}`}
          id="nav-menu"
        >
          <div className="nav__menu-header">
            <span className="nav__menu-logo">MENU_</span>
          </div>

          <ul className="nav__list">
            {navItems.map((item, index) => (
              <li key={item.href} className="nav__item">
                <a
                  href={item.href}
                  className={`nav__link${activeLink === item.href ? " active-link" : ""}`}
                  onClick={() => handleNavClick(item.href)}
                >
                  <span className="nav__link-num">0{index + 1}.</span>
                  <span className="nav__link-text">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Social Links at the bottom of the drawer */}
          <div className="nav__menu-socials">
            <a href="https://github.com/RahulSamanta0" target="_blank" rel="noreferrer">
              <i className="ri-github-fill"></i>
            </a>
            <a href="https://www.linkedin.com/in/rahul-samanta-665910255/" target="_blank" rel="noreferrer">
              <i className="ri-linkedin-box-fill"></i>
            </a>
            <a href="mailto:rahulsamantaofficial00@gmail.com">
              <i className="ri-mail-fill"></i>
            </a>
          </div>
        </div>

        {/* Hamburger toggle */}
        <div
          className={`nav__toggle${menuOpen ? " toggle-active" : ""}`}
          id="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="toggle-line line-1"></span>
          <span className="toggle-line line-2"></span>
          <span className="toggle-line line-3"></span>
        </div>
      </nav>
    </header>
  );
}
