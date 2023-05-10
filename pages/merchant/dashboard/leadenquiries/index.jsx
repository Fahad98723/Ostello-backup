import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import DashboardSidebar from "../../../../components/pages/Merchant/Dashboard/DashboardSidebar";
import ToggleDashboard from "../../../../components/pages/Merchant/Dashboard/ToggleDashboard";
import {
  authSelector,
  getInstituteDetails,
} from "../../../../redux/slices/authSlice";
import { isEmpty } from "../../../../utils/utils";
import { Box, Menu, MenuItem, Modal, TextField } from "@mui/material";
import { GiCancel } from "react-icons/gi";
import { TbChecks } from "react-icons/tb";
import { FaFilter, FaSortAmountUp } from "react-icons/fa";
import axios from "axios";
import { host } from "../../../../utils/constant";
import { toast } from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "5px",
};

const LeadAndEnquiries = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { instituteDetails, loading, userData } = useSelector(authSelector);
  const [refetch, setRefetch] = useState(false);

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

  const [data, setData] = useState([]);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [deleteCoupon, setDeleteCoupon] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [reFetch, setReFetch] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [numberError, setNumberError] = useState("");

  const handleChange = (event, setFunction) => {
    setFunction(event.target.value);
  };
  const [submitted, setSubmitted] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const [search, setSearch] = useState("");
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        const config = {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${window.localStorage.getItem(
              "ACCESS_TOKEN"
            )}`,
          },
        };
        const { data } = await axios.get(`${host}/forms?limit=50`, config);

        const allData = data?.message?.filter(
          (a) => a?.instituteid === instituteDetails?.id
        );
        if (search?.length && !search1?.length && !search2?.length) {
          const result = allData.filter((cur) => {
            return cur.name.toLowerCase().includes(search.toLowerCase());
          });
          setData(result);
        }
        if (search1?.length && !search?.length && !search2?.length) {
          const result = allData.filter((cur) => {
            return cur.phonenumber
              .toLowerCase()
              .includes(search1.toLowerCase());
          });
          setData(result);
        }
        if (search2?.length && !search?.length && !search1?.length) {
          const result = allData.filter((cur) => {
            return cur?.institutename
              ?.toLowerCase()
              ?.includes(search2?.toLowerCase());
          });
          setData(result);
        }
        // if (search?.length || !search1?.length || !search2?.length ) {
        //   setSearch1('')
        //   setSearch2('')
        //   const result = data.message.filter((cur) => {
        //     return cur.name.toLowerCase().includes(search.toLowerCase());
        //   });
        //   setData(result);
        // }
        if (!search1?.length && !search?.length && !search2?.length) {
          setData(
            data?.message?.filter(
              (a) => a?.instituteid === instituteDetails?.id
            )
          );
        }
      } catch (err) {}
    };

    run();
  }, [reFetch, search, search1, search2]);

  const [singleData, setSingleData] = useState({});
  const [id, setId] = useState();

  useEffect(() => {
    if (id) {
      setSingleData(data.find((d) => d.id === id));
    }
  }, [id, data]);

  useEffect(() => {
    if (singleData) {
      setName(singleData.name);
      setAddress(singleData.address);
      setEmail(singleData.email);
      setNumber(singleData.phonenumber);
      setDescription(singleData.description);
    }
  }, [singleData]);

  const changeHandle = async () => {
    setSubmitted(false);
    if (!name.length || !address.length || !email.length || !number.length) {
      toast.error("Please fill the fields");
      return;
    }

    const d = {
      id,
      updates: {
        name,
        email,
        phonenumber: number,
        address,
        description,
        courseid: singleData?.courseid,
        instituteid: singleData?.instituteid,
        institutename: singleData?.institutename,
        coursename: singleData?.coursename,
      },
    };
    try {
      const data = await axios.patch(`${host}/forms/`, d, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      });
      toast.success(data.data.message);
      setSubmitted(true);
      setEmail("");
      setName("");
      setDescription("");
      setAddress("");
      setNumber("");
      handleClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setReFetch(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      };
      const { data } = await axios.delete(`${host}/forms?id=${id}`, config);
      // 
      // setEntranceExamData(data.message);
      setReFetch(true);
      toast.success("Deleted successfully");
    } catch (err) {
      toast.error(err.toString());
    } finally {
      setDeleteCoupon(false);
    }
  };

  const handleCopy = (item) => {
    const data = `
      Name : ${item.name},
      Address: ${item.address},
      Mobile: ${item.phonenumber},
      Registration: ${new Date(item?.timestamp).toLocaleDateString()},
      Description: ${item.description}
      `;
    navigator.clipboard.writeText(data);
    toast.success("Data Copied");
  };

  useEffect(() => {
    if (deleteCoupon) {
      handleDelete(id);
    }
  }, [id, deleteCoupon]);

  const [filterAnchorEl, setFilterAnchorEl] = React.useState(null);
  const filterOpen = Boolean(filterAnchorEl);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const searchOpen = Boolean(anchorEl);

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSearchClose = () => {
    setAnchorEl(null);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleByDate = () => {
    const sortedDates = data?.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
    setData(sortedDates);
    handleSearchClose();
  };

  return (
    <>
      <div className="dashboard">
        <ToggleDashboard
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        ></ToggleDashboard>
        <div className=" grid grid-cols-6 gap-0 bg-white ">
          <DashboardSidebar />
          <div
            style={{ background: " #FAFAFB" }}
            className="  col-span-6 px-5 lg:col-span-5  "
            onClick={() => setShowSidebar(false)}
          >
            <div className="heading p-5 mb-5 flex justify-between">
              <h1 className="text-2xl font-bold ">Leads & Enquiries</h1>
            </div>

            <div className="bg-white md:mr-3 md:p-3 rounded-lg">
              <div className="md:flex gap-x-1 md:px-5 px-3  justify-between">
                <h3 className="md:font-bold md:text-[19px] text-[16px] text-[#252733]">
                  All Enquire Data
                </h3>

                <div className="flex md:gap-x-8 gap-x-5 items-center">
                  <div
                    id="basic-button"
                    aria-controls={searchOpen ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={searchOpen ? "true" : undefined}
                    onClick={handleClick}
                    className="flex items-center"
                  >
                    <FaSortAmountUp className="text-[#C5C7CD]" />
                    <span className=" cursor-pointer font-bold md:block hidden ml-2">
                      Sort
                    </span>
                  </div>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={searchOpen}
                    onClose={handleSearchClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={() => handleByDate()}>By Date</MenuItem>
                    {/* <MenuItem onClick={() => handleByType()}>By Type</MenuItem> */}
                  </Menu>
                  <div
                    onClick={handleFilterClick}
                    id="basic-button"
                    aria-controls={filterOpen ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={filterOpen ? "true" : undefined}
                    className="flex items-center cursor-pointer"
                  >
                    <FaFilter className="text-[#C5C7CD]" />
                    <span className="font-bold md:block hidden ml-2">
                      Filter
                    </span>
                  </div>
                  <Menu
                    id="basic-menu"
                    anchorEl={filterAnchorEl}
                    open={filterOpen}
                    onClose={handleFilterClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <div className="w-[250px] p-3">
                      <input
                        onChange={(e) => {
                          setSearch(e.target.value);
                          setSearch1("");
                          setSearch2("");
                        }}
                        value={search}
                        placeholder="Search By Student Name"
                        className="border border-2 w-full p-2 mb-2"
                      />
                      <input
                        type="number"
                        onChange={(e) => {
                          setSearch1(e.target.value);
                          setSearch("");
                          setSearch2("");
                        }}
                        value={search1}
                        placeholder="Search By Phonenumber "
                        className="border border-2 w-full p-2 mb-2"
                      />
                    </div>
                  </Menu>
                </div>
              </div>
              <p className="text-xl md:px-5 px-3">
                Total Form Data {data?.length}
              </p>
              <table className="mt-10 md:block hidden table-auto">
                <thead className="bg-white table w-full table-fixed border-b border-light-gray">
                  <tr>
                    <th
                      scope="col"
                      className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                    >
                      Name of Students
                    </th>
                    <th
                      scope="col"
                      className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                    >
                      Name of Institute
                    </th>
                    <th
                      scope="col"
                      className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                    >
                      Name of Course
                    </th>
                    <th
                      scope="col"
                      className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                    >
                      Students Phone Number
                    </th>

                    <th
                      scope="col"
                      className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                    >
                      Date & Time
                    </th>
                    <th
                      scope="col"
                      className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                    >
                      Address
                    </th>

                    <th
                      scope="col"
                      className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                    ></th>
                  </tr>
                </thead>
                <tbody className="block max-h-[70vh] scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-gray-100 overflow-y-auto">
                  {data?.map((d, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b border-light-gray cursor-pointer transition duration-300 ease-in-out hover:bg-light-gray table w-full table-fixed"
                    >
                      <td className="px-6 py-4  font-medium text-[#252733]">
                        <div className="flex items-center ">
                          {/* <img
                      className='w-[50px] h-[50px] rounded-full'
                      src={d?.images?.length > 0 ? `https://cdn.ostello.co.in/${d?.images[0]?.key}` : defaultImage.src}
                      alt=''
                    /> */}
                          {d?.profilepic?.length ? (
                            <img
                              className="mr-2 h-10 w-10 rounded-full"
                              src={`https://cdn.ostello.co.in/${d?.profilepic[0]?.key}`}
                              alt=""
                            />
                          ) : (
                            <div className="bg-primary mr-3  h-10 w-10 rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                              {d?.name?.slice(0, 1).toUpperCase()}
                            </div>
                          )}
                          <div className="w-full ">
                            <p className={`font-bold `}>{d.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-[#252733] font-medium px-6 py-4">
                        <div className="flex flex-col">
                          <p className="font-bold"> {d?.institutename}</p>
                          {/* <p className='text-[11px] text-[#717171]'>
                      Established on {d.establishedyear}
                    </p> */}
                        </div>
                      </td>
                      <td className="text-[#252733] font-medium px-6 py-4">
                        <div className="flex flex-col">
                          <p className="font-bold"> {d?.coursename}</p>
                          {/* <p className='text-[11px] text-[#717171]'>
                      Established on {d.establishedyear}
                    </p> */}
                        </div>
                      </td>
                      <td className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <p className="font-bold"> {d?.phonenumber}</p>
                          {/* <p className='text-[11px] text-[#717171]'>
                      Established on {d.establishedyear}
                    </p> */}
                        </div>
                      </td>

                      <td className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <p className="font-bold">
                            {" "}
                            {/* {d?.registeredon?.split("T")[0]} */}
                            {new Date(d?.timestamp).toLocaleDateString()}
                          </p>
                          <p className="text-[11px] text-[#717171]">
                            {/* {recentData??.registeredon?.split("T")[1].split(".")[0]} */}
                            {new Date(d?.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </td>
                      <td className="text-[#252733] font-medium px-6 py-4 ">
                        <div className="flex flex-col">
                          <p className="font-bold"> {d?.address}</p>
                        </div>
                      </td>

                      <td className="text-[#252733] flex items-center justify-between font-medium px-6 py-4 whitespace-nowrap">
                        <div
                          onClick={() => {
                            setOpen(true);
                            setId(d?.id);
                          }}
                          className="  block p-2 shadow-lg cursor-pointer bg-primary text-white rounded"
                        >
                          Read
                        </div>

                        <div
                          onClick={() => {
                            handleCopy(d);
                          }}
                          className="  block p-2 shadow-lg cursor-pointer bg-primary text-white rounded"
                        >
                          Copy
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <>
                <div className="md:hidden block p-3">
                  <h3 className="mb-3 font-bold text-[#9FA2B4]">
                    Enquire Data List
                  </h3>
                  <div className="flex space-y-4 flex-col">
                    {data?.map((data, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-[#252733] font-bold ">
                                {data?.name}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex mt-3 space-x-1 justify-between">
                          <div className="w-6/12 text-[#717171] text-sm">
                            {/* <div>Applicant Name :</div>
                        <div>Time of Registration :</div> */}

                            <div>Class :</div>
                            <div>Phonenumber :</div>
                            <div>Adress :</div>
                            <div className=""></div>
                          </div>
                          <div className="w-6/12 font-bold text-sm">
                            {/* <div>{data?.registeredon?.split("T")[0]}</div>  */}
                            <div>{data?.class}</div>
                            <div>{data?.phonenumber}</div>
                            <div>{data?.address}</div>
                          </div>
                        </div>
                        <hr className="mt-3" />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex justify-between ">
              <p className="text-xl font-bold"> Data Description</p>
              <GiCancel
                onClick={() => {
                  handleClose();
                }}
                className="text-right text-2xl text-primary cursor-pointer"
              ></GiCancel>
            </div>

            <div id="" className=" mt-3">
              <div className="md:flex justify-between">
                <div className="shrink  w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                  <textarea
                    rows={5}
                    type="text"
                    autoFocus
                    readOnly
                    className="text-base bg-[#F6F6F6] p-3 focus:outline-none border-2 border-solid border-light-gray  w-full"
                    placeholder="How can Ostello help you ?"
                    onChange={(e) => handleChange(e, setDescription)}
                    value={description}
                  />
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default LeadAndEnquiries;
