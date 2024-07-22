import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function CreateEventButton() {
    const { setShowEventModal } = useContext(GlobalContext);

    return (
        <button
            onClick = {() => setShowEventModal(true)}
            className = "border h-10 p-2 mb-0 rounded-full flex items-center shadow-md hover:shadow-lg mr-3"
        >
            <span className = "material-icons-outlined text-gray-400 ml-2">
                add
            </span>
            <span className = "pl-2 pr-4">Create</span>
        </button>
    );
}