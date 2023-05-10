import { LeftOutlined } from "@ant-design/icons";
import axios from "axios";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { TiWarningOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { selectUserAnalytics } from "../../../redux/slices/UserAnalytics";
import Modal from "../../UI/Modal/Modal";
import EnquirySection from "../institutes/EnquirySection";

export default function EnquiryFormModal({ open, setOpen, handleClose }) {
  const { enquiryFormModal } = useSelector(selectUserAnalytics);

  return (
    <div className="bg-white rounded-[10px] md:max-md:w-[370px] w-[300px]">
      <Modal closeOnOutsideClick={false} onClose={handleClose} open={open}>
        <div className=" rounded-[10px] md:w-[370px] w-[300px] bg-white max-h-[350px] h-full overflow-y-scroll">
          <div className="flex text-white rounded-t-[5px] bg-primary  h-[50px] justify-center items-center">
            <div className="text-center flex flex-col w-full">
              <div className="flex justify-between items-center mt-1 relative">
                {/* <span className="text-[18px] font-bold">Enquiry Form</span> */}
                <p
                  className="cursor-pointer text-[16px] font-bold w-[30px] h-[30px] absolute right-2 bg-white text-primary   rounded-full"
                  onClick={handleClose}
                >
                  x
                </p>
              </div>
            </div>
          </div>

          <div>
            <EnquirySection />
          </div>
        </div>
      </Modal>
    </div>
  );
}
