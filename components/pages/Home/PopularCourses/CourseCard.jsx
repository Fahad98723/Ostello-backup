import { useState, useEffect } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import {
  ArrowRightOutlined,
  HeartFilled,
  HeartOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import { AiOutlineRise, AiFillStar, AiOutlineShareAlt } from "react-icons/ai";
import { IoCashOutline } from "react-icons/io5";
import { RiTimerLine } from "react-icons/ri";

import offlineIndicator from "../../../../assets/images/icons/offlineIndicator.svg";
import onlineIndicator from "../../../../assets/images/icons/onlineIndicator.svg";
import hybridIndicator from "../../../../assets/images/icons/hybridIndicator.svg";

import defaultImage from "../../../../assets/images/courseImg.png";
import SharePopup from "../../../UI/SharePopup";
import { titleToUrl } from "../../../../utils/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { Host_ORIGIN } from "../../../../utils/constant";

import emiIcon from "../../../../assets/icons/emi.svg";
import enrolledIcon from "../../../../assets/icons/enrolled.svg";
import locationIcon from "../../../../assets/icons/location.svg";
import { useDispatch, useSelector } from "react-redux";
import { institutesSelector } from "../../../../redux/slices/instituteSlice";

const ShareIcon = <AiOutlineShareAlt />;
const StarIcon = <AiFillStar />;
const EmiIcon = <IoCashOutline />;
const ArrowIcon = <AiOutlineRise />;
const TimerIcon = <RiTimerLine />;

// Need to understand...

// grossprice: number
// discountprice: number
// minimumprice: number
// effectiveprice: number

// approval === 1 === approved

export default function CourseCard({
  approval,
  category,
  description,
  effectiveprice,
  discoutprice,
  duration,
  emi,
  faculties,
  faqs,
  grossprice,
  highlights,
  id,
  images,
  institute,
  minimumprice,
  mode,
  name,
  objetives,
  rating,
  ratingCount,
  requestApproval,
  studentsenrolled,
  syllabus,
  videos,
  classtype,
  promode,
  slug,
  slugId,
  slugUrl,
  locations,
  pricingdetails,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [open, setOpen] = useState(false);
  const imageURL = images?.[0]?.key
    ? `https://cdn.ostello.co.in/${images?.[0]?.key}`
    : defaultImage?.src;
  const router = useRouter();

  const style = {
    color: "#767676",
    margin: "4px 0",
  };

  const getClassType = (num) => {
    if (num === 1) {
      return "Online";
    }
    if (num === 2) {
      return "Offline";
    }
    if (num === 3) {
      return "Hybrid";
    }
  };

  const { currentInstitute } = useSelector(institutesSelector);

  const { area, city } =
    institute?.locations?.[0] || currentInstitute?.locations?.[0];

  const course_url = `/institute/${titleToUrl(
    institute?.name
  )}/course/${id}/${name}
   
    
    `;

  const coupon = "50% off | Use WELCOME50";

  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const handleSelect = (e) => {
    e.preventDefault();
    setSelected(e.target.value);
    setError("");
  };

  const [priceRef, setPriceRef] = useState("");
  const [effPrice, setEffPrice] = useState("");
  const [emiPrice, setEmiPrice] = useState("");
  const [grossPrice, setGrossPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [minimumPrice, setMinimumPrice] = useState("");

  useEffect(() => {
    if (pricingdetails?.yearly?.grossprice > 0) {
      setEffPrice(pricingdetails?.yearly?.effectiveprice);
      setGrossPrice(pricingdetails?.yearly?.grossprice);
      setEmiPrice(pricingdetails?.yearly?.emi);
      setDiscountPrice(pricingdetails?.yearly?.discountprice);
      setMinimumPrice(pricingdetails?.yearly?.minimumprice);
    }

    if (pricingdetails?.halfYearly?.grossprice > 0) {
      setEffPrice(pricingdetails?.halfYearly?.effectiveprice);
      setGrossPrice(pricingdetails?.halfYearly?.grossprice);
      setEmiPrice(pricingdetails?.halfYearly?.emi);
      setDiscountPrice(pricingdetails?.halfYearly?.discountprice);
      setMinimumPrice(pricingdetails?.halfYearly?.minimumprice);
    }

    if (pricingdetails?.monthly?.grossprice > 0) {
      setEffPrice(pricingdetails?.monthly?.effectiveprice);
      setGrossPrice(pricingdetails?.monthly?.grossprice);
      setEmiPrice(pricingdetails?.monthly?.emi);
      setDiscountPrice(pricingdetails?.monthly?.discountprice);
      setMinimumPrice(pricingdetails?.monthly?.minimumprice);
    }

    if (pricingdetails?.oneTime?.grossprice > 0) {
      setEffPrice(pricingdetails?.oneTime?.effectiveprice);
      setGrossPrice(pricingdetails?.oneTime?.grossprice);
      setEmiPrice(pricingdetails?.oneTime?.emi);
      setDiscountPrice(pricingdetails?.oneTime?.discountprice);
      setMinimumPrice(pricingdetails?.oneTime?.minimumprice);
    }
    if (
      !pricingdetails?.yearly?.effectiveprice &&
      !pricingdetails?.halfYearly?.effectiveprice &&
      !pricingdetails?.monthly?.effectiveprice &&
      !pricingdetails?.oneTime?.effectiveprice
    ) {
      // setPriceRef('')
      setEffPrice(effectiveprice);
      setGrossPrice(grossprice);
      setEmiPrice(emi);
      setMinimumPrice(minimumprice);
    }
  }, [
    priceRef,
    pricingdetails?.yearly,
    pricingdetails?.halfYearly,
    pricingdetails?.monthly,
    pricingdetails?.oneTime,
  ]);

  return (
    // <div className='mx-auto pr-3'>
    //   {promode ? (
    //     <Badge.Ribbon
    //       className='mt-3 '
    //       color='volcano'
    //       placement='start'
    //       text='PRO'
    //     >
    //       <div
    //         key={id}
    //         className='single-card rounded-3xl mb-12 relative w-[280px] sm:w-300px md:w-[370px] max-w-[380px] transition-all duration-300 ease-in-out  shadow-4xl  lg:h-[400px] hover:shadow-[#7D23E0]/20  hover:shadow-3xl hover:scale-110  mx-2 '
    //       >
    //         <div onClick={() => router.push(course_url)} passHref>
    //           <img
    //             src={imageURL}
    //             alt={name}
    //             className='w-full h-[160px] rounded-t-3xl object-cover'
    //           />
    //           <div
    //             style={{
    //               backdropFilter: 'blur(20px)',
    //               background: 'rgba(0, 0, 0, 0.4)',
    //             }}
    //             className='absolute bottom-0 w-full flex bg-black/40 bg:blur-xl'
    //           >
    //             <p className='ml-auto px-2 flex space-x-2 text-white '>
    //               {
    //                 <img
    //                   src={
    //                     classtype === 1
    //                       ? onlineIndicator
    //                       : classtype === 2
    //                       ? offlineIndicator
    //                       : hybridIndicator
    //                   }
    //                   alt=''
    //                 />
    //               }
    //               <span>{getClassType(classtype)}</span>
    //             </p>
    //           </div>
    //         </div>
    //         <div
    //           onClick={(e) => {
    //             setIsLiked(!isLiked)
    //           }}
    //           style={{
    //             color: '#767676',
    //             boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    //           }}
    //           className={`lg:text-2xl text-2xl h-10 w-10  absolute top-2 right-0  bg-white flex items-center justify-center rounded-full active:opacity-75 cursor-pointer  ${
    //             isLiked && 'text-[#FF0000]-500'
    //           }`}
    //         >
    //           {isLiked ? (
    //             <HeartFilled className='text-[#FF0000]-500 flex items-center ' />
    //           ) : (
    //             <HeartOutlined className='flex items-center' />
    //           )}
    //         </div>
    //         <div className='px-5 py-4'>
    //           <div className='flex justify-between items-center'>
    //             <div className=''>
    //               <Link legacyBehavior prefetch={false}
    //                 href={`/institute/${titleToUrl(institute?.name)}`}
    //                 passHref
    //               >
    //                 <h4
    //                   style={style}
    //                   className='font-medium text-sm md:text-lg hover:opacity-70 cursor-pointer truncate'
    //                 >
    //                   {institute?.name}
    //                 </h4>
    //               </Link>
    //               <Link legacyBehavior prefetch={false} href={course_url} passHref>
    //                 <h5 className='font-semibold text-sm md:text-lg hover:opacity-70 cursor-pointer truncate '>
    //                   {name}
    //                 </h5>
    //               </Link>
    //             </div>
    //             <button
    //               onClick={(e) => {
    //                 e.stopPropagation()
    //                 setOpen(true)
    //               }}
    //               className='rounded-full  text-lg md:text-2xl p-2 shadow-4xl hover:shadow-primary transition-all duration-300 ease-linear'
    //             >
    //               {ShareIcon}
    //             </button>
    //           </div>
    //           <SharePopup
    //             TextToCopy={course_url}
    //             open={open}
    //             onClose={() => setOpen(false)}
    //           />
    //           <div className='md:flex items-center hidden'>
    //             {' '}
    //             <span style={{ color: '#44DDFF' }} className='mr-2'>
    //               {TimerIcon}
    //             </span>
    //             <span style={style}>
    //               {duration?.split(',')[0]} {duration?.split(',')[1]}
    //             </span>
    //           </div>
    //           <div className='md:flex items-center hidden'>
    //             {' '}
    //             <span className='mr-2 bg-primary text-white rounded-full'>
    //               {ArrowIcon}
    //             </span>{' '}
    //             <span style={style}>
    //               {studentsenrolled || 0}+ Students joined recently
    //             </span>
    //           </div>
    //           <div className='flex justify-between'>
    //             <div className='hidden md:flex items-center'>
    //               <span style={{ color: '#0D9F1C' }} className='mr-2'>
    //                 {EmiIcon}
    //               </span>
    //               <span style={style}> Emi {emi}</span>
    //             </div>
    //             <div className='flex items-center'>
    //               <div
    //                 className='flex items-center text-white rounded-md  px-2 font-semibold  my-2 md:mt-0 text-xl '
    //                 style={{ backgroundColor: '#FFD130' }}
    //               >
    //                 <span className='mr-1'>{ratings || 0}</span>
    //                 <span>{StarIcon}</span>
    //               </div>
    //               <span
    //                 className='block md:hidden ml-3 text-sm '
    //                 style={{ color: '#BDBDBD' }}
    //               >
    //                 {ratingCount || 0}
    //               </span>
    //             </div>
    //           </div>
    //           <div className='flex justify-between items-center'>
    //             <div className='flex flex-row md:flex-col items-center md:block '>
    //               <p className='text-black font-semibold text-xl md:text-2xl mr-2 md:mr-0 '>
    //                 Rs. {effectiveprice}
    //               </p>
    //               <span className='text-base'>
    //                 <p
    //                   className='line-through text-xs '
    //                   style={{ color: '#E46060' }}
    //                 >
    //                   Rs. {grossprice}
    //                 </p>
    //               </span>
    //             </div>
    //             <Link legacyBehavior prefetch={false}
    //               href={course_url}
    //               className='items-center text-primary text-lg space-x-2 md:flex active:opacity-75 hidden'
    //               passHref
    //             >
    //               <span>
    //                 view details{' '}
    //                 <BsArrowRightCircle className='flex items-center' />{' '}
    //               </span>
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </Badge.Ribbon>
    //   ) : (
    //     <div
    //       key={id}
    //       className='single-card rounded-3xl mb-12 relative mx-5 w-[280px] sm:w-300px md:w-[370px] max-w-[380px] transition-all duration-300 ease-in-out  shadow-4xl mr-3 lg:h-[400px] hover:shadow-[#7D23E0]/20  hover:shadow-3xl hover:scale-105 '
    //     >
    //       <div onClick={() => router.push(course_url)} className='relative '>
    //         <img
    //           src={imageURL || defaultImage}
    //           alt={name}
    //           className='w-full h-[160px] rounded-t-3xl object-cover'
    //         />
    //         <div
    //           style={{
    //             backdropFilter: 'blur(20px)',
    //             background: 'rgba(0, 0, 0, 0.4)',
    //           }}
    //           className='absolute bottom-0 w-full flex bg-black/40 bg:blur-xl'
    //         >
    //           <p className='ml-auto px-2 flex space-x-2 text-white '>
    //             {
    //               <img
    //                 src={
    //                   classtype === 1
    //                     ? onlineIndicator
    //                     : classtype === 2
    //                     ? offlineIndicator
    //                     : hybridIndicator
    //                 }
    //                 alt=''
    //               />
    //             }
    //             <span>{getClassType(classtype)}</span>
    //           </p>
    //         </div>
    //       </div>
    //       <div
    //         onClick={(e) => {
    //           setIsLiked(!isLiked)
    //         }}
    //         style={{
    //           color: '#767676',
    //           boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    //         }}
    //         className={`lg:text-2xl text-2xl h-10 w-10   absolute top-2 right-0 mr-4 mt-4 bg-white flex items-center justify-center rounded-full active:opacity-75 cursor-pointer  ${
    //           isLiked && 'text-[#FF0000]-500'
    //         }`}
    //       >
    //         {isLiked ? (
    //           <HeartFilled className='text-[#FF0000]-500 flex items-center ' />
    //         ) : (
    //           <HeartOutlined className='flex items-center' />
    //         )}
    //       </div>
    //       <div className='px-5 py-4'>
    //         <div className='flex justify-between items-center'>
    //           <div>
    //             <Link legacyBehavior prefetch={false}
    //               href={`/institute/${titleToUrl(institute?.name)}`}
    //               passHref
    //             >
    //               <h4
    //                 style={style}
    //                 className='font-medium text-sm md:text-lg  hover:opacity-70 cursor-pointer truncate '
    //               >
    //                 {institute?.name}
    //               </h4>
    //             </Link>
    //             <Link legacyBehavior prefetch={false} href={course_url} passHref>
    //               <h5 className='font-semibold text-base hover:opacity-70 cursor-pointer truncate '>
    //                 {name}
    //               </h5>
    //             </Link>
    //           </div>
    //           <button
    //             onClick={(e) => {
    //               e.stopPropagation()
    //               setOpen(true)
    //             }}
    //             className='rounded-full  text-lg md:text-2xl p-2 shadow-4xl hover:shadow-primary transition-all duration-300 ease-linear'
    //           >
    //             {ShareIcon}
    //           </button>
    //         </div>
    //         <SharePopup
    //           TextToCopy={`${Host_ORIGIN}${course_url}`}
    //           open={open}
    //           onClose={() => setOpen(false)}
    //         />
    //         <div className='md:flex items-center hidden'>
    //           {' '}
    //           <span style={{ color: '#44DDFF' }} className='mr-2'>
    //             {TimerIcon}
    //           </span>
    //           <span style={style}>
    //             {duration?.split(',')[0]} {duration?.split(',')[1]}
    //           </span>
    //         </div>
    //         <div className='md:flex items-center hidden'>
    //           {' '}
    //           <span className='mr-2 bg-primary text-white rounded-full'>
    //             {ArrowIcon}
    //           </span>{' '}
    //           <span style={style}>
    //             {studentsenrolled || 0}+ Students joined recently
    //           </span>
    //         </div>
    //         <div className='flex justify-between'>
    //           <div className='hidden md:flex items-center'>
    //             <span style={{ color: '#0D9F1C' }} className='mr-2'>
    //               {EmiIcon}
    //             </span>
    //             <span style={style}> Emi {emi}</span>
    //           </div>
    //           <div className='flex items-center'>
    //             <div
    //               className='flex items-center text-white rounded-md  px-2 font-semibold  my-2 md:mt-0 text-xl '
    //               style={{ backgroundColor: '#FFD130' }}
    //             >
    //               <span className='mr-1'>{ratings || 0}</span>
    //               <span>{StarIcon}</span>
    //             </div>
    //             <span
    //               className='block md:hidden ml-3 text-sm '
    //               style={{ color: '#BDBDBD' }}
    //             >
    //               {ratingCount || 0}
    //             </span>
    //           </div>
    //         </div>
    //         <div className='flex justify-between items-center'>
    //           <div className='flex flex-row md:flex-col items-center md:block '>
    //             <p className='text-light-black font-semibold text-xl md:text-2xl mr-2 md:mr-0 '>
    //               Rs. {effectiveprice}
    //             </p>
    //             <span className='text-base'>
    //               <p
    //                 className='line-through text-xs '
    //                 style={{ color: '#E46060' }}
    //               >
    //                 Rs. {grossprice}
    //               </p>
    //             </span>
    //           </div>
    //           <Link legacyBehavior prefetch={false} href={course_url}>
    //             <a
    //               href=''
    //               className='items-center text-primary text-lg space-x-2 md:flex active:opacity-75 hidden'
    //               passHref
    //             >
    //               <span className='text-primary'>View details </span>
    //               <BsArrowRightCircle size={20} className='flex items-center' />
    //             </a>
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>

    <>
      <div
        style={{
          boxShadow: "0px 0px 38.7368px -7.74737px rgba(125, 35, 224, 0.15)",
        }}
        className=" hover:scale-105  duration-300  relative rounded-xl  sm:w-[370px] w-full mx-auto min-h-[450px]  h-full "
      >
        {/* <div
        onClick={() => {
          copyToClipboard('WELCOME50')
        }}
        className='absolute top-10 right-0 bg-primary px-4 py-1 text-white cursor-pointer'
      >
        {coupon}
      </div> */}
        <div className="select-none  ">
          <Link legacyBehavior prefetch={false} href={course_url}>
            <div className="flex items-center justify-center p-4 ">
              <img
                src={imageURL}
                className="w-full h-[160px]  rounded-xl relative"
                alt=""
              />
              <div className="bg-[#FDB022] absolute top-6 left-5 flex text-white items-center px-2 py-1 text-[12px] rounded-3xl ">
                <StarFilled />
                <p className="ml-2">Recommended</p>
              </div>

              <div
                onClick={(e) => {
                  setIsLiked((prv) => !prv);
                  e.stopPropagation();
                }}
                className={`rounded-full text-2xl shadow-xl bg-white absolute top-6 right-5 text-gray flex items-center justify-center cursor-pointer p-1 `}
              >
                {isLiked ? (
                  <HeartFilled className="text-[#FF0000] flex items-center " />
                ) : (
                  <HeartOutlined className="flex items-center" />
                )}
              </div>
            </div>
          </Link>

          <div
            onClick={() => {
              copyToClipboard("WELCOME50");
            }}
            className=" bg-primary px-4 py-1 text-white cursor-pointer"
          >
            {coupon}
          </div>

          <div className="p-4 ">
            <div>
              <div className="flex justify-between items-center  ">
                {/* <Link legacyBehavior prefetch={false} href={slugUrl}> */}

                <h1 className="text-2xl font-bold my-2">
                  {institute.name || currentInstitute.name}
                </h1>

                {/* </Link> */}

                <div
                  className={` bg-green-600 border text-white flex items-center h-fit w-fit justify-center space-x-1 px-2 rounded-md font-bold text-lg`}
                >
                  <p className="">{rating}.0</p>
                  <StarFilled />
                </div>
              </div>
            </div>

            <div>
              <select
                onChange={(e) => handleSelect(e)}
                value={selected}
                className={`my-2 form-select   marker:block w-full px-4 pr-8 py-2 text-base font-normal text-slate bg-white  bg-no-repeat border-2 border-solid ${
                  error.length === 0 ? "border-light-gray" : "border-red"
                } rounded-xl  first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
              >
                <option className="w-9/12" selected value="" disabled>
                  {name}
                </option>
                {currentInstitute?.courses?.map((course, idx) => {
                  return (
                    <option key={idx} className="w-full text-black">
                      {course.name}
                    </option>
                  );
                })}
              </select>
              <div className=" ">
                <div className="text-gray text-[16px]">
                  <p className=" font-bold"> {category?.name}</p>
                  {category?.classes?.length || category?.exams?.length ? (
                    <p className="">
                      {" "}
                      {category?.classes.length
                        ? category?.classes
                        : category?.exams}
                    </p>
                  ) : (
                    ""
                  )}
                  {/* <p
            className="line-through"
            style={{ color: "#E46060", textDecorationLine: "line-through" }}
          >
            Rs.{course.grossprice}
          </p> */}
                </div>
              </div>
            </div>

            <div className="text-gray text-[16px]">
              <div className="flex space-x-2 my-2">
                <img src={enrolledIcon.src} alt="" />
                <p>{studentsenrolled || 0} + Students joined recently</p>
              </div>
              <div className="flex space-x-2 my-2">
                <img src={emiIcon.src} alt="" />
                <p> Emi Available</p>
              </div>
              <div className="flex space-x-2 my-2">
                <img src={locationIcon.src} alt="" />
                <p>
                  {area} , {city}
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <div className="flex flex-row md:flex-col items-center md:block ">
                <p className="text-[#7F56D9] font-semibold text-xl md:text-2xl mr-2 md:mr-0 ">
                  Rs. {effPrice}
                </p>
              </div>
              <Link legacyBehavior prefetch={false} href={course_url}>
                <div
                  className="items-center text-black text-lg space-x-2 md:flex active:opacity-75 hidden"
                >
                  <span className="text-black">View details </span>
                  <BsArrowRightCircle size={20} className="flex items-center" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
