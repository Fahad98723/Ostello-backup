import React, { createContext, useContext } from 'react'
import { IoMdClose } from 'react-icons/io'

export const PopupContext = createContext()

const Popup = () => {
  const [
    {
      title,
      tagline,
      isVisible,
      successText,
      cancelText,
      handleSuccess,
      handleCancel,
    },
  ] = useContext(PopupContext)

  return (
    <div className='absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 flex justify-center items-center  font-dm-sans px-4'>
      <div
        className={`${
          isVisible ? 'flex' : 'hidden'
        } relative w-96 lg:w-[500px] rounded-xl flex-col bg-white px-6 py-4 items-center shadow-2xl`}
      >
        <button
          onClick={(e) => handleCancel(e)}
          className='absolute shadow-md hover:shadow-lg hover:bg-red-400 transition-colors rounded-full w-8 h-8 bg-primary top-2 right-2 text-white font-bold flex items-center justify-center'
        >
          <IoMdClose />
        </button>
        <div className='w-28 h-28 my-6 rounded-full bg-lavender font-bold text-7xl flex justify-center items-center'>
          !
        </div>
        <div className='text-4xl font-extrabold text-center'>{title}</div>
        <div className='text-xl font-medium text-center'>{tagline}</div>
        <div className='flex justify-center mt-6 space-x-4'>
          <button
            onClick={(e) => handleSuccess(e)}
            className='font-medium bg-primary rounded-xl px-6 border-2 border-primary py-2 text-white text-lg'
          >
            {successText}
          </button>
          <button
            onClick={(e) => handleCancel(e)}
            className='border-2 border-primary font-medium bg-white rounded-xl px-6 py-2 text-primary text-lg'
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Popup
