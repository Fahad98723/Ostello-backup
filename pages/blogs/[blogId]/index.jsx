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

import { toast } from "react-hot-toast";
import { InstiutesWith99 } from "../../../components/CochingWith99/Data";
import useScreenWidth from "../../../components/hooks/useScreenWidth";
import Carousel from "react-elastic-carousel";
import dynamic from "next/dynamic";

const OstelloFAQ = dynamic(
  () => {
    return import("../../../components/pages/HomeLanding/OstelloFAQ");
  },
  { ssr: false }
);
const InstituteCard = dynamic(
  () => {
    return import("../../../components/UI/InstituteCard");
  },
  { ssr: false }
);
const BlogCard = dynamic(
  () => {
    return import("../../../components/pages/Blogs/Blog/BlogCard");
  },
  { ssr: false }
);

export default function BlogDetails({ currentBlog }) {
  const { adminBlogs } = useSelector(selectBlogs);
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

  const [singleBlog, setSingleBlog] = useState({});

  useEffect(() => {
    if (router.query.blogId) {
      const run = async () => {
        try {
          const { data } = await axios.get(
            `${host}/blog?slugurl=${router.query.blogId}`
          );
          dispatch(getCurrentBlogSuccess(data?.message));
          setSingleBlog(data?.message);
        } catch (err) {
          toast.error(err.message);
        }
      };
      run();
    }
  }, [router.query.blogId]);

  const [institutes, setInstitutes] = useState([]);

  useEffect(() => {
    //99 ta courses institutes lists add from here

    let institutesData = [];

    InstiutesWith99.forEach(async (e) => {
      const { data } = await axios.get(`${host}/institute?id=${e}`);

      if (data.message) {
        institutesData.push(data?.message);
      }

      if (institutesData.length === 38) {
        setInstitutes(institutesData);
      }
    });
  }, []);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3 },
  ];
  const { screenWidth } = useScreenWidth();

  if (router.isFallback) {
    return <LoadingSpinner />;
  }

  return (
    <div className="md:max-w-[1350px] mx-auto">
      <MetaHelmet
        title={currentBlog?.title}
        description={currentBlog?.metadesc}
        link={currentBlog?.slugurl}
      />

      <BlogPage
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
        currentBlog={currentBlog}
      />

      {/* <Comments /> */}

      <div className="md:max-w-[1400px] md:mx-auto md:py-10 px-1">
        <Carousel
          renderPagination={({ pages, activePage, onClick }) => {
            return (
              <div className="flex items-center space-x-2 mt-3 ">
                {pages?.map((page, i) => {
                  const isActivePage = activePage === page;
                  return (
                    <div
                      className={`cursor-pointer  h-2 rounded-md my-5 transition-all duration-500 ease-in-out ${
                        isActivePage
                          ? "bg-primary md:w-28 w-16 "
                          : "bg-gray/20 md:w-6 w-2"
                      }`}
                      key={i}
                      onClick={() => onClick(page)}
                      // active={isActivePage}
                    />
                  );
                })}
              </div>
            );
          }}
          breakPoints={breakPoints}
          showArrows={false}
          // enableAutoPlay
          autoPlaySpeed={1000}
          pagination={
            screenWidth > 768 && institutes?.length > 3 ? true : false
          }
        >
          {institutes?.map((item, key) => (
            <div key={key} className="my-5">
              <InstituteCard {...item} key={key} />
            </div>
          ))}
        </Carousel>
      </div>

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
      {currentBlog?.faqs?.length ? (
        <OstelloFAQ usingFor={"blogFaq"} blogsFaq={currentBlog.faqs} />
      ) : (
        ""
      )}
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ params, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const blog = params.blogId;
  const data = await axios.get(`${host}/blog?slugurl=${blog}`);
  const currentBlog = data.data.message;
  if (!blog) {
    return {
      notFound: true,
    };
  }
  // Pass post data to the page via props
  return { props: { currentBlog } };
}
