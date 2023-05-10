import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaSortAmountUp } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { Menu, MenuItem, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { toast } from "react-hot-toast";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/system";
import { CloseCircleOutlined, StarFilled } from "@ant-design/icons";
import { isEmpty } from "../../../../../utils/utils";
import imgProto from "../../../../../assets/images/icons/img.svg";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { host } from "../../../../../utils/constant";
import Swal from "sweetalert2";
import OtpNumber from "./OtpNumber";
import { useRouter } from "next/router";


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

const OtpModal = ({ setOpen, open, mobilenumber, setIsVerified , isVerified}) => {
    const [active, setActive] = useState('default')
    // const [mobilenumber, setmobilenumber] = useState()
    const [email, setEmail] = useState()
    const router = useRouter()
  
    const handleEmail = (val) => {
      setEmail(val)
    }
  
    const handleMobileNumber = (val) => {
      setmobilenumber(val)
    }
  
    const handleActive = (val) => {
      setActive(val)
    }
  
  const theme = useTheme();
  const useStyle = makeStyles({
    modalBox: {
      width: "25%",
      // height: "40%",
      // overflowY: "scroll!important",
      [theme.breakpoints.down("sm")]: {
        width: "80%",
        height: "50%",
        overflowY: "scroll!important",
      },
    },
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
      <OtpNumber
                mobilenumber={mobilenumber}
                handleActive={handleActive}
                setIsVerified={setIsVerified}
                isVerified={isVerified}
                setOpen={setOpen}
              />
      </Box>
    </Modal>
  );
};

export default OtpModal;
