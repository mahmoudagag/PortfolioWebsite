import React, { useState, useContext, useEffect } from "react";
import { getMonth } from "../util";
import CalendarHeader from "./CalendarHeader";
import Sidebar from "./Sidebar";
import Month from "./Month";
import GlobalContext from "../context/GlobalContext";
import EventModal from "./EventModal";
import DailyList from "./DailyList";
import WeeklyList from "./WeeklyList";
import FavoritesModal from "./FavoritesModal";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

export default function Calendar() {
    const [ currenMonth, setCurrentMonth ] = useState(getMonth());
    const { monthIndex, showEventModal, showDailyModal, showWeeklyModal, showFavoritesModal, dispatchCalEvent } = useContext(GlobalContext);
    
    const navigate = useNavigate();
    
    useEffect( () => {
        loadData()
    },[])

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);

    async function loadData(){
        dispatchCalEvent({type:"reset",payload:{}})
        const url = "/mealsy/api/info" 
        const options = {
            headers:{
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }
        try{
            const res = await axios(url,options)
            res.data.info.map( obj => {
                dispatchCalEvent({ type: "push", payload: {
                    title:obj.name,
                    description:obj.ingredients.join(),
                    label:obj.color,
                    instructions:obj.instructions,
                    day : obj.date.valueOf(),
                    id:obj._id
                } })
            })
        }
        catch{
            navigate('/login')
        }
    }

    return (
        <React.Fragment>
            {showEventModal && <EventModal />}
            {showDailyModal && <DailyList />}
            {showWeeklyModal && <WeeklyList />}
            {showFavoritesModal && <FavoritesModal />}

            <div className = "h-screen flex flex-col">
                <CalendarHeader />
                <div className = "flex flex-col flex-1 md:flex-row">
                    <Sidebar />
                    <Month month = {currenMonth} />
                </div>
            </div>
        </React.Fragment>
    );
}