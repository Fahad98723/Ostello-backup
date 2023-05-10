import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { RiArrowRightSLine } from "react-icons/ri";
import AdminDashboard from "../../../components/pages/AdminDashboard/AdminDashboard";
import AddTopLocationModal from "../../../components/pages/AdminDashboard/TopLocation/AddTopLocationModal";
import EditMetaUrlModal from "../../../components/pages/AdminDashboard/TopLocation/EditMetaUrlModal";
import EditTopLocationModal from "../../../components/pages/AdminDashboard/TopLocation/EditTopLocationModal";
import MetaUrlModal from "../../../components/pages/AdminDashboard/TopLocation/MetaUrlModal";
import TopLocationMobile from "../../../components/pages/AdminDashboard/TopLocation/TopLocationMobile";
import { DeleteIcon } from "../../../components/SVGIcons";
import { host } from "../../../utils/constant";
import AddCityModal from "../../../components/pages/AdminDashboard/TopLocation/AddCityModal";
import EditCityModal from "../../../components/pages/AdminDashboard/TopLocation/EditCityModal";

export default function AdminTopLocationIndex() {
  const [topLocationData, setTopLocationData] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [reFetch, setReFetch] = useState(false);
  const [topLocationShow, setTopLocationShow] = useState(false);
  const [search, setSearch] = useState("");
  const [metaUrlShow, setMetaUrlShow] = useState(false);
  const [cityShow, setCityShow] = useState(false);

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
        await axios
          .get(`${host}/locations?name=${search}&nolimit=true`, config)
          .then(function (response) {
            
            setTopLocationData(response?.data?.message);
          });

        await axios
          .get(`${host}/meta?title=${search}&nolimit=true`, config)
          .then(function (response) {
            
            setMetaData(response?.data?.message);
          });
        await axios
          .get(`${host}/locations/city?name=${search}&nolimit=true`, config)
          .then(function (response) {
            
            setCityData(response?.data?.cities);
          });
      } catch (err) {
        
      }
    };
    run();
  }, [reFetch, search, metaUrlShow, topLocationShow, cityShow]);

  

  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [metaModalOpen, setMetaModalOpen] = useState(false);
  const [cityModalOpen, setCityModalOpen] = useState(false);

  const handleDelete = async (id) => {
    setReFetch(false);
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      };
      
      const { data } = await axios.delete(`${host}/locations?id=${id}`, config);
      // 
      
      toast.success("successfully Removed");
    } catch (err) {
      toast.error("something went wrong !!");
    } finally {
      setReFetch(true);
    }
  };

  const handleMetaDelete = async (id) => {
    setReFetch(false);
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      };
      
      const { data } = await axios.delete(`${host}/meta?id=${id}`, config);
      // 
      
      toast.success("successfully Removed");
    } catch (err) {
      toast.error("something went wrong !!");
    } finally {
      setReFetch(true);
    }
  };

  const handleCityDelete = async (id) => {
    setReFetch(false);
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      };
      
      const { data } = await axios.delete(
        `${host}/locations/city?id=${id}`,
        config
      );
      // 
      
      toast.success("successfully Removed");
      setReFetch(true);
    } catch (err) {
      toast.error("something went wrong !!");
    } finally {
      setReFetch(true);
    }
  };

  const handleOnclick = (id) => {
    
  };

  const [singleLocation, setSingleLocation] = useState({});
  const [singleMeta, setSingleMeta] = useState({});
  const [singleCity, setSingleCity] = useState({});

  const [metaEdit, setMetaEdit] = useState(false);
  const [cityEdit, setCityEdit] = useState(false);

  const handleEdit = (id) => {
    setEditOpen(true);
    setSingleLocation(topLocationData?.find((t) => t.id === id));
  };
  const metahandleEdit = (id) => {
    setMetaEdit(true);
    setSingleMeta(metaData?.find((t) => t.id === id));
  };

  const cityhandleEdit = (id) => {
    setCityEdit(true);
    setSingleCity(cityData?.find((t) => t.id === id));
  };
  
  return (
    <AdminDashboard currentSection="Top Location And Meta Url">
      <Head>
        <title>Top Locations and Meta Urls - Admin Dashboard - Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <>
        <div className="mb-10">
          <div className=" px-[5px] !mt-[0px]">
            <div
              onClick={() => {
                setTopLocationShow(true);
                setMetaUrlShow(false);
                setCityShow(false);
              }}
              className="flex justify-between bg-white p-3 cursor-pointer"
            >
              <p className="text-xl bold ml-4 font-bold">Top Location</p>
              <div className="cursor-pointer mr-16">
                <RiArrowRightSLine className="scale-125 text-3xl" />
              </div>
            </div>
            <div
              onClick={() => {
                setTopLocationShow(false);
                setMetaUrlShow(true);
                setCityShow(false);
              }}
              className="flex justify-between bg-white cursor-pointer p-3 mt-1"
            >
              <p className="text-xl bold ml-4 font-bold">Meta Url</p>
              <div className="cursor-pointer mr-16">
                <RiArrowRightSLine className="scale-125 text-3xl" />
              </div>
            </div>
            <div
              onClick={() => {
                setTopLocationShow(false);
                setMetaUrlShow(false);
                setCityShow(true);
              }}
              className="flex justify-between bg-white cursor-pointer p-3 mt-1"
            >
              <p className="text-xl bold ml-4 font-bold">Add City</p>
              <div className="cursor-pointer mr-16">
                <RiArrowRightSLine className="scale-125 text-3xl" />
              </div>
            </div>
          </div>
        </div>
        {topLocationShow ? (
          <div className="bg-white mr-3 p-3 rounded-lg">
            <div className="flex gap-x-1 md:px-5 px-3  justify-between">
              {/* <h3 className="font-bold text-[19px] text-[#252733] mr-3">All Institutes</h3> */}
              <button
                onClick={() => {
                  setOpen(true);
                  setReFetch(false);
                  
                }}
                className="px-4 py-2 text-[#F0F0F0] mr-2 text-lg font-medium rounded-lg bg-primary border-0"
              >
                Add Top Location
              </button>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name"
                className="outline-none w-[300px] border border-gray/20 px-2 "
              />
            </div>
            <table className="mt-10 md:block hidden table-auto">
              <thead className="bg-white table w-full table-fixed border-b border-light-gray">
                <tr>
                  <th
                    scope="col"
                    className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  >
                    PinCode
                  </th>

                  <th
                    scope="col"
                    className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  ></th>
                  <th
                    scope="col"
                    className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  ></th>
                </tr>
              </thead>
              <tbody className="block max-h-[70vh] scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-gray-100 overflow-y-auto">
                {topLocationData?.map((d, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b border-light-gray cursor-pointer transition duration-300 ease-in-out hover:bg-light-gray table w-full table-fixed"
                  >
                    <td
                      onClick={() => handleOnclick(d.id)}
                      className="px-6 py-4  font-medium text-[#252733]"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          className="w-[50px] h-[50px] rounded-full"
                          src={d?.images?.[0]?.url}
                          alt=""
                        />
                        <div className="w-full ">
                          <p className="font-bold ">{d.name}</p>
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
                        <p className="font-bold">{d?.metatitle}</p>
                      </div>
                    </td>
                    <td
                      onClick={() => handleOnclick(d.id)}
                      className="text-[#252733] font-medium px-6 py-4 "
                    >
                      <div className="flex flex-col">
                        <p className="font-bold">{d?.pincode}</p>
                      </div>
                    </td>

                    <td
                      onClick={() => handleOnclick(d.id)}
                      className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap flex items-center"
                    >
                      <div className="">
                        <div
                          onClick={() => {
                            handleEdit(d.id);
                          }}
                          className="bg-white w-[40px] block p-2.5 shadow-lg cursor-pointer rounded-full"
                        >
                          <BiEdit className="text-2xl text-blue" />
                        </div>
                      </div>
                    </td>
                    <td className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap">
                      <div className="">
                        <div
                          onClick={() => {
                            handleDelete(d.id);
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

            <TopLocationMobile
              topLocationData={topLocationData}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
            <AddTopLocationModal
              open={open}
              setOpen={setOpen}
              setReFetch={setReFetch}
            />
            <EditTopLocationModal
              singleLocation={singleLocation}
              editOpen={editOpen}
              setEditOpen={setEditOpen}
              setReFetch={setReFetch}
            />
          </div>
        ) : (
          ""
        )}
        {metaUrlShow && (
          <div className="bg-white mr-3 p-3 rounded-lg">
            <div className="md:flex  gap-1 md:px-5 px-3  justify-between">
              {/* <h3 className="font-bold text-[19px] text-[#252733] mr-3">All Institutes</h3> */}
              <button
                onClick={() => {
                  setMetaModalOpen(true);
                  setReFetch(false);
                  
                }}
                className="px-4 py-2 text-[#F0F0F0] mr-2 my-2 text-lg font-medium rounded-lg bg-primary border-0"
              >
                Add Meta Url
              </button>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name"
                className="outline-none w-[300px] border my-2 border-gray/20 p-2 "
              />
            </div>
            <table className="mt-10  table-auto hidden md:block">
              <thead className="bg-white table w-full table-fixed border-b border-light-gray">
                <tr>
                  <th
                    scope="col"
                    className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  >
                    NO
                  </th>
                  <th
                    scope="col"
                    className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  >
                    Url
                  </th>
                  <th
                    scope="col"
                    className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  >
                    Edit
                  </th>
                  <th
                    scope="col"
                    className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  >
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody className="block max-h-[70vh] scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-gray-100 overflow-y-auto">
                {metaData?.map((d, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b border-light-gray cursor-pointer transition duration-300 ease-in-out hover:bg-light-gray table w-full table-fixed"
                  >
                    <td
                      //   onClick={() => handleOnclick(d.id)}
                      className="text-[#252733] font-medium px-6 py-4 "
                    >
                      <div className="flex flex-col">
                        <p className="font-bold">{index + 1}</p>
                      </div>
                    </td>
                    <td
                      //   onClick={() => handleOnclick(d.id)}
                      className="text-[#252733] font-medium px-6 py-4 "
                    >
                      <div className="flex flex-col">
                        <p className="font-bold">
                          {d?.title?.slice(0, 25)?.toString()}...
                        </p>
                      </div>
                    </td>
                    <td
                      //   onClick={() => handleOnclick(d.id)}
                      className="text-[#252733] font-medium px-6 py-4 "
                    >
                      <div className="flex flex-col">
                        <p className="font-bold">{d?.url}</p>
                      </div>
                    </td>

                    <td
                      //   onClick={() => handleOnclick(d.id)}
                      className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap flex items-center"
                    >
                      <div className="">
                        <div
                          onClick={() => {
                            metahandleEdit(d.id);
                          }}
                          className="bg-white w-[40px] block p-2.5 shadow-lg cursor-pointer rounded-full"
                        >
                          <BiEdit className="text-2xl text-blue" />
                        </div>
                      </div>
                    </td>
                    <td className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap">
                      <div className="">
                        <div
                          onClick={() => {
                            handleMetaDelete(d.id);
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

            <div className="md:hidden block p-3">
              <h3 className="mb-3 font-bold text-[#9FA2B4]">Meta Data</h3>
              <div className="flex space-y-4 flex-col">
                {metaData?.map((data, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between"></div>
                    <div className="">
                      <div className="flex mt-3 space-x-1 justify-between">
                        <div className="w-2/12 text-[#717171] text-sm">
                          <div>No :</div>
                          <div>Title :</div>
                          <div>Url :</div>
                        </div>
                        <div className="w-10/12 font-bold text-sm">
                          <div>{i + 1}</div>
                          <div>{data?.title?.slice(0, 25)?.toString()}</div>
                          <div>{data?.url}</div>
                        </div>
                      </div>

                      <div className="flex mt-2">
                        <div
                          onClick={() => {
                            metahandleEdit(data.id);
                          }}
                          className="bg-white w-[40px] block p-2.5 shadow-lg cursor-pointer rounded-full mr-2"
                        >
                          <BiEdit className="text-2xl text-blue" />
                        </div>

                        <div
                          onClick={() => {
                            handleMetaDelete(data.id);
                          }}
                          className="bg-white w-[40px] block p-2.5 shadow-lg cursor-pointer rounded-full"
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                    </div>
                    <hr className="mt-3" />
                  </div>
                ))}
              </div>
            </div>

            <EditMetaUrlModal
              editOpen={metaEdit}
              setEditOpen={setMetaEdit}
              setReFetch={setReFetch}
              singleMeta={singleMeta}
            />
            <MetaUrlModal
              open={metaModalOpen}
              setOpen={setMetaModalOpen}
              edit={metaEdit}
              setReFetch={setReFetch}
            />
          </div>
        )}
        {cityShow && (
          <div className="bg-white mr-3 p-3 rounded-lg">
            <div className="md:flex gap-x-1 md:px-5 px-3  justify-between">
              {/* <h3 className="font-bold text-[19px] text-[#252733] mr-3">All Institutes</h3> */}
              <button
                onClick={() => {
                  setCityModalOpen(true);
                  setReFetch(false);
                  
                }}
                className="px-4 py-2 text-[#F0F0F0] mr-2 my-2 text-lg font-medium rounded-lg bg-primary border-0"
              >
                Add City
              </button>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name"
                className="outline-none w-[300px] border border-gray/20 p-2 my-2 "
              />
            </div>
            <table className="mt-10 hidden md:block table-auto">
              <thead className="bg-white table w-full table-fixed border-b border-light-gray">
                <tr>
                  <th
                    scope="col"
                    className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  >
                    NO
                  </th>
                  <th
                    scope="col"
                    className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  >
                    State
                  </th>
                  <th
                    scope="col"
                    className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  >
                    City
                  </th>
                  <th
                    scope="col"
                    className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  >
                    Edit
                  </th>
                  <th
                    scope="col"
                    className="text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left"
                  >
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody className="block max-h-[70vh] scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-gray-100 overflow-y-auto">
                {cityData?.map((d, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b border-light-gray cursor-pointer transition duration-300 ease-in-out hover:bg-light-gray table w-full table-fixed"
                  >
                    <td
                      //   onClick={() => handleOnclick(d.id)}
                      className="text-[#252733] font-medium px-6 py-4 "
                    >
                      <div className="flex flex-col">
                        <p className="font-bold">{index + 1}</p>
                      </div>
                    </td>
                    <td
                      //   onClick={() => handleOnclick(d.id)}
                      className="text-[#252733] font-medium px-6 py-4 "
                    >
                      <div className="flex flex-col">
                        <p className="">{d?.state}</p>
                      </div>
                    </td>
                    <td
                      //   onClick={() => handleOnclick(d.id)}
                      className="text-[#252733] font-medium px-6 py-4 "
                    >
                      <div className="flex flex-col">
                        <p className="">
                          {d?.city?.map((item) => (
                            <span>{item} , </span>
                          ))}
                        </p>
                      </div>
                    </td>

                    <td
                      //   onClick={() => handleOnclick(d.id)}
                      className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap flex items-center"
                    >
                      <div className="">
                        <div
                          onClick={() => {
                            cityhandleEdit(d.id);
                          }}
                          className="bg-white w-[40px] block p-2.5 shadow-lg cursor-pointer rounded-full"
                        >
                          <BiEdit className="text-2xl text-blue" />
                        </div>
                      </div>
                    </td>
                    <td className="text-[#252733] font-medium px-6 py-4 whitespace-nowrap">
                      <div className="">
                        <div
                          onClick={() => {
                            handleCityDelete(d.id);
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

            <div className="md:hidden block p-3">
              <h3 className="mb-3 font-bold text-[#9FA2B4]">
                Top Location Details
              </h3>
              <div className="flex space-y-4 flex-col">
                {cityData?.map((data, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between"></div>
                    <div className="">
                      <div className="flex mt-3 space-x-1 justify-between">
                        <div className="w-2/12 text-[#717171] text-sm">
                          <div>No :</div>
                          <div>State :</div>
                          <div>Cities :</div>
                        </div>
                        <div className="w-10/12 font-bold text-sm">
                          <div>{i + 1}</div>
                          <div>{data?.state}</div>
                          <div>
                            {data?.city?.map((item) => (
                              <span>{item} , </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex mt-2">
                        <div
                          onClick={() => {
                            cityhandleEdit(data.id);
                          }}
                          className="bg-white w-[40px] block p-2.5 shadow-lg cursor-pointer rounded-full mr-2"
                        >
                          <BiEdit className="text-2xl text-blue" />
                        </div>

                        <div
                          onClick={() => {
                            handleCityDelete(data.id);
                          }}
                          className="bg-white w-[40px] block p-2.5 shadow-lg cursor-pointer rounded-full"
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                    </div>
                    <hr className="mt-3" />
                  </div>
                ))}
              </div>
            </div>

            <EditCityModal
              editOpen={cityEdit}
              setEditOpen={setCityEdit}
              setReFetch={setReFetch}
              singleCity={singleCity}
            />
            <AddCityModal
              open={cityModalOpen}
              setOpen={setCityModalOpen}
              edit={cityEdit}
              setReFetch={setReFetch}
            />
          </div>
        )}
      </>
    </AdminDashboard>
  );
}
