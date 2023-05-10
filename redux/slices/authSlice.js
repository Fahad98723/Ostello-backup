import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import {
  ACCESS_TOKEN,
  host,
  INSTITUTE_ID,
  OWNER_ID,
  REFRESH_TOKEN,
} from "../../utils/constant";
import { isEmpty } from "../../utils/utils";

const initialState = {
  loading: false,
  error: null,
  accessToken: ACCESS_TOKEN,
  refreshToken: REFRESH_TOKEN,
  isAuthenticated: ACCESS_TOKEN?.length > 0,
  userData: { name: "", id: "", phonenumber: "", email: "" },
  userLocation: {},
  instituteDetails: {},
  recentLocations: [],
  percentage: 0,
  isUploading: false,
  authModalState: 0,
  profileProgress: 0,
  isVerified: false,
  editReview: false,
  activeReview: {},
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthModalState: (state, { payload }) => {
      state.authModalState = payload;
      localStorage.setItem("AUTH_MODAL", payload);
    },
    addAccessToken: (state, { payload }) => {
      state.accessToken = payload;
      localStorage.setItem("ACCESS_TOKEN", payload);
    },
    removeAccessToken: (state, { payload }) => {
      state.accessToken = "";
      localStorage.setItem("ACCESS_TOKEN", "");
    },
    addRefreshToken: (state, { payload }) => {
      state.refreshToken = payload;
      localStorage.setItem("REFRESH_TOKEN", payload);
    },
    removeRefreshToken: (state, { payload }) => {
      state.accessToken = "";
      localStorage.setItem("REFRESH_TOKEN", "");
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.userData = { name: "", id: "", phonenumber: "", email: "" };
      typeof window !== "undefined" && window.localStorage.clear();
      typeof window !== "undefined" && window.location.reload();
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = "";
      state.accessToken = "";
      state.userData = { name: "", id: "", phonenumber: "", email: "" };
      typeof window !== "undefined" && window.localStorage.clear();
      typeof window !== "undefined" && window.location.reload();
    },
    addUserData: (state, { payload }) => {
      state.userData = payload;
      state.isAuthenticated = true;
    },
    getUserRequest: (state, { payload }) => {
      state.loading = true;
    },
    getUserRequestSuccess: (state, { payload }) => {
      state.loading = false;
      state.userData = payload;
    },
    getUserRequestFailed: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    addUserLocation: (state, { payload }) => {
      state.userLocation = { ...state.userLocation, ...payload };
    },
    addRecentLocations: (state, { payload }) => {
      state.recentLocations = payload;
    },
    getInstituteRequest: (state, { payload }) => {
      state.loading = true;
    },
    getInstituteRequestSuccess: (state, { payload }) => {
      state.loading = false;
      state.instituteDetails = payload;
    },
    getInstituteRequestFailed: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    uploadingStarted: (state, { payload }) => {
      state.isUploading = true;
    },
    updatePercentage: (state, { payload }) => {
      state.percentage = payload;
    },
    uploadingEnded: (state, { payload }) => {
      state.percentage = 0;
      state.isUploading = false;
    },
    setProfileProgress: (state, { payload }) => {
      state.profileProgress = payload;
      state.isVerified = payload === 100;
    },
    setEditReview: (state, { payload }) => {
      state.editReview = payload;
    },
    setActiveReview: (state, { payload }) => {
      state.activeReview = payload;
    },
    setMessage: (state, { payload }) => {
      state.message = payload;
    },
  },
});

export default authSlice.reducer;

export const {
  addUserLocation,
  addUserData,
  addRecentLocations,
  getUserRequest,
  getUserRequestFailed,
  getUserRequestSuccess,
  addAccessToken,
  getInstituteRequest,
  getInstituteRequestSuccess,
  getInstituteRequestFailed,
  removeAccessToken,
  addRefreshToken,
  setAuthModalState,
  removeRefreshToken,
  updatePercentage,
  uploadingStarted,
  uploadingEnded,
  setProfileProgress,
  setVerified,
  setEditReview,
  setActiveReview,
  clearAuth,
  setMessage,
  logout,
} = authSlice.actions;

export const authSelector = (state) => state.auth;

export const getUser = () => {
  return async (dispatch) => {
    dispatch(getUserRequest());

    if (!isEmpty(OWNER_ID)) {
      try {
        const config = {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        };
        const { data } = await axios.get(
          `${host}/users?id=${OWNER_ID}`,
          config
        );

    

        let userData = data.message;
        dispatch(addUserData(userData));
        let {
          name,
          email,
          phonenumber,
          avatar,
          location,
          reviews,
          wallet,
          schoolname,
        } = userData;
        let fields = {
          name,
          email,
          phonenumber,
          avatar,
          location,
          reviews,
          schoolname,
        };
        let topics = [];
        let complete_fields = Object.values(fields).filter(
          (item) => !isEmpty(item)
        ).length;

        if (isEmpty(name)) {
          topics.push("Name");
        }
        if (isEmpty(email)) {
          topics.push("Email");
        }
        if (isEmpty(phonenumber)) {
          topics.push("phone-no");
        }
        if (isEmpty(avatar)) {
          topics.push("Profile picture");
        }
        if (isEmpty(location)) {
          topics.push("Location");
        }
        if (isEmpty(reviews)) {
          topics.push("Review");
        }
        if (isEmpty(schoolname)) {
          topics.push("School/College");
        }

        let message = topics?.length
          ? topics.join(" , ") + " required to complete the profile !"
          : "";
        let total_fields = Object.values(fields).length;
        const percentage = (complete_fields / total_fields) * 100;
     
        dispatch(setProfileProgress(percentage));
        dispatch(setMessage(message));
        if (percentage === 100 && wallet === null) {
          // creating wallet !
          await axios.post(`${host}/wallet`, {}, config);
        }
        dispatch(getUserRequestSuccess(data.message));
      } catch (err) {
        dispatch(getUserRequestFailed(err));
        const status = err?.response?.status;
        if (status === 409) {
          // if (typeof window !== 'undefined') {
          //   toast.error('Your session is expired. Please login again.')
          //   dispatch(clearAuth())
          //   dispatch(logout())
          // }

          // typeof window !== "undefined" &&
          //   window.localStorage.setItem(
          //     "ACCESS_TOKEN",
          //     res.data.message["access_token"]
          //   );
          // 
          // typeof window !== "undefined" &&
          //   window.localStorage.setItem(
          //     "REFRESH_TOKEN",
          //     res.data.message["refresh_token"]
          //   );
          // }

          const body = {
            accessToken:
              typeof window !== "undefined" &&
              window.localStorage.getItem("ACCESS_TOKEN"),
            refreshToken:
              typeof window !== "undefined" &&
              window.localStorage.getItem("REFRESH_TOKEN"),
          };
          axios
            .post(`${host}/auth/verify`, body)
            .then(async ({ data }) => {
          
              const { access_token, refresh_token } = data.message;
              dispatch(addAccessToken(access_token));
              dispatch(addRefreshToken(refresh_token));
              const config = {
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  Authorization: `Bearer ${access_token}`,
                },
              };
              if (!isEmpty(OWNER_ID)) {
                const res = await axios.get(
                  `${host}/users?id=${OWNER_ID}`,
                  config
                );
             
                let userData = res.data.message;
                dispatch(addUserData(userData));
              }
            })
            .catch((err) => {});
        }
      }
    }
  };
};
export const getInstituteDetails = () => {
  return async (dispatch) => {
    dispatch(getInstituteRequest());

    if (!isEmpty(INSTITUTE_ID)) {
      try {
        const { data } = await axios.get(
          `${host}/institute?id=${INSTITUTE_ID}&relations=owner,achievements`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${
                typeof window !== "undefined" &&
                window.localStorage.getItem("ACCESS_TOKEN")
              }`,
            },
          }
        );
        dispatch(getInstituteRequestSuccess(data.message));
      } catch (err) {
        dispatch(getInstituteRequestFailed(err));
      }
    }
  };
};
