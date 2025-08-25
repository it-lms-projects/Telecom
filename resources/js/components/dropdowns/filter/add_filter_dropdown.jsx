import React, { useState, useRef, useEffect } from "react";
import { AddCircleOutline, DeleteOutline } from "@mui/icons-material";
import FilterCondition from "./filter_condition";

export default function AddFilterDropdown({ className, items = [], onFilterApplied }) {
    const [conditions, setConditions] = useState([]);
    const selectedOptions = useRef(null);

    // Function to handle item click
    const handleItemClick = () => {
        /*if (onFilterApplied && selectedItem && selectedOptions.current) {
            onFilterApplied(selectedItem, selectedOptions.current);
        }*/
    };

    const handleAddConditionClick = () => {
        setConditions((prevCondtions) => (
            [
                ...prevCondtions,
                {
                    field: '',
                    operator: '',
                    dataType: '',
                    value1: null, // can be a Date, number, string, etc
                    value2: null, // can be a Date, number, string, etc
                },
            ]
        ));
    };

    const handleRemoveConditionClick = (index) => {
        console.log(`index: ${index}`);
        setConditions(conditions.filter((_, idx) => idx !== index));
    };

    useEffect(() => {
        // Initialize data
        if (items && items.length > 0) {
            setConditions([{
                field: items.at(0).id,
                operator: '',
                dataType: '',
                value1: null, // can be a Date, number, string, etc
                value2: null, // can be a Date, number, string, etc
            }]);
        }
        // Debug the items
        // console.log(items);
    }, [items]);

    return (
        <div className={`${className} w-[330px]`}>
            <div className="flex flex-col w-full min-w-80 bg-white border border-gray-300 rounded-sm">
                <div className="flex-1 overflow-y-auto w-full max-w-full">
                    {conditions.map((condition, index) => {
                        return (
                            <div className={`flex flex-row items-start gap-1 py-2 ${index > 0 ? "border-t-[1px] border-t-gray-400 border-dashed" : ""}`}>
                                <span className={`${index > 0 ? "visible" : "invisible"}`}>ou</span>
                                <FilterCondition
                                    condition={condition}
                                    items={items}
                                    className="flex-1"
                                    key={`key-${index}`} />
                                <button
                                    onClick={() => handleRemoveConditionClick(index)}
                                    className={`hover:cursor-pointer hover:bg-gray-100 text-gray-400 ${index > 0 ? "visible" : "invisible"}`}>
                                    <DeleteOutline />
                                </button>
                            </div>
                        );
                    })}
                </div>
                <div className="flex flex-row w-full items-center gap-2 px-4 mb-2">
                    <button
                        className="h-8 px-2 rounded-sm bg-[#2e4573] text-white hover:cursor-pointer hover:font-semibold"
                        onClick={handleItemClick}>
                        Appliquer
                    </button>
                    <button
                        onClick={handleAddConditionClick}
                        className="flex-1 px-2 h-8 rounded-none gap-2 bg-gray-300 text-gray-700 hover:cursor-pointer hover:font-semibold">
                        <AddCircleOutline />
                        <span>Ajouter une condition</span>
                    </button>
                </div>
            </div>
        </div>
    );
}