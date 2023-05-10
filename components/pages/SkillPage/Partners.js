import React, { useRef } from "react";
import Carousel from "react-elastic-carousel";
import userImage from "../../../assets/exams/user_Image.svg";

const Partners = () => {
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
        "My life has gotten so much easier since I found Ostello, last year. For years, I have been looking for the right coaching center for me, but the process was very difficult and stressful. However with Ostello, I was able to find the coaching institute that best fits my needs and it's currently helping me succeed academically, and I owe it all to Ostello.",
    },
    {
      id: 3,
      name: "Imaan",
      work: "Student",
      img: userImage.src,
      reviewText:
        "It has always been my habit to research well before making a decision, and coaching institutes were no exception. However, it can be extremely difficult to find all the information you need. This is where Ostello came into my life, giving me access to all the data and information I could possibly need. With their assistance, I was able to find the ideal institute in my neighborhood.",
    },
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
        "My life has gotten so much easier since I found Ostello, last year. For years, I have been looking for the right coaching center for me, but the process was very difficult and stressful. However with Ostello, I was able to find the coaching institute that best fits my needs and it's currently helping me succeed academically, and I owe it all to Ostello.",
    },
    {
      id: 3,
      name: "Imaan",
      work: "Student",
      img: userImage.src,
      reviewText:
        "It has always been my habit to research well before making a decision, and coaching institutes were no exception. However, it can be extremely difficult to find all the information you need. This is where Ostello came into my life, giving me access to all the data and information I could possibly need. With their assistance, I was able to find the ideal institute in my neighborhood.",
    },
  ];
  return (
    <div className="p-5 sm:p-10">
      <div>
        <p className="md:text-[45px] text-[25px] font-semibold text-center mb-5">
          <span className="text-primary font-bold ">Partners </span> &{" "}
          <span className="text-primary font-bold ">Collaborators </span>
        </p>
        <Carousel
          ref={carousel}
          showArrows={true}
          itemsToShow={2}
          className=""
          pagination={false}
          breakPoints={[
            { width: 1, itemsToShow: 1 },
            { width: 600, itemsToShow: 1 },
            { width: 900, itemsToShow: 3 },
          ]}
        >
          {reviews?.map((item, index) => (
            <div
              key={index}
              className=" bg-white m-2  rounded-[10px] border-2 border-light-gray max-h-[300px] h-full shadow-md"
            >
              <div>
                <img
                  className="w-full rounded-[10px] "
                  src={"https://www.w3schools.com/css/img_lights.jpg"}
                  alt=""
                />

                {/* <div className="p-5">
                    <h4 className=" text-[24px]">{item?.name}</h4>
                    <p className="text-[18px] text-[#407BFF] mt-2">
                      {item?.work}
                    </p>
                  </div> */}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Partners;
