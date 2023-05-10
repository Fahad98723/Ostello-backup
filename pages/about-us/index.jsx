import Link from "next/link";
import React, { useEffect } from "react";
import image1 from "../../assets/aboutus/image1.jpg";
import image11 from "../../assets/aboutus/image11.jpg";
import image2 from "../../assets/aboutus/image2.png";
import image22 from "../../assets/aboutus/image22.png";
import image3 from "../../assets/aboutus/image3.png";
import image33 from "../../assets/aboutus/image33.png";
import team1 from "../../assets/aboutus/img1.png";
import team2 from "../../assets/aboutus/img2.png";
import team3 from "../../assets/aboutus/img3.png";
import team4 from "../../assets/aboutus/img4.png";
import VisionVector from "../../assets/aboutus/Mask Group.png";
import { AiFillLinkedin, AiOutlineTwitter } from "react-icons/ai";
import { BsPlayCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import Footer from "../../components/layout/Footer";
import MetaHelmet from "../../components/MetaHelmet";
import Navbar from "../../components/pages/HomeLanding/Header/Navbar";
import { setUserLocation } from "../../redux/slices/UserAnalytics";

//site building

const About = ({ meta }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    navigator.geolocation &&
      navigator.geolocation.getCurrentPosition(function (position) {
        dispatch(
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
      });
  });

  return (
    <>
      <MetaHelmet
        title={meta.title}
        description={meta.description}
        link={meta.link}
      />
      <div className="mx-auto md:max-w-[1350px] ">
        <Navbar />
      </div>
      <main className="mt-10">
        <section className=" lg:pl-24 lg:mb-28 pl-8 pt-8 pb-40 flex flex-col-reverse lg:flex-row items-center bg-[#7F56D9] ">
          <div className="2xl:pl-10    mb-10 lg:mb-0 ">
            <p className="text-white md:block hidden  leading-[60px] font-bold text-5xl mb-16">
              Welcome to the world's first Marketplace for Coaching
              Institutions.
            </p>
            <p className="text-white md:hidden w-3/4 font-bold text-3xl mb-7">
              Welcome to the world's first Marketplace for Coaching
              Institutions.
            </p>

            <p className=" text-sm xl:text-lg  text-white font-medium  xl:pr-5 ">
              Our team through AI-driven technology has curated a world to
              empower coaching institutions all over India. Compare and choose
              based on your budget, course, demo videos and find the perfect
              institute for you.
            </p>

            <Link legacyBehavior prefetch={false} href={"/merchant"}>
              <p
                className={` flex items-center font-bold text-xl w-[185px]  p-2 lg:px-3 bg-white mt-7 text-[#7F56D9] border-2 rounded-2xl  border-white transition-transform duration-500 ease-in-out hover:shadow-3xl hover:scale-[1.1]  `}
              >
                <BsPlayCircle className="mr-3 text-xl " />
                Watch Video
              </p>
            </Link>
          </div>
          <img
            src={VisionVector.src}
            alt=""
            className="w-full lg:w-2/5 xl:w-2/4 ml-auto mb-10 md:mb-20 lg:mt-12 lg:mb-0  "
          />
        </section>
        <section className=" xl:max-w-[1100px]  Card flex justify-evenly text-[#414141] lg:py-32  p-8 lg:p-12 md:p-5 rounded-3xl lg:flex-row flex-col shadow-[#7ab1dc]/20 shadow-lg bg-[#F9F5FF] mx-5   lg:space-x-5  md:-mt-[180px] -mt-[120px] mb-10 xl:mx-auto md:mx-10">
          <div className="grid grid-cols-6 ">
            <div className="md:col-span-3 col-span-6 md:mr-12">
              <h1 className="text-right leading-[48px] text-[40px] text-[#101828] font-bold">
                In a world that revolves around technology, find your perfect
                guide that leads you to success on Ostello.
              </h1>
            </div>
            <div className="md:col-span-3 col-span-6">
              <h3 className="text-[18px] leading-[28px] text-[#525252] font-medium text-left xl:mt-16 mt-12">
                Our intelligent search driven technology saves hours of your
                time spent on digging up the perfect tutoring class for you.
                Ostello leads you to your perfect institute that satisfies all
                your needs. From surfing through demo classes at their suitable
                locations to offering discounted rates as per you convenience,
                Ostello has it all.
              </h3>
            </div>
          </div>
        </section>

        <section className=" px-6 py-10 lg:pt-16 md:max-w-[1100px] mx-auto">
          <h1 className="text-[#7F56D9] md:text-center font-bold text-4xl  lg:text-5xl mb-6">
            Our Vision
          </h1>
          <p className=" md:text-center text-left font-bold text-base lg:text-md md:mb-10 md:w-2/4 mx-auto">
            We aim to empower people to take control of their career decisions
            and achieve their version of success.
          </p>

          <div className="grid grid-cols-6 md:gap-x-8">
            <div className="md:col-span-2  my-8 col-span-6 relative  group cursor-pointer">
              <div
                style={{
                  background: `linear-gradient(0deg, rgba(0, 0, 0, 0.78) 4.11%, rgba(28, 28, 28, 0.0312) 40.88%) , url(${image3.src})`,
                }}
                className="md:block hidden   bg-no-repeat bg-cover bg-center min-h-[500px] object-fill  w-full mx-auto rounded-3xl relative"
              >
                <div
                  style={{
                    content: "",
                    display: "block",
                    position: "absolute",
                    height: " 0%",
                    width: "100%",
                    bottom: "0",
                    transition: "height 0.5s ease-out",
                    background:
                      "linear-gradient(0deg, #480F87 21.35%, rgba(72, 15, 135, 0) 136.54%)",
                  }}
                  className="group-hover:h-full rounded-3xl"
                ></div>
                <div className="">
                  <div className="absolute ml-auto mr-auto left-0 right-0 bottom-10 text-center text-white">
                    <div className="px-5">
                      <p className="text-white  text-center font-semibold text-4xl">
                        Coaching marketplace
                      </p>
                      <p className="text-center text-lg hidden group-hover:block  mt-5 ">
                        Networking is critical in today's world, and Ostello
                        provides countless possibilities for networking with
                        peers, leveraging knowledge from the journeys of
                        emerging professionals
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#7F56D9] py-[5px] w-3/4  absolute -bottom-1 left-0 right-0 mx-auto rounded-2xl"></div>
              </div>
              <div
                style={{
                  background: `linear-gradient(0deg, rgba(0, 0, 0, 0.78) 4.11%, rgba(28, 28, 28, 0.0312) 40.88%) , url(${image33.src})`,
                }}
                className="h-[300px] md:hidden block  bg-no-repeat bg-cover bg-center rounded-3xl "
              >
                <div className="border-[#7F56D9] absolute  px-5  border-l-8 mt-auto mb-auto top-0 bottom-0 -left-1 rounded h-[250px]"></div>
                <div
                  style={{
                    content: "",
                    display: "block",
                    position: "absolute",
                    height: " 0%",
                    width: "100%",
                    bottom: "0",
                    transition: "height 0.5s ease-out",
                    background:
                      "linear-gradient(0deg, #480F87 21.35%, rgba(72, 15, 135, 0) 136.54%)",
                  }}
                  className="group-hover:h-full rounded-3xl"
                ></div>
                <div className="absolute ml-auto mr-auto group-hover:top-[35%]  left-0 right-0 bottom-10 text-center text-white my-auto">
                  <div className="px-5">
                    <p className="text-white  text-center font-semibold text-4xl">
                      Coaching marketplace
                    </p>
                    <p className="text-center text-lg hidden group-hover:block  mt-5 ">
                      Networking is critical in today's world, and Ostello
                      provides countless possibilities for networking with
                      peers, leveraging knowledge from the journeys of emerging
                      professionals
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 col-span-6  my-8 relative group cursor-pointer">
              <div
                style={{ backgroundImage: `url(${image2.src})` }}
                className="md:block hidden   bg-no-repeat bg-cover bg-center min-h-[500px] object-fill  w-full mx-auto rounded-3xl relative"
              >
                <div
                  style={{
                    content: "",
                    display: "block",
                    position: "absolute",
                    height: " 0%",
                    width: "100%",
                    bottom: "0",
                    transition: "height 0.5s ease-out",
                    background:
                      "linear-gradient(0deg, #480F87 21.35%, rgba(72, 15, 135, 0) 136.54%)",
                  }}
                  className="group-hover:h-full rounded-3xl"
                ></div>
                <div className="">
                  <div className="absolute ml-auto mr-auto left-0 right-0 bottom-10 text-center text-white">
                    <div className="px-5">
                      <p className="text-white  text-center font-semibold text-4xl">
                        Career journey
                      </p>
                      <p className="text-center text-lg hidden group-hover:block  mt-5 ">
                        Networking is critical in today's world, and Ostello
                        provides countless possibilities for networking with
                        peers, leveraging knowledge from the journeys of
                        emerging professionals
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#7F56D9] py-[5px] w-3/4  absolute -bottom-1 left-0 right-0 mx-auto rounded-2xl"></div>
              </div>
              <div
                style={{ backgroundImage: `url(${image22.src})` }}
                className="h-[300px] md:hidden block  bg-no-repeat bg-cover bg-center rounded-3xl "
              >
                <div className="border-[#7F56D9] absolute  px-5  border-l-8 mt-auto mb-auto top-0 bottom-0 -left-1 rounded h-[250px]"></div>
                <div
                  style={{
                    content: "",
                    display: "block",
                    position: "absolute",
                    height: " 0%",
                    width: "100%",
                    bottom: "0",
                    transition: "height 0.5s ease-out",
                    background:
                      "linear-gradient(0deg, #480F87 21.35%, rgba(72, 15, 135, 0) 136.54%)",
                  }}
                  className="group-hover:h-full rounded-3xl"
                ></div>
                <div className="absolute ml-auto mr-auto group-hover:top-[35%]  left-0 right-0 bottom-10 text-center text-white my-auto">
                  <div className="px-5">
                    <p className="text-white  text-center font-semibold text-4xl">
                      Career journey
                    </p>
                    <p className="text-center text-lg hidden group-hover:block  mt-5 ">
                      Networking is critical in today's world, and Ostello
                      provides countless possibilities for networking with
                      peers, leveraging knowledge from the journeys of emerging
                      professionals
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 col-span-6 relative  my-8 group cursor-pointer">
              <div
                style={{ backgroundImage: `url(${image1.src})` }}
                className="md:block hidden   bg-no-repeat bg-cover bg-center min-h-[500px] object-fill  w-full mx-auto rounded-3xl relative"
              >
                <div
                  style={{
                    content: "",
                    display: "block",
                    position: "absolute",
                    height: " 0%",
                    width: "100%",
                    bottom: "0",
                    transition: "height 0.5s ease-out",
                    background:
                      "linear-gradient(0deg, #480F87 21.35%, rgba(72, 15, 135, 0) 136.54%)",
                  }}
                  className="group-hover:h-full rounded-3xl"
                ></div>
                <div className="">
                  <div className="absolute ml-auto mr-auto left-0 right-0 bottom-10 text-center text-white">
                    <div className="px-5">
                      <p className="text-white  text-center font-semibold text-4xl">
                        Peer networking
                      </p>
                      <p className="text-center text-lg hidden group-hover:block  mt-5 ">
                        Networking is critical in today's world, and Ostello
                        provides countless possibilities for networking with
                        peers, leveraging knowledge from the journeys of
                        emerging professionals
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#7F56D9] py-[5px] w-3/4 mx-auto absolute -bottom-1 left-0 right-0 mx-auto rounded-2xl"></div>
              </div>

              <div
                style={{ backgroundImage: `url(${image11.src})` }}
                className="h-[300px] md:hidden block  bg-no-repeat bg-cover bg-center rounded-3xl "
              >
                <div className="border-[#7F56D9] absolute px-5  border-l-8 mt-auto mb-auto top-0 bottom-0 -left-1 rounded h-[250px]"></div>
                <div
                  style={{
                    content: "",
                    display: "block",
                    position: "absolute",
                    height: " 0%",
                    width: "100%",
                    bottom: "0",
                    transition: "height 0.5s ease-out",
                    background:
                      "linear-gradient(0deg, #480F87 21.35%, rgba(72, 15, 135, 0) 136.54%)",
                  }}
                  className="group-hover:h-full rounded-3xl"
                ></div>
                <div className="absolute ml-auto mr-auto group-hover:top-[35%]  left-0 right-0 bottom-10 text-center text-white my-auto">
                  <div className="px-5">
                    <p className="text-white  text-center font-semibold text-4xl">
                      Peer networking
                    </p>
                    <p className="text-center text-lg hidden group-hover:block  mt-5 ">
                      Networking is critical in today's world, and Ostello
                      provides countless possibilities for networking with
                      peers, leveraging knowledge from the journeys of emerging
                      professionals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className=" px-6 py-10 lg:pt-16 md:max-w-[1100px] mx-auto">
          <h1 className="text-[#7F56D9]  font-bold text-4xl  lg:text-5xl mb-6">
            Minds behind Ostello
          </h1>
          <p className="  font-bold text-base lg:text-md mb-10 ">
            Come let us meet the minds that created a better world for
            education.
          </p>

          <div className="grid grid-cols-8  gap-x-5 gap-y-5">
            <div className="md:col-span-2 col-span-8 relative group cursor-pointer">
              <div className="">
                <img
                  className="min-h-[320px] w-full rounded-3xl  relative md:block hidden"
                  src={team1.src}
                  alt=""
                />
                <img
                  className=" w-full rounded-3xl md:hidden block relative "
                  src={team1.src}
                  alt=""
                />
                <div className="absolute bottom-10 left-5 text-white">
                  <p className="text-white   font-semibold text-xl">
                    Rajbir Singh Rajpal
                  </p>
                  <div className="flex text-2xl text-white">
                    {/* <AiOutlineTwitter className="mr-2" /> */}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.linkedin.com/in/rajbir-singh-5ab18276/"
                    >
                      <AiFillLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 col-span-8 relative group cursor-pointer">
              <div className="">
                <img
                  className="min-h-[320px] w-full rounded-3xl relative md:block hidden"
                  src={team4.src}
                  alt=""
                />
                <img
                  className=" w-full rounded-3xl md:hidden block relative "
                  src={team4.src}
                  alt=""
                />
                <div className="absolute bottom-10 left-5 text-white">
                  <p className="text-white   font-semibold text-xl">
                    Roshan Jose
                  </p>
                  <div className="flex text-2xl text-white">
                    <AiOutlineTwitter className="mr-2" />
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.linkedin.com/in/sroshanjose/"
                    >
                      <AiFillLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 col-span-8 relative group cursor-pointer">
              <div className="">
                <img
                  className="min-h-[320px] w-full rounded-3xl relative md:block hidden"
                  src={team2.src}
                  alt=""
                />
                <img
                  className=" w-full rounded-3xl md:hidden block relative "
                  src={team2.src}
                  alt=""
                />
                <div className="absolute bottom-10 left-5 text-white">
                  <p className="text-white   font-semibold text-xl">
                    Rohit Pratap Singh
                  </p>
                  <div className="flex text-2xl text-white">
                    {/* <AiOutlineTwitter className="mr-2" /> */}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.linkedin.com/in/rohitpsingh/"
                    >
                      <AiFillLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 col-span-8 relative group cursor-pointer">
              <div className="">
                <img
                  className="min-h-[320px] w-full rounded-3xl relative md:block hidden"
                  src={team3.src}
                  alt=""
                />
                <img
                  className=" object-fit w-full rounded-3xl md:hidden block relative "
                  src={team3.src}
                  alt=""
                />
                <div className="absolute bottom-10 left-5 text-white">
                  <p className="text-white   font-semibold text-xl">
                    Sarabdeep Singh
                  </p>
                  <div className="flex text-2xl text-white">
                    {/* <AiOutlineTwitter className="mr-2" /> */}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.linkedin.com/in/sarabdeep-singh-66b86666/"
                    >
                      <AiFillLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Adsense
            client={`${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
            slot="3223821993"
            style={{ display: "block", marginTop: "10px" }}
            layout="in-article"
            format="fluid"
          /> */}
        </section>

        <section className="bg-[#F4EBFF] px-6 py-10 lg:pt-16 ">
          <div className="md:max-w-[1200px] mx-auto">
            <div className="md:flex justify-between">
              <div className="">
                <p className="text-xl font-semibold">Join our newsletter</p>
                <p className="text-base">
                  We’ll send you a nice letter once per week. No spam.
                </p>
              </div>

              <div className="my-3">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="py-4 px-2 join w-80 my-1 border-1 border-[#D0D5DD] outline-none mr-2 rounded-xl"
                />
                <button className="px-6 py-3 shadow-md my-1 rounded-lg bg-primary">
                  <p className="font-medium text-base text-white">Subscribe</p>
                </button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default About;

export const getStaticProps = async () => {
  const meta = {
    title: "Get information for about us - Ostello",
    description: "Ostello About us Page. Learn more about Ostello",
    link: "https://www.ostello.co.in/about-us",
  };

  return {
    props: {
      meta,
    },
  };
};
