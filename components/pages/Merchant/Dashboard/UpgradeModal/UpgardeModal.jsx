import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { FaCrown } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import DashboardPayment from "../DashboardPayment";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/system";
import { toast } from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "15px",
  color: "black",
  overflow: "hidden",
  fontFamily: `'Inter', sans-serif !important`,
};

const UpgardeModal = ({ open, setOpen, handleClose }) => {
  const [plan, setPlan] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const [request, setRequest] = useState(false);

  const handleRequest = () => {
    setRequest(true);
  };

  const [openModal, setOpenModal] = useState(false);

  const handleModalClose = () => {
    setOpenModal(false);
  };
  const handleModalOpen = () => {
    if (!totalPrice.length && !plan.length) {
      toast.error("Select any plan first");
      return;
    }
    setOpenModal(true);
    handleClose();
  };

  const [proceed, setProceed] = useState(false);
  const handleProceed = () => {
    setProceed(true);
  };

  const theme = useTheme();
  const useStyle = makeStyles({
    modalBox: {
      maxWidth: "960px",
      width: "100%",
      overflowY: "scroll!important",

      [theme.breakpoints.down("sm")]: {
        width: "90%",
        height: "100%",
        overflowY: "scroll!important",
        marginTop: "20px",
      },
    },
  });
  const { modalBox } = useStyle();
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={`${modalBox} upgrade-payment`}>
          <div className="md:flex relative">
            <div className="bg-primary md:p-8 p-4 md:w-[510px] w-full text-white">
              <p>
                <FaCrown className="text-[#FFD907] text-[30px] mr-2" />
              </p>
              <p className=" md:text-[24px] text-[18px] my-3 font-bold">
                Unlock your potential with Premium!
              </p>
              {/* <p className=" md:text-[18px] text-[16px]">
                    <span className="font-bold">Guaranteed hiring</span> with
                    100% refund if you are not able to hire.
                  </p> */}

              <div className="bg-[#fafafb1a] rounded-xl shadow-md p-3 border-primary my-5">
                <p className="  md:text-[24px] text-[18px] mb-3 font-bold">
                  Premium benefits you get:{" "}
                </p>

                <div className="flex md:items-center my-3 md:text-[14px] text-[13px]">
                  <TiTick className=" text-[20px]" />{" "}
                  <p className="">Boosted visibility with 10x reach</p>
                </div>

                <div className="flex md:items-center my-3 md:text-[14px] text-[13px]">
                  <TiTick className=" text-[20px]" />{" "}
                  <p className="">
                    Access to local brand discounts for students
                  </p>
                </div>

                <div className="flex md:items-center my-3 md:text-[14px] text-[13px]">
                  <TiTick className=" text-[20px]" />{" "}
                  <p className="">Dedicated Relationship Manager</p>
                </div>

                <div className="flex md:items-center my-3 md:text-[14px] text-[13px]">
                  <TiTick className=" text-[20px]" />{" "}
                  <p className="">
                    Access to students' contact numbers, locations & schools
                  </p>
                </div>

                <div className="flex md:items-center my-3 md:text-[14px] text-[13px]">
                  <TiTick className=" text-[20px]" />{" "}
                  <p className="">
                    School promotions & brand visibility in the local area
                  </p>
                </div>
                <div className="flex md:items-center my-3 md:text-[14px] text-[13px]">
                  <TiTick className=" text-[20px]" />{" "}
                  <p className="">Unlimited Video Uploading & Sharing</p>
                </div>
                <div className="flex md:items-center my-3 md:text-[14px] text-[13px]">
                  <TiTick className=" text-[20px]" />{" "}
                  <p className="">Features of Mentor, Like & Subscribe</p>
                </div>
                <div className="flex md:items-center my-3 md:text-[14px] text-[13px]">
                  <TiTick className=" text-[20px]" />{" "}
                  <p className="">EMI And Pay later facility for students</p>
                </div>
              </div>
            </div>
            <div className="bg-white md:p-8 p-4 md:w-[460px] w-full text-[#333]">
              {!request ? (
                <>
                  <div className="text-center">
                    <p className="text-[22px] font-semibold">
                      Select your plan
                    </p>
                  </div>
                  <RxCross2
                    className="absolute md:top-10 top-5 text-[20px] md:right-8 right-5 font-bold cursor-pointer"
                    onClick={() => handleClose()}
                  />

                  {/* <div className="mt-3">
                        <p className="text-[18px] mb-2 font-bold">
                          Pay per post
                        </p>
                        <div
                          className="flex  items-center border-[1px] border-[#DDD] p-2 py-3  cursor-pointer rounded-lg"
                          onClick={() => {
                            setPlan("post");
                            setTotalPrice("2999");
                          }}
                        >
                          <input
                            type="radio"
                            checked={plan === "post"}
                            id="post"
                            value="post"
                            className="block mr-3 justify-start cursor-pointer items-start"
                            onChange={(e) => setPlan(e.target.value)}
                          />
                          <label
                            htmlFor="post"
                            className=" text-[16px] cursor-pointer"
                          >
                            Upgrade this post for ₹2,999{" "}
                          </label>{" "}
                        </div>
                      </div> */}

                  <div className="mt-4">
                    <p className="text-[18px] font-bold">Subscription plans</p>
                    {/* <p className="text-[15px] my-2">
                          Post unlimited premium internships & jobs
                        </p> */}
                    <div
                      className="flex my-2  items-start justify-start border-[1px] border-[#DDD] p-2 py-4 cursor-pointer rounded-lg"
                      onClick={() => {
                        setPlan("monthly");
                        setTotalPrice("10499");
                      }}
                    >
                      <input
                        type="radio"
                        checked={plan === "monthly"}
                        id="monthly"
                        value="monthly"
                        className="block mr-3 mt-2 justify-start cursor-pointer items-start"
                        onChange={(e) => setPlan(e.target.value)}
                      />
                      <label
                        htmlFor="monthly"
                        className=" text-[18px] cursor-pointer"
                      >
                        <p className="font-semibold text-[18px]">
                        6  Month Plan
                        </p>
                        <p className="text-[16px] text-[#484848] font-medium my-1.5">
                          ₹10,499/ 6month{" "}
                          {/* <span className="text-gray text-[14px] line-through">
                            ₹4,999{" "}
                          </span> */}
                        </p>
                        <p className="text-[13px] bg-[#7f56d9a6] w-[160px] rounded-sm p-[3px] text-white">
                          30% Limited period offer
                        </p>
                      </label>{" "}
                    </div>

                    <div
                      className="my-3  border-[1px] border-[#DDD]  cursor-pointer rounded-lg relative"
                      onClick={() => {
                        setPlan("yearly");
                        setTotalPrice("16999");
                      }}
                    >
                      <div className="bg-[#FFD907] aboslute top-0 left-0 p-2  rounded-tl-lg rounded-br-lg w-[80px]">
                        <p className=" ">Popular</p>
                      </div>

                      <div className="flex items-start justify-start p-2 py-4 pt-3">
                        <input
                          type="radio"
                          checked={plan === "yearly"}
                          id="yearly"
                          value="yearly"
                          className="block mr-3 mt-1.5 cursor-pointer "
                          onChange={(e) => setPlan(e.target.value)}
                        />
                        <label
                          htmlFor="yearly"
                          className=" text-[18px] cursor-pointer"
                        >
                          <p className="font-semibold text-[18px]">
                            Yearly Plan (410 Days)
                          </p>
                          <p className="text-[16px] text-[#484848] font-medium my-1.5">
                            ₹16,999 /year{" "}
                            <span className="text-gray text-[14px] ">
                              {/* <span className="line-through"> ₹55,000 </span> */}
                              (Annual billing){" "}
                            </span>
                          </p>
                          <p className="text-[13px] bg-[#7f56d9a6] w-[230px] rounded-sm p-[3px] text-white">
                            30% Limited period offer + 5% Off
                          </p>
                        </label>{" "}
                      </div>
                    </div>

                    <div
                      className="flex my-2  items-start justify-start border-[1px] border-[#DDD] p-2 py-4 cursor-pointer rounded-lg"
                      onClick={() => {
                        setPlan("custom");
                      }}
                    >
                      <input
                        type="radio"
                        checked={plan === "custom"}
                        id="custom"
                        value="custom"
                        className="block mr-3 mt-2 cursor-pointer "
                        onChange={(e) => setPlan(e.target.value)}
                      />
                      <label
                        htmlFor="custom"
                        className=" text-[18px] cursor-pointer"
                      >
                        <p className="font-semibold text-[18px]">Custom plan</p>
                        <p className="text-[16px] text-[#484848] font-medium my-1.5">
                          Explore the best solutions and offers for
                          your coaching
                        </p>
                      </label>{" "}
                    </div>

                    {plan === "custom" ? (
                      <button
                        onClick={() => handleRequest()}
                        className="bg-primary text-white w-full  p-2 py-3 rounded-md text-[18px]"
                      >
                        Request a callback
                      </button>
                    ) : (
                      <button
                        onClick={() => handleModalOpen()}
                        className="bg-primary text-white w-full  p-2 py-3 rounded-md text-[18px]"
                      >
                        Upgrade Now
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div>
                  <RxCross2
                    className="absolute md:top-10 top-5 text-[20px] md:right-8 right-5 font-bold  cursor-pointer"
                    onClick={() => handleClose()}
                  />
                  <div className="mt-10 flex flex-col items-center justify-center">
                    <FcApproval className="text-[40px] text-center" />
                    <p className="text-[30px] font-bold">Thank you!</p>
                    <p className="text-[17px]">
                      Our representative will get back to you shortly.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Box>
      </Modal>

      <DashboardPayment
        openModal={openModal}
        handleModalClose={handleModalClose}
        totalPrice={totalPrice}
        select={plan}
        handleProceed={handleProceed}
        proceed={proceed}
      />
    </div>
  );
};

export default UpgardeModal;
