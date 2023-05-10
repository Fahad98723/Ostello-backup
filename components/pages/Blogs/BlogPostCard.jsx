import React, { useState } from "react";
import { AiFillRightCircle } from "react-icons/ai";
import shareIcon from "../../../assets/share.png";
import ShareCard from "../../UI/ShareCard";
import { useRouter } from "next/router";

const BlogPostCard = ({
  id,
  src,
  alt,
  postDate,
  read,
  title,
  initialtext,
  blogLink,
  authorSrc,
  authorAlt,
  authorName,
}) => {
  const [share, setShare] = useState(false)

  const router = useRouter()

  const handleSingleBlog = (e) => {
    router.push(`${blogLink}`)
    e.stopPropagation()
  }

  return (
    <div
      onClick={handleSingleBlog}
      className=' p-6 lg:p-4   w-96 h-full   rounded-3xl mx-auto cursor-pointer '
      key={id}
      style={{ boxShadow: '0px 0px 40px -15px rgba(125, 35, 224, 0.25)' }}
    >
      <div className='relative'>
        <div
          className='w-10 h-10 bg-white rounded-full z-1 absolute right-10 top-5 cursor-pointer'
          onClick={(e) => {
            setShare(!share)
            e.stopPropagation()
          }}
        >
          <img
            src={shareIcon.src}
            alt='share'
            className=' m-auto mt-2 w-5 h-5 z-1 '
          />
          {share && <ShareCard />}
        </div>
        <img src={`https://cdn.ostello.co.in/${src?.key}`} alt={alt} className='rounded-lg z-10 w-full h-[250px]' />
      </div>
      <div className='flex px-1 text-medium-white text-sm mt-2'>
        <p className='flex'>
          {/* {postDate?.split('T')[1].split('.')[0]} */}
          {postDate?.split('T')[0]} <span className='px-2'>|</span>{' '}
          <span className=''>{`${read} min read`}</span>
        </p>
      </div>
      <h1 className='px-1 text-lg w-full font-bold'>{title}</h1>
      <div className='flex px-1 py-3'>
        {/* <img
          src={authorSrc}
          alt={authorAlt}
          className="w-10 h-10  rounded-full"
        />
        <p className="justify-center items-center flex px-4 text-lg text-medium-white">
        //   {authorName}
        // </p> */}
        <p className="">
          {initialtext?.slice(0,150)}
          <span className="">

              <h2 className="  font-semibold text-primary  flex  cursor-pointer">
                Read more
              </h2>
          </span>
        </p>
      </div>
    </div>
  )
}

export default BlogPostCard
