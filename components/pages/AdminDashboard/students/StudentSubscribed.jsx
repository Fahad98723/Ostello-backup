import React, { useEffect, useState } from "react";
import { RiArrowRightSLine, RiHeart3Fill } from "react-icons/ri";
import axios from "axios";
import { useRouter } from "next/router";

import CourseCard from "../AdminCard/CourseCard";
import Header from "../Header/Header";
import { host } from "../../../../utils/constant";

const StudentSubscribed = () => {
  const router = useRouter();
  const { studentId } = router.query;

  const [users, setUsers] = useState({});
  const [recentViewed, setRecentViewed] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [subscriberData, setSubscriberData] = useState([]);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await axios.get(
          `${host}/institute/subscriptions?studentid=${studentId}&limit=50`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setSubscribers(res?.data?.count);
        setSubscriberData(res?.data?.message);
      } catch (err) {}
    };
    run();
  }, [studentId]);

 
  return (
    <div>
      <Header pageTitle={"Students"} />
      <div className="px-[30px] pt-4 pb-16">
        <h2 className="text-lg mb-3 px-2 md:hidden block font-bold">
          Subscribed
        </h2>
        {subscriberData?.length > 0 ? (
          <div className="bg-white md:mt-5 mt-0 p-3 rounded-lg">
            <table className="md:block hidden">
              <thead className="bg-white table w-full table-fixed border-light-gray border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-[18px] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  >
                    Name of Institute
                  </th>
                  <th
                    scope="col"
                    className="text-[18px] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  >
                    Phone Number
                  </th>
                  <th
                    scope="col"
                    className="text-[18px] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  >
                    Date of Subscriptions
                  </th>
                  <th
                    scope="col"
                    className="text-[18px] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="text-[18px] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  ></th>
                </tr>
              </thead>
              <tbody className="">
                {subscriberData?.map((data, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b border-light-gray cursor-pointer transition duration-300 ease-in-out hover:bg-light-gray table w-full table-fixed"
                  >
                    <td className="px-6 py-4 font-medium text-[#252733]">
                      <div className="flex items-center">
                        {data?.institute?.images?.length ? (
                          <img
                            className="mr-3 h-10 w-10 rounded-full"
                            src={`https://cdn.ostello.co.in/${data?.institute?.images[0]?.key}`}
                            alt=""
                          />
                        ) : (
                          <div className="bg-primary mr-3  h-10 w-10 rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                            {data?.institute?.name?.slice(0, 1).toUpperCase()}
                          </div>
                        )}
                        {data?.institute.name}
                      </div>
                    </td>
                    <td className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap">
                      {data?.institute?.phonenumber}
                    </td>
                    <td className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div>
                          {new Date(data?.created_at).toLocaleDateString()}
                        </div>

                        <div className="text-[#9FA2B4] text-sm">
                          {new Date(data?.created_at).toLocaleTimeString()}
                        </div>
                      </div>
                    </td>
                    <td className="text-[#252733] font-medium px-6 py-4">
                      <div className="flex flex-col ">
                        {data?.institute?.locations[0]?.area}
                        <div className="text-[#9FA2B4] font-normal">
                          {" "}
                          {data?.institute?.locations[0]?.state}
                        </div>
                      </div>
                    </td>
                    <td className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap"></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <>
              <div className="md:hidden block">
                <h3 className="mb-3 font-bold text-[#9FA2B4]">
                  Name of Students
                </h3>
                <div className="flex space-y-4 flex-col">
                  {subscriberData?.map((data, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-start">
                        <div className="flex items-center space-x-3">
                          {data?.institute?.images?.length ? (
                            <img
                              className="mr-3 h-10 w-10 rounded-full"
                              src={`https://cdn.ostello.co.in/${data?.institute?.images[0]?.key}`}
                              alt=""
                            />
                          ) : (
                            <div className="bg-primary mr-3  h-10 w-10 rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                              {data?.institute?.name?.slice(0, 1).toUpperCase()}
                            </div>
                          )}
                          <p className="text-[#252733] font-bold">
                            {data.institute.name}
                          </p>
                        </div>
                        <div>
                          <RiArrowRightSLine className="scale-125" />
                        </div>
                      </div>
                      <div className="flex mt-3 space-x-1 justify-between">
                        <div className="w-6/12 text-[#717171] text-sm">
                          <div>Phonenumber:</div>
                          <div>Date of Registration :</div>
                          <div>Location :</div>
                        </div>
                        <div className="w-6/12 font-bold text-sm">
                          <div>Above {data?.institute?.phonenumber}</div>
                          <div>{data?.created_at?.split("T")[0]}</div>
                          <div>
                            {" "}
                            {data?.institute?.locations[0]?.area},{" "}
                            {data?.institute?.locations[0]?.state}
                          </div>
                        </div>
                      </div>
                      <hr className="mt-3" />
                    </div>
                  ))}
                </div>
              </div>
            </>
          </div>
        ) : (
          <p className="text-center text-2xl text-[#FF0000]/80">
            Didn't subscribed any Institutes
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentSubscribed;
