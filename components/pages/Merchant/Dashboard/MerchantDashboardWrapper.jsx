import React, { useState, useReducer, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { createContext } from "react/cjs/react.production.min";
import DashboardNav from "../../components/MerchantDashboard/DashboardNav";
import SidePopup, {
  SidePopupContext
} from "../../components/SidePopup/SidePopup";
import {
  initialSidePopupState,
  sidePopupReducer
} from "../../components/SidePopup/SidePopupReducer";
import Popup, { PopupContext } from "../../components/PopupSystem/Popup";
import {
  initialPopupState,
  popupReducer
} from "../../components/PopupSystem/PopupReducer";

export const MerchantDashboardContext = createContext();

const MerchantDashboardWrapper = () => {
  const [expandedNav, setExpandedNav] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [notifications, setNotifications] = useState(["add", "sub", "mul"]);

  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage.getItem("OWNER_ID") === null) navigate("/login");
     if (typeof window !== 'undefined' && window.localStorage.getItem("INSTITUTE_ID") === null)
      navigate("/merchant/details");
  }, []);

  return (
    <MerchantDashboardContext.Provider
      value={{
        navExpandedState: [expandedNav, setExpandedNav],
        fromDateState: [fromDate, setFromDate],
        toDateState: [toDate, setToDate],
        notificationsState: [notifications, setNotifications]
      }}
    >
      <PopupContext.Provider
        value={useReducer(popupReducer, initialPopupState)}
      >
        <SidePopupContext.Provider
          value={useReducer(sidePopupReducer, initialSidePopupState)}
        >
          <main className="min-h-screen lg:h-screen  w-screen overflow-x-hidden  lg:flex">
            <DashboardNav />
            <Outlet />
            <Popup />
            <SidePopup />
          </main>
        </SidePopupContext.Provider>
      </PopupContext.Provider>
    </MerchantDashboardContext.Provider>
  );
};

export default MerchantDashboardWrapper;
