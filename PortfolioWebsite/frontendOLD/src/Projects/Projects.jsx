import { projects } from "./projects.js"
import Project from "./Project.jsx"
import { useEffect } from "react"
import "../Styles/Projects.css"

export default function Projects({ isElementInViewport }){

  useEffect( () => {
    const projectsTitle = document.getElementById('ProjectsTitle')

    function loop(){
      if(isElementInViewport(projectsTitle)){
        projectsTitle.classList.replace("opac","projectsTitle")
      }
      if (projectsTitle.classList.contains("opac")){
        window.setTimeout(loop,1000/60)
      }
    }
    loop()
  }, [])

  return (
      <section id="Projects" className="Projects">

      <div id="ProjectsTitle" className="opac">
        <div id="projectsTitleName" className="projectsTitleName">Projects</div>
        <div id="underlineTitle" className="underlineTitle"></div>
      </div>
      
      <div className="projects">
        {projects.map((p,i) => {
          return (
            <Project project = {p} isElementInViewport = {isElementInViewport} key = {i} />
          )}
        )}
      </div>
    </section>
  )
}