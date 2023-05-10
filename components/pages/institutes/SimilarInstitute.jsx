import React, { useEffect, useState } from "react";
import InstituteCard from "../../../components/UI/InstituteCard";
import {
  fetchInstitutes,
  institutesSelector,
} from "../../../redux/slices/instituteSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { host } from "../../../utils/constant";

const SimilarInstitute = () => {
  const { currentInstitute } = useSelector(institutesSelector);
  const [similar, setSimilar] = useState([]);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchInstitutes());
  // }, [dispatch]);

  useEffect(() => {
    const run = async () => {
      if (currentInstitute?.locations) {
        const { data } = await axios.get(
          `${host}/institute?approval=1&location=${currentInstitute?.locations[0].area?.toLowerCase()}`
        );

        let uniqueChars = data?.message?.filter(
          (a) => a?.name !== currentInstitute?.name
        );

        if (uniqueChars.length) {
          setSimilar(uniqueChars);
        } else {
          setSimilar(data?.message);
        }

        
      }
    };
    run();
  }, [currentInstitute]);

  const router = useRouter();
  return (
    <div className="md:p-16 p-5">
      <div>
        <p className="text-2xl md:text-4xl font-bold">Similar Institute</p>
        <p className="text-[#667085] mt-5  text-[17px]">
          Upcoming webinars and workshops
        </p>
        <div className="text-center flex  items-center  my-5 "></div>
      </div>
      <div className="grid xl:grid-cols-3 grid-cols-1 md-mx-auto gap-x-[50px] gap-y-[25px] my-10">
        {similar?.slice(0, 3).map((item, key) => (
          <InstituteCard {...item} key={key} />
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => router.push("/search")}
          className="px-4 text-center py-2 bg-black text-white rounded"
        >
          Show All
        </button>
      </div>
    </div>
  );
};

export default SimilarInstitute;
