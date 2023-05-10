import React, { useState, useContext, useEffect } from "react";
import { VscBellDot } from "react-icons/vsc";
import { FiMenu } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { MerchantDashboardContext } from "../../pages/MerchantDashboardPages/MerchantDashboardWrapper";
const DashboardHeader = ({ text, popup = "" }) => {
  const [fromDate, setFromDate] = useContext(
    MerchantDashboardContext
  ).fromDateState;
  const [toDate, setToDate] = useContext(MerchantDashboardContext).toDateState;
  const [notifications] = useContext(
    MerchantDashboardContext
  ).notificationsState;

  const [first, setfirst] = useState(popup);
  const [isMobileNav, setIsMobileNav] = popup;

  useEffect(() => {
    let today = new Date();
    setFromDate(today.toISOString().substring(0, 10));
    let nextweek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    setToDate(nextweek.toISOString().substring(0, 10));
  }, [setFromDate, setToDate]);

  const location = useLocation();

  return (
    <header className="w-full  space-x-2 flex items-center px-6 lg:px-12 py-4 z-0 lg:py-6  font-dm-sans">
      {/* <FiMenu
        className={`${isMobileNav ? "hidden" : ""}text-xl lg:hidden`}
        onClick={() => setIsMobileNav(!isMobileNav)}
      /> */}
      <h1 className="text-lg lg:text-2xl px-2 font-bold">{text}</h1>
      <div className="flex-1"></div>
      {location.pathname === "/merchant/board/" && (
        <React.Fragment>
          <input
            type="date"
            className="text-ghost px-2 w-fit hidden lg:block"
            value={fromDate}
            onChange={(e) => {
              e.preventDefault();
              setFromDate(e.target.value);
            }}
          />
          <input
            type="date"
            className="text-ghost px-2 w-fit hidden lg:block"
            value={toDate}
            min={fromDate}
            onChange={(e) => {
              e.preventDefault();
              setToDate(e.target.value);
            }}
          />
        </React.Fragment>
      )}
      <button className="px-4 py-2 lg:hidden rounded-full ml-auto flex space-x-2 items-center">
        <VscBellDot className="text-primary text-lg" />
        {/* <p className="bg-light-red text-[#FF0000] px-1 py-0.5 text-xs rounded-full ">
          {notifications.length !== 0 && notifications.length}
        </p> */}
      </button>
    </header>
  );
};

export default DashboardHeader;
