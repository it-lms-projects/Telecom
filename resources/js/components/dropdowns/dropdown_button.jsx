import React, { useState, useRef } from "react";
import { useClickOutside } from "../hooks/use_click_outside";

export default function DropdownButton({ children, header, className, childRefs=[], minWidth = "min-w-64", ...props }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useClickOutside([dropdownRef, ...(Array.isArray(childRefs) ? childRefs : [childRefs])], () => {
        if (isOpen) {
            setIsOpen(false);
        }
    });

    return (
        <div className={`relative ${className}`} {...props} ref={dropdownRef}>
            {/* Dropdown button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`relative inline-flex items-center text-sm font-medium text-gray-700 bg-white border border-b-0 ${isOpen ? "border-gray-300 z-30" : "border-transparent z-10 hover:bg-[#f3eded]"} rounded-none  hover:bg-gray-50 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent`}>
                {header}
            </button>
            {/* Dropdown button */}
            
            {/* Dropdown menu */}
            <div className={`${isOpen ? "" : "hidden"} ${minWidth || "min-w-64"} absolute left-0 top-full z-20 min-h-24 -mt-[1px] origin-top-right border border-gray-300 bg-white rounded-none shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {children}
                </div>
            </div>
            {/* Dropdown menu */}
        </div>
    );
}