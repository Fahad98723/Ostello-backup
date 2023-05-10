import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Images from "../../../../assets/images/exploreImage.webp";
import exploreVectorImage1 from "../../../../assets/images/exploreClipVector1.png";
import examExploreImage from "../../../../assets/exams/chart_image.svg";
import { authSelector } from "../../../../redux/slices/authSlice";
import {
  postUserAnalytics,
  selectUserAnalytics,
  setKnowInstitute,
} from "../../../../redux/slices/UserAnalytics";
import { isJsonParsable } from "../../../../utils/utils";
import Image from "next/image";
export default function OstelloInstituteExplore({
  header,
  description,
  usingFor,
  currentInstitute,
  ipAddress,
  image,
}) {
  const router = useRouter();
  
  const { userData, isAuthenticated } = useSelector(authSelector);
  const { knowInstitute, userLocation } = useSelector(selectUserAnalytics);
  const [descriptions, setDescriptions] = useState([]);
  const dispatch = useDispatch();
  const [images, setImages] = useState();

  useEffect(() => {
    if (!usingFor) {
      if (isJsonParsable(description)) {
        setDescriptions(JSON.parse(description));
      } else {
        setDescriptions([description]);
      }
    }
    if (image?.length) {
      setImages(`https://cdn.ostello.co.in/${image[0].key}`);
    }
  }, [description, usingFor, currentInstitute]);

  return (
    <section className="container mx-auto lg:px-20 px-5 grid grid-cols-1 place-items-center  lg:grid-cols-2  gap-y-5 my-10">
      <h1 className="text-2xl lg:hidden text-center ">
        {header}{" "}
        {usingFor === "examPage" && (
          <span className="text-primary font-bold">Ostello</span>
        )}
      </h1>

      <div className="relative flex items-center justify-center w-[380px] h-[380px]  sm:w-[530px] sm:h-[530px]">
        {usingFor === "mainLanding" ? (
          <div className="">
            <div
              className="w-full h-full absolute   bg-contain "
              style={
                images
                  ? {
                      backgroundImage: `url(${exploreVectorImage1.src})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center center",
                      zIndex: 110,
                    }
                  : {}
              }
            ></div>
            <Image
              width="0"
              height="0"
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              unoptimized
              className=" rounded-xl max-auto  md:w-[500px] w-[300px] h-full items-center  z-10"
              src={images || Images.src}
              alt={header + " Ostello "}
            />
          </div>
        ) : usingFor === "examPage" ? (
          <Image
            width="0"
            height="0"
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
            unoptimized
            className=" rounded-full w-[368px]  h-[368px] md:w-[518px] md:h-[518px] absolute  z-10 "
            src={examExploreImage.src}
            alt={"Exams Ostello"}
          />
        ) : (
          <Image
            width="0"
            height="0"
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            unoptimized
            className=" rounded-xl max-auto  sm:max-w-[368px]  sm:max-h-[368px] w-[200px] max-w-[290px] max-h-[290px] w-full items-center  z-10"
            src={images || Images.src}
            alt={header + " Ostello "}
          />
        )}
      </div>
      <div className="md:w-10/12 mr-auto">
        <h1 className="hidden text-4xl lg:block font-bold leading-[44px]">
          {header}{" "}
          {usingFor === "examPage" && (
            <span className="text-primary font-bold">Ostello</span>
          )}
        </h1>
        <div className="space-y-5 mt-10 text-lg">
          {usingFor === "mainLanding" ? (
            <>
              <p>
                Ostello is the world's first B2B marketplace for coaching
                institutions. It gives the institutions a platform to tell the
                students about their institute, facilities, faculty, and success
                stories. Every institute can stand among the best institutes in
                India and use Ostello's resources to grow its business.
              </p>
              <p>
                If you are a student, you just got lucky as Ostello lets you
                find the best coaching institutes near you. Compare and choose
                through location, demo classes, course fees, and discount
                offers, and select what’s best for you & make the right decision
                for your career. It's time to OWN YOUR CAREER!
              </p>
            </>
          ) : usingFor === "examPage" ? (
            <>
              <p>
                Ostello provides you a 360 degree approach to the Syllabus,
                covering every aspect of the paper with guidance from some of
                the most renowned names in academia and education.
              </p>
              <p>
                With Ostello as your mentor, we guarantee you a fruitful
                learning experience that you will always look back to with
                fondness and regard and an opportunity to be able to crack CUET
                with flying colors!
              </p>
            </>
          ) : (
            Array.isArray(descriptions) &&
            descriptions.map((item, idx) => (
              <p className="" key={idx}>
                {item}
              </p>
            ))
          )}

          <button
            onClick={() => {
              let currentTime = moment().format();
              let previousTime = moment(knowInstitute?.timeStamps);
              let diff = moment(currentTime).diff(previousTime, "seconds");
              const data = {
                activity_type: "know_institute",
                payload: {
                  instituteid: currentInstitute?.id,
                  ipaddress: ipAddress,
                  institute_name: currentInstitute?.name,
                },
              };
              if (isAuthenticated && !ipAddress) {
                data.payload.userid = userData?.id;
                data.payload.user_name = userData?.name;
              }
              if (userLocation?.latitude !== "") {
                data.location = {
                  longitude: userLocation?.longitude?.toString(),
                  latitude: userLocation?.latitude?.toString(),
                };
              } else {
                data.location = null;
              }
              if (knowInstitute?.instituteId === id && diff > 10) {
                dispatch(postUserAnalytics(data));
                dispatch(
                  setKnowInstitute({
                    instituteId: currentInstitute?.id,
                    timeStamps: currentTime,
                  })
                );
              } else {
                dispatch(postUserAnalytics(data));
                dispatch(
                  setKnowInstitute({
                    instituteId: currentInstitute?.id,
                    timeStamps: currentTime,
                  })
                );
              }
              router.push("/about-us");
            }}
            className="px-3 py-2 bg-black text-white rounded"
          >
            Know More
          </button>
        </div>
      </div>
    </section>
  );
}
