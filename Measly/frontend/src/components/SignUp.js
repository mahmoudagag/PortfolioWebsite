import React, {useContext} from "react";
import foodImage from "./images/signupfood.png";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import GlobalContext from "../context/GlobalContext";

export default function SignUp() {
    const URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"

    const { setToken,setUser } = useContext(GlobalContext)

    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault()
        const firstname = document.getElementById('firstName').value
        const lastname = document.getElementById('lastName').value
        const email = document.getElementById('emailAddress').value
        const password = document.getElementById('password').value
        if (!password || !email || !firstname || !lastname){
            return
        }
        const body = {"firstname":firstname,"lastname":lastname,"email":email,"password":password}
        const res = await axios.post(`${URL}/api/auth/register`,body)
        if (res.data){
            setToken(res.data.token)
            setUser(res.data.user)
            navigate('/')
        }
    }
    return (
        <div className="relative grid sm:grid-cols-2 sm:gap-2 sm:max-h-screen">
            <div className="flex justify-center h-min m-3 sm:h-full sm:w-full sm:max-h-screen sm:ml-24 sm:mt-16 sm:mr-2">
                <img src={foodImage} alt="foodImage" className="h-4/5 sm:ml-2 sm:mt-10 sm:mr-14"></img>
            </div>
            <div className="sm:mt-60 sm:mr-24 px-8 pb-8 max-h-screen">
                <p className="text-4xl font-normal text-left mb-4">Join Us</p>
                <form onSubmit={handleSubmit} className="w-full max-w-full">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="form-group mb-6">
                            <input type="text" className="form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded-lg
                                m-0
                                focus:ring-green-700
                                focus:border-green-700 focus:outline-none" id="firstName"
                                placeholder="First name" required>
                            </input>
                        </div>
                        <div className="form-group mb-6">
                            <input type="text" className="form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded-lg
                                m-0
                                focus:ring-green-700
                                focus:border-green-700 focus:outline-none" id="lastName"
                                placeholder="Last name" required>
                            </input>
                        </div>
                    </div>

                    <div className="form-group mb-6">
                        <input type="email" className="form-control block
                            w-full
                            px-3
                            py-1.5
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded-lg
                            m-0
                            focus:ring-green-700
                            focus:border-green-700 focus:outline-none" id="emailAddress"
                            placeholder="Email address" required>
                        </input></div>
                    <div className="form-group mb-6">
                        <input type="password" className="form-control block
                            w-full
                            px-3
                            py-1.5
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded-lg
                            m-0
                            focus:ring-green-700
                            focus:border-green-700 focus:outline-none" id="password"
                            placeholder="Password" required></input>
                    </div>
                    <button type="submit" className="
                        w-full
                        px-6
                        py-2.5
                        font-bold
                        text-base
                        bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg">
                        SIGN UP</button>

                </form>
                <p className="mt-8">Already have an account? <Link to={'/login'} className="text-red-600 hover:text-green-900 font-bold">Log in.</Link></p>
            </div>
        </div>
    );
}