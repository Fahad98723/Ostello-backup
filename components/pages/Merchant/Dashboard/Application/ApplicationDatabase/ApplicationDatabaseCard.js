import { Checkbox, Rating } from "@mui/material";
import React from "react";
import { BiErrorAlt } from "react-icons/bi";

const ApplicationDatabaseCard = () => {
  return (
    <div className="p-5 border border-light-gray rounded-lg shadow-md ">
      <div className="flex ">
        <input
          type="checkbox"
          id=""
          name=""
          className="cursor-pointer mt-[-20px] mr-2"
        />
        <div>
          <p>Akanksha Singh</p>
          <p>Pune</p>
        </div>
      </div>

      <div className=" grid md:grid-cols-8 gap-0  my-2">
        <div className="lg:col-span-1 ">
          <p>Experience</p>
        </div>
        <div style={{}} className="  col-span-8 lg:col-span-7 ">
          <p>
            <span className="font-semibold">
              Business Development (Sales) at Property Gully Solutions
            </span>{" "}
            Feb'23 - Present 1 mo (Internship)
          </p>
          <p>
            {" "}
            <span className="font-semibold">
              Sales Intern at Tech Analogy
            </span>{" "}
            Jan'23 - Mar'23 1 mo (Internship)
          </p>
        </div>
      </div>

      <div className=" grid md:grid-cols-8 gap-0  my-2">
        <div className="lg:col-span-1 ">
          <p>Education </p>
        </div>
        <div style={{}} className="  col-span-8 lg:col-span-7 ">
          <p className="font-semibold">
            Bachelor of Science (B.Sc) (Hons.) (2020 - 2022)
          </p>
          <p>Bundelkhand University Jhansi (UP)</p>
        </div>
      </div>

      <div className=" grid md:grid-cols-8 gap-0  my-2">
        <div className="lg:col-span-1 ">
          <p className="flex items-center">
            {" "}
            Skills <BiErrorAlt className="text-[20px] ml-2" />{" "}
          </p>
        </div>
        <div style={{}} className="  col-span-8 lg:col-span-7 flex flex-wrap">
          <p className="flex items-center mr-2">
            <Rating name="read-only" value={3} size="small" max={3} readOnly />
            <small className="ml-2">English Proficiency (Spoken)</small>
          </p>
          <p className="flex items-center mr-2">
            <Rating name="read-only" value={3} size="small" max={3} readOnly />
            <small className="ml-2">English Proficiency (Spoken)</small>
          </p>
          <p className="flex items-center mr-2">
            <Rating name="read-only" value={3} size="small" max={3} readOnly />
            <small className="ml-2">English Proficiency (Spoken)</small>
          </p>
          <p className="flex items-center  text-[13px] text-gray">+3 More</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <p className="text-primary font-semibold">View Full Resume</p>

        <button className="bg-primary text-white rounded py-2 px-3">
          Invite
        </button>
      </div>
    </div>
  );
};

export default ApplicationDatabaseCard;
