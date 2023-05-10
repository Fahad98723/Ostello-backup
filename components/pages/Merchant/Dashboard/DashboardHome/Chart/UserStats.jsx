import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaSortAmountUp } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { Menu, MenuItem, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRouter } from "next/router";
import { selectUserAnalytics } from "../../../../../../redux/slices/UserAnalytics";
import dayjs from "dayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { host, INSTITUTE_ID } from "../../../../../../utils/constant";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
export default function UserStats() {
  const { merchantAnalytics } = useSelector(selectUserAnalytics);
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [filterAnchorEl, setFilterAnchorEl] = React.useState(null);
  const filterOpen = Boolean(filterAnchorEl);
  const router = useRouter();
  const [startValue, setStartValue] = React.useState(dayjs());
  const [endValue, setEndValue] = React.useState(dayjs());
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fromDate = new Date(startValue)?.toISOString();
  const toDate = new Date(endValue)?.toISOString();
  

  useEffect(() => {
    const getDateData = async () => {
      const response = await axios.get(
        `${host}/analytics?instituteid=${INSTITUTE_ID}&fromdate=${fromDate}&todate=${toDate}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${
              typeof window !== "undefined" &&
              window.localStorage.getItem("ACCESS_TOKEN")
            }`,
          },
        }
      );
      
      setData(response?.data?.message);
    };
    if (fromDate?.length > 0 && toDate?.length > 0) {
      getDateData();
    }
  }, [fromDate, toDate]);
  useEffect(() => {
    if (merchantAnalytics?.length) {
      setData(merchantAnalytics);
    }
  }, [merchantAnalytics]);

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
    const sortedDates = merchantAnalytics
      ?.map((obj) => {
        return { ...obj, date: new Date(obj?.timestamp) };
      })
      .sort((a, b) => b.date - a.date);
    setData(sortedDates);
    handleClose();
  };

  const handleByType = () => {
    let searchType = "";
    type === 1
      ? (searchType = "visit_institute")
      : type === 5
      ? (searchType = "watch_videos")
      : type === 4
      ? (searchType = "research_faculties")
      : type === 3
      ? (searchType = "explore_courses")
      : type === 2
      ? (searchType = "know_institute")
      : type === 6
      ? (searchType = "visit_time")
      : null;
    const sortedType = merchantAnalytics?.filter((obj) =>
      obj?.activity_type?.includes(searchType)
    );
    setData(sortedType);
    handleClose();
  };
  const handleChange = (event) => {
    setType(event.target.value);
    // handleByType()
  };
  const [type, setType] = React.useState(null);
  const [search, setSearch] = useState("");
  const filterByTitle = (item) =>
    item?.activity_type?.toLowerCase().includes(search.toLowerCase());

  return (
    <div className="bg-white w-full mr-3 p-3 rounded-lg">
      <div className="flex gap-x-1 md:px-5 px-3  justify-between">
        <h3 className="font-bold text-sm text-[#252733]">All User Stats</h3>
        <div className="flex md:gap-x-8 gap-x-5 items-center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              disableFuture
              label="From"
              value={startValue}
              onChange={(newValue) => {
                setStartValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <MobileDatePicker
              disableFuture
              label="To"
              value={endValue}
              onChange={(newValue) => {
                setEndValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by activity"
            className="outline-none border border-gray/20 px-2 rounded"
          />
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
            <MenuItem onClick={() => handleByType()}>By Activity Type</MenuItem>
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
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value={null}>All</MenuItem>
                  <MenuItem value={1}>Visit Institute</MenuItem>
                  <MenuItem value={2}>Know Institute</MenuItem>
                  <MenuItem value={3}>Explore Courses</MenuItem>
                  <MenuItem value={4}>Research Faculty</MenuItem>
                  <MenuItem value={5}>Watch Videos</MenuItem>
                  <MenuItem value={6}>Visit Time</MenuItem>
                </Select>
              </FormControl>

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
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <table aria-label="sticky table" className="mt-10 table-auto">
            <TableHead className="bg-white w-full border-b border-light-gray">
              <TableRow className="bg-white border-b border-light-gray cursor-pointer transition duration-300 ease-in-out hover:bg-light-gray table w-full table-fixed">
                <TableCell
                  scope="col"
                  className="text-sm font-sm text-[#ABABAB] px-3 py-4 text-left"
                >
                  User
                </TableCell>
                <TableCell
                  scope="col"
                  className="text-sm font-sm text-[#ABABAB] px-3 py-4 text-left"
                >
                  Date
                </TableCell>
                <TableCell
                  scope="col"
                  className="text-sm font-sm text-[#ABABAB] px-3 py-4 text-left"
                >
                  Location
                </TableCell>
                <TableCell
                  scope="col"
                  className="text-sm font-sm text-[#ABABAB] px-6 py-4 text-left"
                >
                  Activity Type
                </TableCell>
                <TableCell
                  scope="col"
                  className="text-sm font-sm text-[#ABABAB] px-3 py-4 text-left"
                >
                  Item
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="block max-h-[70vh]">
              {data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .filter(filterByTitle)
                ?.map((d, index) => (
                  <TableRow
                    key={index}
                    onClick={() => router.push(`/merchant/dashboard/${d?.id}`)}
                    className="bg-white border-b border-light-gray cursor-pointer transition duration-300 ease-in-out hover:bg-light-gray table w-full table-fixed"
                  >
                    <TableCell className="px-6 py-4  font-sm text-[#252733]">
                      <div className="flex items-center space-x-3">
                        <p className="text-xs">
                          {d?.payload?.user_name || "Anonymous"}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#252733] font-sm px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <p className="font-bold text-xs">
                          {" "}
                          {d?.timestamp?.split("T")[0]}
                        </p>
                        <p className="text-xs text-[#717171]">
                          {d?.timestamp?.split("T")[1].split(".")[0]}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#252733] font-sm px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <p className="font-bold text-xs">
                          {" "}
                          {d?.areas?.length > 1 ? d?.areas[2] : "N/A"}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#252733] font-sm px-6 py-4 whitespace-nowrap">
                      <p className="text-xs">{d?.activity_type}</p>
                    </TableCell>
                    <TableCell className="text-[#252733] font-sm px-6 py-4 whitespace-nowrap flex items-center">
                      {d?.activity_type === "visit_institute" ? (
                        <div className="mr-2">
                          <p className="text-xs">
                            {d?.payload?.institute_name}
                          </p>
                        </div>
                      ) : d?.activity_type === "watch_videos" ? (
                        <div className="mr-2">
                          <video
                            onContextMenu={(e) => e.preventDefault()}
                            controlsList="nodownload"
                            // poster={thumbnailURL}
                            style={{
                              maxWidth: "100%",
                              width: "100%",
                              margin: "0 auto",
                            }}
                            playsInline
                            loop
                            muted
                            preload="true"
                            controls
                            alt="Ostello"
                            src={d?.payload?.video?.video?.url}
                          />
                        </div>
                      ) : d?.activity_type === "research_faculties" ? (
                        <div className="mr-2">
                          <p className="text-xs">
                            {d?.payload?.institute_name}
                          </p>
                        </div>
                      ) : d?.activity_type === "explore_courses" ? (
                        <div className="mr-2">
                          <p className="text-xs">{d?.payload?.course_name}</p>
                        </div>
                      ) : d?.activity_type === "visit_time" ? (
                        <div className="mr-2">
                          <p className="text-xs">
                            Total Time: {d?.payload?.total_time_in_seconds} s
                          </p>
                        </div>
                      ) : (
                        <div className="r-2">
                          <p className="text-xs">
                            {d?.payload?.institute_name}
                          </p>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
