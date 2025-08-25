import React, { useState, useEffect } from "react";

export default function BooleanSelect({ defaultValue, onChange }) {
    const [value, setValue] = useState('no');

    const handleOnChange = (e) => {
        setValue(e.target.value);
        if (onChange) {
            onChange(e.target.value);
        }
    };

    useEffect(() => {
        if (defaultValue !== 'yes') {
            setValue('no');
        } else {
            setValue('yes');
        }
    }, [defaultValue]);

    return (
        <select
            value={value}
            style={{
                border: 'none',
                borderBottom: '1px solid #E1E1E1',
            }}
            className="w-full border-[1px] border-b-gray-300 border-solid my-2"
            onChange={handleOnChange}>
            <option value="yes">est Oui</option>
            <option value="no">est Non</option>
        </select>
    );
}
