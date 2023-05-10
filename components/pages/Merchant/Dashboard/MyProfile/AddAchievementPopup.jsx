import axios from "axios";
import { useRef, useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";
import toast from "react-hot-toast";
import { isEmpty } from "../../../../utils";
import Modal from "../../../../UI/Modal/Modal";
import { host } from "../../../../../utils/constant";

const AddAchievementPopup = ({
  title,
  name3 = "facultyOverview",
  afterClose = () => {},
  isEdit = false,
}) => {
  const [description, setDescription] = useState("");
  const [aTitle, setATitle] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleSubmit = () => {
    if (isEmpty(aTitle) || isEmpty(description) || isEmpty(images)) {
      return alert("Fill the form.");
    }
    const myForm = new FormData();

    myForm.append(
      "instituteid",
      typeof window !== "undefined" &&
        window.localStorage.getItem("INSTITUTE_ID")
    );
    myForm.append("title", aTitle);
    myForm.append("image", images[0]);
    myForm.append("description", description);

    axios
      .post(`${host}/achievements/`, myForm, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${
            typeof window !== "undefined" &&
            window.localStorage.getItem("ACCESS_TOKEN")
          }`,
        },
      })
      .then((res) => {
        toast.info("Achievement sent successfully, wait for admin approval.");
        afterClose();
      })
      .catch((err) => console.error(err));
  };
  const imageHandleChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setImages(filesArray);
  };

  return (
    <Modal open={true}>
      <form action="" className="" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
        <div className=" w-full lg:w-96  px-6  shadow-md rounded-xl z-10 text-base font-normal text-slate bg-white  border-2 border-solid border-light-gray ">
          <div className="flex items-center justify-center">
            <h1 className="text-primary font-bold text-xl py-3 lg:py-5 ">
              {title}
            </h1>
            <GrFormClose
              className=" w-7 h-7 shadow-lavender p-1 text-lg rounded-full ml-auto "
              style={{
                boxShadow: "0px 4px 34px rgba(136, 136, 136, 0.4)",
                backgroundColor: "white",
              }}
              onClick={(e) => {
                afterClose();
              }}
            />{" "}
          </div>
          <div className="space-y-3 lg:space-y-4">
            <p className="text-[#FF0000]/70">
              Please upload a image smaller than 5 MB
            </p>
            <div className="border min-h-28 w-full lg:my-3 relative rounded-lg flex">
              {isEmpty(images) ? (
                <div className="h-28">
                  <MdAddPhotoAlternate
                    className="text-3xl   mb-auto"
                    style={{
                      position: "absolute",
                      transform: "translate(-50%,-50%)",
                      top: "50%",
                      left: "50%",
                    }}
                    onClick={() => imageInputRef.current.click()}
                  />
                </div>
              ) : (
                <div className="flex items-center  justify-between min w-full">
                  {!isEmpty(images) && (
                    <div className="p-2">
                      <div className="flex items-center justify-center flex-wrap space-x-2 ">
                        {images?.map((item, index) => (
                          <div key={index} className="flex relative ">
                            <img
                              className="w-36 "
                              src={URL.createObjectURL(item)}
                              alt=""
                            />
                            <p
                              onClick={() => {
                                setImages((prev) =>
                                  [...prev].filter(
                                    (prevItem) => prevItem !== item
                                  )
                                );
                              }}
                              className="absolute right-2 top-2 bg-[rgba(0,0,0,0.4)]
                          cursor-pointer text-[#FF0000] active:opacity-80 ring-1 ring-red rounded-full h-4 w-4 flex items-center justify-center font-bold"
                            >
                              x
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* {!isEmpty(videos) && (
                    <div className='p-2'>
                      <p>Videos:</p>
                      <div className='flex items-center '>
                        {videos?.map((item) => (
                          <video
                            controlsList='nodownload'
                            className='w-36 '
                            src={URL.createObjectURL(item)}
                            alt=''
                          />
                        ))}
                      </div>
                     
                    </div>
                  )} */}
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                name="filename"
                onChange={imageHandleChange}
                hidden
                ref={imageInputRef}
              />
            </div>

            <div className={` border w-12/12 rounded-lg py-2 mr-auto`}>
              <input
                className="w-full focus:outline-none px-5  text-lg"
                name="title"
                placeholder={"Title"}
                onChange={(e) => {
                  setATitle(e.target.value);
                }}
              />
            </div>
            <div className={` border w-12/12 rounded-lg py-2 mr-auto`}>
              <textarea
                className="w-full focus:outline-none px-5 h-44 text-lg"
                rows="4"
                cols="50"
                name="name3"
                placeholder={name3}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </div>

          <button
            className="bg-primary text-white  w-full py-2 rounded-lg my-2 mr-auto"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddAchievementPopup;
