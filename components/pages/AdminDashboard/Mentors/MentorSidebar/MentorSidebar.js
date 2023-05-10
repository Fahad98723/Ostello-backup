import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { LogoutIcon, LogoWithTitle } from '../../../../SVGIcons'
import { GiHamburgerMenu } from 'react-icons/gi'
import { ImCross } from 'react-icons/im'
import { host } from '../../../../../utils/constant'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Swal from 'sweetalert2'

const MentorSidebar = ({ active, setActive }) => {
  const [open, setOpen] = useState(false)
  const [accept, setAccept] = useState(false)
  const router = useRouter()
  const { mentorid } = router.query;
  const goBack = router.back


  const  logout = ()=> {
    router.push('/')
    localStorage.clear()
    window.location.reload()
  }
  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      };
      const { data } = await axios.delete(`${host}/mentor?id=${mentorid}`, config);
      // 
        Swal.fire({
          icon: 'warning',
          title: 'Mentor approval rejected',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
    } catch (err) {
      toast.error(err.toString());
  
    } finally {
      // setDeleteCoupon(false);
    }
  };
  const handleApprove = async (e, num)=>{
    e.preventDefault();

    const updateData = {
      id: mentorid,
      updates: {
          approval:num,
      },
    };
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${window.localStorage.getItem(
            "ACCESS_TOKEN"
          )}`,
        },
      };
      const { data } = await axios.patch(`${host}/mentor/`, updateData, config);
      Swal.fire({
        icon: 'success',
        title: 'Mentor approval approved',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
      setAccept(true);

    } catch (err) {
     
      Swal.fire({
        icon: 'error',
        title: err.message,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
    }
    }

  useEffect(() => {
    const run = async() => {
      try {
        const config = {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${window.localStorage.getItem(
              "ACCESS_TOKEN"
            )}`,
          },
        };
        const { data } = await axios.get(`${host}/mentor?id=${mentorid}`, config )
        if(data?.mentor?.approval === 1 ){
          setAccept(true)
        }
 
      } catch (err) {
        toast.error(err.message)
      }
      finally{
      
      }
    }
    run()
  },[mentorid])

const data = [  {
  title: 'Overview',
  route: 'overview',
  icon: (
    <svg
      width='20'
      height='21'
      className='transition duration-700 group-hover:fill-[#7D23E0] group-hover:scale-125'
      viewBox='0 0 21 19'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M19.6042 4.47355H6.14583C6.04085 4.47355 5.94017 4.42752 5.86594 4.34558C5.7917 4.26364 5.75 4.1525 5.75 4.03662V1.85197C5.75 1.73609 5.7917 1.62495 5.86594 1.54301C5.94017 1.46107 6.04085 1.41504 6.14583 1.41504H19.6042C19.7091 1.41504 19.8098 1.46107 19.8841 1.54301C19.9583 1.62495 20 1.73609 20 1.85197V4.03662C20 4.1525 19.9583 4.26364 19.8841 4.34558C19.8098 4.42752 19.7091 4.47355 19.6042 4.47355ZM19.6042 11.0275H6.14583C6.04085 11.0275 5.94017 10.9815 5.86594 10.8995C5.7917 10.8176 5.75 10.7065 5.75 10.5906V8.40592C5.75 8.29004 5.7917 8.1789 5.86594 8.09696C5.94017 8.01502 6.04085 7.96899 6.14583 7.96899H19.6042C19.7091 7.96899 19.8098 8.01502 19.8841 8.09696C19.9583 8.1789 20 8.29004 20 8.40592V10.5906C20 10.7065 19.9583 10.8176 19.8841 10.8995C19.8098 10.9815 19.7091 11.0275 19.6042 11.0275ZM19.6042 17.5815H6.14583C6.04085 17.5815 5.94017 17.5354 5.86594 17.4535C5.7917 17.3715 5.75 17.2604 5.75 17.1445V14.9599C5.75 14.844 5.7917 14.7329 5.86594 14.6509C5.94017 14.569 6.04085 14.5229 6.14583 14.5229H19.6042C19.7091 14.5229 19.8098 14.569 19.8841 14.6509C19.9583 14.7329 20 14.844 20 14.9599V17.1445C20 17.2604 19.9583 17.3715 19.8841 17.4535C19.8098 17.5354 19.7091 17.5815 19.6042 17.5815ZM3.375 4.47355H1.39583C1.29085 4.47355 1.19017 4.42752 1.11594 4.34558C1.0417 4.26364 1 4.1525 1 4.03662V1.85197C1 1.73609 1.0417 1.62495 1.11594 1.54301C1.19017 1.46107 1.29085 1.41504 1.39583 1.41504H3.375C3.47998 1.41504 3.58066 1.46107 3.6549 1.54301C3.72913 1.62495 3.77083 1.73609 3.77083 1.85197V4.03662C3.77083 4.1525 3.72913 4.26364 3.6549 4.34558C3.58066 4.42752 3.47998 4.47355 3.375 4.47355ZM3.375 11.0275H1.39583C1.29085 11.0275 1.19017 10.9815 1.11594 10.8995C1.0417 10.8176 1 10.7065 1 10.5906V8.40592C1 8.29004 1.0417 8.1789 1.11594 8.09696C1.19017 8.01502 1.29085 7.96899 1.39583 7.96899H3.375C3.47998 7.96899 3.58066 8.01502 3.6549 8.09696C3.72913 8.1789 3.77083 8.29004 3.77083 8.40592V10.5906C3.77083 10.7065 3.72913 10.8176 3.6549 10.8995C3.58066 10.9815 3.47998 11.0275 3.375 11.0275ZM3.375 17.5815H1.39583C1.29085 17.5815 1.19017 17.5354 1.11594 17.4535C1.0417 17.3715 1 17.2604 1 17.1445V14.9599C1 14.844 1.0417 14.7329 1.11594 14.6509C1.19017 14.569 1.29085 14.5229 1.39583 14.5229H3.375C3.47998 14.5229 3.58066 14.569 3.6549 14.6509C3.72913 14.7329 3.77083 14.844 3.77083 14.9599V17.1445C3.77083 17.2604 3.72913 17.3715 3.6549 17.4535C3.58066 17.5354 3.47998 17.5815 3.375 17.5815Z'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
}]
  return (
    <>
      <div className='h-screen hidden md:block w-[250px] bg-white'>
        <div className=' flex justify-between items-center py-5 lg:px-2 xl:px-4 md:px-2'>
          <LogoWithTitle />
        </div>
        <div className='h-[70%]'>
          <div
            onClick={() => goBack()}
            className='p-5 mt-5 text-[#828095] flex cursor-pointer text-lg font-medium items-center'
          >
            <MdOutlineKeyboardArrowLeft className='mr-2 scale-125' /> Back
          </div>
          {data.map((data, index) => (
            <button
              className={
                active === data.title
                  ? 'text-[#7D23E0] bg-gradient-to-r from-[#f3e8ff] fill-[#7D23E0] via-[#fff] to-[#fff] flex items-center cursor-pointer gap-x-3 py-2 '
                  : 'flex items-center text-[#828095] cursor-pointer fill-[#828095] hover:text-[#7D23E0] gap-x-3 py-2 hover:bg-gradient-to-r hover:from-[#f3e8ff]  hover:via-[#fff] hover:to-[#fff]'
              }
              key={index}
              onClick={() => setActive(data.title)}
            >
              <div className='group'>
                <div className='flex items-center gap-x-3 py-1 sm:pl-[15px] lg:pl-[30px]'>
                  {data.icon}
                  <p className='font-medium'>{data.title}</p>
                </div>
              </div>
            </button>
          ))}
          {!accept && <>
            <button
          onClick={(e) => handleApprove(e,1)}
          className={`border bg-[#7D23E0] text-white md:px-8 px-4 py-2 md:py-3 font-bold rounded-lg  mt-5`}
        >
          Accept
        </button>
        <button
          onClick={() => handleDelete()}
          className={`border bg-red-400 text-white md:px-8 px-4 py-2 md:py-3 font-bold rounded-lg  mt-3`}
        >
          Reject
        </button>
          </>}
        </div>

        <Link legacyBehavior prefetch={false} href=''>
          <div className='flex w-full items-center gap-x-3 px-[25px]'>
            <LogoutIcon />
            <div onClick={() => logout()}>
              <p className='font-semibold text-[#828095]'>Logout</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Mobile Sidebar */}
      <div className='md:hidden block bg-white py-5 px-10 shadow-md !mt-0'>
        <div className='flex justify-start'>
          <GiHamburgerMenu
            onClick={() => setOpen(true)}
            className='text-xl scale-150 text-[#232323]'
          />
        </div>
      </div>
      {open && (
        <div className='h-screen md:hidden block w-[70%] z-50 rounded-r-3xl scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-gray-100 overflow-y-scroll shadow-[0_35px_800px_-10px_rgba(0,0,0,0.9)] fixed top-0 left-0 bg-white'>
          <div className='flex justify-between items-center pt-12 px-4'>
            <div className=' flex w-[80%] items-center'>
              <LogoWithTitle />
            </div>
            <ImCross
              onClick={() => setOpen(false)}
              className='text-[#414141] cursor-pointer mr-3'
            />
          </div>

          <div className='flex py-5 justify-center items-center flex-col'>
            <img src={largeLogo} alt='' />
            <h3 className='pt-1'>Super Admin</h3>
          </div>
          <div
            onClick={goBack}
            className='p-5 mt-5 text-[#828095] flex cursor-pointer text-lg font-medium items-center'
          >
            <MdOutlineKeyboardArrowLeft className='mr-2 scale-125' /> Back
          </div>
          {data.map((data, index) => (
            <button onClick={() => setActive(data.title)} key={index}>
              <span
                className={
                  data.title === active
                    ? 'text-[#7D23E0] bg-gradient-to-r from-[#f3e8ff] fill-[#7D23E0] via-[#fff] to-[#fff] flex items-center cursor-pointer gap-x-3 py-2 '
                    : 'flex items-center text-[#828095] cursor-pointer fill-[#828095] hover:text-[#7D23E0] gap-x-3 py-2 hover:bg-gradient-to-r hover:from-[#f3e8ff]  hover:via-[#fff] hover:to-[#fff]'
                }
              >
                {' '}
                <div className='group px-8'>
                  <div className='flex items-center gap-x-3 py-1 sm:pl-[15px] lg:pl-[30px]'>
                    {data.icon}
                    <p className='font-semibold'>{data.title}</p>
                  </div>
                </div>
              </span>
            </button>
          ))}
          <Link legacyBehavior prefetch={false} href='/'>
            <div className='flex w-full items-center gap-x-3 px-8 py-5'>
              <LogoutIcon />
              <div>
                <p className='font-semibold text-[#828095]'>Logout</p>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  )
}

export default MentorSidebar
