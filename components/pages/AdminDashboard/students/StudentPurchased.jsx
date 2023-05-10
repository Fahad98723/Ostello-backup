import React, { useEffect, useState } from "react";

import { BsFillCircleFill, BsArrowRightCircle } from "react-icons/bs";
import axios from "axios";
import Header from "../Header/Header";
import { host } from "../../../../utils/constant";
import { useRouter } from "next/router";
import { HybridIcon } from "../../../SVGIcons";
import PurchasedDetailsModal from "../AdminModal/PurchasedDetailsModal/PurchasedDetailsModal";

const StudentPurchased = () => {
  const [showModal, setShowModal] = useState(false);
  const [course, setCourse] = useState({});
  const router = useRouter();
  const { studentId } = router.query;

  const [users, setUsers] = useState({});
  const [purchaseCourse, setPurchaseCourse] = useState([]);

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
        const { data } = await axios.get(
          `${host}/users/student?id=${studentId}`,
          config
        );

        setUsers(data.message);
        if (users) {
          setPurchaseCourse(users?.purchasedcourses);
        }
      } catch (err) {}
    };
    run();
  }, []);


  return (
    <div>
      <Header pageTitle={"Students"} />
      <div className="px-[30px] pt-4 pb-16">
        <h2 className="text-lg mb-3 px-2 md:hidden block font-bold">
          Purchased
        </h2>
        {purchaseCourse?.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 grid-cols-1 lg:grid-cols-3">
            {purchaseCourse?.map((course, index) => (
              <div
                key={index}
                className="p-4 shadow-sm text-[#414141] rounded-xl border-[#BDBDBD] border"
              >
                <div className="flex justify-between md:justify-start space-x-2 md:space-x-4">
                  <div>
                    <img
                      className="h-[90px] w-[90px] rounded-lg"
                      src={course.img}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col">
                      <div className="text-[#767676] md:text-xl text-lg">
                        {course.name}
                      </div>
                      <div className="text-lg font-bold">{course.title}</div>
                    </div>
                    <div className="flex items-center">
                      {course.status === "hybrid" ? (
                        <HybridIcon />
                      ) : (
                        <BsFillCircleFill
                          className={`text-[6px] ${
                            course.status === "online"
                              ? "text-[#3AC817]"
                              : "text-[#FF0000]-600"
                          }`}
                        />
                      )}
                      <span className="ml-2 capitalize text-[#414141]">
                        {course.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex mt-5 flex-col ">
                  <div className="flex md:flex-col flex-row justify-between">
                    <div>
                      <div className="uppercase text-[#767676] font-medium">
                        Total Price
                      </div>
                      <div className="font-medium text-lg">₹2000.89</div>
                    </div>
                    <div>
                      <div className="uppercase md:mt-2 mt-0 text-[#767676] font-medium">
                        Purchase Date
                      </div>
                      <div className="font-medium text-lg">May 21, 2022</div>
                    </div>
                  </div>
                  <div className="flex justify-start mt-3 md:mt-0 md:justify-between">
                    <div>{""}</div>
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setCourse(course);
                      }}
                      className="flex text-[#7D23E0] font-bold md:font-normal text-lg items-center"
                    >
                      View Details{" "}
                      <BsArrowRightCircle className="ml-2 scale-125" />{" "}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-2xl text-[#FF0000]/80">
            You didn't purchase anything yet
          </p>
        )}
      </div>
      {showModal && (
        <PurchasedDetailsModal
          course={course}
          setCourse={setCourse}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default StudentPurchased;
