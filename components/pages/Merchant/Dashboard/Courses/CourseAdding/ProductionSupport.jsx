import React, { createContext, useContext } from 'react'
import { MdEmail } from 'react-icons/md'
import { BsTelephoneFill } from 'react-icons/bs'
import { BsCheck } from 'react-icons/bs'
import { GrFormClose } from 'react-icons/gr'
import Modal from '../../../../../UI/Modal/Modal'

export const ProductionContext = createContext()

const ProductionSupport = ({ submitTrueState }) => {
  const [isSubmitTrue, setIsSubmitTrue] = submitTrueState
  // const [{ handleClose }] = useContext(SidePopupContext);
  return (
    <>
      <Modal open={isSubmitTrue} onClose={setIsSubmitTrue(false)}>
        <div
          className='w-screen absolute h-screen z-50'
          style={{ background: 'rgba(0, 0, 0, 0.25)' }}
        >
          <div
            className='bg-white w-max h-80 rounded-3xl '
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
            }}
          >
            <GrFormClose
              className='ml-auto mt-3 mr-3 text-xl cursor-pointer'
              onClick={(e) => {
                setIsSubmitTrue(false)
              }}
            />
            <div className='px-20 flex flex-col justify-start items-center '>
              <svg
                className='checkmark'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 52 52'
              >
                <circle
                  className='checkmark__circle'
                  cx='26'
                  cy='26'
                  r='25'
                  fill='none'
                />
                <path
                  className='checkmark__check'
                  fill='none'
                  d='M14.1 27.2l7.1 7.2 16.7-16.8'
                />
              </svg>
              <h1 className='text-center text-xl mb-10'>
                Your course has been successfully <br /> sent for review!!!
              </h1>
            </div>
          </div>
        </div>
      </Modal>
      <div className='bg-white rounded-lg p-8 my-5 w-full mr-20'>
        <h1 className='text-xl hidden lg:flex font-medium'>
          Production Support
        </h1>
        <div className='flex flex-col justify-center items-center lg:mt-20'>
          <h1 className='text-primary text-2xl lg:text-[64px] font-bold mb-5'>
            Coming Soon
          </h1>
          <h2 className='text-[#A1A1A1] text-center  w-max py-2 lg:text-[32px] mt-5'>
            We are actively working to improve <br /> your experience.
          </h2>
          <div className='py-4 space-y-2  '>
            <h1 className='text-solid w-max lg:text-lg text-[28px]'>
              For more details reach out to us at:
            </h1>
            <div className='flex items-center justify-center space-x-3 text-[24px]'>
              <MdEmail className='text-primary text-xl' />
              <h1 className='text-[#0026AE] underline'>
                Support@ostello.co.in
              </h1>
            </div>
            <div className='flex items-center justify-center space-x-3 text-[24px]'>
              <BsTelephoneFill className='text-primary ' />
              <h1 className=' '>9508756810</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductionSupport
