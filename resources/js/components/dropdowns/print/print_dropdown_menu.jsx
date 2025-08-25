import React, { useState, useEffect } from "react";

export default function PrintDropdownMenu({ onItemClick, items = [] }) {
    const [menuItems, setMenuItems] = useState([]);
    // Function to handle item click
    const handleItemClick = (item) => {
        if (onItemClick) {
            onItemClick(item);
        }
    };

    useEffect(() => {
        setMenuItems(items);
    }, [items]);

    return (
        <ul className="flex flex-col items-start justify-start gap-1 w-full py-0">
            {menuItems.map((item, index) => (
                <li key={index} onClick={() => handleItemClick(item)} className="hover:bg-gray-300 hover:cursor-pointer px-2 py-1 w-full">
                    <span className="text-gray-800">{item.title}</span>
                </li>
            ))}
        </ul>
    );
}