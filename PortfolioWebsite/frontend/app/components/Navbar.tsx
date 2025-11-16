'use client';

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [darkText, setDarkText] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const projectsSection = document.getElementById("projects");
      if (!projectsSection) return;

      const projectsTop = projectsSection.offsetTop;
      const scrollY = window.scrollY;

      // Add some offset so color changes slightly before section
      const offset = 50;

      if (scrollY + offset >= projectsTop) {
        setDarkText(true);
      } else {
        setDarkText(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // call once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menu = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300
        ${darkText ? "bg-white/90 text-black shadow-md" : "bg-white/10 text-white backdrop-blur-xl border-b border-white/20"}
      `}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Name */}
        <a
          href="#home"
          className={`font-semibold text-xl transition-colors duration-300 ${darkText ? "text-black" : "text-white"}`}
        >
          Mahmoud Agag
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          {menu.map((item) => (
            <li key={item.name} className="relative">
              <a
                href={item.href}
                className={`
                  relative transition-colors duration-300
                  ${darkText ? "text-black hover:text-rose-600" : "text-white hover:text-rose-300"}
                  after:content-[''] after:absolute after:left-0 after:bottom-0
                  after:h-[2px] after:w-0 after:bg-rose-500 after:transition-all after:duration-300
                  hover:after:w-full
                `}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className={`md:hidden transition-colors duration-300 ${darkText ? "text-black" : "text-white"}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div
          className={`md:hidden flex flex-col py-4 px-6 shadow-lg transition-colors duration-300
            ${darkText ? "bg-white/90 text-black" : "bg-white/20 backdrop-blur-lg text-white"}
          `}
        >
          {menu.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`py-2 text-lg transition-colors duration-200
                ${darkText ? "hover:text-rose-600" : "hover:text-rose-300"}
              `}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
