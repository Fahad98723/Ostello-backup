import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import instituteImage from "../../../../../assets/images/institute.png";
import {
  fetchCourses,
  selectCourse,
  setFields,
  setSearch,
} from "../../../../../redux/slices/courseSlice";
import {
  fetchInstitutes,
  institutesSelector,
} from "../../../../../redux/slices/instituteSlice";
import {
  setCategory,
  setClass,
  setExam,
  setLocationQuery,
  setSearchQuery,
} from "../../../../../redux/slices/SearchSlice";
import { host } from "../../../../../utils/constant";
import { isEmpty } from "../../../../../utils/utils";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import Card from "./card";
import Scroll from "./scroll";

const data = [
  "IIT-JEE-MAIN",
  "IIT-JEE-ADVANCE",
  "BITSAT",
  "VITEEE",
  "SRMJEE",
  "COMEDK",
  "KIITEE",
  "WBJEE",
  "MHTCET",
  "MET",
  "NEET",
  "NEET PG",
  "AIIMS",
  "AIIMS PG",
  "PGIMER",
  "CMSE",
  "FPMT",
  "NPE FET",
  "CUET",
];

function Search({
  style,
  className = "input-courses w-full relative",
  placeholder,
}) {
  const [searchText, setSearchText] = useState("");
  const [searchShow, setSearchShow] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const dispatch = useDispatch();
  const { institutes } = useSelector(institutesSelector);
  const { courses, search } = useSelector(selectCourse);

  const [allData, setAllData] = useState([]);

  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    let uniqueData = [];

    const sortInstitutes = allData?.filter((items) => "classmode" in items);

    const sortCourses = allData?.filter((items) => "classtype" in items);

    console.log(sortInstitutes, sortCourses);

    const dataCourseSorting = sortCourses?.map((item, idx) => {
      const { id, name, ratings, images, slug, category } = item;
      return {
        ...item,
        id,
        name,
        category,
        rating: ratings,
        type: "course",
        url: slug,
        img: instituteImage,
        keywords: `${name.toLowerCase()} ${category?.name.toLowerCase()}`,
      };
    });

    const dataInstituteSorting = sortInstitutes?.map((item, idx) => {
      const { id, name, rating, images, locations, services, slug } = item;
      const { city, area, state, line1 } = locations[0];

      return {
        ...item,
        id,
        name,
        rating,
        type: "institute",
        url: `/institute/${slug}`,
        img: images,
        keywords: `${name.toLowerCase().replaceAll(",", " ")} ${line1
          .toLowerCase()
          .replaceAll(",", " ")} ${area
          .toLowerCase()
          .replaceAll(",", " ")} ${city
          .toLowerCase()
          .replaceAll(",", " ")} ${state.toLowerCase().replaceAll(",", " ")}`,
      };
    });

    console.log(dataCourseSorting, dataInstituteSorting, allData);

    const removeDuplicatesData = dataCourseSorting?.filter((element) => {
      let isDuplicate;
      if (element?.category?.name)
        isDuplicate = uniqueData.includes(element?.category?.name?.trim());
      if (!element?.category?.name)
        isDuplicate = uniqueData.includes(element?.name?.trim());
      if (!isDuplicate) {
        if (element?.category?.name)
          uniqueData.push(element?.category?.name?.trim());
        if (!element?.category?.name) uniqueData.push(element?.name?.trim());

        return true;
      }

      return false;
    });

    const examData = data.map((item, idx) => {
      return {
        name: item,
        rating: 5,
        type: "Exam",
        img: instituteImage,
        keywords: item.toLowerCase(),
      };
    });

    let filterData = [...examData];
    if (dataInstituteSorting[0]?.id) {
      filterData.push(...dataInstituteSorting);
    }
    if (removeDuplicatesData[0]?.id) {
      filterData.push(...removeDuplicatesData);
    }
    setSearchData(filterData);
  }, [allData]);

  useEffect(() => {
    if (searchText.length > 0) {
      setFilteredItems(
        searchData?.filter((item) => {
          return item?.keywords?.includes(searchText?.toLowerCase());
        })
      );
    }

    // setFilteredItems(searchData);
  }, [searchData, searchText]);

  console.log(filteredItems, searchData, allData, "fahad");

  useEffect(() => {
    const interval = setInterval(() => {
      if (!filteredItems.length) {
        setSearchShow(false);
      }
      if (filteredItems.length) {
        setSearchShow(true);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [filteredItems]);

  const router = useRouter();

  let domNode = useClickOutside(() => {
    setSearchShow(false);
  });

  useEffect(() => {
    if (searchText?.length === 0) {
      setFilteredItems([]);
    }
  }, [searchText]);

  console.log(searchText, "pushing codes");

  return (
    <form
      onSubmit={() => {
        dispatch(setSearchQuery(searchText));
        router.push(`/search`);
      }}
      ref={domNode}
      style={style}
      className="flex items-center  sm:mx-5"
    >
      <FiSearch size={20} />
      <input
        // onClick={() => setSearchShow(true)}
        className="w-full h-12 px-2 text-[20px] search placeholder:text[20px] outline-none  "
        type="search"
        onChange={async (e) => {
          setSearchText(e.target.value);
          if (e.target.value.length > 1) {
            setSearchShow(true);
            const { data } = await axios.get(
              `${host}/institute/query?approval=1&name=${e.target.value.replaceAll(
                "+",
                "%2B"
              )}&limit=50`
            );

            setAllData(data.message);

            e.preventDefault();
            return;
          } else {
            setAllData([]);
            e.preventDefault();
            return;
          }
        }}
        defaultValue={searchText || ""}
        placeholder={"Search for courses, institutes, exams"}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            dispatch(
              setSearch({
                type: null,
                name: searchText,
              })
            );
            if (searchText.toLowerCase() === "cuet") {
              router.push("/exams/cuet");
              return;
            }
            dispatch(setLocationQuery(""));
            dispatch(setExam([]));
            dispatch(setFields(""));
            dispatch(setCategory(""));
            dispatch(setClass([]));
            router.push("/search");
          }
        }}
      />
      {searchShow && (
        <Scroll
          style={{
            height: "30vh",
            boxShadow: "0px 4px 15px rgba(125, 35, 224, 0.2)",
          }}
          className="overflow-y-scroll z-40"
        >
          {filteredItems.length > 0 ? (
            <>
              {filteredItems.map((item, index) => (
                <Card key={index} currentValue={item} />
              ))}
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              No matched Courses or Institutions
            </div>
          )}
        </Scroll>
      )}
    </form>
  );
}

export default Search;
