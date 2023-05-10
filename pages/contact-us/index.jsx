import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import MetaHelmet from "../../components/MetaHelmet";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { BiMap } from "react-icons/bi";
import facebook from "../../assets/contact-us/facebook.svg";
import linkedin from "../../assets/contact-us/linkedin.svg";
import instagram from "../../assets/contact-us/instagram.svg";
import twitter from "../../assets/contact-us/twitter.svg";
import { useDispatch } from "react-redux";
import { setUserLocation } from "../../redux/slices/UserAnalytics";
import dynamic from "next/dynamic";
// import OstelloMap from "../../components/OstelloMaps";
const Navbar = dynamic(
  () => {
    return import("../../components/pages/HomeLanding/Header/Navbar");
  },
  { ssr: false }
);


const Footer = dynamic(
  () => {
    return import("../../components/layout/Footer");
  },
  { ssr: false }
);

export const socialLinks = [
  {
    title: "instagram",
    img: instagram.src,
    url: "https://www.instagram.com/ostelloindia/",
  },
  {
    title: "Twitter",
    img: twitter.src,
    url: "https://twitter.com/ostelloindia",
  },
  {
    title: "LinkedIn",
    img: linkedin.src,
    url: "https://www.linkedin.com/company/ostello-india/",
  },
  {
    title: "Facebook",
    img: facebook.src,
    url: "https://www.facebook.com/ostellocare",
  },
  // {
  //   title: 'Github',
  //   img: github.src,
  //   url: 'https://github.com/',
  // },
  // {
  //   title: 'Twitch',
  //   img: twitch.src,
  //   url: 'https://twitch.com/',
  // },
  // {
  //   title: 'Dribble',
  //   img: dribble.src,
  //   url: 'https://dribble.com/',
  // },
];

const ContactUs = ({ meta }) => {
  const [value, setValue] = useState("+91");
  const mobileNumRef = useRef(null);
  const emailRef = useRef(null);
  const [name, setName] = useState(false);
  const [email, setEmail] = useState(false);
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState(false);
  const [checkNumber, setCheckNumber] = useState(false);
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
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
  const submitHandler = () => {
    firstNameValue.length && lastNameValue.length < 1
      ? setName(true)
      : setName(false);
    emailValue.length < 1 ? setEmail(true) : setEmail(false);
    messageValue.length < 1 ? setMessage(true) : setMessage(false);
    checked ? setChecked(true) : setChecked(false);
    value.length < 1 ? setCheckNumber(true) : setCheckNumber(false);

    toast.success("Message has been sent!");
  };
  return (
    <>
      <MetaHelmet
        title={meta.title}
        description={meta.description}
        link={meta.link}
      />
      <div className=" w-full md:max-w-[1350px] mx-auto bg-white mx-auto shadow">
        <Navbar />
      </div>
      <main className="mt-8">
        <section className="lg:pl-24 lg:mb-28 flex justify-center lg:flex-row items-center bg-[#ffff] ">
          <div className="max-w-md w-full space-y-3">
            <div>
              <p className="mt-3 text-primary text-center font-bold">
                Contact Us
              </p>
              <h2 className="mt-3 text-center text-4xl font-extrabold text-gray-900">
                Get In Touch
              </h2>
              <p className="mt-3 text-center text-lg text-[#667085]">
                We’d love to hear from you. Please fill out this form.
              </p>
            </div>
            <div className="block p-3 rounded-[10px] bg-white max-w-md">
              <form>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label
                      htmlFor="first-name"
                      className="block text-gray-500 pb-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-[#D0D5DD]
          rounded-[10px]
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                      placeholder="First name"
                      onChange={(e) => {
                        setFirstNameValue(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="last-name"
                      className="block text-gray-500 pb-2"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-[#D0D5DD]
          rounded-[10px]
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                      placeholder="Last name"
                      onChange={(e) => {
                        setLastNameValue(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="email"
                    className="block text-gray-500 pb-2 mt-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-[#D0D5DD]
        rounded-[10px]
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                    placeholder="Email address"
                    onChange={(e) => {
                      setEmailValue(e.target.value);
                    }}
                  />
                </div>
                <label
                  htmlFor="phone"
                  className="block text-gray-500 pb-2 mt-2"
                >
                  Phone Number
                </label>
                <div
                  className="px-3
          py-1.5 h-10 rounded-[10px] border border-[#D0D5DD] lg:w-5/5 flex items-center text-lg"
                >
                  <PhoneInputWithCountrySelect
                    className="w-10"
                    placeholder="Enter your mobile number"
                    defaultCountry="IN"
                    value={value}
                    onChange={setValue}
                    international
                  />
                  <p className="py-2">{value}</p>
                  <p className="px-2 text-3xl text-gray">|</p>
                  <input
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-"].includes(evt.key) &&
                      evt.preventDefault()
                    }
                    type="number"
                    ref={mobileNumRef}
                    className="w-full outline-none focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none "
                    placeholder="Enter Your Number"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="first-name"
                    className="block text-gray-500 font-base pb-2 mt-2"
                  >
                    Message
                  </label>
                  <textarea
                    type="text-area"
                    rows="3"
                    className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-[#D0D5DD]
          rounded-[10px]
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                    placeholder=""
                    onChange={(e) => {
                      setMessageValue(e.target.value);
                    }}
                  />
                </div>
                <div
                  className="px-3
          py-3 form-group form-check md:text-center"
                >
                  <input
                    onChange={() => {
                      setChecked(!checked);
                    }}
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-[#D0D5DD] rounded[10px] bg-white checked:bg-primary checked:border-primary focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                    checked={checked}
                  />
                  <label
                    className="form-check-label inline-block text-gray-500"
                    htmlFor="Ostello Policy"
                  >
                    You agree to our friendly{" "}
                    <span className="underline">privacy policy</span>.
                  </label>
                </div>
                <button
                  onClick={submitHandler}
                  type="submit"
                  className="
      w-full
      px-6
      py-2.5
      bg-primary
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      border border-solid border-primary
      rounded-[10px]
      shadow-md
      hover:bg-white hover:text-primary hover:shadow-lg hover:border
      focus:bg-white focus:text-primary focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-primary active:shadow-lg
      transition
      duration-150
      ease-in-out"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
        <section className="ml-5 flex justify-evenly text-[#414141] pt-10 bg-[#F9FAFB] lg:flex-row flex-col mx-5 lg:space-x-5 xl:mx-auto md:mx-10">
          <div className="grid grid-cols-6 ">
            <div className="md:col-span-3 col-span-6 md:mr-12">
              <p className="mt-3 text-primary font-bold">Contact Us</p>
              <h1 className=" leading-[48px] text-[40px] text-[#101828] font-bold">
                Chat to our friendly team
              </h1>
              <p className="mt-3 text-lg text-[#667085]">
                We’d love to hear from you! Please get in touch.
              </p>
              <div className="rounded-[10px] ml-0 mt-10 w-[50vh] border-solid border border-primary">
                {/* <OstelloMap /> */}
              </div>
            </div>
            <div className="md:col-span-3 col-span-6">
              <div className="container lg:flex flex-row justify-around lg:gap-10">
                <div className=" lg:flex flex-col items-start w-30 pb-5">
                  <div
                    onClick={() =>
                      typeof window !== "undefined" &&
                      (window.location = "https://g.page/r/CciI9ETJBe0KEAE")
                    }
                    className="flex mt-10 gap-3 cursor-pointer"
                  >
                    <BiMap className="text-primary text-2xl" />
                    <p>Delhi</p>
                  </div>
                  <div className="ml-9 mt-1">
                    <p>
                      Block-A - 1/57 Jangpura Extention <br /> New Delhi -
                      110014
                    </p>
                  </div>
                  {/* <div
                  onClick={() =>
                    typeof window !== 'undefined' &&
                    (window.location = 'https://g.page/r/CciI9ETJBe0KEAE')
                  }
                  className='flex mt-3 gap-3 cursor-pointer'
                >
                  <BiMap className='text-primary text-2xl' />
                  <p>
                    Bangalore
                  </p>
                </div> */}
                  {/* <div className="ml-9 mt-1">
                <p>
                    Block-A - 1/57 Jangpura Extention <br /> New Delhi - 110014
                  </p>
                </div> */}
                  <div className=" lg:flex flex-col pt-40 items-start w-30 pb-5">
                    <p className="mt-10 pt-5 text-lg text-[#667085]">
                      Our social presence
                    </p>
                    <div className="flex space-x-5 items-center mt-5">
                      {socialLinks.map((item, key) => (
                        <>
                          <Link
                            className="cursor-pointer"
                            legacyBehavior
                            prefetch={false}
                            href={item.url}
                          >
                            <img
                              key={key}
                              className=""
                              src={item.img}
                              alt={item.title}
                            />
                          </Link>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F4EBFF] pt-6 px-6 lg:pt-16 ">
          <div className="md:max-w-[1200px] mx-auto">
            <div className="md:flex justify-between">
              <div className="">
                <p className="text-xl font-semibold">Join our newsletter</p>
                <p className="text-base">
                  We’ll send you a nice letter once per week. No spam.
                </p>
              </div>

              <div className="my-3 h-[140px]">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="py-4 px-2 join w-80 my-1 border-1 border-[#D0D5DD] outline-none mr-2 rounded-xl"
                />
                <button className="px-6 py-3 shadow-md my-1 font-medium text-base text-white rounded-lg bg-primary">
                  Subscribe
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

export default ContactUs;

export const getStaticProps = async () => {
  const meta = {
    title: "Contact Us - ostello.co.in",
    description:
      "For any information or query regarding any issue that you face, contact us at ostello.co.in",
    link: "https://www.ostello.co.in/contact-us",
  };
  // 
  return {
    props: {
      meta,
    },
  };
};
