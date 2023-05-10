import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { GiCancel } from "react-icons/gi";
import { AiOutlineDownload } from "react-icons/ai";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 355,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

export default function PurchaseDetailsModal({
  open,
  setOpen,
  handleOpen,
  details,
}) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between mb-3">
            <p className="text-2xl">Purchase Details</p>
            <GiCancel
              onClick={() => {
                handleClose();
              }}
              className="text-right text-2xl text-primary cursor-pointer"
            ></GiCancel>
          </div>

          <div>
            <div className="flex items-center">
              <img src={`https://cdn.ostello.co.in/${details?.institute?.images[0]?.key}`} alt="" className="w-20 h-20 rounded-xl" />
              <div className="ml-3">
                <p className="text-lg text-ghost/90 ">{details?.category?.name}</p>
                <p className="text-lg">{details?.name}</p>
                <p className="">{details?.institute?.classmode === 1 ? "Online" : details?.institute?.classmode === 2 ? "Offline" : "Hybrid"}</p>
              </div>
            </div>
            <div className="flex items-center my-3 text-primary cursor-pointer">
              <p>Download Receipt</p>{" "}
              <AiOutlineDownload className="text-xl ml-1" />
            </div>

            <hr className="my-3 text-ghost/80" />

            <div className="text-ghost/90">
              <div className="flex justify-between">
                <p>Amount</p>
                <p>₹{details?.effectiveprice}</p>
              </div>
              {/* <div className="flex justify-between mt-1">
                <p>GST</p>
                <p>₹{details?.gst}</p>
              </div> */}
              {/* <div className="flex justify-between mt-1 text-primary">
                <p>Coupon</p>
                <p>₹{details.coupon}</p>
              </div> */}
              <div className="flex justify-between mt-1 text-[#FF0000]/90">
                <p>Discount</p>
                <p>₹{details?.grossprice - details?.discountprice}</p>
              </div>
            </div>

            <hr className="my-3 text-ghost/80" />
            <div className="flex justify-between my-1 text-2xl">
              <p>Total</p>
              <p>₹{details?.effectiveprice}</p>
            </div>
            <hr className="my-3 text-ghost/80" />

            <div className="my-2">
              <p className="text-ghost/100">Course Duration</p>
              <p className="">{details?.duration} days</p>
            </div>
            <div className="my-2">
              <p className="text-ghost/100">Payment Method</p>
              <p className="">{details?.paymentmethod}</p>
            </div>
            <div className="my-2">
              <p className="text-ghost/100">Purchase Date</p>
              <p className="">{details?.purchaseddate?.split('T')[0]} at {details?.purchaseddate?.split('T')[1].split('.')[0]}</p>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
