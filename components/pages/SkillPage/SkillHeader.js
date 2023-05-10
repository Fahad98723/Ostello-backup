import { useRouter } from "next/router";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import banner from "../../../assets/Pages/SkillPage/Banner.png";
import bannerVector from "../../../assets/Pages/SkillPage/BannerVector.png";
import { setSearch } from "../../../redux/slices/courseSlice";
import { setSearchQuery } from "../../../redux/slices/SearchSlice";
const SkillHeader = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(setSearchQuery(searchText));
    dispatch(
      setSearch({
        type: "institute",
        name: searchText,
      })
    );
    router.push("/search");
  };
  return (
    <div
      style={{ backgroundImage: `url(${banner.src})` }}
      // className="h-[300px] md:hidden block   rounded-3xl "
      className=" bg-no-repeat md:bg-cover  py-20  bg-center w-full h-full"
    >
      <div className="md:max-w-[1350px] flex items-center  mx-auto  ">
        <div className="text-white p-5 md:px-20 px-5 ">
          <p className="md:text-[26px] text-[20px]">Learn And Grow</p>
          <div className="my-5 md:text-[40px] text-[30px] font-semibold  border-l-4 ">
            <p className="ml-2 md:text-[40px] text-[30px]  font-semibold  ">
              Access to 5000+ Courses <br /> from 300 instructors & Institutions
            </p>
          </div>
          <div
            className={` shrink md:w-[450px] pl-2 md:ml-5 mt-10 rounded-[30px] text-base font-normal text-black bg-white bg-clip-padding bg-no-repeat  first-letter:transition ease-in-out flex items-center justify-between `}
          >
            <input
              type="text"
              placeholder="Search Institute "
              className="text-[16px] bg-white px-2 py-2  focus:outline-none w-full rounded-[30px]"
              defaultValue={searchText || ""}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <div className="bg-[#FFE600] rounded-[30px] h-full p-5">
              <FiSearch
                onClick={(e) => {
                  handleSearch();
                }}
                className="text-black text-xl cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillHeader;
