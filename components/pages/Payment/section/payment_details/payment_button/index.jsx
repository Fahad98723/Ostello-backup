import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../../../../../redux/slices/authSlice";
import { selectCourse } from "../../../../../../redux/slices/courseSlice";
import {
  getOrderResponse,
  selectOrder,
} from "../../../../../../redux/slices/orderSlice";

import Button from "../../../components/button/index";
// import './style.css'
import toast from "react-hot-toast";
import { host } from "../../../../../../utils/constant";

const PaymentButton = ({ item,applied, content, icon,handlePartialPayment,currentInstitute,handleModalClose }) => {
  const { grossprice,effectiveprice,coupon} = item;
  
  
  let discount = grossprice - effectiveprice;
  let couponPrice = 0;
  if (applied) {
    couponPrice = coupon?.maxdiscountprice;
  }
  let total = grossprice - discount - couponPrice;

  
  

  return (
    <>
    <div className=' md:hidden w-[300px] mt-3 flex flex-col items-center justify-center'> 
    <Button
      onClick={makePayment}
        content={content}
        className='rounded-[10px] capitalize text-normal w-full mt-3'
      />
      <Button
      onClick={handlePartialPayment}
        content={'Pay Partial'}
        className='rounded-[10px] capitalize text-normal w-full mt-3'
      />
      </div>
    </>
  );
};

export default PaymentButton;
