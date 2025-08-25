import React from "react";

export default function DropdownHeader({ icon, title }) {
    return (
        <div className="flex flex-row items-center justify-start gap-2 text-gray-800 px-4 py-2 hover:cursor-pointer text-sm font-semibold">
            {icon}
            <span className="text-gray-800">{title}</span>
        </div>
    );
};