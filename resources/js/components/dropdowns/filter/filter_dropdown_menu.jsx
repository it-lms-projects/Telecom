import React, { useState, useEffect } from "react";
import { ArrowRight } from "@mui/icons-material";
import AddFilterDropdown from "./add_filter_dropdown";

const FilterDropdownMenu = ({ onItemClick, items = [] }) => {
    const [showCustom, setShowCustom] = useState(false);
    const [menuItems, setMenuItems]   = useState([]);

    // Function to handle item click
    const handleItemClick = (item) => {
        // Update the menu items to toggle the applied state
        setMenuItems(prevItems => {
            const newItems = prevItems.map(it => {
                if (it.id === item.id) {
                    return { ...it, isApplied: !it.isApplied };
                }
                return it;
            });
            return newItems;
        });
        if (onItemClick) {
            onItemClick(item);
        }
    };

    const handleFilterApplied = (item, filterOptions) => {
        if (onItemClick) {
            onItemClick(item, filterOptions);
        }
    };

    // Update menu items when items prop changes
    useEffect(() => {
        setMenuItems(items);
        setShowCustom(items.length > 0);
    }, [items]);

    return (
        <ul className="flex flex-col items-start text-sm justify-start gap-1 w-full py-0">
            {Object.entries(Object.groupBy(menuItems, it => it.groupKey)).map(([groupKey, groupItems], index) => {
                return (
                    <li key={`group-${index}`} className="flex flex-col items-start justify-start gap-1 w-full" data-group={groupKey}>
                        {(groupItems.length > 0 && index > 0) && (<hr className="w-full border-gray-300" />)}
                        <ul className="w-full">
                            {groupItems.filter(it => it.isApplied || it.isDefault).map((item, index) => (
                                <li key={`filter-${item.id}-${index}`}
                                    onClick={() => handleItemClick(item)}
                                    className="flex flex-row items-center gap-2 hover:bg-gray-300 hover:cursor-pointer px-2 py-1 w-full">
                                    <span className={`${item.isApplied ? "text-gray-500" : "text-transparent"} w-4 h-4`}>✓</span>
                                    <span className="text-gray-800">{item.title}</span>
                                </li>
                            ))}
                        </ul>
                    </li>
                );
            })}
            {showCustom && (
                <li className="flex flex-row items-center gap-2 justify-between group/main relative hover:bg-gray-300 hover:cursor-pointer px-2 py-1 w-full">
                    <span className="text-gray-800">
                        Ajouter un filtre personnalisé
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-500" />                    
                    <AddFilterDropdown
                        onFilterApplied={handleFilterApplied}
                        items={menuItems}
                        className={`hidden group-hover/main:block absolute left-64 top-0 z-20 h-[500px] -mt-[1px] origin-top-right border-none border-transparent bg-transparent rounded-none"`}
                    />
                </li>
            )}
        </ul>
    );
};

export default FilterDropdownMenu;