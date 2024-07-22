import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function CreateFavoritesButton() {
    const { setShowFavoritesModal } = useContext(GlobalContext);

    return (
        <button
            onClick = {() => setShowFavoritesModal(true)}
            className = "border h-10 p-2 rounded-full flex items-center shadow-md hover:shadow-lg"
        >
            <span className = "material-icons-outlined text-gray-400 ml-1">
                add
            </span>
            <span className = "material-icons-outlined text-red-600 pl-1 pr-2">
                favorite
            </span>
        </button>
    );
}