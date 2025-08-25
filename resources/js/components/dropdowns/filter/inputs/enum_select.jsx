import React, { useState, useEffect } from "react";

export default function EnumSelect({ values = [], onChange }) {
    const [data, setData] = useState([]);

    const handleOnChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    useEffect(() => {
        setData(values);
    }, [values]);

    return (
        <select
            style={{
                border: 'none',
                borderBottom: '1px solid #E1E1E1',
            }}
            className="w-full h-8 mb-2 rounded-sm border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-0 focus:ring-gray-300 focus:border-transparent"
            onChange={handleOnChange}>
            {data.map((item, index) => {
                return (
                    <option key={`enum-key-${index}`} value={item.id}>
                        {item.title}
                    </option>
                );
            })}
        </select>
    );
}
