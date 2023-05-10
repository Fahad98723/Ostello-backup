import {
  combineReducers,
  configureStore,
  applyMiddleware,
} from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import storage from "./sync_storage";
import addCourseReducer from "./slices/AddCourseSlice";
import merchantReducer from "./slices/merchantSlice";
import sidePopupReducer from "./slices/sidePopupSlice";
import searchReducer from "./slices/SearchSlice";
import signUpReducer from "./slices/signUpSlice";
import courseReducer from "./slices/courseSlice";
import orderReducer from "./slices/orderSlice";
import adminInstitutesReducer from "./slices/adminInstitutesSlice";
import adminBlogsReducer from "./slices/adminBlogSlice";
import adminEventsReducer from "./slices/adminEventSlice";
import adminCouponsReducer from "./slices/adminCouponSlice";
import adminCoursesReducer from "./slices/adminCourseSlice";
import userProfileSideBarReducer from "./slices/UserProfileSidePopUp";
import userAnalytics from "./slices/UserAnalytics";

import adminCareerReducer from "./slices/adminCareerSlice";

import authReducer from "./slices/authSlice";
import instituteReducer from "./slices/instituteSlice";

const combinedReducer = combineReducers({
  auth: authReducer,
  course: courseReducer,
  institute: instituteReducer,
  merchant: merchantReducer,
  sidePopup: sidePopupReducer,
  addCourse: addCourseReducer,
  order: orderReducer,
  search: searchReducer,
  signUp: signUpReducer,
  adminCareers: adminCareerReducer,
  adminInstitutes: adminInstitutesReducer,
  adminBlogs: adminBlogsReducer,
  adminEvents: adminEventsReducer,
  adminCoupons: adminCouponsReducer,
  adminCourses: adminCoursesReducer,
  userProfileSideBar: userProfileSideBarReducer,
  userAnalytics: userAnalytics,
});
const makeStore = ({ isServer }) => {
  if (isServer) {
    //If it's on server side, create a store
    return configureStore({
      reducer: combinedReducer,
      devTools: process.env.NODE_ENV !== "production",
      middleware: [thunk],
    });
  } else {
    //If it's on client side, create a store which will persist
    const { persistStore, persistReducer } = require("redux-persist");

    const persistConfig = {
      key: "nextjs",
      whitelist: [
        // "auth",
        "merchant",
        // "search",
        // "course",
        "addCourse",
        "userAnalytics",
        "adminCourses",
        "signUp",
        "adminInstitutes",
        "order",
      ],
      storage, // if needed, use a safer storage
    };

    const persistedReducer = persistReducer(persistConfig, combinedReducer); // Create a new reducer with our existing reducer

    const store = configureStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== "production",
      middleware: [thunk],
    }); // Creating the store again

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
  }
};

// Export the wrapper & wrap the pages/_app.js with this wrapper only
export const wrapper = createWrapper(makeStore);
