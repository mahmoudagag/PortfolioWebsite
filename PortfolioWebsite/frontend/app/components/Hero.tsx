"use client";

import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen flex flex-col justify-center items-center text-center px-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/homepage.jpg')", backgroundAttachment: "fixed"}} // <-- your background
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content on top */}
      <div className="relative z-10 text-white max-w-5xl flex flex-col items-center">
        <TypeAnimation
          sequence={["Hi, I’m Mahmoud", 2000, "I’m a Software Engineer", 2000]}
          wrapper="h1"
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg"
          repeat={Infinity}
        />
        <a
          href="#projects"
          className="mt-4 px-6 py-3 bg-rose-800 text-white rounded-lg hover:bg-rose-900 transition duration-300 shadow-lg"
        >
          View My Projects
        </a>
      </div>
    </section>
  );
}
