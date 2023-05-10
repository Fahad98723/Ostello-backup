import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import {
  host,
  AuthenticationHeaders,
  ACCESS_TOKEN,
} from "../../utils/constant";
host;

const initialState = {
  loading: false,
  error: null,
  adminCareers: [],
  isDeleted: false,
  isAddedNewCareer: false,
  isUpdated: false,
  adminCareer: {},
  currentCareer: {},
};

const adminCareerSlice = createSlice({
  name: "adminCareers",
  initialState,
  reducers: {
    //----------------get all Careers-------------------//
    getAdminCareersRequest: (state) => {
      state.loading = true;
    },
    getAdminCareersSuccess: (state, { payload }) => {
      state.adminCareers = payload;
      state.loading = false;
      state.error = null;
    },
    getAdminCareersFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //----------------get Career-------------------//
    getAdminCareerRequest: (state) => {
      state.loading = true;
    },
    getAdminCareerSuccess: (state, { payload }) => {
      state.adminCareer = payload;
      state.loading = false;
      state.error = null;
    },
    getAdminCareerFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //----------------add new Career-------------------//
    adminAddNewCareerRequest: (state) => {
      state.loading = true;
      state.isAddedNewCareer = false;
    },
    adminAddNewCareerSuccess: (state) => {
      state.loading = false;
      state.isAddedNewCareer = true;
    },
    adminAddNewCareerFail: (state) => {
      state.loading = true;
      state.isAddedNewCareer = false;
    },
    //----------------Delete Career-------------------//
    adminCareerDeleteRequest: (state) => {
      state.loading = true;
      state.isDeleted = false;
    },
    adminCareerDeleteSuccess: (state) => {
      state.loading = false;
      state.isDeleted = true;
    },
    adminCareerDeleteFail: (state) => {
      state.loading = false;
      state.isDeleted = false;
    },
    //----------------Update Career-------------------//
    adminCareerUpdateRequest: (state) => {
      state.loading = true;
      state.isUpdated = false;
    },
    adminCareerUpdateSuccess: (state) => {
      state.loading = false;
      state.isUpdated = true;
    },
    adminCareerUpdateFail: (state) => {
      state.loading = false;
      state.isUpdated = false;
    },
    setCurrentCareer: (state, { payload }) => {
      state.currentCareer = payload;
    },
  },
});

export const {
  getAdminCareersRequest,
  getAdminCareersSuccess,
  getAdminCareersFail,
  getAdminCareerRequest,
  getAdminCareerSuccess,
  getAdminCareerFail,
  adminAddNewCareerRequest,
  adminAddNewCareerSuccess,
  adminAddNewCareerFail,
  adminCareerDeleteRequest,
  adminCareerDeleteSuccess,
  adminCareerDeleteFail,
  adminCareerUpdateRequest,
  adminCareerUpdateSuccess,
  adminCareerUpdateFail,
  setCurrentCareer,
} = adminCareerSlice.actions;

// get all Careers
export function fetchAdminCareers() {
  return async (dispatch) => {
    dispatch(getAdminCareersRequest());
    try {
      const config = {
        headers: AuthenticationHeaders,
      };
      const { data } = await axios.get(`${host}/career`, config);
      dispatch(getAdminCareersSuccess(data.message));
    } catch (err) {
      dispatch(getAdminCareersFail(err));
    }
  };
}

// get Career
export function fetchAdminCareer(id) {
  return async (dispatch) => {
    dispatch(getAdminCareerRequest());
    try {
      const config = {
        headers: AuthenticationHeaders,
      };
      const { data } = await axios.get(`${host}/Career?id=${id}`, config);
      dispatch(getAdminCareerSuccess(data.message));
    } catch (err) {
      dispatch(getAdminCareerFail(err));
    }
  };
}

// add new Career
export function adminAddCareer(CareerData) {
  return async (dispatch) => {
    dispatch(adminAddNewCareerRequest());
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${ACCESS_TOKEN}}`,
        },
      };
      const { data } = await axios.post(`${host}/Career`, CareerData, config);
      dispatch(adminAddNewCareerSuccess(data.message));
    } catch (err) {
      dispatch(adminAddNewCareerFail(err));
    }
  };
}

// remove Career
export function adminDeleteCareer(id) {
  return async (dispatch) => {
    dispatch(adminCareerDeleteRequest());
    try {
      const config = {
        headers: AuthenticationHeaders,
      };
      const { data } = await axios.delete(`${host}/Career?id=${id}`, config);
      dispatch(adminCareerDeleteSuccess(data.message));
    } catch (err) {
      dispatch(adminCareerDeleteFail(err));
    }
  };
}

// update Career
export function adminUpdateCareer(updateData) {
  return async (dispatch) => {
    dispatch(adminCareerUpdateRequest());
    try {
      const config = {
        headers: AuthenticationHeaders,
      };
      const { data } = await axios.patch(`${host}/Career`, updateData, config);
      dispatch(adminCareerUpdateSuccess(data.message));
    } catch (err) {
      dispatch(adminCareerUpdateFail(err));
    }
  };
}

export default adminCareerSlice.reducer;

export const adminCareerSliceSelector = (state) => state.adminCareers;
