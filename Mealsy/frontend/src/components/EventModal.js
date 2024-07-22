import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import axios from 'axios'

const labelsClasses = [
    "indigo",
    "green",
    "blue",
    "red",
    "purple",
    "gray",
];

export default function EventModal() {
    const URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"

    const {
        token,
        setShowEventModal,
        daySelected,
        dispatchCalEvent,
        selectedEvent,
    } = useContext(GlobalContext);

    const [title, setTitle] = useState(
        selectedEvent ? selectedEvent.title : ""
    );
    const [description, setDescription] = useState(
        selectedEvent ? selectedEvent.description : ""
    );
    const [instructions, setInstructions] = useState(
        selectedEvent ? selectedEvent.instructions : ""
    );
    const [selectedLabel, setSelectedLabel] = useState(
        selectedEvent ? labelsClasses.find((lbl) => lbl === selectedEvent.label) : labelsClasses[0]
    );
    const [favorite, setFavorite] = useState();
    const [favID,setFavID] = useState('')

    function handleSubmit(id) {
        // e.preventDefault();
        if (title.trim() === '') {
            
        } else {
            const calendarEvent = {
                title,
                description,
                instructions,
                label: selectedLabel,
                day: daySelected.valueOf(),
                id: id,
            };
            if (selectedEvent) {
                dispatchCalEvent({ type: "update", payload: calendarEvent });
            } else {
                dispatchCalEvent({ type: "push", payload: calendarEvent });
            }
            setShowEventModal(false);
        }
    }

    async function saveInformation(e){
        e.preventDefault();
        const title = document.getElementById('title').value
        const instructions = document.getElementById('instructions').value
        const ingredients = document.getElementById('ingredients').value.split(',')
        const date = new Date(daySelected)
        
        const body = {
            name:title,
            ingredients,
            date,
            instructions,
            color:selectedLabel
        } 
        const options = {
            headers:{
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            }
        }
        if(selectedEvent){
            //update
            const url = `${URL}/api/info/${selectedEvent.id}`
            const res = await axios.patch(url,body,options)
            handleSubmit(res.data.info._id)
        }else{
            //create
            const url = `${URL}/api/info`
            const res = await axios.post(url,body,options)
            handleSubmit(res.data.info._id)

        }
    }
    async function deleteInformation(){
        // when trash is selected
        const url = `${URL}/api/info/${selectedEvent.id}`
        const options = {
            headers:{
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            }
        }
        await axios.delete(url,options)
        dispatchCalEvent({
                type: "delete",
                payload: selectedEvent,
            });
            setShowEventModal(false);
    }
    async function createFavorites(){
        const fav = !favorite
        setFavorite(!favorite)
        if (fav){
            //save favorite
            const url = `${URL}/api/favorite`
            const title = document.getElementById('title').value
            const instructions = document.getElementById('instructions').value
            const ingredients = document.getElementById('ingredients').value
            const arrIng = ingredients.split(',')
            const options = {
                headers:{
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + token
                }
            }
            const body = {name:title,ingredients:arrIng,instructions} 
            const res = await axios.post(url,body,options)
            setFavID(res.data.fav._id)
        }else{  
            // delete favorite
            const url = `${URL}/api/favorite/${favID}`
            const options = {
                headers:{
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + token
                }
            }
            const res = await axios.delete(url,options)
            setFavID('')
        }
    }
    return (
        <div className = "h-screen w-full fixed left-0 top-0 flex justify-center items-center z-50">
            <form className = "bg-white rounded-lg shadow-2xl 2xl:w-1/4">
                <header className = "bg-gray-100 rounded-t-lg px-4 py-2 flex justify-between items-center">
                    <span onClick={createFavorites} className = {`material-icons-outlined pt-2 cursor-pointer ${favorite ? "text-red-600" : "text-gray-400"}`} >
                        favorite
                    </span>
                    <div>
                        <button onClick = {() => setShowEventModal(false)}>
                            <span className = "material-icons-outlined text-gray-400 pt-2">
                                close
                            </span>
                        </button>
                    </div>
                </header>

                <div className = "p-3">
                    <div className = "grid grid-cols-1/5 items-end gap-y-7">
                        <div className = "flex flex-col justify-center items-center pb-1">
                            <span className = "material-icons-outlined text-gray-400 text-center">
                                restaurant
                            </span>
                        </div>
                        <input 
                            required
                            type = "text" 
                            id = 'title'
                            name = "title" 
                            placeholder = "Add Meal Name"
                            value = {title}
                            className = "pt-5 pb-1 border-0 text-gray-600 text-xl font-semibold w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-green-700"
                            onChange = {(e) => setTitle(e.target.value)}
                        />
                        <div className = "flex flex-col justify-center items-center">
                            <span className = "material-icons-outlined text-gray-400">
                                schedule
                            </span>
                        </div>
                        <p className = "text-left px-3" id='date'>
                            { daySelected.format("dddd, MMMM DD") }
                        </p>
                        <div className = "flex flex-col justify-center items-center">
                            <span className = "material-icons-outlined text-gray-400">
                                storefront
                            </span>
                        </div>
                        <textarea
                            id = 'ingredients'
                            required
                            type = "text" 
                            name = "description" 
                            placeholder = "Add Ingredients"
                            value = {description}
                            className = "pt-0 pb-1 border-0 text-gray-600 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-green-700 h-16 max-h-32 overscroll-contain"
                            onChange = {(e) => setDescription(e.target.value)}
                        />
                        <div className = "flex flex-col justify-center items-center">
                            <span className = "material-icons-outlined text-gray-400">
                                description
                            </span>
                        </div>
                        <textarea
                            id = "instructions"
                            required
                            type = "text" 
                            name = "instructions" 
                            placeholder = "Add Instructions"
                            value = {instructions}
                            className = "pt-0 pb-1 border-0 text-gray-600 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-green-700 h-28 max-h-48 overscroll-contain"
                            onChange = {(e) => setInstructions(e.target.value)}
                        />
                        <div className = "flex flex-col justify-center items-center">
                            <span className = "material-icons-outlined text-gray-400">
                                bookmark_border
                            </span>
                        </div>
                        <div className = "flex justify-evenly">
                            {labelsClasses.map((lblClass, i) => (
                                <span
                                    key = {i}
                                    onClick = {() => setSelectedLabel(lblClass)}
                                    className = {`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                                >
                                    {selectedLabel === lblClass && (
                                        <span className = "material-icons-outlined text-white text-sm">
                                            check
                                        </span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <footer className = "flex justify-between border-t p-3 mt-5">
                    <div className = "flex justify-start">
                        {selectedEvent && (
                            <span
                                onClick = {deleteInformation}
                                className = "material-icons-outlined text-gray-400 cursor-pointer pt-2 px-1"
                            >
                                delete
                            </span>
                        )}
                    </div>
                    <div className = "flex justify-end">
                        <button
                            type = "submit"
                            onClick = {saveInformation}
                            className = "bg-green-800 hover:bg-green-900 px-6 py-2 rounded text-white"
                        >
                            Save
                        </button>
                    </div>
                </footer>
            </form>
        </div>
    );
}