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
    const URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"

    const [ currenMonth, setCurrentMonth ] = useState(getMonth());
    const { token, monthIndex, showEventModal, showDailyModal, showWeeklyModal, showFavoritesModal, dispatchCalEvent } = useContext(GlobalContext);
    
    const isMounted = React.useRef(false);
    const navigate = useNavigate();
    
    useEffect( () =>{
        if (token === null){
            navigate('/login')
        }else{
            if (!isMounted.current){
                loadData()
            }
            isMounted.current = true;
        }
    },[])

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);

    async function loadData(){
        dispatchCalEvent({type:"reset",payload:{}})
        const url = `${URL}/api/info` 
        const options = {
            headers:{
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            }
        }
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