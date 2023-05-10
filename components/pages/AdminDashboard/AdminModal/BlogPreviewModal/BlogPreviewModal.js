import React from 'react'
import { useSelector } from 'react-redux'
import { makeDateFormat, readingTime } from '../../../../../utils/utils'

const BlogPreviewModal = ({ setShowModal }) => {
  const { previewBlogData } = useSelector((state) => state.adminBlogs)

  const { title, desc, image } = previewBlogData


  const date = new Date()

  const previewBlogDate = makeDateFormat(date)
  // const readTime = readingTime(desc).toString()


  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative w-[90%] w mb-6 mx-auto max-w-6xl'>
          {/*content*/}
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className='flex items-start justify-between py-3 px-5 rounded-t'>
              <div className='text-[26px] leading-[47px] font-medium'></div>
              <button
                className='p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                onClick={() => setShowModal(false)}
              >
                <span className=' bg-white border border-[#7D23E0] rounded-full p-4 flex justify-center items-center h-6 w-6 text-2xl text-[#7D23E0] outline-none focus:outline-none'>
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className='relative w-full px-6 h-[80vh] overflow-y-auto scrollbar-hide flex-auto'>
              <p className='text-3xl mb-5 font-bold'>{title}</p>
              <img className='w-full h-[320px]' src={image} alt='' />
              <div className='px-6 py-4'>
                <div className='flex space-x-2 text-[#a0a0a0]'>
                  <div>{previewBlogDate}</div>
                  <div>|</div>
                  {/* <div>{readTime} read</div> */}
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: desc }}
                  className='my-12 font-light text-xl text-[#000000]'
                ></div>
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

export default BlogPreviewModal
