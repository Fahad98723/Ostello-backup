import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdminInstitutes } from '../../../../redux/slices/adminInstitutesSlice'

// import image1 from '../../../util/assets/images/active1.png'

const MobileMarketing = ({ adminInstitutes }) => {
  const router = useRouter()

  const handleOnclick = (id) => {
    router.push(`/adminInstituteDetails/${id}`)
  }

  // const dispatch = useDispatch();
  // const { loading, adminInstitutes, error, isUpdated } = useSelector(
  //   (state) => state.adminInstitutes
  // );

  // useEffect(() => {
  //   dispatch(fetchAdminInstitutes());
  // }, [dispatch, isUpdated]);

  // 
  return (
    <div className='md:hidden block p-3'>
      <h3 className='mb-3 font-bold text-[#9FA2B4]'>Onboarding Details</h3>
      <div className='flex space-y-4 flex-col'>
        {adminInstitutes?.map((data, i) => (
          <div onClick={() => handleOnclick(data?.id)} key={i}>
            <div className='flex items-center justify-between'>
              <div className='flex items-center justify-between'>
                {/* <img
                    className="h-[56px] w-[56px] rounded-full"
                    src={data?.images[0]?.url}
                    alt=""
                  /> */}
                <div>
                  <p className='text-[#252733] font-bold '>{data?.name}</p>
                  <p className='text-[#9766CD] text-xs font-bold '>
                    Updated 1 day ago
                  </p>
                </div>
              </div>
              <div className='cursor-pointer'>
                <RiArrowRightSLine className='scale-125 text-3xl' />
              </div>
            </div>
            <div className='flex mt-3 space-x-1 justify-between'>
              <div className='w-6/12 text-[#717171] text-sm'>
                <div>Number :</div>
                <div>Time :</div>
                <div>Delivered</div>
                <div>Read :</div>
              </div>
              <div className='w-6/12 font-bold text-sm'>
                <div>01865233836</div>
                <div>{data?.registeredon?.split('T')[0]}</div>
                <div>Yes</div>
                <div>Unread</div>
              </div>
            </div>
            <hr className='mt-3' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MobileMarketing
