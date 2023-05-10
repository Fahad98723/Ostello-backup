import { useRouter } from "next/router";
import React from "react";
import { FaCrown } from "react-icons/fa";

const ApplicationSidebar = () => {
  const router = useRouter();
  return (
    <div className="pl-3 py-3 bg-light-gray h-screen md:block hidden">
      <div className="">
        <div
          onClick={() => router.push("/merchant/dashboard/application")}
          className={`flex justify-between  items-center py-1 my-1 cursor-pointer ${
            router.asPath === "/merchant/dashboard/application"
              ? " border-r-4 border-primary"
              : ""
          }`}
        >
          <p className="flex items-center">
            Access Database <FaCrown className="text-[#BF913B] ml-2" />
          </p>
          <span className="bg-gray rounded-2xl px-2 py-1 text-[12px] text-white mr-2">
            351
          </span>
        </div>

        <div className="border-y-2 border-gray/20">
          <div
            onClick={() =>
              router.push("/merchant/dashboard/application/received")
            }
            className={`flex justify-between  items-center py-1 my-1 cursor-pointer ${
              router.asPath === "/merchant/dashboard/application/received"
                ? " border-r-4 border-primary"
                : ""
            }`}
          >
            <p className="flex items-center">Application Recieved</p>
            <span className="bg-gray rounded-2xl px-2 py-1 text-[12px] text-white mr-2">
              21
            </span>
          </div>
          <div
            onClick={() =>
              router.push("/merchant/dashboard/application/received")
            }
            className={`flex justify-between  items-center py-1 my-1 cursor-pointer ${
              router.asPath === "/merchant/dashboard/application/received"
                ? " border-r-4 border-primary"
                : ""
            }`}
          >
            <p className="flex items-center">Shortlisted</p>
            <span className="bg-gray rounded-2xl px-2 py-1 text-[12px] text-white mr-2">
              21
            </span>
          </div>
          <div
            onClick={() =>
              router.push("/merchant/dashboard/application/received")
            }
            className={`flex justify-between  items-center py-1 my-1 cursor-pointer ${
              router.asPath === "/merchant/dashboard/application/received"
                ? " border-r-4 border-primary"
                : ""
            }`}
          >
            <p className="flex items-center">Hired</p>
            <span className="bg-gray rounded-2xl px-2 py-1 text-[12px] text-white mr-2">
              21
            </span>
          </div>
          <div
            onClick={() =>
              router.push("/merchant/dashboard/application/received")
            }
            className={`flex justify-between  items-center py-1 my-1 cursor-pointer ${
              router.asPath === "/merchant/dashboard/application/received"
                ? " border-r-4 border-primary"
                : ""
            }`}
          >
            <p className="flex items-center">Not Interested</p>
            <span className="bg-gray rounded-2xl px-2 py-1 text-[12px] text-white mr-2">
              21
            </span>
          </div>
        </div>

        <div className="">
          <div
            onClick={() =>
              router.push("/merchant/dashboard/application/received")
            }
            className={`flex justify-between  items-center py-1 my-1 cursor-pointer ${
              router.asPath === "/merchant/dashboard/application/received"
                ? " border-r-4 border-primary"
                : ""
            }`}
          >
            <p className="flex items-center">Assignment</p>
            <span className="bg-gray rounded-2xl px-2 py-1 text-[12px] text-white mr-2">
              21
            </span>
          </div>
          <div
            onClick={() =>
              router.push("/merchant/dashboard/application/received")
            }
            className={`flex justify-between  items-center py-1 my-1 cursor-pointer ${
              router.asPath === "/merchant/dashboard/application/received"
                ? " border-r-4 border-primary"
                : ""
            }`}
          >
            <p className="flex items-center">Interviews</p>
            <span className="bg-gray rounded-2xl px-2 py-1 text-[12px] text-white mr-2">
              21
            </span>
          </div>
          <div
            onClick={() =>
              router.push("/merchant/dashboard/application/received")
            }
            className={`flex justify-between  items-center py-1 my-1 cursor-pointer ${
              router.asPath === "/merchant/dashboard/application/received"
                ? " border-r-4 border-primary"
                : ""
            }`}
          >
            <p className="flex items-center">Chat Message</p>
            <span className="bg-gray rounded-2xl px-2 py-1 text-[12px] text-white mr-2">
              21
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSidebar;
