import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import Select from "react-select";
import axios from 'axios'

export default function FavoritesModal() {
    const URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"

    const { token, setShowFavoritesModal, daySelected, } = useContext(GlobalContext);

    const [favorites,setFavorites] = useState([])
    const [title,setTitle] = useState('')
    useEffect( () => {
        getFavorites()
    },[])

    async function getFavorites(){
        const url = `${URL}/api/favorite`
        const options = {
            headers:{
                'Content-Type': 'text/plain;charset=utf-8',
                'authorization': 'Bearer ' + token
            }
        }
        const res = await axios.get(url,options)
        const favs = res.data.map((ele) =>{
            return {label:ele.name,value:ele.name,_id:ele._id}
        })
        console.log(favs)
        setFavorites(favs)
    }

    function handleChange(selectedOption){
        setTitle(selectedOption)
    }

    async function saveInformation(){
        let url = `${URL}/api/favorite/${title._id}`
        const options = {
            headers:{
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            }
        }
        let res = await axios.get(url,options)
        console.log(res.data)
        const name = title.label
        const ingredients = res.data.ingredients
        const date = new Date(daySelected)
        const body = {
            name,
            ingredients,
            date,
            color:'indigo'
        } 
        url = `${URL}/api/info`
        res = await axios.post(url,body,options)
        setShowFavoritesModal(false)
    }

    const selectStyles = {
        option: (provided, state) => ({
            ...provided,
            textAlign: 'left',
            backgroundColor: state.isSelected ? 'green' : '',
            '&:hover': {
                backgroundColor: '#e8f4ea',
                color: 'black',
            }
        }),
        control: (base, state) => ({
            ...base,
            border: state.isFocused ? 'green' : '',
        })
    };

    return (
        <div className = "h-screen w-full fixed left-0 top-0 flex justify-center items-center z-50">
            <div className = "bg-white rounded-lg shadow-2xl 2xl:w-1/4 flex flex-col">
                <header className = "bg-gray-100 rounded-t-lg px-4 py-2 flex justify-between items-center">
                    <span className = "material-icons-outlined text-gray-400 pt-1">
                        favorite
                    </span>
                    <span className = "text-left px-3 pt-1 font-bold text-gray-600">
                        Add From Your Favorites
                    </span>
                    <div>
                        <button onClick = {() => setShowFavoritesModal(false)}>
                            <span className = "material-icons-outlined text-gray-400 pt-2">
                                close
                            </span>
                        </button>
                    </div>
                </header>

                <div className = "p-3 pr-7 pt-4 mt-3">
                    <div className = "grid grid-cols-1/5 items-end gap-y-7">
                        <div className = "flex flex-col justify-center items-center">
                            <span className = "material-icons-outlined text-gray-400">
                                schedule
                            </span>
                        </div>
                        <p className = "text-left px-3">
                            { daySelected.format("ddd, MMMM DD") }
                        </p>
                        <div className = "flex flex-col justify-center items-center">
                            <span className = "material-icons-outlined text-gray-400 mb-1">
                                restaurant
                            </span>
                        </div>
                        <p className = "text-left1">
                            <Select onChange={handleChange} options = { favorites } styles = {selectStyles} />
                        </p>
                    </div>
                </div>

                <footer className = "flex justify-end border-t p-3 mt-5">
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
            </div>
        </div>
    );
}