import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Labels() {
    const { labels, updateLabel } = useContext(GlobalContext);
    
    return (
        <React.Fragment>
            <div className = "flex flex-col mx-3 shrink-0 md:mx-0">
                <p className = "text-gray-500 font-bold mt-3 text-left">Label</p>
                {labels.map(({ label: lbl, checked }, idx) => (
                    <label 
                        key = {idx}
                        className = "items-center block text-left"
                    >
                        <input
                            type = "checkbox"
                            checked = {checked}
                            onChange = {() => updateLabel({ label: lbl, checked: !checked })}
                            className = {`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`}
                        />
                        <span className = "ml-2 text-gray-700 capitalize">{ lbl }</span>
                    </label>
                ))}
            </div>
        </React.Fragment>
    );
}