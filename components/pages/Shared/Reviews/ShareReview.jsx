import React from 'react'
import toast from 'react-hot-toast'
import { AiOutlineTwitter } from 'react-icons/ai'
import { FaFacebookF } from 'react-icons/fa'
import { useCopyToClipboard } from 'react-use'
import { assets } from '../../../../utils/assets'



export default function ShareReview({ fb_link, twitter_link, shareURL }) {
  const [state, copyToClipboard] = useCopyToClipboard()
  let currentLocation

  if (typeof window !== 'undefined') {
    currentLocation = window.location.href
  }
  return (
    <div className='w-[80vw] md:w-[500px] px-10 py-6'>
      <h1 className='text-center'>Share Via</h1>
      <div className='my-6 flex items-center justify-center space-x-4'>
        <a className=' rounded-md bg-gray/20 p-2' href={fb_link}>
          <FaFacebookF size={30} />
        </a>
        <a className=' rounded-md bg-gray/20 p-2' href={twitter_link}>
          <AiOutlineTwitter size={30} />
        </a>
      </div>
      <div className='border border-gray/20 rounded-md flex px-4 space-x-2 '>
        <input
          className=' py-2 w-full outline-none '
          type='text'
          value={shareURL || currentLocation}
        />
        <button
          onClick={() => {
            copyToClipboard(shareURL || currentLocation)
            toast.success('Copied to clipboard !')
          }}
          className='whitespace-nowrap font-bold'
        >
          {state.value?.length > 0 ? 'Copied !' : 'Copy'}
        </button>
      </div>
    </div>
  )
}
