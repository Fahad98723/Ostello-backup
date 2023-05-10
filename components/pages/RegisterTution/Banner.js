import { useRouter } from "next/router";
import React from "react";
import image from "../../../assets/registerTution.png";
const Banner = () => {
  const router = useRouter()
  return (
    <div
      style={{
        background: "linear-gradient(90.13deg, #7D23E0 0.09%, #FFAB10 99.87%)",
      }}
      className=""
    >
      <div className=" md:max-w-[1250px] mx-auto ">
        <div className="md:grid md:grid-cols-2 gap-4 md:px-10 px-10 items-center">
          <div>
            <p className="md:text-[44px] text-[34px] font-semibold text-white">
              Register your Tuition Center
            </p>
            <ul className="md:text-[24px] text-[20px] text-white md:ml-10 md:my-10 my-3">
              <li>Get assure Compensation</li>
              <li>New Students enrolment</li>
              <li>Get easy access to all Ostello’s courses</li>
            </ul>

            <p onClick={() => {
              router.push('merchant/signup')

            }} className="bg-white hover:bg-[#7D23E0] hover:text-white cursor-pointer text-[#7D23E0] text-[21px] font-semibold py-2 rounded-[6px] md:w-[500px] text-center">Register Now</p>

          </div>
          <div>
            <img src={image.src} className='w-full' alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
