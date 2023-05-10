import React, { useEffect, useState } from "react";
import CourseCard from "../AdminCard/CourseCard.js";
import { RiHeart3Fill } from "react-icons/ri";
import Header from "../Header/Header.js";
import axios from "axios";
import { host } from "../../util/constant/constant.js";
import { useRouter } from "next/router";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md'
import WishlistInstituteCard from "../UI/WishlistInstituteCard.jsx";

const Wishlist = () => {
  const { studentId } = useRouter.query();
  

  const [activeTab, setActiveTab] = useState('Institute Reviews')
  const [dropDown, setDropDown] = useState(false)

  const [users, setUsers] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [wishlistsCourse, setWishlistsCourse] = useState([])
  useEffect(() => {
    return async () => {
      try {
        const { data } = await axios.get(`${host}/users/student?id=${studentId}`, config);

        setUsers(data.message);
        if (users) {
          setWishlist(users?.wishlist);
          setWishlistsCourse(users?.wishlist_courses);
        }
      } catch (err) {
        
      }
    };
  }, [studentId, users]);

  
  return (
    <div>
      <Header pageTitle={"Students"} />
      <div className="px-[30px] pt-4 pb-16">
        <div className="flex justify-between items-center">
        <h2 className="text-lg mb-3 px-2 md:hidden block font-bold">
          WishList
        </h2>
        <div className='relative '>
            <div
              className='flex lg:hidden  justify-center items-center space-x-2 p-3 text-primary bg-white  '
              onClick={() => {
                setDropDown(!dropDown)
              }}
            >
              <p className='text-center'>{activeTab}</p>
              {dropDown ? (
                <MdOutlineKeyboardArrowUp className='text-2xl' />
              ) : (
                <MdOutlineKeyboardArrowDown className='text-2xl' />
              )}
            </div>
            <div className=''>
              {dropDown && (
                <div
                  className='lg:hidden absolute z-10 right-0 top-15 bg-white px-5 py-3'
                  onClick={() => {
                    setDropDown(!dropDown)
                  }}
                >
                  <div
                    className={` cursor-pointer ${
                      activeTab === 'Institute Wishlist' ? 'text-primary' : ''
                    } lg:hidden rounded-lg py-2 text-center`}
                    onClick={() => {
                      setActiveTab('Institute Wishlist')
                    }}
                  >
                    Institute Wishlist
                  </div>

                  <div
                    className={`cursor-pointer ${
                      activeTab === 'Course Wishlist' ? 'text-primary' : ''
                    }  lg:hidden rounded-lg py-2 text-center`}
                    onClick={() => {
                      setActiveTab('Course Wishlist')
                    }}
                  >
                    Course Wishlist
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='relative '>
            <div
              className='flex lg:hidden  justify-center items-center space-x-2 p-3 text-primary bg-white  '
              onClick={() => {
                setDropDown(!dropDown)
              }}
            >
              <p className='text-center'>{activeTab}</p>
              {dropDown ? (
                <MdOutlineKeyboardArrowUp className='text-2xl' />
              ) : (
                <MdOutlineKeyboardArrowDown className='text-2xl' />
              )}
            </div>
            <div className=''>
              {dropDown && (
                <div
                  className='lg:hidden absolute z-10 right-0 top-15 bg-white px-5 py-3'
                  onClick={() => {
                    setDropDown(!dropDown)
                  }}
                >
                  <div
                    className={` cursor-pointer ${
                      activeTab === 'Institute Reviews' ? 'text-primary' : ''
                    } lg:hidden rounded-lg py-2 text-center`}
                    onClick={() => {
                      setActiveTab('Institute Reviews')
                    }}
                  >
                    Institute Reviews
                  </div>

                  <div
                    className={`cursor-pointer ${
                      activeTab === 'Course Reviews' ? 'text-primary' : ''
                    }  lg:hidden rounded-lg py-2 text-center`}
                    onClick={() => {
                      setActiveTab('Course Reviews')
                    }}
                  >
                    Course Reviews
                  </div>
                </div>
              )}
            </div>
          </div>


          <div className=' flex  justify-between'>
          <div className='flex flex-col lg:flex-row w-full items-end lg:items-center lg:gap-10 text-base '>
            <div
              className={`${
                activeTab === 'Institute Wishlist'
                  ? 'bg-ghost/10 text-primary'
                  : 'bg-white text-black'
              }  hidden lg:inline-block w-full cursor-pointer  rounded-t-lg py-2 text-center`}
              onClick={() => {
                setActiveTab('Institute Wishlist')
              }}
            >
              <p className={`font-medium text-2xl`}>Institute Wishlist</p>
            </div>

            <div
              className={`${
                activeTab === 'Course Wishlist'
                  ? 'bg-ghost/10 text-primary'
                  : 'bg-white text-black'
              }    hidden lg:inline-block w-full cursor-pointer rounded-t-lg py-2 text-center`}
              onClick={() => {
                setActiveTab('Course Wishlist')
              }}
            >
              <p className='font-medium text-2xl'>Course Wishlist</p>
            </div>


          </div>
        </div>

        {
          activeTab === 'Course Wishlist' ? wishlist?.length > 0 ? (
            <div className="grid gap-10 md:grid-cols-2 grid-cols-1 lg:grid-cols-3">
              {wishlist?.map((data, index) => (
                <div key={index} className="relative">
                  <CourseCard data={data} />
                  <div className="absolute top-8 right-8 bg-white p-2.5 shadow-lg cursor-pointer rounded-full">
                    <RiHeart3Fill className="scale-150 text-[#FF0000]-500" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-2xl text-[#FF0000]/80">
              There are no wishlisted course{" "}
            </p>
          ) : wishlist?.length > 0 ? (
            <div className="grid gap-10 md:grid-cols-2 grid-cols-1 lg:grid-cols-3">
              {wishlist?.map((data, index) => (
                <div key={index} className="relative">
                  <WishlistInstituteCard data={data} />
                  <div className="absolute top-8 right-8 bg-white p-2.5 shadow-lg cursor-pointer rounded-full">
                    <RiHeart3Fill className="scale-150 text-[#FF0000]-500" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-2xl text-[#FF0000]/80">
              There are no wishlisted course{" "}
            </p>
          ) 
        }
      </div>
    </div>
  );
};

export default Wishlist;
