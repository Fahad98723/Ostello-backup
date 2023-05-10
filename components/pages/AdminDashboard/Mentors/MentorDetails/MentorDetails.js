import React, { useEffect, useRef, useState, useCallback } from "react";
import { BiEditAlt } from "react-icons/bi";
import axios from "axios";
import { useRouter } from "next/router";
import MentorSidebar from "../MentorSidebar/MentorSidebar";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { MdContentCopy } from "react-icons/md";
import DropDown from "../../Institutes/AdminInstituteDetails/AdminInstituteOverview/DropDown";
import { host } from "../../../../../utils/constant";
import { isEmpty } from "../../../../../utils/utils";
import ImageViewer from 'react-simple-image-viewer';

const MentorDetailsOverview = () => {
  const [refetch, setRefetch] = useState(false);
  const router = useRouter();
  const [isDisable, setIsDisable] = useState(true);
  const [formData, setFormData] = useState({});
  const [edit, setEdit] = useState(false);
  const { mentorid } = router.query;
  const [mentor, setMentor] = useState({});
  const [field, setField] = useState("");
  const [interest, setInterest] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [totalExperience, setTotalExperience] = useState("");
  const [description, setDescription] = useState("");
  const [certificate, setCertificate] = useState([]);
  const [specialization, setSpecialization] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = [
    `https://cdn.ostello.co.in/${certificate?.key}`,
  ];
  useEffect(() => {
    const run = async () => {
      try {
        const config = {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${window.localStorage.getItem(
              "ACCESS_TOKEN"
            )}`,
          },
        };
        const { data } = await axios.get(`${host}/mentor?id=${mentorid}`, config);

        setMentor(data.mentor);
      } catch (err) {
  
      }
    };
    run();
  }, [mentorid, refetch]);

  useEffect(() => {
    if (!isEmpty(mentor)) {
      setName(mentor?.name);
      setNumber(mentor?.phonenumber);
      setEmail(mentor?.email);
      setField(mentor?.field)
      setSpecialization(mentor?.specialization || "");
      setInterest(mentor?.interests || "");
      setLinkedin(mentor?.linkedin || "");
      setTotalExperience(mentor?.total_experience);
      setDescription(mentor?.description);
      setCertificate(mentor?.certificate)
    }
  }, [mentor]);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  useEffect(() => {
    if (edit) {
      setIsDisable(false);
    }
    if (!edit) {
      setRefetch(false);
    }
  }, [edit]);
  const handleChange = (event, setFunction) => {
    setFunction(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      id: mentorid,
      updates: {
        name: name,
        email: email,
        phonenumber: number,
        field: field,
        interests: interest,
        total_experience: totalExperience,
        certificate: certificate,
        description: description,
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
   
      const { data } = await axios.patch(`${host}/mentor/`, updateData, config);
      
      toast.success("Successfully Updated");
      setIsDisable(true);
      setRefetch(true);
      setEdit(false);
    } catch (err) {
    
      toast.error(err.message);
      setIsDisable(true);
      setEdit(false);
    }
  };

  return (
    <div>
      <DropDown edit={edit} setEdit={setEdit} title={"Mentor Basic Details"}>
        {isViewerOpen && (
          <ImageViewer
            src={images}
            currentIndex={currentImage}
            disableScroll={false}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
          />
        )}
        <form onSubmit={handleSubmit}>
          <div className="mt-5">
            <div className="">
              <div className="md:flex justify-between">
                <div
                  className={` shrink md:w-3/4 w-full  px-6 py-2   rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2  ${!name && !isDisable && "border-red"
                    }`}
                >
                  <p className=" mb-1" style={{ fontSize: "15px" }}>
                    Mentor Name
                  </p>

                  <input
                    type="text"
                    placeholder={name}
                    autoFocus
                    className="text-xl bg-white  focus:outline-none w-full"
                    defaultValue={name || ""}
                    disabled={isDisable}
                    name="name"
                    onChange={(e) => handleChange(e, setName)}
                  />
                </div>

                <div
                  className={` shrink md:w-3/4 w-full  px-6 py-2   rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2   ${!number && !isDisable && "border-red"
                    }`}
                >
                  <p className=" mb-1" style={{ fontSize: "15px" }}>
                    Mentor Contact No.
                  </p>

                  <input
                    type="text"
                    placeholder={number}
                    autoFocus
                    className="text-xl bg-white  focus:outline-none w-full"
                    defaultValue={number || ""}
                    disabled={isDisable}
                    name="number"
                    onChange={(e) => handleChange(e, setNumber)}
                  />
                </div>
              </div>

              <div className="md:flex justify-between">
                <div
                  className={` shrink md:w-3/4 w-full  px-6 py-2   rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2  ${!email?.length && !isDisable && "border-red"
                    }`}
                >
                  <p className=" mb-1" style={{ fontSize: "15px" }}>
                    Mentor Email
                  </p>

                  <input
                    type="text"
                    placeholder={email}
                    autoFocus
                    className="text-xl bg-white  focus:outline-none w-full"
                    defaultValue={email || ""}
                    disabled={isDisable}
                    name="email"
                    onChange={(e) => handleChange(e, setEmail)}
                  />
                </div>

                <div
                  className={` shrink md:w-3/4 w-full  px-6 py-2   rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2   ${!specialization
                      ?.length && !isDisable && "border-red"
                    }`}
                >
                  <p className=" mb-1" style={{ fontSize: "15px" }}>
                    Specialization

                  </p>

                  <input
                    type="text"
                    placeholder={specialization}
                    autoFocus
                    className="text-xl bg-white  focus:outline-none w-full"
                    value={specialization || ""}
                    disabled={isDisable}
                    name="specialization"
                    onChange={(e) => handleChange(e, setSpecialization)}
                  />
                </div>
              </div>
            </div>

            <div className="md:flex justify-between">
              <div className=" shrink md:w-3/4 w-full  px-6 py-2   rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2">
                <p className=" mb-1" style={{ fontSize: "15px" }}>
                  Field
                </p>

                <div
                  className={`shrink  py-1 w-full   text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat first-letter:transition ease-in-out m-0 focus:outline-none mt-1 flex`}
                >
                  <input
                    type="text"
                    placeholder={field}
                    autoFocus
                    disabled={isDisable}
                    className="text-xl bg-white  focus:outline-none w-full"
                    value={field || ""}
                    name="field"
                    onChange={(e) => handleChange(e, setField)}
                  />
                </div>
              </div>

              <div className=" shrink md:w-3/4 w-full  px-6 py-2   rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2">
                <p className=" mb-1" style={{ fontSize: "15px" }}>
                  Total Experience{" "}
                </p>
                <input
                  type="text"
                  placeholder={totalExperience}
                  autoFocus
                  disabled={isDisable}
                  className="text-xl bg-white  focus:outline-none w-full"
                  value={totalExperience || ""}
                  name="total_experience"
                  onChange={(e) => handleChange(e, setTotalExperience)}
                />
              </div>
            </div>

            <div className="md:flex justify-between">
              <div className="shrink md:w-3/4 w-full  px-6 py-2   rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2">
                <p className=" mb-1" style={{ fontSize: "15px" }}>
                  Interest
                </p>
                <input
                  type="text"
                  autoFocus
                  className="text-xl bg-white   focus:outline-none w-full"
                  disabled={isDisable}
                  name="interest"
                  onChange={(e) => setInterest([e.target.value])}
                  value={interest?.map(item => item)}
                />
              </div>
              <div className=" shrink md:w-3/4 w-full  px-6 py-2   rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2">
                <p className=" mb-1" style={{ fontSize: "15px" }}>
                  Linkedin{" "}
                </p>
                <input
                  type="text"
                  autoFocus
                  disabled={isDisable}
                  className="text-xl bg-white   focus:outline-none w-full"
                  name="linkedin"
                  onChange={(e) => handleChange(e, setLinkedin)}
                  value={linkedin}
                />
              </div>
            </div>
          </div>
          <div className={` shrink md:w-3/4 w-full  px-6 py-2   rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2  ${!description?.length && !isDisable && "border-red"
            }`}>
            <p className=" mb-1" style={{ fontSize: "15px" }}>
              About Mentor
            </p>
            <textarea
              // onClick={() => setSearchShow(true)}
              className="text-xl bg-white   focus:outline-none w-full"
              rows={4}
              disabled={isDisable}
              onChange={(e) => handleChange(e, setDescription)}
              defaultValue={description || ""}
            ></textarea>
          </div>
          <div className={` shrink md:w-3/4 w-full  px-6 py-2   rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out  mt-1 mr-2  ${!description?.length && !isDisable && "border-red"
            }`}>
            <p className=" mb-1" style={{ fontSize: "15px" }}>
              Mentor Certificate
            </p>
            <img
              onClick={() => openImageViewer(0)}
              className='w-full h-[205px] shadow-sm rounded-3xl object-cover'
              src={`https://cdn.ostello.co.in/${certificate?.key}`}
              alt=''
            />
          </div>

          {edit ? (
            <div className="mb-12 flex flex-col md:flex-row px-3  gap-x-8 justify-end mt-6">
              <button
                className="bg-[#7D23E0] text-white mb-3 rounded-lg md:py-2 py-3 px-5"
                type="submit"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEdit(false);
                  setIsDisable(true);
                }}
                className="bg-[#E46060] text-white mb-3 rounded-lg md:py-2 py-3 px-5"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="md:hidden block">
              {!edit && (
                <div className="flex justify-center mb-3">
                  <button
                    onClick={() => setEdit(true)}
                    className="text-[14px] flex justify-center items-center px-5 py-1 rounded-full text-white bg-[#4C4C4C]"
                  >
                    <BiEditAlt className="scale-125 mr-2" /> Edit
                  </button>
                </div>
              )}
            </div>
          )}
        </form>
      </DropDown>
    </div>
  );
};

export default MentorDetailsOverview;
