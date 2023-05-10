import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { host } from "../../utils/constant";
import { titleToUrl } from "../../utils/utils";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    loading: false,
    error: null,
    courses: [],
    currentCourse: {},
    search: {},
    fields: null,
  },
  reducers: {
    getCourseRequest: (state, { payload }) => {
      state.loading = true;
    },
    getCourseSuccess: (state, { payload }) => {
      state.loading = false;
      state.courses = payload.filter((item) => item.approval === 1);
    },
    getCourseFailed: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    setCurrentCourse: (state, { payload }) => {
      state.currentCourse = payload;
    },
    setSearch: (state, { payload }) => {
      state.search = payload;
    },
    setFields: (state, { payload }) => {
      state.fields = payload;
    },
    // -----------get single Course------------ //
    getSingleCourseRequest: (state) => {
      state.loading = true;
    },
    getSingleCourseSuccess: (state, { payload }) => {
      state.currentCourse = payload;
      state.loading = false;
      state.error = null;
    },
    getSingleCourseFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default courseSlice.reducer;

export const {
  getCourseFailed,
  getCourseRequest,
  getCourseSuccess,
  setCurrentCourse,
  getSingleCourseRequest,
  getSingleCourseSuccess,
  getSingleCourseFail,
  setSearch,
  setFields,
} = courseSlice.actions;

export const selectCourse = (state) => state.course;

export const fetchCourses = () => {
  return async (dispatch) => {
    dispatch(getCourseRequest());
    try {
      const { data } = await axios.get(`${host}/course?limit=1000`);
      const DataWithSlug = data?.message?.map((item) => {
        const slugId = item.id.split("-")[0];
        const courseTitle = titleToUrl(item.name);

        const instituteTitle = titleToUrl(item.institute?.name);

        return {
          ...item,
          slugId,
          slug: `/institute/${instituteTitle}/course/${slugId}/${courseTitle}`,
        };
      });
      dispatch(getCourseSuccess(DataWithSlug));
    } catch (error) {
      toast.error(error.toString());
      dispatch(getCourseFailed(error));
    }
  };
};
// get single Course
export function setSingleCourse(id) {
  return async (dispatch) => {
    dispatch(getSingleCourseRequest());
    try {
      const { data } = await axios.get(`${host}/course?id=${id}`);
      dispatch(getSingleCourseSuccess(data.message));
    } catch (err) {
      dispatch(getSingleCourseFail(err));
    }
  };
}
