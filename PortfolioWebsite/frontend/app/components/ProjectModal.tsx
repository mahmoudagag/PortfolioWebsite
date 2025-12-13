"use client";

import React, { useEffect } from "react";
import { FaTimes, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ProjectModalProps {
  title: string;
  images: string[];
  description: string;
  technologies: string[];
  githubLink?: string;
  liveLink?: string;
  onClose: () => void;
}

export default function ProjectModal({
  title,
  images,
  description,
  technologies,
  githubLink,
  liveLink,
  onClose,
}: ProjectModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
  };

  return (
    <div
      className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="relative z-[9500] bg-white rounded-lg max-w-3xl w-full overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside modal
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[9999] text-gray-600 hover:text-black text-3xl"
        >
          <FaTimes />
        </button>

        {/* Slider */}
        <div className="h-64 sm:h-80">
          <Slider {...sliderSettings}>
            {images.map((img, idx) => (
              <div key={idx}>
                <img
                  src={img.startsWith("/") ? img : `/${img}`}
                  alt={`${title} screenshot ${idx + 1}`}
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl text-black font-bold mb-4">{title}</h2>
          <p className="mb-4 text-gray-700">{description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-rose-100 text-rose-700 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition z-50"
              >
                <FaGithub className="mr-2" /> GitHub
              </a>
            )}
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 transition z-50"
              >
                <FaExternalLinkAlt className="mr-2" /> Live Site
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
