import React, { useState } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import VideoPlayer from "../../VideoPlayer";
import {
    HeartFilled,
    HeartOutlined,
    PlayCircleFilled,
    ShareAltOutlined,
    StarFilled,
  } from '@ant-design/icons'
import { isEmpty } from "../../../utils/utils";
import videoImage from '../../../assets/merchantLandingHeader.png'
import { useRouter } from "next/router";
import { authSelector } from "../../../redux/slices/authSlice";
import { useSelector } from "react-redux";

const Header = () => {

    const [content, setContent] = useState({})
    const router = useRouter()
    const { isAuthenticated } = useSelector(authSelector)
  return (
    <section className="py-20 mt-8">
      <div className="text-center">
        <p className="md:text-[55px] text-[40px] font-bold md:leading-[60px] leading-[40px] md:w-5/12 mx-auto ">
          Market your courses with Ostello!
        </p>
        <p className="text-[#667085] text-[20px] md:w-5/12 mx-auto mt-3">
          Partner with Ostello to reach thousands of students across India and
          expand your reach
        </p>
        <div className="items-center justify-center flex mt-5">
          <div className="rounded-md px-4 py-2 border border-[#D0D5DD] bg-white items-center justify-center flex text-black text-2xl mr-2">
            <AiOutlinePlayCircle className="text-black text-2xl mr-1" /> Demo
          </div>
          <button onClick={() => router.push('/merchant/signup')} className={`${isAuthenticated ? 'hidden' : 'block'} text-white text-2xl  bg-primary hover:text-primary border border-primary  hover:bg-white rounded-md px-4 py-2 duration-300`}>
            Sign Up
          </button>
        </div>

        <div>
{/*        
                  <div
                
                    className='video_container w-full '
                  >
                      <div className='border relative border-white rounded-xl overflow-hidden h-full aspect-video'> */}
                        {/* <VideoPlayer
                          thumbnailURL={content?.thumb}
                          videoURL={content?.url}
                        /> */}
                        {/* <div
                         
                          className=' group absolute top-5 right-5 md:top-5 md:right-5 p-3 bg-white border-solid border-primary border flex rounded-lg gap-2 transition-all ease-in-out duration-30 cursor-pointer'
                        >
                          <img src={imgProto.src} className='w-[10px] text-primary' alt='' />
                          <p className='text-[#414141] hidden group-hover:block   '>
                            See more
                          </p>
                        </div> */}
                      {/* </div>
                    
                  </div> */}
                
                {isEmpty(content) && (
                  <>
                    {[1].map((item, i) => (
                      <div key={i} className='video_container mt-8'>
                        <div className='relative'>
                          <img
                            src={videoImage.src}
                            className=' w-full  '
                            alt=''
                          />
                          <PlayCircleFilled
                            className='
                              text-white/90
                              absolute
                              text-6xl cursor-pointer active:opacity-75 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-110 duration-300'
                          />
                          {/* <div
                            onClick={() => router.push(slug + '/gallery')}
                            className=' group absolute top-5 right-5 md:top-10 md:right-10 p-3 bg-white flex rounded-lg gap-2 transition-all ease-in-out duration-300  cursor-pointer'
                          >
                            <img src={imgProto.src} className='w-[10px] text-primary' alt='' />
                            <p className='text-[#414141] hidden group-hover:block   '>
                              See more
                            </p>
                          </div> */}
                        </div>
                      </div>
                    ))}
                  </>
                )}
        </div>
      </div>
    </section>
  );
};

export default Header;
