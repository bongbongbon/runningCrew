import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
// import Location from './KakaoMap';

const DaumAddress = () => {
    const[address, setAddress] = useState('');

    const completeHandler = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 

        if(data.addressType === 'R') {
            if(data.bname !== '') {
                extraAddress += data.bname;
            }

            if(data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }

            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');

        }
        setAddress(fullAddress);
    };

    return (
        <div>
          <DaumPostcode onComplete={completeHandler} />
        </div>
      );

}
export default DaumAddress;