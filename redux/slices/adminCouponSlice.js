import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthenticationHeaders, host } from "../../utils/constant";
const initialState = {
  loading: false,
  error: null,
  adminCoupons: [],
  isDeleted: false,
  isAddedNewCoupon: false,
  isUpdated: false,
  adminCoupon: {},
};

const adminCouponSlice = createSlice({
  name: "adminCoupons",
  initialState,
  reducers: {
    //----------------get all Coupons-------------------//
    getAdminCouponsRequest: (state) => {
      state.loading = true;
    },
    getAdminCouponsSuccess: (state, { payload }) => {
      state.adminCoupons = payload;
      state.loading = false;
      state.error = null;
    },
    getAdminCouponsFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //----------------get Coupon-------------------//
    getAdminCouponRequest: (state) => {
      state.loading = true;
    },
    getAdminCouponSuccess: (state, { payload }) => {
      state.adminCoupon = payload;
      state.loading = false;
      state.error = null;
    },
    getAdminCouponFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //----------------add new Coupon-------------------//
    adminAddNewCouponRequest: (state) => {
      state.loading = true;
      state.isAddedNewCoupon = false;
    },
    adminAddNewCouponSuccess: (state) => {
      state.loading = false;
      state.isAddedNewCoupon = true;
    },
    adminAddNewCouponFail: (state) => {
      state.loading = true;
      state.isAddedNewCoupon = false;
    },
    //----------------Delete Coupon-------------------//
    adminCouponDeleteRequest: (state) => {
      state.loading = true;
      state.isDeleted = false;
    },
    adminCouponDeleteSuccess: (state) => {
      state.loading = false;
      state.isDeleted = true;
    },
    adminCouponDeleteFail: (state) => {
      state.loading = false;
      state.isDeleted = false;
    },
    //----------------Update Coupon-------------------//
    adminCouponUpdateRequest: (state) => {
      state.loading = true;
      state.isUpdated = false;
    },
    adminCouponUpdateSuccess: (state) => {
      state.loading = false;
      state.isUpdated = true;
    },
    adminCouponUpdateFail: (state) => {
      state.loading = false;
      state.isUpdated = false;
    },
  },
});

export const {
  getAdminCouponsRequest,
  getAdminCouponsSuccess,
  getAdminCouponsFail,
  getAdminCouponRequest,
  getAdminCouponSuccess,
  getAdminCouponFail,
  adminAddNewCouponRequest,
  adminAddNewCouponSuccess,
  adminAddNewCouponFail,
  adminCouponDeleteRequest,
  adminCouponDeleteSuccess,
  adminCouponDeleteFail,
  adminCouponUpdateRequest,
  adminCouponUpdateSuccess,
  adminCouponUpdateFail,
} = adminCouponSlice.actions;

// get all Coupons
export function fetchAdminCoupons() {
  return async (dispatch) => {
    dispatch(getAdminCouponsRequest());
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
      const { data } = await axios.get(`${host}/coupon`, config);
      dispatch(getAdminCouponsSuccess(data.message));
    } catch (err) {
      dispatch(getAdminCouponsFail(err));
    }
  };
}

// get Coupon
export function fetchAdminCoupon(id) {
  return async (dispatch) => {
    dispatch(getAdminCouponRequest());
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
      const { data } = await axios.get(`${host}/coupon?id=${id}`, config);
      dispatch(getAdminCouponSuccess(data.message));
    } catch (err) {
      dispatch(getAdminCouponFail(err));
    }
  };
}

// add new Coupon
export function adminAddCoupon(CouponData) {
  return async (dispatch) => {
    dispatch(adminAddNewCouponRequest());
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
      const { data } = await axios.post(`${host}/coupon`, CouponData, config);
      dispatch(adminAddNewCouponSuccess(data.message));
    } catch (err) {
      dispatch(adminAddNewCouponFail(err));
    }
  };
}

// remove Coupon
export function adminDeleteCoupon(id) {
  return async (dispatch) => {
    dispatch(adminCouponDeleteRequest());
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
      const { data } = await axios.delete(`${host}/coupon?id=${id}`, config);
      dispatch(adminCouponDeleteSuccess(data.message));
    } catch (err) {
      dispatch(adminCouponDeleteFail(err));
    }
  };
}

// update Coupon
export function adminUpdateCoupon(updateData) {
  return async (dispatch) => {
    dispatch(adminCouponUpdateRequest());
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
      const { data } = await axios.patch(`${host}/coupon`, updateData, config);
      dispatch(adminCouponUpdateSuccess(data.message));
    } catch (err) {
      dispatch(adminCouponUpdateFail(err));
    }
  };
}

export default adminCouponSlice.reducer;
