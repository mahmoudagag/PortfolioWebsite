import { useContext,useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import axios from "axios";

export default function DailyList() {
    const URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"

    const { token, setShowDailyModal } = useContext(GlobalContext);
    const [ dailys,setDailys ] = useState([])

    useEffect( () =>{
        getData()
    },[])

    async function getData(){
        const url = `${URL}/api/info` 
        const options = {
            headers:{
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            }
        }
        const res = await axios(url,options)
        const today = new Date()
        const daily = res.data.info.filter( (obj) => {
            let d = new Date(obj.date)
            return d.getDate() == today.getDate() &&
            d.getMonth() == today.getMonth() &&
            d.getFullYear() == today.getFullYear()
        })
        let ingredients = []
        daily.forEach(obj => {
            ingredients = ingredients.concat(obj.ingredients)
        });
        setDailys(ingredients)
    }

    return (
        <div className = "h-screen w-full fixed left-0 top-0 flex justify-center items-center z-50">
            <div className = "bg-white rounded-lg shadow-2xl 2xl:w-1/4">
                <header className = "bg-gray-100 rounded-t-lg px-4 py-2 flex justify-between items-center">
                    <span className = "material-icons-outlined text-gray-400 pt-1">
                        shopping_cart
                    </span>
                    <span className = "text-left px-3 pt-1 font-bold text-gray-600">
                        Daily Shopping List
                    </span>
                    <div>
                        <button onClick = {() => setShowDailyModal(false)}>
                            <span className = "material-icons-outlined text-gray-400 pt-2">
                                close
                            </span>
                        </button>
                    </div>
                </header>
                <div className = "p-3 px-14 mb-3 h-96 overflow-y-auto overscroll-contain">
                    {dailys.map( ing => {
                        return(
                            <label className = "items-center mt-3 block text-left">
                                <input type = "checkbox" className = "form-checkbox h-5 w-5 text-black-400 rounded focus:ring-0 cursor-pointer"/>
                                <span className = "ml-2 text-gray-700 capitalize">{ing}</span>
                            </label>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}