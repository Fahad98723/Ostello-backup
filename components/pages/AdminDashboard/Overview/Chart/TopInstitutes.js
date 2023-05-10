import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminInstitutes } from "../../../../../redux/slices/adminInstitutesSlice";
import { isEmpty } from "../../../../../utils/utils";
import Loader from "../../../../Loader";
import defaultImage from "../../../../../assets/images/institute.png";
import axios from "axios";
import { host } from "../../../../../utils/constant";
const TopInstitutes = () => {
  const dispatch = useDispatch();
  const {  adminInstitutes, isUpdated } = useSelector(
    (state) => state.adminInstitutes
  );



  const reviewClassHandler = (item) => {
    let classes =
      "rating flex xl:space-x-2 justify-between items-center  px-2 py-1  md:text-xl text-sm rounded-md font-bold ";
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

  
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const run = async() => {
      setLoading(true)
      try {
        const config = {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${window.localStorage.getItem(
              "ACCESS_TOKEN"
            )}`,
          },
        };
        const { data } = await axios.get(`${host}/institute?approval=1&limit=20`, config )
        setData(data?.message)
     
      } catch (err) {
        toast.error(err.message)
      }
      finally{
        setLoading(false)
      }
    }
    run()
  },[])




  return (
    <div className="bg-white p-5 rounded-lg">
      <div>
        <h4 className="capitalize font-bold text-[21px]">Top Institutes</h4>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="space-y-2 pt-3">
          {!isEmpty(data) ? (
            <>
              <div className="text-[#CBCBCB] flex font-medium pr-3 justify-end">
                Reviews
              </div>
              <div className="max-h-[288px] pr-2 overflow-y-auto">
                {data
                  .slice()
                  .sort((a, b) => b.rating - a.rating)
                  .map((data, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-x-2 pb-2">
                        <div>
                          <img
                            className="h-[50px] w-[50px] rounded-full"
                            src={
                              data?.images?.length > 0
                                ? `https://cdn.ostello.co.in/${data?.images[0]?.key}`
                                : defaultImage.src
                            }
                            alt=""
                          />
                        </div>
                        <div className="space-y-0.5">
                          <p className="capitalize text-[14px] font-semibold">
                            {data.name}
                          </p>
                          <p className="text-[#6B7280] text-[14px]">
                            {data.locations[0].city},{data.locations[0].state}
                          </p>
                        </div>
                      </div>
                      <div className={`${reviewClassHandler(data.rating)} flex  px-2 justify-center text-white font-bold rounded-lg  items-center `}>
                        {data.rating}
                        <AiFillStar className="ml-1" />
                      </div>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <div className="py-8 font-medium flex justify-center">
              No pending requests are available now
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TopInstitutes;
