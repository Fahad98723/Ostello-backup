import React, { useState } from "react";
import { BsChevronDown } from 'react-icons/bs';

import PaymentCard from "../../../../components/paymentCard";
import SecureConnection from "../../../../components/secure_connection";
import Data from './data';
import { Dropdown, Option } from "../../../../components/dropdown/Dropdown";
// import '../MobileWallets_input_field/style.css';
import { useDispatch } from "react-redux";
import { setCreateOrder } from "../../../../../../../redux/slices/orderSlice";

const NetbankingInputField = () => {
    const [open, isOpen] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (name) => {
        const orderData = {
            method: 'netbanking',
            bank: name,
        };
        dispatch(setCreateOrder(orderData))}

    return (
        <PaymentCard className="text-gray-600">
            <h4>In order to complete your transaction, we will transfer you over to Razorpay’s secure servers.</h4>
            <h4 className="mt-7 mb-9">Select your bank from the drop-down below and proceed towards your payment.</h4>

            <div className="relative w-full md:w-6/12 ">
                <div className="absolute top-5 right-4"><BsChevronDown className={open ? "-rotate-180" : ""} /></div>
                <Dropdown onClick={() => isOpen(!open)} onChange={(e)=> handleChange(e.target.value.split("-")[1])} name="wallet" className="select px-8 py-4 appearance-none w-full bg-[#F4F4F4] rounded-[10px]">
                    {Data.map(d => (
                        <Option key={d.id} className="select">{d.title}-{d.code}</Option>
                    ))}
                </Dropdown>
            </div>
            
            <SecureConnection />
        </PaymentCard>
    )
}

export default NetbankingInputField