import { useEffect, useRef, useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";
import axios from "axios";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {getInstituteDetails, updatePercentage} from "../../../../../redux/slices/authSlice";
import { fetchAdminInstitutes } from "../../../../../redux/slices/adminInstitutesSlice";
import { isEmpty } from "../../../../utils";
import Modal from "../../../../UI/Modal/Modal";
import {
  ACCESS_TOKEN,
  host,
  INSTITUTE_ID,
} from "../../../../../utils/constant";
import VideoManager from "./VideoManager";
import { FileUploader } from "../../../../../utils/utils";
import { Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const FacultyPopup = ({
  showPopUpState1,
  title,
  className = "",
  name1 = "Faculty Name",
  name2 = "Qualification",
  name3 = "Faculty Overview",
  facultyData,
  valuesState,
  instituteId,
  setRefetch,
}) => {
  const [, setShowPopUp1] = showPopUpState1;
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [position, setPosition] = useState("Teacher");
  const [studentCoached, setStudentCoached] = useState(null);
  const [viewHours, setViewHours] = useState(null);

  const imageHandleChange = (e) => {
    const fileArray = Array.from(e.target.files);
    setImage(fileArray[0]);
  };

  const dispatch = useDispatch();

  const imageInputRef = useRef({});
  const [loading, setLoading] = useState(false);

  

  useEffect(() => {
    if (facultyData?.length) {
      facultyData?.forEach((element) => {
        if (element.position === "Founder") {
          if (position === "Founder") {
            toast.error("You Already Selected A Founder");
            setPosition("Co-Founder");
          }
        }
      });
    }
  }, [facultyData, position]);

  const handleSave = async () => {
    if (!isEmpty(input1) && !isEmpty(input2) && !isEmpty(input3)) {
      setLoading(true);
      let images = [];
      let videos = [];

      try {
        if (video?.name?.length > 0) {
          let videosUp = await FileUploader([video], (percent) => dispatch(updatePercentage(percent)));
          let thumbnailsUp = await FileUploader([thumbnail],(percent) => dispatch(updatePercentage(percent)));
          videos = videosUp.map((item, index) => {
            return {
              thumbnail: thumbnailsUp[index],
              video: item,
            };
          });
        }

        if (image?.name?.length > 0) {
          images = await FileUploader([image],(percent) => dispatch(updatePercentage(percent)));
        }

        let data = {
          name: input1,
          description: input3,
          instituteid:
            window.localStorage.getItem("INSTITUTE_ID") || instituteId,
          qualification: input2,
          position: position,
          students_coached: studentCoached,
          view_hours: viewHours,
          images,
          videos,
        };

        
        let res = await axios.post(`${host}/institute/faculty`, data, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${window.localStorage.getItem(
              "ACCESS_TOKEN"
            )}`,
          },
        });
        toast.success("Successfully added a faculty !");
        dispatch(getInstituteDetails());
        // dispatch(fetchAdminInstitutes());
        setRefetch(true);
        setShowPopUp1(false);
      } catch (err) {
        toast.error(`${err.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Modal open={true}>
        <form
          action=""
          className=""
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="w-[300px] max-h-[600px] overflow-y-scroll lg:w-96 px-6  shadow-md rounded-xl text-base font-normal text-slate bg-white  border-2 border-solid border-light-gray "
            style={{
              position: "absolute",
              transform: "translate(-50%,-50%)",
              marginRight: "-50%",
              top: "50%",
              left: "50%",
            }}
          >
            <div className="flex items-center justify-center">
              <h1 className="text-primary font-bold text-xl py-3 md:py-5  ">
                {title}
              </h1>
              <GrFormClose
                className=" w-7 h-7 shadow-lavender p-1 text-lg rounded-full ml-auto "
                style={{
                  boxShadow: "0px 4px 34px rgba(136, 136, 136, 0.4)",
                  backgroundColor: "white",
                }}
                onClick={(e) => {
                  setShowPopUp1(false);
                }}
              />{" "}
            </div>
            <div className="space-y-3 lg:space-y-4">
              <p className="text-[#FF0000]/70">
                Please upload a image smaller than 5 MB
              </p>
              <div className="border h-28 w-full lg:my-3 relative rounded-lg">
                {image ? (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      className="w-20 h-fit max-h-20 mx-auto "
                      alt=""
                    />
                    <CloseCircleOutlined
                      onClick={async () => {
                        setImage(null)
                      }}
                      className="absolute right-0 top-0"
                    />
                  </div>
                ) : (
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
                )}
                <input
                  type="file"
                  accept="image/*"
                  id="myFile"
                  name="filename"
                  className="hidden"
                  onChange={imageHandleChange}
                  required
                  ref={imageInputRef}
                  hidden
                />
              </div>

              <VideoManager
                isEditing={false}
                d_video={video}
                d_thumbnail={thumbnail}
                onChange={(data) => {
                  setVideo(data.video);
                  setThumbnail(data.thumbnail);
                }}
              />

              <div
                className={`${className} border w-12/12 rounded-lg py-2 mr-auto`}
              >
                <input
                  type="text"
                  className={` w-full focus:outline-none px-5 text-lg`}
                  name="name1"
                  placeholder={name1}
                  required
                  onChange={(e) => {
                    setInput1(e.target.value);
                  }}
                />
              </div>
              <div
                className={`${className} border w-12/12 rounded-lg py-2 mr-auto`}
              >
                <input
                  type="text"
                  className="w-full focus:outline-none px-5 text-lg"
                  name="name2"
                  placeholder={name2}
                  required
                  onChange={(e) => {
                    setInput2(e.target.value);
                  }}
                />
              </div>
              <div className={` border w-12/12 rounded-lg py-2 mr-auto`}>
                <textarea
                  className="w-full focus:outline-none px-5 h-36 text-lg"
                  rows="3"
                  cols="50"
                  name="name3"
                  required
                  placeholder={name3}
                  onChange={(e) => {
                    setInput3(e.target.value);
                  }}
                />
              </div>
              <div className={` border w-12/12 rounded-lg py-2 mr-auto`}>
                <input
                  className="w-full focus:outline-none px-5  text-lg"
                  name="student coached"
                  type="number"
                  required
                  placeholder="Enrolled Student"
                  onChange={(e) => {
                    setStudentCoached(e.target.value);
                  }}
                />
              </div>
              <div className={` border w-12/12 rounded-lg py-2 mr-auto`}>
                <input
                  className="w-full focus:outline-none px-5  text-lg"
                  name="view hours"
                  type="number"
                  required
                  placeholder="View Hours"
                  onChange={(e) => {
                    setViewHours(e.target.value);
                  }}
                />
              </div>
              <div className="shrink   w-full rounded-lg  text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                <select
                  onChange={(e) => setPosition(e.target.value)}
                  value={position}
                  className={` form-select rounded-lg  marker:block w-full px-4 py-3 text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border border-solid    first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#D0D5DD] focus:outline-none`}
                >
                  {/* <option className="w-full" selected value="Class 11th">
                    Class 11th
                  </option> */}
                  <option className="w-full" value="Founder">
                    Founder
                  </option>
                  <option className="w-full" value="Co-Founder">
                    Co-Founder
                  </option>
                  <option className="w-full" value="Teacher">
                    Teacher
                  </option>
                </select>
              </div>
            </div>

            <Button
              loading={loading}
              disabled={loading}
              className="bg-primary text-white flex items-center justify-center  w-full py-3 rounded-lg my-6 mr-auto"
              onClick={(e) => {
                e.preventDefault();

                handleSave();
              }}
            >
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default FacultyPopup;
