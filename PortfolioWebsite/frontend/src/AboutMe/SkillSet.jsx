import { useEffect } from 'react'
import Skill from "./Skill.jsx"
import { skills } from './skills.js'

export default function SkillSet({ loadInformation })
{
    useEffect( () => {
        if(loadInformation){
          document.getElementById('skillsection').classList.replace("opac","skillsection")
        }
        
      }, [loadInformation])

    return (
        <div id="skillsection" className="opac">
            <div className="aboutheader">Skills</div>
            <div className="headersubtitle">
            <div className="leftedge"></div>
            <div className="subtitle">what I know</div>
            <div className="rightedge"></div>
            </div>

            <div className="skills">
            {skills.map( (s,i) => {
                return (
                    <Skill skillInformation = {s} key={i} loadInformation={loadInformation} />
                )
            })}
            </div>
        </div>
    )
} 
