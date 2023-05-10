import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineDollar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice";
import { selectCourse } from "../../redux/slices/courseSlice";
import { getOrderResponse, selectOrder } from "../../redux/slices/orderSlice";
import { host } from "../../utils/constant";
// import CouponCard from "./coupon_card";
// import AvailableCoupon from "./coupon_card/available_coupons";
// import MoneyDetails from "./money_details";
// import XyzCard from "./product_details";
// import Referral from "./referral_code";
import imgLogo from "../../assets/logo_title.svg";
import offlineIndicator from "../../assets/images/icons/offlineIndicator.svg";
import onlineIndicator from "../../assets/images/icons/onlineIndicator.svg";
import hybridIndicator from "../../assets/images/icons/hybridIndicator.svg";
import { downloadPdfDocument } from "../../utils/utils";
import { useRouter } from "next/router";

const FreeRegisterPayment = ({
  handleSuccess,
  handleModalClose,
  success,
  name,
  email,
  phonenumber,
  institutes,
  setOpenModal,
  referralCode,
  schoolname,
  classes,
  fathersname,
  referrealtype,
  stream,
}) => {
  const [active, setActive] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [mode, setMode] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({});
  const { getOrder, setOrder } = useSelector(selectOrder);
  const { userData } = useSelector(authSelector);
  const { currentCourse } = useSelector(selectCourse);
  const dispatch = useDispatch();
  const { coupon, classtype } = currentCourse;

  //   let discount = grossPrice - effPrice;
  // let couponPrice = 0;
  // if (applied) {
  //   couponPrice = discountPrice * (coupon?.discountrate / 100);
  // }
  // let total
  // useEffect(() => {
  //   if(InstiutesWith99.find(a => a === currentInstitute?.id)){

  //     total = 99
  //   }
  //   else{
  //     total = Math.floor(grossPrice - discount - couponPrice);

  //   }
  // },[currentInstitute?.id])

  const [total, setTotal] = useState();
  const [couponPrice, seteCouponPrice] = useState();

  //   useEffect(() => {
  //     if (applied) {
  //       if (InstiutesWith99.find((a) => a === currentInstitute?.id)) {
  //         if (!currentCourse?.pricingdetails?.oneTime) {
  //           seteCouponPrice(Math.floor(grossPrice - 99));
  //         } else {
  //           seteCouponPrice(
  //             Math.floor(discountPrice * (coupon?.discountrate / 100))
  //           );
  //         }
  //       } else {
  //         seteCouponPrice(
  //           Math.floor(discountPrice * (coupon?.discountrate / 100))
  //         );
  //       }
  //     }
  //   }, [applied, currentInstitute?.id]);

  //   useEffect(() => {
  //     if (InstiutesWith99.find((a) => a === currentInstitute?.id)) {
  //       if (!currentCourse?.pricingdetails?.oneTime) {
  //         if (couponPrice) {
  //           setTotal(Math.floor(grossPrice - couponPrice));
  //         } else {
  //           setTotal(Math.floor(grossPrice - discount));
  //         }
  //       } else {
  //         if (couponPrice) {
  //           setTotal(Math.floor(grossPrice - discount - couponPrice));
  //         } else {
  //           setTotal(Math.floor(grossPrice - discount));
  //         }
  //       }
  //     } else {
  //       if (couponPrice) {
  //         setTotal(Math.floor(grossPrice - discount - couponPrice));
  //       } else {
  //         setTotal(Math.floor(grossPrice - discount));
  //       }
  //     }
  //   }, [currentInstitute?.id, couponPrice]);

  //   

  const handleChange = (e) => {
    setMode(e.target.value);
  };
  const handleActive = () => {
    setActive(!active);
  };
  const handleProceed = () => {
    setProceed(true);
  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const makePayment = async (e) => {
    const processing = toast.loading("Processing Please wait ...");
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    const data = {
      amount: 99,
      userid: userData?.id,
    };
    try {
      let options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        amount: 9900, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Ostello India Pvt. Ltd",
        description: `Course with 99 registration for one month`,
        image: "https://cdn.ostello.co.in/logo-512.png",
        //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "https://www.ostello.co.in/",
        handler: async function (response) {
          // Validate payment at server - using webhooks is a better idea.

          const paymentData = await axios.get(
            `${host}/payments?id=${response?.razorpay_payment_id}`,
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

          setPaymentDetails(paymentData);
          try {
            const updated = await axios.post(
              `${host}/offers`,

              {
                offertype: "course_at_99",
                details: {
                  paymentmode: paymentData?.data?.method,
                  instituteid: institutes === "Others" ? "" : institutes,
                  referralcode: referralCode || null,
                  name,
                  fathersname,
                  fathersphonenumber: phonenumber,
                  classes,
                  schoolname,
                  referrealtype,
                  stream,
                },
              },
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

            if (updated) {
              toast.success(
                "Successfully registered & Payment completed, Thanks for choosing us"
              );
              handleSuccess();
            }
          } catch (err) {
            toast.error(err.message);
            toast.remove(processing);
            setOpenModal(false);
          }
        },
        prefill: {
          name: name,
          email: email,
          contact: phonenumber,
        },
        notes: {
          address: "Block-A - 1/57 Jangpura Extention New Delhi - 110014",
        },
        theme: {
          color: "#7D23E0",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      toast.remove(processing);
    } catch (err) {
      toast.error(err.message);
      toast.remove(processing);
    }
  };
  const getClassType = (num) => {
    if (num === 1) {
      return "Hybrid";
    }
    if (num === 2) {
      return "Online";
    }
    if (num === 3) {
      return "Offline";
    }
  };

  const router = useRouter();

  const payLater = async () => {
    try {
      await axios
        .post(
          `${host}/offers`,
          //need to add new field
          {
            offertype: "course_at_99",
            details: {
              paymentmode: "pay_later",
              instituteid: institutes === "Others" ? "" : institutes,
              referralcode: referralCode || null,
              name,
              fathersname,
              fathersphonenumber: phonenumber,
              classes,
              schoolname,
              referrealtype,
              stream,
            },
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${
                typeof window !== "undefined" &&
                window.localStorage.getItem("ACCESS_TOKEN")
              }`,
            },
          }
        )
        .then(() => {
          setOpenModal(false);
          toast.success("Successfully Registered");
          router.push("/free-registration-form/success");
        });
    } catch (err) {
      toast.error(err.message);
      setOpenModal(false);
    }
  };

  return (
    <div className="relative">
      <p
        className="cursor-pointer text-[16px] absolute right-[8px] font-bold h-[40px] w-[40px] flex items-center justify-center bg-primary text-white rounded-full"
        onClick={() => {
          if (!success) {
            handleModalClose();
          }
          if (success) {
            setOpenModal(false);
            router.push("/free-registration-form/success");
          }
        }}
      >
        x
      </p>
      {!success ? (
        <div className=" md:w-[380px] w-[99%] overflow-x-scroll md:mx-auto max-h-[550px] h-auto  px-3  flex flex-col items-center justify-center py-3 bg-white rounded-md">
          <>
            <div className="w-full mt-3 md:px-3 px-1 py-1">
              <div className="mt-1 font-bold md:text-[20px] text-[17px] pb-3">
                Pay Your Registration Fee
              </div>
              <div className="bg-[#F0ECFA] rounded-sm shadow md:px-3 px-1 py-1">
                <div className="mt-1 font-bold md:text-[16px] text-[14px]">
                  Select Payment Method
                </div>
                <button
                  className="coupon w-full mt-3 shadow bg-[#7D23E0] text-white rounded-md radius px-3 py-2 text-xl font-bold cursor-pointer"
                  onClick={() => makePayment()}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-[14px] font-bold flex justify-center items-center">
                      <AiOutlineDollar className="inline  mr-1 font-bold" />
                      Pay Rs.99 Now
                    </div>
                  </div>
                </button>
                <button
                  className="coupon w-full mt-3 shadow bg-[#7D23E0] text-white rounded-md radius px-3 py-2 text-xl font-bold cursor-pointer"
                  onClick={() => payLater()}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-[14px] font-bold flex justify-center items-center">
                      <AiOutlineDollar className="inline  mr-1 font-bold" />
                      Pay Rs.99 Later
                    </div>
                  </div>
                </button>
                {/* {mode === "full" || mode === "offline" ? (
                      <div className="bg-white rounded-md shadow px-2 py-1 mt-2">
                        <div className="flex justify-between mt-3">
                          <p className="text-[14px]">Original Price</p>
                          <p>{grossPrice} Rs</p>
                        </div>
                        {InstiutesWith99.find(
                          (a) => a === currentInstitute?.id
                        ) &&
                        !currentCourse?.pricingdetails?.oneTime &&
                        applied ? (
                          ""
                        ) : (
                          <div className="flex justify-between mt-3">
                            <p className="text-[14px]">Total Discounts</p>
                            <p>{discount} Rs</p>
                          </div>
                        )}

                        {applied && (
                          <div className="flex justify-between mt-3">
                            <p className="text-[14px]">Coupon</p>
                            <p>{couponPrice} Rs</p>
                          </div>
                        )}
                        <div className="flex justify-between mt-3 text-primary">
                          <p className="text-[14px] font-bold">To pay</p>
                          <p className="font-bold">{total} Rs</p>
                        </div>
                      </div>
                    ) : null} */}
                {/* {mode === "full" ? (
                      <div className="w-[270px] flex flex-col items-center justify-center mt-5 pb-3">
                        <button
                          onClick={makePayment}
                          className="rounded-md bg-primary text-white capitalize text-normal w-full py-2"
                        >
                          Pay {total} Rs
                        </button>
                      </div>
                    ) : mode === "partial" ? (
                      <div className="w-[270px] flex flex-col items-center justify-center mt-5 pb-3">
                        <button
                          onClick={handlePartialPayment}
                          className="rounded-md bg-primary text-white capitalize text-normal w-full py-2"
                        >
                          Proceed
                        </button>
                      </div>
                    ) : mode === "offline" ? (
                      <div className="w-[270px] flex flex-col items-center justify-center mt-5 pb-3">
                        <button
                          onClick={() => handleModalClose()}
                          className="rounded-md bg-primary text-white capitalize text-normal w-full py-2"
                        >
                          Get your slip
                        </button>
                      </div>
                    ) : null} */}
              </div>
            </div>
          </>
        </div>
      ) : (
        <div className="w-[400px] md:w-auto px-3 py-5 bg-[#F9F5FF] rounded-xl">
          <div id="divToDownload" className="w-auto px-2 py-2">
            <div className="w-auto px-3 py-2 bg-[#F9F5FF] rounded-xl border border-gray">
              <div className="flex flex-col justify-center items-center">
                <div className="w-40 h-10 flex justify-center items-center rounded-full">
                  <img src={imgLogo.src} className="" alt="" />
                </div>
                <div className="my-2 flex flex-col justify-center items-center">
                  <p className="text-2xl text-primary text-center md:w-max font-bold">
                    Payment completed Successfully
                  </p>
                  <p className="my-1 text-lg text-center md:w-max font-bold">
                    Thanks for choosing us
                  </p>
                </div>
              </div>
              <div className="mt-3 border rounded-xl border-[#E7EAEE] bg-[#E7EAEE]">
                <div className="flex flex-col justify-center items-center my-2">
                  <h4>Your 99 Course Payment Details</h4>
                  <h4>Payment Id: {paymentDetails?.id}</h4>
                </div>
                <div className="mx-auto px-2 py-3 font-bold">
                  <div className="mt-2">
                    <p>Name: {name}</p>
                    <p>
                      Paid On:{" "}
                      {new Date(paymentDetails?.created_at).toDateString()}
                    </p>
                    <p>Method : {paymentDetails?.card}</p>
                    <p>Email : {paymentDetails?.email}</p>
                    <p>Mobile Number : {paymentDetails?.contact}</p>
                    <p>Amount Paid : {paymentDetails?.amount} Rs</p>
                    <p>Amount Due : {99 - paymentDetails?.amount} Rs</p>
                    <p>Total Amount : {99} Rs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <button
              onClick={() => {
                downloadPdfDocument(
                  "divToDownload",
                  paymentDetails?.id || "download"
                );
                handleModalClose();
              }}
              className="rounded-md my-5 bg-primary text-white capitalize text-normal w-full py-2"
            >
              Get Receipt
            </button>
            <p className="text-md text-center w-max font-bold">
              We have sent your order receipt to your email
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreeRegisterPayment;
