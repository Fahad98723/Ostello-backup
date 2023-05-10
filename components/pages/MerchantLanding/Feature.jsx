import React from "react";
import image1 from "../../../assets/Pages//MerchantLanding/Featuredicon(4).svg";
import image2 from "../../../assets/Pages//MerchantLanding/Featuredicon(1).svg";
import image3 from "../../../assets/Pages//MerchantLanding/Featuredicon.svg";
import feature1 from "../../../assets/Pages//MerchantLanding/feature (2).png";
import feature2 from "../../../assets/Pages//MerchantLanding/feature (1).png";
import { AiOutlineArrowRight } from "react-icons/ai";
const Feature = () => {
  const data = [
    {
      image: image1,
      heading: "Promise and deliver on value",
      title:
        "Inclusive of all and any team size the customer service platform would help you balance everything your customers need.",
      desc: "sales@untitledui.com",
    },
    {
      image: image2,
      heading: "Engage and develop your business",
      title:
        "Measure your growth, analyze your sales statistics and get guided with report- backed data.",
      desc: "support@untitledui.com",
    },
    {
      image: image3,
      heading: "Establish your business profile and build a good customer base",
      title:
        "Ostello is the place to be for you to launch your business, to establish your brand and to help students avail your services.",
      desc: "100 Smith Street Collingwood VIC 3066 AU",
    },
  ];
  const StatsCard = ({ heading, title, desc, image }) => {
    return (
      <>
        <div className="p-5 text-center  w-full">
          <img className="mb-5 mx-auto" src={image.src} alt="" />
          <h1 className="text-[20px] text-primary font-bold text-[#42307D] ">
            {heading}
          </h1>
          <p className=" mt-1 text-[16px]  text-[#667085]">{title}</p>
          <p className=" text-[16px] text-[#6941C6] mt-2 text-center justify-center flex items-center ">
            Learn More <AiOutlineArrowRight className="ml-2 " />
          </p>
        </div>
      </>
    );
  };

  return (
    <section className="container mx-auto lg:px-10 px-5 my-20">
      <div className="text-center">
        <button className="py-2 px-4 text-[16px] font-semibold text-[#6941C6] rounded-3xl bg-[#F9F5FF] ">
          Features
        </button>
        <h1 className="lg:text-4xl  text-xl font-bold leading-6">
          Cutting-edge features for advanced analytics
        </h1>
        <p className="lg:text-lg mt-5 text-gray md:w-2/4 mx-auto">
          Powerful, self-serve product and growth analytics to help you convert,
          engage, and retain more users. Trusted by over 4,000 startups.
        </p>
      </div>

      {/* <div className="grid grid-cols-3 gap-4 mt-5"> */}
      <div className="md:flex w-full mt-5">
        <img
          className="mr-[-200px] z-10 md:block hidden w-[700px] "
          src={feature1.src}
          alt=""
        />
        <img className="z-0" src={feature2.src} alt="" />
      </div>
      {/* <div className="col-span-2">

  </div>

</div> */}

      <div className="  grid md:grid-cols-3 grid-cols-1 mx-auto gap-5  py-10  rounded-md">
        {data.map((item, key) => (
          <StatsCard key={key} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Feature;
