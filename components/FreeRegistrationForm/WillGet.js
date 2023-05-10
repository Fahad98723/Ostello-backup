import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-elastic-carousel";
import useScreenWidth from "../hooks/useScreenWidth";
import img1 from "../../assets/assets/freereg/img(1).png";
import img2 from "../../assets/assets/freereg/img(2).png";
import img3 from "../../assets/assets/freereg/img(3).png";
import img4 from "../../assets/assets/freereg/img(4).png";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, setAuthModalState } from "../../redux/slices/authSlice";

const WillGet = ({handleOpen}) => {
  const carousel = useRef(null);
  const router = useRouter();
  const feedbacks = [
    {
      id: 1,
      name: "Anigrah",
      work: "Cuet Student",
      img: img1,
      reviewText: "Access to your desired coaching at ₹99 only!",
    },
    {
      id: 2,
      name: "Anvisha",
      work: "Student",
      img: img2,
      reviewText:
        "10 days money back guarantee if you are don’t find the coaching satisfactory ",
    },
    {
      id: 3,
      name: "Imaan",
      work: "Student",
      img: img3,
      reviewText: "Discounts on your nearest fast food joints",
    },
    {
      id: 4,
      name: "Imaan",
      work: "Student",
      img: img4,
      reviewText: "Irresistible offers to gyms and salons",
    },
  ];

  const screenWidth = useScreenWidth();

  const dispatch = useDispatch();



  const { isAuthenticated, userData } = useSelector(authSelector);


  return (
    <div>
      <div className="mb-5 mt-10">
        <p className="md:text-[40px] text-[24px] font-[600] mb-5">
          What You will get
        </p>
        <div className=" grid md:grid-cols-4 gap-8">
          {feedbacks?.map((item, index) => (
            <>
              <div
                key={index}
                className=" bg-white p-5 p-3  mx-auto w-full  rounded-[12px] shadow-md group py-10"
              >
                <div className="flex justify-center">
                  <div className="flex gap-2 items-center">
                    <div>
                      <img
                        className=" mx-auto  rounded-full "
                        src={item.img.src}
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <p className="text-left text-[12] md:text-[17px] text-center pt-5 ease-out duration-300">
                  {item?.reviewText}
                </p>
              </div>
            </>
          ))}
        </div>

        <p
          onClick={() => {
            if (isAuthenticated) {
              router.push("/free-registration-form");
            } else {
              handleOpen()
              dispatch(setAuthModalState(2));
            }
          }}
          className="px-8 py-2 bg-primary w-full md:w-[280px] mx-auto md:my-8 my-3 rounded-md text-[20px] text-center text-white cursor-pointer"
        >
          I want to join!
        </p>
      </div>
    </div>
  );
};

export default WillGet;
