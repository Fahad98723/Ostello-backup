import React, { useState, useEffect } from "react";
import AllNotification from "./AllNotification";
import CommentsNotification from "./CommentsNotification";
import OstelloNotification from "./OstelloNotification";
import SalesNotification from "./SalesNotification";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp
} from "react-icons/md";

const api = [
  // {
  //   id: 1,
  //   src: userImg,
  //   name: "Fahad ",
  //   time: "2",
  //   content: "Shagar This is wonderful.",
  //   type:'comment',
  // },
  // {
  //   id: 2,
  //   src: userImg,
  //   name: "Preetham Nayak",
  //   time: "2",
  //   content: "Albi just enrolled in your UX Design Program.",
  //   type:'ostello',
  // },
  // {
  //   id: 3,
  //   src: userImg,
  //   name: "Rahim ",
  //   time: "2",
  //   content:
  //     "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  //   type:'comment'
  // },
  // {
  //   id: 4,
  //   src: userImg,
  //   name: "Preetham Nayak",
  //   time: "2",
  //   content: "Preetham just enrolled in your UX Design Program.",
  //   type:'sales'
  // },
  // {
  //   id: 5,
  //   src: userImg,
  //   name: "Radhe",
  //   time: "2",
  //   content: "Sallu just enrolled in your UX Design Program.",
  //   type:'sales'
  // },
  // {
  //   id: 6,
  //   src: userImg,
  //   name: "Preetham Nayak",
  //   time: "2",
  //   content: "Preetham just enrolled in your UX Design Program.",
  //   type:'sales'
  // },
  // {
  //   id: 7,
  //   src: userImg,
  //   name: "Preetham Nayak",
  //   time: "2",
  //   content: "Fhaad go ahead .",
  //   type:'comment'
  // },
  // {
  //   id: 8,
  //   src: userImg,
  //   name: "Preetham Nayak",
  //   time: "2",
  //   content: "Nice thing done by him.",
  //   type:'comment'
  // },
  // {
  //   id: 9,
  //   src: userImg,
  //   name: "Preetham Nayak",
  //   time: "2",
  //   content: "Preetham just enrolled in your UX Design Program."
  // },
  // {
  //   id: 10,
  //   src: userImg,
  //   name: "Preetham Nayak",
  //   time: "2",
  //   content: "Preetham just enrolled in your UX Design Program.",
  //   type:'ostello'
  // },
  // {
  //   id: 11,
  //   src: userImg,
  //   name: "Preetham Nayak",
  //   time: "2",
  //   content: "Enrrolled new course.",
  //   type:'ostello'
  // }
]


const Notification = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [dropDown, setDropDown] = useState(false);
  useEffect(() => {
    document.title = "Notifications - Ostello India";
  }, []);
  return (
    <section className={`py-5 px-5 lg:px-14`} style={{ height: "100%" }}>
      <div className="heading mb-5 hidden lg:block">
        <h1 className="text-2xl font-bold ">Notification</h1>
        </div>
      <div  className=" ">
        {/* Top Nav Tabs for Desktop  */}

        <div className=" flex  justify-between">
        <div className="flex flex-col lg:flex-row items-end lg:items-center lg:gap-10 text-base ">
          <div
            className={`${
              activeTab === "All" ? "bg-primary text-white" : "bg-white text-black"
            } w-28  hidden lg:block  rounded-lg py-2 text-center`}
            onClick={() => {
              setActiveTab("All");
            }}
          >
            <button className={`font-medium`}>All</button>
          </div>

          <div
            className={`${
              activeTab === "Sales" ? "bg-primary text-white" : "bg-white text-black"
            } w-28  hidden lg:block rounded-lg py-2 text-center`}
            onClick={() => {
              setActiveTab("Sales");
            }}
          >
            <button className="font-medium">Sales</button>
          </div>
          <div
            className={`${
              activeTab === "Ostello" ? "bg-primary text-white" : "bg-white text-black"
            } w-28  hidden lg:block  rounded-lg py-2 text-center`}
            onClick={() => {
              setActiveTab("Ostello");
            }}
          >
            <button className="font-medium">Ostello</button>
          </div>
          <div
            className={`${
              activeTab === "Comment" ? "bg-primary text-white" : "bg-white text-black"
            } w-28   hidden lg:block rounded-lg py-2 text-center`}
            onClick={() => {
              setActiveTab("Comment");
            }}
          >
            <button className="font-medium">Comments</button>
          </div>

          {/* Top Bar For Mobile screen */}
        
        </div>


        <button className="font-medium border-2 border-primary  px-3 py-2 text-primary hidden sm:block rounded-2xl">Delete All</button>

        </div>


              <div className="flex justify-between items-center">
              <div className="heading mb-5 block lg:hidden ">
        <h1 className="text-2xl font-bold ">Notification</h1>
        </div>

              <div className="relative ">
            <div
              className="flex lg:hidden  justify-center items-center space-x-2 p-3 text-primary bg-white  "
              onClick={() => {
                setDropDown(!dropDown);
              }}
            >
              <p className="text-center">{activeTab}</p>
              {dropDown ? (
                <MdOutlineKeyboardArrowUp className="text-2xl" />
              ) : (
                <MdOutlineKeyboardArrowDown className="text-2xl" />
              )}
            </div>
            <div className="">
              {dropDown && (
                <div
                  className="lg:hidden absolute z-10 right-0 top-15 bg-white px-5 py-3"
                  onClick={() => {
                    setDropDown(!dropDown);
                  }}
                >
                  <div
                    className={` ${
                      activeTab === "All" ? "text-primary" : ""
                    } lg:hidden rounded-lg py-2 text-center`}
                    onClick={() => {
                      setActiveTab("All");
                    }}
                  >
                    <button className={`font-medium`}>All</button>
                  </div>

                  <div
                    className={` ${
                      activeTab === "Sales" ? "text-primary" : ""
                    }  lg:hidden rounded-lg py-2 text-center`}
                    onClick={() => {
                      setActiveTab("Sales");
                    }}
                  >
                    <button className={`font-medium`}>Sales</button>
                  </div>
                  <div
                    className={`  ${
                      activeTab === "Ostello" ? "text-primary" : ""
                    } lg:hidden  rounded-lg py-2 text-center`}
                    onClick={() => {
                      setActiveTab("Ostello");
                    }}
                  >
                    <button className="font-medium">Ostello</button>
                  </div>
                  <div
                    className={` ${
                      activeTab === "Comment" ? "text-primary" : ""
                    }  lg:hidden rounded-lg py-2 text-center`}
                    onClick={() => {
                      setActiveTab("Comment");
                    }}
                  >
                    <button className="font-medium">Comments</button>
                  </div>
                </div>
              )}
            </div>
          </div>
              </div>      


        <div className="">
          {activeTab === "All" && <AllNotification api={api} />}
          {activeTab === "Sales" && <SalesNotification api={api}/>}
          {activeTab === "Ostello" && <OstelloNotification api={api}/>}
          {activeTab === "Comment" && <CommentsNotification api={api} />}
        </div>
      </div>
    </section>
  );
};

export default Notification;
