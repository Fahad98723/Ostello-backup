import React, { useRef } from "react";
import right from "../../../assets/mentor/right_arrow.svg";
import left from "../../../assets/mentor/left_arrow.svg";
import feed_image from "../../../assets/mentor/mentor_feed.svg";
import quote from "../../../assets/mentor/quote.svg";
import Carousel from "react-elastic-carousel";
import { IoIosArrowForward,IoIosArrowBack } from 'react-icons/io';
import useScreenWidth from "../../hooks/useScreenWidth";

const Feedback = () => {
  const carousel = useRef(null);
  const feedbacks = [
    {
      id: 1,
      name: "Anigrah",
      work: "Cuet Student",
      img: feed_image.src,
      reviewText:
        "I recently discovered Ostello, and it is safe to say that it has entirely transformed my academic journey. From linking me with some of the town's most amazing mentors to giving me 100% reliable information, Ostello has been very helpful in shaping my future.",
    },
    {
      id: 2,
      name: "Anvisha",
      work: "Student",
      img: feed_image.src,
      reviewText:
        "My life has gotten so much easier since I found Ostello, last year. For years, I have been looking for the right coaching center for me, but the process was very difficult and stressful. However with Ostello, I was able to find the coaching institute that best fits my needs and it's currently helping me succeed academically, and I owe it all to Ostello.",
    },
    {
      id: 3,
      name: "Imaan",
      work: "Student",
      img: feed_image.src,
      reviewText:
        "It has always been my habit to research well before making a decision, and coaching institutes were no exception. However, it can be extremely difficult to find all the information you need. This is where Ostello came into my life, giving me access to all the data and information I could possibly need. With their assistance, I was able to find the ideal institute in my neighborhood.",
    },
  ];

  const screenWidth = useScreenWidth()
  return (
    <section className="py-10 px-5 md:w-[1300px] mx-auto w-full">
      <div className="">
        <h1 className="text-2xl md:text-[40px] text-[25px] font-bold">
          Other Reasons
        </h1>
        <p className="mt-5 md:text-[20px] text-[15px]">
        By the way, that’s not all we have for you in store. Here’s another BIGGEST benefit that you’d love to know.
        </p>
        <p className="mt-2 md:text-[20px] text-[15px]">
        Here are the testimonials:
        </p>
      </div>
      <div className="mb-5 mt-10">
        <div className="">
          <Carousel
            ref={carousel}
            showArrows={true}
            itemsToShow={2}
            className=""
            pagination={true}
            breakPoints={[
              { width: 1, itemsToShow: 1 },
              { width: 600, itemsToShow: 2 },
              { width: 900, itemsToShow: 2 },
            ]}
          >
            {feedbacks?.map((item, index) => (
              <>
                <div
                  key={index}
                  className=" bg-white p-5 p-3 md:w-[500px] mx-auto w-full my-5 rounded-[12px] shadow-md group py-10"
                >
                  <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                      <div>
                        <img
                          className="md:w-[70px] w-[42px] md:h-[70px] h-[42px] rounded-full "
                          src={item.img}
                          alt=""
                        />
                      </div>
                      <div className="pl-3">
                        <h4 className="text-primary md:text-[24px] text-[16px]">
                          {item?.name}
                        </h4>
                        <p className="md:text-[16px] text-[12px]">{item?.work}</p>
                      </div>
                    </div>
                    <div className="">
                      <img
                        className="md:w-[44px] w-[19px] h-[19px] md:h-[44px] flex justify-end"
                        src={quote.src}
                        alt=""
                      />
                    </div>
                  </div>
                  <p className="text-left text-[12] md:text-[16px] group-hover:hidden block pt-5 ease-out duration-300 ">{item?.reviewText?.slice(0,150)}</p>
              <p className="text-left text-[12] md:text-[16px] group-hover:block hidden pt-5 ease-out duration-300">{item?.reviewText}</p>
                </div>
              </>
            ))}
          </Carousel>
        </div>

        {/* <div className="md:flex justify-end mt-5 mr-20 hidden">
          <div className="flex justify-center items-center gap-[10px]">
          <IoIosArrowBack
            onClick={() => {
              carousel.current.slidePrev();
            }}
            className="md:w-[44px] md:h-[44px] p-[10px] cursor-pointer hover:bg-primary bg-white rounded-[8px] shadow-[-4px_4px_20px_0_rgba(32,180,134,0.12)] "
          />
          <IoIosArrowForward
            onClick={() => {
              carousel.current.slideNext();
            }}
            className="p-[10px] cursor-pointer md:w-[44px] md:h-[44px] hover:bg-primary bg-white rounded-[8px] shadow-[-4px_4px_20px_0_rgba(32, 180, 134, 0.12)]"
          />
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Feedback;
