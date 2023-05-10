import React from "react";
import { BiErrorAlt } from "react-icons/bi";

const ApplicationDatabaseHeader = () => {
  return (
    <div>
      <div className="bg-light-gray p-3 rounded-lg flex">
        <div>
          <BiErrorAlt className="text-[20px] mr-2 mt-[2px]" />
        </div>
        <p>
          90% employers find their desired candidates within 3 days using Access
          Database! Our AI-powered recommendation engine curates relevant
          profiles for your post daily so that you can invite most suitable
          candidates.
        </p>
      </div>

      <div className="my-3">
        <p className="font-semibold">
          Showing 348 results out of 348 applications
        </p>
      </div>
    </div>
  );
};

export default ApplicationDatabaseHeader;
