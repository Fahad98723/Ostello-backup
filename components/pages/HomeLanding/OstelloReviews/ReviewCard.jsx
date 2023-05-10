import React, { useEffect, useState } from "react";
import reviewImage from "./reviewImage.webp";
import playIcon from "./playIcon.png";
import { Rating } from "@mui/material";
import merchantReview from "../../../../assets/Pages/MerchantLanding/review.png";
import review from "../../../../assets/Pages/MerchantLanding/default.jpeg";
import ReactPlayer from "react-player";
import useScreenWidth from "../../../hooks/useScreenWidth";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function ReviewCard({ data, type }) {
  const [currentKey, setCurrentKey] = useState(0);
  const [currentData, setCurrentData] = useState(data[currentKey]);
  useEffect(() => {
    setCurrentData(data[currentKey]);
  }, [currentKey, data]);

  const { quote, rating, author, designation } = currentData;

  const { screenWidth } = useScreenWidth();

  

  return (
    <div className=" justify-center grid grid-cols-10 gap-0  items-center   transition-all duration-300 ">
      <div className="md:hidden md:col-span-6 col-span-10 flex items-center h-full bg-primary lg:w-full md:px-16 px-5 py-16 text-white rounded-tl-xl rounded-tr-xl ">
        <div className="">
          <div>
            <Rating readOnly value={rating} />
            <p className="text-[18px]">{quote}</p>
          </div>

          <div>
            <div className="mt-10 text-sm">
              <p>- {author}</p>
              <p>{designation}</p>
              {currentData?.location ? <p>{currentData.location}</p> : ""}
            </div>
            <div className="flex items-center   my-2">
              {data.map((item, key) => (
                <>
                  <AiOutlineArrowRight
                    className="rotate-180 text-2xl cursor-pointer mr-3 font-bold"
                    onClick={() => {
                      if (0 < currentKey) {
                        setCurrentKey(currentKey - 1);
                      }
                    }}
                  />

                  <div
                    key={key}
                    onClick={() => {
                      setCurrentKey(key);
                    }}
                    className={` h-3 w-3 mx-2 rounded-full hover:border cursor-pointer ${
                      key === currentKey ? "bg-white" : "bg-white/10"
                    }`}
                  />

                  <AiOutlineArrowRight
                    className="text-2xl cursor-pointer ml-3 font-bold"
                    onClick={() => {
                      if (data.length - 1 === currentKey) {
                        setCurrentKey(data.length - 1);
                      } else {
                        setCurrentKey(currentKey + 1);
                      }
                    }}
                  />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`hidden md:flex  md:col-span-6 col-span-10 items-center ${
          type === "merchant-landing" ? "h-[500px]" : "h-[400px]"
        } h-[500px] bg-primary lg:w-full md:px-16 px-5 py-20 text-white rounded-tl-xl rounded-bl-xl`}
      >
        <div className="">
          <div>
            <Rating readOnly value={rating} />
            <p className="text-[18px]">{quote}</p>
          </div>

          <div>
            <div className="mt-10 text-sm">
              <p>- {author}</p>
              <p>{designation}</p>
              {currentData?.location ? <p>{currentData.location}</p> : ""}
            </div>
            <div className="flex items-center   my-2">
              <AiOutlineArrowRight
                className="rotate-180 text-2xl cursor-pointer mr-3 font-bold"
                onClick={() => {
                  if (0 < currentKey) {
                    setCurrentKey(currentKey - 1);
                  }
                }}
              />
              {data.map((item, key) => (
                <>
                  <div
                    key={key}
                    onClick={() => {
                      setCurrentKey(key);
                    }}
                    className={` h-3 w-3 mx-2 rounded-full hover:border cursor-pointer ${
                      key === currentKey ? "bg-white" : "bg-white/10"
                    }`}
                  />
                </>
              ))}
              <AiOutlineArrowRight
                className="text-2xl cursor-pointer ml-3 font-bold"
                onClick={() => {
                  if (data.length - 1 === currentKey) {
                    setCurrentKey(data.length - 1);
                  } else {
                    setCurrentKey(currentKey + 1);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="  md:col-span-4 col-span-10 w-full relative ">
        <div className="m-0">
          {currentData?.link ? (
            <ReactPlayer
              width="100%"
              height={screenWidth > 768 ? "500px" : "350px"}
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: 1,
                    controls: 1,
                    // frameborder: 0,
                  },
                },
              }}
              url={currentData?.link}
            />
          ) : (
            <>
              <img
                src={
                  type === "merchant-landing" ? merchantReview.src : review.src
                }
                className={`w-full  m-0 ${
                  type === "merchant-landing" ? "h-[500px]" : "h-[400px]"
                } rounded-br-xl rounded-bl-xl md:hidden block`}
                alt=""
              />
              <img
                src={
                  type === "merchant-landing" ? merchantReview.src : review.src
                }
                className={`w-full  m-0 h-[500px] ${
                  type === "merchant-landing" ? "h-[500px]" : "h-[400px]"
                } rounded-br-xl rounded-tr-xl md:block hidden `}
                alt=""
              />
              <img
                src={playIcon.src}
                alt=""
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
