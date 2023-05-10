import { Tabs } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFields, setSearch } from "../../../../redux/slices/courseSlice";
import {
  setClass,
  setLocationQuery,
} from "../../../../redux/slices/SearchSlice";
import { host } from "../../../../utils/constant";
import dynamic from "next/dynamic";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import useScreenWidth from "../../../hooks/useScreenWidth";

const InstituteCard = dynamic(
  () => {
    return import("../../../UI/InstituteCard");
  },
  { ssr: false }
);
const Segments = dynamic(
  () => {
    return import("./Segments");
  },
  { ssr: false }
);

export default function InstituteSection({ time }) {
  const [activeTab, setActiveTab] = useState("");
  const [topLocationData, setTopLocationData] = useState();

  const [state, setState] = useState(location?.region_name || "Delhi");

  useEffect(() => {
    if (
      location?.region_name === "Delhi" ||
      location?.region_name === "Uttar Pradesh" ||
      location?.region_name === "Haryana"
    ) {
      setState(location?.region_name);
    }
  }, [location?.region_name]);
  const router = useRouter();

  // useEffect(() => {
  //   try {
  //     axios
  //       .get(`${host}/locations?state=${state}&limit=100`)
  //       .then(function (response) {
  //         setTopLocationData(response.data.message);
  //
  //       });
  //   } catch (err) {
  //
  //   }
  // }, [dispatch, state]);
  const { screenWidth } = useScreenWidth();
  const [subLocationsData, setSubLocationsData] = useState([]);
  const [isViewMore, setIsViewMore] = useState(false);
  const [itemCount, setItemCount] = useState(screenWidth > 768 ? 20 : 7);
  const [subLocationCount, setSubLocationCount] = useState(0);

  useEffect(() => {
    if (screenWidth > 768) {
      setItemCount(20);
    } else {
      setItemCount(7);
    }
  }, [screenWidth]);

  useEffect(() => {
    if (state) {
      try {
        axios
          .get(`${host}/locations?city=${activeTab}&limit=${itemCount}`, {
            cache: "no-store",
          })
          .then(function (response) {
            setSubLocationsData(response.data.message);
            setSubLocationCount(response.data.count);
          });
      } catch (err) {}
    }
  }, [dispatch, state, activeTab, itemCount]);

  const [locationWay, setLocationWay] = useState();
  const dispatch = useDispatch();

  const [ipAddress, setIpAddress] = useState("");
  const [location, setLocation] = useState({});

  useEffect(() => {
    axios
      .get("/api/ip")
      .then((response) => {
        setIpAddress(response.data.ip);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    if (ipAddress) {
      axios
        .get(
          `https://api.apilayer.com/ip_to_location/${ipAddress}`,
          { cache: "no-store" },
          {
            headers: {
              apikey: "GJ7onKIHLk9jXHSiUaC6zD6lhzQd8JGz",
            },
          }
        )
        .then((response) => {
          setLocation(response.data);
          if (
            response.data?.region_name === "Delhi" ||
            response.data?.region_name === "Uttar Pradesh" ||
            response.data?.region_name === "Haryana"
          ) {
            setState(response.data?.region_name);
          }
        })
        .catch((error) => {});

      // fetch(`https://api.iplocation.net/?ip=${"103.127.0.26"}`)
      //   .then(function (response) {
      //     response.json().then((jsonData) => {
      //
      //     });
      //   })
      //   .catch(function (error) {
      //
      //   });
    }
  }, [ipAddress]);

  const getFilterInstitutes = async (place) => {
    await axios
      .get(`${host}/institute?approval=1&location=${place}&limit=6`, {
        cache: "no-store",
      })
      .then(function (response) {
        setLocationWay(response.data.message);
      });
  };

  const [locations, setLocations] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const run = async () => {
      await axios
        .get(`${host}/locations/city?state=${state}&nolimit=true`, {
          cache: "no-store",
        })
        .then(function (response) {
          setLocations(response?.data?.cities);
          let uniqueIds = [];

          response?.data?.cities.forEach((element) => {
            uniqueIds.push(...element.city);
          });

          setCities(uniqueIds);
        });
    };

    run();
  }, [state]);

  useEffect(() => {
    if (locations) {
      const data = locations?.filter((a) => a.state === state)[0]?.city[0];
      if (data && !activeTab) {
        setActiveTab(data);
        getFilterInstitutes(data);
        if (!activeTab) {
          setActiveTab(data);
          getFilterInstitutes(data);
        }
      }
    }
  }, [locations, state, activeTab]);

  return (
    <section className="container mx-auto p-5 lg:p-10 ">
      <div className=" text-center my-10 space-y-5 ">
        <h1 className=" leading-none font-bold text-xl lg:text-5xl ">
          Top Locations in India
        </h1>
        <p className="lg:text-lg">
          Choose from the best and the most suitable locations near you.
        </p>

        <div className="bg-[#F1F1F1] border border-[#DADADA] rounded-[50px] w-fit p-3 mx-auto flex justify-between">
          <button
            onClick={() => {
              setState("Uttar Pradesh");

              setActiveTab(
                locations?.filter((a) => a.state === "Uttar Pradesh")[0]
                  ?.city[0]
              );
              getFilterInstitutes(
                locations?.filter((a) => a.state === "Uttar Pradesh")[0]
                  ?.city[0]
              );
            }}
            className={`  py-2 md:text-lg   ${
              state === "Uttar Pradesh"
                ? "bg-[#7D23E0] text-white font-semibold md:px-6 px-3 mx-2"
                : "text-[#454C5C] md:px-3 px-2"
            } rounded-[50px] hover:scale-105 duration-200 text-sm whitespace-nowrap`}
          >
            Uttar Pradesh
          </button>
          <div className=" border-r-2 border-black "></div>
          <button
            onClick={() => {
              setState("Delhi");
              setActiveTab(
                locations?.filter((a) => a.state === "Delhi")[0]?.city[0]
              );
              getFilterInstitutes(
                locations?.filter((a) => a.state === "Delhi")[0]?.city[0]
              );
            }}
            className={`  py-2 md:text-lg mx-2 ${
              state === "Delhi"
                ? "bg-[#7D23E0] text-white font-semibold md:px-6 px-3 mx-2"
                : "text-[#454C5C] md:px-3 px-2"
            } rounded-[50px] hover:scale-105 duration-200 text-sm whitespace-nowrap`}
          >
            Delhi
          </button>
          <div className=" border-r-2 border-black "></div>
          <button
            onClick={() => {
              setState("Haryana");
              setActiveTab(
                locations?.filter((a) => a.state === "Haryana")[0]?.city[0]
              );
              getFilterInstitutes(
                locations?.filter((a) => a.state === "Haryana")[0]?.city[0]
              );
            }}
            className={`  py-2 md:text-lg mx-2 ${
              state === "Haryana"
                ? "bg-[#7D23E0] text-white font-semibold md:px-6 px-3 mx-2"
                : "text-[#454C5C] md:px-3 px-2"
            }    rounded-[50px] hover:scale-105 duration-200 text-sm whitespace-nowrap`}
          >
            Haryana
          </button>
        </div>
      </div>

      <Tabs
        centered
        defaultActiveKey={activeTab}
        className="max-w-5xl mx-auto"
        onChange={(e) => {
          getFilterInstitutes(e);
          setActiveTab(e);
        }}
      >
        {cities.map((item, key) => (
          <>
            <Tabs.TabPane key={item} tab={item}>
              <Segments className=" " options={subLocationsData} />
            </Tabs.TabPane>
          </>
        ))}
      </Tabs>

      {subLocationCount > 20 ? (
        <div
          onClick={() => {
            const itemHandler = () => {
              if (!isViewMore) {
                setItemCount(screenWidth > 768 ? 40 : 14);
              } else {
                setItemCount(screenWidth > 768 ? 20 : 7);
              }
            };
            itemHandler();
            setIsViewMore(!isViewMore);
          }}
          className="text-md bg-black w-[120px] rounded-md mx-auto my-2 text-white p-2 flex items-center space-x-2 cursor-pointer justify-center"
        >
          <p>{isViewMore ? "View Less" : "View More"}</p>
          {isViewMore ? (
            <UpOutlined className="flex items-center text-xs" />
          ) : (
            <DownOutlined className="flex items-center text-xs" />
          )}
        </div>
      ) : (
        ""
      )}

      <div className=" mt-10 mx-auto  grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-[60px] ">
        {locationWay
          // ?.sort((a, b) => b?.images?.length - a?.images?.length)
          // ?.sort((a, b) => b?.reviews?.length - a?.reviews?.length)
          // ?.sort((a, b) => b?.rating - a?.rating)
          // ?.slice(0, 6)
          ?.map((item, key) => (
            <InstituteCard {...item} key={key} />
          ))}
      </div>
      <div className="flex justify-center my-10">
        <button
          onClick={() => {
            dispatch(setFields(""));
            dispatch(setClass([]));
            dispatch(setLocationQuery(state));
            dispatch(
              setSearch({
                type: "institute",
                name: "",
              })
            );
            router.push(`/search/${state?.toLowerCase()?.replace(/ /g, "-")}`);
          }}
          className=" px-6 py-2 md:text-lg  bg-black text-white rounded-md hover:scale-105 duration-200 "
        >
          Explore More
        </button>
      </div>
    </section>
  );
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {
      time: new Date().toISOString(),
    },
  };
}
