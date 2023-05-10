import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/layout/Footer";
import MetaHelmet from "../../components/MetaHelmet";
import BlogCard from "../../components/pages/Blogs/Blog/BlogCard";
import { BlogCategories } from "../../components/pages/Blogs/constants";
import Navbar from "../../components/pages/HomeLanding/Header/Navbar";
import OstelloSubscribe from "../../components/pages/HomeLanding/OstelloSubscribe";
import { fetchAdminBlogs } from "../../redux/slices/adminBlogSlice";
import { setUserLocation } from "../../redux/slices/UserAnalytics";
const Blogs = ({ meta }) => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState(BlogCategories[0].title);
  const [perPage, setPerPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const { adminBlogs, loading, isDeleted, isAddedNewBlog } = useSelector(
    (state) => state.adminBlogs
  );
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

  useEffect(() => {
    dispatch(fetchAdminBlogs());
  }, []);

  const itemRender = (_, type, originalElement) => {
    // if (type === 'prev') {
    //   return <a>Previous</a>
    // }

    // if (type === 'next') {
    //   return <a>Next</a>
    // }

    // return (
    //   <div className='w-full flex items-center justify-between'>

    //   </div>
    // )

    if (type === "page") {
      return <button>{_}</button>;
    }
    return originalElement;
  };

  useEffect(() => {
    let blogsData = [];
    if (activeCategory === "View all") {
      blogsData = adminBlogs;
    } else {
      blogsData = adminBlogs?.filter((item) =>
        activeCategory.toLowerCase().includes(item.category.toLowerCase())
      );
    }

    setBlogs(blogsData);
  }, [activeCategory, adminBlogs]);

  return (
    <div className=" ">
      <MetaHelmet
        title={meta.title}
        description={meta.description}
        link={meta.link}
      />
      <div className=" md:max-w-[1350px] mx-auto">
        <Navbar usingFor={"blog"} />
      </div>
      {/* Subscribe Ostello Blog */}
      <section className="bg-primary/10 p-5 md:px-20 md:py-10 mt-10">
        <div className="container mx-auto">
          <h3 className="text-primary my-1 text-base md:text-xl">Resources</h3>
          <h1>Ostello blog</h1>
          <p className="text-gray">
            Tool and strategies modern teams need to help their companies grow
          </p>
          <div className="flex flex-col lg:flex-row   space-y-5 lg:space-x-5 lg:space-y-0 mt-5 items-center md:items-start md:w-fit">
            <div className="md:w-fit w-full">
              <input
                type="email"
                className="border border-gray/40 outline-none join p-2 rounded-md w-full  "
                placeholder="Enter your email"
              />
              <p className="text-sm text-gray">
                We care about your data in our{" "}
                <Link legacyBehavior prefetch={false} href={"/privacy"}>
                  <p className="underline hover:text-primary">privacy policy</p>
                </Link>{" "}
              </p>
            </div>

            <button className="px-4  py-2 rounded-md bg-primary hover:bg-white border border-primary hover:text-primary text-white duration-300 w-full md:w-fit">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <main className=" p-5 md:px-20 md:py-10">
        {/* Category selector */}
        <section className=" md:flex container mx-auto sm:p-0 ">
          {/* Category Selector  */}
          <div className="py-6  md:max-w-[300px]">
            {BlogCategories.map((category) => (
              <button
                onClick={() => setActiveCategory(category.title)}
                className={` text-gray w-full rounded my-1 text-left p-2 hover:bg-primary/5 hover:text-primary ${
                  activeCategory === category.title &&
                  "bg-primary/10 text-primary"
                } `}
                key={category.id}
              >
                {category.title}
              </button>
            ))}
          </div>

          {/* Blogs Show =>  */}
          <div className="  w-full">
            {blogs.length > 0 ? (
              <div className="xl:grid grid-cols-2 flex flex-col items-center justify-center w-full place-items-center">
                {blogs?.map((blog) => (
                  <BlogCard key={blog.id} {...blog} />
                ))}
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center w-full">
                  <p>No Blogs found !</p>
                </div>
              </>
            )}
          </div>

          {/* <div className='border border-l-0 border-r-0 border-b-0 border-gray/30 pt-5 flex justify-center'>
            <Pagination
              onChange={(e) => {
                setCurrentPage(e)
              }}
              pageSize={perPage}
              total={blogs?.length}
              itemRender={itemRender}
            />
          </div> */}
          {/* <Adsense
            client={`${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
            slot="6397614396"
            style={{ display: "block", textAlign: "center", marginTop:"10px" }}
            layout="in-article"
            format="fluid"
          /> */}
        </section>
      </main>
      <OstelloSubscribe />
      <Footer />
    </div>
  );
};

export default Blogs;

export const getStaticProps = async () => {
  const meta = {
    title: "Blogs - ostello.co.in",
    description:
      "Official Ostello Blog - Home to the world's first marketplace for coaching institutions",
    link: "https://www.ostello.co.in/blogs",
  };
  return {
    props: {
      meta,
    },
  };
};
