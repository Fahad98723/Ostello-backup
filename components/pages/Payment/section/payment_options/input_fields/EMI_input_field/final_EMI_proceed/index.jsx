import React from "react";
// import './final_emi.css'
import PaymentCard from '../../../../../components/paymentCard/index'

const FinalProceed = ({ handleActive }) => {
    return (
        <PaymentCard>
            <div className="capitalize font-color-one font-medium text-lg">bank</div>
            <div className="flex justify-between items-start md:items-center flex-col md:flex-row my-7">
                <div className="text-xl md:text-2xl font-bold font-color-one">18 EMIs at Rs. 20.534/month</div>
                <button onClick={ () => handleActive("EmiAccordion")} className="change py-1 px-3 font-medium font-base rounded-lg my-3 md:my-0">Change</button>
            </div>
            <div className="font-color-one mb-4">Name on card</div>
            <input type="text" placeholder="Name on card" className="p-5 w-full input-bg" />

            <div className="font-color-one mt-9 mb-4">Card Number</div>
            <input type="number" placeholder="xxxx xxxx xxxx xxxx" className="p-6 w-full input-bg" />

            <div className="flex flex-col md:flex-row">
                <div className="w-full">
                    <div className="font-color-one mt-9 mb-4">Expiry Date</div>
                    <input type="text" placeholder="MM/YY" className="p-6 w-full input-bg" />
                </div>
                <div className="w-full">
                    <div className="font-color-one mt-9 mb-4">Security Code</div>
                    <input type="password" placeholder="CVV/CVC" className="p-6 w-full input-bg ml-2" />
                </div>
            </div>

            <input type="checkbox" className="mr-3 mt-9 w-5 h-5" />
            <span form="checkbox" className="font-color-one">Remember this card</span>
        </PaymentCard>        
    )
}
export default FinalProceed