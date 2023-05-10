import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../../../../../../redux/slices/authSlice";
import { institutesSelector } from "../../../../../../../redux/slices/instituteSlice";
import { host } from "../../../../../../../utils/constant";

const AddFaculty = ({ afterSelect = () => {}, facultyState, id }) => {
  const dispatch = useDispatch();
  const { singleInstitute, currentInstitute } = useSelector(institutesSelector);
  const { instituteDetails } = useSelector(authSelector);

  const [faculties, setFaculties] = useState([]);

  

  useEffect(() => {
    const run = async () => {
      if (instituteDetails?.id) {
        try {
          const res = await axios.get(
            `${host}/institute/faculty?instituteId=${instituteDetails?.id}&limit=20`
          );
          setFaculties(res?.data?.message);
        } catch (err) {
          toast.error(err.message);
        }
      }
    };
    run();
  }, [instituteDetails?.id]);


  

  const [faculty, setFaculty] = facultyState;

  return (
    <>
      <div className="shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0">
        {faculties?.length === 0 ? (
          <h4>No Faculties Found</h4>
        ) : (
          faculties?.map((item) => {
            let matched = item.id === faculty?.id;
            let image = `https://cdn.ostello.co.in/${item.images?.[0]?.key}`;
            return (
              <div
                onClick={() => {
                  setFaculty(item);
                  afterSelect();
                }}
                key={item.id}
                className={`flex items-center my-2 hover:bg-gray/10 p-2 cursor-pointer ${
                  matched && "bg-gray/20"
                }`}
              >
                <img
                  src={image}
                  className="rounded-full w-8 h-8 lg:w-10 lg:h-10 ml-5 "
                  alt=""
                />

                <div className="flex flex-col ml-2 lg:ml-4 ">
                  <p>{item.name}</p>

                  <p
                    className="text-xs lg:text-sm"
                    style={{ color: "#A4A4A4" }}
                  >
                    {item.qualification}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default AddFaculty;
