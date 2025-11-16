"use client";

import React from "react";
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiDotnet, SiTypescript } from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">About Me</h2>
        
        <p className="mb-4 text-lg sm:text-xl text-gray-700">
          I’m a software engineer passionate about building efficient, scalable, and maintainable applications.
          I enjoy solving challenging problems, learning new technologies, and creating software that has a real impact.
        </p>
        
        <p className="mb-6 text-lg sm:text-xl text-gray-700">
          I thrive on collaboration, continuous improvement, and experimenting across different domains—from backend systems and databases to frontend experiences.
        </p>

        {/* Tech icons */}
        <div className="flex justify-center flex-wrap gap-6 text-4xl text-rose-600">
          <FaReact title="React" className="hover:scale-110 transition-transform duration-300" />
          <FaNodeJs title="Node.js" className="hover:scale-110 transition-transform duration-300" />
          <FaPython title="Python" className="hover:scale-110 transition-transform duration-300" />
          <DiMsqlServer title="SQL / Databases" className="hover:scale-110 transition-transform duration-300" />
          <SiDotnet title="C#" className="hover:scale-110 transition-transform duration-300" />
          <SiTypescript title="TypeScript" className="hover:scale-110 transition-transform duration-300" />
        </div>
      </div>
    </section>
  );
}