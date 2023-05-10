import React, { useEffect } from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'
import { BiEdit } from 'react-icons/bi'
import { DeleteIcon } from '../../../SVGIcons'
const TopLocationMobile = ({ topLocationData, handleEdit, handleDelete }) => {
  return (
    <div className='md:hidden block p-3'>
      <h3 className='mb-3 font-bold text-[#9FA2B4]'>Top Location Details</h3>
      <div className='flex space-y-4 flex-col'>
        {topLocationData?.map((data, i) => (
          <div key={i}>
            <div className='flex items-center justify-between'></div>
            <div className=''>
              <div className='flex mt-3 space-x-1 justify-between'>
                <div className='w-6/12 text-[#717171] text-sm'>
                  <div>Namme :</div>
                  <div>Title :</div>
                  <div>PinCode :</div>
                </div>
                <div className='w-6/12 font-bold text-sm'>
                  <div>{data?.name}</div>
                  <div>{data?.metatitle}</div>
                  <div>{data?.pincode}</div>
                </div>
              </div>

              <div className='flex mt-2'>
                <div
                  onClick={() => {
                    handleEdit(data.id)
                  }}
                  className='bg-white w-[40px] block p-2.5 shadow-lg cursor-pointer rounded-full mr-2'
                >
                  <BiEdit className='text-2xl text-blue' />
                </div>

                <div
                  onClick={() => {
                    handleDelete(data.id)
                  }}
                  className='bg-white w-[40px] block p-2.5 shadow-lg cursor-pointer rounded-full'
                >
                  <DeleteIcon />
                </div>
              </div>
            </div>
            <hr className='mt-3' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopLocationMobile
