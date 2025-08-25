import React, { useState, useEffect } from "react";

export default function DateTimeSelect({ begin, end, onChange }) {
    const [startDate, setStartDate] = useState(begin || '');
    const [endDate, setEndDate] = useState(end || '');

    useEffect(() => {
        setStartDate(begin || '');
        setEndDate(end || '');
    }, [begin, end]);

    const handleStartDateChange = (e) => {
        const newStartDate = e.target.value;
        setStartDate(newStartDate);
        onChange?.(newStartDate, endDate); // always use latest value
    };

    const handleEndDateChange = (e) => {
        const newEndDate = e.target.value;
        setEndDate(newEndDate);
        onChange?.(startDate, newEndDate);
    };

    return (
        <div className="w-full flex flex-col gap-2 my-2">
            <input
                type="date"
                id="start-date"
                value={startDate}
                onChange={handleStartDateChange}
                style={{
                    border: 'none',
                    borderBottom: '1px solid #E1E1E1',
                }}
                className="block w-full outline-hidden focus:border-indigo-600 focus:outline-hidden" />
            <input
                type="date"
                id="end-date"
                value={endDate}
                onChange={handleEndDateChange}
                style={{
                    border: 'none',
                    borderBottom: '1px solid #E1E1E1',
                }}
                className="block w-full outline-hidden focus:border-indigo-600 focus:outline-hidden" />
        </div>
    );
}
