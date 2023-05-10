import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiFillEye } from "react-icons/ai";

import { FiArrowUpRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentBlogSuccess,
  selectBlogs,
} from "../../../../redux/slices/adminBlogSlice";

// import image from '../../../../assets/images/workshopImage.webp'
export default function BlogCard({
  id,
  images,
  title,
  metadesc,
  slugurl,
  timestamp,
  author,
  category,
  views,
}) {
  const PostDate = () => {
    let formatted;

    let parts = Date(timestamp).split(" ");
    formatted = parts[2] + "-" + parts[1] + "-" + parts[3];
    return formatted;
  };

  const { adminBlogs, currentBlog } = useSelector(selectBlogs);
  const dispatch = useDispatch();

  const router = useRouter();

  return (
    <div
      onClick={() => {
        adminBlogs.forEach((item) => {
          if (item.id === id) {
            dispatch(getCurrentBlogSuccess(item));
            router.push(`/blogs/${item?.slugurl}`);
            return;
          }
        });
      }}
      className="max-w-[326px] my-10 cursor-pointer"
    >
      <div className="relative">
        <img
          src={`https://cdn.ostello.co.in/${images?.key}`}
          className="sm:w-[326px] h-[238px] w-full  brightness-95 "
          alt=""
        />
        <div
          style={{
            backdropFilter: "blur(24px)",
            background: "rgba(255, 255, 255, 0.3)",
          }}
          className="absolute bottom-0 w-full flex   justify-between p-4 text-white"
        >
          <div className=" ">
            <p>{author?.length > 0 ? author : "Ostello"}</p>
            <p>{PostDate()}</p>
          </div>
          <p>{category}</p>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-5 text-base">{metadesc}</p>

        <div className="mt-5 flex justify-between ">
          <p className="">
            <a className="flex  items-center space-x-1 text-[16px] text-[#7F56D9]">
              <span>Read post</span>
              <FiArrowUpRight />
            </a>
          </p>
          <p className="">
            <a className="flex  items-center space-x-1 text-[16px] text-[#7F56D9]">
              <AiFillEye />
              <span>
                {parseInt(views) > 1000 ? `${parseInt(views) / 1000} k` : views}{" "}
                views
              </span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
