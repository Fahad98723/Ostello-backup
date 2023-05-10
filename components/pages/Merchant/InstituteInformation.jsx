import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addInstituteInformation,
  merchantSelector,
} from "../../../redux/slices/merchantSlice";
import { isEmpty, isJsonParsable } from "../../../utils/utils";
import Dropdown from "../../Dropdown";
import InputField from "../../InputField";

const InstituteInformation = ({ pageState, progressState }) => {
  const { instituteInformation } = useSelector(merchantSelector);
  const [, setPage] = pageState;
  const [, setProgress] = progressState;
  const [instituteName, setInstituteName] = useState(
    instituteInformation?.instituteName
  );
  const [description, setDescription] = useState(
    instituteInformation?.description
  );
  const [instituteStart, setInstituteStart] = useState(
    instituteInformation?.instituteStart
  );
  const [addressLine1, setAddressLine1] = useState(
    instituteInformation.addressLine1
  );
  const [addressLine2, setAddressLine2] = useState(
    instituteInformation?.addressLine2
  );
  const [shortDesc, setShortDesc] = useState(instituteInformation?.shortDesc);

  const [pincode, setPincode] = useState(instituteInformation?.pincode);
  const [area, setArea] = useState(instituteInformation?.area);
  const [areaOptions, setAreaOptions] = useState([]);
  const [city, setCity] = useState(instituteInformation?.city);
  const [state, setState] = useState(instituteInformation?.state);
  const [country, setCountry] = useState(instituteInformation?.country);

  const [openingTime, setOpeningTime] = useState(
    instituteInformation?.openingTime
  );
  const [closingTime, setClosingTime] = useState(
    instituteInformation?.closingTime
  );
  const [isLoading, setIsLoading] = useState(false);

  // const [merchantCategoryError, setMerchantCategoryError] = useState("");
  const [instituteNameError, setInstituteNameError] = useState("");
  const [instituteStartError, setInstituteStartError] = useState("");
  const [shortDescError, setShortDescError] = useState("");
  const [addressLine1Error, setAddressLine1Error] = useState("");
  const [addressLine2Error, setAddressLine2Error] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [areaError, setAreaError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [closingTimeError, setClosingTimeError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [mode, setMode] = useState(instituteInformation?.classmode || "online");

  const [openingTimeError, setOpeningTimeError] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMode(value);
  };

  const handleGenerateFromPincode = (e) => {
    e.preventDefault();
    if (pincode.length !== 6) {
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
      .get(`https://api.postalpincode.in/pincode/${pincode}`)
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
        setCityError("");
        setStateError("");
        setCountryError("");
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (instituteInformation?.description) {
      const desc = instituteInformation?.description;
      if (isJsonParsable(desc)) {
        let parsed = JSON.parse(desc);
        setDescription(parsed);
        setDescriptionParagraph1(parsed[0]);
        setDescriptionParagraph2(parsed[1]);
        setDescriptionParagraph3(parsed[2]);
      } else {
        setDescription([desc]);
        setDescriptionParagraph1(desc);
      }
    }
  }, [instituteInformation?.description]);

  const saveIsError = () =>
    instituteName === null ||
    instituteName?.length === 0 ||
    instituteStart === null ||
    instituteStart?.length === 0 ||
    description === null ||
    description?.length === 0 ||
    addressLine1 === null ||
    addressLine1?.length === 0 ||
    pincode === null ||
    pincode?.length !== 6 ||
    area === null ||
    !area ||
    city === null ||
    city?.length === 0 ||
    state === null ||
    state?.length === 0 ||
    country === null ||
    country?.length === 0;

  const handleSave = (e) => {
    e.preventDefault();

    if (isEmpty(instituteName))
      setInstituteNameError("Institute name is required");

    if (isEmpty(description)) setDescriptionError("Description is required");
    if (isEmpty(instituteStart))
      setInstituteStartError("Institute starting date is required");
    if (isEmpty(shortDesc)) setShortDescError("Short description is required");
    if (isEmpty(addressLine1))
      setAddressLine1Error("Address line 1 is required");
    if (isEmpty(addressLine2))
      setAddressLine2Error("Address line 2 is required");
    if (isEmpty(pincode)) setPincodeError("Pincode is required");
    else if (pincode?.length !== 6)
      setPincodeError("Please enter a valid pincode");
    if (!area) setAreaError("Area is required");
    if (isEmpty(city)) setCityError("City is required");
    if (isEmpty(state)) setStateError("State is required");
    if (isEmpty(country)) setCountryError("Country is required");
    if (saveIsError()) {
      alert("Please fill all the fields");
      return;
    }

    dispatch(
      addInstituteInformation({
        instituteName,
        description,
        instituteStart,
        shortDesc,
        addressLine1,
        addressLine2,
        pincode,
        area,
        city,
        state,
        country,
        openingTime,
        closingTime,
        classmode: mode,
        workingtime:
          openingTime && closingTime
            ? `${openingTime} to ${closingTime}`
            : null,
      })
    );

    setProgress((progress) => progress + 1);
    setPage((page) => page + 1);
    localStorage.setItem("PAGE", 1);
  };

  const [descriptionParagraph1, setDescriptionParagraph1] = useState("");
  const [descriptionParagraph2, setDescriptionParagraph2] = useState("");
  const [descriptionParagraph3, setDescriptionParagraph3] = useState("");

  useEffect(() => {
    setDescription(
      JSON.stringify(
        []
          .concat(descriptionParagraph1)
          .concat(descriptionParagraph2)
          .concat(descriptionParagraph3)
      )
    );
  }, [descriptionParagraph1, descriptionParagraph2, descriptionParagraph3]);

  return (
    <form
      className="w-full flex flex-col items-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="md:w-[410px]">
        <div className="flex text-left flex-col justify-center items-center">
          <div className="space-y-2 mb-4 text-left">
            <h1 className="text-[20px] font-bold">
              Tell us more about your business
            </h1>
            <div className="h-1 w-36 bg-primary"></div>
          </div>
          <InputField
            label={"Institute Name*"}
            className=""
            inputState={[instituteName, setInstituteName]}
            placeholderText="superpowe@odin.com"
            errorState={[instituteNameError, setInstituteNameError]}
          />

          <InputField
            placeholderText={"Enter a description"}
            className=""
            type="textarea"
            inputState={[descriptionParagraph1, setDescriptionParagraph1]}
            label="Describe your institute * (First paragraph)"
            errorState={[descriptionError, setDescriptionError]}
          />
          <InputField
            placeholderText={"Enter a description"}
            className=""
            type="textarea"
            inputState={[descriptionParagraph2, setDescriptionParagraph2]}
            label="Describe your institute  (Second paragraph)"
            errorState={[descriptionError, setDescriptionError]}
          />
          <InputField
            placeholderText={"Enter a description"}
            className=""
            type="textarea"
            inputState={[descriptionParagraph3, setDescriptionParagraph3]}
            label="Describe your institute  (Third paragraph)"
            errorState={[descriptionError, setDescriptionError]}
          />

          <InputField
            placeholderText={"Institute started since"}
            className=""
            type="number"
            inputState={[instituteStart, setInstituteStart]}
            label="When was this institute started"
            errorState={[instituteStartError, setInstituteStartError]}
          />
          <InputField
            placeholderText={"Short Description"}
            className=""
            type="text"
            inputState={[shortDesc, setShortDesc]}
            label="Short Description"
            errorState={[shortDescError, setShortDescError]}
          />
        </div>

        <div
          className={` flex flex-col justify-center items-start border-light-gray px-4 py-2 w-full text-base font-normal first-letter:transition ease-in-out m-0`}
        >
          <div className="flex flex-col items-start">
            <h2 className="text-[20px] font-bold text-left my-4">
              Type of Institute
            </h2>
            <div className="flex justify-center items-center">
              <input
                checked={mode === "online"}
                type="radio"
                id="online"
                name="institute"
                value="online"
                className=" block ml-auto justify-start items-start mr-2"
                onChange={handleChange}
              />
              <label htmlFor="offline">Online mode only</label> {" "}
            </div>

            <div className="flex justify-center items-center">
              <input
                type="radio"
                id="css"
                name="institute"
                checked={mode === "offline"}
                value="offline"
                className="block ml-auto justify-start items-start mr-1"
                onChange={handleChange}
              />
                <label htmlFor="offline">Offline mode only</label> {" "}
            </div>
            <div className="flex justify-center items-center">
              <input
                type="radio"
                id="hybrid"
                name="institute"
                value="hybrid"
                checked={mode === "hybrid"}
                className="block ml-auto justify-start items-start mr-1"
                onChange={handleChange}
              />
                <label htmlFor="hybrid">Both (Hybrid mode)</label> {" "}
            </div>
          </div>
        </div>
        {mode === "online" ? null : (
          <div>
            <h2 className="text-lg font-medium text-slate my-4">
              Institute Operational Details
            </h2>
            <div className="flex items-center flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
              <div className=" flex w-full flex-col space-y-2">
                <p className="w-fit">Opening Time</p>
                {openingTimeError.length > 0 && (
                  <p className="w-full text-right text-xs text-[#FF0000]">
                    {openingTimeError}
                  </p>
                )}
                <input
                  type="time"
                  value={openingTime}
                  onChange={(e) => {
                    e.preventDefault();
                    setOpeningTime(e.target.value);
                    setOpeningTimeError("");
                  }}
                  className={`select-none form-select   marker:block w-full px-4 py-2 text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid ${
                    openingTimeError.length === 0
                      ? "border-light-gray"
                      : "border-red"
                  } rounded-xl shadow-md first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                />
              </div>
              <div className=" flex w-full flex-col space-y-2">
                <p className="w-fit">Closing Time</p>
                {closingTimeError.length > 0 && (
                  <p className="w-full text-right text-xs text-[#FF0000]">
                    {closingTimeError}
                  </p>
                )}
                <input
                  type="time"
                  value={closingTime}
                  onChange={(e) => {
                    e.preventDefault();
                    setClosingTime(e.target.value);

                    setClosingTimeError("");
                  }}
                  className={`select-none form-select   marker:block w-full px-4 py-2 text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid ${
                    closingTimeError.length === 0
                      ? "border-light-gray"
                      : "border-red"
                  } rounded-xl shadow-md first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                />
              </div>
            </div>{" "}
          </div>
        )}

        <div className="flex flex-col justify-center items-start">
          <h2 className="text-lg font-medium text-slate my-4">Address</h2>
          <InputField
            className=""
            inputState={[addressLine1, setAddressLine1]}
            placeholderText="Address Line 1"
            errorState={[addressLine1Error, setAddressLine1Error]}
          />
          <InputField
            className=""
            inputState={[addressLine2, setAddressLine2]}
            placeholderText="Address Line 2"
            errorState={[addressLine2Error, setAddressLine2Error]}
          />
          <div className="flex  items-end justify-center lg:-my-4">
            <InputField
              className="  lg:w-96"
              inputState={[pincode, setPincode]}
              placeholderText="Pincode"
              errorState={[pincodeError, setPincodeError]}
              onChange={(e) => handleGenerateFromPincode(e)}
            />
            <button
              onClick={(e) => handleGenerateFromPincode(e)}
              className="shadow-md mb-4  w-36 text-base h-full px-4 py-2 rounded-[10px] border border-light-gray hover:bg-primary hover:text-white"
            >
              {isLoading ? "Loading..." : "Generate"}
            </button>
          </div>
          <div className="flex items-end justify-center -my-4 pt-5 space-x-2">
            <InputField
              placeholderText="India"
              className="text-left"
              inputState={[country, setCountry]}
              label={"Country"}
              errorState={[countryError, setCountryError]}
            />
            <InputField
              placeholderText="Delhi"
              className="text-left"
              inputState={[state, setState]}
              label={"State"}
              errorState={[stateError, setStateError]}
            />
          </div>
          <div className="flex items-center justify-center text-left my-4 m-0 p-0 space-x-2">
            <InputField
              placeholderText="Delhi"
              className=""
              inputState={[city, setCity]}
              label={"City"}
              errorState={[cityError, setCityError]}
            />

            <div className="">
              <label htmlFor="first-name" className="block text-gray-500 pb-2">
                Area
              </label>
              <input
                list="area-option-list"
                id="area-choice"
                name="area-choice"
                type="text"
                autoFocus
                className="block
       
                w-full
                px-3
                py-2
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-[#D0D5DD]
                rounded-[10px]
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none cursor-pointer"
                onChange={(e) => setArea(e.target.value)}
                value={area}
              />

              <datalist id="area-option-list">
                {areaOptions.map((category, idx) => {
                  return (
                    <option
                      key={idx}
                      value={category}
                      className="w-full text-[14px] font-normal text-black rounded-[10px] cursor-pointer"
                    />
                  );
                })}
              </datalist>
            </div>
          </div>
          <div className="w-full flex items-center justify-center my-6">
            <button
              onClick={(e) => handleSave(e)}
              className="my-2 transition-all hover:-translate-y-1 border bg-primary shadow hover:shadow-lg rounded-full px-10 py-3 text-white text-[18px] font-bold"
            >
              Save &amp; Continue
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default InstituteInformation;
