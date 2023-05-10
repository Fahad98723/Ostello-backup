import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCreateOrder } from '../../../../../../../redux/slices/orderSlice';
import PaymentCard from '../../../../components/paymentCard';
import SecureConnection from '../../../../components/secure_connection';

const UpiInputField = () => {
    const [upi, setUpi] = useState('');
    const dispatch = useDispatch();
    const orderData = {
        method: 'upi',
        upi: upi,
    };

    return (
        <PaymentCard>
            <div className="font-color-one mb-4">PAY USING UPI ID</div>
            <div>
                <input
                    onChange={(e) => setUpi(e.target.value)}
                    onBlur={() => dispatch(setCreateOrder(orderData))}
                    type="text"
                    placeholder="Enter your UPI ID"
                    className="p-5 w-full bg-[#F4F4F4] rounded-[10px]"
                />
            </div>
            <h4 className="mt-5">
                In order to complete your transaction, we will transfer you over
                to Razorpays’s secure servers.
            </h4>
            <SecureConnection />
        </PaymentCard>
    );
};

export default UpiInputField;
