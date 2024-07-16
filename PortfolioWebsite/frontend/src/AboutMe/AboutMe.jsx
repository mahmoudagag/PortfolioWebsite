import { useState, useEffect, useContext } from 'react'
import AboutMeText from "./AboutMeText.jsx"
import SkillSet from "./SkillSet.jsx"
import "../Styles/AboutMe.css"
import GlobalContext from "../ContextWrapper"


export default function AboutMe({ isElementInViewport }){
    
    const {setAboutIdentifier} = useContext(GlobalContext)
    const [loadInformation, setLoadInformation] = useState(false)

    useEffect( () => {
        const aboutTitle = document.getElementById('aboutTitle')
        const aboutBorder = document.getElementById("aboutborder")

        setAboutIdentifier(aboutBorder)

        function loop(){
            if(isElementInViewport(aboutTitle)){
                aboutTitle.classList.replace("opac","aboutTitle")
            }
            if(isElementInViewport(aboutBorder)){
                aboutBorder.classList.add("aboutborder")
                setLoadInformation(true)
            }
            if (aboutTitle.classList.contains("opac") || !aboutBorder.classList.contains("aboutborder")){
                window.setTimeout(loop,1000/60)
            }
        } 
        loop()     
    }, [])

    return (
        <section id="About" className="About">
            <div id="aboutTitle" className="opac">
                <div className="aboutTitleName">About Me</div>
                <div className="aboutunderlineTitle"></div>
            </div>
            <div className="aboutdiv">
                <AboutMeText loadInformation = { loadInformation } />
                <div id="aboutborder" className=""></div>
                <SkillSet loadInformation = { loadInformation } />
            </div>
        </section>
    )
}