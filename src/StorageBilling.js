import React, { useEffect, useState } from 'react';
import Radio from './Radio';
import PriceField from './PriceField';
import PriceRange from './PriceRange';

function StorageBilling() {

    const placeHolder ="$HKD";
    const defaultUnit = "GB";
    const displayNameStyle = {fontSize: "14", fontWeight: "bold", textAlign: "right", width:"25%"};
    const [priceRange, setPriceRange] = useState([{am: '0', th: 'Unlimited', sur: '1', sun: defaultUnit}]);

    const [billingType, setBillingType] = useState("Meter");
    const [destinationCharging, setDestinationCharging] = useState('Largest Storage Size');
    const [sizeChargingByType, setSizeChargingByType] = useState("Compressed");
    const [storageInfo, setStorageInfo] = useState();


    const loadData = async () => {
      let result = await fetch(`http://192.168.22.44:50459/sms/storage/GetStorageInfo.do`);
      console.log(result);
      let jsonData = await result.json();
      if (jsonData.success) {
        console.log("ran");
        let userInfo = [];
          jsonData.data.forEach(userInfo => {
            console.log(userInfo);
          })
      }
    }

    useEffect(() => {
      loadData();
    });

    function specialUpdate(val) {
        setSizeChargingByType(val);
    }
  
    
  return (
    <form>
      <table>
        <tbody>
            <Radio displayName="Billing Type" name="billingType" options={['Meter','Storage','Hybrid']} updateValue={setBillingType} value={billingType} style = {displayNameStyle}/>
            <Radio displayName="Destination Charging" name="destinationCharging" options={['Largest Storage Size','Storage Size Total']}  updateValue={setDestinationCharging} value={destinationCharging} style = {displayNameStyle}/>
            <Radio displayName="Data Size Charging By" name="dataSizeChargingBy" options={['Compressed','Uncompressed']}  updateValue={specialUpdate} value={sizeChargingByType} style = {displayNameStyle}/>
            <PriceField displayName="Minimum Charge" name="minimumCharge" placeHolder={placeHolder} enabled={false} style = {displayNameStyle}/>
            <PriceRange displayName="Thresholds" name="thresholds" placeHolder={placeHolder} unit={defaultUnit} style = {displayNameStyle} priceRange={priceRange} updatePriceRange={setPriceRange}/>
            <tr><td></td><td><button type = "submit">submit</button></td></tr>
        </tbody>
    </table>
    </form>
  )

}
export default StorageBilling;
