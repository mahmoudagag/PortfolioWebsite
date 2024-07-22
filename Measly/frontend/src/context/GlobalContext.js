import React from "react";

const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index) => {},
    smallCalendarMonth: 0,
    setSmallCalendarMonth: (index) => {},
    daySelected: null,
    setDaySelected: (day) => {},
    showEventModal: false,
    setShowEventModal: () => {},
    dispatchCalEvent: ({ type, payload }) => {},
    savedEvents: [],
    selectedEvent: null,
    setSelectedEvent: () => {},
    setLabels: () => {},
    labels: [],
    updateLabel: () => {},
    filteredEvents: [],
    showDailyModal: false,
    setShowDailyModal: () => {},
    showWeeklyModal: false,
    setShowWeeklyModal: () => {},
    showFavoritesModal: false,
    setShowFavoritesModal: () => {},
    user : null,
    setUser : () => {},
    token : null,
    setToken : () => {},
});

export default GlobalContext;