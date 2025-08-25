import React, { useRef } from "react";

export default function AddGroupDropdown({ className, items = [], onGroupApplied }) {
    const selectedItem = useRef(null);
    // Function to handle item click
    const handleItemClick = () => {
        if (onGroupApplied && selectedItem.current) {
            onGroupApplied(selectedItem.current);
            selectedItem.current = null;
        }
    };
    
    return (
        <div className={`${className}`}>
            <div className="p-4 w-full min-w-64 bg-white border border-gray-300 rounded-sm">
                <select
                    defaultValue="default_group"
                    style={{
                        border: 'none',
                        borderBottom: '1px solid #E1E1E1',
                    }}
                    className="w-full h-8 mb-2 rounded-sm border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-0 focus:ring-gray-300 focus:border-transparent"
                    onChange={(e) => {
                        const selectedValue = e.target.value;
                        const selectedGroup = items.find(item => item.id === selectedValue);
                        selectedItem.current = selectedGroup;
                    }}>
                    <option value="default_group" disabled>Ajouter un groupe personnalisé</option>                    
                    {items.map((item, index) => (
                        <option key={`group-${item.id}-${index}`} value={item.id}>
                            {item.title}
                        </option>
                    ))}
                </select>
                <button className="h-8 w-full rounded-sm bg-[#2e4573] text-white hover:cursor-pointer hover:font-semibold"
                        onClick={handleItemClick}>
                    Appliquer
                </button>
            </div>
        </div>
    );
}