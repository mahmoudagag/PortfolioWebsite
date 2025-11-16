import { useState, createContext, useEffect } from "react"

const GlobalContext = createContext()

export function ContextWrapper(props){
    const [homeIdentifier, setHomeIdentifier] = useState(null)
    const [aboutIdentifier, setAboutIdentifier] = useState(null)
    const [projectsIdentifier, setprojectsIdentifier] = useState(null)
    const [contactIdentifier, setContactIdentifier] = useState(null)
    const [modal, setModal] = useState(null)
    return (
        <GlobalContext.Provider value ={{
            homeIdentifier, 
            setHomeIdentifier,
            aboutIdentifier,
            setAboutIdentifier,
            projectsIdentifier,
            setprojectsIdentifier,
            contactIdentifier,
            setContactIdentifier,
            modal,
            setModal
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext