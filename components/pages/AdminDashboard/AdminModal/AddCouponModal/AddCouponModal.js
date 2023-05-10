import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { adminAddCoupon } from '../../../../../redux/slices/adminCouponSlice'

const AddCouponModal = ({ setCouponModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()
  const onSubmit = (data) => {
    data.discountrate = Number(data.discountrate)
    data.maxdiscountprice = Number(data.maxdiscountprice)
    data.maximumprice = Number(data.maximumprice)
    data.minimumprice = Number(data.minimumprice)
    dispatch(adminAddCoupon(data))
    setCouponModal(false)
  }

  return (
    <>
      <style>
        {`
          .m-top {
            margin-top: 0px !important;
          }
        `}
      </style>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative lg:w-[50%] md:w-[70%] w-[90%] w mb-6 mx-auto max-w-6xl'>
          {/*content*/}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'
          >
            {/*header*/}
            <div className='flex items-start justify-between py-3 px-5 rounded-t'>
              <div className='text-[26px] leading-[47px] font-medium'>
                Add Coupon
              </div>
              <button
                className='p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                onClick={() => setCouponModal(false)}
              >
                <span className=' bg-white border border-[#7D23E0] rounded-full p-4 flex justify-center items-center h-6 w-6 text-2xl text-[#7D23E0] outline-none focus:outline-none'>
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className='relative px-6 h-[40vh] overflow-y-auto scrollbar-hide flex-auto'>
              <div className='my-3 flex space-y-5 flex-col'>
                <div>
                  <input
                    {...register('couponcode', { required: true })}
                    type='text'
                    className='w-full py-2 px-6 bg-[#FAFAFA] border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg'
                    placeholder='Coupon Name/Code *'
                  />
                  {errors.couponcode && (
                    <span className='text-[#FF0000]'>This field is required</span>
                  )}
                </div>
                <div>
                  <input
                    {...register('discountrate', { required: true })}
                    type='number'
                    className='w-full py-2 px-6 bg-[#FAFAFA] border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg'
                    placeholder='Discount Rate *'
                  />
                  {errors.discountrate && (
                    <span className='text-[#FF0000]'>This field is required</span>
                  )}
                </div>
                <div>
                  <input
                    {...register('maxdiscountprice', { required: true })}
                    type='number'
                    className='w-full py-2 px-6 bg-[#FAFAFA] border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg'
                    placeholder='Max. Discount Price *'
                  />
                  {errors.maxdiscountprice && (
                    <span className='text-[#FF0000]'>This field is required</span>
                  )}
                </div>
                <div className='flex space-x-5'>
                  <div className='flex w-full flex-col'>
                    <input
                      {...register('minimumprice', { required: true })}
                      type='number'
                      className='w-full py-2 px-6 bg-[#FAFAFA] border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg'
                      placeholder='Minimum Price *'
                    />
                    {errors.minimumprice && (
                      <span className='text-[#FF0000]'>This field is required</span>
                    )}
                  </div>
                  <div className='flex flex-col w-full'>
                    <input
                      {...register('maximumprice', { required: true })}
                      type='number'
                      className='w-full py-2 px-6 bg-[#FAFAFA] border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg'
                      placeholder='Maximum Price *'
                    />
                    {errors.maximumprice && (
                      <span className='text-[#FF0000]'>This field is required</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className='flex items-center justify-around p-6 border-solid border-slate-200 rounded-b'>
              <button
                type='submit'
                className='border bg-[#7D23E0] md:px-12 py-2 px-4 md:py-3 font-bold rounded-lg text-white'
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='opacity-25 fixed !mt-0 inset-0 z-40 bg-black'></div>
    </>
  )
}

export default AddCouponModal
