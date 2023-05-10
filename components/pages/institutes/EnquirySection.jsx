import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { GiCancel } from "react-icons/gi";
import { TbChecks } from "react-icons/tb";
import toast from "react-hot-toast";
import axios from "axios";
import { host } from "../../../utils/constant";
import { useEffect } from "react";
import {
  authSelector,
  setAuthModalState,
} from "../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import AuthModal from "../HomeLanding/Header/Navbar/AuthModal";

const EnquirySection = ({ currentInstitute, currentCourse }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");

  const {
    isAuthenticated,
    percentage,
    userData,
    isUploading,
    activeReview,
    editReview,
  } = useSelector(authSelector);

  const dispatch = useDispatch();
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [numberError, setNumberError] = useState("");

  const handleChange = (event, setFunction) => {
    setFunction(event.target.value);
  };
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const changeHandle = async () => {
    setSubmitted(false);
    if (!isAuthenticated) {
      dispatch(setAuthModalState(2));
      setOpen(true);
      return;
    }

    if (!name.length || !address.length || !email.length || !number.length) {
      toast.error("Please fill the fields");
      return;
    }

    

    const d = {
      name,
      email,
      phonenumber: number,
      address,
      description,
      courseid: currentCourse?.id,
      instituteid: currentInstitute?.id,
      institutename: currentInstitute?.name,
      coursename: currentCourse?.name,
    };
    
    try {
      
      const data = await axios.post(`${host}/forms/`, d, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      });
      
      // toast.success(data.data.message);
      setSubmitted(true);
      setEmail("");
      setName("");
      setDescription("");
      setAddress("");
      setNumber("");
    } catch (err) {
      
      if(err?.response?.status === 400){
        toast.error('Enquiry already Filled!');
      }
      else{
        toast.error(err.message);
      }
    } finally {
      // window.location.reload();
    }
  };

  return (
    <div id="enquireSection" className="md:px-8 px-4  md:py-10 py-5">
      <AuthModal handleClose={handleClose} open={open} />

      <div className=" md:mb-10 mb-5">
        <p className="text-2xl md:text-4xl font-bold mb-3">Enquire Form</p>
        <p className="text-[#333333] text-[17px]">
          If you have any queries kindly take a moment to fill up this form, Our
          representatives will contact you shortly.
        </p>
      </div>

      <div className="md:flex justify-between md:mb-3">
        <div className="shrink md:pr-3 md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
          <p className="text-base mb-1 text-[#333333] font-semibold">
            Your Name
          </p>
          <input
            type="text"
            className="text-base bg-[#F6F6F6] p-3 focus:outline-none border-2 border-solid border-light-gray  w-full"
            placeholder="Enter your name"
            onChange={(e) => handleChange(e, setName)}
            value={name}
          />
        </div>
        <div className="shrink   md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
          <p className="text-base mb-1 text-[#333333] font-semibold">
            Phone Number
          </p>
          <input
            type="text"
            className="text-base bg-[#F6F6F6] p-3 focus:outline-none border-2 border-solid border-light-gray  w-full"
            placeholder="Enter your phone number"
            onChange={(e) => handleChange(e, setNumber)}
            value={number}
          />
        </div>
      </div>
      <div className="md:flex justify-between md:mb-3">
        <div className="shrink md:pr-3  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
          <p className="text-base mb-1 text-[#333333] font-semibold">Email</p>
          <input
            type="text"
            className="text-base bg-[#F6F6F6] p-3 focus:outline-none border-2 border-solid border-light-gray  w-full"
            placeholder="Enter your email"
            onChange={(e) => handleChange(e, setEmail)}
            value={email}
          />
        </div>
        <div className="shrink  md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
          <p className="text-base mb-1 text-[#333333] font-semibold">Address</p>
          <input
            type="text"
            className="text-base bg-[#F6F6F6] p-3 focus:outline-none border-2 border-solid border-light-gray  w-full"
            placeholder="Enter your address"
            onChange={(e) => handleChange(e, setAddress)}
            value={address}
          />
        </div>
      </div>
      <div className="md:flex justify-between">
        <div className="shrink  w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
          <p className="text-base mb-1 text-[#333333] font-semibold">
            Description 
          </p>
          <textarea
            rows={5}
            type="text"
            className="text-base bg-[#F6F6F6] p-3 focus:outline-none border-2 border-solid border-light-gray  w-full"
            placeholder="How can Ostello help you ?"
            onChange={(e) => handleChange(e, setDescription)}
            value={description}
          />
        </div>
      </div>
      <div className="md:flex md:float-right items-center">
        {submitted ? (
          <div className="text-[19px] mr-3 flex items-center">
            {" "}
            <TbChecks className="mr-2" />{" "}
            <p><span className="font-bold">Thank you</span>, We have recieved your
            submission successfully.</p>
          </div>
        ) : (
          ""
        )}
        <button
          onClick={() => {
            changeHandle();
          }}
          className="  mr-2  px-5 py-2 bg-black rounded-md my-3 text-white active:opacity-80 text-[18px]"
        >
          Send Enquiry
        </button>
      </div>
    </div>
  );
};

export default EnquirySection;
