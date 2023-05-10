import React, { useEffect, useState } from "react";
// import './style.css'
import RubeeOne from "../../../assets/RubeeLight.svg";
import RubeeTwo from "../../../assets/RubeePurple.svg";
import RubeeThree from "../../../assets/RubeeRed.svg";
import RubeeFour from "../../../assets/RubeeGray.svg";
import Button from "../../../components/button";
import { selectCourse } from "../../../../../../redux/slices/courseSlice";
import { useSelector } from "react-redux";
import { InstiutesWith99 } from "../../../../../CochingWith99/Data";

const RubeeLight = (
  <img src={RubeeOne.src} alt="" className="inline mr-1 mb-1 " />
);
const RubeePurple = (
  <img src={RubeeTwo.src} alt="" className="inline mr-1 mb-1 " />
);
const RubeeRed = (
  <img src={RubeeThree.src} alt="" className="inline mr-1 mb-1 " />
);
const RubeeGray = (
  <img src={RubeeFour.src} alt="" className="inline mr-1 mb-1 " />
);

const MoneyDetails = ({
  item,
  applied,
  handleProceed,
  effPrice,
  emiPrice,
  grossPrice,
  discountPrice,
  minimumPrice,
  currentInstitute,
}) => {
  const { grossprice, effectiveprice, discountprice, coupon } = item;
  let discount = grossPrice - effPrice;

  const [total, setTotal] = useState();
  const [couponPrice, seteCouponPrice] = useState();

  const { currentCourse } = useSelector(selectCourse);

  useEffect(() => {
    if (applied) {
      if (InstiutesWith99.find((a) => a === currentInstitute?.id)) {
        if (!currentCourse?.pricingdetails?.oneTime) {
          seteCouponPrice(Math.floor(grossPrice - 99));
        } else {
          seteCouponPrice(
            Math.floor(discountPrice * (coupon?.discountrate / 100))
          );
        }
      } else {
        seteCouponPrice(
          Math.floor(discountPrice * (coupon?.discountrate / 100))
        );
      }
    }
  }, [applied, currentInstitute?.id]);

  useEffect(() => {
    if (InstiutesWith99.find((a) => a === currentInstitute?.id)) {
      if (!currentCourse?.pricingdetails?.oneTime) {
        if (couponPrice) {
          setTotal(Math.floor(grossPrice - couponPrice));
        } else {
          setTotal(Math.floor(grossPrice - discount));
        }
      } else {
        if (couponPrice) {
          setTotal(Math.floor(grossPrice - discount - couponPrice));
        } else {
          setTotal(Math.floor(grossPrice - discount));
        }
      }
    } else {
      if (couponPrice) {
        setTotal(Math.floor(grossPrice - discount - couponPrice));
      } else {
        setTotal(Math.floor(grossPrice - discount));
      }
    }
  }, [currentInstitute?.id, couponPrice]);

  return (
    <div className="w-full mt-3 rounded-md bg-[#F0ECFA] border-2 border-[#7D23E0] shadow px-3 py-1">
      <div className=" text-[16px] flex justify-between">
        <div className="mt-1 font-bold">Original Price</div>
        <div className="mt-1 font-medium">
          {" "}
          {grossPrice} {RubeeLight}
        </div>
      </div>
      {applied && (
        <div className="flex justify-between">
          <div className="font-color-two font-medium">Coupon</div>
          <div className="font-color-two font-medium">
            {" "}
            -{couponPrice} {RubeePurple}
          </div>
        </div>
      )}
      {InstiutesWith99.find((a) => a === currentInstitute?.id) &&
      !currentCourse?.pricingdetails?.oneTime &&
      applied ? (
        " "
      ) : (
        <div className="flex justify-between mt-3 border-b-[2px] border-dashed border-b-[#7D23E0]">
          <div className="discount font-medium">Discount</div>
          <div className="discount font-medium mb-2">
            {" "}
            -{discount} {RubeeRed}
          </div>
        </div>
      )}
      <div className="flex justify-between">
        <div className="font-color-one text-2xl mt-3 font-bold">
          Grand Total
        </div>
        <div className="font-color-one text-2xl mt-3 font-medium">
          {" "}
          {total} {RubeeGray}
        </div>
      </div>
      <div className="XYZ-duration text-primary text-[10px] mt-1">
        EMI: {item?.duration?.split(",").join(" ")} days @{item?.emi} Rs
      </div>
      <div className="w-[320px] mx-auto flex flex-col items-center justify-center mt-5 pb-3">
        <button
          onClick={handleProceed}
          className="rounded-md bg-primary text-white capitalize text-normal w-full py-2"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default MoneyDetails;
