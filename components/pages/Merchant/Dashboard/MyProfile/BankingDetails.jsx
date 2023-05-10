import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  getInstituteDetails,
} from "../../../../../redux/slices/authSlice";
import { CustomInputField } from "./CustomInputField";
import { isEmpty } from "../../../../utils";
import { host } from "../../../../../utils/constant";
export default function BankingDetails({
  editBankDetails,
  setEditBankDetails,
  onSave = () => {},
  saveRef,
}) {
  const { instituteDetails } = useSelector(authSelector);
  const { bank } = instituteDetails;

  const [bankAccNo, setBankAccNo] = useState(bank?.bankAccNo);
  const [bankName, setBankName] = useState(bank?.bankName);
  const [ifscNo, setIFSCNo] = useState(bank?.ifscNo);
  const [accHolderName, setAccHolderName] = useState(bank?.accHolderName);
  const [gstNo, setGSTNo] = useState(bank?.gstNo);
  const [branch, setBranch] = useState(bank?.branch);
  const dispatch = useDispatch();

  const handleSave = () => {
    if (
      isEmpty(bankAccNo) ||
      isEmpty(bankName) ||
      isEmpty(ifscNo) ||
      isEmpty(accHolderName) ||
      isEmpty(branch)
    ) {
      return alert("Fill all the forms correctly");
    }

    const data = {
      id: instituteDetails?.id,
      updates: {
        bank: {
          bankAccNo: bankAccNo,
          bankName: bankName,
          ifscNo: ifscNo,
          accHolderName: accHolderName,
          gstNo: gstNo,
          branch: branch,
        },
      },
    };

    axios
      .patch(`${host}/institute/update`, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${
            typeof window !== "undefined" &&
            window.localStorage.getItem("ACCESS_TOKEN")
          }`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getInstituteDetails());
      })
      .catch((err) => {})
      .finally(() => {});
  };

  return (
    <>
      <div
        onClick={() => {}}
        className="flex flex-col   lg:flex-row lg:space-x-10"
      >
        <CustomInputField
          defaultValue={bankAccNo}
          onChange={(v) => {
            setBankAccNo(v);
          }}
          className=" lg:w-96 shrink  mb-4 lg:mb-0"
          disableState={[editBankDetails, setEditBankDetails]}
          name="Bank Account No"
          required
        />
        <CustomInputField
          defaultValue={bankName}
          onChange={(v) => setBankName(v)}
          className="lg:w-96 shrink"
          disableState={[editBankDetails, setEditBankDetails]}
          name="Name of the Bank"
          required
        />
      </div>
      <div className="flex flex-col   lg:flex-row lg:space-x-10">
        <CustomInputField
          defaultValue={ifscNo}
          onChange={(v) => setIFSCNo(v)}
          className=" lg:w-96 shrink  mb-4 lg:mb-0 "
          disableState={[editBankDetails, setEditBankDetails]}
          name="IFSC Code"
          required
        />
        <CustomInputField
          defaultValue={gstNo}
          onChange={(v) => setGSTNo(v)}
          className="lg:w-96 shrink"
          disableState={[editBankDetails, setEditBankDetails]}
          name="GST No."
        />
      </div>
      <div className="flex flex-col   lg:flex-row lg:space-x-10">
        <CustomInputField
          defaultValue={accHolderName}
          onChange={(v) => setAccHolderName(v)}
          className=" lg:w-96 shrink  mb-4 lg:mb-0 "
          disableState={[editBankDetails, setEditBankDetails]}
          name="Account Holder Name"
          required
        />
        <CustomInputField
          defaultValue={branch}
          onChange={(v) => setBranch(v)}
          className="lg:w-96 shrink"
          disableState={[editBankDetails, setEditBankDetails]}
          name="Branch"
          required
        />
        <p ref={saveRef} onClick={() => handleSave()}></p>
      </div>
    </>
  );
}
