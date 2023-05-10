import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../assets/merchantDashboard/Accountancy/logo.png";
import Footer from "../../../components/layout/Footer";
import OstelloSubscribe from "../../../components/pages/HomeLanding/OstelloSubscribe";
import ProfileNavbar from "../../../components/pages/Profile/ProfileNavbar";
import ProfileToggleNavbar from "../../../components/pages/Profile/ProfileToggleNavbar";
import Wishlist from "../../../components/pages/Profile/Wishlist";
import { setShowSideBar } from "../../../redux/slices/UserProfileSidePopUp";
import InstituteCard from "../../../components/UI/InstituteCard";
import axios from "axios";
import { host } from "../../../utils/constant";
import { authSelector } from "../../../redux/slices/authSlice";
import { toast } from "react-hot-toast";
import NoData from "../../../components/pages/Profile/NoData";
import { RiArrowRightSLine } from "react-icons/ri";
import { Pagination } from "@mui/material";

const SubscribedInstitute = () => {
  const dispatch = useDispatch();
  const [subscriberData, setSubscriberData] = useState([]);
  const [totalSubscribed, setTotlaSubscribed] = useState(0);
  const { userData } = useSelector(authSelector);
  const [skip, setSkip] = useState(0);
  const [paginationButton, setPaginationButton] = useState();
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await axios.get(
          `${host}/institute/subscriptions?studentid=${
            userData?.id
          }&limit=${limit}&skip=${skip * 20}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setSubscriberData(res?.data?.message);
        setTotlaSubscribed(res?.data?.count);
        setPaginationButton(Math.ceil(res.data.count / 20));
      } catch (err) {
        toast.error(err.message);
      }
    };
    run();
  }, [userData?.id, limit, skip]);
  return (
    <div>
      <Head>
        <title>Subscribed List - Profile - Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ProfileToggleNavbar></ProfileToggleNavbar>

      <Link legacyBehavior prefetch={false} href={"/"}>
        <div className="logo lg:flex items-center ml-4 mt-5 mb-12 hidden ">
          <img src={logo.src} alt="" />
        </div>
      </Link>
      <div className=" grid grid-cols-8 gap-0 bg-white ">
        <div className=" hidden  lg:block col-span-2 ">
          <div>
            <ProfileNavbar></ProfileNavbar>
          </div>
        </div>

        <div
          style={{
            height: "100%",
          }}
          className=" col-span-8 lg:col-span-6 mb-5 "
          onClick={() => dispatch(setShowSideBar(false))}
        >
          <div className=" lg:border border-ghost/60 border-0 rounded-2xl lg:max-w-[1200px] lg:w-[95%] w-full ">
            <div className="">
              {subscriberData?.length > 0 ? (
                <div className="bg-white md:mt-5 mt-0 p-3 rounded-lg">
                  <p className="text-[20px]">
                    Total Insitutes Subscribed {totalSubscribed}
                  </p>
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
                                  {data?.institute?.name
                                    ?.slice(0, 1)
                                    .toUpperCase()}
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
                                {new Date(
                                  data?.created_at
                                ).toLocaleDateString()}
                              </div>

                              <div className="text-[#9FA2B4] text-sm">
                                {new Date(
                                  data?.created_at
                                ).toLocaleTimeString()}
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
                                    {data?.institute?.name
                                      ?.slice(0, 1)
                                      .toUpperCase()}
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
                  <Pagination
                    onChange={(e, v) => {
                      setSkip(v - 1);
                    }}
                    count={paginationButton}
                    variant="outlined"
                    shape="rounded"
                  />
                </div>
              ) : (
                <NoData
                  text={`You haven’t Subscribed anything institute yet.`}
                ></NoData>
              )}
            </div>
          </div>
        </div>
      </div>
      <OstelloSubscribe />
      <Footer />
    </div>
  );
};

export default SubscribedInstitute;
