import React, { useEffect, useState } from "react";
import { RiHeart3Fill } from "react-icons/ri";
import axios from "axios";
import { useRouter } from "next/router";
import { host } from "../../../../utils/constant";
import CourseCard from "../AdminCard/CourseCard";
import Header from "../Header/Header";

const StudentOngoing = () => {
  const router = useRouter();
  const { studentId } = router.query;
  const [users, setUsers] = useState({});
  const [ongoing, setOngoing] = useState([]);

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
        const { data } = await axios.get(`${host}/users/student?id=${studentId}`, config);

        setUsers(data.message);
        if (users) {
          setOngoing(users?.ongoingcourses);
        }
      } catch (err) {
       
      }
    };
    run();
  }, []);

 
  return (
    <div>
      <Header pageTitle={"Students"} />
      <div className="px-[30px] pt-4 pb-16">
        <h2 className="text-lg mb-3 px-2 md:hidden block font-bold">Ongoing</h2>
        {ongoing?.length > 0 ? (
          <div className="grid gap-10 md:grid-cols-2 grid-cols-1 lg:grid-cols-3">
            {ongoing?.map((data, index) => (
              <div key={index} className="relative">
                <CourseCard data={data} />
                <div className="absolute top-8 right-8 bg-white p-2.5 shadow-lg cursor-pointer rounded-full">
                  <RiHeart3Fill className="scale-150 text-[#FF0000]-500" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-2xl text-[#FF0000]/80">
            There are no ongoing courses
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentOngoing;
