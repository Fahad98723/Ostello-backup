import Link from 'next/link'
import React from 'react'

import { makeDateFormat } from '../../../../utils/utils'

const BlogCard = ({ data }) => {
  const {
    title,
    image,
    description,
    metadesc,
    readtime,
    timestamp,
    id,
    slugurl,
  } = data

  const blogDate = makeDateFormat(timestamp)

  return (
    <div className='p-4 bg-white min-h-full rounded-[2.5rem] shadow-md'>
      <Link legacyBehavior prefetch={false} href={`/admin-dashboard/blogs/edit/${slugurl}`} className=''>
        <div className='flex flex-col  text-[22px] py-2 font-semibold leading-[30px] '>
          <img
            className='hover:scale-110 duration-300 cursor-pointer hover:rounded-t-[2.5rem] h-[200px] '
            src={image?.url}
            alt=''
          />
          <p className='text-[14px] pt-3 text-[#A0A0A0]'>
            {blogDate} <span className='mx-1'>l</span> {readtime} read
          </p>

          {title}

          <p className='text-[#414141] text-[18px]'>
            {metadesc?.substr(0, 95)}
            {metadesc?.length > 96 && (
              <span>
                ...{' '}
                <span className='ml-1 text-[#7D23E0] text-[18px] leading-[30px] font-bold'>
                  Read More
                </span>
              </span>
            )}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default BlogCard
