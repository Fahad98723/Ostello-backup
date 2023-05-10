import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import usePlacesAutocomplete from "use-places-autocomplete";
import {
  addRecentLocations,
  authSelector
} from "../../../../../../redux/slices/authSlice";
import { selectSearch } from "../../../../../../redux/slices/SearchSlice";
import { isEmpty } from "../../../../../../utils/utils";

const SearchHead = ({ setToggle, currentValue}) => {
  const { userLocation } = useSelector(authSelector);
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
      libraries: ["places"],
      region:"in",
    },
    debounce: 300,
  });
  const { locationQuery } = useSelector(selectSearch);
  const [location, setLocation] = useState('')


  useEffect(() => {
    if(locationQuery?.length > 1){
      setLocation(locationQuery)
    }
    else if(router?.query?.metaSection?.length > 1){
      setLocation(router?.query?.metaSection?.split("-coaching-institutes-in-")[2]?.toUpperCase())
    }
  },[locationQuery,router?.query?.metaSection])

  useEffect(() => {
    if (value.length < 1) {
      const empty = {};
      dispatch(addRecentLocations(empty));
    } else if (!isEmpty(value)) {
      setValue(value);
      dispatch(addRecentLocations(data));
    clearSuggestions();
    }
  }, [userLocation, value]);
  return (
    <div
      className="flex items-center justify-between relative py-3"
      onClick={() => {
          setToggle(!currentValue)
      }}
    >
      <div className="flex items-center w-full">
        <IoLocationOutline className=" text-2xl md:ml-4 mr-2" />
        <div className="font-dm-sans md:text-xl text-sm text-light-black w-full truncate">
          <input
            type="text"
            className="w-full outline-none p search"
            placeholder={`${location || "ABC Nagar, New Delhi-110018"}`}
            defaultValue={location || value}
            onChange={(e) => {setToggle(true);
              setValue(e.target.value)}}
          />
        </div>
      </div>
      <div className="md:ml-4 mr-2">
        {currentValue ? <BsChevronUp /> : <BsChevronDown />}
      </div>
    </div>
  );
};

export default SearchHead;
