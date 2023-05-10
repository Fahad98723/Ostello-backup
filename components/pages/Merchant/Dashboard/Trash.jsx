import React, { useEffect, useContext, useState } from "react";
import { PopupContext } from "./PopupSystem/Popup";

const Trash = () => {
  // eslint-disable-next-line
  const [state, dispatch] = useContext(PopupContext);
  const [text, setText] = useState("");

  useEffect(() => {
    document.title = "Trash - Ostello India";
  }, []);

  return (
    <div className="text-5xl w-screen h-96 flex justify-center items-center">
      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch({
            type: "SHOW",
            payload: {
              title: "Do you want to delete ?",
              tagline: "You won't be able to restore it.",
              successText: "Delete",
              cancelText: "Cancel",
              handleSuccess: function (e) {
                setText("Deleted");
                dispatch({
                  type: "HIDE"
                });
              },
              handleCancel: function (e) {
                setText("Cancelled");
                dispatch({
                  type: "HIDE"
                });
              }
            }
          });
        }}
        className="bg-ghost text-white px-4 py-2"
      >
        Delete
      </button>
      <p className="">{text}</p>
    </div>
  );
};

export default Trash;
