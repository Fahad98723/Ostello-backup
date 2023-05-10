import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import AddTopperModal from "./AddTopperModal";
import EditTopperModal from "./EditTopperModal";
import {
  authSelector,
  getInstituteDetails,
} from "../../../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { host } from "../../../../../utils/constant";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const Toppers = () => {
  const { instituteDetails } = useSelector(authSelector);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleRemove = async (id) => {
    let data;
    if (!instituteDetails?.updatedRequest?.toppers) {
      data = instituteDetails?.toppers?.filter((i) => i?.id !== id);
    }
    if (instituteDetails?.updatedRequest?.toppers) {
      data = instituteDetails?.updatedRequest?.toppers.filter(
        (i) => i?.id !== id
      );
    }

    const updatedData = {
      id: instituteDetails?.id,
      updates: {
        toppers: data,
      },
    };

    try {
      const { data } = await axios.patch(
        `${host}/institute/update`,
        updatedData,
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
      toast.success("Remove request sent .wait for super admin approval");
      dispatch(getInstituteDetails());
    } catch (err) {
      
      toast.success("Something went wrong try again later");
    }
  };

  const [active, setActive] = useState("default");
  const [mobilenumber, setmobilenumber] = useState();
  const [email, setEmail] = useState();
  const router = useRouter();

  const handleEmail = (val) => {
    setEmail(val);
  };

  const handleMobileNumber = (val) => {
    setmobilenumber(val);
  };

  const handleActive = (val) => {
    setActive(val);
  };

  const [singleTopper, setSingleTopper] = useState({});

  const handleEdit = (id) => {
    setSingleTopper(instituteDetails?.toppers?.find((a) => a?.id === id));
  };

  return (
    <div className="p-5">
      <div className="heading mb-5 flex justify-between">
        <h1 className="text-2xl font-bold ">Toppers</h1>

        <div className=" fixed lg:relative lg:mt-5 bottom-0 lg:right-0 mb-10 lg:mb-0 z-40 lg:flex items-center w-full">
          <button
            className="flex items-center  ml-auto w-32 py-2 lg:py-1  mr-10 rounded-full text-white justify-center bg-primary"
            onClick={() => setOpen(true)}
          >
            <AiOutlinePlus className="text-white" />
            <p className="">Add Toppers</p>
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        {instituteDetails?.toppers?.map((element, index) => (
          <div
            key={index}
            className="text-black p-5 bg-white shadow-xl rounded-2xl"
          >
            <div className="flex justify-between items-center">
              <img
                src={
                  element?.image?.length
                    ? `https://cdn.ostello.co.in/${element?.image[0]?.key}`
                    : "https://i.ibb.co/yPpnkpH/user.png"
                }
                className="h-[80px] w-[80px] rounded-full"
                alt=""
              />

              <div className="flex ">
                <EditOutlined
                  onClick={() => {
                    setEditOpen(true);
                    handleEdit(element?.id);
                  }}
                  className="text-primary border border-primary w-10 h-10 z-10 p-2 rounded-full cursor-pointer"
                />
                <RiDeleteBinLine
                  onClick={() => handleRemove(element?.id)}
                  className="ml-2 w-10 h-10 z-10 p-2 border-2 text-2xl bg-transparent mr-2 lg:mr-4 lg:top-4 top-2 right-0 rounded-full text-[#E46060] cursor-pointer"
                />
              </div>
            </div>
            <div className="my-5">
              <p className="text-[32px] font-bold">{element?.name}</p>
              <p className="text-[18px] ">{element?.subject}</p>
              <p className="text-[18px] ">{element?.exam}</p>
              <p className="text-[18px] ">{element?.rank}</p>
            </div>
            {/* <div className="mt-2 text-[16px]">
              {/* <p >1 hr duration</p> */}
            {/* <p className="text-[#888888] ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna
                cursus sollicitudin vehicula in rhoncus sit cursus. Ullamcorper
                vel, lorem malesuada egestas cras aliquam. Nec tempor, turpis
                ullamcorper erat elit sem eget. Urna et suspendisse dapibus
                magna et. */}
            {/* </p>
            </div> */}
          </div>
        ))}
      </div>

      <AddTopperModal
        open={open}
        setOpen={setOpen}
        instituteDetails={instituteDetails}
      ></AddTopperModal>
      <EditTopperModal
        open={editOpen}
        setOpen={setEditOpen}
        singleTopper={singleTopper}
        instituteDetails={instituteDetails}
      ></EditTopperModal>
    </div>
  );
};

export default Toppers;
