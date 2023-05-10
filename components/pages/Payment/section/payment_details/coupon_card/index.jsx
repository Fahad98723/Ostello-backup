import React from "react";
import { RiCoupon3Line } from "react-icons/ri";
import { BiChevronRight } from "react-icons/bi";

// import './style.css'
const CouponCard = ({ item, handleActive }) => {
  return (
    <div>
      <div
        className={`shrink pl-3 pr-2 py-1  rounded-md font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-[#7D23E0] first-letter:transition ease-in-out m-0 focus:outline-none text-[20px] mt-2 flex`}
      >
        <input
          type="text"
          autoFocus
          className="text-[20px] bg-white  focus:outline-none w-full"
          name="coupon code"
          placeholder="Type your coupon code here..."
          // onChange={(e) => handleChange(e, setPincode)}
          // value={pincode}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            // handleGenerateFromPincode(pincode);
          }}
          className="text-xs p-1 px-2 bg-primary text-white m-1 rounded-md"
        >
          Apply
        </button>
      </div>
      {/* <button
        onClick={handleActive}
        className={
          `coupon w-[350px] mt-3 shadow border-2 border-[#005FFF] rounded-md radius px-3 py-1 text-xl font-bold` +
            !item.promode &&
          `coupon w-[350px] mt-3 shadow border-2 border-[#005FFF] rounded-md radius px-3 py-1 text-xl font-bold cursor-pointer`
        }
      >
        <div className="flex justify-between items-center">
          <div className="text-[14px] text-primary font-bold flex justify-center items-center">
            <RiCoupon3Line className="inline mr-1 text-primary font-bold" />
            Use coupons
          </div>
          <BiChevronRight className="inline mr-1 text-[14px] text-primary font-bold" />
        </div>
      </button> */}
      <p onClick={handleActive} className='text-right text-[#7D23E0] font-bold mt-2 cursor-pointer'>Find more coupons here</p>
    </div>
  );
};

export default CouponCard;
