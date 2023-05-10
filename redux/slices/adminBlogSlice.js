import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ACCESS_TOKEN,
  AuthenticationHeaders,
  host,
} from "../../utils/constant";
import { toast } from "react-hot-toast";

const initialState = {
  loading: false,
  error: null,
  adminBlogs: [],
  isDeleted: false,
  isAddedNewBlog: false,
  isUpdated: false,
  previewBlogData: {},
  adminBlog: {},
  currentBlog: {},
};

const adminBlogSlice = createSlice({
  name: "adminBlogs",
  initialState,
  reducers: {
    //----------------get all blogs-------------------//
    getAdminBlogsRequest: (state) => {
      state.loading = true;
    },
    getAdminBlogsSuccess: (state, { payload }) => {
      state.adminBlogs = payload;
      state.loading = false;
      state.error = null;
    },
    getAdminBlogsFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //----------------get blog-------------------//
    getAdminBlogRequest: (state) => {
      state.loading = true;
    },
    getCurrentBlogSuccess: (state, { payload }) => {
      state.currentBlog = payload;
      state.loading = false;
      state.error = null;
    },
    getAdminBlogSuccess: (state, { payload }) => {
      state.adminBlog = payload;
      state.loading = false;
      state.error = null;
    },
    getAdminBlogFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //----------------add new blog-------------------//
    adminAddNewBlogRequest: (state) => {
      state.loading = true;
      state.isAddedNewBlog = false;
    },
    adminAddNewBlogSuccess: (state) => {
      state.loading = false;
      state.isAddedNewBlog = true;
    },
    adminAddNewBlogFail: (state) => {
      state.loading = true;
      state.isAddedNewBlog = false;
    },
    //----------------Delete blog-------------------//
    adminBlogDeleteRequest: (state) => {
      state.loading = true;
      state.isDeleted = false;
    },
    adminBlogDeleteSuccess: (state) => {
      state.loading = false;
      state.isDeleted = true;
    },
    adminBlogDeleteFail: (state) => {
      state.loading = false;
      state.isDeleted = false;
    },
    //----------------Update blog-------------------//
    adminBlogUpdateRequest: (state) => {
      state.loading = true;
      state.isUpdated = false;
    },
    adminBlogUpdateSuccess: (state) => {
      state.loading = false;
      state.isUpdated = true;
    },
    adminBlogUpdateFail: (state) => {
      state.loading = false;
      state.isUpdated = false;
    },

    //---------------blog preview data-------------------//
    blogPreviewData: (state, { payload }) => {
      state.previewBlogData = payload;
    },
  },
});
export const selectBlogs = (state) => state.adminBlogs;
export const {
  getAdminBlogsRequest,
  getAdminBlogsSuccess,
  getCurrentBlogSuccess,
  getAdminBlogsFail,
  getAdminBlogRequest,
  getAdminBlogSuccess,
  getAdminBlogFail,
  adminAddNewBlogRequest,
  adminAddNewBlogSuccess,
  adminAddNewBlogFail,
  adminBlogDeleteRequest,
  adminBlogDeleteSuccess,
  adminBlogDeleteFail,
  adminBlogUpdateRequest,
  adminBlogUpdateSuccess,
  adminBlogUpdateFail,
  blogPreviewData,
} = adminBlogSlice.actions;

// get all blogs
export function fetchAdminBlogs() {
  return async (dispatch) => {
    dispatch(getAdminBlogsRequest());
    try {
      const { data } = await axios.get(`${host}/blog?adminBlogsOnly=true`);
      dispatch(getAdminBlogsSuccess(data.message));
    } catch (err) {
      dispatch(getAdminBlogsFail(err));
    }
  };
}

// get blog
export function fetchAdminBlog(id) {
  return async (dispatch) => {
    dispatch(getAdminBlogRequest());
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
      const { data } = await axios.get(`${host}/blog?id=${id}`, config);
      dispatch(getAdminBlogSuccess(data.message));
    } catch (err) {
      dispatch(getAdminBlogFail(err));
    }
  };
}

// add new blog
export function adminAddBlog(blogData) {
  return async (dispatch) => {
    dispatch(adminAddNewBlogRequest());
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

      const { data } = await axios.post(`${host}/blog`, blogData, config);
      dispatch(adminAddNewBlogSuccess(data.message));
      toast.success("Successfully blog posted !");
    } catch (err) {
      dispatch(adminAddNewBlogFail(err));
      toast.error(err.message);
    }
  };
}

// remove blog
export function adminDeleteBlog(id) {
  return async (dispatch) => {
    dispatch(adminBlogDeleteRequest());
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
      const { data } = await axios.delete(`${host}/blog?id=${id}`, config);
      dispatch(adminBlogDeleteSuccess(data.message));
    } catch (err) {
      dispatch(adminBlogDeleteFail(err));
      toast.error(err.message);
    }
  };
}

// update blog
export function adminUpdateBlog(updateData) {
  return async (dispatch) => {
    dispatch(adminBlogUpdateRequest());
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      };
      const { data } = await axios.patch(`${host}/blog`, updateData, config);
      dispatch(adminBlogUpdateSuccess(data.message));
      toast.success("Successfully Updated !");
    } catch (err) {
      dispatch(adminBlogUpdateFail(err));
      toast.error(err.message);
    }
  };
}

export default adminBlogSlice.reducer;
