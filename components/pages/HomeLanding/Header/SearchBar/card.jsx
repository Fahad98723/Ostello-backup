import { useRouter } from "next/router";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import courseImage from "../../../../../assets/images/courseImg.png";
import videoImage from "../../../../../assets/images/videoImg.png";
import { setFields, setSearch } from "../../../../../redux/slices/courseSlice";
import {
  setCategory,
  setClass,
  setExam,
  setLocationQuery,
  setSearchQuery,
} from "../../../../../redux/slices/SearchSlice";

const Card = ({ currentValue }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const reviewClassHandler = (item) => {
    let classes =
      "shadow-lg px-2  w-fit h-fit  flex items-center space-x-1 justify-center rounded-lg cursor-pointer border border-[#D7D7D7] ";
    if (item === 0) {
      classes += "text-white bg-[#FF3044]";
    } else if (item === 1) {
      classes += "text-white bg-deep_red";
    } else if (item <= 2) {
      classes += " bg-light_red border-light_red";
      if (item < 2) {
        classes += " text-light_red";
      } else {
        classes += " text-white";
      }
    } else if (item <= 3) {
      if (item < 3) {
        classes += " text-light_yellow";
      } else {
        classes += " text-white";
      }
      classes += " bg-light_yellow border-light_yellow";
    } else if (item <= 4) {
      if (item < 4) {
        classes += " text-light_green";
      } else {
        classes += " text-white";
      }
      classes += " bg-light_green border-light_green";
    } else if (item <= 5) {
      if (item < 5) {
        classes += " text-deep_green";
      } else {
        classes += " text-white";
      }
      classes += " bg-deep_green border-deep_green";
    } else {
      return classes;
    }
    return classes;
  };

  const getClassCourseType = (num) => {
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

  const getClassType = (num) => {
    if (num === 1) {
      return "Hybrid";
    }
    if (num === 2) {
      return "Online";
    }
    if (num === 3) {
      return "Offline";
    }
  };
  return (
    <div
      onClick={() => {
        

        if (currentValue.type === "Exam") {
          dispatch(
            setSearch({
              type: "exam",
              name: currentValue.name,
            })
          );
          dispatch(setFields(""));
          dispatch(setCategory(""));
          dispatch(setClass([]));

          if (currentValue.name.toLowerCase() === "cuet") {
            router.push("/exams/cuet");
            return;
          }
        } else {
          dispatch(setSearchQuery(currentValue.name));
          dispatch(
            setSearch({
              type: currentValue.type,
              name: currentValue.name,
            })
          );
          dispatch(setExam([]));
          dispatch(setFields(""));
          dispatch(setCategory(""));
          dispatch(setClass([]));
        }
        dispatch(setLocationQuery(""));
        router.push("/search");
      }}
      style={{ borderBottom: "1px solid #E8E8E8" }}
      key={currentValue.id}
      className="flex bg-white p-2 cursor-pointer "
    >
      {currentValue.type === "institute" ? (
        <img
          src={
            currentValue?.img.length > 0
              ? `https://cdn.ostello.co.in/${currentValue?.img?.[0]?.key}`
              : currentValue.type === "course"
              ? courseImage.src
              : videoImage.src
          }
          className="w-[100px] h-[100px] my-auto lg:w-[120px]"
          alt={currentValue.name}
        />
      ) : (
        <div className="bg-primary w-[100px] h-[100px] my-auto lg:w-[120px] text-4xl rounded-xl flex items-center justify-center p-1 text-white cursor-pointer ">
          {currentValue.name?.slice(0, 1).toUpperCase()}
        </div>
      )}

      <div className="ml-2">
        <h4 className="text-lg text-light-black">{currentValue.name}</h4>
        <div style={{ color: "#939393" }} className="text-base ">
          {currentValue.type}
        </div>
        {currentValue.type === "institute" ? (
          <div style={{ color: "#939393" }} className="text-base ">
            {currentValue.classmode
              ? getClassType(currentValue.classmode)
              : getClassCourseType(currentValue.classtype)}
          </div>
        ) : (
          <div style={{ color: "#939393" }} className="text-base ">
            {currentValue?.category?.name}
          </div>
        )}
        <div className={`${reviewClassHandler(currentValue.rating)}`}>
          <span>{currentValue.rating || 0}</span>
          <span>
            <AiFillStar />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
