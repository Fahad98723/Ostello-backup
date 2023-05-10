import { MdAddPhotoAlternate } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { isEmpty } from "../../../../utils";
import Modal from "../../../../UI/Modal/Modal";
import {
  ACCESS_TOKEN,
  host,
  INSTITUTE_ID,
} from "../../../../../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  getInstituteDetails,
  updatePercentage,
} from "../../../../../redux/slices/authSlice";
import { fetchAdminInstitutes } from "../../../../../redux/slices/adminInstitutesSlice";
import VideoManager from "./VideoManager";
import { FileUploader } from "../../../../../utils/utils";
import { Button, CircularProgress, LinearProgress } from "@mui/material";
const FacultyEditPopup = ({
  showPopUpState1,
  title,
  className = "",
  name1 = "Faculty Name",
  name2 = "Qualification",
  name3 = "Faculty Overview",
  activeFaculty,
  facultyData,
  setRefetch,
}) => {
  const [image, setImage] = useState(activeFaculty?.images?.[0]?.key);
  const [, setShowPopUp1] = showPopUpState1;
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [input1, setInput1] = useState(activeFaculty?.name);
  const [input2, setInput2] = useState(activeFaculty?.qualification);
  const [input3, setInput3] = useState(activeFaculty?.description);
  const [position, setPosition] = useState(activeFaculty?.position);
  const [studentCoached, setStudentCoached] = useState(
    activeFaculty?.students_coached
  );
  const [viewHours, setViewHours] = useState(activeFaculty?.view_hours);

  const [newName, setNewName] = useState(null);
  const [newQual, setNewQual] = useState(null);
  const [newDes, setNewDes] = useState(null);
  const [newPosition, setNewPosition] = useState(null);
  const [noVideo, setNoVideo] = useState(false);
  const dispatch = useDispatch();
  const [newImage, setNewImage] = useState(null);
  const [newStudentCoached, setNewStudentCoached] = useState();
  const [newViewHours, setNewViewHours] = useState();

  const imageHandleChange = (e) => {
    const fileArray = Array.from(e.target.files);
    setImage(fileArray[0]);
    setNewImage(fileArray[0]);
  };
  const imageInputRef = useRef({});

  useEffect(() => {
    if (facultyData) {
      facultyData?.forEach((element) => {
        if (element.position === "Founder") {
          if (newPosition === "Founder") {
            toast.error("You Already Selected A Founder");
            setPosition("Co-Founder");
          }
        }
      });
    }
  }, [facultyData, newPosition]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isEmpty(input1) && !isEmpty(input2) && !isEmpty(input3)) {
      // let sending = toast.loading('sending update data...')
      let images = [];
      let videos = [];
      try {
        if (video?.name?.length > 0) {
          let videosUp = await FileUploader([video], (percent) =>
            dispatch(updatePercentage(percent))
          );
          let thumbnailsUp = await FileUploader([thumbnail], (percent) =>
            dispatch(updatePercentage(percent))
          );
          videos = videosUp.map((item, index) => {
            return {
              thumbnail: thumbnailsUp[index],
              video: item,
            };
          });
        }
        if (newImage?.name?.length > 0) {
          images = await FileUploader([newImage], (percent) =>
            dispatch(updatePercentage(percent))
          );
        }

        const data = {};
        if (!isEmpty(newName)) {
          data.name = newName;
        }
        if (!isEmpty(newQual)) {
          data.qualification = newQual;
        }
        if (!isEmpty(newDes)) {
          data.description = newDes;
        }
        if (!isEmpty(newPosition)) {
          data.position = newPosition;
        }
        if (!isEmpty(newStudentCoached)) {
          data.students_coached = newStudentCoached;
        }
        if (!isEmpty(newViewHours)) {
          data.view_hours = newViewHours;
        }
        if (!isEmpty(videos)) {
          data.videos = videos;
        }
        if (!isEmpty(images)) {
          data.images = images;
        }
        if (noVideo) {
          data.video = [];
        }

        
        

        let res = await axios.patch(
          `${host}/institute/faculty`,
          { id: activeFaculty.id, updates: data },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${window.localStorage.getItem(
                "ACCESS_TOKEN"
              )}`,
            },
          }
        );

        toast.success("Update done !");
      } catch (err) {
        
        toast.error("Got An error !");
      } finally {
        setShowPopUp1(false);
        dispatch(getInstituteDetails());
        dispatch(fetchAdminInstitutes());
        setRefetch(true);
        // toast.remove(sending)
        setLoading(false);
      }
    }
  };
  const [openImage, setOpenImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isUploading, percentage } = useSelector(authSelector);

  return (
    <Modal open={true}>
      <form action="" className="" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
        <div
          className="w-[300px] max-h-[600px] lg:w-96 px-6 overflow-y-scroll  shadow-md rounded-xl text-base font-normal text-slate bg-white  border-2 border-solid border-light-gray "
          style={{
            position: "absolute",
            transform: "translate(-50%,-50%)",
            marginRight: "-50%",
            top: "50%",
            left: "50%",
          }}
        >
          <div className="flex items-center justify-center">
            <div>
              {isUploading && (
                <LinearProgress
                  variant="determinate"
                  Progress
                  percent={percentage}
                />
              )}
            </div>
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
            <Modal open={openImage} onClose={() => setOpenImage(false)}>
              <img
                src={
                  typeof image === "string"
                    ? image
                    : image?.name?.length > 0 && URL.createObjectURL(image)
                }
                className="w-40"
                alt=""
              />
            </Modal>
            <div className="border h-28 w-full lg:my-3 relative rounded-lg flex items-center justify-around">
              <img
                src={
                  typeof image === "string"
                    ? `https://cdn.ostello.co.in/${image}`
                    : image?.name?.length > 0 && URL.createObjectURL(image)
                }
                onClick={() => setOpenImage(!openImage)}
                className="w-16 h-20  "
                alt=""
              />

              <span
                onClick={() => imageInputRef.current.click()}
                className="border border-black flex items-center flex-col p-2 text-xs"
              >
                Change Image
                <MdAddPhotoAlternate className=" w-5 h-5 " />
              </span>

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
            {/* <VideoManager
              isEditing={true}
              d_thumbnail={`https://cdn.ostello.co.in/${activeFaculty?.videos[0]?.thumbnail?.key}`}
              d_video={`https://cdn.ostello.co.in/${activeFaculty?.videos[0]?.video?.key}`}
              setNoVideo={setNoVideo}
              onChange={(data) => {
                setThumbnail(data.thumbnail)
                setVideo(data.video)
              }}
            /> */}

            <VideoManager
              isEditing={true}
              d_thumbnail={
                activeFaculty?.videos[0]?.thumbnail?.url &&
                `https://cdn.ostello.co.in/${activeFaculty?.videos[0]?.thumbnail?.key}`
              }
              d_video={
                activeFaculty?.videos[0]?.video?.url &&
                `https://cdn.ostello.co.in/${activeFaculty?.videos[0]?.video?.key}`
              }
              setNoVideo={setNoVideo}
              onChange={(data) => {
                setThumbnail(data.thumbnail);
                setVideo(data.video);
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
                value={input1}
                required
                onChange={(e) => {
                  setInput1(e.target.value);
                  setNewName(e.target.value);
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
                value={input2}
                onChange={(e) => {
                  setInput2(e.target.value);
                  setNewQual(e.target.value);
                }}
              />
            </div>
            <div className={` border w-12/12 rounded-lg py-2 mr-auto`}>
              <textarea
                className="w-full focus:outline-none px-5  text-lg"
                rows="3"
                cols="50"
                name="name3"
                value={input3}
                required
                placeholder={name3}
                onChange={(e) => {
                  setInput3(e.target.value);
                  setNewDes(e.target.value);
                }}
              />
            </div>
            <div className={` border w-12/12 rounded-lg py-2 mr-auto`}>
              <input
                className="w-full focus:outline-none px-5  text-lg"
                name="student coached"
                type="number"
                value={studentCoached}
                required
                placeholder={"Student Enrolled"}
                onChange={(e) => {
                  setStudentCoached(e.target.value);
                  setNewStudentCoached(e.target.value);
                }}
              />
            </div>
            <div className={` border w-12/12 rounded-lg py-2 mr-auto`}>
              <input
                className="w-full focus:outline-none px-5  text-lg"
                name="view hours"
                value={viewHours}
                type="number"
                required
                placeholder="View Hours"
                onChange={(e) => {
                  setViewHours(e.target.value);
                  setNewViewHours(e.target.value);
                }}
              />
            </div>
            <div className="shrink   w-full rounded-lg  text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
              <select
                onChange={(e) => {
                  setPosition(e.target.value);
                  setNewPosition(e.target.value);
                }}
                value={position}
                className={` form-select rounded-lg  marker:block w-full px-4 py-3 text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border border-solid    first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#D0D5DD] focus:outline-none`}
              >
                {!position ? (
                  <option hidden className="w-full" selected value="" disabled>
                    Choose Position
                  </option>
                ) : (
                  ""
                )}
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
            disabled={loading}
            className="bg-primary flex items-center justify-center text-white  w-full py-3 rounded-lg my-6 mr-auto"
            onClick={handleSave}
          >
            {loading && (
              <CircularProgress className="text-white mr-2" size={20} />
            )}
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default FacultyEditPopup;
