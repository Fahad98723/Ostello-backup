import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { host } from "../../utils/constant";
import { titleToUrl } from "../../utils/utils";

const instituteSlice = createSlice({
  name: "institute",
  initialState: {
    loading: false,
    error: null,
    institutes: [],
    currentInstitute: {},
    singleTopper: {},
    singleInstitute: {},
    examRefCode: null,
  },
  reducers: {
    getInstituteRequest: (state, { payload }) => {
      state.loading = true;
    },
    getInstituteSuccess: (state, { payload }) => {
      state.loading = false;
      state.institutes = payload.filter((item) => item.approval === 1);
    },
    getInstituteFailed: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    setCurrentInstitute: (state, { payload }) => {
      state.currentInstitute = payload;
    },
    setSingleTopper: (state, { payload }) => {
      state.singleTopper = payload;
    },
    setSingleInstitute: (state, { payload }) => {
      state.singleInstitute = payload;
    },
    setExamRefCode: (state, { payload }) => {
      state.examRefCode = payload;
    },
  },
});

export default instituteSlice.reducer;

export const {
  getInstituteFailed,
  getInstituteRequest,
  getInstituteSuccess,
  setCurrentInstitute,
  setSingleInstitute,
  setSingleTopper,
  setExamRefCode,
} = instituteSlice.actions;

export const institutesSelector = (state) => state.institute;

export const fetchInstitutes = () => {
  return async (dispatch) => {
    dispatch(getInstituteRequest());
    try {
      const { data } = await axios.get(
        `${host}/institute?relations=owner,achievements&limit=400`,
        {
          headers: {
            Authorization: `Bearer ${
              typeof window !== "undefined" &&
              window.localStorage.getItem("ACCESS_TOKEN")
            }`,
          },
        }
      );
      const DataWithSlug = data?.message?.map((item) => {
        return {
          ...item,
          slugUrl: `/institute/${titleToUrl(item.name)}`,
        };
      });
      dispatch(getInstituteSuccess(DataWithSlug));
    } catch (error) {
      dispatch(getInstituteFailed(error));
    }
  };
};
export const fetchInstitutesByUser = (location) => {
  return async (dispatch) => {
    dispatch(getInstituteRequest());
    try {
      const { data } = await axios.get(
        `${host}/institute?relations=owner&location=${location}&limit=1000`
      );

      const DataWithSlug = data?.message?.map((item) => {
        return {
          ...item,
          slugUrl: `/institute/${titleToUrl(item.name)}`,
        };
      });
      dispatch(getInstituteSuccess(DataWithSlug));
    } catch (error) {
      dispatch(getInstituteFailed(error));
    }
  };
};

export const fetchSingleInstitute = (id) => {
  return async (dispatch) => {
    dispatch(getInstituteRequest());
    try {
      const { data } = await axios.get(
        `${host}/institute?id=${id}&relations=owner,achievements`
      );

      dispatch(setSingleInstitute(data.message));
    } catch (error) {
      dispatch(getInstituteFailed(error));
    }
  };
};
