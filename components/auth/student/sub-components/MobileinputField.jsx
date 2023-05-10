import React, { useState } from 'react';
import PhoneInput from "react-phone-number-input";

const Input = () => {
    const [value, setValue] = useState("+91");
    const [mobileNumber, setMobileNumber] = useState("");
    const [mobileNumberError, setMobileNumberError] = useState("");

    return (
        <div className="my-10 h-10 px-4 rounded-lg border border-gray lg:w-5/5 flex items-center">
                <PhoneInput
                    className="w-10"
                    placeholder="Enter your mobile number"
                    defaultCountry="IN"
                    value={value}
                    onChange={setValue}
                    international
                />
                <p className="py-2">{value}</p>
                <p className="px-2 text-3xl text-gray">|</p>
                <input type="number" className='w-full outline-none' placeholder='Enter Your Number' />
        </div>
    )
}

export default Input