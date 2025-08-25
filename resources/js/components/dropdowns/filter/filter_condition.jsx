import React, { useState, useMemo, useRef, useEffect } from "react";
import BooleanSelect from "./inputs/boolean_select";
import EnumSelect from "./inputs/enum_select";
import DateTimeSelect from "./inputs/datetime_select";
import TextInput from "./inputs/text_input";
import NumberInput from "./inputs/number_input";

export default function FilterCondition({ condition, items = [], className = '' }) {
    const [dataType, setDataType]                   = useState('boolean');
    const [enumValues, setEnumValues]               = useState([]);
    const [selectedOperators, setSelectedOperators] = useState([]);
    const operators = useMemo(() => ({
        number: [
            { value: "=", label: 'est égal à', key: 'equals' },
            { value: "!=", label: 'est différent de', key: 'different' },
            { value: ">", label: 'supérieur à', key: 'greater' },
            { value: "<", label: 'inférieur à', key: 'less' },
            { value: ">=", label: 'supérieur ou égal à', key: 'greaterOrEqual' },
            { value: "<=", label: 'inférieur ou égal à', key: 'lessOrEqual' },
            { value: "isNotNull", label: 'est défini', key: 'defined' },
            { value: "isNull", label: 'n\'est pas défini', key: 'notDefined' },
        ],
        text: [
            { value: 'like', label: 'contient', key: 'contains' },
            { value: 'not like', label: 'ne contient pas', key: 'notContains' },
            { value: '=', label: 'est égal à', key: 'equals' },
            { value: '!=', label: 'est différent de', key: 'different' },
            { value: 'isNotNull', label: 'est défini', key: 'defined' },
            { value: 'isNull', label: 'n\'est pas défini', key: 'notDefined' },
        ],
        enum: [
            { value: "=", label: 'est', key: 'is' },
            { value: "!=", label: 'n\'est pas', key: 'isNot' },
            { value: "isNotNull", label: 'est défini', key: 'defined' },
            { value: "isNull", label: 'n\'est pas défini', key: 'notDefined' },
        ],
        boolea: [
            // There is no operators for boolean, because it has only two values
        ],
        date: [
            { value: "between", label: 'est entre', key: 'between' },
            { value: "=", label: 'est égal à', key: 'equals' },
            { value: "!=", label: 'est différent de', key: 'different' },
            { value: ">", label: 'est après', key: 'after' },
            { value: "<", label: 'est avant', key: 'before' },
            { value: ">=", label: 'est après ou égal à', key: 'afterOrEqual' },
            { value: "<=", label: 'est avant ou égal à', key: 'beforeOrEqual' },
            { value: "isNotNull", label: 'est défini', key: 'defined' },
            { value: "isNull", label: 'n\'est pas défini', key: 'notDefined' },
        ],
    }), []);
    const selectedItem = useRef(null);

    const handleOnChange = (e) => {
        const selectedValue = e.target.value;
        const selectedFilter = items.find(item => item.id === selectedValue);
        if (!selectedFilter) {
            return;
        }
        selectedItem.current = selectedFilter;
        // Display possible values
        setDataType(selectedFilter.type);
        setSelectedOperators(operators[selectedFilter.type]);
        if (selectedFilter.type === 'enum') {
            setEnumValues(selectedFilter.values);
        }
    };

    useEffect(() => {
        // Update the selected operators based on data type
        setSelectedOperators(operators[condition.dataType]);
    }, [condition]);

    return (
        <div className={`${className}`}>
            <select
                defaultValue={condition.field}
                style={{
                    border: 'none',
                    borderBottom: '1px solid #E1E1E1',
                }}
                className="w-full h-8 mb-2 rounded-sm border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-0 focus:ring-gray-300 focus:border-transparent"
                onChange={handleOnChange}>
                <option value="default_filter" disabled>Ajouter un filtre personnalisé</option>
                {items.map((item, index) => (
                    <option key={`filter-${item.id}-${index}`} value={item.id}>
                        {item.title}
                    </option>
                ))}
            </select>
            {Array.isArray(selectedOperators) && selectedOperators.length > 0
                ? (
                    <select
                        style={{
                            border: 'none',
                            borderBottom: '1px solid #E1E1E1',
                        }}
                        className="w-full h-8 mb-2 rounded-sm border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-0 focus:ring-gray-300 focus:border-transparent"
                    >
                        {selectedOperators.map((op, index) => {
                            return (
                                <option key={`key-${index}`} value={op.value}>
                                    {op.label}
                                </option>
                            );
                        })}
                    </select>
                )
                : <></>
            }
            {(dataType === 'date' || dataType === 'datetime')
                ? <DateTimeSelect />
                : dataType === 'boolean'
                    ? <BooleanSelect defaultValue='no' />
                    : dataType === 'number'
                        ? <NumberInput defaultValue={0} />
                        : dataType === 'enum'
                            ? <EnumSelect values={enumValues} />
                            : dataType === 'text' || dataType === 'string'
                                ? <TextInput />
                                : <></>
            }
        </div>
    );
}