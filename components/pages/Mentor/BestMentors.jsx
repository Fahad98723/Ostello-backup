import { useRouter } from "next/router";
import React, { useRef } from "react";
import Carousel from 'react-elastic-carousel';
import userImage from "../../../assets/mentor/best_men.jpg";
import userImage2 from "../../../assets/mentor/best_men2.jpg";
import userImage3 from "../../../assets/mentor/best_men3.jpg";
import userImage4 from "../../../assets/mentor/best_men4.png";
import userImage5 from "../../../assets/mentor/best_men5.jpg";
import useScreenWidth from "../../hooks/useScreenWidth";


const BestMentors = () => {
  const router = useRouter()

  const reviews = [
    {
      id: 1,
      name: "Arvinder Singh Deol",
      work: "Certified Career Coach",
      img: userImage.src,
      reviewText: "I recently discovered Ostello, and it is safe to say that it has entirely transformed my academic journey. From linking me with some of the town's most amazing mentors to giving me 100% reliable information, Ostello has been very helpful in shaping my future."
    },
    {
      id: 2,
      name: "Sanjay Gupta",
      work: "Commerce Mentor",
      img: userImage2.src,
      reviewText: "My life has gotten so much easier since I found Ostello, last year. For years, I have been looking for the right coaching center for me, but the process was very difficult and stressful. However with Ostello, I was able to find the coaching institute that best fits my needs and it's currently helping me succeed academically, and I owe it all to Ostello."
    },
    {
      id: 3,
      name: "Neeraj Bansal",
      work: "Commerce Career Mentor",
      img: userImage3.src,
      reviewText: "It has always been my habit to research well before making a decision, and coaching institutes were no exception. However, it can be extremely difficult to find all the information you need. This is where Ostello came into my life, giving me access to all the data and information I could possibly need. With their assistance, I was able to find the ideal institute in my neighborhood."
    },
    {
      id: 4,
      name: "Rohit Pratap Singh",
      work: "IIT Bombay, Entrepreneur",
      img: userImage4.src,
      reviewText: "It has always been my habit to research well before making a decision, and coaching institutes were no exception. However, it can be extremely difficult to find all the information you need. This is where Ostello came into my life, giving me access to all the data and information I could possibly need. With their assistance, I was able to find the ideal institute in my neighborhood."
    },
    {
      id: 4,
      name: "Dr. Aman Sehgal",
      work: "Teacher, Actor",
      img: userImage5.src,
      reviewText: "It has always been my habit to research well before making a decision, and coaching institutes were no exception. However, it can be extremely difficult to find all the information you need. This is where Ostello came into my life, giving me access to all the data and information I could possibly need. With their assistance, I was able to find the ideal institute in my neighborhood."
    },
  ];


  const screenWidth = useScreenWidth()
            
  return (
    <div className="md:p-10 p-5 w-[433px] md:w-full text-center mt-20">
      <div className="">
          <p className="text-[33px] font-bold text-black text-center">
          Get Connected to the best Mentors
                </p>
          </div>
      <div className="md:px-10 mt-20">
        <Carousel
          itemsToShow={4}
          showArrows={true}
          enableAutoPlay={false}
          autoPlaySpeed={3000}
          pagination={false}
          breakPoints={[
            { width: 400, itemsToShow: 1 },
            { width: 600, itemsToShow: 1 },
            { width: 900, itemsToShow: 4 },
          ]}
        >
          {reviews?.map((item, i) => (
            <div key={i} className="">
            <img
              className="w-[240px] h-[182px]"
              src={item.img}
              alt=""
            />
            <div className="flex flex-col text-[19px] text-start font-bold mt-2">
              <p className="text-black">{item.name}</p>
              <p className="text-[#2AA5FE]">{item.work}</p>
            </div>
          </div>
          ))}
        </Carousel>
      </div>
      <button
          onClick={() => {
            router.push("/mentor/register")
          }}
          className="px-5 py-2 border w-5/6 md:w-1/4  border-black rounded-md my-3 hover:bg-primary hover:text-white text-black active:opacity-80 md:text-[18px] text-[14px] mt-20 font-bold"
        >
          Apply as Mentor
        </button>
    </div>
  );
};

export default BestMentors;
