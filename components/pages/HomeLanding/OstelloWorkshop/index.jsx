import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import Carousel from 'react-elastic-carousel'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAdminBlogs,
  selectBlogs,
} from '../../../../redux/slices/adminBlogSlice'
import BlogCard from '../../Blogs/Blog/BlogCard'

export default function OstelloWorkshop() {
  const carousel = useRef(null)
  const dispatch = useDispatch()
  const { adminBlogs } = useSelector(selectBlogs)
  useEffect(() => {
    dispatch(fetchAdminBlogs())
  }, [])

  return (
    <>
      {adminBlogs?.length ? (
        <section className='px-10  py-10'>
          <div className='px-1 md:px-[80px]'>
            <h1 className='text-2xl md:text-4xl font-bold'>
              Upcoming webinars and workshops
            </h1>
            <p className='mt-5 text-lg'>
              Interviews, tips, guides, industry best practices, and news.{' '}
            </p>
          </div>
          <div className='flex px-5 md:px-36'>
            <Link legacyBehavior prefetch={false} href={'/blogs'}>
              <a className=' text-right ml-auto my-5'>View all posts</a>
            </Link>
          </div>
          <div className='mb-5 ml-0 '>
            <div className='px-0 md:px-[40px]'>
              <Carousel
                ref={carousel}
                showArrows={false}
                itemsToShow={3}
                className=''
                pagination={false}
                breakPoints={[
                  { width: 1, itemsToShow: 1 },
                  { width: 600, itemsToShow: 2 },
                  { width: 900, itemsToShow: 3 },
                ]}
              >
                {adminBlogs?.map((blog, key) => (
                  <>
                    <BlogCard key={key} {...blog} />
                  </>
                ))}
              </Carousel>
            </div>

            <div className='flex space-x-5 mt-5 px-5 md:px-[80px]'>
              <ArrowLeftOutlined
                onClick={() => {
                  carousel.current.slidePrev()
                }}
                className='flex items-center justify-center bg-white text-gray rounded-full border p-2 cursor-pointer'
              />
              <ArrowRightOutlined
                onClick={() => {
                  carousel.current.slideNext()
                }}
                className='flex items-center justify-center bg-white text-gray rounded-full border p-2 cursor-pointer'
              />
            </div>
          </div>
        </section>
      ) : ''}
    </>
  )
}
