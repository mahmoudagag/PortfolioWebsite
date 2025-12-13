"use client";

import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-4xl text-black font-bold mb-6">Get in Touch</h2>
        <p className="mb-8 text-lg text-gray-700">
          I’m always open to discussing new projects, opportunities, or collaborations.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 text-xl">
          <a
            href="mailto:agagmahmoud@gmail.com"
            className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
          >
            <FaEnvelope /> Email
          </a>
          <a
            href="https://github.com/mahmoudagag"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
          >
            <FaGithub /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/mahmoud-agag/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-rose-700 text-white rounded-lg hover:bg-rose-800 transition"
          >
            <FaLinkedin /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
