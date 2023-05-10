import React, { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { AiOutlineShareAlt } from "react-icons/ai";
import ShareModal from "./ShareModal";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { authSelector } from "../../../redux/slices/authSlice";

const InviteAndEarns = () => {
  const data = [];
  const code = "ERFGH76UIF98";

  const [copied, setCopied] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const router = useRouter();
  const userLogin = useSelector((state) => state.auth.isAuthenticated);

  const { userData } = useSelector(authSelector);

  useEffect(() => {
    if (!userLogin) return router.push("/");
  }, [userLogin, router]);

  return (
    <div className="h-full p-5 mb-16">
      <div>
        <div className="heading my-2 ">
          <p className="text-2xl font-bold ">Invite & Earns</p>
        </div>
        {/* <div className="bg-primary/20 p-2 flex justify-between items-center border-dashed border-2 border-black rounded">
          <p className="text-lg">{code}</p>
          <button
            className="bg-primary/80 p-1 text-white rounded flex items-center text-lg"
            onClick={() => {
              navigator.clipboard.writeText(code);
              if (navigator.clipboard.writeText(code)) {
                setCopied(true);
              }
            }}
          >
            <MdContentCopy className="mr-1" />
            {copied ? "Copied" : "Copy"}
          </button>
        </div> */}

        {userData?.formsreferralcode ? (
          <div className="bg-primary/20 p-2 my-3 flex justify-between items-center border-dashed border-2 border-white rounded">
            <p className="text-lg mr-2 ">
              Your Entrance Exam Referral Code :{" "}
              <span>{userData?.formsreferralcode}</span>
            </p>
            <button
              className="bg-primary/80 p-1 text-white rounded flex items-center text-lg"
              onClick={() => {
                navigator.clipboard.writeText(userData?.formsreferralcode);
                if (
                  navigator.clipboard.writeText(userData?.formsreferralcode)
                ) {
                  setCopied(true);
                }
              }}
            >
              <MdContentCopy className="mr-1" />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        ) : (
          ""
        )}

        {userData?.wallet?.referralcode ? (
          <div className="bg-primary/20 p-2 my-3 flex justify-between items-center border-dashed border-2 border-white rounded">
            <p className="text-lg mr-2 ">
              Your Sign Up Referral Code :{" "}
              <span>{userData?.wallet?.referralcode}</span>
            </p>
            <button
              className="bg-primary/80 p-1 text-white rounded flex items-center text-lg"
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://www.ostello.co.in/referral/${userData?.wallet?.referralcode}`
                );
                // navigator.clipboard.writeText(`localhost:3000/referral/${userData?.wallet?.referralcode}`);
                if (
                  navigator.clipboard.writeText(
                    `https://www.ostello.co.in/referral/${userData?.wallet?.referralcode}`
                  )
                  // navigator.clipboard.writeText(`localhost:3000/referral/${userData?.wallet?.referralcode}`)
                ) {
                  setCopied(true);
                }
              }}
            >
              <MdContentCopy className="mr-1" />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        ) : (
          ""
        )}

        <div className="my-3 flex">
          <a
            onClick={() => {
              navigator.clipboard.writeText(
                `https://www.ostello.co.in/referral/${userData?.wallet?.referralcode}`
              );
              // navigator.clipboard.writeText(`localhost:3000/referral/${userData?.wallet?.referralcode}`);
              if (
                navigator.clipboard.writeText(
                  `https://www.ostello.co.in/referral/${userData?.wallet?.referralcode}`
                )
                // navigator.clipboard.writeText(`localhost:3000/referral/${userData?.wallet?.referralcode}`)
              ) {
                setCopied(true);
              }
            }}
            href="https://wa.me/"
            className="flex items-center bg-[rgba(43,153,67,.3)] p-2 text-[#57ae7f] text-lg cursor-pointer rounded mr-4"
          >
            <BsWhatsapp className="mr-1" />
            <p>Share Via Whatsapp</p>
          </a>
          <div
            onClick={() => handleOpen()}
            className="flex items-center bg-ghost/30 p-2 px-16 text-ghost/100 cursor-pointer text-lg rounded"
          >
            <AiOutlineShareAlt className="mr-1" />
            <p>More</p>
          </div>
        </div>

        <div>
          <p className="text-2xl font-bold my-5">Coupons</p>

          <div className="w-full  grid lg:grid-cols-3 gap-4  lg:py-6   lg:m-0">
            {data.map((d, i) => (
              <div key={i} className="mx-auto">
                <img src={d.iamge.src} alt="" />
              </div>
            ))}
          </div>
        </div>

        <ShareModal open={open} setOpen={setOpen}></ShareModal>
      </div>
    </div>
  );
};

export default InviteAndEarns;
