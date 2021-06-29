import React, { useState, useEffect } from 'react';

function Select(props) {
    const [options, setOptions] = useState(props.options);    
    const { v4: uuidv4 } = require('uuid');
    const [selectedValue, setSelectedValue] = useState(props.selected);

    useEffect(() => {
        setSelectedValue(props.selected);
    }, [props.selected]);

    return (
        <select name={props.name} value={selectedValue} onChange={(ele) => {props.updateSelect(ele.target.value)}}> 
        {options.map((option, index) => {
            return (
                <option key = {uuidv4()} value={option} disabled={index > props.disabledIndex}>{option}</option>
            )
        }) }
        </select>
        
    )
}
export default Select;
