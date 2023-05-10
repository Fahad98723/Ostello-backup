import React from 'react'
import { BsFillCircleFill } from 'react-icons/bs'
import { BiDownload, BiRupee } from 'react-icons/bi'
import { HybridIcon } from '../../../../SVGIcons'

const PurchasedDetailsModal = ({ course, setCourse, setShowModal }) => {
  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative lg:w-[40%] md:w-[70%] w-[90%] w mb-6 mx-auto max-w-6xl'>
          {/*content*/}
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className='flex items-start justify-between py-3 px-5 rounded-t'>
              <div className='text-[26px] leading-[47px] font-medium'>
                Purchase Details
              </div>
              <button
                className='p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                onClick={() => {
                  setShowModal(false)
                  setCourse({})
                }}
              >
                <span className=' bg-white border border-[#7D23E0] rounded-full p-4 flex justify-center items-center h-6 w-6 text-2xl text-[#7D23E0] outline-none focus:outline-none'>
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className='relative md:px-6 px-3 h-[78vh] overflow-y-auto scrollbar-hide flex-auto'>
              <div className='flex space-x-4'>
                <div>
                  <img
                    className='h-[90px] w-[90px] rounded-lg'
                    src={course.img}
                    alt=''
                  />
                </div>
                <div className='flex flex-col justify-between'>
                  <div className='flex flex-col'>
                    <div className='text-[#767676] md:text-xl'>
                      {course.name}
                    </div>
                    <div className='md:text-lg font-bold'>{course.title}</div>
                  </div>
                  <div className='flex items-center'>
                    {course.status === 'hybrid' ? (
                      <HybridIcon />
                    ) : (
                      <BsFillCircleFill
                        className={`text-[6px] ${
                          course.status === 'online'
                            ? 'text-[#3AC817]'
                            : 'text-[#FF0000]-600'
                        }`}
                      />
                    )}
                    <span className='ml-2 capitalize text-[#414141]'>
                      {course.status}
                    </span>
                  </div>
                </div>
              </div>
              <button className='flex text-[#7D23E0] my-3 mx-1 items-center'>
                Download Receipt <BiDownload className='ml-2 scale-125' />{' '}
              </button>
              <hr />
              <div className='flex font-medium flex-col space-y-1 mx-1 my-3'>
                <div className='flex text-[#A8A8A8] justify-between'>
                  <p className=''>Amount</p>
                  <div className='flex text-[16px] items-center '>
                    {' '}
                    <BiRupee className='scale-125' /> 64,240
                  </div>
                </div>
                <div className='flex text-[#A8A8A8] justify-between'>
                  <p className=''>Material cost</p>
                  <div className='flex text-[16px] items-center '>
                    {' '}
                    <BiRupee className='scale-125' /> 64,240
                  </div>
                </div>
                <div className='flex text-[#A8A8A8] justify-between'>
                  <p className=''>GST</p>
                  <div className='flex text-[16px] items-center '>
                    {' '}
                    <BiRupee className='scale-125' /> 64,240
                  </div>
                </div>
                <div className='flex text-[#7D23E0] justify-between'>
                  <p className=''>Coupon</p>
                  <div className='flex text-[16px] items-center '>
                    {' '}
                    -
                    <BiRupee className='scale-125' /> 64,240
                  </div>
                </div>
                <div className='flex text-[#FF0000]-600 justify-between'>
                  <p className=''>Discount</p>
                  <div className='flex text-[16px] items-center '>
                    {' '}
                    -
                    <BiRupee className='scale-125' /> 64,240
                  </div>
                </div>
                <hr />
                <div className='flex text-[#414141] font-bold text-2xl justify-between'>
                  <p>Total</p>
                  <div className='flex text-[16px] items-center '>
                    <BiRupee className='scale-125' /> 64,240
                  </div>
                </div>
                <hr />
                <div className='uppercase text-[#767676] !mt-2 font-medium'>
                  course duration
                </div>
                <div className='font-medium !mt-[-1px]'>3 Months</div>
                <div className='uppercase !mt-3 text-[#767676] font-medium'>
                  Payment method
                </div>
                <div className='font-medium !mt-[-1px]'>Using UPI</div>
                <div className='uppercase !mt-3 text-[#767676] font-medium'>
                  Purchase date
                </div>
                <div className='font-medium !mt-[-1px]'>May 21, 2022</div>
              </div>
            </div>
            {/*footer*/}
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed !mt-0 inset-0 z-40 bg-black'></div>
    </>
  )
}

export default PurchasedDetailsModal
