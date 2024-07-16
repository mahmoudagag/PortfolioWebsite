import { useEffect } from 'react'

export default function AboutMeText({ loadInformation }) {

  useEffect( () => {
    if(loadInformation){
      document.getElementById('aboutsection').classList.replace("opac","aboutsection")
    }
  }, [loadInformation])

    return (
        <>
          <div id="aboutsection" className="opac">
            <div className="aboutheader">Me</div>
            <div className="headersubtitle">
              <div className="leftedge"></div>
              <div className="subtitle">who I am</div>
              <div className="rightedge"></div>
            </div>
            <div >
              <p className="aboutmetext"> 
                Hi, I'm Mahmoud. I'm currently an 
                undergradute student at City College of New 
                York majoring in Computer Science and a 
                minor in Math. Thus far, my primary focus 
                has been in full stack web development. 
                Currently, I'm working on challenging myself
                with more difficult projects to fine-tune my 
                skills as well as learning new technologies to 
                grow as a developer.
              </p>
            </div>
            <a href="{% url 'resume' %}"><div className="resumebtn">Download Resume</div></a>
          </div>
        </>
    )
}