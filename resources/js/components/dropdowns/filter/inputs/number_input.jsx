import React, { useState, useEffect } from "react";

export default function NumberInput({ defaultValue = 0, onChange }) {
    const [value, setValue] = useState(0);

    const handleOnChange = (e) => {
        setValue(e.target.value);
        if (onChange) {
            onChange(e.target.value);
        }
    };

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    return (
        <div className="w-full flex flex-col gap-2 my-2">
            <input
                value={value}
                type="number"
                id="number-input"
                style={{
                    border: 'none',
                    borderBottom: '1px solid #E1E1E1',
                }}
                className="block w-full border-[1px] border-b-gray-300"
                onChange={handleOnChange} />
        </div>
    );
}
