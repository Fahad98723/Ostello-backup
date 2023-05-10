import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "../../../redux/slices/courseSlice";
import {
  setAreaLocation,
  setLocationQuery,
} from "../../../redux/slices/SearchSlice";

const TopLocation = () => {
  const [name, setName] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [slugUrl, setSlugUrl] = useState("");
  const [isDisable, setIsDisable] = useState(false);

  const dispatch = useDispatch();

  const [city, setCity] = useState();
  const [area, setArea] = useState("");
  const [direction, setDirection] = useState("");
  const [areaError, setAreaError] = useState("");
  const [directionError, setDirectionError] = useState("");
  const [areaOptions, setAreaOptions] = useState([]);
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const infoGenRef = useRef(null);

  const handleChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const handleGenerateFromPincode = (pinCode) => {
    if (pinCode?.length !== 6) {
      setPincodeError("Enter a valid pincode");
      setAreaOptions([]);
      setArea("");
      setCity("");
      setState("");
      setCountry("");
      return;
    }
    setIsLoading(true);

    axios
      .get(`https://api.postalpincode.in/pincode/${pinCode}`)
      .then((res) => {
        setAreaOptions([]);
        res.data.map((item) =>
          item.PostOffice.forEach((po) => {
            setAreaOptions((prev) => {
              if (prev.indexOf(po.Name) === -1) {
                return [...prev, po.Name];
              }
              return prev;
            });
          })
        );

        setCity(res.data[0].PostOffice[0].District);
        setState(res.data[0].PostOffice[0].State);
        setCountry(res.data[0].PostOffice[0].Country);
        setIsLoading(false);
        setPincodeError("");
      })
      .catch((err) => {});
  };

  const addAreaHandle = (e) => {
    if (area) {
      dispatch(setLocationQuery(area));
      dispatch(
        setSearch({
          type: "institute",
          name: "",
        })
      );
    }
  };

  return (
    <div>
      <div
        className={`shrink px-4 py-1 md:w-2/4 w-full shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 focus:outline-none mt-2 flex`}
      >
        <input
          type="text"
          autoFocus
          className="text-base bg-white  focus:outline-none w-full"
          name="pincode"
          placeholder="Pincode"
          onChange={(e) => handleChange(e, setPincode)}
          value={pincode}
          disabled={isDisable}
        />
        <button
          ref={infoGenRef}
          disabled={isDisable}
          onClick={(e) => {
            e.preventDefault();
            handleGenerateFromPincode(pincode);
          }}
          className="text-xs p-1 bg-primary text-white m-1 rounded-md"
        >
          Generate
        </button>
      </div>
      <div className="md:flex justify-between">
        <div className="shrink px-2 py-1 md:w-3/4 w-full shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 focus:outline-none text-base mt-2 mr-2">
          <input
            type="text"
            autoFocus
            className="text-base bg-white px-2 focus:outline-none w-full"
            disabled={isDisable ? true : false}
            name="state"
            placeholder="State"
            onChange={(e) => handleChange(e, setState)}
            value={state}
          />
        </div>
        <div className="shrink px-2 py-1 md:w-3/4 w-full shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 focus:outline-none text-base mt-2 ">
          <input
            type="text"
            autoFocus
            className="text-base bg-white px-2  focus:outline-none w-full"
            disabled={isDisable ? true : false}
            name="city"
            placeholder="City"
            onChange={(e) => handleChange(e, setCity)}
            value={city}
          />
        </div>
      </div>
      <div className="md:w-2/4 w-3/4 ">
        <select
          onChange={(e) => setArea(e.target.value)}
          value={area}
          className={`my-2 form-select   marker:block w-full px-4 pr-8 py-2 text-base font-normal text-slate bg-white  bg-no-repeat border-2 border-solid border-light-gray
        
         rounded-xl  first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
        >
          <option
            className="md:w-9/12 w-full text-slate bg-white"
            selected
            value=""
            disabled
          >
            Choose Area
          </option>
          {areaOptions.map((a, idx) => {
            return (
              <option key={idx} className="w-full text-slate bg-white ">
                {a}
              </option>
            );
          })}
        </select>
      </div>

      <div className="w-2/4 ml-auto hidden md:block">
        <div className="flex p-2 rounded-lg  border  border-b-0 border-l-0  border-r-0 border-gray/10  bg-white ">
          <button
            onClick={() => {
              // dispatch(setAreaLocation(''))
            }}
            className="text-primary rounded-md text-sm px-8 py-1 border border-primary mr-2 font-medium"
          >
            Rest
          </button>

          <button
            onClick={(e) => {
              addAreaHandle();
            }}
            className="bg-primary text-white px-8 py-1 rounded-md "
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopLocation;
