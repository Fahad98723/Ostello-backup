import Image from 'next/image'
import React from 'react'

const BlogAuthor = ({authorSrc,authorAlt,authorName,postDate,read}) => {
  return (
    <div className="flex text-medium-white py-3">
    <img
      src={authorSrc.src}
      alt={authorAlt}
      className="w-14 h-14 rounded-full"
    />
    <div className="flex flex-col px-4">
      <p className="">{authorName}</p>

      <p className="">
        {postDate} <span className="px-2">|</span>{" "}
        <span className="">{`${read} min read`}</span>
      </p>
    </div>
  </div>
  )
}

export default BlogAuthor