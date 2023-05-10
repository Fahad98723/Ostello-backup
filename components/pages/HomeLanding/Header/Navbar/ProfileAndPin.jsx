import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import { Box, useTheme } from "@mui/system";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { LinearProgress, Typography } from "@mui/material";
import {
  authSelector,
  getUser,
  updatePercentage,
  uploadingEnded,
} from "../../../../../redux/slices/authSlice";
import { isEmpty, FileUploader } from "../../../../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { ACCESS_TOKEN, host } from "../../../../../utils/constant";

const ProfileAndPin = ({ profileOpen, setProfileOpen, handleClose }) => {
  const theme = useTheme();
  const useStyle = makeStyles({
    modalBox: {
      width: "30%",
      [theme.breakpoints.down("sm")]: {
        width: "80%",
        height: "60%",
        overflowY: "scroll!important",
      },
    },
  });
  const { modalBox } = useStyle();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if(open){
  //     handleClose()
  //   }
  // },[open])

  const { userData, percentage, isUploading } = useSelector(authSelector);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const uploadFiles1 = () => {
    const myFile = document.getElementById("myFile1");
    myFile.click();
  };

  const [uploadingImage, setUploadingImage] = useState("");

  const imageHandleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = e.target.files[0];
      setUploadingImage(selectedFiles);
    }
  };

  const imageInputRef = useRef({});
  const [imageUploading, setImageUploading] = useState(false);

  const [city, setCity] = useState();
  const [area, setArea] = useState("");
  const [areaOptions, setAreaOptions] = useState([]);
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const [studyingAt, setStudyingAt] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [disableTest, setDisableTest] = useState(true);

  const infoGenRef = useRef(null);

  useEffect(() => {
    if (!isEmpty(userData)) {
      setUserName(userData?.name);
      setPhoneNumber(userData?.phonenumber);
      setUserEmail(userData?.email);
      setStudyingAt(userData?.schoolname);
      if (userData?.location?.pincode?.length) {
        setState(userData?.location?.state);
        setArea(userData?.location?.area);
        setCity(userData?.location?.city);
        setPincode(userData?.location?.pincode);
      }
    }
  }, [userData]);

  const handleChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const handleGenerateFromPincode = (pinCode) => {
    if (pinCode?.length !== 6) {
      setPincodeError("Enter a valid pincode");
      setAreaOptions([]);
      setArea("");
      setCity("");
      setState("");
      setCountry("");
      return;
    }
    setIsLoading(true);

    axios
      .get(`https://api.postalpincode.in/pincode/${pinCode}`)
      .then((res) => {
        setAreaOptions([]);
        res.data.map((item) =>
          item.PostOffice.forEach((po) => {
            setAreaOptions((prev) => {
              if (prev.indexOf(po.Name) === -1) {
                return [...prev, po.Name];
              }
              return prev;
            });
          })
        );

        setCity(res.data[0].PostOffice[0].District);
        setState(res.data[0].PostOffice[0].State);
        setCountry(res.data[0].PostOffice[0].Country);
        setIsLoading(false);
        setPincodeError("");
      })
      .catch((err) => {});
  };

  const uploadImage = async () => {
    setDisableTest(true);
    try {
      if (!userData?.location?.pincode?.length || !userData?.schoolname) {
        const updateData = {
          id: userData.id,
          updates: {
            name: userName,
            phonenumber: phoneNumber,
            email: userEmail,
            location: {
              state: state,
              city: city,
              area: area,
              pincode: pincode,
            },
            schoolname: studyingAt,
          },
        };

        try {
          const config = {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${window.localStorage.getItem(
                "ACCESS_TOKEN"
              )}`,
            },
          };
          const { data } = await axios.patch(
            `${host}/users/`,
            updateData,
            config
          );

          dispatch(getUser());

          !uploadingImage.name && toast.success("Successfully Updated");
        } catch (err) {
          toast.error("Something wrong please try again");
        } finally {
        }
      }
      if (!userData?.avatar) {
        const imageUploadStarted = toast.loading("Uploading please wait ...");
        try {
          let images = await FileUploader([uploadingImage], (percent) =>
            dispatch(updatePercentage(percent))
          );

          const updateData = {
            id:
              typeof window !== "undefined" &&
              window.localStorage.getItem("OWNER_ID"),
            updates: {
              avatar: images[0],
            },
          };

          await axios.patch(`${host}/users/`, updateData, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${
                typeof window !== "undefined" &&
                window.localStorage.getItem("ACCESS_TOKEN")
              }`,
            },
          });
          toast.success("successfully uploaded.");
        } catch (err) {
          toast.error("something went wrong !");
        } finally {
          toast.remove(imageUploadStarted);

          setImageUploading(false);
          dispatch(uploadingEnded());
        }
      }
    } catch (err) {
    } finally {
      handleClose();
      dispatch(getUser());
      window.location.reload();
      setDisableTest(false);
    }
  };

  return (
    <div className=" bg-white rounded-[10px] md:w-[370px] w-[280px] max-h-[450px] overflow-y-scroll">
      <div className="flex text-white rounded-t-[10px] bg-primary px-5 py-2 justify-between items-center">
        <div className="text-center flex flex-col w-full">
          <div className="flex justify-between items-center mt-3">
            {/* <LeftOutlined
              onClick={() => dispatch(setAuthModalState(2))}
              className="pl-3 text-[14px] font-bold"
            /> */}
            <p className="text-[18px] font-bold"></p>
            <p
              className="cursor-pointer text-[20px] border font-bold h-8 w-8 rounded-full"
              onClick={handleClose}
            >
              x
            </p>
          </div>
        </div>
      </div>

      <div className="p-3">
        {!userData?.avatar ? (
          <div className="relative">
            {uploadingImage ? (
              <img
                src={URL.createObjectURL(uploadingImage)}
                className="mx-auto "
                style={{
                  height: "150px",
                  width: "150px",
                  borderRadius: "50%",
                }}
                alt=""
              />
            ) : (
              <>
                <div className="bg-primary h-[150px] w-[150px] mx-auto text-8xl rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                  {userData?.name?.slice(0, 1).toUpperCase()}
                </div>
              </>
            )}
            <FaRegEdit
              className="text-4xl shadow-lg text-[#7D23E0] bg-white rounded-full p-2 mb-auto"
              style={{
                position: "absolute",
                transform: "translate(-50%,-50%)",
                top: "20%",
                left: "70%",
              }}
              onClick={uploadFiles1}
            />

            <input
              type="file"
              ref={imageInputRef}
              id="myFile1"
              name="filename"
              className="hidden"
              onChange={imageHandleChange}
            />
          </div>
        ) : (
          ""
        )}

        {!userData?.schoolname ? (
          <div
            className={` shrink w-full px-6 py-2 mt-2  shadow-md  text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 md:text-xl border-solid border-light-gray first-letter:transition ease-in-out m-0  ${
              !studyingAt?.length && !isDisable && "border-red"
            }`}
          >
            <input
              type="text"
              placeholder="School /College Name"
              autoFocus
              className=" bg-white  focus:outline-none w-full"
              value={studyingAt || ""}
              disabled={isDisable}
              onChange={(e) => {
                setStudyingAt(e.target.value);
              }}
            />
          </div>
        ) : (
          ""
        )}

        {!userData?.location?.pincode ? (
          <>
            <div
              className={`shrink px-6 py-2 w-full  shadow-md  font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 focus:outline-none md:text-xl mt-2 flex`}
            >
              <input
                type="text"
                autoFocus
                className=" bg-white  focus:outline-none w-full"
                name="pincode"
                placeholder="Pincode"
                onChange={(e) => handleChange(e, setPincode)}
                value={pincode}
                disabled={isDisable}
              />
              <button
                ref={infoGenRef}
                disabled={isDisable}
                onClick={(e) => {
                  e.preventDefault();
                  handleGenerateFromPincode(pincode);
                }}
                className="text-xs p-1 bg-primary text-white m-1 rounded-md"
              >
                Generate
              </button>
            </div>
            <div className="flex justify-between">
              <div className="shrink px-2 py-2 w-3/4 shadow-md  text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 focus:outline-none md:text-xl mt-2 mr-2">
                <input
                  type="text"
                  autoFocus
                  className=" bg-white px-3 focus:outline-none w-full"
                  disabled={isDisable ? true : false}
                  name="state"
                  placeholder="State"
                  onChange={(e) => handleChange(e, setState)}
                  value={state}
                />
              </div>
              <div className="shrink px-2 py-2 w-3/4 shadow-md  text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 focus:outline-none md:text-xl mt-2 ">
                <input
                  type="text"
                  autoFocus
                  className="  bg-white px-3   focus:outline-none w-full"
                  disabled={isDisable ? true : false}
                  name="city"
                  placeholder="City"
                  onChange={(e) => handleChange(e, setCity)}
                  value={city}
                />
              </div>
            </div>

            <div className="shrink px-2 w-3/4 shadow-md  text-base font-normal text-slate bg-white first-letter:transition ease-in-out m-0 focus:outline-none md:text-xl mt-1 mr-2">
              <div className={`w-full flex-col space-y-0`}>
                <input
                  list="area-option-list"
                  id="area-choice"
                  name="area-choice"
                  type="text"
                  autoFocus
                  className="text-xl bg-white px-3 py-2  focus:outline-none w-full cursor-pointer"
                  placeholder="Area"
                  onChange={(e) => setArea(e.target.value)}
                  value={area}
                />

                <datalist id="area-option-list">
                  {areaOptions.map((category, idx) => {
                    return (
                      <option
                        key={idx}
                        value={category}
                        className="w-full text-[14px] font-normal text-black rounded-[10px] cursor-pointer"
                      />
                    );
                  })}
                </datalist>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        <div className="mt-3">
          {isUploading && imageUploading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "50%", mr: 1 }}>
                <LinearProgress variant="determinate" value={percentage} />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >{`${Math.round(percentage)}%`}</Typography>
              </Box>
            </Box>
          ) : disableTest ? (
            <p
              className="border-primary border-2 text-primary rounded p-2 text-xl text-center cursor-pointer"
              onClick={() => {
                uploadImage();
                setImageUploading(true);
              }}
            >
              Confirm
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileAndPin;
