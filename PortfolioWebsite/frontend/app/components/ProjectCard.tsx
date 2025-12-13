"use client";

import React, { useState } from "react";
import ProjectModal from "./ProjectModal";

interface ProjectCardProps {
  title: string;
  images: string[];
  description: string;
  technologies: string[];
  githubLink?: string;
  liveLink?: string;
}

export default function ProjectCard({
  title,
  images,
  description,
  technologies,
  githubLink,
  liveLink,
}: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Project Card */}
      <div
        onClick={() => setIsOpen(true)}
        className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300 cursor-pointer"
      >
        <img src={images[0]} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-xl text-black font-semibold">{title}</h3>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <ProjectModal
          title={title}
          images={images}
          description={description}
          technologies={technologies}
          githubLink={githubLink}
          liveLink={liveLink}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
