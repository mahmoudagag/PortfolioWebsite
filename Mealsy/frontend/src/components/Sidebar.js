import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
import ShoppingLists from "./ShoppingLists";
import CreateFavoritesButton from "./CreateFavoritesButton";

export default function Sidebar() {
    return (
        <aside className = "flex p-5 border-t w-full overflow-auto md:h-screen md:w-64 md:border md:flex-col">
            <div className = "flex flex-col shrink-0 mx-1 md:mx-0">
                <div className = "flex">
                    <CreateEventButton />
                    <CreateFavoritesButton />
                </div>
                <div className = "shrink-0">
                    <SmallCalendar  />
                </div>
            </div>
            <div className = "flex flex-col shrink-0 mx-1 md:mx-0 sm:flex-row md:flex-col">
                <ShoppingLists />
                <Labels />
            </div>
        </aside>
    );
}