import { useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa";

import {
  ArrowRightOutlined,
  HeartFilled,
  HeartOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import { AiOutlineRise, AiFillStar, AiOutlineShareAlt } from "react-icons/ai";
import { IoCashOutline } from "react-icons/io5";
import { RiTimerLine } from "react-icons/ri";
import defaultImage from "../../../../assets/images/courseImg.png";
import SharePopup from "../../../UI/SharePopup";
import { titleToUrl } from "../../../../utils/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { Host_ORIGIN } from "../../../../utils/constant";

import emiIcon from "../../../..//assets/icons/emi.svg";
import enrolledIcon from "../../../../assets/icons/enrolled.svg";
import locationIcon from "../../../../assets/icons/location.svg";
import { useDispatch, useSelector } from "react-redux";
import { institutesSelector } from "../../../../redux/slices/instituteSlice";
import { Rating } from "@mui/material";

const CourseCard = ({
  approval,
  category,
  description,
  shortdescription,
  effectiveprice,
  discoutprice,
  pricingdetails,
  duration,
  emi,
  faculties,
  faqs,
  grossprice,
  highlights,
  id,
  images,
  institute,
  minimumprice,
  mode,
  name,
  objetives,
  rating,
  ratingCount,
  requestApproval,
  studentsenrolled,
  syllabus,
  videos,
  classtype,
  promode,
  slug,
  slugId,
  slugUrl,
  locations,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [open, setOpen] = useState(false);
  const imageURL = images?.[0]?.key
    ? `https://cdn.ostello.co.in/${images?.[0]?.key}`
    : defaultImage?.src;
  const router = useRouter();

  const style = {
    color: "#767676",
    margin: "4px 0",
  };

  const getClassType = (num) => {
    if (num === 1) {
      return "Online";
    }
    if (num === 2) {
      return "Offline";
    }
    if (num === 3) {
      return "Hybrid";
    }
   
  };

  const { currentInstitute } = useSelector(institutesSelector);

  const { area, city } =
    institute?.locations?.[0] || currentInstitute?.locations?.[0];

  const course_url = `/institute/${titleToUrl(
    institute?.name
  )}/course/${id}/${name}
         
          
          `;

  const coupon = "50% off | Use WELCOME50";

  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const handleSelect = (e) => {
    e.preventDefault();
    setSelected(e.target.value);
    setError("");
  };
  return (
    <div>
      <div
        style={{
          boxShadow: "0px 0px 38.7368px -7.74737px rgba(125, 35, 224, 0.15)",
        }}
        className=" hover:scale-105  duration-300  relative rounded-lg  sm:w-[370px] w-full mx-auto min-h-[420px]  h-full "
      >
        <div className="select-none  ">
          <Link legacyBehavior prefetch={false} href={course_url}>
            <div className="flex items-center justify-center rounded-lg p-3 bg-[#EAECF0]">
              <img
                src={imageURL}
                className="w-full h-[160px]  rounded-lg relative"
                alt=""
              />
              <div
                style={{
                  background:
                    "linear-gradient(90.18deg, #7D23E0 -38.65%, #009EF7 62.68%)",
                }}
                className=" absolute top-6 left-6 flex text-white items-center px-2 py-1 text-[12px]  "
              >
                {/* <StarFilled /> */}
                <p className="">Trending Course</p>
              </div>
            </div>
          </Link>

          <div className="p-4 ">
            <div className="flex">
              <p
                onClick={(e) => {}}
                className={`font-medium text[12px] bg-light-gray  p-1 px-2 text-gray border-2 rounded-3xl font-bold  border-light-gray transition-transform duration-500 ease-in-out hover:shadow-2xl hover:scale-[1.1] mr-1`}
              >
                Tag
              </p>
              <p
                onClick={(e) => {}}
                className={`font-medium text[12px] bg-light-gray  p-1 px-2 text-gray border-2 rounded-3xl font-bold  border-light-gray transition-transform duration-500 ease-in-out hover:shadow-2xl hover:scale-[1.1] mr-1`}
              >
                Tag
              </p>
              <p
                onClick={(e) => {}}
                className={`font-medium text[12px] bg-light-gray  p-1 px-2 text-gray border-2 rounded-3xl font-bold  border-light-gray transition-transform duration-500 ease-in-out hover:shadow-2xl hover:scale-[1.1] mr-1`}
              >
                Tag
              </p>
            </div>
            <div>
              <div className="flex justify-between items-center  ">
                {/* <Link legacyBehavior prefetch={false} href={slugUrl}> */}
                <div>
                  <p className="text-[16px] font-[600] mt-1">{name}</p>
                  <p className="mt-1 text[15px]">
                    {institute.name || currentInstitute.name}
                  </p>
                </div>
              </div>
            </div>

            <div className=" ">
              <div className="text-gray ">
                {/* <p className=" font-bold"> {shortdescription}</p> */}

                <p className="text-[14px] my-1">{shortdescription}</p>

                <p className="text-[#7F56D9] font-semibold text-[14px] mr-2 md:mr-0 ">
                  INR{" "}
                  {Object.entries(pricingdetails).length
                    ? pricingdetails?.yearly?.effectiveprice ||
                      pricingdetails?.halfYearly?.effectiveprice ||
                      pricingdetails?.monthly?.effectiveprice
                    : effectiveprice}
                </p>
              </div>
            </div>
            <div className=" flex justify-between items-center">
              <div className="text-gray text-[14px] flex items-center">
                <p className={`text-[#faaf00]  font-semibold mr-1`}>{rating}</p>
                <Rating
                  className={`mr-2`}
                  name="read-only"
                  value={rating}
                  size="small"
                  readOnly
                />
              </div>
              <div className="flex items-center">
                <GrLocation />
                <p className="ml-1">{area}</p>
              </div>
            </div>
            <div className=" flex justify-between items-center my-1">
              <div className="flex items-center">
                <div className="text-gray text-[14px] mr-2 flex items-center">
                  <HeartFilled />
                  <p className={` ml-1`}>0</p>
                </div>
                <div className="text-gray text-[14px] mr-2 flex items-center">
                  <FaComment />
                  <p className={` ml-1`}>0</p>
                </div>
                <div className="text-gray text-[14px] mr-2 flex items-center">
                  <FaShare />
                  <p className={`  ml-1`}>0</p>
                </div>
              </div>
              <div className="flex items-center ">
                <button
                  onClick={(e) => {}}
                  className={`font-medium text-[14px]  p-1 px-2 text-gray border-2 rounded  border-light-gray transition-transform duration-500 ease-in-out hover:shadow-3xl hover:scale-[1.1] mr-2`}
                >
                  Button
                </button>
                <button
                  onClick={(e) => {}}
                  className={`font-medium text-[14px] bg-[#F2E9FC]    p-1 px-2 text-primary border-2 rounded  border-primary transition-transform duration-500 ease-in-out hover:shadow-3xl hover:scale-[1.1] `}
                >
                  Button
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
