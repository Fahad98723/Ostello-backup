import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFields, setSearch } from "../../../../redux/slices/courseSlice";
import {
  filterInstitute,
  setCategory,
  setClass,
  setLocationQuery,
} from "../../../../redux/slices/SearchSlice";

export default function Segments({
  onChange = () => {},
  options = [],
  activeOption,
  className = "",
  usingFor,
}) {
  const [active, setActive] = useState(activeOption || options?.[0] || "");

  const router = useRouter();
  const dispatch = useDispatch();

  // ${
  // active === item ? 'bg-white text-black' : 'bg-black text-white'
  // }

  

  return (
    <div
      className={`bg-black flex justify-center items-center w-fit mx-auto p-1  md:p-2 flex-wrap rounded-xl  ${className}`}
    >
      {options?.map((item, key) => (
        <div
          onClick={() => {
            if(usingFor === "examPage"){
            router.push(`/cuet-coaching-institutes-in-${item?.name?.toLowerCase()?.replace(/ /g,"-")}`)
            }
            else {
            setActive(item);
            onChange(item);
            dispatch(setLocationQuery(item?.name));
            dispatch(setClass([]));
            dispatch(setFields(""));
            dispatch(setCategory());
            dispatch(
              setSearch({
                type: "institute",
                name: "",
              })
            );
            router.push(`/search/${item?.name?.toLowerCase()?.replace(/ /g,"-")}`);
            }
          }}
          key={key}
          className={`bg-black text-white rounded-md  whitespace-nowrap px-2 py-1 duration-500 cursor-pointer select-none my-1 md:m-2 hover:bg-white hover:text-black `}
        >
          <p>{item?.name}</p>
        </div>
      ))}
    </div>
  );
}
