import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { getMonth } from "../util";

export default function SmallCalendar() {
    const [ currentMonthIdx, setCurrentMonthIdx ] = useState(
        dayjs().month()
    );
    const [ currentMonth, setCurrentMonth ] = useState(getMonth());

    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIdx));
    }, [currentMonthIdx]);

    const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected, setShowEventModal } = useContext(GlobalContext);

    useEffect(() => {
        setCurrentMonthIdx(monthIndex);
    }, [monthIndex]);

    function handlePrevMonth() {
        setCurrentMonthIdx(currentMonthIdx - 1);
    }
    function handleNextMonth() {
        setCurrentMonthIdx(currentMonthIdx + 1);
    }

    function getDayClass(day) {
        const format = "DD-MM-YY";
        const nowDay = dayjs().format(format);
        const currDay = day.format(format);
        const slcDay = daySelected && daySelected.format(format);
        if (nowDay === currDay) {
            return "bg-green-700 rounded-full text-white";
        } else if (currDay === slcDay) {
            return "bg-green-200 rounded-full text-green-700 font-bold";
        } else {
            return "hover:bg-gray-200 hover:rounded-full";
        }
    }

    return (
        <div className = "mt-4 mx-2 md:mx-0">
            <header className = "flex justify-between">
                <p className = "text-gray-500 font-bold">
                    { dayjs(new Date(dayjs().year(), currentMonthIdx)).format(
                        "MMMM YYYY"
                    )}
                </p>
                <div>
                    <button onClick = {handlePrevMonth}>
                        <span className = "material-icons-outlined text-gray-600 mx-2 cursor-pointer">
                            chevron_left
                        </span>
                    </button>
                    <button onClick = {handleNextMonth}>
                        <span className = "material-icons-outlined text-gray-600 mx-2 cursor-pointer">
                            chevron_right
                        </span>
                    </button>
                </div>
            </header>
            <div className = "grid grid-cols-7 grid-rows-6">
                {currentMonth[0].map((day, i) => (
                    <span key = {i} className = "text-sm py-1 text-center">
                        {day.format("dd").charAt(0)}
                    </span>
                ))}
                {currentMonth.map((row, i) => (
                    <React.Fragment key = {i}>
                        {row.map((day, idx) => (
                            <button
                                key = {idx}
                                onClick = {() => {
                                    setSmallCalendarMonth(currentMonthIdx);
                                    setDaySelected(day);
                                }}
                                onDoubleClick = {() => {
                                    setSmallCalendarMonth(currentMonthIdx);
                                    setDaySelected(day);
                                    setShowEventModal(true);
                                }}
                                className = {`py-1 w-full ${getDayClass(day)}`}
                            >
                                <span className = "text-xs">
                                    {day.format("D")}
                                </span>
                            </button>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}