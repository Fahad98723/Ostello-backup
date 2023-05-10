import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthenticationHeaders, host } from "../../utils/constant";
import { fetchAdminInstitutes } from "./adminInstitutesSlice";

const initialState = {
  loading: false,
  adminSingleCourse: {},
  adminCourses: [],
  adminLocations: [],
  adminFaculty: [],
  adminAchievement: [],
  error: null,
  isUpdated: false,
  isUpdatedData: false,
  isDeleted: false,
};

const adminCourseSlice = createSlice({
  name: "adminCourses",
  initialState,
  reducers: {
    // -----------get all Courses------------ //
    getAdminCoursesRequest: (state) => {
      state.loading = true;
    },
    getAdminCoursesSuccess: (state, { payload }) => {
      state.adminCourses = payload;
      state.loading = false;
      state.error = null;
      state.isUpdated = false;
    },
    getAdminCoursesFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // -----------get single Course------------ //
    getSingleCourseRequest: (state) => {
      state.loading = true;
    },
    getSingleCourseSuccess: (state, { payload }) => {
      state.adminSingleCourse = payload;
      state.loading = false;
      state.error = null;
    },
    getSingleCourseFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // -----------Course approve update------------ //
    CourseApproveRequest: (state) => {
      state.loading = true;
      state.isUpdated = false;
    },

    //----------------Delete course-------------------//
    adminCourseDeleteRequest: (state) => {
      state.loading = true;
      state.isDeleted = false;
    },
    adminCourseDeleteSuccess: (state) => {
      state.loading = false;
      state.isDeleted = true;
    },
    adminCourseDeleteFail: (state) => {
      state.loading = false;
      state.isDeleted = false;
    },
    //----------------Update institute-------------------//
    adminCourseUpdateRequest: (state) => {
      state.loading = true;
      state.isUpdated = false;
    },
    merchantCourseUpdateRequest: (state) => {
      state.loading = true;
      state.isUpdated = false;
    },
    adminCourseUpdateSuccess: (state) => {
      state.loading = false;
      state.isUpdatedData = true;
    },
    merchantCourseUpdateSuccess: (state) => {
      state.loading = false;
      state.isUpdatedData = true;
    },
    adminCourseUpdateFail: (state) => {
      state.loading = false;
      state.isUpdated = false;
    },
    CourseApproveSuccess: (state) => {
      state.loading = false;
      state.isUpdated = true;
    },
    CourseApproveFail: (state) => {
      state.loading = false;
    },
    // -----------add new location------------ //
    addNewLocation: (state, { payload }) => {
      const newLocation = payload;
      state.adminLocations.push(newLocation);
    },
    // -----------add new faculty------------ //
    addNewFaculty: (state, { payload }) => {
      const newFaculty = payload;
      state.adminFaculty.push(newFaculty);
    },
    // -----------add new faculty------------ //
    addNewAchievement: (state, { payload }) => {
      const newFaculty = payload;
      state.adminAchievement.push(newFaculty);
    },
  },
});

export const {
  getAdminCoursesFail,
  getAdminCoursesRequest,
  getAdminCoursesSuccess,
  getSingleCourseRequest,
  getSingleCourseSuccess,
  getSingleCourseFail,
  CourseApproveRequest,
  adminCourseDeleteRequest,
  CourseApproveSuccess,
  adminCourseUpdateRequest,
  merchantCourseUpdateRequest,
  adminCourseUpdateFail,
  adminCourseUpdateSuccess,
  merchantCourseUpdateSuccess,
  adminCourseDeleteSuccess,
  adminCourseDeleteFail,
  CourseApproveFail,
  addNewLocation,
  addNewFaculty,
  addNewAchievement,
} = adminCourseSlice.actions;

// get all Courses
export function fetchAdminCourses() {
  return async (dispatch) => {
    dispatch(getAdminCoursesRequest());
    try {
      const { data } = await axios.get(`${host}/Course`);
      dispatch(getAdminCoursesSuccess(data.message));
    } catch (err) {
      dispatch(getAdminCoursesFail(err));
    }
  };
}

// get single Course
export function fetchAdminSingleCourse(id) {
  return async (dispatch) => {
    dispatch(getSingleCourseRequest());
    try {
      const { data } = await axios.get(`${host}/Course?id=${id}`);
      dispatch(getSingleCourseSuccess(data.message));
    } catch (err) {
      dispatch(getSingleCourseFail(err));
    }
  };
}

// remove course
export function adminDeleteCourse(id, func = () => {}) {
  return async (dispatch) => {
    dispatch(adminCourseDeleteRequest());
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${
            typeof window !== "undefined" &&
            window.localStorage.getItem("ACCESS_TOKEN")
          }`,
        },
      };
      const { data } = await axios.delete(`${host}/course?id=${id}`, config);
      dispatch(adminCourseDeleteSuccess(data.message));

      toast.success("Course deleted successfully !");
      func();
    } catch (err) {
      dispatch(adminCourseDeleteFail(err));
      toast.error("Failed to delete the course !");
    }
  };
}
// approve Course
export function CourseApprove(CourseData, func = () => {}) {
  return async (dispatch) => {
    dispatch(CourseApproveRequest());
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${
          typeof window !== "undefined" &&
          window.localStorage.getItem("ACCESS_TOKEN")
        }`,
      },
    };
    const url = `${host}/course/approve`;
    try {
      const { data } = await axios.patch(url, CourseData, config);
      dispatch(CourseApproveSuccess(data.message));
      func();
      if (CourseData.approve === 1) {
        Swal.fire({
          icon: "success",
          title: "Course approval approved",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Course approval rejected",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (err) {
      dispatch(CourseApproveFail(err));
      Swal.fire({
        icon: "error",
        title: err.message,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };
}
export function AllCourseApprove(courseArray, func = () => {}) {
  return async (dispatch) => {
    const approveSingleCourse = async (id) => {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${
            typeof window !== "undefined" &&
            window.localStorage.getItem("ACCESS_TOKEN")
          }`,
        },
      };
      const url = `${host}/course/approve`;
      const updatedData = {
        id,
        approve: 1,
      };
      const { data } = await axios.patch(url, updatedData, config);
    };
    dispatch(CourseApproveRequest());
    let loading = toast.loading("Updating requests... ");
    try {
      for (let i = 0; i < courseArray.length; i++) {
        const element = courseArray[i];
        await approveSingleCourse(element.id);
      }
      dispatch(CourseApproveSuccess("Successfully accepted all requests !"));
      toast.remove(loading);
      toast.success("Successfully Updated !");
    } catch (err) {
      toast.remove(loading);
      toast.error("Failed to accept requests !");
    }
  };
}

// update course
export function adminUpdateCourse(AdminUpdatedData) {
  return async (dispatch) => {
    dispatch(adminCourseUpdateRequest());
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${
            typeof window !== "undefined" &&
            window.localStorage.getItem("ACCESS_TOKEN")
          }`,
        },
      };
      const { data } = await axios.patch(
        `${host}/course/`,
        AdminUpdatedData,
        config
      );

      dispatch(adminCourseUpdateSuccess(data.message));

      Swal.fire({
        icon: "success",
        title: "Course update approved",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (err) {
      dispatch(adminCourseUpdateFail(err));

      Swal.fire({
        icon: "error",
        title: `${err.message}`,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };
}

// update course merchant
export function merchantUpdateCourse(updateData) {
  return async (dispatch) => {
    dispatch(merchantCourseUpdateRequest());
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${
            typeof window !== "undefined" &&
            window.localStorage.getItem("ACCESS_TOKEN")
          }`,
        },
      };
      const { data } = await axios.patch(
        `${host}/course/update`,
        updateData,
        config
      );

      dispatch(merchantCourseUpdateSuccess(data.message));

      Swal.fire({
        icon: "success",
        title: "Course update request sent wait for admin approval",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (err) {
      dispatch(adminCourseUpdateFail(err));

      Swal.fire({
        icon: "error",
        title: `${err.message}`,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };
}

export default adminCourseSlice.reducer;
