import Link from 'next/link'
import React from 'react'

import { FiArrowUpRight } from 'react-icons/fi'

export default function WorkshopCard({
  img,
  title,
  shortDesc,
  slug,
  date,
  host,
  category,
}) {
  return (
    <div className='max-w-[326px]'>
      <div className='relative'>
        <img
          src={img}
          className='sm:w-[326px] sm:h-[238px] w-full h-full '
          alt=''
        />
        <div
          style={{
            backdropFilter: 'blur(20px)',
            background: 'rgba(255, 255, 255, 0.3)',
          }}
          className='absolute bottom-0 w-full flex   justify-between p-4 text-white '
        >
          <div className=' '>
            <p>{host}</p>
            <p>{date}</p>
          </div>
          <p>{category}</p>
        </div>
      </div>

      <div className='mt-5'>
        <h2 className='text-2xl font-bold'>{title}</h2>
        <p className='mt-5 text-[16px]'>{shortDesc}</p>

        <div className='mt-5  '>
          <Link legacyBehavior prefetch={false} href={slug} className=''>
            <a className='flex  items-center space-x-1 text-[16px] text-[#7F56D9]' href=''>
              <span>Read post</span>
              <FiArrowUpRight />
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
