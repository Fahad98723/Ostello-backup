import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import { toast } from "react-hot-toast";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/system";
import { host } from "../../../../utils/constant";
import dynamic from "next/dynamic";
import { Autocomplete, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 2,
  borderRadius: "10px",
  backgroundColor: "white",
  color: "black",
  overflow: "hidden",
};

const AddCityModal = ({ setOpen, open, setReFetch }) => {
  const [city, setCity] = useState([]);
  const [state, setState] = useState("");
  const [isDisable, setIsDisable] = useState(false);

  const handleCity = async () => {
    const d = {
      state: state,
      city: city,
    };
    try {
  

      const { data } = await axios.post(`${host}/locations/city`, d, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      });
 
      toast.success("successfully added");
    } catch (err) {
      toast.error("something went wrong !!");
    } finally {
      setCity("");
      setState("");
      setOpen(false);
      setReFetch(true);
    }
  };

  const theme = useTheme();
  const useStyle = makeStyles({
    modalBox: {},
  });

  const { modalBox } = useStyle();
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className={modalBox}>
        <div className="md:px-[10px] px-[5px]  w-full !mt-[0px]">
          <p className="text-2xl  font-bold mb-4">Add City</p>
          <div
            className={` shrink w-full  p-2 mb-2  shadow-md rounded-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  
                                    
                                        `}
          >
            <input
              type="text"
              placeholder="State Name"
              autoFocus
              className="text-xl bg-white  focus:outline-none w-full"
              defaultValue={state}
              disabled={isDisable}
              onChange={(e) => {
                setState(e.target.value);
              }}
            />
          </div>

          <Autocomplete
            multiple
            id="tags-standard"
            onChange={(event, newValue) => {
              setCity(newValue);
            }}
            value={city}
            options={city || []}
            getOptionLabel={(tag) => tag}
            freeSolo
            renderInput={(params) => (
              <TextField
                hiddenLabel
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setCity([...city, e.target.value]);
                  }
                }}
                // style={{ backgroundColor:"white" , outline: 'none'}}
                // className={classes.root}
                {...params}
                style={{
                  width: "100%",
                }}
                className="border-2 border-solid border-light-gray max-w-[500px]"
                placeholder="Select You City"
              />
            )}
          />

          <div className="bg-primary w-28 py-2 rounded-lg my-2">
            <button
              className="m-auto w-full text-lg font-bold z-50 text-white"
              onClick={handleCity}
            >
              Add
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default AddCityModal;
