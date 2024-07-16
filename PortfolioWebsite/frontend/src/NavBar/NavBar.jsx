import { useContext, useEffect, useState } from "react"
import GlobalContext  from "../ContextWrapper"
import "../Styles/NavBar.css"

export default function NavBar({isElementInViewport}){
    const {homeIdentifier, aboutIdentifier, projectsIdentifier, contactIdentifier} = useContext(GlobalContext)
    const [home, setHome] = useState()
    const [about, setabout] = useState()
    const [projects, setProjects] = useState()
    const [contact, setContact] = useState()
    const [currentSection, setCurrentSection] = useState()
    const [previousSection, setPreviousSection] = useState()


    useEffect( () => {
        setHome(document.getElementById('navbarhome'))
        setabout(document.getElementById('navbarabout'))
        setProjects(document.getElementById('navbarprojects'))
        setContact(document.getElementById('navnarconnect'))
    },[])

    useEffect( ()=> {
        if(home !== undefined && about !== undefined && projects !== undefined && contact !== undefined 
            && homeIdentifier !== null && aboutIdentifier !== null && projectsIdentifier !== null && contactIdentifier !== null ){
                loop()
        }
    },[home, about, projects, contact, homeIdentifier, aboutIdentifier, projectsIdentifier, contactIdentifier])

    function loop(){

        if(currentSection !== home && isElementInViewport(homeIdentifier)){
            setCurrentSection(home)
        }
        else if(currentSection !== about &&  isElementInViewport(aboutIdentifier)){
            setCurrentSection(about)
        }        
        else if(currentSection !== projects && isElementInViewport(projectsIdentifier)){
            setCurrentSection(projects)
        }        
        else if(currentSection !== contact &&  isElementInViewport(contactIdentifier)){
            setCurrentSection(contact)
        }
        window.setTimeout(loop,1000/60)
    }

    useEffect( ()=> {
        if(previousSection !== currentSection){
            currentSection.classList.add('navBarOptionshighlighted')
            if (previousSection !== undefined){
                previousSection.classList.remove('navBarOptionshighlighted')
            }
            setPreviousSection(currentSection)
        }
    },[currentSection])

    return (
        <div className="navBar">
            <div className="navBarOptions">
                <a href="#Home"><div id="navbarhome" className="navBarLinks">HOME</div></a>
                <a href="#About"><div id="navbarabout" className="navBarLinks ">ABOUT</div></a>
                <a href="#Projects"><div id="navbarprojects" className="navBarLinks">PROJECTS</div></a>
                <a href="#Contact"><div id="navnarconnect" className="navBarLinks">CONNECT</div></a>
            </div>
        </div>
    )
}
