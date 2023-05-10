import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardSidebar from "../../../../components/pages/Merchant/Dashboard/DashboardSidebar";
import ToggleDashboard from "../../../../components/pages/Merchant/Dashboard/ToggleDashboard";
import {
  authSelector,
  getInstituteDetails,
} from "../../../../redux/slices/authSlice";
import { isEmpty } from "../../../../utils/utils";
import { Box, Modal } from "@mui/material";
import { FaCrown } from "react-icons/fa";
import axios from "axios";
import { host } from "../../../../utils/constant";
import { PlusOutlined } from "@ant-design/icons";
import MerchantReviewCard from "../../../../components/pages/Shared/Reviews/MerchantReviewCard";
import { toast } from "react-hot-toast";
import UpgardeModal from "../../../../components/pages/Merchant/Dashboard/UpgradeModal/UpgardeModal";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const ReviewsData = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { instituteDetails, loading, userData } = useSelector(authSelector);
  const [refetch, setRefetch] = useState(false);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const run = async () => {
      if (instituteDetails.id) {
        try {
          const res = await axios.get(
            `${host}/review?instituteId=${instituteDetails.id}&nolimit=true`
          );
          setReviews(res?.data?.message);
        } catch (err) {}
      }
    };

    run();
  }, [instituteDetails.id]);
  let item_limit = 8;

  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  let item_remaining = reviews?.length - pageData?.length || 0;

  useEffect(() => {
    if (reviews?.length > 0) {
      let filtered = reviews
        .slice()
        .reverse()
        .slice(0, item_limit * page);
      setPageData(filtered);
    }
  }, [reviews, page, item_limit]);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("OWNER_ID") === null
    )
      router.push("/merchant/login");
    if (userData) {
      if (userData?.usertype !== 2) {
        router.push("/merchant/login");
      }
    } else if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("INSTITUTE_ID") === null
    )
      router.push("/merchant/details");
    dispatch(getInstituteDetails());
  }, [refetch, router]);

  useEffect(() => {
    if (
      !loading &&
      !isEmpty(instituteDetails) &&
      instituteDetails.approval !== 1
    ) {
      router.push("/merchant/details/success");
    } else {
      return;
    }
  }, [instituteDetails, loading, router]);

  const [filterAnchorEl, setFilterAnchorEl] = React.useState(null);
  const filterOpen = Boolean(filterAnchorEl);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const searchOpen = Boolean(anchorEl);

  const handleSearchClose = () => {
    setAnchorEl(null);
  };

  const [reviewsShow, setReviewsShow] = useState(true);

  const [subscribeData, setSubscribeData] = useState([]);

  useEffect(() => {
    const run = async () => {
      if (instituteDetails?.id) {
        try {
          const res = await axios.get(
            `${host}/institute/subscriptions?instituteid=${instituteDetails?.id}&limit=50`
          );
          setSubscribeData(res?.data?.message);
        } catch (err) {
          toast.error(err.message);
        }
      }
    };
    run();
  }, [instituteDetails?.id, refetch]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (instituteDetails?.accountplan === "pro_plan") {
      setPaid(true);
    } else {
      setPaid(false);
    }
  }, [instituteDetails?.accountplan]);

  return (
    <>
      <div className="dashboard">
        <ToggleDashboard
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        ></ToggleDashboard>
        <div className=" grid md:grid-cols-6 gap-0 bg-white ">
          <DashboardSidebar />
          <div
            style={{ background: " #FAFAFB" }}
            className="  col-span-6 px-5 lg:col-span-5  "
            onClick={() => setShowSidebar(false)}
          >
            <div className="heading p-5 mb-5 flex justify-between">
              <h1 className="text-2xl font-bold ">Reviews & Subscribers</h1>
            </div>

            <div className="bg-white md:mr-3 md:p-3 rounded-lg">
              <div className="mb-3 flex">
                <button
                  onClick={() => {
                    setReviewsShow(true);
                  }}
                  className="px-5 py-1.5 text-[#F0F0F0] mr-2 text-lg font-medium rounded-lg mt-3 bg-primary border-0"
                >
                  Reviews
                </button>

                <button
                  onClick={() => {
                    setReviewsShow(false);
                  }}
                  className="px-5 py-1.5 text-[#F0F0F0] mr-2 text-lg font-medium rounded-lg mt-3 bg-primary border-0"
                >
                  Subscribers
                </button>
              </div>

              <div className="md:flex gap-x-1 md:px-5 px-3  justify-between">
                <h3 className="md:font-bold md:text-[19px] text-[16px] text-[#252733]">
                  All {reviewsShow ? "Reviews" : "Subscribers"}
                </h3>
              </div>

              {reviewsShow ? (
                <div>
                  {pageData.length ? (
                    <div className=" md:grid grid-cols-1 gap-4  place-items-center  mt-5">
                      <div className="flex-grow w-full border-b border-[#D0D5DD]"></div>
                      {pageData?.map((item) => (
                        <MerchantReviewCard key={item?.id} {...item} />
                      ))}

                      <>
                        <div
                          onClick={() => {
                            if (item_remaining > 0) {
                              setPage((prv) => prv + 1);
                            } else {
                              if (page > 1) {
                                setPage((prv) => prv - 1);
                              }
                            }
                          }}
                          className="py-6 px-10 bg-white shadow-lg rounded flex justify-between items-center w-full"
                        >
                          <p className="font-bold hover:underline cursor-pointer text-primary">
                            {item_remaining > 0
                              ? ` More ${item_remaining} reviews`
                              : `Show less `}
                          </p>
                          <PlusOutlined className=" cursor-pointer" />
                        </div>
                      </>
                    </div>
                  ) : (
                    <p className="text-red md:px-5 px-3 text-xl mt-3">
                      No Reviews
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  {subscribeData?.length ? (
                    <div className=" md:grid grid-cols-1 gap-4   mt-5">
                      <div className=" w-full border-b border-[#D0D5DD]"></div>

                      <div>
                        <div className="flex flex-col overflow-x-auto">
                          <div className="sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                              <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-sm font-light">
                                  <thead className="bg-white border-b border-light-gray">
                                    <tr className="bg-light-gray">
                                      <th
                                        scope="col"
                                        className="text-[14px]  font-medium text-[#ABABAB] p-2 text-left"
                                      >
                                        Name
                                      </th>

                                      <th
                                        scope="col"
                                        className="text-[14px]  font-medium text-[#ABABAB] p-2 text-left"
                                      >
                                        School Name
                                      </th>

                                      <th
                                        scope="col"
                                        className="text-[14px]  font-medium text-[#ABABAB] p-2 text-left"
                                      >
                                        Number
                                      </th>

                                      <th
                                        scope="col"
                                        className="text-[14px]  font-medium text-[#ABABAB] p-2 text-left"
                                      >
                                        Class
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-[14px]  font-medium text-[#ABABAB] p-2 text-left"
                                      >
                                        Locations
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-[14px]  font-medium text-[#ABABAB] p-2 text-left"
                                      >
                                        Date & Time
                                      </th>
                                      <th
                                        scope="col"
                                        className=" flex items-center font-medium text-[#ABABAB] p-2 text-left"
                                      >
                                        <p className="text-[13px]">
                                          Upgrade To <br /> Premium{" "}
                                        </p>{" "}
                                        <AiOutlineQuestionCircle className="text-primary text-[18px] ml-2" />
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {subscribeData?.map((item, index) => (
                                      <tr
                                        key={index}
                                        className={`bg-white border-b border-light-gray cursor-pointer transition duration-300 ease-in-out hover:bg-light-gray`}
                                      >
                                        <td className="p-2  font-medium text-[#252733]">
                                          <div className="flex items-center ">
                                            {item?.student?.avatar?.length ? (
                                              <img
                                                className="mr-2 h-10 w-10 rounded-full"
                                                src={`https://cdn.ostello.co.in/${item?.student?.avatar?.key}`}
                                                alt=""
                                              />
                                            ) : (
                                              <div className="bg-primary mr-3  h-10 w-10 rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                                                {item?.student?.name
                                                  ?.slice(0, 1)
                                                  .toUpperCase()}
                                              </div>
                                            )}
                                            <div className="w-full ">
                                              <p className={` text-[14px] `}>
                                                {item?.student?.name}
                                              </p>
                                            </div>
                                          </div>
                                        </td>

                                        <td className="text-[#252733] font-medium  p-2">
                                          <div className="flex flex-col">
                                            <p className=" text-[14px]">
                                              {" "}
                                              {item?.student?.schoolname}
                                            </p>
                                          </div>
                                        </td>

                                        <td className="text-[#252733] font-medium p-2 whitespace-nowrap">
                                          <div className="flex flex-col">
                                            <div className=" text-[14px] flex items-center">
                                              {" "}
                                              {paid
                                                ? item?.student?.phonenumber
                                                : `${item?.student?.phonenumber.slice(
                                                    0,
                                                    3
                                                  )}${"*".repeat(7)}`}{" "}
                                              {!paid ? (
                                                <div className="flex items-center">
                                                  <FaCrown className="text-[#FFD907]  mx-1 text-[14px] " />
                                                  <p className="text-primary mr-1  text-[14px]">
                                                    Unlock
                                                  </p>
                                                  <AiOutlineQuestionCircle />
                                                </div>
                                              ) : (
                                                ""
                                              )}
                                            </div>
                                          </div>
                                        </td>

                                        <td className="text-[#252733] font-medium p-2 ">
                                          <div className="flex flex-col">
                                            <p className=" text-[14px]">
                                              {" "}
                                              {item?.student?.grade}
                                            </p>
                                          </div>
                                        </td>

                                        <td className="text-[#252733] font-medium p-2 ">
                                          <div className="flex flex-col">
                                            <p className=" text-[14px]">
                                              {" "}
                                              {item?.student?.location?.area}
                                            </p>
                                          </div>
                                        </td>

                                        <td className="text-[#252733] font-medium p-2 ">
                                          <div className="flex flex-col">
                                            <p className=" text-[14px]">
                                              {" "}
                                              {/* {d?.registeredon?.split("T")[0]} */}
                                              {new Date(
                                                item?.created_at
                                              ).toLocaleDateString()}
                                            </p>
                                            <p className="text-[11px] text-[#717171]">
                                              {/* {recentData??.registeredon?.split("T")[1].split(".")[0]} */}
                                              {new Date(
                                                item?.created_at
                                              ).toLocaleTimeString()}
                                            </p>

                                            {/* <div>
                        
                      </div>

                      <div className="text-[#9FA2B4] text-sm">
                        
                      </div> */}
                                          </div>
                                        </td>

                                        <td className="text-[#252733] font-medium p-2 ">
                                          {paid ? (
                                            <button
                                              onClick={() => {
                                                // handleOpen();
                                              }}
                                              className="px-5 py-1 text-[#F0F0F0] mr-2 text-md font-medium rounded-lg mt-3 bg-primary border-0 flex items-center"
                                            >
                                              <FaCrown className="text-[#BF913B] mr-2" />
                                              Upgraded
                                            </button>
                                          ) : (
                                            <button
                                              onClick={() => {
                                                handleOpen();
                                              }}
                                              className="px-5 py-1 text-[#F0F0F0] mr-2 text-md font-medium rounded-lg mt-3 bg-primary border-0 flex items-center"
                                            >
                                              <FaCrown className="text-[#BF913B] mr-2" />
                                              Upgrade
                                            </button>
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <table className="mt-10 md:block hidden table-auto"></table>

                      <div className="md:hidden block p-3">
                        <div className="flex space-y-4 flex-col">
                          {subscribeData?.map((item, i) => (
                            <div key={i}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-[#252733] font-bold ">
                                      {item?.student?.avatar?.length ? (
                                        <img
                                          className="mr-2 h-10 w-10 rounded-full"
                                          src={`https://cdn.ostello.co.in/${item?.student?.avatar?.key}`}
                                          alt=""
                                        />
                                      ) : (
                                        <div className="bg-primary mr-3  h-10 w-10 rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                                          {item?.student?.name
                                            ?.slice(0, 1)
                                            .toUpperCase()}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex mt-3 space-x-1 justify-between">
                                <div className=" text-[#717171] text-sm">
                                  {/* <div>Applicant Name :</div>
                        <div>Time of Registration :</div> */}
                                  <div>Name : {item?.student?.name}</div>
                                  <div className="flex">
                                    Phonenumber :{" "}
                                    <div className="font-bold flex items-center ml-2">
                                      {" "}
                                      {paid
                                        ? item?.student?.phonenumber
                                        : `${item?.student?.phonenumber.slice(
                                            0,
                                            3
                                          )}${"*".repeat(7)}`}{" "}
                                      {!paid ? (
                                        <div className="flex items-center">
                                          <FaCrown className="text-[#FFD907]  mx-1 text-[14px] " />
                                          <p className="text-primary mr-1  text-[14px]">
                                            Unlock
                                          </p>
                                          <AiOutlineQuestionCircle />
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    Schoolname : {item?.student?.schoolname}
                                  </div>
                                  <div>
                                    Locations : {item?.student?.location?.area}
                                  </div>
                                  <div>
                                    Schoolname : {item?.student?.schoolname}
                                  </div>

                                  <div>Classes : {item?.student?.grade}</div>
                                  {paid ? (
                                    <button
                                      onClick={() => {
                                        // handleOpen();
                                      }}
                                      className="px-5 py-1.5 text-[#F0F0F0] mr-2 text-lg font-medium rounded-lg mt-3 bg-primary border-0 flex items-center"
                                    >
                                      <FaCrown className="text-[#BF913B] mr-2" />
                                      Upgraded
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        handleOpen();
                                      }}
                                      className="px-5 py-1.5 text-[#F0F0F0] mr-2 text-lg font-medium rounded-lg mt-3 bg-primary border-0 flex items-center"
                                    >
                                      <FaCrown className="text-[#BF913B] mr-2" />
                                      Upgrade
                                    </button>
                                  )}
                                </div>
                              </div>
                              <hr className="mt-3" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-red md:px-5 px-3 text-xl mt-3">
                      No Subscribers
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <UpgardeModal
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
          />
        </div>
      </div>
    </>
  );
};

export default ReviewsData;
