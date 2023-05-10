import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaFilter, FaSortAmountUp } from "react-icons/fa";

import { Menu, MenuItem, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Head from "next/head";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { RiArrowRightSLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import AdminDashboard from "../../../components/pages/AdminDashboard/AdminDashboard";
import DeleteConfirmationModal from "../../../components/pages/AdminDashboard/AdminModal/DeleteConfirmationModal/DeleteConfirmationModal";
import { DeleteIcon } from "../../../components/SVGIcons";
import { ACCESS_TOKEN, host } from "../../../utils/constant";

const MentorsZone = () => {
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const router = useRouter();
  const [deleteCoupon, setDeleteCoupon] = useState(false);

  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

  const [mentors, setMentors] = useState([]);
  const run = async () => {
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      };
      const { data } = await axios.get(`${host}/mentor?approval=1&limit=50`, config);
      
      setMentors(data?.mentors);
      
    } catch (err) {
      toast.error(err.toString());
      
    }
  };
  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      };
      const { data } = await axios.delete(`${host}/mentor?id=${id}`, config);
      // 
      run();
      toast.success("Mentor deleted successfully");
    } catch (err) {
      toast.error(err.toString());
      
    } finally {
      // setDeleteCoupon(false);
    }
  };
  useEffect(() => {
    if (deleteCoupon) {
      handleDelete();
    }
  }, [deleteCoupon]);
  // 

  const handleOnclick = (id) => {
    router.push(`/admin-dashboard/mentors-zone/mentor-details/${id}`);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [filterAnchorEl, setFilterAnchorEl] = React.useState(null);
  const filterOpen = Boolean(filterAnchorEl);

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleByDate = () => {
    const sortedDates = mentors
      ?.map((obj) => {
        return { ...obj, date: new Date(obj.createdat) };
      })
      .sort((a, b) => b.date - a.date);
    setMentors(sortedDates);
    handleClose();

    
  };

  // const handleByType = () => {
  //     const sortedType = users?.map(obj => { return { ...obj} }).sort((a, b) => a.classmode - b.classmode)

  //   // 
  //   setData(sortedType)
  //   handleClose()

  // }

  const handleChange = (event) => {
    setType(event.target.value);
  };
  const [type, setType] = React.useState(null);
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //     if(!type){
  //       setData(users)
  //     }

  //     if(type){
  //       setData(users.filter(a => a.classmode === type))
  //     }

  // },[type])

  
  useEffect(() => {
    if (search?.length) {
      const result = mentors?.filter((cur) => {
        return cur.name.toLowerCase().includes(search.toLowerCase());
      });
      setMentors(result);
    } else {
      run();
    }
    run();
  }, [search]);
  return (
    <AdminDashboard>
      <Head>
        <title>Mentors - Admin Dashboard - Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="bg-white md:mb-12 my-6 shadow-lg md:shadow-none md:mx-8 mx-3 rounded-lg md:border border-light-gray border-0 py-5">
        <div className="flex gap-x-1 md:px-5 px-3  justify-between">
          <h3 className="font-bold text-[19px] text-[#252733]">All Mentors</h3>
          <div className="flex md:gap-x-8 gap-x-5 items-center">
            <div
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
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
              open={open}
              onClose={handleClose}
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
              <span className="font-bold md:block hidden ml-2">Filter</span>
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
              <Box sx={{ minWidth: 200, padding: "10px 10px" }}>
                {/* <FormControl sx={{marginBottom:'10px'}} fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={handleChange}
        >
          <MenuItem value={null}>All</MenuItem>
          <MenuItem value={1}>Hybrid</MenuItem>
          <MenuItem value={2}>Online</MenuItem>
          <MenuItem value={3}>Offline</MenuItem>
        </Select>
      </FormControl> */}

                <TextField
                  onChange={(e) => setSearch(e.target.value)}
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                />
              </Box>
            </Menu>
          </div>
        </div>
        <p className="text-xl md:px-5 px-3">Total Mentors {mentors?.length}</p>
        <div className="bg-white md:mt-5 mt-0 p-3 rounded-lg">
          <table className="md:block hidden">
            <thead className="bg-white table w-full table-fixed border-light-gray border-b">
              <tr>
                <th
                  scope="col"
                  className="text-[18px] font-medium text-[#ABABAB] px-6 py-4 text-left"
                >
                  Name of Mentor
                </th>
                <th
                  scope="col"
                  className="text-[18px] font-medium text-[#ABABAB] px-6 py-4 text-left"
                >
                  Qualification
                </th>
                <th
                  scope="col"
                  className="text-[18px] font-medium text-[#ABABAB] px-6 py-4 text-left"
                >
                  Number
                </th>
                <th
                  scope="col"
                  className="text-[18px] font-medium text-[#ABABAB] px-6 py-4 text-left"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="text-[18px] font-medium text-[#ABABAB] px-6 py-4 text-left"
                >
                  Field
                </th>
                <th
                  scope="col"
                  className="text-[18px] font-medium text-[#ABABAB] px-6 py-4 text-left"
                >
                  Institute
                </th>
                <th
                  scope="col"
                  className="text-[18px] font-medium text-[#ABABAB] px-6 py-4 text-left"
                ></th>
              </tr>
            </thead>
            <tbody className="">
              {mentors
                ?.map((obj) => {
                  return { ...obj, date: new Date(obj.createdat) };
                })
                ?.sort((a, b) => b?.date - a?.date)
                ?.map((data, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b border-light-gray cursor-pointer transition duration-300 ease-in-out hover:bg-light-gray table w-full table-fixed"
                  >
                    <td
                      onClick={() => handleOnclick(data.id)}
                      className="px-6 py-4 font-medium text-[#252733]"
                    >
                      <div className="flex items-center">
                        {data?.avatar?.key ? (
                          <img
                            className="mr-3 h-10 w-10 rounded-full"
                            src={`https://cdn.ostello.co.in/${data?.avatar?.key}`}
                            alt=""
                          />
                        ) : (
                          <div className="bg-primary mr-3  h-10 w-10 rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                            {data?.name?.slice(0, 1).toUpperCase()}
                          </div>
                        )}
                        {data?.name}
                      </div>
                    </td>
                    <td
                      onClick={() => handleOnclick(data.id)}
                      className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap"
                    >
                      {data?.qualification?.slice(0,10)}
                    </td>
                    <td className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                      <div>
                          {data?.phonenumber}
                        </div>
                        {/* <div>
                          {new Date(data?.createdat).toLocaleDateString()}
                        </div>

                        <div className="text-[#9FA2B4] text-sm">
                          {new Date(data?.createdat).toLocaleTimeString()}
                        </div> */}
                      </div>
                    </td>
                    <td
                      onClick={() => handleOnclick(data.id)}
                      className="text-[#252733] font-medium px-6 py-4"
                    >
                      <div className="flex flex-col ">
                        {data?.email?.slice(0,10)}
                      </div>
                    </td>
                    <td
                      onClick={() => handleOnclick(data.id)}
                      className="text-[#252733] font-medium px-6 py-4"
                    >
                      <div className="flex flex-col ">
                        {data?.field?.slice(0,10)}
                      </div>
                    </td>
                    <td
                      onClick={() => handleOnclick(data.id)}
                      className="text-[#252733] font-medium px-6 py-4"
                    >
                      <div className="flex flex-col ">
                        {data?.Institute?.slice(0,10) || ""}
                      </div>
                    </td>
                    <td className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap">
                      <div className="">
                        <div
                          onClick={() => {
                            setDeleteConfirmationModal(true);
                            setId(data.id);
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
            <div className="md:hidden block">
              <h3 className="mb-3 font-bold text-[#9FA2B4]">
                Name of Students
              </h3>
              <div className="flex space-y-4 flex-col">
                {mentors?.map((data, i) => (
                  <div onClick={() => handleOnclick(data.id)} key={i}>
                    <div className="flex items-center justify-start">
                      <div className="flex items-center space-x-3">
                        <img
                          className="h-[50px] w-[50px] rounded-full"
                          src={data.img}
                          alt=""
                        />
                        <p className="text-[#252733] font-bold">{data.name}</p>
                      </div>
                      <div>
                        <RiArrowRightSLine className="scale-125" />
                      </div>
                    </div>
                    <div className="flex mt-3 space-x-1 justify-between">
                      <div className="w-6/12 text-[#717171] text-sm">
                        <div>Qualification :</div>
                        <div>Number :</div>
                        <div>Email :</div>
                        <div>Field :</div>
                        <div>Institute :</div>
                      </div>
                      <div className="w-6/12 font-bold text-sm">
                        <div>{data.qualification}</div>
                        <div>
                          {data?.phonenumber}
                        </div>
                        <div>
                        {data?.email}
                        </div>
                        <div>
                          {data?.field}
                        </div>
                        <div>
                        {data?.institute || "No"}
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
        {/* <div className="hidden md:block">
        <div className="flex text-[#9FA2B4] items-center font-[Mulish] justify-end px-5 pt-12 gap-x-5">
          <div>
            <p>
              Rows per page:<span className="ml-2 text-[#4B506D]">17</span>
            </p>
          </div>
          <div>1-4 of 4</div>
          <div className="flex gap-x-5 ">
            <MdKeyboardArrowLeft className="scale-150 cursor-pointer" />
            <MdKeyboardArrowRight className="scale-150 cursor-pointer" />
          </div>
        </div>
      </div> */}
        {deleteConfirmationModal && (
          <DeleteConfirmationModal
            setDeleteCoupon={setDeleteCoupon}
            setDeleteConfirmationModal={setDeleteConfirmationModal}
          />
        )}
      </div>
    </AdminDashboard>
  );
};

export default MentorsZone;