import { Pagination } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoPencilOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { adminDeleteCourse } from "../../../../../../redux/slices/adminCourseSlice";
import { fetchAdminInstitutes } from "../../../../../../redux/slices/adminInstitutesSlice";
import { host } from "../../../../../../utils/constant";
import { DeleteIcon } from "../../../../../SVGIcons";
import CourseCard from "../../../AdminCard/CourseCard";
import DeleteConfirmationModal from "../../../AdminModal/DeleteConfirmationModal/DeleteConfirmationModal";

const AdminInstituteCourse = () => {
  const router = useRouter();
  const { instituteId } = router.query;
  const [courses, setCourses] = useState([]);
  const [deleteCoupon, setDeleteCoupon] = useState(false);
  const [id, setId] = useState("");
  const [courseDeleted, setCourseDeleted] = useState(false);

  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

  const dispatch = useDispatch();
  const { adminInstitutes, isDeleted } = useSelector(
    (state) => state.adminInstitutes
  );

  const [skip, setSkip] = useState(0);
  const [paginationButton, setPaginationButton] = useState();
  const [limit, setLimit] = useState(15);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await axios.get(
          `${host}/course?instituteId=${instituteId}&skip=${
            skip * 15
          }&limit=${limit}`
        );

        setPaginationButton(Math.ceil(res?.data.totalCount / 15));

        setCourses(res?.data?.message);
     
      } catch (err) {
        toast.error(err.message);
      }
    };
    run();
  }, [instituteId, isDeleted, limit, skip]);

  useEffect(() => {
    if (deleteCoupon) {
      dispatch(adminDeleteCourse(id));
    }
  }, [id, deleteCoupon, dispatch]);

  return (
    <div>
      <div className="px-[30px] pt-4 pb-16">
        <h2 className="text-lg mb-3 px-2 md:hidden block font-bold">
          Institute Courses
        </h2>
        <div className="grid gap-10 md:grid-cols-2 grid-cols-1 mb-3 lg:grid-cols-3">
          {courses?.map((data, index) => (
            <div key={index} className="relative">
              <CourseCard data={data} />
              <div
                onClick={() => {
                  router.push(
                    "/admin-dashboard/courses/review-course/" + data.id
                  );
                }}
                className="absolute top-8 left-8 bg-white p-2.5 shadow-lg cursor-pointer rounded-full"
              >
                <IoPencilOutline className="text-[#FF0000]-500" />
              </div>
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
        <Pagination
          onChange={(e, v) => {
            setSkip(v - 1);
           
          }}
          count={paginationButton}
          variant="outlined"
          shape="rounded"
        />
      </div>
      {deleteConfirmationModal && (
        <DeleteConfirmationModal
          setDeleteCoupon={setDeleteCoupon}
          setDeleteConfirmationModal={setDeleteConfirmationModal}
        />
      )}
    </div>
  );
};

export default AdminInstituteCourse;
