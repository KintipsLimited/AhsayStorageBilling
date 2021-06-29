import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Radio(props) {
    const [options, setOptions] = useState(props.options);    
    const [selectedOption, setSelectedOption] = useState(props.value);    

    useEffect( () => {
        setSelectedOption(props.value);
    }, [props.value]);
    
    return (
        <tr>
        <td style={props.style}>{props.displayName}:</td>
        <td>
        <div className = "radio-toolbar">
        {options.map((option, index) => {
            return (
                <div  key = {uuidv4()}>
                <input type="radio" id={option} name={props.name} value={option} defaultChecked = {selectedOption === option} onChange = {(ele) => {props.updateValue(option)}}/>
                <label className = "unselectable" htmlFor={option}>{option}</label></div>
        )}) }</div>
        </td></tr>
    )
}
export default Radio;
