import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Pagination } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { selectCourse, setSearch } from "../../../redux/slices/courseSlice";
import { institutesSelector } from "../../../redux/slices/instituteSlice";
import {
  selectSearch,
  setFilteredInstitutes,
  setLocationQuery,
} from "../../../redux/slices/SearchSlice";
import { host } from "../../../utils/constant";
import InstituteCard from "../../UI/InstituteCard";
import { urlToTitle } from "../../utils";
const CoursesAndInstitutes = () => {
  const [isViewMore, setIsViewMore] = useState(false);
  const [itemCount, setItemCount] = useState(15);

  const router = useRouter();

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

  const { courses, search, fields } = useSelector(selectCourse);

  const dispatch = useDispatch();

  const [skip, setSkip] = useState(0);
  const [paginationButton, setPaginationButton] = useState();
  const [limit, setLimit] = useState(15);

  const filterByLocation = async (locName) => {
    try {
      const { data } = await axios.get(
        `${host}/institute?approval=1&location=${
          locName === "Jangpura" ? "Jungpura" : locName
        }&limit=${limit}&skip=${skip * 15}`
      );
      
      setItemCount(data?.count);
      if (skip === 0) {
        setPaginationButton(Math.ceil(data.count / 15));
      }

      if (skip !== 0) {
        setPaginationButton(Math.ceil(data.count / 15));
      }
      dispatch(
        setFilteredInstitutes(
          data.message
            .slice()
            .sort((a, b) => b?.images?.length - a?.images?.length)

            .sort((a, b) => b?.reviews?.length - a?.reviews?.length)
            .sort((a, b) => b?.rating - a?.rating)
        )
      );
    } catch (error) {
      toast.error(error.toString());
    }
  };

  useEffect(() => {
    if (router.query.toplocation) {
      const { toplocation } = router.query;
      const loc = urlToTitle(toplocation);
      
      dispatch(setLocationQuery(loc));
      filterByLocation(loc);
      dispatch(
        setSearch({
          type: "institute",
          name: "",
        })
      );
    } else if (router.query.location) {
      const { location } = router.query;
      const loc = urlToTitle(location);
      
      dispatch(setLocationQuery(loc));
      filterByLocation(loc);
      dispatch(
        setSearch({
          type: "institute",
          name: "",
        })
      );
    }
  }, [router.query.toplocation, router.query.location, limit, skip]);

  useEffect(() => {
    // if (!isEmpty(search)) {
    //   if (
    //     search.type === "institute" ||
    //     search.type === null ||
    //     !search.type === "course"
    //   ) {
    //     if (search.name.length > 1) {
    //       filterBySearch(search?.name, "");
    //     }
    //   }
    // } else
    if (locationQuery?.length > 1) {
      // if (!locationQuery.includes(",")) {
      filterByLocation(locationQuery);
    }
    // else {
    //   allInstitutes(10);
    // }
  }, [locationQuery, search]);

  

  const { institutes } = useSelector(institutesSelector);

  // useEffect(() => {
  //   dispatch(fetchInstitutes());
  // }, [dispatch]);

  return (
    <div className="md:px-24 px-5 md:py-10 pb-5">
      <div className="grid xl:grid-cols-3 grid-cols-1 md-mx-auto gap-x-[50px] gap-y-[25px] my-10">
        {filteredInstitutes?.length > 0 &&
          filteredInstitutes
            .slice()
            .sort((a, b) => b?.images?.length - a?.images?.length)
            ?.sort((a, b) => b?.reviews?.length - a?.reviews?.length)
            ?.sort((a, b) => b?.rating - a?.rating)
            ?.slice(12, itemCount)
            .map((item, key) => <InstituteCard {...item} key={key} />)}
      </div>

      {filteredInstitutes?.length > 12 ? (
        <Pagination
          onChange={(e, v) => {
            setSkip(v - 1);
            
          }}
          count={paginationButton}
          variant="outlined"
          shape="rounded"
        />
      ) : (
        ""
      )}

      {/* {filteredInstitutes.length > 12 && (
        <div
          onClick={() => {
            const itemHandler = () => {
              if (!isViewMore) {
                setItemCount(100);
              } else {
                setItemCount(12);
              }
            };
            itemHandler();

            setIsViewMore(!isViewMore);
          }}
          className="text-xl text-primary flex items-center space-x-2 cursor-pointer justify-center"
        >
          <p>{isViewMore ? "View Less" : "View More"}</p>
          {isViewMore ? (
            <UpOutlined className="flex items-center text-sm" />
          ) : (
            <DownOutlined className="flex items-center text-sm" />
          )}
        </div>
      )} */}

      {/* <Adsense
        client={`${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
        slot="2378478334"
        style={{ display: "block", marginTop: "10px" }}
        layout="in-article"
        format="autorelaxed"
      /> */}
    </div>
  );
};

export default CoursesAndInstitutes;
