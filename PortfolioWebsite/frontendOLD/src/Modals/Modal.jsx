// import "../Images"
import { useEffect, useContext } from "react"
import GlobalContext from "../ContextWrapper"
import "../Styles/Modal.css"

export default function Modal(){

    const { modal, setModal } = useContext(GlobalContext)

    useEffect(() => {
        document.querySelectorAll('#close').forEach(element=>{
            element.addEventListener('click',()=>{
                close()
            })
        })

        document.querySelectorAll('#popupright').forEach(element=>{
            element.addEventListener('click',()=>{
                if(curr < modal.numberOfImages){
                    document.getElementById(modal.background).classList.replace(`${modal.image}${curr}`,`${modal.image}${curr+1}`)
                    curr += 1
                }
            })
        })

        document.querySelectorAll('#popupleft').forEach(element=>{
            element.addEventListener('click',()=>{
                if(curr>1){
                    document.getElementById(modal.background).classList.replace(`${modal.image}${curr}`,`${modal.image}${curr-1}`)
                    curr -= 1
                }
            })
        })

        let curr = 1
        if (modal !== null){
            document.getElementById(modal.div).style.display='flex'

            document.addEventListener('click',(e)=>{
                if (e.target.id === modal.div){
                    close()
                }
            })
        }

        function close(){
            if(modal !== null && document.getElementById(modal.div)){
                console.log(modal.webSiteURL)
                document.getElementById(modal.background).classList.replace(`${modal.image}${curr}`,`${modal.image}1`)
                document.getElementById(modal.div).style.display='none'
                setModal(null)
            }
        }

    },[modal])

    if (modal !== null){
        return(
            <div id={modal.div} className="modal">
                <div className="modal_contents">
                    <div id={modal.background} className={`popupbackground ${modal.image}1`}>
                        <div id="close" className="close"></div>
                        <div id="popupleft" className="slider leftslider"><div className="sliderarrow leftarrow"></div> </div>
                        <div id="popupright" className="slider rightslider"> <div className="sliderarrow rightarrow"></div>  </div>
                    </div>

                    <div className="popupbottom">
                        <div className="popupName">{modal.name}</div>
                        <div className="popuptechnology">{modal.languages}</div>
                        <hr/>
                        <p className="popupdescription">
                            {modal.description}
                        </p>
                        <div className="popupbtndiv">
                        { modal.webSiteURL !== null && <a href={modal.webSiteURL}><div className="popupbtn">Visit Site</div></a> }
                        <a href={modal.githubURL}><div className="popupbtn">Visit Github</div></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
