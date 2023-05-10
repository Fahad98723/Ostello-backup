import * as axios from "axios";
import React, { useState } from "react";
import { host } from "../../../../../utils/constant";

const PasswordChange = ({
  id,
  email,
  setPasswordComponents,
  verifyPasswordChange,
  setPasswordChange,
  setVerifyPasswordChange,
}) => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errorText, setErrorText] = useState("");

  const handlePassChanging = (e) => {
    e.preventDefault();

    if (!verifyPasswordChange) {
      axios
        .post(
          `${host}/users/login/`,
          {
            email: email,
            password: oldPass,
          },
          {
            "Access-Control-Allow-Origin": "*",
          }
        )
        .then((res) => {
          

          if (newPass === confirmPass) {
            setPasswordComponents(false);
            setPasswordChange(false);
            setVerifyPasswordChange(false);
            setErrorText("");

            axios
              .patch(
                `${host}/users/forgot`,
                {
                  id,
                  password: newPass,
                },
                {
                  "Access-Control-Allow-Origin": "*",
                  Authorization: `Bearer ${typeof window !== 'undefined' && window.localStorage.getItem(
                    "ACCESS_TOKEN"
                  )}`,
                }
              )
              .then((res) => {
                
              })
              .catch((e) => {
                console.error(e);
              });
          } else {
            setErrorText(`Passwords do not match`);
          }
        })
        .catch((e) => {
          console.error(e);
          setErrorText(`Verification failed!`);
        });
    } else {
      
    }
  };

  return (
    <form onSubmit={handlePassChanging}>
      <div className="sm:w-5/12 w-10/12">
        <div className="pass bg-white pl-5 p-3 rounded-xl  flex justify-between items-center cursor-pointer border border-ghost">
          <div className="w-full">
            <p>Current Password </p>
            <input
              onBlur={(e) => setOldPass(e.target.value)}
              required
              type="password"
              id="base-input"
              className="bg-gray-50 border-none focus:outline-none border-gray-300 text-gray-900 w-full px-1 py-1 text-xl font-medium "
            />
          </div>
        </div>

        <div className="pass bg-white pl-5 p-3 rounded-xl mt-2  flex justify-between items-center cursor-pointer border border-ghost">
          <div className="w-full">
            <p>New Password </p>
            <input
              type="password"
              onBlur={(e) => setNewPass(e.target.value)}
              required
              id="base-input"
              className="bg-gray-50 border-none focus:outline-none border-gray-300 text-gray-900 w-full px-1 py-1 text-xl font-medium "
            />
          </div>
        </div>

        <div className="pass bg-white pl-5 p-3 rounded-xl mt-2  flex justify-between items-center cursor-pointer border border-ghost">
          <div className="w-full">
            <p>Re-enter New Password</p>
            <input
              type="password"
              onBlur={(e) => setConfirmPass(e.target.value)}
              required
              id="base-input"
              className="bg-gray-50 border-none focus:outline-none border-gray-300 text-gray-900 w-full px-1  py-1 text-xl font-medium "
            />
          </div>
        </div>

        <p className="mt-2 text-[#FF0000] ml-2">{errorText}</p>

        <div className="btn flex mt-5 justify-end">
          <button
            onClick={() => {
              setPasswordComponents(false);
              setPasswordChange(false);
              setVerifyPasswordChange(false);
            }}
            className="text-white bg-ghost  hover:bg-primary px-3  py-3 rounded-lg mr-2 "
          >
            Cancel
          </button>
          <input
            type="submit"
            value="Save Changes"
            className="text-white bg-primary px-3 py-3 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </form>
  );
};

export default PasswordChange;
