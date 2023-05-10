import React from 'react'

const DeleteConfirmationModal = ({
  setDeleteConfirmationModal,
  setDeleteCoupon,
}) => {
  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative lg:w-[30%] md:w-[50%] w-[90%] w mb-6 mx-auto max-w-6xl'>
          {/*content*/}
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className='flex items-start justify-between py-3 px-5 rounded-t'>
              <div className='text-[26px] leading-[47px] font-medium'></div>
              <button
                className='p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                onClick={() => {
                  setDeleteConfirmationModal(false)
                  setDeleteCoupon(false)
                }}
              >
                <span className=' bg-white border border-[#7D23E0] rounded-full p-4 flex justify-center items-center h-6 w-6 text-2xl text-[#7D23E0] outline-none focus:outline-none'>
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className='relative px-6 h-fit-content overflow-y-auto scrollbar-hide flex-auto'>
              <div className='flex flex-col items-center justify-center'>
                <h3 className='text-[#FF0000]-500 font-bold text-2xl'>Caution</h3>
                <p className='text-center text-xl mt-3'>
                  The details will be deleted and cannot be undone
                </p>
              </div>
            </div>
            {/*footer*/}
            <div className='flex items-center justify-around p-6 border-solid border-slate-200 rounded-b'>
              <button
                onClick={() => {
                  setDeleteCoupon(true)
                  setDeleteConfirmationModal(false)
                }}
                className='w-full text-center py-2 rounded-lg text-xl text-white font-bold bg-red-500'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed !mt-0 inset-0 z-40 bg-black'></div>
    </>
  )
}

export default DeleteConfirmationModal
