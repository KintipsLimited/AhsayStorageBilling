import React, { useState, useEffect } from 'react';
import Select from './Select';


function PriceRange(props) {
    const unitsTxt = ["GB", "TB", "PB"]; 
    const valueTxt = ["1", "1024"];
    const [priceRange, setPriceRange] = useState(props.priceRange);
    const [selectedUnit, setSelectedUnit] = useState(props.unit); 
    const [style, setStyle] = useState(props.style); 

    const addRow = (priceRange) => {
        if (priceRange.length > 20) {
            alert("Cannot set more than 20 thresholds of prices");
            return;

        }
        const prevEle = priceRange[priceRange.length-2];
        const currEle = {th : prevEle ? prevEle.th : '0', am : prevEle ? prevEle.am : '0', sur : prevEle ? prevEle.sur : '1', sun: prevEle ? prevEle.sun : selectedUnit};
        const tempArray = [... priceRange];
        tempArray.splice(tempArray.length-2 < 0 ? 0 : tempArray.length-2, 0, currEle);
        setPriceRange(tempArray);
    }

    const removeRow = (priceRange, index) => {
        const tempArray = [... priceRange];
        tempArray.splice(index, 1);
        setPriceRange(tempArray);
    }

    const updatePriceRange = (ele, index) => {
        const type = ele.target.id.replace(/\d+/g, '');
        let val = ele.target.value;
        const typeDisplay = (type !== null && type === "am") ? "Amount" : "Quantity";
        if (Number(val) < 0) {
            alert(typeDisplay + " cannot be negative"); 
            return;
        }
        const tempPriceRange = [...priceRange];
        tempPriceRange[index][type] = val;
        //if (index > 1 && Number(tempPriceRange[index-1].th) > Number(ele.target.value)) {
        //     alert("Previous threshold cannot be greater than Current" + Number(tempPriceRange[index-1].th) + ">" + Number(ele.target.value))
        //    return;
        //}
        if (type !== null && type.trim() === "th") tempPriceRange.slice(index, tempPriceRange.length).forEach((laterEle)=> Number(laterEle[type]) < Number(val) ? laterEle[type] = val : "" )
        setPriceRange(tempPriceRange);
    }

    const updateSelectedDropDown = (val, type, index) => {
        const tempPriceRange = [...priceRange];
        tempPriceRange[index][type] = val;
        setPriceRange(tempPriceRange);
    }

    useEffect (() => {
        props.updatePriceRange(priceRange);
    }, [priceRange]
    )

    useEffect (() => {
        const tempPriceRange = [...priceRange];
        tempPriceRange.forEach((ele) => {
            if (unitsTxt.indexOf(ele.sun) !== unitsTxt.indexOf(selectedUnit)) {
                ele.sun = unitsTxt[unitsTxt.indexOf(selectedUnit)];
                ele.sur = '1'; //If we reset the units to be the same, then the quantity should be zero
            }
        }
        );
        setPriceRange(tempPriceRange);
    }, [selectedUnit]
    )

    const getPerQuantityRange = (ele, prevEle) => {
        let [eleThreshold, eleSelectedUnit, eleSelectedPerValue] = [ele.th, ele.sun, ele.sur];
        if (eleThreshold !== "" && eleThreshold !== "Unlimited" && unitsTxt.indexOf(selectedUnit) <= unitsTxt.indexOf(eleSelectedUnit)) {
            let disabledIndex = 0;
            if ( Number(eleThreshold) !== NaN) {
                valueTxt.forEach((level, index) => {
                    disabledIndex = Number(eleThreshold) - (prevEle? Number(prevEle.th): 0) >= level ? index : disabledIndex;
                });
            }
            if (valueTxt.indexOf(eleSelectedPerValue) > disabledIndex) ele.sur = valueTxt[disabledIndex];
            return disabledIndex;
        };
    }

    const toTwoDp = (ele, index) => {
        const type = ele.target.id.replace(/\d+/g, '');
        let val = Number(ele.target.value).toFixed(2);
        const tempPriceRange = [...priceRange];
        tempPriceRange[index][type] = val;
    
        setPriceRange(tempPriceRange)
    }


    const getpriceRangeTr = (array) => {
        array = [...array];
        return (array.map((ele,index) => {return (
            <tr className = "priceRow" key = {"trth" + index}>
                <td>
                    <input value= {index-1 < 0 ? 0 : array[index-1].th} disabled/>
                    <span style={{width:"32px", textAlign: "center", display: "inline-block"}}>{selectedUnit} </span>
                </td>
                <td> - </td>
                <td>
                    <input value = {ele.th} name = {"th[" + index + "]"} id ={"th" + index} key = {"th" + index} onChange = { (ele) => updatePriceRange(ele, index)} disabled = {index===array.length-1}/> 
                    <span style={{width:"32px", textAlign: "center", display: "inline-block"}}>{selectedUnit} </span>
                </td>
                <td>
                    <span style={{fontSize: "12", marginLeft:"20px"}}>Amount ($HKD): </span>
                    <input value={ele.am}  name = {"priceRange[" + index + "].price"} id ={"am" + index} key = {"am" + index} onChange = { (ele) => updatePriceRange(ele, index)} onBlur = { (ele) => toTwoDp(ele, index) } />
                </td>
                <td>
                    <span style={{fontSize: "12", margin:"5px"}} >per </span>
                    <Select  name = {"priceRange[" + index + "].quantity"} options = {valueTxt} updateSelect={val => updateSelectedDropDown(val, 'sur', index)} selected = {ele.sur} 
                    disabledIndex = {getPerQuantityRange(ele, array[index-1])}/> 
                    <Select name = {"sun[" + index + "]"} options = {unitsTxt} updateSelect={val => updateSelectedDropDown(val, 'sun', index)} selected = {ele.sun} disabledIndex = {unitsTxt.indexOf(selectedUnit)}/> 
                </td>
                <td style = {{width:"100px"}}>
                { array.length-1 !== index && array.length > 1 && <input type="button" onClick ={ () => removeRow(priceRange, index)} value = "Remove"/> }
                </td>
            </tr>
            )}));
    };    

    return (
        <tr>
        <td style={{...style, verticalAlign:"top"}}>{props.displayName}:<br/><br/>
        <Select options = {unitsTxt} updateSelect={val => setSelectedUnit(val)} selected = {selectedUnit}/>
        </td>
        <td>
        <table className="priceRange"><tbody>
        {getpriceRangeTr(priceRange)}
        <tr><td>
        <input type="button" onClick ={ () => addRow(priceRange)} value = "Add"/>
        </td></tr>
        </tbody>
        </table></td>
        </tr>
    )
}
export default PriceRange;
