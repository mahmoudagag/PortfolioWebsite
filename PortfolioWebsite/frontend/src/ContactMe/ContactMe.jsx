import { useEffect, useContext, useState } from "react"
import { FaLinkedin, FaGithub } from "react-icons/fa";
import GlobalContext from "../ContextWrapper";
import "../Styles/ContactMe.css"

export default function ContactMe({isElementInViewport}) {

    const {setContactIdentifier} = useContext(GlobalContext)
    const [msgSent, setMsgSent] = useState(false)
    
    useEffect( () => {
        const contactTitle = document.getElementById('contactTitle')
        const contactForm = document.getElementById('contactform')

        setContactIdentifier(document.getElementById('contactform'))
        document.getElementById("submit").addEventListener('click',()=>{
            setMsgSent(true)
        })
        function loop(){
            if(contactTitle !== null && isElementInViewport(contactTitle)){
                contactTitle.classList.replace("opac","contactTitle")
            }
            if(contactForm !== null && isElementInViewport(contactForm)){
                contactForm.classList.replace('opacity','contactForm')
            }
            if (contactTitle === null || contactTitle.classList.contains("opac") || contactForm === null || contactForm.classList.contains("opacity") ){
                window.setTimeout(loop,1000/60)
            }
        }
        loop()
    },[])

    // function sendEmail(){
    //     const sendmail = require('sendmail')();
    //     // const from = document.getElementById("messageFrom").innerHTML
    //     // const subject = document.getElementById("messageSubject").innerHTML
    //     // const message = document.getElementById("message").innerHTML

    //     // sendmail({
    //     //     from: from,
    //     //     to: 'agagmahmoud@gmail.com',
    //     //     subject: subject,
    //     //     html: message,
    //     //   }, function(err) {
    //     //     console.log(err && err.stack);
    //     // });
    // }

    return (
        <section id="Contact" className="Contact">
            <div id="contactTitle" className="opac">
                <div className="contactTitleName">Contact Me</div>
                <div className="contactunderlineTitle"></div>
            </div>
            
            <form action="" method="POST" id="contactform" className="opacity">

                { msgSent && <div className="Thankyoumsg">I recieved your email and will respond shortly...</div>}

                <input id="messageFrom" name="message_email" className="contactnameemail" placeholder="Email" type="email"></input>
                <input id="messageSubject" name="message_subject" className="contactnameemail" placeholder="Subject" type="text"></input>
                <textarea id="message" name="message" className="contactmessage contactnameemail" placeholder="Message" type="text"></textarea>
                <div className="contactSubmit">
                    <button id="submit" className="contactsubmitbtn">Submit</button>
                </div>
            </form>
        
            <div className="divider">
                <a href="#Home"><div className="scrollupbtn"></div></a>
                <hr className="contactdivider"/>
            </div>
            <div className="links">
                <a href="https://www.linkedin.com/in/mahmoud-agag-4aba21203/" className="sociallink"><FaLinkedin /></a>
                <a href="https://github.com/mahmoudagag" className="sociallink"><FaGithub /></a>
            </div>
      
        </section>
    )
}