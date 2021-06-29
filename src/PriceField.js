import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function PriceField(props) {
    const [placeHolder, setPlaceHolder] = useState(props.placeHolder);   
    const [enabled, setEnabled] = useState(props.enabled);   
    
    return (
        <tr>
        <td style={props.style}>{props.displayName}:</td>
        <td><div>
        <table><tbody><tr><td>
        <input type="checkbox" name ={props.name + "Enabled"} checked={enabled} onChange={ele => {setEnabled(ele.target.checked)}}/>
        </td><td>
        <input name={props.name} placeholder={placeHolder} key={uuidv4()} disabled = {!enabled}/>
        </td></tr></tbody>
        </table></div></td></tr>
    )
}
export default PriceField;
