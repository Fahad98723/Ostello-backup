import React from 'react'
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from 'react-share'

import { AiOutlineCopy } from 'react-icons/ai'
import { FaFacebookF } from 'react-icons/fa'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { FaLinkedinIn } from 'react-icons/fa'
const ShareCard = () => {
  return (
    <div className=''>
      <div>
        <div className='bg-white shadow-xl w-40 absolute -right-6 sm:left-0  rounded-lg  h-36'>
          <button
            className='flex m-auto text-medium-slate p-3'
            onClick={() => navigator.clipboard.writeText('Post Link Copied ')}
          >
            <AiOutlineCopy className='m-auto mr-4 text-md ' />
            Copy Link
          </button>
          <div className='flex'>
            <hr className='text-light-slate w-16 m-auto' />
            <p className='m-auto text-light-slate px-2'>OR</p>
            <hr className='text-light-slate w-16 m-auto' />
          </div>
          <p className='text-medium-slate text-center py-1'>Share Via</p>
          <div className='flex justify-center items-center gap-6 mt-1'>
            <FacebookShareButton
              url='https://google.com'
              title='Blog Sharing to Facebook'
              hashtag='#Blog'
            >
              <FaFacebookF className='text-primary w-3.5 h-5' />
            </FacebookShareButton>
            <WhatsappShareButton
              url='https://google.com'
              title='Blog Sharing to Instagram'
              description='Blog Description'
            >
              <AiOutlineWhatsApp className='text-primary w-5 h-5' />
            </WhatsappShareButton>
            <LinkedinShareButton
              url='https://google.com'
              title='Blog Sharing to Instagram'
              summary='Blog Summary'
              p
            >
              <FaLinkedinIn className='text-primary w-5 h-5' />
            </LinkedinShareButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareCard
