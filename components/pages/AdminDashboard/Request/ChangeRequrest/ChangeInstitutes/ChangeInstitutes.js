import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsFillCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { isJsonParsable } from "../../../../../../utils/utils";
import {
  fetchAdminInstitutes,
  handleLoading,
} from "../../../../../../redux/slices/adminInstitutesSlice";
import axios from "axios";
import { host } from "../../../../../../utils/constant";
import toast from "react-hot-toast";

const ChangeInstitute = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const run = async () => {
      dispatch(handleLoading(true));
      try {
        const config = {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${window.localStorage.getItem(
              "ACCESS_TOKEN"
            )}`,
          },
        };
        const { data } = await axios.get(
          `${host}/institute?requestApproval=4&limit=50`,
          config
        );
        setData(data?.message);
      } catch (err) {
        toast.error(err.message);
      } finally {
        dispatch(handleLoading(false));
      }
    };
    run();
  }, [dispatch]);

  const router = useRouter();

  const handelReview = (id) => {
    router.push(`/admin-dashboard/institutes/review-changes/${id}`);
  };

  return (
    <div className="grid mt-8 pb-[40px] md:grid-cols-2 gap-8 lg:gap-x-8">
      {data.map((d, index) => (
        <div key={index}>
          <div className="bg-white px-[18px] border border-light-gray rounded-lg py-3.5">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-[21px] text-[#414141] font-bold ">
                  {d.name}
                </h3>
                <div className="text-[#767676] flex">
                  <p className="mr-1">{d.locations[0].state},</p>
                  {d.locations[0].city}
                </div>
              </div>
              <button
                onClick={() => handelReview(d.id)}
                className="font-medium text-[#ffffff] text-[20px] px-4 rounded-md py-1 bg-[#7D23E0]"
              >
                Review
              </button>
            </div>
            <div className="flex items-center">
              <BsFillCircleFill className="text-[6px] text-[#3AC817]" />
              <span className="ml-2 my-1 text-[#414141]">Online</span>
            </div>
            <div className="text-[18px] text-[#747474]">
              {d?.description
                ? isJsonParsable(d?.description) &&
                  JSON.parse(d?.description).map((item, key) => (
                    <p key={key} className="mt-5">
                      {item}
                    </p>
                  ))
                : ""}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChangeInstitute;
