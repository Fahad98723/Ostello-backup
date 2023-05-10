import React, { useEffect, useState } from "react";
import DeleteConfirmationModal from "../../../components/pages/AdminDashboard/AdminModal/DeleteConfirmationModal/DeleteConfirmationModal";
import { FaFilter, FaSortAmountUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import AdminDashboard from "../../../components/pages/AdminDashboard/AdminDashboard";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { DeleteIcon } from "../../../components/SVGIcons";
import { host } from "../../../utils/constant";
import {
  Box,
  Menu,
  MenuItem,
  Modal,
  Pagination,
  TextField,
} from "@mui/material";
import { GiCancel } from "react-icons/gi";
import { TbChecks } from "react-icons/tb";

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

const Enquire = () => {
  const [data, setData] = useState([]);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [deleteCoupon, setDeleteCoupon] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [program, setProgram] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [reFetch, setReFetch] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [examsEnquire, setExamsEnquire] = useState(false);
  const [registrationDataShow, setRegistrationDataShow] = useState(false);

  const handleChange = (event, setFunction) => {
    setFunction(event.target.value);
  };
  const handleExamToggle = () => {
    setExamsEnquire(!examsEnquire);
    setRegistrationDataShow(false);
  };
  const [submitted, setSubmitted] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const [regModalopen, setRegModalOpen] = useState(false);

  const handleCloseRegModal = () => setRegModalOpen(false);

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
        const { data } = await axios.get(`${host}/forms/`, config);

        // if (search?.length || !search1?.length || !search2?.length ) {
        //   setSearch1('')
        //   setSearch2('')
        //   const result = data.message.filter((cur) => {
        //     return cur.name.toLowerCase().includes(search.toLowerCase());
        //   });
        //   setData(result);
        // }

        if (examsEnquire) {
          const examData = data?.message?.filter(
            (items) => items?.program !== null
          );
          if (search?.length && !search1?.length && !search2?.length) {
            const result = examData?.filter((cur) => {
              return cur.name.toLowerCase().includes(search.toLowerCase());
            });
            setData(result);
          }
          if (search1?.length && !search?.length && !search2?.length) {
            const result = examData?.filter((cur) => {
              return cur.phonenumber
                .toLowerCase()
                .includes(search1.toLowerCase());
            });
            setData(result);
          }
          if (search2?.length && !search?.length && !search1?.length) {
            const result = examData?.filter((cur) => {
              return cur?.institutename
                ?.toLowerCase()
                ?.includes(search2?.toLowerCase());
            });
            setData(result);
          }

          if (!search1?.length && !search?.length && !search2?.length) {
            setData(examData);
          }
        } else {
          const allData = data.message?.filter(
            (items) => items?.program === null
          );
          if (search?.length && !search1?.length && !search2?.length) {
            const result = allData?.filter((cur) => {
              return cur.name.toLowerCase().includes(search.toLowerCase());
            });
            setData(result);
          }
          if (search1?.length && !search?.length && !search2?.length) {
            const result = allData?.filter((cur) => {
              return cur.phonenumber
                .toLowerCase()
                .includes(search1.toLowerCase());
            });
            setData(result);
          }
          if (search2?.length && !search?.length && !search1?.length) {
            const result = allData?.filter((cur) => {
              return cur?.institutename
                ?.toLowerCase()
                ?.includes(search2?.toLowerCase());
            });
            setData(result);
          }

          if (!search1?.length && !search?.length && !search2?.length) {
            setData(allData);
          }
        }
      } catch (err) {
        
      } finally {
        setReFetch(false);
      }
    };

    run();
  }, [reFetch, search, search1, search2, examsEnquire]);

  const [skip, setSkip] = useState(0);
  const [paginationButton, setPaginationButton] = useState();
  const [limit, setLimit] = useState(20);
  const [registrationData, setRegistrationData] = useState([]);

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
        const { data } = await axios.get(
          `${host}/offers/all?name=${search}&phonenumber=${search1}&limit=${limit}&skip=${skip}`,
          config
        );



        getData(data.message);
        // setRegistrationData(data.message);
        if (skip === 0) {
          setPaginationButton(Math.ceil(data.count / 20));
        }

        if (skip !== 0) {
          setPaginationButton(Math.ceil(data.count / 20));
        }

        setRegistrationData(data.message);
        

      
      } catch (err) {
        
      } finally {
        setReFetch(false);
      }
    };

    run();
  }, [reFetch, search, search1, limit, skip]);


  async function getData(elements) {
    const promises = elements.map(async (element) => {
      // Make async call to get data for element
      const data = await fetch(`${host}/institute?id=${element?.details?.instituteid}`).then((res) => res.json());
      // Return element with the retrieved data
      return { ...element, data };
    });
    // Wait for all promises to resolve
    const results = await Promise.all(promises);
    
    setRegistrationData(results)
    // Return array of elements with data
    return results;
  }

  const [singleData, setSingleData] = useState({});
  const [id, setId] = useState();

  const [regSingleData, setRegSingleData] = useState({});
  const [regId, setRegId] = useState();

  useEffect(() => {
    if (id) {
      setSingleData(data.find((d) => d.id === id));
    }
  }, [id, data]);

  useEffect(() => {
    if (singleData) {
      setName(singleData?.name);
      setAddress(singleData?.address);
      setEmail(singleData?.email);
      setNumber(singleData?.phonenumber);
      setProgram(singleData?.program);
      setYear(singleData?.year);
    }
  }, [singleData]);

  const changeHandle = async () => {
    setSubmitted(false);
    if (!name.length || !address.length || !email.length || !number.length) {
      toast.error("Please fill the fields");
      return;
    }

    let d = {};

    examsEnquire
      ? (d = {
          id,
          updates: {
            name,
            email,
            phonenumber: number,
            address,
            program: program,
            year: year,
          },
        })
      : (d = {
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
        });
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

  const handleRegDelete = async (id) => {
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      };
      const { data } = await axios.delete(`${host}/offers?id=${id}`, config);
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

  useEffect(() => {
    if (deleteCoupon) {
      if (registrationDataShow) {
        handleRegDelete(regId);
      } else {
        handleDelete(id);
      }
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
    <div>
      <AdminDashboard currentSection="Enquire Data">
        <div className="bg-white md:mr-3 md:p-3 rounded-lg">
          <div className="md:flex gap-x-1 md:px-5 px-3  justify-between">
            <h3 className="md:font-bold md:text-[19px] text-[16px] text-[#252733]">
              All Enquire Data
            </h3>

            <div className="md:flex md:gap-x-8  gap-x-5 items-center">
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
              

              <input
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSearch1("");
                  setSearch2("");
                }}
                value={search}
                placeholder="Search By Student Name"
                className="border w-full p-1 md:mb-0 my-1"
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
                className="border w-full p-1 md:mb-0 mb-1"
              />
              <input
                onChange={(e) => {
                  setSearch2(e.target.value);
                  setSearch("");
                  setSearch1("");
                }}
                value={search2}
                placeholder="Search By Institutions Name"
                className="border w-full p-1 md:mb-0 mb-1"
              />
            </div>
          </div>
          <p className="text-xl md:px-5 px-3">
            Total Form Data{" "}
            {registrationDataShow ? registrationData?.length : data?.length}
          </p>
          <button
            onClick={() => {
              handleExamToggle();
            }}
            className="px-5 py-1.5 text-[#F0F0F0] mr-2 text-lg font-medium rounded-lg mt-3 bg-primary border-0"
          >
            {!examsEnquire ? "Cuet Exam Enquire" : "Enquire Data"}
          </button>

          <button
            onClick={() => {
              setRegistrationDataShow(true);
            }}
            className="px-5 py-1.5 text-[#F0F0F0] mr-2 text-lg font-medium rounded-lg mt-3 bg-primary border-0"
          >
            Registration Form
          </button>
          {registrationDataShow ? (
            <>
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
                      Name of School
                    </th>

                    <th
                      scope="col"
                      className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                    >
                      Selected Coaching
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
                      Fathers Phone Number
                    </th>

                    <th
                      scope="col"
                      className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                    >
                      Class
                    </th>
                    <th
                      scope="col"
                      className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                    >
                      Payment Details
                    </th>

                    <th
                      scope="col"
                      className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                    ></th>
                  </tr>
                </thead>
                <tbody className="block max-h-[70vh] scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-gray-100 overflow-y-auto">
                  {registrationData?.map((d, index) => (
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
                          {d?.student?.avatar?.length ? (
                            <img
                              className="mr-2 h-10 w-10 rounded-full"
                              src={`https://cdn.ostello.co.in/${d?.student?.avatar?.key}`}
                              alt=""
                            />
                          ) : (
                            <div className="bg-primary mr-3  h-10 w-10 rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                              {d?.student?.name?.slice(0, 1).toUpperCase()}
                            </div>
                          )}
                          <div className="w-full ">
                            <p className={`font-bold `}>{d?.student?.name}</p>
                          </div>
                        </div>
                      </td>

                      <td className="text-[#252733] font-medium px-6 py-4">
                        <div className="flex flex-col">
                          <p className="font-bold"> {d?.details?.schoolname}</p>
                          {/* <p className='text-[11px] text-[#717171]'>
                      Established on {d.establishedyear}
                    </p> */}
                        </div>
                      </td>

                      <td className="text-[#252733] font-medium px-6 py-4">
                        <div className="flex flex-col">
                          <p className="font-bold"> {
                           d?.data?.message?.name
                          }</p>
                          {/* <p className='text-[11px] text-[#717171]'>
                      Established on {d.establishedyear}
                    </p> */}
                        </div>
                      </td>

                      <td className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <p className="font-bold">
                            {" "}
                            {d?.student?.phonenumber}
                          </p>
                          {/* <p className='text-[11px] text-[#717171]'>
                      Established on {d.establishedyear}
                    </p> */}
                        </div>
                      </td>

                      <td className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <p className="font-bold">
                            {" "}
                            {d?.details?.fathersphonenumber}
                          </p>
                          {/* <p className='text-[11px] text-[#717171]'>
                      Established on {d.establishedyear}
                    </p> */}
                        </div>
                      </td>

                      <td className="text-[#252733] font-medium px-6 py-4 ">
                        <div className="flex flex-col">
                          <p className="font-bold"> {d?.details?.classes}</p>
                        </div>
                      </td>


                      <td className="text-[#252733] font-medium px-6 py-4 ">
                        <div className="flex flex-col">
                          <p className="font-bold"> {d?.details?.paymentmode}</p>
                        </div>
                      </td>

                      <td className="text-[#252733] flex items-center justify-between font-medium px-6 py-4 whitespace-nowrap">
                        {/* <div className="">
                          <div
                            onClick={() => {
                              setRegModalOpen(true);
                              setRegId(d?.id);
                            }}
                            className="bg-white w-[40px] block p-2.5 shadow-lg cursor-pointer rounded-full"
                          >
                            <BiEdit className="text-2xl text-blue" />
                          </div>
                        </div> */}
                        <div className="">
                          <div
                            onClick={() => {
                              setRegId(d?.id);
                              setDeleteConfirmationModal(true);
                            }}
                            className="bg-white w-[40px] block p-2.5 shadow-lg cursor-pointer rounded-full"
                          >
                            <DeleteIcon />
                          </div>
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
                    {registrationData?.map((data, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-[#252733] font-bold ">
                                {data?.details?.name}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex mt-3 space-x-1 justify-between">
                          <div className=" text-[#717171] text-sm">
                            {/* <div>Applicant Name :</div>
                        <div>Time of Registration :</div> */}
                            <div>Phonenumber : {data?.student?.phonenumber}</div>
                            <div>Father's Phonenumber :  {data?.details?.fathersphonenumber}</div>
                      
                            <div>Classes : {data?.details?.classes}</div>

                            <div className=""></div>
                          </div>
                          <div className=" font-bold text-sm">
                            {/* <div>{data?.registeredon?.split("T")[0]}</div>  */}
                           
                            <div className="flex">
                              <div
                                onClick={() => {
                                  setRegId(data?.id);
                                  setDeleteConfirmationModal(true);
                                }}
                                className="bg-white w-[40px] block p-2.5 shadow-lg cursor-pointer rounded-full"
                              >
                                <DeleteIcon />
                              </div>
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
                sx={{
                  mt: 2,
                }}
                count={paginationButton}
                variant="outlined"
                shape="rounded"
              />
            </>
          ) : (
            <>
              <table className="mt-10 md:block hidden table-auto">
                <thead className="bg-white table w-full table-fixed border-b border-light-gray">
                  <tr>
                    <th
                      scope="col"
                      className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                    >
                      Name of Students
                    </th>
                    {!examsEnquire && (
                      <th
                        scope="col"
                        className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                      >
                        Name of Institute
                      </th>
                    )}
                    {!examsEnquire && (
                      <th
                        scope="col"
                        className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                      >
                        Name of Course
                      </th>
                    )}
                    {examsEnquire && (
                      <th
                        scope="col"
                        className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                      >
                        Name of Exam
                      </th>
                    )}
                    {examsEnquire && (
                      <th
                        scope="col"
                        className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                      >
                        Preferred Program
                      </th>
                    )}
                    {examsEnquire && (
                      <th
                        scope="col"
                        className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                      >
                        Year of Appearing
                      </th>
                    )}
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
                      {!examsEnquire && (
                        <td className="text-[#252733] font-medium px-6 py-4">
                          <div className="flex flex-col">
                            <p className="font-bold"> {d?.institutename}</p>
                            {/* <p className='text-[11px] text-[#717171]'>
                      Established on {d.establishedyear}
                    </p> */}
                          </div>
                        </td>
                      )}
                      {!examsEnquire && (
                        <td className="text-[#252733] font-medium px-6 py-4">
                          <div className="flex flex-col">
                            <p className="font-bold"> {d?.coursename}</p>
                            {/* <p className='text-[11px] text-[#717171]'>
                      Established on {d.establishedyear}
                    </p> */}
                          </div>
                        </td>
                      )}
                      {examsEnquire && (
                        <td className="text-[#252733] font-medium px-6 py-4">
                          <div className="flex flex-col">
                            <p className="font-bold"> Cuet </p>
                            {/* <p className='text-[11px] text-[#717171]'>
                      Established on {d.establishedyear}
                    </p> */}
                          </div>
                        </td>
                      )}
                      {examsEnquire && (
                        <td className="text-[#252733] font-medium px-6 py-4">
                          <div className="flex flex-col">
                            <p className="font-bold"> {d?.program} </p>
                          </div>
                        </td>
                      )}
                      {examsEnquire && (
                        <td className="text-[#252733] font-medium px-6 py-4">
                          <div className="flex flex-col">
                            <p className="font-bold"> {d?.year} </p>
                          </div>
                        </td>
                      )}
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

                          {/* <div>
                        
                      </div>

                      <div className="text-[#9FA2B4] text-sm">
                        
                      </div> */}
                        </div>
                      </td>
                      <td className="text-[#252733] font-medium px-6 py-4 ">
                        <div className="flex flex-col">
                          <p className="font-bold"> {d?.address}</p>
                        </div>
                      </td>

                      <td className="text-[#252733] flex items-center justify-between font-medium px-6 py-4 whitespace-nowrap">
                        <div className="">
                          <div
                            onClick={() => {
                              setOpen(true);
                              setId(d?.id);
                            }}
                            className="bg-white w-[40px] block p-2.5 shadow-lg cursor-pointer rounded-full"
                          >
                            <BiEdit className="text-2xl text-blue" />
                          </div>
                        </div>
                        <div className="">
                          <div
                            onClick={() => {
                              setId(d?.id);
                              setDeleteConfirmationModal(true);
                            }}
                            className="bg-white w-[40px] block p-2.5 shadow-lg cursor-pointer rounded-full"
                          >
                            <DeleteIcon />
                          </div>
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
                            <div>Phonenumber :</div>
                            {examsEnquire && <div>Preferred program :</div>}
                            {examsEnquire && <div>Years of Appearing :</div>}
                            {!examsEnquire && <div>Institute :</div>}
                            {!examsEnquire && <div>Course :</div>}
                            <div>Adress :</div>

                            <div className=""></div>
                          </div>
                          <div className="w-6/12 font-bold text-sm">
                            {/* <div>{data?.registeredon?.split("T")[0]}</div>  */}
                            <div>{data?.phonenumber}</div>
                            {examsEnquire && <div>{data?.program}</div>}
                            {examsEnquire && <div>{data?.year}</div>}
                            {!examsEnquire && <div>{data?.institutename}</div>}
                            {!examsEnquire && <div>{data?.coursename}</div>}
                            <div>{data?.address}</div>

                            <div className="flex">
                              <div
                                onClick={() => {
                                  setId(data?.id);
                                  setDeleteConfirmationModal(true);
                                }}
                                className="bg-white w-[40px] block p-2.5 shadow-lg cursor-pointer rounded-full"
                              >
                                <DeleteIcon />
                              </div>
                              <div
                                onClick={() => {
                                  setOpen(true);
                                  setId(data?.id);
                                }}
                                className="bg-white w-[40px] ml-2 block p-2.5 shadow-lg cursor-pointer rounded-full"
                              >
                                <BiEdit className="text-2xl text-blue" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className="mt-3" />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            </>
          )}
        </div>

        {deleteConfirmationModal && (
          <DeleteConfirmationModal
            setDeleteCoupon={setDeleteCoupon}
            setDeleteConfirmationModal={setDeleteConfirmationModal}
          />
        )}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex justify-between ">
              <p className="text-xl font-bold"> Enquire Data Update</p>
              <GiCancel
                onClick={() => {
                  handleClose();
                }}
                className="text-right text-2xl text-primary cursor-pointer"
              ></GiCancel>
            </div>

            <div id="" className=" mt-3">
              <div className="md:flex justify-between md:mb-3">
                <div className="shrink md:pr-3 md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                  <p className="text-base mb-1 text-[#333333] font-semibold">
                    Your Name
                  </p>
                  <input
                    type="text"
                    autoFocus
                    className="text-base bg-[#F6F6F6] p-3 focus:outline-none border-2 border-solid border-light-gray  w-full"
                    placeholder="Enter your name"
                    onChange={(e) => handleChange(e, setName)}
                    value={name}
                  />
                </div>
                <div className="shrink   md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                  <p className="text-base mb-1 text-[#333333] font-semibold">
                    Phone Number
                  </p>
                  <input
                    type="text"
                    autoFocus
                    className="text-base bg-[#F6F6F6] p-3 focus:outline-none border-2 border-solid border-light-gray  w-full"
                    placeholder="Enter your phone number"
                    onChange={(e) => handleChange(e, setNumber)}
                    value={number}
                  />
                </div>
              </div>
              <div className="md:flex justify-between md:mb-3">
                <div className="shrink md:pr-3  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                  <p className="text-base mb-1 text-[#333333] font-semibold">
                    Email
                  </p>
                  <input
                    type="text"
                    autoFocus
                    className="text-base bg-[#F6F6F6] p-3 focus:outline-none border-2 border-solid border-light-gray  w-full"
                    placeholder="Enter your email"
                    onChange={(e) => handleChange(e, setEmail)}
                    value={email}
                  />
                </div>
                <div className="shrink  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                  <p className="text-base mb-1 text-[#333333] font-semibold">
                    Address
                  </p>
                  <input
                    type="text"
                    autoFocus
                    className="text-base bg-[#F6F6F6] p-3 focus:outline-none border-2 border-solid border-light-gray  w-full"
                    placeholder="Enter your address"
                    onChange={(e) => handleChange(e, setAddress)}
                    value={address}
                  />
                </div>
              </div>
              {!examsEnquire && (
                <div className="md:flex justify-between">
                  <div className="shrink  w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                    <p className="text-base mb-1 text-[#333333] font-semibold">
                      Description <small>(optional)</small>
                    </p>
                    <textarea
                      rows={5}
                      type="text"
                      autoFocus
                      className="text-base bg-[#F6F6F6] p-3 focus:outline-none border-2 border-solid border-light-gray  w-full"
                      placeholder="How can Ostello help you ?"
                      onChange={(e) => handleChange(e, setDescription)}
                      value={description}
                    />
                  </div>
                </div>
              )}
              {examsEnquire && (
                <div className="shrink  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                  <p className="text-base mb-1 text-[#333333] font-semibold">
                    Preferred Program
                  </p>
                  <input
                    type="text"
                    autoFocus
                    className="text-base bg-[#F6F6F6] p-3 focus:outline-none border-2 border-solid border-light-gray  w-full"
                    placeholder="Preferred Program"
                    onChange={(e) => handleChange(e, setProgram)}
                    value={program}
                  />
                </div>
              )}
              {examsEnquire && (
                <div className="shrink  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                  <p className="text-base mb-1 text-[#333333] font-semibold">
                    Year of Appearing
                  </p>
                  <input
                    type="text"
                    autoFocus
                    className="text-base bg-[#F6F6F6] p-3 focus:outline-none border-2 border-solid border-light-gray  w-full"
                    placeholder="Year of Appearing"
                    onChange={(e) => handleChange(e, setYear)}
                    value={year}
                  />
                </div>
              )}
              <div className="flex float-right items-center">
                {/* {submitted ? (
                  <p className="text-[19px] mr-3 flex items-center">
                    {" "}
                    <TbChecks className="mr-2" />{" "}
                    <span className="font-bold">Thank you</span>, You have
                    update data successfully.
                  </p>
                ) : (
                  ""
                )} */}
                <button
                  onClick={() => {
                    changeHandle();
                  }}
                  className="  mr-2 mt-3 px-5 py-2 bg-black rounded-md mb-3 text-white active:opacity-80 text-[18px]"
                >
                  Update
                </button>
              </div>
            </div>
          </Box>
        </Modal>

        <Modal
          open={regModalopen}
          onClose={handleCloseRegModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex justify-between ">
              <p className="text-xl font-bold"> Reg Data Update</p>
              <GiCancel
                onClick={() => {
                  handleCloseRegModal();
                }}
                className="text-right text-2xl text-primary cursor-pointer"
              ></GiCancel>
            </div>

            <div id="" className=" mt-3">
              <div className="md:flex justify-between md:mb-3">
                <div className="shrink md:pr-3 md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                  <p className="text-base mb-1 text-[#333333] font-semibold">
                    Your Name
                  </p>
                  <input
                    type="text"
                    autoFocus
                    className="text-base bg-[#F6F6F6] p-3 focus:outline-none border-2 border-solid border-light-gray  w-full"
                    placeholder="Enter your name"
                    onChange={(e) => handleChange(e, setName)}
                    value={name}
                  />
                </div>
                <div className="shrink   md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                  <p className="text-base mb-1 text-[#333333] font-semibold">
                    Phone Number
                  </p>
                  <input
                    type="text"
                    autoFocus
                    className="text-base bg-[#F6F6F6] p-3 focus:outline-none border-2 border-solid border-light-gray  w-full"
                    placeholder="Enter your phone number"
                    onChange={(e) => handleChange(e, setNumber)}
                    value={number}
                  />
                </div>
              </div>
              <div className="md:flex justify-between md:mb-3">
                <div className="shrink md:pr-3  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                  <p className="text-base mb-1 text-[#333333] font-semibold">
                    Email
                  </p>
                  <input
                    type="text"
                    autoFocus
                    className="text-base bg-[#F6F6F6] p-3 focus:outline-none border-2 border-solid border-light-gray  w-full"
                    placeholder="Enter your email"
                    onChange={(e) => handleChange(e, setEmail)}
                    value={email}
                  />
                </div>
                <div className="shrink  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                  <p className="text-base mb-1 text-[#333333] font-semibold">
                    Address
                  </p>
                  <input
                    type="text"
                    autoFocus
                    className="text-base bg-[#F6F6F6] p-3 focus:outline-none border-2 border-solid border-light-gray  w-full"
                    placeholder="Enter your address"
                    onChange={(e) => handleChange(e, setAddress)}
                    value={address}
                  />
                </div>
              </div>
              {!examsEnquire && (
                <div className="md:flex justify-between">
                  <div className="shrink  w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                    <p className="text-base mb-1 text-[#333333] font-semibold">
                      Description <small>(optional)</small>
                    </p>
                    <textarea
                      rows={5}
                      type="text"
                      autoFocus
                      className="text-base bg-[#F6F6F6] p-3 focus:outline-none border-2 border-solid border-light-gray  w-full"
                      placeholder="How can Ostello help you ?"
                      onChange={(e) => handleChange(e, setDescription)}
                      value={description}
                    />
                  </div>
                </div>
              )}
              {examsEnquire && (
                <div className="shrink  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                  <p className="text-base mb-1 text-[#333333] font-semibold">
                    Preferred Program
                  </p>
                  <input
                    type="text"
                    autoFocus
                    className="text-base bg-[#F6F6F6] p-3 focus:outline-none border-2 border-solid border-light-gray  w-full"
                    placeholder="Preferred Program"
                    onChange={(e) => handleChange(e, setProgram)}
                    value={program}
                  />
                </div>
              )}
              {examsEnquire && (
                <div className="shrink  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                  <p className="text-base mb-1 text-[#333333] font-semibold">
                    Year of Appearing
                  </p>
                  <input
                    type="text"
                    autoFocus
                    className="text-base bg-[#F6F6F6] p-3 focus:outline-none border-2 border-solid border-light-gray  w-full"
                    placeholder="Year of Appearing"
                    onChange={(e) => handleChange(e, setYear)}
                    value={year}
                  />
                </div>
              )}
              <div className="flex float-right items-center">
                {/* {submitted ? (
                  <p className="text-[19px] mr-3 flex items-center">
                    {" "}
                    <TbChecks className="mr-2" />{" "}
                    <span className="font-bold">Thank you</span>, You have
                    update data successfully.
                  </p>
                ) : (
                  ""
                )} */}
                <button
                  onClick={() => {
                    // changeHandle();
                  }}
                  className="  mr-2 mt-3 px-5 py-2 bg-black rounded-md mb-3 text-white active:opacity-80 text-[18px]"
                >
                  Update
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </AdminDashboard>
    </div>
  );
};

export default Enquire;
