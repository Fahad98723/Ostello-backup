import React, { useEffect, useState } from 'react'
import BlogPostCard from './BlogPostCard'
import { AiOutlineSearch } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdminBlogs } from '../../../redux/slices/adminBlogSlice'

const BlogsCategory = ({
  Category1,
  Category2,
  Category3,
  Category4,
  Category5,
}) => {
  const dispatch = useDispatch()

  const { adminBlogs, loading, isDeleted, isAddedNewBlog } = useSelector(
    (state) => state.adminBlogs
  )

  const [data, setData] = useState()

  // const [data, setData] = useState(
  //   BlogCategories.filter((cur) => {
  //     return cur.category === "Category1";
  //   })
  // );

  const [category1, setCategory1] = useState(true)
  const [category2, setCategory2] = useState(false)
  const [category3, setCategory3] = useState(false)
  const [category4, setCategory4] = useState(false)
  const [category5, setCategory5] = useState(false)

  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!search) {
      setData(adminBlogs)
    }
  }, [])

  useEffect(() => {
    if (adminBlogs) {
      const result = adminBlogs.filter((cur) => {
        return cur.category.toLowerCase().includes(search.toLowerCase())
      })
      setData(result)
    }
  }, [search, adminBlogs])

 
  return (
    <div>
      <div className=' mt-16 lg:mt-20 xl:px-32'>
        <h1 className='text-center text-2xl xl:text-5xl xl:h-36 font-bold '>
          Search blogs according to <br /> Category
        </h1>
        <div className='flex justify-center'>
          <div
            className=' flex  items-center space-x-3 p-2 border w-max lg:w-2/4 rounded-lg'
            style={{ borderColor: 'rgba(125, 35, 224, 0.35)' }}
          >
            <AiOutlineSearch className='text-primary text-3xl' />
            <input
              onChange={(e) => setSearch(e.target.value)}
              type='text'
              placeholder='What are you looking for?'
              className='focus:outline-none w-max lg:w-full '
            />
          </div>
        </div>
        {/* <div className="flex flex-col lg:flex-row text-xl gap-10 lg:gap-24 xl:gap-52 px-4 lg:px-20 xl:px-4 mt-10  ">
          <button
            className={
              category1
                ? "text-primary border-b-4 py-1 border-solid font-semibold"
                : "text-medium-white  font-semibold"
            }
            onClick={() => {
              setCategory1(true);
              setCategory2(false);
              setCategory3(false);
              setCategory4(false);
              setCategory5(false);
              filterResult("Category1");
            }}
          >
            {Category1}
          </button>
          <button
            className={
              category2
                ? "text-primary border-b-4 py-1 border-solid font-semibold"
                : " text-medium-white  font-semibold"
            }
            onClick={() => {
              setCategory1(false);
              setCategory2(true);
              setCategory3(false);
              setCategory4(false);
              setCategory5(false);
              filterResult("Category2");
            }}
          >
            {Category2}
          </button>
          <button
            className={
              category3
                ? "text-primary border-b-4 py-1 border-solid font-semibold"
                : "text-medium-white  font-semibold"
            }
            onClick={() => {
              setCategory1(false);
              setCategory3(true);
              setCategory5(false);

              setCategory2(false);
              setCategory4(false);
              filterResult("Category3");
            }}
          >
            {Category3}
          </button>
          <button
            className={
              category4
                ? "text-primary border-b-4 py-1 border-solid font-semibold"
                : "text-medium-white  font-semibold"
            }
            onClick={() => {
              setCategory2(false);
              setCategory4(true);
              setCategory5(false);

              setCategory3(false);
              setCategory1(false);
              filterResult("Category4");
            }}
          >
            {Category4}
          </button>
          <button
            className={
              category5
                ? "text-primary border-b-4 py-1 border-solid font-semibold"
                : " text-medium-white font-semibold"
            }
            onClick={() => {
              setCategory2(false);
              setCategory4(false);
              setCategory5(true);
              setCategory3(false);
              setCategory1(false);
              filterResult("Category5");
            }}
          >
            {Category5}
          </button>
        </div> */}
      </div>
      <div className='grid sm:grid-cols-2 xl:grid-cols-3 gap-20   lg:px-20 mb-20 py-20   '>
        {data?.map((item, idx) => {
          const {
            id,
            image,
            alt,
            timestamp,
            description,
            readtime,
            title,
            initialtext,
            blogLink,
            metadesc,
            authorSrc,
            authorAlt,
            authorName,
          } = item
          return (
            <BlogPostCard
              id={id}
              key={idx}
              src={image?.url}
              alt={alt}
              postDate={timestamp}
              read={readtime}
              initialtext={metadesc}
              blogLink={`/blogs/${id}`}
              title={title}
              authorSrc={authorSrc}
              authorAlt={authorAlt}
              authorName={authorName}
            />
          )
        })}
      </div>
    </div>
  )
}

export default BlogsCategory
