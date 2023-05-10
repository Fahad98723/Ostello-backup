import React, { useRef } from "react";
import Carousel from 'react-elastic-carousel';
import quote from "../../../assets/exams/quote_vector.svg";
import userImage1 from "../../../assets/exams/user_Image.svg";
import userImage2 from "../../../assets/exams/user_Image2.svg";


const ExamReviews = () => {
  const carousel = useRef(null)

  const reviews = [
    {
      id: 1,
      name: "Anigrah",
      work: "Cuet Student",
      img: userImage1.src,
      reviewText: "I recently discovered Ostello, and it is safe to say that it has entirely transformed my academic journey. From linking me with some of the town's most amazing mentors to giving me 100% reliable information, Ostello has been very helpful in shaping my future."
    },
    {
      id: 2,
      name: "Anvisha",
      work: "Student",
      img: userImage2.src,
      reviewText: "My life has gotten so much easier since I found Ostello, last year. For years, I have been looking for the right coaching center for me, but the process was very difficult and stressful. However with Ostello, I was able to find the coaching institute that best fits my needs and it's currently helping me succeed academically, and I owe it all to Ostello."
    },
    {
      id: 3,
      name: "Imaan",
      work: "Student",
      img: userImage1.src,
      reviewText: "It has always been my habit to research well before making a decision, and coaching institutes were no exception. However, it can be extremely difficult to find all the information you need. This is where Ostello came into my life, giving me access to all the data and information I could possibly need. With their assistance, I was able to find the ideal institute in my neighborhood."
    },
  ];
  return (
    <div className="container mx-auto grid grid-cols-1 pb-10 mt-10">
      <div className="mx-5">
      <img
                    className="w-[70px] h-[40px] z-10 mt-[-20px]"
                    src={quote.src}
                    alt=""
                  />
      <h1 className=" leading-none font-bold text-2xl lg:text-4xl md:mt-0 mt-5 ">
        CUET Students{" "}
        <span className="text-primary font-bold">Testimonials</span>
      </h1>
      </div>
      <div className="mt-10 mx-5">
      <Carousel
                ref={carousel}
                showArrows={true}
                itemsToShow={2}
                className=''
                pagination={false}
                breakPoints={[
                  { width: 1, itemsToShow: 1 },
                  { width: 600, itemsToShow: 1 },
                  { width: 900, itemsToShow: 2 },
                ]}
              >
          {reviews?.map((item,index) =>(
            <div key={index} className="flex flex-col justify-center bg-white p-5 rounded-[10px] md:w-[550px] md:h-[250px]">
              <div className="flex gap-2 items-center">
                <div>
                  <img
                    className="w-14 h-14 rounded-full "
                    src={item.img}
                    alt=""
                  />
                </div>
                <div className="pl-3">
                  <h4 className="text-primary text-[20px]">{item?.name}</h4>
                  <p className="text-[16px]">{item?.work}</p>
                </div>
              </div>
              <p className="text-left pt-5">
              {item?.reviewText}
              </p>
            </div>
          ))}
        </Carousel>
      </div>
      {/* <div className='flex space-x-5 mt-5 px-5 md:px-[80px]'>
              <BsFillArrowLeftCircleFill
                onClick={() => {
                  carousel.current.slidePrev()
                }}
                className='flex items-center justify-center bg-primary p-5 cursor-pointer'
              />
              <BsFillArrowRightCircleFill
                onClick={() => {
                  carousel.current.slideNext()
                }}
                className='flex items-center justify-center bg-primary p-5 cursor-pointer'
              />
            </div> */}
    </div>
  );
};

export default ExamReviews;
