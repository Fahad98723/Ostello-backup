import React, { useEffect, useState } from "react";
import DropdownSelector from "../../../../components/pages/Merchant/Dashboard/MyProfile/DropdownSelector";
import { Fragment } from "react";
import { EditOutlined } from "@ant-design/icons";
import {
  authSelector,
  getInstituteDetails,
} from "../../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import UpgardeModal from "../../../../components/pages/Merchant/Dashboard/UpgradeModal/UpgardeModal";
import LocationPopup from "../../../../components/pages/Merchant/Dashboard/MyProfile/LocationPopup";
import ToggleDashboard from "../../../../components/pages/Merchant/Dashboard/ToggleDashboard";
import DashboardSidebar from "../../../../components/pages/Merchant/Dashboard/DashboardSidebar";
import { useRouter } from "next/router";
import { isEmpty } from "../../../../utils/utils";
import { toast } from "react-hot-toast";

const ManageLocations = () => {
  const { instituteDetails, userData, loading } = useSelector(authSelector);
  const [locationValues, setLocationValues] = useState(
    instituteDetails?.locations
  );

  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [isEditLocation, setIsEditLocation] = useState(false);
  const [editLocationValues, setEditLocationValues] = useState({});

  useEffect(() => {
    if (instituteDetails?.locations?.length) {
      let temp = [];
      instituteDetails?.locations?.forEach((item) => temp.push(item && item));
      setLocationValues(temp);
    }
  }, [instituteDetails]);

  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (instituteDetails?.accountplan === "pro_plan") {
      setPaid(true);
    } else {
      setPaid(false);
    }
  }, [instituteDetails?.accountplan]);

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const [showSidebar, setShowSidebar] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     if (
  //       typeof window !== "undefined" &&
  //       window.localStorage.getItem("OWNER_ID") === null
  //     )
  //       router.push("/merchant/login");
  //     if (userData) {
  //       if (userData?.usertype !== 2) {
  //         router.push("/merchant/login");
  //       }
  //     } else if (
  //       typeof window !== "undefined" &&
  //       window.localStorage.getItem("INSTITUTE_ID") === null
  //     )
  //       router.push("/merchant/details");
  //     dispatch(getInstituteDetails());
  //   }, [refetch, router, userData]);

  useEffect(() => {
    if (
      !loading &&
      !isEmpty(instituteDetails) &&
      instituteDetails.approval !== 1
    ) {
      router.push("/merchant/details/success");
    } else {
      return;
    }
  }, [instituteDetails, loading, router]);

  useEffect(() => {
    dispatch(getInstituteDetails());
  }, []);

  const [isDisable, setIsDisable] = useState(true);

  return (
    <div>
      <div className="dashboard">
        <ToggleDashboard
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        ></ToggleDashboard>
        <div className=" grid grid-cols-6 gap-0 bg-white ">
          <DashboardSidebar />
          <div
            style={{ background: " #FAFAFB" }}
            className="  col-span-6 px-5 lg:col-span-5  "
            onClick={() => setShowSidebar(false)}
          >
            {" "}
            <section className="  w-full px-6 space-y-4 lg:space-y-0 lg:px-12   mb-6">
              <div className="heading p-5 mb-5 flex justify-between">
                <h1 className="text-2xl font-bold ">Manage Locations</h1>

                <button
                  className="bg-primary text-white w-32  rounded-full p-1 lg:ml-auto"
                  onClick={(e) => {
                    e.preventDefault();
                    // setShowPopUp(!showPopUp)

                    if (!paid) {
                      if (locationValues.length) {
                        toast.error(
                          "You added locations! To add more, Please upgarade your plan"
                        );
                        handleOpen();
                      }
                      if (locationValues.length === 0) {
                        setShowLocationPopup(true);
                      }
                    } else {
                      setShowLocationPopup(true);
                    }
                  }}
                >
                  + Add location
                </button>
              </div>

              <Fragment>
                <div className="flex flex-col space-y-2   ">
                  {locationValues?.map((element, index) => (
                    <div
                      key={index}
                      className="shrink w-full lg:w-10/12 px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0"
                    >
                      <>
                        <EditOutlined
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditLocation(true);
                            setEditLocationValues({
                              ...element,
                              index,
                            });
                            setShowLocationPopup(true);
                          }}
                          className="text-primary border border-primary p-1 float-right cursor-pointer"
                        />
                      </>
                      <p className="font-bold text-xl">Location {index + 1}</p>
                      <p className=" font-bold">
                        Line1:{" "}
                        <span className="font-normal">{element.line1}</span>
                      </p>
                      <div className=" font-bold flex">
                        Line2:{" "}
                        <input
                          defaultValue={element?.line2}
                          disabled={isDisable ? true : false}
                          type="text"
                          autoFocus
                          className="ml-2 border-0 bg-white outline-0 text-[#000000] text-[18px] focus:ring-0 p-0 w-full font-normal"
                        />
                      </div>
                      <p className=" font-bold">
                        Pincode:{" "}
                        <span className="font-normal">{element.pincode}</span>
                      </p>
                      <p className=" font-bold">
                        Country:{" "}
                        <span className="font-normal">{element.country}</span>
                      </p>
                      <div className=" font-bold flex">
                        State:{" "}
                        <input
                          defaultValue={element?.state}
                          disabled={isDisable ? true : false}
                          type="text"
                          autoFocus
                          className="ml-2 border-0 bg-white outline-0 text-[#000000] text-[18px] focus:ring-0 p-0 w-full font-normal"
                        />
                      </div>
                      <p className=" font-bold">
                        City:{" "}
                        <span className="font-normal">{element.city}</span>
                      </p>
                      <p className=" font-bold">
                        Area:{" "}
                        <span className="font-normal">{element.area}</span>
                      </p>
                    </div>
                  ))}
                </div>{" "}
              </Fragment>
            </section>
          </div>

          {showLocationPopup && (
            <LocationPopup
              editValues={editLocationValues}
              isEdit={isEditLocation}
              afterSuccess={() => {
                setShowLocationPopup(false);
                setEditLocationValues({});
                setIsEditLocation(false);
              }}
            />
          )}

          <UpgardeModal
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageLocations;
