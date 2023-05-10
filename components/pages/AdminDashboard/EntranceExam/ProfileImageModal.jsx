import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { GiCancel } from "react-icons/gi";
import toast from "react-hot-toast";
import { FileUploader } from "../../../../utils/utils";
import axios from "axios";
import { host } from "../../../../utils/constant";
import {
  authSelector,
  updatePercentage,
  uploadingEnded,
} from "../../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { LinearProgress, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

export default function ProfileImageModal({
  open,
  setOpen,
  name,
  setProfilePic,
  profilePic,
  setConfirmOpen,
}) {
  const dispatch = useDispatch();

  const handleClose = () => setOpen(false);

  const [disableHandle, setDisableHandle] = React.useState(profilePic);

  const image = profilePic[0]?.url
    ? `https://cdn.ostello.co.in/${profilePic[0]?.key}`
    : "";

  const uploadFiles1 = () => {
    const myFile = document.getElementById("myFile1");
    myFile.click();
  };

  const [uploadingImage, setUploadingImage] = React.useState("");

  const imageHandleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = e.target.files[0];
      setUploadingImage(selectedFiles);
      setDisableHandle(selectedFiles);
    }
  };

  const { percentage, isUploading } = useSelector(authSelector);

  const imageInputRef = React.useRef({});
  const [imageUploading, setImageUploading] = React.useState(false);

  const [nextButton, setNextButton] = React.useState(false);

  const uploadImage = async () => {
    const imageUploadStarted = toast.loading("Uploading please wait ...");

    try {
      let images = await FileUploader([uploadingImage], (percent) =>
        dispatch(updatePercentage(percent))
      );
      setProfilePic(images);
      setDisableHandle(images);

      toast.success("successfully uploaded.");
      setNextButton(true);
    } catch (err) {
      toast.error("something went wrong !");
    } finally {
      toast.remove(imageUploadStarted);
      // typeof window !== 'undefined' && window.location.reload()
      //   handleClose();
      setImageUploading(false);
      dispatch(uploadingEnded());
    }
  };

  const removePhotoHandle = async () => {
    const updateData = {
      id:
        typeof window !== "undefined" &&
        window.localStorage.getItem("OWNER_ID"),
      updates: {
        avatar: null,
      },
    };

    try {
      await axios.patch(`${host}/users/`, updateData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${
            typeof window !== "undefined" &&
            window.localStorage.getItem("ACCESS_TOKEN")
          }`,
        },
      });
      toast.success("successfully image removed.");
    } catch (err) {
      toast.error("something went wrong !");
    } finally {
      // toast.remove(imageUploadStarted)
      // typeof window !== 'undefined' && window.location.reload()
      setFinished(true);
      handleClose();
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="float-right ">
            <GiCancel
              onClick={() => {
                handleClose();
              }}
              className="text-right text-2xl text-primary cursor-pointer"
            ></GiCancel>
          </div>

          {/* text-[#009E60] */}
          <p className="text-xl text  text-primary mb-2">
            Just one more step! Upload your photograph
          </p>

          <div className="relative">
            <div>
              {uploadingImage || image ? (
                <img
                  src={
                    uploadingImage.name
                      ? URL.createObjectURL(uploadingImage)
                      : image
                  }
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
                    {name?.slice(0, 1).toUpperCase()}
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

              {uploadingImage.name || profilePic.length ? (
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
                        <LinearProgress
                          variant="determinate"
                          value={percentage}
                        />
                      </Box>
                      <Box sx={{ minWidth: 35 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >{`${Math.round(percentage)}%`}</Typography>
                      </Box>
                    </Box>
                  ) : !disableHandle[0]?.url ? (
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

                  {nextButton ? (
                    <p
                      className="border-primary border-2 text-primary mt-3 rounded p-2 text-xl text-center cursor-pointer"
                      onClick={() => {
                        setConfirmOpen(true);
                        handleClose();
                      }}
                    >
                      Next
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
