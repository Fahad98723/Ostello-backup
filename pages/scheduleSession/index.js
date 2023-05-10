import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Navbar from "../../components/pages/HomeLanding/Header/Navbar";
import Head from "next/head";
import { institutesSelector } from "../../redux/slices/instituteSlice";
import moment from "moment";
import dynamic from "next/dynamic";
import { setUserLocation } from "../../redux/slices/UserAnalytics";
import "react-calendar/dist/Calendar.css";
const Calendar = dynamic(
  () => {
    return import("react-calendar");
  },
  { ssr: false }
);

const ScheduleSession = () => {
  const [value, onChange] = useState(new Date());

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.auth.isAuthenticated);
  const { singleTopper } = useSelector(institutesSelector);
  const router = useRouter();

  useEffect(() => {
    navigator.geolocation &&
      navigator.geolocation.getCurrentPosition(function (position) {
        dispatch(
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
      });
  });
  useEffect(() => {
    if (!userLogin) return router.push("/login");
  }, [userLogin, router]);

  const [select, setSelect] = useState({
    id: 0,
  });

  const [date, setDate] = useState(new Date());

  const [image, setImage] = useState("");

  useEffect(() => {
    if (singleTopper?.image?.length) {
      setImage(`https://cdn.ostello.co.in/${singleTopper?.image[0]?.key}`);
    }
    if (!singleTopper?.image?.length) {
      if (singleTopper?.video?.thumbnail?.length) {
        setImage(
          `https://cdn.ostello.co.in/${singleTopper?.video?.thumbnail[0]?.key}`
        );
      } else {
        setImage("https://i.ibb.co/yPpnkpH/user.png");
      }
    }
  }, [singleTopper]);

  return (
    <section>
      <Head>
        <title>Schedule Session - Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className=" md:max-w-[1350px] mx-auto py-5 ">
        <Navbar />
        <div className="bg-white shadow-xl rounded-2xl md:p-5 px-2 my-10">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            <div className="text-black border-r-[2px]">
              <img
                src={image}
                className="h-[80px] w-[80px] rounded-full"
                alt=""
              />
              <div className="my-5">
                <p className="text-[18px] ">{singleTopper?.name}</p>
                <p className="text-[32px] font-bold">Live Meeting</p>
              </div>
              <div className="mt-2 text-[16px]">
                <p>1 hr duration</p>
                <p className="text-[#888888] ">{singleTopper?.description}</p>
              </div>
            </div>
            <div className=" h-full">
              <Calendar
                onChange={setDate}
                value={date}
                className="react-calendar"
              />
            </div>
            <div className="md:mt-[70px]">
              <p className="text-[16px]">Available Slot</p>
              <div>
                <div
                  onClick={() =>
                    setSelect({
                      id: 1,
                    })
                  }
                  className={`md:w-2/4 w-full block cursor-pointer py-3 ${
                    select.id === 1
                      ? "bg-primary text-white"
                      : " text-[#717171]"
                  } border  rounded-xl my-2`}
                >
                  <p className="text-center text-[19px] ">
                    {singleTopper?.time
                      ? moment(singleTopper?.time, ["HH:mm"]).format("hh:mm a")
                      : "8.00 PM"}
                  </p>
                </div>
              </div>
              <div className="w-[200px] mt-5 cursor-pointer">
                <p className=" px-5 py-2 bg-[#949494] text-center rounded-md mb-3 text-white active:opacity-80 text-[18px] ">
                  Confirm on Mail
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSession;
