import React, { useContext, useEffect, useState } from 'react'
import { AiFillStar, AiOutlinePlus } from 'react-icons/ai'
import { RiDeleteBinLine } from 'react-icons/ri'
import CourseImg from '../../assets/courseImg.png'
import NOCourseImg1 from '../../assets/vectors/noCourse1.png'
import DashboardHeader from '../../components/MerchantDashboard/DashboardHeader'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { SidePopupContext } from '../../components/SidePopup/SidePopup'
import { appHost, titleToUrl } from '../../components/utils'
import { host } from '../../util/constant/constant'
import AddCourse from './AddCourse'

const Courses = () => {
  useEffect(() => {
    document.title = 'Courses - Ostello India'

    axios
      .get(`${host}/course`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${typeof window !== 'undefined' && window.localStorage.getItem(
            'ACCESS_TOKEN'
          )}`,
        },
      })
      .then((res) => setCourses(res.data.message))
      .catch((e) => console.error(e))
  }, [])

  const [{ isVisible }, dispatch] = useContext(SidePopupContext)
  const [courses, setCourses] = useState([])
  const [isDeletePop, setIsDeletePop] = useState(false)
  const [isAddCourse, setIsAddCourse] = useState(true)

  function handleDelete(idx) {
    axios
      .delete(`${host}/course?id=${courses[idx].id}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${typeof window !== 'undefined' && window.localStorage.getItem(
            'ACCESS_TOKEN'
          )}`,
        },
      })
      .catch((err) => console.error(err))

    setCourses((prev) => {
      const temp = []

      prev.forEach((c, id) => {
        if (id !== idx) temp.push(c)
      })

      return temp
    })
  }

  const navigate = useNavigate()
  return (
    <React.Fragment>
      <div className='relative lg:w-full '>
        {isDeletePop && (
          <>
            {' '}
            <div
              className='bg-white z-30 rounded-2xl w-80 h-auto py-6  '
              style={{
                position: 'absolute',
                top: '30%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <h1 className='text-black text-center py-6 font-medium'>
                Do you want to delete this <br /> course?
              </h1>
              <div className='flex jusify-center  items-center'>
                <div
                  className='border border-[#C7C7C7] text-[#C7C7C7] rounded-lg py-1 m-auto px-10'
                  onClick={() => {
                    setIsDeletePop(false)
                  }}
                >
                  Cancel
                </div>
                <div className='border bg-primary rounded-lg text-white py-1 m-auto px-10'>
                  Delete
                </div>
              </div>
            </div>
            <div className='absolute opacity-30 lg:hidden z-20 w-full h-full bg-solid'></div>
          </>
        )}
        <section
          className={`${
            isVisible && ' h-screen'
          } flex-1 w-full font-dm-sans overflow-y-scroll space-y-4`}
        >
          {isAddCourse && (
            <div className='flex'>
              <DashboardHeader text={'Your Courses'} />

              <div className=' fixed lg:relative lg:mt-8 bottom-0 lg:right-0 mb-10 lg:mb-0 z-40 lg:flex items-center w-full'>
                <button
                  className='flex items-center  ml-auto w-32 py-2 lg:py-1  mr-10 rounded-full text-white justify-center bg-primary'
                  onClick={(e) => {
                    e.preventDefault()
                    setIsAddCourse(false)
                    dispatch({
                      type: 'SHOW',
                      payload: {
                        title: 'Create New Course',
                        formElement: <AddCourse />,
                        handleSubmit: function (e) {},
                        handleClose: function (e) {
                          dispatch({ type: 'CLOSE' })
                          typeof window !== 'undefined' && window.location.reload(true)
                        },
                      },
                    })
                  }}
                >
                  <AiOutlinePlus className='text-white' />
                  <p className=''>Add Course</p>
                </button>
              </div>
            </div>
          )}

          {courses.length > 0 ? (
            <div className='w-full space-x-2 grid lg:grid-cols-3 gap-4  px-6 lg:px-12 4 lg:py-6  m-auto lg:m-0'>
              {courses.map((course, idx) => (
                <div
                key={idx}
                  onClick={() =>
                    navigate(`/${appHost}/course/${titleToUrl(course.name)}`)
                  }
                >
                  <CourseCard
                    course={course}
                    handleDelete={handleDelete}
                    idx={idx}
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyCourse />
          )}
        </section>
      </div>
    </React.Fragment>
  )
}

export default Courses

export const CourseCard = (props) => {
  const { course, handleDelete, idx } = props
  const navigate = useNavigate()

  return (
    <div
      onClick={() => {
        if (course.approval === 4) {
          navigate(`${appHost}/courses/${titleToUrl(course.name)}`)
        }
      }}
      className='bg-white w-12/12 rounded-3xl cursor-pointer   m-auto lg:m-0'
    >
      <div className='relative z-0'>
        <RiDeleteBinLine
          className='absolute w-7 h-7 z-10 p-1 bg-white mr-2 lg:mr-4 lg:top-4 top-2 right-0 rounded-full text-[#E46060]'
          onClick={() => {
            handleDelete(idx)
          }}
        />
        <img src={CourseImg} alt='' className='w-full  ' />
      </div>

      <div className='flex items-center px-6 py-3'>
        <div className=''>
          <p className='font-bold'>{course.name}</p>
  
        </div>
        <div
          className='flex items-center rounded-lg space-x-1 text-white ml-auto px-2 lg:mr-2'
          style={{ backgroundColor: '#FFD130' }}
        >
          <p className='lg:text-xl'>{course.rating}</p>
          <AiFillStar />
        </div>
      </div>

      <div className='py-3 px-6 flex items-center'>
        <div className=''>
          <p className='text-2xl font-bold'>Rs. {course?.pricingdetails?.monthly?.effectiveprice ||
              course?.pricingdetails?.halfYearly?.effectiveprice ||
              course?.pricingdetails?.yearly?.effectiveprice ||
              course?.effectiveprice}</p>
          <p
            className='line-through'
            style={{ color: '#E46060', textDecorationLine: 'line-through' }}
          >
            Rs.{course?.pricingdetails?.monthly?.grossprice ||
              course?.pricingdetails?.halfYearly?.grossprice ||
              course?.pricingdetails?.yearly?.grossprice ||
              course?.grossprice}
          </p>
        </div>
        <div className='bg-[#E3FFE6] p-2 px-4  ml-auto'>
          <p className='text-[#00B912]'>Approved</p>
        </div>
      </div>
    </div>
  )
}

export const EmptyCourse = () => {
  return (
    <div className='flex flex-col h-screen lg:justify-center items-center '>
      <h1 className='text-[#C2C2C2] text-2xl lg:text-3xl text-center pb-10'>
        Start your journey with <br className='lg:hidden' /> Ostello by{' '}
        <br className='hidden lg:flex' /> adding a <br className='lg:hidden' />{' '}
        Course{' '}
      </h1>
      <div className='flex flex-col lg:flex-row justify-center  items-center  gap-10 w-full '>
        <img
          src={NOCourseImg1}
          alt='No Course Adding Vector1'
          className='w-1/2 lg:w-1/5 '
        />
        {/* <img
          src={NOCourseImg2}
          alt="No Course Adding Vector2"
          className="w-1/4 "
        /> */}
      </div>
    </div>
  )
}

// const CurrentCourseCategories = ({ className }) => {
//   const sortArrayOfObjectsByKey = (array, key) => {
//     return array.sort((a, b) =>
//       a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0
//     );
//   };

//   const initialCourseData = [
//     {
//       _id: "6203e5e672140a4582088f89",
//       name: "et",
//       price: 192,
//       image: "http://placehold.it/32x32",
//       totalOrder: 1424,
//       totalSales: 195451,
//     },
//     {
//       _id: "6203e5e690661513110a43f4",
//       name: "veniam",
//       price: 147,
//       image: "http://placehold.it/32x32",
//       totalOrder: 1395,
//       totalSales: 295785,
//     },
//     {
//       _id: "6203e5e65d3594985a1b7999",
//       name: "labore",
//       price: 142,
//       image: "http://placehold.it/32x32",
//       totalOrder: 3788,
//       totalSales: 317385,
//     },
//     {
//       _id: "6203e5e659714bf814d75a3f",
//       name: "laboris",
//       price: 242,
//       image: "http://placehold.it/32x32",
//       totalOrder: 1150,
//       totalSales: 339406,
//     },
//     {
//       _id: "6203e5e6e71b417a2b4d24fc",
//       name: "anim",
//       price: 116,
//       image: "http://placehold.it/32x32",
//       totalOrder: 2573,
//       totalSales: 226936,
//     },
//     {
//       _id: "6203e5e6c8ff05bd53e5f992",
//       name: "sint",
//       price: 257,
//       image: "http://placehold.it/32x32",
//       totalOrder: 3702,
//       totalSales: 384870,
//     },
//     {
//       _id: "6203e5e640e7ded8ad286de3",
//       name: "officia",
//       price: 310,
//       image: "http://placehold.it/32x32",
//       totalOrder: 1750,
//       totalSales: 346675,
//     },
//     {
//       _id: "6203e5e618a38805a66453b0",
//       name: "ut",
//       price: 243,
//       image: "http://placehold.it/32x32",
//       totalOrder: 1760,
//       totalSales: 308650,
//     },
//     {
//       _id: "6203e5e6cf41a4083a3de529",
//       name: "anim",
//       price: 132,
//       image: "http://placehold.it/32x32",
//       totalOrder: 1825,
//       totalSales: 346251,
//     },
//     {
//       _id: "6203e5e6a71aa32a9c7876c9",
//       name: "est",
//       price: 128,
//       image: "http://placehold.it/32x32",
//       totalOrder: 1345,
//       totalSales: 383249,
//     },
//   ];

//   const [courseData, setCourseData] = useState(initialCourseData);

//   return (
//     <div className={`${className} rounded-lg bg-white px-6 py-4 relative `}>
//       <header className="flex flex-col lg:flex-row items-center py-2">
//         <h2 className="text-slate font-medium text-lg">
//           Current Course Categories
//         </h2>
//         <div className="flex-1"></div>
//         <button className="text-blue text-sm font-medium">See More</button>
//       </header>
//       <div className="flex max-w-full overflow-auto h-[300px] relative">
//         <div className="flex flex-col w-1/12 min-w-[3ch] flex-auto relative">
//           <div className="flex items-center justify-between px-2 pr-4 py-2 bg-white font-medium text-xs text-left space-x-4">
//             <p className="">SN</p>
//             <button className="">
//               <MdArrowDropDown className="text-ghost" size={18} />
//             </button>
//           </div>
//           {courseData.map((course, index) => {
//             return (
//               <div
//                 key={course._id}
//                 className={`py-4 px-2 text-sm ${
//                   index % 2 === 0 ? "bg-white" : "bg-light-gray"
//                 }`}
//               >
//                 {index + 1}
//               </div>
//             );
//           })}
//         </div>
//         <div className="flex flex-col w-4/12 min-w-[15ch] flex-auto relative">
//           <div className="flex items-center justify-between px-2 pr-4 py-2 bg-white font-medium text-xs text-left space-x-4">
//             <p className="">Name</p>
//             <button
//               className=""
//               onClick={(e) => {
//                 e.preventDefault();
//                 let res = sortArrayOfObjectsByKey(courseData, "name");
//                 setCourseData(res);
//               }}
//             >
//               <MdArrowDropDown className="text-ghost" size={18} />
//             </button>
//           </div>
//           {courseData.map((course, index) => {
//             return (
//               <div
//                 key={course._id}
//                 className={`py-4 px-2 text-sm flex items-center space-x-4 ${
//                   index % 2 === 0 ? "bg-white" : "bg-light-gray"
//                 }`}
//               >
//                 <div
//                   className="w-5 h-5 aspect-square rounded-full scale-125"
//                   style={{
//                     background: `url(${course.image})`,
//                     backgroundPosition: "center",
//                   }}
//                 ></div>
//                 <p className="text-blue">{course.name}</p>
//               </div>
//             );
//           })}
//         </div>
//         <div className="flex flex-col w-2/12 min-w-[5ch] flex-auto relative">
//           <div className="flex items-center justify-between px-2 pr-4 py-2 bg-white font-medium text-xs text-left space-x-4">
//             <p className="">Price</p>
//             <button
//               className=""
//               onClick={(e) => {
//                 e.preventDefault();
//                 let res = sortArrayOfObjectsByKey(courseData, "price");
//                 setCourseData(res);
//               }}
//             >
//               <MdArrowDropDown className="text-ghost" size={18} />
//             </button>
//           </div>
//           {courseData.map((course, index) => {
//             return (
//               <div
//                 key={course._id}
//                 className={`py-4 px-2 text-sm ${
//                   index % 2 === 0 ? "bg-white" : "bg-light-gray"
//                 }`}
//               >
//                 <span className="mr-1">&#8377;</span>
//                 {course.price}
//               </div>
//             );
//           })}
//         </div>
//         <div className="flex flex-col w-2/12 min-w-[5ch] flex-auto relative">
//           <div className="flex items-center justify-between px-2 pr-4 py-2 bg-white font-medium text-xs text-left space-x-4">
//             <p className="">TotalOrder</p>
//             <button
//               className=""
//               onClick={(e) => {
//                 e.preventDefault();
//                 let res = sortArrayOfObjectsByKey(courseData, "totalOrder");
//                 setCourseData(res);
//               }}
//             >
//               <MdArrowDropDown className="text-ghost" size={18} />
//             </button>
//           </div>
//           {courseData.map((course, index) => {
//             return (
//               <div
//                 key={course._id}
//                 className={`py-4 px-2 text-sm ${
//                   index % 2 === 0 ? "bg-white" : "bg-light-gray"
//                 }`}
//               >
//                 {course.totalOrder}
//               </div>
//             );
//           })}
//         </div>
//         <div className="flex flex-col w-3/12 min-w-[10ch] flex-auto relative">
//           <div className="flex items-center justify-between px-2 pr-4 py-2 bg-white font-medium text-xs text-left space-x-4">
//             <p className="">TotalSales</p>
//             <button
//               className=""
//               onClick={(e) => {
//                 e.preventDefault();
//                 let res = sortArrayOfObjectsByKey(courseData, "totalSales");
//                 setCourseData(res);
//               }}
//             >
//               <MdArrowDropDown className="text-ghost" size={18} />
//             </button>
//           </div>
//           {courseData.map((course, index) => {
//             return (
//               <div
//                 key={course._id}
//                 className={`py-4 px-2 text-sm text-green ${
//                   index % 2 === 0 ? "bg-white" : "bg-light-gray"
//                 }`}
//               >
//                 <span className="mr-1">&#8377;</span>
//                 {formatNumber(course.totalSales)}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// const CourseAddByMonth = ({ className }) => {
//   const [viewPort, setViewPort] = useState({
//     width: document.documentElement.clientWidth,
//     height: document.documentElement.clientHeight,
//   });

//   const initialCourseAddByMonthData = [
//     { month: "Jan", additions: 23400 },
//     { month: "Feb", additions: 15000 },
//     { month: "Mar", additions: 30000 },
//     { month: "Apr", additions: 22000 },
//     { month: "May", additions: 10000 },
//     { month: "Jun", additions: 23400 },
//     { month: "Jul", additions: 5000 },
//   ];

//   const [courseAddByMonthData] = useState(initialCourseAddByMonthData);

//   const [maxAdditions] = useState(30000);

//   useEffect(() => {
//     const handleResize = (e) => {
//       setViewPort({
//         width: document.documentElement.clientWidth,
//         height: document.documentElement.clientHeight,
//       });
//     };
//     typeof window !== 'undefined' && window.addEventListener("resize", handleResize);
//   });

//   return (
//     <div className={`${className} rounded-lg bg-white px-6 py-4`}>
//       <header className="flex flex-col lg:flex-row items-center py-2">
//         <h2 className="text-slate font-medium text-lg">Course add. By Month</h2>
//         <div className="flex-1"></div>
//         <button className="text-blue text-sm font-medium">See More</button>
//       </header>
//       <div className="flex flex-col w-full space-y-4 mt-2">
//         {courseAddByMonthData.map((course, index) => {
//           return (
//             <div className="flex space-x-2 items-center" key={index}>
//               <p className="w-[4ch] font-medium text-sm">{course.month}</p>
//               <div
//                 style={
//                   viewPort.width > 900
//                     ? {
//                         width: `${Math.ceil(
//                           (280 * course.additions) / maxAdditions
//                         )}px`,
//                       }
//                     : {
//                         width: `${Math.ceil(
//                           (200 * course.additions) / maxAdditions
//                         )}px`,
//                       }
//                 }
//                 className={` ${
//                   course.additions > maxAdditions / 2 ? "bg-orange" : "bg-blue"
//                 }  h-4 rounded-r-full`}
//               ></div>
//               <p className="w-[6ch] text-sm">
//                 {formatNumber(course.additions)}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// const PreRequisiteDocuments = ({ className }) => {
//   return (
//     <div className={`${className} rounded-lg bg-white px-6 py-4 relative `}>
//       <header className="flex flex-col lg:flex-row items-center py-2">
//         <h2 className="text-slate font-medium text-lg">
//           Pre Requisite Documents
//         </h2>
//         <div className="flex-1"></div>
//         <button className="text-blue text-sm font-medium">See More</button>
//       </header>
//       <div className="flex max-w-full overflow-auto max-h-[300px] relative">
//         {/* SN */}
//         <div className="flex flex-col w-1/12 min-w-[3ch] flex-auto relative">
//           <div className="flex items-center justify-between px-2 pr-4 py-2 bg-white font-medium text-xs text-left space-x-4">
//             <p className="">S.No</p>
//             <button className="">
//               <MdArrowDropDown className="text-ghost" size={18} />
//             </button>
//           </div>
//           <div className={`py-4 px-2 text-sm bg-white`}>1</div>
//           <div className={`py-4 px-2 text-sm bg-light-gray`}>2</div>
//           <div className={`py-4 px-2 text-sm bg-white`}>3</div>
//         </div>

//         {/* Name */}
//         <div className="flex flex-col w-5/12 min-w-[15ch] flex-auto relative">
//           <div className="flex items-center justify-between px-2 pr-4 py-2 bg-white font-medium text-xs text-left space-x-4">
//             <p className="">Name</p>
//             <button className="">
//               <MdArrowDropDown className="text-ghost" size={18} />
//             </button>
//           </div>
//           <div className={`py-4 px-2 text-sm bg-white font-medium text-blue`}>
//             Aadhar Card
//           </div>
//           <div
//             className={`py-4 px-2 text-sm bg-light-gray font-medium text-blue`}
//           >
//             10th Marksheet
//           </div>
//           <div className={`py-4 px-2 text-sm bg-white font-medium text-blue`}>
//             12th Marksheet
//           </div>
//         </div>

//         {/* Category */}
//         <div className="flex flex-col w-3/12 min-w-[15ch] flex-auto relative">
//           <div className="flex items-center justify-between px-2 pr-4 py-2 bg-white font-medium text-xs text-left space-x-4">
//             <p className="">Category</p>
//             <button className="">
//               <MdArrowDropDown className="text-ghost" size={18} />
//             </button>
//           </div>
//           <div className={`py-4 px-2 text-sm bg-white font-medium text-blue`}>
//             PDF Format
//           </div>
//           <div
//             className={`py-4 px-2 text-sm bg-light-gray font-medium text-blue`}
//           >
//             PDF Format
//           </div>
//           <div className={`py-4 px-2 text-sm bg-white font-medium text-blue`}>
//             PDF Format
//           </div>
//         </div>

//         {/* Upload */}
//         <div className="flex flex-col w-3/12 min-w-[15ch] flex-auto relative">
//           <div className="flex items-center justify-between px-2 pr-4 py-2 bg-white font-medium text-xs text-left space-x-4">
//             <p className="">Category</p>
//             <button className="">
//               <MdArrowDropDown className="text-ghost" size={18} />
//             </button>
//           </div>
//           <div className={`py-4 px-2 text-sm bg-white text-primary`}>
//             Upload here
//           </div>
//           <div className={`py-4 px-2 text-sm bg-light-gray text-primary`}>
//             Upload here
//           </div>
//           <div className={`py-4 px-2 text-sm bg-white text-primary`}>
//             Upload here
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const TopSuggestions = ({ className }) => {
//   return (
//     <div className={`${className} rounded-lg bg-white px-6 py-4 relative `}>
//       <header className="flex flex-col lg:flex-row items-center py-2">
//         <h2 className="text-slate font-medium text-lg">Your Top Suggestions</h2>
//         <div className="flex-1"></div>
//         <button className="text-blue text-sm font-medium">See More</button>
//       </header>
//       <div className="flex flex-col divide-y-2 divide-light-gray mt-2">
//         <div className="flex space-x-4 items-center py-2">
//           <div className="bg-light-blue w-20 h-20 aspect-square"></div>
//           <div className="">
//             <p className="">
//               You haven’t posted in a long time now . Post regularly to be
//               engaged with students.
//             </p>
//             <p className="">
//               <span className="text-primary underline">Click here</span> to start
//               posting
//             </p>
//           </div>
//         </div>
//         <div className="flex space-x-4 items-center py-2">
//           <div className="bg-light-orange w-20 h-20 aspect-square"></div>
//           <div className="">
//             <p className="">
//               You haven’t posted in a long time now . Post regularly to be
//               engaged with students.
//             </p>
//             <p className="">
//               <span className="text-primary underline">Click here</span> to start
//               posting
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
