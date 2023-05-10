import React, { useEffect, useState } from 'react';
import icon1 from '../../../../../../assets/merchantDashboard/DashboardHome/Icon.png'
import icon2 from '../../../../../../assets/merchantDashboard/DashboardHome/Incon.png'
import icon3 from '../../../../../../assets/merchantDashboard/DashboardHome/Icon (1).png'
import { host } from '../../../../../../utils/constant';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../../../../redux/slices/authSlice';
const HeaderCard = ({revenueData}) => {


const { instituteDetails } = useSelector(authSelector);

    return (
        <div>
        <div className="grid grid-cols-8  gap-6">
          
          <div className="bg-white p-6 flex items-center  rounded-2xl col-span-8 md:col-span-2">
            <div className="icon">
                <img src={icon1.src} alt="" />
            </div>
            <div className="details ml-4">
                    <h1 className='text-2xl font-bold'>{revenueData?.coursesSold || 0}</h1>
                    <p className='text-base'>Courses Sold</p>
            </div>
          </div>
          <div className="bg-white p-6 flex items-center  rounded-2xl  col-span-8 md:col-span-2">
          <div className="icon">
                <img src={icon2.src} alt="" />
            </div>
            <div className="details ml-4">
                    <h1 className='text-2xl font-bold'>₹ {revenueData?.totalRevenue || 0}</h1>
                    <p className='text-base'>Revenue Collected</p>
            </div>
          </div>
  
          <div className="bg-white p-6 flex items-center  rounded-2xl  col-span-8 md:col-span-2">
          <div className="icon">
                <img src={icon3.src} alt="" />
            </div>
            <div className="details ml-4">
                    <h1 className='text-2xl font-bold'>{revenueData?.totalStudent || instituteDetails?.studentsenrolled || 0}</h1>
                    <p className='text-base'>Students Enrolled</p>
            </div>
          </div>
        </div>
  
        <div className="mt-4 ">
          {/* <Charts></Charts> */}
        </div>
      </div>
    );
};

export default HeaderCard;