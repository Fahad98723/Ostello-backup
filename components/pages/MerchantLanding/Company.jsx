import React from "react";
import images1 from "../../../assets/Pages/MerchantLanding/arose.png";
import images2 from "../../../assets/Pages/MerchantLanding/logo_transparent.png";
import images3 from "../../../assets/Pages/MerchantLanding/-swami-vivekanand-institute--10583082-3c42ba6f.jpeg";
import images4 from "../../../assets/Pages/MerchantLanding/chemtime.png";
import images5 from "../../../assets/Pages/MerchantLanding/solutionacademy.jpeg";
import images6 from "../../../assets/Pages/MerchantLanding/Companylogo (6).svg";
import Carousel from "react-elastic-carousel";
import useScreenWidth from "../../hooks/useScreenWidth";

const Company = ({usingFor}) => {
  const data = [
    { id: 1, image: images1 },
    { id: 2, image: images2 },
    { id: 3, image: images3 },
    { id: 4, image: images4 },
    { id: 5, image: images5 },
  ];
  const { screenWidth } = useScreenWidth();

  return (
    <div className="md:p-10 p-5 container mx-auto text-center">
      {usingFor === "mentor" ?
      <p className="text-center text-[#1B1B1B] text-[54px] mt-5 mb-5">
      Over <span className="font-bold">200 companies</span> joined us
      </p>
      :
      <p className="text-center text-[#667085] text-[16px]">
        Join 4,000+ companies already growing
      </p>}
      {/* <div className='grid md:grid-cols-3 grid-cols-1 md:gap-0 gap-5  mt-5 md:px-10 text-center'> */}
      <div className="md:px-10 mt-20 ">
        <Carousel
          itemsToShow={4}
          showArrows={true}
          //  showArrows={screenWidth > 768 && data.length > 1 ? true : false}
          enableAutoPlay={false}
          autoPlaySpeed={3000}
          pagination={true}
          renderPagination={({ pages, activePage, onClick }) => {
            return (
              <div className="flex items-center space-evenly space-x-2 mt-3 ">
                {pages?.map((page, i) => {
                  const isActivePage = activePage === page;
                  return (
                    <div
                      className={`cursor-pointer  h-2 rounded-lg my-5 transition-all duration-500 ease-in-out ${
                        isActivePage
                          ? "bg-primary md:w-24 w-16 "
                          : "bg-gray/20 w-6"
                      }`}
                      key={i}
                      onClick={() => onClick(page)}
                    />
                  );
                })}
              </div>
            );
          }}
        >
          {data?.map((item, i) => (
            <div key={i} className="w-full">
              <img
                className="w-[80px] md:w-[200px] h-[80px] md:h-[200px]"
                src={item.image.src}
                alt=""
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Company;
