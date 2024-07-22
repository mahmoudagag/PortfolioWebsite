import React from "react";
import soup from "./images/homesoup.png";
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <div className="max-h-screen">
            <div className="relative px-6 lg:px-8 md:px-3 sm:px-2 max-h-screen">
                <div className="mx-auto max-w-3xl pt-2  sm:pt-36 max-h-screen">
                    <div className="mt-8 sm:mt-0 sm:mb-8 sm:flex sm:justify-center max-h-screen">
                        <div>
                            <h1 className="text-4xl font-bold sm:text-center sm:text-6xl drop-shadow-lg  max-h-screen">
                                Meals Made Easy.</h1>
                            <p className="mt-6 px-3 text-lg leading-8 text-gray-600 sm:text-center  max-h-screen">
                                Plan your next homemade breakfast, lunch, or dinner. With an integrated calendar and recipes, you no longer have to shuffle through shopping lists and recipe books.
                            </p>
                            <div className="mt-5 flex gap-x-4 justify-center relative  max-h-screen">
                                <img src={soup} alt="foodImage" className="w-auto sm:w-8/12 max-h-screen"></img>
                                <Link to={'/sign-up'} className="animate-bounce absolute top-0 drop-shadow-lg px-8 inline-block rounded-lg bg-green-800 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-green-700 hover:bg-green-900 hover:ring-green-800 w-1/3 text-center max-h-screen min-w-[100px]">
                                    Start Planning &#8594;</Link></div>
                        </div>

                    </div>
                </div>
            </div>



        </div>
    );
}