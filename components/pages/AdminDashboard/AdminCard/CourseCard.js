import React, { useEffect } from "react";
// import img from '../../util/assets/images/courseBanner.png'
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";
import defaultImage from "../../../../assets/courseImg.png";
import { useState } from "react";
const CourseCard = ({ data }) => {
  const [priceRef, setPriceRef] = useState("");
  const [effPrice, setEffPrice] = useState(data?.effectiveprice);
  const [emiPrice, setEmiPrice] = useState(data?.emi);
  const [grossPrice, setGrossPrice] = useState(data?.grossprice);
  const [discountPrice, setDiscountPrice] = useState(data?.discountprice);
  const [minimumPrice, setMinimumPrice] = useState(data?.minimumprice);

  useEffect(() => {
    if (data?.pricingdetails?.yearly?.grossprice > 0) {
      setEffPrice(data?.pricingdetails?.yearly?.effectiveprice);
      setGrossPrice(data?.pricingdetails?.yearly?.grossprice);
      setEmiPrice(data?.pricingdetails?.yearly?.emi);
      setDiscountPrice(data?.pricingdetails?.yearly?.discountprice);
      setMinimumPrice(data?.pricingdetails?.yearly?.minimumprice);
    }

    if (data?.pricingdetails?.halfYearly?.grossprice > 0) {
      setEffPrice(data?.pricingdetails?.halfYearly?.effectiveprice);
      setGrossPrice(data?.pricingdetails?.halfYearly?.grossprice);
      setEmiPrice(data?.pricingdetails?.halfYearly?.emi);
      setDiscountPrice(data?.pricingdetails?.halfYearly?.discountprice);
      setMinimumPrice(data?.pricingdetails?.halfYearly?.minimumprice);
    }

    if (data?.pricingdetails?.monthly?.grossprice > 0) {
      setEffPrice(data?.pricingdetails?.monthly?.effectiveprice);
      setGrossPrice(data?.pricingdetails?.monthly?.grossprice);
      setEmiPrice(data?.pricingdetails?.monthly?.emi);
      setDiscountPrice(data?.pricingdetails?.monthly?.discountprice);
      setMinimumPrice(data?.pricingdetails?.monthly?.minimumprice);
    }

    if (data?.pricingdetails?.oneTime?.grossprice > 0) {
      setEffPrice(data?.pricingdetails?.oneTime?.effectiveprice);
      setGrossPrice(data?.pricingdetails?.oneTime?.grossprice);
      setEmiPrice(data?.pricingdetails?.oneTime?.emi);
      setDiscountPrice(data?.pricingdetails?.oneTime?.discountprice);
      setMinimumPrice(data?.pricingdetails?.oneTime?.minimumprice);
    }
    if (
      !data?.pricingdetails?.yearly?.effectiveprice &&
      !data?.pricingdetails?.halfYearly?.effectiveprice &&
      !data?.pricingdetails?.monthly?.effectiveprice &&
      !data?.pricingdetails?.oneTime?.effectiveprice
    ) {
      // setPriceRef('')
      setEffPrice(data?.effectiveprice);
      setGrossPrice(data?.grossprice);
      setEmiPrice(data?.emi);
      setDiscountPrice(data?.discountprice);
      setMinimumPrice(data?.minimumprice);
    }
  }, [
    priceRef,
    data?.pricingdetails?.yearly,
    data?.pricingdetails?.halfYearly,
    data?.pricingdetails?.monthly,
    data?.pricingdetails?.oneTime,
    data,
  ]);

  

  let faculty = [];

  data?.faculties?.forEach((element) => {
    faculty.push(element.name);
  });

  return (
    <div className="p-4 bg-white rounded-[2.5rem] shadow-md">
      <div className="flex flex-col">
        <img
          className="rounded-t-xl h-[250px]"
          src={
            data?.images.length
              ? `https://cdn.ostello.co.in/${data?.images[0]?.key}`
              : defaultImage.src
          }
          alt=""
        />
        <div className="my-5 flex-col flex px-4">
          <div className="flex justify-between">
            <Link
              prefetch={false}
              href={`/admin-dashboard/courses/review-course/${data?.id}`}
              className=" text-[18px] cursor-pointer font-semibold leading-[30px] "
            >
              {data.name}
            </Link>

            <div className="flex bg-[#FFD130] px-3 py-0 text-white font-bold rounded-lg  items-center">
              {data.rating}
              <AiFillStar className="ml-1" />
            </div>
          </div>
          <div className=" ">
            <div className="">
              <p className="text-md font-bold"> {data?.category?.name}</p>
              {data?.category?.classes?.length ||
              data?.category?.exams?.length ? (
                <p className="text-md">
                  {" "}
                  {data?.category?.classes.length
                    ? data?.category?.classes
                    : data?.category?.exams}
                </p>
              ) : (
                ""
              )}

              {data?.faculties.map((a) => (
                <p className="text-md font-bold" key={a?.id} style={{}}>
                  {" "}
                  {a?.name}{" "}
                </p>
              ))}
            </div>
          </div>
          <h3 className="font-bold text-xl">Rs. {grossPrice}</h3>
          <del className="text-sm text-[#FF0000]">Rs.{discountPrice}</del>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
