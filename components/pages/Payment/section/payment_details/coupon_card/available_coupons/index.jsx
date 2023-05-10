import React, { useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { useSelector } from "react-redux";
import paymentImage from "../../../../../../../assets/payment.png";
import { selectCourse } from "../../../../../../../redux/slices/courseSlice";
import { InstiutesWith99 } from "../../../../../../CochingWith99/Data";
// import './style.css'




const AvailableCoupon = ({
  item,
  handleActive,
  handleApplied,
  applied,
  effPrice,
  emiPrice,
  grossPrice,
  discountPrice,
  minimumPrice,
  currentInstitute
}) => {
  const { minimumprice, discountprice, coupon } = item;

  const [applieded, setApplieded] = useState(false);

  const [course99, setCourse99]  = useState(false)
  const { currentCourse } = useSelector(selectCourse);

  useEffect(() => {
    if(InstiutesWith99.find(a => a === currentInstitute?.id) && !currentCourse?.pricingdetails?.oneTime){
      setCourse99(true)
    }
    else{
      setCourse99(false)
    }
  },[currentInstitute?.id])

  return (
    <div className="available_coupon   rounded-3xl  ">
      {/* <button
        onClick={handleActive}
        className=" flex items-center border-0 font-bold"
      >
        <BsChevronLeft className="mr-3 font-color-one" />{" "}
        <span className="font-color-two">Coupons for you</span>
      </button> */}

      {/* <div className='enter_coupon flex justify-between mt-3'>
        <input
          type='text'
          placeholder='Enter coupon code'
          className='outline-none'
        />
        <button className='border-0 font-color-two uppercase text-lg'>
          apply
        </button>
      </div> */}

      <h3 className="text-xl font-color-one font-medium p-2 my-3">
        Available coupons
      </h3>

      {/* <div className="">
        <div
          className={`my-2 shadow p-3 ${
            !applied ? `bg-white` : `bg-primary`
          } rounded-xl`}
        >
          <p
            className={`${
              !applied ? `text-primary` : `text-white`
            }  text-lg md:text-xl`}
          >
            Get {coupon?.discountrate}% off up to Rs. {minimumPrice}
          </p>
          <p className={`${!applied ? `text-base` : `text-white`}  subtitle`}>
            Valid on total value of Rs. {discountPrice}
          </p>
          <div className="flex items-center justify-between mt-4">
            <div
              className={`coupon_name ${
                !applied ? `text-primary` : `text-white`
              }  text-xl uppercase`}
            >
              {coupon?.couponcode}
            </div>
            {applied ? (
              <button
                onClick={handleApplied}
                className="border-0 text-white uppercase text-base"
              >
                remove
              </button>
            ) : (
              <button
                onClick={handleApplied}
                className="border-0 text-primary uppercase text-base"
              >
                apply
              </button>
            )}
          </div>
        </div>
      </div> */}

      {
        course99 ? <div className="border-[2px]  border-dashed border-[#767676] bg-[#F0EBEB] rounded-md p-3">
        <div className=" grid grid-cols-5">
          <div className="col-span-2">
            <img className="w-[45px] h-[40px]" src={paymentImage.src} alt="" />
            <p className="text-[12px] text-[#767676]">Expires</p>
            <p className="text-[16px] ">04 Jan 2018</p>
            <p className="text-[14px] text-[#7D23E0]">
              Terms & Condition Apply
            </p>
          </div>
          <div className="col-span-3">
            <p className="text-[20px] font-bold">
              Get the courses with Rs. 90
              The remaining amount will come as scholarship sponsored by Ostello
            </p>
            <p
              onClick={(e) => {
                e.preventDefault();
                setApplieded(!applieded);
                handleApplied();
                handleActive();
              }}
              className={` p-1 cursor-pointer px-2 ${
                !applieded && applied  
                  ? "bg-primary text-white"
                  : "text-primary border-[1px] border-primary"
              } m-1 rounded-md text-center text-[13] font-semibold w-full mt-2`}
            >
              Redeem Now!
            </p>
          </div>
        </div>
      </div> : <div className="border-[2px]  border-dashed border-[#767676] bg-[#F0EBEB] rounded-md p-3">
        <div className=" grid grid-cols-5">
          <div className="col-span-2">
            <img className="w-[45px] h-[40px]" src={paymentImage.src} alt="" />
            <p className="text-[12px] text-[#767676]">Expires</p>
            <p className="text-[16px] ">04 Jan 2018</p>
            <p className="text-[14px] text-[#7D23E0]">
              Terms & Condition Apply
            </p>
          </div>
          <div className="col-span-3">
            <p className="text-[20px] font-bold">
              Get {coupon?.discountrate}% off up to Rs. {minimumPrice}
              Valid on total value of Rs. {discountPrice}
            </p>
            <p
              onClick={(e) => {
                e.preventDefault();
                setApplieded(!applieded);
                handleApplied();
                handleActive();
              }}
              className={` p-1 cursor-pointer px-2 ${
                !applieded && applied  
                  ? "bg-primary text-white"
                  : "text-primary border-[1px] border-primary"
              } m-1 rounded-md text-center text-[13] font-semibold w-full mt-2`}
            >
              Redeem Now!
            </p>
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default AvailableCoupon;
