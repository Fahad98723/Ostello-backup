import { Autocomplete, Checkbox, TextField } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { FaCrown } from "react-icons/fa";
import { Slider } from "antd";

const icon = <ImCheckboxUnchecked />;
const checkedIcon = <ImCheckboxChecked />;

const academicsData = [
  "Engineering (B.Tech/B.E/MCA & Similar)",
  "MBA & Similar",
  "BBA & Similar",
  "Commerce (B.Com & Similar)",
  "Chartered Accountant (CA, CS & Similar)",
  "Journalism, Mass Comm & Similar",
  "Humanities (B.A./M.A. & Similar)",
  "Design, Animation, Fine Arts & Similar",
  "Science (B.Sc/M.Sc & Similar)",
  "Law & Similar",
  "Fashion Technology & Similar",
  "Architecture, Planning & Similar",
  "Hospitality (Hotel Management, Tourism & Similar)",
];

const FilterSideBar = () => {
  const marks = {
    0: "0%",
    25: "25%",
    50: "50%",
    75: "75%",
    100: "100%",
  };
  const [academicsPer, setAcademicsPer] = useState(50);
  return (
    <div className="p-3  h-screen md:block hidden">
      <div className="">
        <p className="text-[20px] font-semibold">Filters</p>
      </div>

      <div className="my-2">
        <p className="flex items-center my-2">
          {" "}
          Applicants' locations <AiOutlineQuestionCircle className="ml-2" />
        </p>

        <TextField size="small" placeholder="e.g.Mumbai" />
      </div>
      <div className="my-2">
        <p className="flex items-center my-2">
          {" "}
          Skills <AiOutlineQuestionCircle className="ml-2" />
        </p>

        <TextField size="small" placeholder="e.g.Java" />
      </div>
      <div className="my-2">
        <p className="flex items-center my-2">
          {" "}
          Academic background <AiOutlineQuestionCircle className="ml-2" />
        </p>

        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={academicsData}
          disableCloseOnSelect
          getOptionLabel={(option) => option}
          renderOption={(props, option, { selected }) => (
            <li className="p-2" {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </li>
          )}
          style={{}}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              placeholder="e.g.MBA & similar"
            />
          )}
        />
      </div>
      <div className="my-2">
        <p className="flex items-center my-2">
          {" "}
          Graduation year <AiOutlineQuestionCircle className="ml-2" />
        </p>

        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={academicsData}
          disableCloseOnSelect
          getOptionLabel={(option) => option}
          renderOption={(props, option, { selected }) => (
            <li className="p-2" {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </li>
          )}
          style={{}}
          renderInput={(params) => (
            <TextField {...params} size="small" placeholder="e.g. 2021" />
          )}
        />
      </div>
      <div className="my-2 mb-3 px-2">
        <p className="flex items-center my-2">
          {" "}
          Minimum academic performance
          <AiOutlineQuestionCircle className="ml-2" />
        </p>
        <Slider
          onAfterChange={(e) => setAcademicsPer(e)}
          min={0}
          max={100}
          onChange={(e) => {
            setAcademicsPer(e);
          }}
          // value={academicsPer}
          // range={{ draggableTrack: false }}
          tipFormatter={(value) => {
            return `${value} %`;
          }}
          className="flex flex-col z-[100] text-[10px]"
          trackStyle={{ background: "#7d23e0" }}
          marks={marks}
        />
      </div>

      <div className="grid  mt-4 justify-items-end">
        <div className="flex">
        <button className="bg-primary text-white rounded py-2 px-3 mr-2">
          Clear All 
        </button>
        <button className="bg-primary text-white rounded py-2 px-3">
          Show Results
        </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
