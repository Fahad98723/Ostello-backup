import React, { useEffect, useState } from "react";
import { FaSortAmountUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import AdminDashboard from "../../../components/pages/AdminDashboard/AdminDashboard";

import {
  Checkbox, Menu,
  MenuItem,
  Pagination
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import DeleteConfirmationModal from "../../../components/pages/AdminDashboard/AdminModal/DeleteConfirmationModal/DeleteConfirmationModal";
import EditEntranceExam from "../../../components/pages/AdminDashboard/EntranceExam/EditEntranceExam";
import { DeleteIcon } from "../../../components/SVGIcons";
import { authSelector } from "../../../redux/slices/authSlice";
import { host } from "../../../utils/constant";

const EntranceExams = () => {
  const router = useRouter();

  const handleOnclick = (id) => {
    // router.push(`/admin-dashboard/institutes/details/${id}`)
  };

  const dispatch = useDispatch();
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [reFetch, setReFetch] = useState(false);
  const [entranceExamData, setEntranceExamData] = useState([]);
  const [id, setId] = useState();
  const [limit, setLimit] = useState(20);
  const [noLimit, setNoLimit] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteCoupon, setDeleteCoupon] = useState(false);
  const { userData } = useSelector(authSelector);
  
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
      const { data } = await axios.delete(`${host}/exam?id=${id}`, config);
      // 
      // setEntranceExamData(data.message);
      
      setReFetch(true);
      toast.success("Deleted successfully");
    } catch (err) {
      toast.error(err.toString());
      
    }
    finally{
      setDeleteCoupon(false)
    }
  };

  const [skip, setSkip] = useState(0);
  const [paginationButton, setPaginationButton] = useState();

  const [type, setType] = React.useState(null);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  

  const [allData, setAllData] = useState([]);

  useEffect(() => {
    if (deleteCoupon) {
      handleDelete(id);
    }
  }, [id, deleteCoupon]);

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
        axios
          .get(
            `${host}/exam?name=${search}&limit=${limit}&skip=${
              skip * 20
            }&nolimit=${noLimit}`,
            config
          )
          .then(function (response) {
            // 
            setEntranceExamData(response.data.message);
            // 
            if(skip === 0){
              setPaginationButton(Math.ceil(response.data.count / 20));
            }
            setReFetch(false);
          });
        axios
          .get(`${host}/exam?nolimit=true`, config)
          .then(function (response) {
            // 
            setAllData(response.data.message);
            if(skip !== 0){
              setPaginationButton(Math.ceil(response.data.count / 20));
            }
            // 
          });
      } catch (err) {
        
      }
    };
    run();
  }, [reFetch, limit, skip, search, noLimit]);

  const [currentValue, setCurrentValue] = useState(false);

  // 

  

  // 

  useEffect(() => {
    if (noLimit) {
      setLimit(0);
    }
    if (!noLimit) {
      setLimit(20);
    }
  }, [noLimit]);

  // const filterByTitle = (item) =>
  // item?.name?.toLowerCase().includes(search?.toLowerCase());

  // 

  const [singleEntrance, setSingleEntrance] = useState({});

  const handleEdit = (eid) => {
    setSingleEntrance(allData?.find((t) => t.id === eid));
    setOpen(true);
  };

  const handleChange = (event) => {
    setNoLimit(event.target.checked);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuopen = Boolean(anchorEl);

  // const handleFilterClick = (event) => {
  //   setFilterAnchorEl(event.currentTarget);
  // };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [recentData, setRecentData] = useState({});

  useEffect(() => {
    const sortedDates = allData
      ?.map((obj) => {
        return { ...obj, date: new Date(obj.registeredon) };
      })
      .sort((a, b) => b.date - a.date);
    setRecentData(sortedDates[0]);
  }, [allData]);

  const handleByDate = () => {
    const sortedDates = entranceExamData
      ?.map((obj) => {
        return { ...obj, date: new Date(obj.registeredon) };
      })
      .sort((a, b) => b.date - a.date);
    setEntranceExamData(sortedDates);
    handleClose();

    
  };

  
  return (
    <div>
      <AdminDashboard currentSection="Entrance Exams">
        <div className="bg-white md:mr-3 md:p-3 rounded-lg">
          <div className="md:flex gap-x-1 md:px-5 px-3  justify-between">
            <h3 className="md:font-bold md:text-[19px] text-[16px] text-[#252733]">
              All Entrance Exam
            </h3>
            <div className="md:flex md:gap-x-8 gap-x-5 items-center">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name"
                className="outline-none border border-gray/20 px-2 "
              />
              <input
                type="number"
                min="0"
                value={limit}
                onChange={(e) => {
                  if (e.target.value > 0) {
                    setLimit(e.target.value);
                  }
                }}
                placeholder="Student Shown"
                className="outline-none border border-gray/20 px-2 md:mt-0 mt-2 "
              />
              <div>
                <div className="flex items-center">
                  <p className="text-sm mr-2 ">NO Limit </p>

                  <Checkbox
                    checked={noLimit && true}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
              </div>
              <div
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="flex items-center"
              >
                <FaSortAmountUp className="text-[#C5C7CD] cursor-pointer" />
                <span className=" cursor-pointer font-bold md:block hidden ml-2">
                  Sort
                </span>
              </div>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={menuopen}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => handleByDate()}>By Date</MenuItem>
                {/* <MenuItem onClick={() => handleByType()}>By Type</MenuItem> */}
              </Menu>
            </div>
          </div>
          <p className="text-xl md:px-5 px-3">
            {allData.length} Students Filled The Form
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
                  Students Phone Number
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
                  Date & Time
                </th>
                <th
                  scope="col"
                  className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                >
                  Location
                </th>

                <th
                  scope="col"
                  className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                ></th>
              </tr>
            </thead>
            <tbody className="block max-h-[70vh] scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-gray-100 overflow-y-auto">
              {
                recentData?.id ? <tr className="bg-white border-2 border-[#FF0000] cursor-pointer transition duration-300 ease-in-out hover:bg-light-gray table w-full table-fixed">
                <td className="px-6 py-4  font-medium text-[#252733]">
                  <div className="flex items-center ">
                    {/* <img
                      className='w-[50px] h-[50px] rounded-full'
                      src={d?.images?.length > 0 ? `https://cdn.ostello.co.in/${d?.images[0]?.key}` : defaultImage.src}
                      alt=''
                    /> */}
                    {recentData?.profilepic?.length ? (
                      <img
                        className="mr-2 h-10 w-10 rounded-full"
                        src={`https://cdn.ostello.co.in/${recentData?.profilepic[0]?.key}`}
                        alt=""
                      />
                    ) : (
                      <div className="bg-primary mr-3  h-10 w-10 rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                        {recentData?.name?.slice(0, 1).toUpperCase()}
                      </div>
                    )}
                    <div className="w-full ">
                      <p className={`font-bold `}>{recentData?.name}</p>
                    </div>
                  </div>
                </td>
                <td className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <p className="font-bold"> {recentData?.phonenumber}</p>
                    {/* <p className='text-[11px] text-[#717171]'>
                      Established on {recentData?.establishedyear}
                    </p> */}
                  </div>
                </td>
                <td className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <p className="font-bold"> {recentData?.class}</p>
                  </div>
                </td>
                <td className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <p className="font-bold">
                      {" "}
                      {/* {recentData??.registeredon?.split("T")[0]} */}
                      {new Date(recentData?.registeredon).toLocaleDateString()}
                    </p>
                    <p className="text-[11px] text-[#717171]">
                      {/* {recentData??.registeredon?.split("T")[1].split(".")[0]} */}
                      {new Date(recentData?.registeredon).toLocaleTimeString()}
                    </p>
                    {/* <div>
                        
                      </div>

                      <div className="text-[#9FA2B4] text-sm">
                        
                      </div> */}
                  </div>
                </td>
                <td className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <p className="font-bold"> {recentData?.address?.area}</p>
                    <p className="text-[11px] text-[#717171]">
                      {recentData?.address?.city}
                    </p>
                  </div>
                </td>

                <td className="text-[#252733] flex items-center justify-between font-medium px-6 py-4 whitespace-nowrap">
                  <div className="">
                    <div
                      onClick={() => {
                        handleEdit(recentData?.id);
                      }}
                      className="bg-white w-[40px] block p-2.5 shadow-lg cursor-pointer rounded-full"
                    >
                      <BiEdit className="text-2xl text-blue" />
                    </div>
                  </div>
                  <div className="">
                    <div
                      onClick={() => {
                        setId(recentData?.id);
                        setDeleteConfirmationModal(true);
                      }}
                      className="bg-white w-[40px] block p-2.5 shadow-lg cursor-pointer rounded-full"
                    >
                      <DeleteIcon />
                    </div>
                  </div>
                </td>
              </tr> : ''
              }

              {entranceExamData
                ?.filter((r) => r.id !== recentData?.id)
                ?.slice(0, 20)
                ?.map((d, index) => (
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
                        <p className="font-bold"> {d?.class}</p>
                      </div>
                    </td>
                    <td className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <p className="font-bold">
                          {" "}
                          {/* {d?.registeredon?.split("T")[0]} */}
                          {new Date(d?.registeredon).toLocaleDateString()}
                        </p>
                        <p className="text-[11px] text-[#717171]">
                          {/* {d?.registeredon?.split("T")[1].split(".")[0]} */}
                          {new Date(d?.registeredon).toLocaleTimeString()}
                        </p>
                        {/* <div>
                        
                      </div>

                      <div className="text-[#9FA2B4] text-sm">
                        
                      </div> */}
                      </div>
                    </td>
                    <td className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <p className="font-bold"> {d?.address.area}</p>
                        <p className="text-[11px] text-[#717171]">
                          {d?.address.city}
                        </p>
                      </div>
                    </td>

                    <td className="text-[#252733] flex items-center justify-between font-medium px-6 py-4 whitespace-nowrap">
                      <div className="">
                        <div
                          onClick={() => {
                            handleEdit(d?.id);
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
                Entrance Exam List
              </h3>
              <div className="flex space-y-4 flex-col">
                {entranceExamData?.map((data, i) => (
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
                        <div>Location :</div>
                        <div className=""></div>
                      </div>
                      <div className="w-6/12 font-bold text-sm">
                        {/* <div>{data?.registeredon?.split("T")[0]}</div>  */}
                        <div>{data?.class}</div>
                        <div>{data?.phonenumber}</div>
                        <div>{data?.address.area}</div>

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
                              handleEdit(data?.id);
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
          <Pagination
            onChange={(e, v) => {
              setSkip(v - 1);
              
            }}
            count={paginationButton}
            variant="outlined"
            shape="rounded"
          />
        </div>

        {deleteConfirmationModal && (
          <DeleteConfirmationModal
            setDeleteCoupon={setDeleteCoupon}
            setDeleteConfirmationModal={setDeleteConfirmationModal}
          />
        )}

        <EditEntranceExam
          open={open}
          setOpen={setOpen}
          setReFetch={setReFetch}
          singleEntrance={singleEntrance}
        />
      </AdminDashboard>
    </div>
  );
};

export default EntranceExams;
