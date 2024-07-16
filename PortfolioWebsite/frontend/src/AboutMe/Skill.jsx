import { useEffect } from "react"

export default function Skill({skillInformation, loadInformation}){

    useEffect( ()=> {
        if(loadInformation){
            window.setTimeout(()=>{
                document.getElementById(skillInformation.name).classList.add(skillInformation.class)
            },2000) 
        }
    },[loadInformation])
    return (
        <div className="skillbox">
            <div className="skillname">{skillInformation.name}</div>
            <div className="skillpercentdiv">
            <div id={skillInformation.name} className="filler "> </div>
            <div className="skillpercent" >{skillInformation.percentage}%</div>
            </div>
        </div>
    )
}