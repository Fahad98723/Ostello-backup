import React, { useState } from "react";

//data for both of tabs and input fields.
import Data from "./data";

//style
// import './style.css'

const TabPaymentMethod = () => {
  //the state and function for handling the active tab and it's contents
  const [active, setActive] = useState(1);
  const handleActive = (id) => {
    if (id !== active && id !== null) {
      setActive(id);
    }
  };

  return (
    //first column of payment options
    <div className="hidden md:grid md:grid-cols-12 gap-5 md:h-screen ">
      <div className="md:col-span-4">
        {Data.map((d) => (
          <div
            key={d.id}
            onClick={() => handleActive(d.id)}
            className={
              d.id === active
                ? "card flex p-4 my-4 rounded-2xl cursor-pointer text-white bg-primary border border-primary"
                : "card flex p-4 my-4 rounded-2xl hover:bg-primary  cursor-pointer hover:text-white  text-black duration-500 border border-desc-gray"
            }
          >
            <div
              className={
                d.id === active
                  ? "icon w-11 text-xl mt-0 text-white"
                  : "icon w-11 text-xl text-grey-700  mt-1 "
              }
            >
              {d.icon}
            </div>
            <div
              className={
                d.id === active
                  ? "ml-5 md:text-sm lg:text-base font-medium"
                  : "ml-5 md:text-sm lg:text-base font-medium title"
              }
            >
              {d.title}
            </div>
          </div>
        ))}
      </div>

      {/* second column which includes various input fields*/}
      <div className="md:col-span-8 h-screen">
        {Data.map((d) => (
          <div key={d.id} className={d.id === active ? "block" : "hidden"}>
            {d.input}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabPaymentMethod;
