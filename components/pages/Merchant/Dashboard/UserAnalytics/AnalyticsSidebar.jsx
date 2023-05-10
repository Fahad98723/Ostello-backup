import { useRouter } from 'next/router';
import React from 'react'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import logo from '../../../../../assets/merchantDashboard/Accountancy/logo.png';
export default function AnalyticsSidebar() {
  const router = useRouter()
  function logout() {
    router.push('/merchant/login');
    localStorage.clear();
    typeof window !== 'undefined' && window.location.reload();
}
  return (
    <>
    <div className=" hidden  lg:block">
                        <div>
                            <div onClick={() =>{router.push('/')}} className="logo flex items-center ml-4 mt-5 mb-12">
                                <img src={logo.src} alt="" />
                            </div>

                            <div className="menu dashboard justify-start">
                            <div
            onClick={() => router.back()}
            className='p-5 mt-5 text-[#828095] flex cursor-pointer text-lg font-medium items-center'
          >
            <MdOutlineKeyboardArrowLeft className='mr-2 scale-125' /> Back
          </div>
                            </div>
                        </div>
                    </div>
    </>
  )
}
