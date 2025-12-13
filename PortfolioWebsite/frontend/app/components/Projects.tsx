"use client";

import React from "react";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl text-black font-bold text-center mb-12">My Projects</h2>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.map((project, idx) => (
            <ProjectCard key={idx} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

const projectData = [
  {
    title: "Stock Simulator Web App",
    images: ["/Stock0.png", "Stock1.png", "Stock2.png", "Stock3.png", "Stock4.png", "Stock5.png", "Stock6.png", "Stock7.png", "Stock8.png"],
    description:
      "A web app that allows users to simulate buying and selling stocks. Users register and log into their accounts. They can search stocks up and get live stock prices with graphs of the stock at different time intervals. Users can monitor they history and they networth over time.",
    technologies: ["React", "Golang", "Mongodb", "tailwind"],
    githubLink: "https://github.com/mahmoudagag/StockSimulator",
    liveLink: `${process.env.REACT_APP_BACKEND_URL || "http://localhost"}/stockpapertrading/`,
  },
  {
    title: "Multiplayer Word Game",
    images: ["/Wordgame0.png", "/Wordgame1.png", "/Wordgame2.png", "/Wordgame3.png", "/Wordgame4.png", "/Wordgame5.png"],
    description:
      "An interactive web-based game designed for playing with friends. Players are challenged with creating words using two given letters. This app leverages websockets to establish groups and event listeners.",
    technologies: ["React", "Node.js", "Express", "Socket.IO"],
    githubLink: "https://github.com/mahmoudagag/WhatsTheWordApp",
    liveLink: `${process.env.REACT_APP_BACKEND_URL || "http://localhost"}/whatstheword/`
  },
  {
    title: "Visulaized Searching Algorithms",
    images: ["/Searching0.png", "/Searching1.png", "Searching2.png", "Searching3.png"],
    description:
      "This software allows users to visualize different searching algorithms. Users can choose one of the five algorithms. Then place the start and end point anywhere on the graph. Add blocks to increase complexity or pick from one of the premade mazes. Finally click visualize to watch the magic happen.",
    technologies: ["JavaScript", "HTML", "CSS"],
    githubLink:"https://github.com/mahmoudagag/Visualize-Search-Algorithms",
    liveLink: `${process.env.REACT_APP_BACKEND_URL || "http://localhost"}/VisualizeSearchingAlogrithms/`
  },
  {
    title: "Mealsy",
    images: ["/Mealsy0.png", "/Mealsy1.png", "/Mealsy2.png", "/Mealsy3.png","/Mealsy4.png","/Mealsy5.png","/Mealsy6.png"],
    technologies: ["React", "node", "Mongodb"],
    description:
      "Introducing a versatile web application designed for meal planning. Easily schedule meals on a calendar, complete with ingredients and recipes. Stay organized with automatic tracking of weekly ingredient needs. Need culinary inspiration? Our app integrates seamlessly with third-party APIs to suggest recipes based on your preferences. Plus, the APIs to provide nutritional insights, helping you monitor your macros effortlessly",
    githubLink: "https://github.com/mahmoudagag/Measly",
    liveLink: `${process.env.REACT_APP_BACKEND_URL || "http://localhost"}/mealsy/`
  },
  {
    title: "Visulaized Sorting Algorithm",
    technologies: ["JavaScript", "HTML", "CSS"],
    description:
      "This software allows users to visualize different sorting algorithms.Users can choose one of the six algorithms. Users are also able to chane the size of the array and the speed of the visualization. A control panel is also given to allow users better notice the subtle changes in the list.",
    githubLink: "https://github.com/mahmoudagag/Visual-Sorting-Algorithms",
    images: ["/Sorting0.png", "Sorting1.png", "Sorting2.png", "Sorting3.png"],
    liveLink: `${process.env.REACT_APP_BACKEND_URL || "http://localhost"}/VisualizeSortingAlogrithms/`
  },
  {
    title: "Tic Tac Toe",
    technologies: ["Python", "pygame"],
    description:
      "This is a simple tic-tac-toe game using python and displayed using pygame. Users play against an AI which was implemented using a minimax algorithm. However it might take a while if you're trying to win because the AI is impossible to beat.",
    githubLink: "https://github.com/mahmoudagag/Tic-Tac-Toe-AI",
    images: ["/Tictactoe0.png", "Tictactoe1.png"],
  },
  {
    title:"Sudoku Solver",
    technologies: ["Python", "pygame"],
    description:
      "A sudoku game made with python and displayed utilizing pygame library. Users can either try to solve the game themselves or press the solve button to watch the puzzle solve itself. The algorithm uses a backtracking algorithm to solve the puzzle.",
    githubLink: "https://github.com/mahmoudagag/Sudoku-solver",
    images: ["/Sudoku0.png", "/Sudoku1.png", "Sudoku2.png"],
  }
];
