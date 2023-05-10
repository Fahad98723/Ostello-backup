import React, { useEffect, useState } from 'react'
import instaViolet from '../../assets/images/icons/instaViolet.svg'
import fbViolet from '../../assets/images/icons/fbViolet.svg'
import whatsappViolet from '../../assets/images/icons/whatsappViolet.svg'
import linkedinViolet from '../../assets/images/icons/linkedinViolet.svg'
import twitterViolet from '../../assets/images/icons/twitterViolet.svg'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Modal from './Modal/Modal'
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { Host_ORIGIN } from '../../utils/constant'

export default function SharePopup({
  open,
  onClose,
  TextToCopy,
  isReferral = false,
}) {
  const { pathname } = useRouter()

  const [isCopied, setIsCopied] = useState(false)

  const socialLinks = [
    {
      title: 'instagram',
      url: 'https://instagram.com',
      icon: instaViolet,
    },
    {
      title: 'fb',
      url: 'https://fb.com',
      icon: fbViolet,
    },
    {
      title: 'whatsapp',
      url: 'https://whatsapp.com',
      icon: whatsappViolet,
    },
    {
      title: 'linkedin',
      url: 'https://linkedin.com',
      icon: linkedinViolet,
    },
    {
      title: 'twitter',
      url: 'https://twitter.com',
      icon: twitterViolet,
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      if (isCopied) {
        setIsCopied(false)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [isCopied])
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <div className=' flex flex-col space-y-5  p-5  sm:w-[400px] max-w-[400px] bg-white  rounded-lg text-light-black '>
          <div className='flex justify-between text-2xl items-center '>
            <span className=''>{isReferral ? 'Referral' : 'Share'}</span>
            <CloseOutlined
              onClick={onClose}
              className='flex text-sm  text-desc-gray cursor-pointer rounded-full ring-1 p-1 ring-desc-gray hover:bg-primary hover:text-primary '
            />
          </div>
          <div className='flex justify-between space-x-3'>
            {socialLinks.map((item, i) => (
              <a
                className='block ring-1 w-10 sm:w-12 p-2 ring-gray  rounded-xl '
                href={item.url}
                key={i}
              >
                <img className='' src={item.icon?.src} alt='' />
              </a>
            ))}
          </div>

          <div className=' flex justify-center w-full relative'>
            <p
              className={`absolute px-3 py-1  -top-10 right-0  bg-desc-gray text-white rounded-lg ${
                isCopied ? 'block' : 'hidden'
              }`}
            >
              Copied
            </p>
            <input
              type='text '
              value={TextToCopy || `${Host_ORIGIN}${pathname}`}
              onChange={() => setIsCopied(true)}
              disabled
              className='w-full text-black px-2 py-1 ring-1  ring-gray outline-none border-none  active:outline-none active:border-none'
            />
            <CopyToClipboard
              text={
                TextToCopy || 'https://ostello.com/digital_marketing_course'
              }
              onCopy={() => setIsCopied(true)}
            >
              <button className='bg-[#7D23E0] text-white px-2 ring-1 ring-[#7D23E0] active:opacity-75 rounded-sm rounded-l-none'>
                COPY
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </Modal>
    </div>
  )
}