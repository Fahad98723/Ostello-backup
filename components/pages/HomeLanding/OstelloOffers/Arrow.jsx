import { ArrowRightOutlined } from '@ant-design/icons'
import Link from 'next/link'
import React from 'react'

export default function Arrow({ url }) {
  return (
    <div className='mt-5 cursor-pointer bg-white w-fit p-2 rounded-md group'>
      <Link legacyBehavior prefetch={false} href={url}>
        <ArrowRightOutlined className='flex text-black  duration-200 group-hover:ml-5' />
      </Link>
    </div>
  )
}
