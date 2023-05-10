import axios from "axios";
import { useEffect, useRef, useState, useTransition } from "react";
import { GrFormClose } from "react-icons/gr";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { authSelector } from "../../../../../redux/slices/authSlice";
import Modal from "../../../../UI/Modal/Modal";
import Dropdown from "../../../../Dropdown";
import { host } from "../../../../../utils/constant";
import { isEmpty } from "../../../../utils";

const LocationPopup = ({
  data,
  isEdit = false,
  editValues = {},
  afterSuccess = () => {},
}) => {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState();
  const [area, setArea] = useState("");
  const [areaError, setAreaError] = useState("");
  const [areaOptions, setAreaOptions] = useState([]);
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [isLoading, setIsLoading] = useState(null);

  const { instituteDetails } = useSelector(authSelector);

  const [locations, setLocations] = useState(
    instituteDetails.locations || data?.locations || []
  );

  

  const infoGenRef = useRef(null);
  useEffect(() => {
    if (isEdit) {
      setLine1(editValues?.line1);
      setLine2(editValues?.line2);
      setPincode(editValues?.pincode);
      setState(editValues?.state);
      setCity(editValues?.city);
      setArea(editValues?.area);
      setCountry(editValues?.country);
      handleGenerateFromPincode(editValues?.pincode?.toString());
    }
  }, [isEdit, editValues]);

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
      .catch((err) => {})
  };

  const handleSave = async (e) => {
    e && e.preventDefault();
    if (
      !isEmpty(pincodeError) ||
      isEmpty(line1) ||
      // isEmpty(line2) ||
      isEmpty(pincode) ||
      isEmpty(country) ||
      isEmpty(state) ||
      isEmpty(city) ||
      isEmpty(area)
    ) {
      return alert("Please input forms correctly");
    }

    let updatedLocations = locations.concat({
      area,
      city,
      country,
      line1,
      line2,
      pincode,
      state,
    });
    // .map((item) => JSON.stringify(item))
    if (isEdit) {
      updatedLocations = updatedLocations.filter(
        (item, idx) => idx !== editValues.index
      );
    }

    const url = "institute/update/";

    

    const data = {
      id: instituteDetails.id,
      updates: {
        locations: updatedLocations,
      },
    };

    

    try {
      const res = await axios.patch(`${host}/${url}`, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${
            typeof window !== "undefined" &&
            window.localStorage.getItem("ACCESS_TOKEN")
          }`,
        },
      });

      toast.success("Update request sent. wait for admin approval !");
      afterSuccess();
    } catch (error) {
      
    }
  };

  return (
    <>
      <Modal open={true}>
        <form
          action=""
          className=""
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="w-60 lg:w-96 px-6  shadow-md rounded-xl text-base font-normal text-slate bg-white  border-2 border-solid border-light-gray "
            style={{
              position: "absolute",
              transform: "translate(-50%,-50%)",
              marginRight: "-50%",
              top: "50%",
              left: "50%",
            }}
          >
            <div className="flex items-center justify-center">
              <h1 className="text-primary font-bold text-xl py-3 md:py-5 ">
                Add Location
              </h1>
              <GrFormClose
                className=" w-7 h-7 shadow-lavender p-1 text-lg rounded-full ml-auto "
                style={{
                  boxShadow: "0px 4px 34px rgba(136, 136, 136, 0.4)",
                  backgroundColor: "white",
                }}
                onClick={(e) => {
                  afterSuccess();
                }}
              />
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="border w-12/12 rounded-lg py-2 mr-auto">
                <input
                  type="text"
                  className="w-full focus:outline-none px-5 text-lg"
                  name="line1"
                  placeholder="Address line 1"
                  onChange={(e) => handleChange(e, setLine1)}
                  value={line1}
                />
              </div>
              <div className="border w-12/12 rounded-lg py-2 mr-auto">
                <input
                  type="text"
                  className="w-full focus:outline-none px-5 text-lg"
                  name="line2"
                  placeholder="Address line 2 (optional)"
                  onChange={(e) => handleChange(e, setLine2)}
                  value={line2}
                />
              </div>
              <div className="border w-12/12 rounded-lg py-2 mr-auto flex justify-center">
                <input
                  type="text"
                  className="w-full focus:outline-none px-5 text-lg"
                  name="pincode"
                  placeholder="Pincode"
                  onChange={(e) => handleChange(e, setPincode)}
                  value={pincode}
                />
                <button
                  ref={infoGenRef}
                  onClick={(e) => {
                    e.preventDefault();
                    handleGenerateFromPincode(pincode);
                  }}
                  className="text-xs p-1 bg-primary text-white m-1 rounded-md"
                >
                  Generate
                </button>
              </div>
              <span className="text-[#FF0000] text-center">{pincodeError}</span>

              <div className="border w-12/12 rounded-lg py-2 mr-auto">
                <input
                  type="text"
                  className="w-full focus:outline-none px-5 text-lg"
                  name="country"
                  placeholder="Country"
                  onChange={(e) => handleChange(e, setCountry)}
                  value={country}
                />
              </div>
              <div className="border w-12/12 rounded-lg py-2 mr-auto">
                <input
                  type="text"
                  className="w-full focus:outline-none px-5 text-lg"
                  name="state"
                  placeholder="State"
                  onChange={(e) => handleChange(e, setState)}
                  value={state}
                />
              </div>
              <div className="border w-12/12 rounded-lg py-2 mr-auto">
                <input
                  type="text"
                  className="w-full focus:outline-none px-5 text-lg"
                  name="city"
                  placeholder="City"
                  onChange={(e) => handleChange(e, setCity)}
                  value={city}
                />
              </div>
              <div className="border w-12/12 rounded-lg mr-auto">
                {/* <Dropdown
                  placeholderText={"Choose Area"}
                  selectValueState={[area, setArea]}
                  options={areaOptions}
                  errorState={[areaError, setAreaError]}
                /> */}
                <div className="shrink  w-full  px-5 py-2   rounded-md text-[14px] font-normal text-slate bg-white bg-clip-padding bg-no-repeat  first-letter:transition ease-in-out  mt-1 mr-2">
                      <input
                        list="area-option-list"
                        id="area-choice"
                        name="area-choice"
                        type="text"
                        autoFocus
                        className="text-xl bg-white  focus:outline-none w-full cursor-pointer"
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
            </div>
            <button
              className="bg-primary text-white  w-full py-3 rounded-lg my-6 mr-auto"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default LocationPopup;
