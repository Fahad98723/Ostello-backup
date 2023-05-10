import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearch,
  setFilteredCourses,
} from "../../../redux/slices/SearchSlice";
import { host } from "../../../utils/constant";
import { isEmpty } from "../../../utils/utils";
import CourseCard from "../Home/PopularCourses/CourseCard";
import RecommendedCard from "./RecommendedCard";

const RecommendedCourses = () => {
  const [courses, setCourses] = useState([]);
  const {
    selectedInstituteName,
    filteredCourses,
    filteredInstitutes,
    locationQuery,
    searchQuery,
    filters,
    areaLocation,
    searchByName,
  } = useSelector(selectSearch);
  const dispatch = useDispatch([]);

  useEffect(() => {
    const getCourses = async () => {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      };
      try {
        const { data } = await axios.get(`${host}/course`, config);
        const newData = data?.message;
        setCourses(newData);
        dispatch(setFilteredCourses(newData));

      } catch (error) {
        toast.error(error.toString());
      }
    };
    getCourses();
  },[]);
  return (
    <div>
      <div className="md:px-24 md:pt-10 px-5 pt-5">
        <div>
       
              <p className="text-[ #101828] font-bold text-[36px]">
                Courses  
                in{" "}
                <span className="text-primary font-bold">
                  India
                </span>{" "}
              </p>
           
          <p className="md:w-[720px] text-[#667085] text-[18px] mt-3">
            There are {courses.length} Courses in Our site
          </p>
        </div>
        <div className="grid xl:grid-cols-3 grid-cols-1 md-mx-auto gap-x-[50px] gap-y-[25px] my-10">
          {!isEmpty(courses) ? (
            courses
              ?.slice(0, 9)
              ?.map((item, i) => <CourseCard key={item.id} {...item} />)
          ) : (
            <div>
              <p className="text-[#FF0000] text-3xl ">No Result Found </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendedCourses;
