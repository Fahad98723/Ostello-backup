import React, { useEffect, useState } from "react";
import { AiOutlineShareAlt, AiOutlineRight } from "react-icons/ai";
import { CgArrowLongLeft, CgArrowLongRight } from "react-icons/cg";
import ShareCard from "../../UI/ShareCard";
import { useDispatch, useSelector } from "react-redux";
import adminBlogSlice, {
  fetchAdminBlogs,
  getCurrentBlogSuccess,
  selectBlogs,
} from "../../../redux/slices/adminBlogSlice";
import Link from "next/link";

const BlogPost = ({
  category,
  title,
  src,
  alt,
  authorName,
  postDate,
  read,
  authorSrc,
  blogLink,
  authorAlt,
  id,
}) => {
  const [share, setShare] = useState(false);
  const { adminBlogs } = useSelector(selectBlogs);
  const dispatch = useDispatch();
  return (
    <>
      <main className="px-8 lg:px-32   flex flex-col-reverse lg:flex-row items-center justify-center lg:py-10 ">
        <div className="flex flex-col py-10 items-start space-y-3 lg:space-y-4 mt-  ">
          <h2 className="text-md lg:text-lg font-bold">
            {category?.charAt(0).toUpperCase() +
              category?.slice(1).toLowerCase()}
          </h2>
          <h1 className=" text-slate font-bold text-2xl lg:text-3xl lg:leading-10 xl:text-5xl xl:leading-snug lg:w-3/4 ">
            {title}
          </h1>
          <div className="flex text-medium-white pb-3">
            {/* <img
              src={authorSrc}
              alt={authorAlt}
              className="w-14 h-14 rounded-full"
            />
            <div className="flex flex-col px-4">
              <p className="">{authorName}</p>
            </div> */}

            <p className="">
              {postDate?.split("T")[0]} <span className="px-2">|</span>{" "}
              <span className="">{`${read} min read`}</span>
            </p>
          </div>
          <div className="flex py-5">
            <button
              className="w-28 h-10 bg-primary text-white rounded-full flex align-center px-3 "
              onClick={() => {
                setShare(!share);
              }}
            >
              <AiOutlineShareAlt className="text-xl m-auto  " />
              <p className="m-auto text-xl">Share</p>
            </button>
            {share && (
              <div className="relative ">
                {" "}
                <ShareCard />
              </div>
            )}
            <span className="m-auto">
              <Link
                legacyBehavior
                prefetch={false}
                href={`${blogLink}`}
                onClick={() => {
                  adminBlogs.forEach((item) => {
                    if (item.id === id) {
                      dispatch(getCurrentBlogSuccess(item));
                      return;
                    }
                  });
                }}
              >
                <h2 className=" px-5 lg:px-10 font-semibold text-primary  flex  cursor-pointer">
                  Read more <AiOutlineRight className="m-auto ml-1 w-3 " />
                </h2>
              </Link>
            </span>
          </div>
        </div>
        <img src={src} alt={alt} className="w-[600px] h-[400px] rounded-2xl" />
      </main>
      <div className="flex justify-center items-center">
        <CgArrowLongLeft className="text-3xl text-[#9C9C9C]" />
        <p className=""></p>
        <CgArrowLongRight className="text-3xl text-[#9C9C9C]" />
      </div>
    </>
  );
};

export default BlogPost;

// export const ShareButton = () => {
//   return (
//     <>
//       <div className="">
//         <div>
//           <div className="bg-white shadow-xl w-40 absolute rounded-lg  h-36">
//             <button
//               className="flex m-auto text-medium-slate   p-3 "
//               onClick={() => navigator.clipboard.writeText("Post Link Copied ")}
//             >
//               <AiOutlineCopy className="m-auto mr-4 text-md " />
//               Copy Link
//             </button>
//             <div className="flex">
//               <hr className="text-light-slate w-16 m-auto" />
//               <p className="m-auto text-light-slate px-2">OR</p>
//               <hr className="text-light-slate w-16 m-auto" />
//             </div>
//             <p className="text-medium-slate text-center py-1">Share Via</p>
//             <div className="flex justify-center items-center gap-6 mt-1">
//               <FacebookShareButton
//                 url="https://google.com"
//                 quote="Blog Sharing to Facebook"
//                 hashtag="#Blog"
//               >
//                 <FaFacebookF className="text-primary w-3.5 h-5" />
//               </FacebookShareButton>
//               <InstapaperShareButton
//                 url="https://google.com"
//                 title="Blog Sharing to Instagram"
//                 description="Blog Description"
//               >
//                 <FaInstagram className="text-primary w-5 h-5" />
//               </InstapaperShareButton>
//               <Link legacyBehavior prefetch={false}edinShareButton
//                 url="https://google.com"
//                 title="Blog Sharing to Instagram"
//                 summary="Blog Summary"
//               >
//                 <FaLinkedinIn className="text-primary w-5 h-5" />
//               </LinkedinShareButton>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
