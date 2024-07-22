import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

export default function Profile() {
    const URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"

    const { token, user, savedEvents } = useContext(GlobalContext)
    const navigate = useNavigate();
    const [ details, setDetails] = useState([
        { name: 'Calories', statistic: 0, spanner: 'egg_alt' },
        { name: 'Proteins', statistic: 0, spanner: 'kebab_dining' },
        { name: 'Potassium', statistic: 0, spanner: 'soup_kitchen' },
        { name: 'Sodium', statistic: 0, spanner: 'local_pizza' },
        { name: 'Sugar', statistic: 0, spanner: 'icecream' },
    ])
    useEffect( () =>{
        console.log(user)
        if (token === null){
            navigate('/login')
        }else{
            getProfile()
        }
    },[])

    async function getProfile(){
        const url = `${URL}/api/api/nutrition` 
        const options = {
            headers:{
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            }
        }
        const res = await axios.get(url,options)
        
        if (res.data.length > 0){
            let curr =[{ name: 'Calories', statistic: 0, spanner: 'egg_alt' },
                { name: 'Proteins', statistic: 0, spanner: 'kebab_dining' },
                { name: 'Potassium', statistic: 0, spanner: 'soup_kitchen' },
                { name: 'Sodium', statistic: 0, spanner: 'local_pizza' },
                { name: 'Sugar', statistic: 0, spanner: 'icecream' }]
            res.data.forEach( obj => {
                curr[0].statistic += obj.calories
                curr[1].statistic += obj.protein_g
                curr[3].statistic += obj.sodium_mg
                curr[2].statistic += obj.potassium_mg
                curr[4].statistic += obj.sugar_g
            })
            console.log(curr)
            setDetails(curr)
        }
    }
    return (
        <div className="relative sm:grid sm:grid-rows-1 sm:grid-flow-col sm:gap-3 bg-white max-h-screen mx-8 my-10">
            <div className="rounded-md bg-transparent h-2/3 ml-0.5 sm:ml-4 mr-0.5 my-5 row-span-2 col-span-1 drop-shadow-lg border-t">
                <div className="w-50 drop-shadow-lg">
                    <div className="bg-white rounded-lg px-6 py-9 mb-2 border border-gray-100">
                        <div className="photo-wrapper p-2 drop-shadow-lg">
                            <img className="max-w-72 max-h-72 sm:w-72 sm:h-72 rounded-full mx-auto" src="https://images.unsplash.com/photo-1638720772346-b745bcd72f5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1177&q=80" alt="John Doe">
                            </img></div>
                        <div className="p-2">
                            {user && <h4 className="text-center text-2xl text-gray-900 font-medium leading-8">{user.firstname} {user.lastname}</h4>}
                            <div className="text-center text-gray-400 text-xs font-semibold">
                                <p>Home Chef</p>
                            </div>
                        </div>
                    </div></div>
                <div></div>
                <article className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-6 mb-2 mt-1">
                    <div className="flex items-center gap-4">
                        <span className="rounded-full bg-gray-100 p-2 text-gray-600 block">
                            <span className="material-icons-outlined text-black mx-2 mt-2">
                                dinner_dining
                            </span>
                        </span>
                        <div>
                            <p className="text-sm text-gray-500">Recipes Saved</p>

                            <p className="text-2xl font-medium text-gray-900">{savedEvents.length}</p>
                        </div>
                    </div>
                </article>
            </div>
            <div className="rounded-md bg-transparent sm:h-2/3 ml-0.5 mr-0.5 sm:mr-1 my-5 row-span-2 col-span-3 drop-shadow-lg border-t">
                {/* <h2 className="text-2xl mb-3">Food Details</h2>
                <p className="text-lg">Calories:</p>
                <p className="text-lg">Proteins:</p>
                <p className="text-lg">Sodium:</p>
                <p className="text-lg">Potassium:</p>
                <p className="text-lg">Cholesterol:</p>
                <p className="text-lg">Fiber:</p>
                <p className="text-lg">Sugar:</p> */}
                {details.map((item) => (
                    <article className="flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6 mb-2">
                        <div className="flex items-center gap-4">
                            <span className="rounded-full bg-gray-100 p-2 text-gray-600 block">
                                <span className="material-icons-outlined text-black mx-2 mt-2">
                                    {item.spanner}
                                </span>
                            </span>
                            <div>
                                <p className="text-sm text-gray-500">{item.name}</p>

                                <p className="text-2xl font-medium text-gray-900">{item.statistic }</p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}