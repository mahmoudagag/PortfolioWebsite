import { useContext, useEffect, useState } from "react";
import GlobalContext from "../ContextWrapper";
import "../Styles/Home.css";

export default function Home() {

    const {setHomeIdentifier} = useContext(GlobalContext)

    useEffect(() => {
        setHomeIdentifier(document.getElementById('homebtn'))
    },[])

  return (
    <section id="Home" className="homepage">
        <div className="greeting">
            <div className="firstLine">
                <span className="hello">Hello, I'm </span>
                <span className="name"> Mahmoud Agag</span>
                <span className="hello">.</span>
            </div>
            <span className="hello secondLine">I'm a software engineer.</span>
            <a className="btnLearnMorediv" href="#About">
                <div className="btnLearnMorehover" >
                    <div id="homebtn" className=" btnLearnMore">Learn more about me! <div className="arrow"></div> </div>
                </div>
            </a>
        </div>
    </section>
  )
}
