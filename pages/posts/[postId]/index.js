import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../../components/layout/Footer";
import LoadingSpinner from "../../../components/layout/LoadingSpinner";
import MetaHelmet from "../../../components/MetaHelmet";
import BlogPage from "../../../components/pages/Blogs/Blog/BlogPage";
import BlogPostCard from "../../../components/pages/Blogs/BlogPostCard";
import {
  fetchAdminBlogs,
  getCurrentBlogSuccess,
  selectBlogs,
} from "../../../redux/slices/adminBlogSlice";
import { setUserLocation } from "../../../redux/slices/UserAnalytics";
import AuthorPhoto from "../../../utils/assets/images/logo.png";
import { host } from "../../../utils/constant";
import BlogCard from "../../../components/pages/Blogs/Blog/BlogCard";
import { toast } from "react-hot-toast";
import PostPage from "../../../components/pages/Blogs/Blog/PostPage";


export default function PostDetails() {
  const { adminBlogs, currentBlog } = useSelector(selectBlogs);
  const dispatch = useDispatch();
  const [relatedBlog, setRelatedBlog] = useState([]);

  const router = useRouter();

  useEffect(() => {
    navigator.geolocation &&
      navigator.geolocation.getCurrentPosition(function (position) {
        dispatch(
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
      });
  });
  // useEffect(() => {
  //   if (adminBlogs.length < 1) {
  //     dispatch(fetchAdminBlogs());
  //   }
  //   if (currentBlog) {
  //     const related = adminBlogs.filter(
  //       (f) => f?.category === currentBlog?.category
  //     );
  //     setRelatedBlog(related?.filter((r) => r.id !== currentBlog.id));
  //   }
  // }, [currentBlog, adminBlogs]);

  useEffect(() => {
    if (router.query.postId) {
      const run = async () => {
        try {
          const { data } = await axios.get(
            `${host}/blog?slugurl=${router.query.postId}`
          );
          dispatch(getCurrentBlogSuccess(data?.message));
        } catch (err) {
          toast.error(err.message);
        }
      };
      run();
    }
  }, [router.query.postId]);

  if (router.isFallback) {
    return <LoadingSpinner />;
  }

  return (
    <div className="md:max-w-[1350px] mx-auto">
      <MetaHelmet
        title={currentBlog?.metatitle}
        description={currentBlog?.metadesc}
        link={currentBlog?.slugurl}
      />

      <PostPage
        id={currentBlog?.id}
        category={currentBlog?.category}
        title={currentBlog?.title}
        images={currentBlog?.images}
        videos={currentBlog?.videos}
        alt="Blog Pic"
        description={currentBlog?.description}
        metaDesc={currentBlog?.metadesc}
        slugUrl={currentBlog?.slugurl}
        authorSrc={AuthorPhoto}
        authorAlt="author Pic"
        authorName="Ostello Admin "
        postDate={currentBlog?.timestamp?.split("T")[0]}
        read={currentBlog?.readtime}
        views={currentBlog?.views || "0"}
        likedstudents={currentBlog?.likedstudents}
        institute={currentBlog?.institute}
      />

      {/* <Comments /> */}

      {relatedBlog.length > 0 && (
        <>
          <hr className="mx-20 text-light-slate mt-10 lg:mt-0 " />
          <div className="py-10">
            <h1 className="text-primary text-xl lg:text-4xl font-bold px-8 lg:px-28">
              Related blogs{" "}
              <span className="text-slate"> for you to read </span>
            </h1>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-20   lg:px-20 mb-20   ">
            {relatedBlog?.map((item, idx) => (
              // <BlogPostCard
              //   id={item.id}
              //   src={item.image}
              //   alt={item.alt}
              //   blogLink={`/blogs/${item?.title?.replace(/ /g, '-')}`}
              //   postDate={item.timestamp}
              //   read={item.readtime}
              //   title={item.title}
              //   authorSrc={item.authorSrc}
              //   authorAlt={item.authorAlt}
              //   authorName={item.authorName}
              //   key={idx}
              // />
              <BlogCard key={idx} {...item} />
            ))}
          </div>
          {/* <Adsense
            client={`${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
            slot="6397614396"
            style={{ display: "block", textAlign: "center", marginTop:"10px"  }}
            layout="in-article"
            format="fluid"
          /> */}
        </>
      )}

      <Footer />
    </div>
  );
}

export async function getServerSideProps({ params, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const blog = params.postId.replace(/-/g, " ");
  const data = await axios.get(`${host}/blog?title=${blog}`);
  const currentBlog = data.data.message;
  if (!blog) {
    return {
      notFound: true,
    };
  }
  // Pass post data to the page via props
  return { props: { currentBlog } };
}
