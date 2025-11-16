import { useEffect, useContext} from "react"
import GlobalContext from "../ContextWrapper.js"

export default function Project({project, isElementInViewport}){

    const {setprojectsIdentifier, setModal} = useContext(GlobalContext)
    
    useEffect(() => {
      const projectDisplay = document.getElementById(`individualProject${project.name}`)
      const button = document.getElementById(`openModal${project.name}`)
      setprojectsIdentifier(projectDisplay) 
      button.addEventListener('click',() => { setModal(project.modal)})
      
      function loop(){
        if(isElementInViewport(projectDisplay)){
            projectDisplay.classList.add('projectbackground')
            projectDisplay.classList.add('rotateOverlay')
            projectDisplay.nextElementSibling.classList.replace('opac','projectOverlay')
        }
        if (!projectDisplay.classList.contains("projectbackground")){
          window.setTimeout(loop,1000/60)
        }
      }
      loop()
    },[])

    return(
      <div className="individualProject">
          <div id={`individualProject${project.name}`} className={project.image}></div>
          <div className="opac projectOverlay--blur">
            <div className="individualProjectTitle">{project.name}</div>
            <div className="projectlanguages">{project.languages}</div>
            <div id={`openModal${project.name}`} className="projectBtn">Learn More</div>
          </div>
        </div>
      )
}