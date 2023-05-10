import React, { useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { BsChevronLeft } from "react-icons/bs";
import { RiCoupon3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { selectCourse } from "../../../../redux/slices/courseSlice";
import Modal from "../../../UI/Modal/Modal";
import RubeeOne from "../../Payment/assets//RubeeLight.svg";
import RubeeTwo from "../../Payment/assets/RubeePurple.svg";
import RubeeThree from "../../Payment/assets/RubeeRed.svg";
import RubeeFour from "../../Payment/assets/RubeeGray.svg";
import { authSelector } from "../../../../redux/slices/authSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { host } from "../../../../utils/constant";

const RubeeLight = (
  <img src={RubeeOne.src} alt="" className="inline mr-1 mb-1 " />
);
const RubeePurple = (
  <img src={RubeeTwo.src} alt="" className="inline mr-1 mb-1 " />
);
const RubeeRed = (
  <img src={RubeeThree.src} alt="" className="inline mr-1 mb-1 " />
);
const RubeeGray = (
  <img src={RubeeFour.src} alt="" className="inline mr-1 mb-1 " />
);

const DashboardPayment = ({
  openModal,
  handleModalClose,
  totalPrice,

  handleProceed,
  proceed,
}) => {
  const [applied, setApplied] = useState(false);
  const handleApplied = () => {
    setApplied(!applied);
  };
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({});
  // const { getOrder, setOrder } = useSelector(selectOrder);
  const { userData } = useSelector(authSelector);
  const { currentCourse } = useSelector(selectCourse);
  const dispatch = useDispatch();
  const { grossprice, effectiveprice, discountprice, coupon, classtype } =
    currentCourse;
  let discount = grossprice - effectiveprice;
  let discountPrice = "5,000";

  const [couponPrice, setCouponPrice] = useState(0);

  let total;
  if (totalPrice) {
    total = Math.floor(totalPrice - couponPrice);
  }

  const handleChange = (e) => {
    setMode(e.target.value);
  };
  const handleActive = () => {
    setActive(!active);
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

    try {
      let options = {
        key: "rzp_live_NAltPNtSsBr1SG", // Enter the Key ID generated from the Dashboard
        key_secret: "XGMwWejJtOPxgvDGYUpdkRQI",
        amount: total * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Ostello India Pvt. Ltd",
        description: ` ${userData?.institute?.name}`,
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
            const data = {
              amount: total,
              userid: userData?.id,
            };
            const updated = await axios.post(
              `${host}/payments/order/accountupgrade`,
              data,
              {
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  Authorization: `Bearer ${
                    typeof window !== "undefined" &&
                    typeof window !== "undefined" &&
                    window.localStorage.getItem("ACCESS_TOKEN")
                  }`,
                },
              }
            );

            if (updated) {
              
              toast.success("Payment completed, Thanks for choosing us");
              handleSuccess();
            }
          } catch (err) {
            
            toast.error(err.message);
            toast.remove(processing);
            handleModalClose();
          }
        },
        prefill: {
          name: userData?.name,
          email: userData?.email,
          contact: userData?.phonenumber,
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
      handleModalClose();
    }
    e.preventDefault();
  };

  const [success, setSuccess] = useState(false);
  const handleSuccess = () => {
    setSuccess(true);
  };
  return (
    <div className="bg-white">
      <Modal
        closeOnOutsideClick={true}
        onClose={handleModalClose}
        open={openModal}
      >
        <>
          {!success ? (
            <div className=" w-[350px] h-auto  flex flex-col items-center justify-center py-5 bg-white rounded-md">
              {/* <div className='my-2 text-lg font-bold font-color-one capitalize'>
        order details
      </div> */}
              {active && !currentCourse.promode ? (
                <div className="available_coupon shadow w-[320px] bg-[#F4F4F4] rounded-3xl pl-3 px-7 py-4 mt-6">
                  <button
                    onClick={handleActive}
                    className=" flex items-center border-0 font-bold"
                  >
                    <BsChevronLeft className="mr-3 font-color-one" />{" "}
                    <span className="font-color-two">Coupons for you</span>
                  </button>

                  <h3 className="text-xl font-color-one font-medium p-2 my-3">
                    Available coupons
                  </h3>

                  <div className="">
                    <div
                      className={`my-2 shadow p-3 ${
                        !applied ? `bg-white` : `bg-primary`
                      } rounded-xl`}
                    >
                      <p
                        className={`${
                          !applied ? `text-primary` : `text-white`
                        }  text-lg md:text-xl`}
                      >
                        Get {discountPrice} off using coupon
                      </p>

                      <div className="flex items-center justify-between mt-4">
                        <div
                          className={`coupon_name ${
                            !applied ? `text-primary` : `text-white`
                          }  text-xl uppercase`}
                        >
                          {coupon?.couponcode}
                        </div>
                        {applied ? (
                          <button
                            onClick={handleApplied}
                            className="border-0 text-white uppercase text-base"
                          >
                            remove
                          </button>
                        ) : (
                          <button
                            onClick={handleApplied}
                            className="border-0 text-primary uppercase text-base"
                          >
                            apply
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {!proceed ? (
                    <div>
                      {/* <Referral /> */}
                      {/* <div>
                <button className="coupon w-[320px] mt-3 shadow bg-[#D6E5FF] rounded-md radius px-3 py-1 text-xl font-bold cursor-not-allowed">
                  <div className="flex justify-between items-center">
                    <div className="text-[14px] font-bold flex justify-center items-center">
                      <AiOutlineDollar
                        className="inline text-[
  #005FFF] mr-1 font-bold"
                      />
                      Current coin balance
                    </div>
                    <p className="inline mr-1 text-[14px] text-primary font-bold">
                      {userData?.wallet || 0}
                    </p>
                  </div>
                </button>
              </div> */}

                      {/* coupons handle  */}
                      {/* {select !== "monthly" ? (
                        <button
                          onClick={handleActive}
                          className={
                            `coupon w-[320px] mt-3 shadow border-2 border-[#005FFF] rounded-md radius px-3 py-1 text-xl font-bold` +
                              !currentCourse.promode &&
                            `coupon w-[320px] mt-3 shadow border-2 border-[#005FFF] rounded-md radius px-3 py-1 text-xl font-bold cursor-pointer`
                          }
                        >
                          <div className="flex justify-between items-center">
                            <div className="text-[14px] text-primary font-bold flex justify-center items-center">
                              <RiCoupon3Line className="inline mr-1 text-primary font-bold" />
                              Use coupons
                            </div>
                            <BiChevronRight className="inline mr-1 text-[14px] text-primary font-bold" />
                          </div>
                        </button>
                      ) : (
                        ""
                      )} */}
                      <div className="w-[320px] mt-3 rounded-md bg-[#F0ECFA] shadow px-3 py-1">
                        <div className=" text-[16px] flex justify-between">
                          <div className="mt-1 font-bold">Original Price</div>
                          <div className="mt-1 font-medium">
                            {" "}
                            {totalPrice} {RubeeLight}
                          </div>
                        </div>

                        {/* <div className="flex justify-between mt-3">
                          <div className="discount font-medium">Discount</div>
                          <div className="discount font-medium">
                            {" "}
                            -{discount} {RubeeRed}
                          </div>
                        </div> */}
                        <div className="flex justify-between">
                          <div className="font-color-one text-2xl mt-5 font-bold">
                            Grand Total
                          </div>
                          <div className="font-color-one text-2xl mt-5 font-medium">
                            {" "}
                            {total} {RubeeGray}
                          </div>
                        </div>
                        {/* <div className="XYZ-duration text-primary text-[10px] mt-1">
                          EMI: {currentCourse?.duration?.split(",").join(" ")} days @
                          {currentCourse?.emi} Rs
                        </div> */}
                        <div className="w-[300px] flex flex-col items-center justify-center mt-5 pb-3">
                          <button
                            onClick={handleProceed}
                            className="rounded-md bg-primary text-white capitalize text-normal w-full py-2"
                          >
                            Checkout
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-[320px] mt-3 px-3 py-1">
                      <div className="mt-1 font-bold text-[20px] pb-3">
                        Payment Method
                      </div>
                      <div className="bg-[#F0ECFA] rounded-sm shadow px-3 py-1">
                        {/* <div className="mt-1 font-bold text-[16px]">
                          Select Payment Method
                        </div>
                        <div className="flex justify-center items-center mt-2">
                          <div>
                            <p className="text-primary text-lg">
                              Direct Payment
                            </p>
                            <p className="text-primary text-xs">
                              UPI, Wallets, Net Banking, Card Payments
                            </p>
                          </div>
                           {" "}
                          <input
                            checked={mode === "full"}
                            type="radio"
                            id="online"
                            name="institute"
                            value="full"
                            className=" block ml-auto mr-1 cursor-pointer"
                            onChange={handleChange}
                          />
                        </div> */}

                        {/* <div className="flex justify-center items-center mt-2">
                          <div>
                            <p className="text-primary text-lg">EMI Options</p>
                            <p className="text-primary text-xs">
                              {currentCourse?.duration?.split(",").join(" ")}{" "}
                              days @{currentCourse?.emi} Rs
                            </p>
                          </div>
                           {" "}
                          <input
                            type="radio"
                            id="css"
                            name="institute"
                            checked={mode === "partial"}
                            value="partial"
                            className="block ml-auto mr-1 cursor-pointer"
                            onChange={handleChange}
                          />
                        </div> */}

                        {/* <div className="flex justify-center items-center mt-2">
                          <div>
                            <p className="text-primary text-lg">
                              Cash Handover
                            </p>
                            <p className="text-primary text-xs">
                              Pay the institution directly
                            </p>
                          </div>
                           {" "}
                          <input
                            type="radio"
                            id="hybrid"
                            name="institute"
                            value="offline"
                            checked={mode === "offline"}
                            className="block ml-auto mr-1 cursor-pointer"
                            onChange={handleChange}
                          />
                        </div> */}

                        <div className="bg-white rounded-md shadow px-2 py-1 mt-2">
                          <div className="flex justify-between mt-3">
                            <p className="text-[14px]">Original Price</p>
                            <p>{totalPrice} Rs</p>
                          </div>
                          {/* <div className="flex justify-between mt-3">
                              <p className="text-[14px]">Total Discounts</p>
                              <p>{discount} Rs</p>
                            </div> */}
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

                        <div className="w-[270px] flex flex-col items-center justify-center mt-5 pb-3">
                          <button
                            onClick={makePayment}
                            className="rounded-md bg-primary text-white capitalize text-normal w-full py-2"
                          >
                            Pay {total} Rs
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="w-[400px] md:w-auto px-3 py-5 bg-[#F9F5FF] rounded-xl">
              <div id="divToDownload" className="w-auto px-2 py-2">
                <div className="w-auto px-3 py-2 bg-[#F9F5FF] rounded-xl border border-gray">
                  <div className="flex flex-col justify-center items-center">
                    <div className="w-40 h-10 flex justify-center items-center rounded-full">
                      {/* <img src={imgLogo.src} className="" alt="" /> */}
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
                      <h4>Your Order Details</h4>
                      <h4>Payment Id: {paymentDetails?.id}</h4>
                    </div>
                    <div className="mx-auto px-2 py-3 font-bold">
                      <div className="mt-2">
                        <p>Name: Fahad</p>
                        <p>
                          Paid On:{" "}
                          {new Date(paymentDetails?.created_at).toDateString()}
                        </p>
                        <p>Method : {paymentDetails?.card}</p>
                        <p>Email : {paymentDetails?.email}</p>
                        <p>Mobile Number : {paymentDetails?.contact}</p>
                        <p>Amount Paid : {paymentDetails?.amount} Rs</p>
                        <p>Amount Due : {total - paymentDetails?.amount} Rs</p>
                        <p>Total Amount : {total} Rs</p>
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
        </>
      </Modal>
    </div>
  );
};

export default DashboardPayment;
