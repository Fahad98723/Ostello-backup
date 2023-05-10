import React from "react";
import { BsChevronLeft } from 'react-icons/bs';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

// import './style.css';
import Button from "../../../../../components/button";

const AvailableEmi = ({ handleActive }) => {
    return ( 
        <div className="shadow-2 rounded-3xl p-9 md:h-screen">
                <div onClick={() => handleActive("main")} className="flex items-center font-color-one capitalize mb-6 font-medium text-base cursor-pointer"> <BsChevronLeft className="mr-4" />Bank</div>
                <h2 className="text-xl font-medium font-color-one">Check available EMI options</h2>
                <input type="number" className="input w-full md:w-3/4 text-xl font-color-one font-medium border1 py-2 pl-5 pr-10 mt-5 rounded-lg " />
                <div className="flex items-start mt-7 mb-12 select-none">
                    <AiOutlineExclamationCircle className="mr-3 font-color-one" />
                    <span className="text-base md:w-80 notice">Please enter the registered mobile number with Federal Bank. We’ll check for available EMI options.</span>
                </div>
                <Button onClick={()=>handleActive("EmiAccordion")} content="Check" className="check w-full md:w-3/4 rounded-lg" /> 
        </div>
    );
}

export default AvailableEmi;