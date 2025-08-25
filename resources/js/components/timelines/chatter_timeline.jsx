import React from "react";
import { Clock } from "lucide-react";

export function CenteredDateWithLine({ title, className }) {
    return (
        <div className={`flex items-center justify-center w-full my-6 ${className}`}>
            <div className="w-24 border-t border-gray-300"></div>
            <span className="mx-3 font-bold text-white bg-[#2e4573] px-4 py-1 whitespace-nowrap">{title}</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>
    );
}

export default function ChatterTimeline({ data =[]}) {
    return (
        <div className="relative border-l-4 border-green-500 pl-6 space-y-8">
            {/* Timeline Items */}
            {data.map((item, index) => (
                <div key={index} className="relative">
                    {/* Dot */}
                    <div className="absolute -left-[30px] top-1 w-4 h-4 bg-white border-4 border-green-500 rounded-full"></div>

                    {/* Content */}
                    <h3 className="font-semibold text-black">{item.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        {item.date}
                    </div>
                    {item.description && (
                        <p className="text-sm text-gray-500 mt-2">{item.description}</p>
                    )}
                </div>
            ))}
        </div>
    );
}