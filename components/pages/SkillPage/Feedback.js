import React, { useRef } from "react";
import Carousel from "react-elastic-carousel";
import userImage from "../../../assets/exams/user_Image.svg";
import quote from "../../../assets/exams/quote_vector.svg";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const Feedback = () => {
  const carousel = useRef(null);

  const reviews = [
    {
      id: 1,
      name: "Anigrah",
      work: "Cuet Student",
      img: userImage.src,
      reviewText:
        "I recently discovered Ostello, and it is safe to say that it has entirely transformed my academic journey. From linking me with some of the town's most amazing mentors to giving me 100% reliable information, Ostello has been very helpful in shaping my future.",
    },
    {
      id: 2,
      name: "Anvisha",
      work: "Student",
      img: userImage.src,
      reviewText:
        "My life has gotten so much easier since I found Ostello, last year. For years, I have been looking for the right coaching center for me, but the process was very difficult and stressful. However with Ostello, I was able to find the coaching institute that ",
    },
    {
      id: 3,
      name: "Imaan",
      work: "Student",
      img: userImage.src,
      reviewText:
        "It has always been my habit to research well before making a decision, and coaching institutes were no exception. However, it can be extremely difficult to find all the information you need. This is where Ostello came into my life, giving me access to all the ",
    },
    {
      id: 1,
      name: "Anigrah",
      work: "Cuet Student",
      img: userImage.src,
      reviewText:
        "I recently discovered Ostello, and it is safe to say that it has entirely transformed my academic journey. From linking me with some of the town's most amazing mentors to giving me 100% reliable information, Ostello has been very helpful in shaping my .",
    },
    {
      id: 2,
      name: "Anvisha",
      work: "Student",
      img: userImage.src,
      reviewText:
        "My life has gotten so much easier since I found Ostello, last year. For years, I have been looking for the right coaching center for me, but the process was very difficult and stressful. However with Ostello, I was able to find the coaching institute ",
    },
    {
      id: 3,
      name: "Imaan",
      work: "Student",
      img: userImage.src,
      reviewText:
        "It has always been my habit to research well before making a decision, and coaching institutes were no exception. However, it can be extremely difficult to find all the information you need. This is where Ostello came into my life, giving me access to ",
    },
  ];
  return (
    <div className="p-5 sm:p-10">
      <div>
        <div className="mb-4">
          <p className="md:text-[45px] text-[25px] md:text-left text-center font-semibold  mb-1">
            Student <span className="text-primary font-bold ">Feedback </span>{" "}
          </p>
          <p className="text-gray text-[20px] md:text-left text-center">
            Various versions have evolved over the years, sometimes by accident,
          </p>
        </div>
        <Carousel
          ref={carousel}
          showArrows={false}
          itemsToShow={2}
          className=""
          pagination={true}
          breakPoints={[
            { width: 1, itemsToShow: 1 },
            { width: 600, itemsToShow: 1 },
            { width: 900, itemsToShow: 2 },
          ]}
        >
          {reviews?.map((item, index) => (
            <div
              key={index}
              className="border-2 border-light-gray shadow-md my-2 justify-center relative bg-white p-5 rounded-[10px] md:w-[550px] group"
            >
              <img
                className="md:w-[50px] w-[25px] h-[25px]  md:h-[30px] md:right-10 right-3 md:top-5 top-3 absolute rotate-180"
                src={quote.src}
                alt=""
              />
              <div className="flex gap-2 items-center">
                <div>
                  <img
                    className="w-[50px] h-[50px] rounded-full "
                    src={item.img}
                    alt=""
                  />
                </div>
                <div className="pl-3">
                  <h4 className="text-primary text-[20px]">{item?.name}</h4>
                  <p className="text-[16px]">{item?.work}</p>
                </div>
              </div>
              <p className="text-left text-[16px] group-hover:hidden block pt-5 ease-out duration-300 ">{item?.reviewText?.slice(0,150)}</p>
              <p className="text-left text-[16px] group-hover:block hidden pt-5 ease-out duration-300">{item?.reviewText}</p>
            </div>
          ))}
        </Carousel>
        <div className="relative md:block hidden   px-5 md:px-[55px] mb-10">
          <div className="absolute flex right-10 space-x-5 ">
            <ArrowLeftOutlined
              onClick={() => {
                carousel.current.slidePrev();
              }}
              className="flex items-center justify-center bg-white text-gray hover:bg-primary hover:text-white rounded-md border border-light-gray shadow-xl text-xl p-3 cursor-pointer"
            />
            <ArrowRightOutlined
              onClick={() => {
                carousel.current.slideNext();
              }}
              className="flex items-center hover:bg-primary hover:text-white text-xl justify-center bg-white text-gray rounded-md border border-light-gray shadow-xl p-3 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
