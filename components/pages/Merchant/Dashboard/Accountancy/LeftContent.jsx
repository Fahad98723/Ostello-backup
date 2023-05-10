import React from "react";
import img1 from "../../../../../assets/merchantDashboard/Accountancy/Vector.png";
import img2 from "../../../../../assets/merchantDashboard/Accountancy/image 1782 (Traced).png";
import { AiOutlineArrowUp } from "react-icons/ai";
// import Charts from "../Chart/Charts";
import dynamic from 'next/dynamic';

const Charts = dynamic(() => import('../Chart/Charts'), { ssr: false });
const LeftContent = () => {
  return (
    <div>
      <div className="grid grid-cols-6  gap-6">
        
        <div className="bg-white  flex flex-col justify-between rounded-2xl col-span-6 md:col-span-2">
          <div className="acountancy-card mb-0 ">
            <h3 className="mb-8 ">Send Money To Bank</h3>
            <img src={img1.src} className="" style={{ margin: "0 auto" }} alt="" />
          </div>
          <div
            style={{ background: "rgba(125, 35, 224, 0.3)" }}
            className=" rounded-b-2xl"
          >
            <h3 style={{fontSize:'14px', color:'#7D23E0', fontWeight:'500'}} className="py-2.5 text-center">
              Request Money Transfer
            </h3>
          </div>
        </div>
        <div className="bg-white flex flex-col justify-between rounded-2xl  col-span-3 md:col-span-2">
          <div className="acountancy-card mb-0 ">
            <h3 className="mb-8">Total Orders</h3>
            <img src={img2.src} className="" style={{ margin: "0 auto" }} alt="" />
          </div>
          <div className="py-3 flex items-center justify-center gap-2.5">
            <h1 style={{}} className="text-center text-4xl font-bold">
              0{" "}
            </h1>

            <div className="flex items-center  gap-1 mb-3">
              <AiOutlineArrowUp className="text-xs font-bold text-green-700" />
              <p className="text-xs font-bold text-green-700">0%</p>
            </div>
          </div>
        </div>

        <div className="bg-white flex flex-col justify-between rounded-2xl  col-span-3 md:col-span-2">
          <div className="acountancy-card mb-0 ">
            <h3 className="mb-8">Average Orders</h3>
            <svg
              style={{ margin: "0 auto" }}
              width="88"
              height="89"
              viewBox="0 0 88 89"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M68.2 14H20.8C12.0739 14 5 21.064 5 29.7778V69.2222C5 77.936 12.0739 85 20.8 85H68.2C76.9261 85 84 77.936 84 69.2222V29.7778C84 21.064 76.9261 14 68.2 14Z"
                stroke="#7D23E0"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.91663 40.5827H84M28.6416 4.91602V22.7493V4.91602ZM60.275 4.91602V22.7493V4.91602Z"
                stroke="#7D23E0"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="py-3 flex items-center justify-center gap-2.5">
            <h1 style={{}} className="text-center text-4xl font-bold">
              0{" "}
            </h1>
            <div className="flex items-center  gap-1 mb-3">
              <AiOutlineArrowUp className="text-xs font-bold text-green-700" />
              <p className="text-xs font-bold text-green-700">0%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 ">
        <Charts></Charts>
      </div>
    </div>
  );
};

export default LeftContent;
