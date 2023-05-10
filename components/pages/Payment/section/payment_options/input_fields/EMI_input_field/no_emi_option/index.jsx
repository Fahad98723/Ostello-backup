import React from "react";
import { BsChevronLeft } from 'react-icons/bs';
import { AiOutlineExclamation } from 'react-icons/ai';

// import './style.css';
import Button from '../../../../../components/button/index'

const NoEmi = ({title, number}) => {
    return (
        <div className="rounded-3xl shadow-2 p-9 w-full">
            <div className="flex items-center font-color-one capitalize mb-6 font-medium text-lg"> <BsChevronLeft className="mr-4 " /> {title}</div>
            <div className="flex justify-center items-center flex-col">
                <AiOutlineExclamation className="exclaimation text-2xl" />
                <h3 className="mt-9  mb-4 font-color-one text-xl font-medium">No EMI options available for {number}</h3>
                <p className="leading-6 font-medium text-xl w-5/12 text-center">Please check if the number entered is correct and linked to the bank account or try another payment method</p>
                <Button content="Try another mobile number" className="btn w-4/12 mt-14"/>
            </div>
        </div>
    )
}

export default NoEmi