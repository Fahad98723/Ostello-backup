import React from "react";
import useScreenWidth from "../../../components/hooks/useScreenWidth";
import banner from "../../../assets/Pages/SkillPage/secondBanner.png";
import onlineorofflinebanner from "../../../assets/Pages/SkillPage/onlineoroffline.png";
import mobileBanner from "../../../assets/Pages/SkillPage/mobileSecondBanner.png";
const Mode = () => {
  const style = {
    fontFamily: `'Niconne', cursive`,
    fontWeight: 700,
    textShadow: `5px 5px 0px #eb452b
               
  
              `,
  };
  const { screenWidth } = useScreenWidth();

  

  return (
    <div className="py-10">
      <div
        style={{
          backgroundImage: `url(${
             onlineorofflinebanner.src 
          })`,
        }}
        // className="h-[300px] md:hidden block   rounded-3xl "
        className=" bg-no-repeat bg-cover h-full md:py-20 pt-20 pb-56 md:bg-center h-[450px] bg-center-center w-full h-full "
      >
        {/* <div className="md:px-10 px-5 md:pt-20 md:text-left text-center">
          <p className="md:text-[20px] text-[18px] text-[#ADF0FF]">
            We offer Different Mode
          </p>
          <p
            style={style}
            className="md:text-[50px] text-[35px] italic  text-[#ADF0FF]"
          >
            Online/offline
          </p>
          <p className="md:text-[18px] text-[16px] italic  text-[#ADF0FF]">
            Your Learning is our priority, Let’s Grow together
          </p>
          <button className="text-[#1344DB] font-bold text-[16px] bg-[#F4DE12] py-2 px-4 my-3">
            Learn
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Mode;
