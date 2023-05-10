import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import RatingBox from "../Shared/Reviews/RatingBox";
import ReviewSection from "../Shared/Reviews/ReviewSection";
import { isEmpty } from "../../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  getUser,
  setActiveReview,
  setEditReview,
} from "../../../redux/slices/authSlice";
import { institutesSelector } from "../../../redux/slices/instituteSlice";
import { StarFilled } from "@ant-design/icons";
import axios from "axios";
import { host } from "../../../utils/constant";

const Ratings = ({ isForInstitute }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector(authSelector);
  const { currentInstitute } = useSelector(institutesSelector);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const [reviews , setReviews] = useState([])

  useEffect(() => {
   const run = async() => {
    if(currentInstitute.id){
      try {
        const res = await axios.get(
          `${host}/review?instituteId=${currentInstitute.id}&&nolimit=true`
        );
        setReviews(res?.data?.message)
      } catch (err) {
        
      }
    }
   }

   run()
  }, [currentInstitute.id]);

  useEffect(() => {
    if (reviews?.length && userData?.reviews?.length) {
      const uReviews = userData.reviews;
      const cReviews = reviews;
      let activeReview = uReviews.find((item) => {
        return cReviews?.find((rv) => rv.id === item.id);
      });
      if (activeReview?.id.length) {
        dispatch(setActiveReview(activeReview));
      } else {
        dispatch(setActiveReview({}));
      }
    }
  }, [currentInstitute,reviews, userData, dispatch]);


  
  return (
    <div className="md:max-w-[1350px] mx-auto">
      <section className="md:px-10 px-4  md:py-10 py-5 ">
        <div className="px-0 md:px-[80px] ">
          <div className="md:flex md:justify-between">
            <div>
              <p className="text-2xl md:text-4xl font-bold">Institute Rating</p>
              <p className="text-[#667085] mt-5  text-[17px]">
                Upcoming webinars and workshops
              </p>
              <div className="text-center flex  items-center  my-5 ">
                <p className="text-[30px] my-0 font-bold mr-3">
                  {currentInstitute?.rating}
                </p>

                {/* {[...Array(currentInstitute?.rating)].map(
                  (elementInArray, index) => (
                    <>
                      <StarFilled className="text-lg mr-1 text-light_yellow mb-1" />
                    </>
                  )
                )} */}
                <Rating name="read-only" value={currentInstitute?.rating} size="large"  readOnly />
              </div>
            </div>

            <div className="">
              <RatingBox
                isForInstitute={isForInstitute}
                id={currentInstitute.id}
              />
            </div>
          </div>

          <div>{!isEmpty(reviews) && <ReviewSection  />}</div>
        </div>
      </section>
    </div>
  );
};

export default Ratings;
