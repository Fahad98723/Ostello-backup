import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { GiCancel } from "react-icons/gi";
import toast from "react-hot-toast";
import { FileUploader } from "../../../utils/utils";
import axios from "axios";
import { host } from "../../../utils/constant";
import {getUser, updatePercentage} from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

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
  handleOpen,
  name,
  image,
  selectImage,
  setSelectedImage,
  setFinished,
}) {
  const dispatch = useDispatch();

  const handleClose = () => setOpen(false);

  const uploadFiles1 = () => {
    const myFile = document.getElementById("myFile1");
    myFile.click();
  };

  const [uploadingImage, setUploadingImage] = React.useState("");

  const imageHandleChange = (e) => {
    // setImages([])
    
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(false);
      const selectedFiles = e.target.files[0];
      setUploadingImage(selectedFiles);
    }
    // if (e.target.files) {
    // FilterImagesAndVideos({
    //   filesArray: e.target.files,
    //   setImages,
    //   setVideos,
    // })
    //   let filesArray = e.target.files
    //   Object.values(filesArray).forEach((item) => {

    //     if (item.type.toLowerCase().includes('image')) {
    //       
    //       setImages((prev) => (!isEmptyField(prev) ? [...prev, item] : [item]))
    //     }
    //   })
    //   const fileArray = Array.from(e.target.files).map((file) =>
    //     URL.createObjectURL(file)
    //   )
    //   setSelectedImages((prevImages) => prevImages.concat(fileArray))
    //   setImageCounter((prev) => prev + fileArray.length)
    //   Array.from(e.target.files).map((file) => URL.revokeObjectURL(file))
    // }
  };

  const imageInputRef = React.useRef({});

  const uploadImage = async () => {
    const imageUploadStarted = toast.loading("Uploading please wait ...");
    let images = await FileUploader([uploadingImage],(percent) => dispatch(updatePercentage(percent)));
    
    const updateData = {
      id:
        typeof window !== "undefined" &&
        window.localStorage.getItem("OWNER_ID"),
      updates: {
        avatar: images[0],
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
      toast.success("successfully uploaded.");
    } catch (err) {
      
      toast.error("something went wrong !");
    } finally {
      toast.remove(imageUploadStarted);
      typeof window !== 'undefined' && window.location.reload()
      setFinished(true);
      dispatch(getUser());
      handleClose();
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
        {selectImage ? (
          <Box sx={style}>
            <div className="float-right ">
              <GiCancel
                onClick={() => {
                  handleClose();
                }}
                className="text-right text-2xl text-primary cursor-pointer"
              ></GiCancel>
            </div>
            {image ? (
              <img
                src={`https://cdn.ostello.co.in/${image}`}
                className="mx-auto "
                style={{ height: "120px", width: "120px", borderRadius: "50%" }}
                alt=""
              />
            ) : (
              <div className="bg-primary h-[120px] w-[120px] mx-auto text-5xl rounded-full flex items-center justify-center p-1 text-white cursor-pointer ">
                {name?.slice(0, 1).toUpperCase()}
              </div>
            )}

            <div className="mt-3">
              <p
                className="bg-ghost/20 rounded p-2 text-xl text-center cursor-pointer"
                onClick={() => uploadFiles1()}
              >
                Choose from Gallery
              </p>
              <input
                type="file"
                ref={imageInputRef}
                accept="image/*"
                id="myFile1"
                name="filename"
                className="hidden"
                onChange={imageHandleChange}
              />
              <p className="bg-ghost/20 rounded p-2 text-xl text-center cursor-pointer my-2">
                Open Camera
              </p>
              <p
                onClick={removePhotoHandle}
                className="bg-ghost/20 rounded p-2 text-xl text-center text-[#FF0000]/90 cursor-pointer"
              >
                Remove Photo
              </p>
            </div>
          </Box>
        ) : (
          <Box sx={style}>
            <div className="float-right ">
              <GiCancel
                onClick={() => {
                  handleClose();
                }}
                className="text-right text-2xl text-primary cursor-pointer"
              ></GiCancel>
            </div>

            {uploadingImage && (
              <img
                src={URL.createObjectURL(uploadingImage)}
                className="mx-auto "
                style={{ height: "120px", width: "120px", borderRadius: "50%" }}
                alt=""
              />
            )}

            <div className="mt-3">
              <p
                className="bg-ghost/20 rounded p-2 text-xl text-center cursor-pointer"
                onClick={() => uploadImage()}
              >
                Confirm
              </p>
              {/* <input
                        type='file'
                        multiple
                        id='myFile1'
                        name='filename'
                        className='hidden'
                        onChange={imageHandleChange}
                      /> */}
              <p
                onClick={() => handleClose()}
                className="bg-ghost/20 rounded p-2 text-xl mt-2 text-center text-[#FF0000]/90 cursor-pointer"
              >
                Cancel
              </p>
            </div>
          </Box>
        )}
      </Modal>
    </div>
  );
}
