import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "@mui/icons-material";
import AddGroupDropdown from "./add_group_dropdown";

const GroupDropdownMenu = ({ onItemClick, items = [] }) => {
    const [showCustom, setShowCustom] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    // Function to handle item click
    const handleItemClick = (item) => {
        setMenuItems(prevItems => {
            const newItems = prevItems.map(it => {
                if (it.id === item.id) {
                    return { ...it, isApplied: !it.isApplied };
                }
                return it;
            });
            return newItems;
        });
        // Call the onItemClick callback if provided
        if (onItemClick) {
            onItemClick(item);
        }
    };

    const handleGroupApplied = (item) => {
        if (onItemClick) {
            onItemClick(item);
        }
    }

    useEffect(() => {
        setMenuItems(items);
        setShowCustom(items.length > 0);
    }, [items]);

    return (
        <ul className="flex flex-col items-start justify-start gap-1 text-sm w-full py-0">
            {menuItems.filter(it => it.isApplied || it.isDefault).map((item, index) => (
                <li key={`group-${item.id}-${index}`}
                    onClick={() => handleItemClick(item)}
                    className="flex flex-row items-center gap-2 hover:bg-gray-300 hover:cursor-pointer px-2 py-1 w-full">
                    <span className={`${item.isApplied ? "text-gray-500" : "text-transparent"} w-4 h-4`}>✓</span>
                    <span className="text-gray-800">{item.title}</span>
                </li>
            ))}
            {showCustom && (
                <>
                    <hr className="w-full border-gray-300" />
                    <li className="flex flex-row items-center gap-2 justify-between group/main relative hover:bg-gray-300 hover:cursor-pointer px-2 py-1 w-full">
                        <span className="text-gray-800">
                            Ajouter un groupe personnalisé
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-500" />
                        <AddGroupDropdown
                            onGroupApplied={handleGroupApplied}
                            items={menuItems}
                            //items={menuItems.filter(it => !it.isDefault && !it.isApplied)}
                            className="hidden group-hover/main:block absolute left-64 top-0 z-20 h-[500px] w-[314px] -mt-[1px] origin-top-right border-none border-transparent bg-transparent rounded-none" />
                    </li>
                </>
            )}
        </ul>
    );
};

export default GroupDropdownMenu;