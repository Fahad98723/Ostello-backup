import React from "react";
import toast from "react-hot-toast";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import { Box, useTheme } from "@mui/system";
import axios from "axios";
import { host } from "../../../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  institutesSelector,
  setExamRefCode,
} from "../../../../redux/slices/instituteSlice";
import { useRouter } from "next/router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 2,
  borderRadius: "5px",
  backgroundColor: "white",
  color: "black",
  overflow: "hidden",
};

const EntranceExamConfirmation = ({ open, setOpen, data }) => {
  const [
    name,
    school,
    number,
    fatherNumber,
    motherNumber,
    classes,
    subject,
    exam,
    line,
    area,
    pincode,
    city,
    state,
    gender,
    adharCard,
    physically,
    fatherName,
    motherName,
    birthDate,
    profilePic,
    email,
    instituteId,
    code,
  ] = data;

  const theme = useTheme();
  const useStyle = makeStyles({
    modalBox: {
      width: "50%",
      overflowY: "scroll!important",
      height: "80%",
      [theme.breakpoints.down("sm")]: {
        width: "80%",
        height: "60%",
        overflowY: "scroll!important",
      },
    },
  });
  const { modalBox } = useStyle();

  const router = useRouter();
  const dispatch = useDispatch();

  const image = profilePic[0]?.key;

  const handleAdding = async () => {
    const d = {
      instituteid: "af9b0466-c9ba-4ddf-a2ce-4a848745f944",
      name,
      school,
      phonenumber: number,
      fatherphonenumber: fatherNumber,
      motherphonenumber: motherNumber,
      class: classes,
      subjects: subject,
      exam,
      gender: gender,
      // adhaarno: parseInt(adharCard),
      physicallychallenged: physically,
      fathersname: fatherName,
      mothersname: motherName,
      dob: birthDate,
      email: email,
      address: {
        line,
        area,
        pincode,
        city,
        state,
      },
      // profilepic: profilePic,
      code: code || null,
    };

    try {
      const data = await axios.post(`${host}/exam/`, d, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      });

      dispatch(setExamRefCode(data.data.referralcode));
      toast.success(data.data.message);
      router.push("/entrance-exam/success");
    } catch (err) {
      toast.error(err.message);
    } finally {
      // window.location.reload();

      setOpen(false);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={modalBox}>
          <p className="text-[#009E60] text-md">
            Please Check The Every Details Carefully{" "}
          </p>
          {/* <p className="font-semibold text-base mb-2">Profile Picture :</p>
          <img
            src={`https://cdn.ostello.co.in/${image}`}
            className=" mb-3"
            style={{
              height: "150px",
              width: "150px",
              borderRadius: "50%",
            }}
            alt=""
          /> */}
          <p className="font-semibold text-base">
            {" "}
            Applicant Name :{" "}
            <span className="text-base font-normal">{name}</span>
          </p>
          <p className="font-semibold text-base">
            {" "}
            Applicant Email :{" "}
            <span className="text-base font-normal">{email}</span>
          </p>
          <p className="font-semibold text-base">
            {" "}
            Date Of Birth :{" "}
            <span className="text-base font-normal">{birthDate}</span>
          </p>
          <p className="font-semibold text-base">
            {" "}
            Phone Number :{" "}
            <span className="text-base font-normal">{number}</span>
          </p>
          <p className="font-semibold text-base">
            {" "}
            Father Name :{" "}
            <span className="text-base font-normal">{fatherName}</span>
          </p>

          <p className="font-semibold text-base">
            {" "}
            Father Phone Number :{" "}
            <span className="text-base font-normal">{fatherNumber}</span>
          </p>
          <p className="font-semibold text-base">
            {" "}
            Mother Name :{" "}
            <span className="text-base font-normal">{motherName}</span>
          </p>
          <p className="font-semibold text-base">
            {" "}
            Mother Phone Number :{" "}
            <span className="text-base font-normal">{motherNumber}</span>
          </p>
          <p className="font-semibold text-base">
            {" "}
            School Name :{" "}
            <span className="text-base font-normal">{school}</span>
          </p>
          <p className="font-semibold text-base">
            {" "}
            Class : <span className="text-base font-normal">{classes}</span>
          </p>
          <p className="font-semibold text-base">
            {" "}
            Physically Challenged :{" "}
            <span className="text-base font-normal">{physically}</span>
          </p>
          <p className="font-semibold text-base">
            {" "}
            Preparation For :{" "}
            <span className="text-base font-normal">{exam}</span>
          </p>
          {/* <p className="font-semibold text-base">
            {" "}
            Adhar Card Number :{" "}
            <span className="text-base font-normal">{adharCard}</span>
          </p> */}
          <p className="font-semibold text-base">
            {" "}
            Gender : <span className="text-base font-normal">{gender}</span>
          </p>
          <p className="font-semibold text-base">
            {" "}
            Subjects :{" "}
            <span className="text-base font-normal">{subject.toString()}</span>
          </p>
          <p className="font-semibold text-base">
            {" "}
            Address : <span className="text-base font-normal">{line}</span>
          </p>
          <p className="font-semibold text-base">
            {" "}
            Pincode : <span className="text-base font-normal">{pincode}</span>
          </p>
          <p className="font-semibold text-base">
            {" "}
            State : <span className="text-base font-normal">{state}</span>
          </p>
          <p className="font-semibold text-base">
            {" "}
            City : <span className="text-base font-normal">{city}</span>
          </p>
          <p className="font-semibold text-base">
            {" "}
            Area : <span className="text-base font-normal">{area}</span>
          </p>
          {code ? (
            <p className="font-semibold text-base">
              {" "}
              Referral Code :{" "}
              <span className="text-base font-normal">{code}</span>
            </p>
          ) : (
            ""
          )}
          <div className="flex">
            <div className="bg-primary mr-2  w-[100px] my-3 py-2 rounded-lg ">
              <button
                // disabled={disable && "disable"}
                className="m-auto w-full bg-primary text-lg font-bold z-50 text-white"
                onClick={() => handleAdding()}
              >
                Confirm
              </button>
            </div>
            <div className="border-2 border-primary w-[100px] my-3 py-2 rounded-lg ">
              <button
                // disabled={disable && "disable"}
                className="m-auto w-full  text-lg font-bold z-50 text-primary"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EntranceExamConfirmation;
