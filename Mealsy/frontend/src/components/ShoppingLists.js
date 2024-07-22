import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function ShoppingLists() {
    const { setShowDailyModal, setShowWeeklyModal } = useContext(GlobalContext);

    return (
        <div className = "mt-3 mx-3 shrink-0 md:mx-0">
            <p className = "text-gray-500 font-bold text-left">Shopping Lists</p>
            <button
                onClick = {() => setShowDailyModal(true)}
                className = "border px-2 py-1 rounded-lg flex items-center shadow-sm hover:shadow-md mt-2 w-full"
            >
                <span className = "material-icons-outlined text-gray-400 pl-1 pr-1 text-base">
                    today
                </span>
                <span className = "pl-1 pr-7 text-sm">View Daily List</span>
            </button>
            <button
                onClick = {() => setShowWeeklyModal(true)}
                className = "border px-2 py-1 rounded-lg flex items-center shadow-sm hover:shadow-md mt-2 w-full"
            >
                <span className = "material-icons-outlined text-gray-400 pl-1 pr-1 text-base">
                    date_range
                </span>
                <span className = "pl-1 pr-7 text-sm">View Weekly List</span>
            </button>
        </div>
    );
}