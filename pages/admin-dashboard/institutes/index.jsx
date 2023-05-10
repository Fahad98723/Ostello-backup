import React, { useEffect, useState } from "react";
import { FaFilter, FaSortAmountUp } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import {
  Checkbox,
  Menu,
  MenuItem,
  Pagination,
  Switch,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useRouter } from "next/router";
import defaultImage from "../../../assets/images/institute.png";
import MetaHelmet from "../../../components/MetaHelmet";
import AdminDashboard from "../../../components/pages/AdminDashboard/AdminDashboard";
import toast from "react-hot-toast";
import axios from "axios";
import { host } from "../../../utils/constant";
const AdminInstitutes = ({ meta }) => {
  const router = useRouter();

  const handleOnclick = (id) => {
    router.push(`/admin-dashboard/institutes/details/${id}`);
  };
  const dispatch = useDispatch();
  const { loading, adminInstitutes, error, isUpdated } = useSelector(
    (state) => state.adminInstitutes
  );

  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(0);
  const [paginationButton, setPaginationButton] = useState();

  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(20);
  const [noLimit, setNoLimit] = useState(false);

  const handleChangeLimit = (event) => {
    setNoLimit(event.target.checked);
  };

  

  useEffect(() => {
    // dispatch(fetchAdminInstitutes());
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
          `${host}/institute?approval=1&name=${search}&skip=${
            skip * 20
          }&limit=${limit}&nolimit=${noLimit}&relations=owner`,
          config
        );
        setData(data?.message);
        if (skip === 0) {
          setPaginationButton(Math.ceil(data.count / 20));
        }

        if (skip !== 0) {
          setPaginationButton(Math.ceil(data.count / 20));
        }
        
      } catch (err) {
        toast.error(err.message);
      }
    };
    run();
  }, [isUpdated, limit, noLimit, search, skip]);

  const [currentValue, setCurrentValue] = useState(false);

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
    const sortedDates = data
      ?.map((obj) => {
        return { ...obj, date: new Date(obj.registeredon) };
      })
      .sort((a, b) => b.date - a.date);
    setData(sortedDates);
    handleClose();
  };

  const handleByType = () => {
    const sortedType = data
      ?.map((obj) => {
        return { ...obj };
      })
      .sort((a, b) => a.classmode - b.classmode);

    // 
    setData(sortedType);
    handleClose();
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };
  const [type, setType] = React.useState(null);

  useEffect(() => {
    if (!type) {
      setData(data);
    }

    if (type) {
      setData(data.filter((a) => a.classmode === type));
    }
  }, [type]);

  const filterByTitle = (item) =>
    item?.name.toLowerCase().includes(search.toLowerCase());

  useEffect(() => {
    if (noLimit) {
      setLimit(0);
    }
    if (!noLimit) {
      setLimit(20);
    }
  }, [noLimit]);

  return (
    <AdminDashboard currentSection="Institutes">
      <MetaHelmet title={meta.title} link={meta.link} />
      <div className="bg-white mr-3 p-3 rounded-lg">
        <div className="flex gap-x-1 md:px-5 px-3  justify-between">
          <h3 className="font-bold text-[19px] text-[#252733]">
            All Institutes
          </h3>
          <div className="flex md:gap-x-8 gap-x-5 items-center">
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
                  onChange={handleChangeLimit}
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
              <MenuItem onClick={() => handleByType()}>By Type</MenuItem>
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
                <FormControl sx={{ marginBottom: "10px" }} fullWidth>
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
                </FormControl>

                {/* <TextField
                  onChange={(e) => setSearch(e.target.value)}
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                /> */}
              </Box>
            </Menu>
          </div>
        </div>
        <table className="mt-10 md:block hidden table-auto">
          <thead className="bg-white table w-full table-fixed border-b border-light-gray">
            <tr>
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
                Owner name
              </th>
              <th
                scope="col"
                className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
              >
                Date of Registration
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
              >
                PRO
              </th>
              <th
                scope="col"
                className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
              >
                Type
              </th>
            </tr>
          </thead>
          <tbody className="block max-h-[70vh] scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-gray-100 overflow-y-auto">
            {data?.slice(0, 20)?.map((d, index) => (
              <tr
                key={index}
                className="bg-white border-b border-light-gray cursor-pointer transition duration-300 ease-in-out hover:bg-light-gray table w-full table-fixed"
              >
                <td
                  onClick={() => handleOnclick(d.id)}
                  className={`px-6 py-4  font-medium  text-[#252733]
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      className="w-[50px] h-[50px] rounded-full"
                      src={
                        d?.images?.length > 0
                          ? `https://cdn.ostello.co.in/${d?.images[0]?.key}`
                          : defaultImage.src
                      }
                      alt=""
                    />
                    <div className="w-full ">
                      <p
                        className={`font-bold ${
                          !d.metatitle && !d.metadesc ? "text-[#FF0000]" : ""
                        }`}
                      >
                        {d.name}
                      </p>
                      <p className="text-[11px] text-[#717171]">
                        Established on {d.establishedyear}
                      </p>
                      <p className="text-[11px] text-[#717171]">
                        Updated 1 day ago
                      </p>
                    </div>
                  </div>
                </td>
                <td
                  onClick={() => handleOnclick(d.id)}
                  className="text-[#252733] font-medium px-6 py-4 "
                >
                  <div className="flex flex-col">
                    <p className="font-bold"> {d?.owner?.name}</p>
                    {/* <p className='text-[11px] text-[#717171]'>
                      Established on {d.establishedyear}
                    </p> */}
                  </div>
                </td>
                <td
                  onClick={() => handleOnclick(d.id)}
                  className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap"
                >
                  <div className="flex flex-col">
                    <p className="font-bold">
                      {" "}
                      {d?.registeredon?.split("T")[0]}
                    </p>
                    <p className="text-[11px] text-[#717171]">
                      {d?.registeredon?.split("T")[1].split(".")[0]}
                    </p>
                  </div>
                </td>
                <td
                  onClick={() => handleOnclick(d.id)}
                  className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap"
                >
                  <div className="flex flex-col">
                    <p className="font-bold"> {d?.locations[0].area}</p>
                    <p className="text-[11px] text-[#717171]">
                      {d?.locations[0].city}
                    </p>
                  </div>
                </td>
                <td className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap">
                  <Switch
                    className="text-primary"
                    checked={d?.accountplan === "pro_plan" ? true : false}
                    onChange={async (e) => {
                      
                      let updateData;

                      if (e.target.checked) {
                        updateData = {
                          id: d.id,
                          updates: {
                            accountplan: "pro_plan",
                          },
                        };
                      } else {
                        updateData = {
                          id: d.id,
                          updates: {
                            accountplan: "free_plan",
                          },
                        };
                      }

                      try {
                        const config = {
                          headers: {
                            "Access-Control-Allow-Origin": "*",
                            Authorization: `Bearer ${
                              typeof window !== "undefined" &&
                              window.localStorage.getItem("ACCESS_TOKEN")
                            }`,
                          },
                        };
                        const { data } = await axios.patch(
                          `${host}/institute`,
                          updateData,
                          config
                        );
                        // 

                        // 
                        

                        toast.success("Institute update approved");
                      } catch (err) {
                        toast.error(`${err.message}`);
                      }
                    }}
                    sx={{
                      "&.MuiSwitch-root .Mui-checked": {
                        color: "rgb(125, 35, 224)",
                      },
                    }}
                  />{" "}
                  <br />
                </td>
                <td
                  onClick={() => handleOnclick(d.id)}
                  className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap flex items-center"
                >
                  {d.classmode === 3 ? (
                    <div className="h-2 w-2 rounded-full bg-ghost/90  mr-2"></div>
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-green/90 mr-2"></div>
                  )}
                  {(d.classmode === 1 && "Hybrid") ||
                    (d.classmode === 2 && "Online") ||
                    (d.classmode === 3 && "Offline")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <>
          <div className="md:hidden block p-3">
            <h3 className="mb-3 font-bold text-[#9FA2B4]">Name of Students</h3>
            <div className="flex space-y-4 flex-col">
              {data?.slice(0, 20).map((d, i) => (
                <div onClick={() => handleOnclick(d?.id)} key={i}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between">
                      <img
                        className="h-[56px] w-[56px] rounded-full"
                        src={d?.images[0]?.url}
                        alt=""
                      />
                      <div>
                        <p className="text-[#252733] font-bold  ml-3">
                          {d?.name}
                        </p>
                        <p className="text-[#9766CD] text-xs font-bold  ml-3">
                          Updated 1 day ago
                        </p>
                      </div>
                    </div>
                    <div className="cursor-pointer">
                      <RiArrowRightSLine className="scale-125 text-3xl" />
                    </div>
                  </div>
                  <div className="flex mt-3 space-x-1 justify-between">
                    <div className="w-6/12 text-[#717171] text-sm">
                      <div>Owner Name :</div>
                      <div>Time of Registration :</div>
                      <div>Location :</div>
                      <div>Type :</div>
                    </div>
                    <div className="w-6/12 font-bold text-sm">
                      <div>{d?.owner?.name}</div>
                      <div>{d?.registeredon?.split("T")[0]}</div>
                      <div>
                        {d.locations[0].area},{d.locations[0].city}
                      </div>
                      <div>
                        {(d.classmode === 1 && "Hybrid") ||
                          (d.classmode === 2 && "Online") ||
                          (d.classmode === 3 && "Offline")}
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
    </AdminDashboard>
  );
};

export default AdminInstitutes;

export const getStaticProps = async () => {
  const meta = {
    title: "Institute - Admin Dashboard - Ostello",
    link: "https://www.ostello.co.in/admin-dashboard",
  };
  // 
  return {
    props: {
      meta,
    },
  };
};
