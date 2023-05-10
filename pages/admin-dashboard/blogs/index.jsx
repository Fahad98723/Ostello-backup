import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../../components/layout/LoadingSpinner";
import MetaHelmet from "../../../components/MetaHelmet";
import AdminDashboard from "../../../components/pages/AdminDashboard/AdminDashboard";
import DeleteConfirmationModal from "../../../components/pages/AdminDashboard/AdminModal/DeleteConfirmationModal/DeleteConfirmationModal";
import PageHeader from "../../../components/pages/AdminDashboard/PageHeader/PageHeader";
import { DeleteIcon } from "../../../components/SVGIcons";
import { titleToUrl } from "../../../components/utils";
import {
  adminDeleteBlog,
  fetchAdminBlogs,
} from "../../../redux/slices/adminBlogSlice";
import { makeDateFormat } from "../../../utils/utils";

export default function Blogs({ meta }) {
  const [deleteCoupon, setDeleteCoupon] = useState(false);

  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const dispatch = useDispatch();

  const [id, setId] = useState("");

  const { adminBlogs, loading, isDeleted, isAddedNewBlog } = useSelector(
    (state) => state.adminBlogs
  );

  useEffect(() => {
    if (deleteCoupon) {
      dispatch(adminDeleteBlog(id));
      setDeleteCoupon(false);
    }
  }, [id, deleteCoupon]);

  useEffect(() => {
    dispatch(fetchAdminBlogs());
  }, [isAddedNewBlog, isDeleted]);


  

  return (
    <AdminDashboard>
      <MetaHelmet title={meta.title} />
      <PageHeader
        title={"Active Blogs"}
        actionName={"Add Blog"}
        route={"/admin-dashboard/blogs/add"}
      />
      {adminBlogs.length === 0 ? (
        <div className="py-8 mx-10 w-4/6 font-medium bg-white flex justify-center">
          No active blogs are available now
        </div>
      ) : (
        <>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="px-[30px] pt-4 pb-16">
              <div className="grid gap-10 md:grid-cols-2 grid-cols-1 lg:grid-cols-3">
                {adminBlogs?.map((data, index) => (
                  <div key={index} className="relative">
                    <BlogCard data={data} />
                    <div
                      onClick={() => {
                        setDeleteConfirmationModal(true);
                        setId(data.id);
                      }}
                      className="absolute top-8 right-8 bg-white p-2.5 shadow-lg cursor-pointer rounded-full"
                    >
                      <DeleteIcon />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {deleteConfirmationModal && (
        <DeleteConfirmationModal
          setDeleteCoupon={setDeleteCoupon}
          setDeleteConfirmationModal={setDeleteConfirmationModal}
        />
      )}
    </AdminDashboard>
  );
}

const BlogCard = ({ data }) => {
  const {
    title,
    images,
    description,
    metadesc,
    readtime,
    timestamp,
    id,
    slugurl,
  } = data;

  const blogDate = makeDateFormat(timestamp);

  

  return (
    <div className="p-4 bg-white min-h-full rounded-[2.5rem] shadow-md">
      <Link
        prefetch={false}
        href={`/admin-dashboard/blogs/edit/${slugurl}`}
        className=""
      >
        <div className="flex flex-col  text-[22px] py-2 font-semibold leading-[30px] ">
          <img
            className="hover:scale-110 duration-300 cursor-pointer hover:rounded-t-[2.5rem] h-[200px] "
            src={`https://cdn.ostello.co.in/${images?.key}`}
            alt=""
          />
          <p className="text-[14px] pt-3 text-[#A0A0A0]">
            {blogDate} <span className="mx-1">l</span> {readtime} read
          </p>

          {title}

          <p className="text-[#414141] text-[18px]">
            {metadesc?.substr(0, 95)}
            {metadesc?.length > 96 && (
              <span>
                ...{" "}
                <span className="ml-1 text-[#7D23E0] text-[18px] leading-[30px] font-bold">
                  Read More
                </span>
              </span>
            )}
          </p>
        </div>
      </Link>
    </div>
  );
};

export const getStaticProps = async () => {
  const meta = {
    title: "Blogs - Admin Dashboard - Ostello",
  };
  // 
  return {
    props: {
      meta,
    },
  };
};
