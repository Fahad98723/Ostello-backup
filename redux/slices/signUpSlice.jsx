import { createSlice } from "@reduxjs/toolkit";
const signUpSlice = createSlice({
  name: "signUp",
  initialState: {
    loading: false,
    error: null,
    registerData: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phonenumber: "",
      gender: "",
      qualification: "",
      schoolname: "",
      area: "",
      state: "",
      city: "",
      pincode: "",
      usertypes: 0,
      otp:'',
    },
  },
  reducers: {
    addRegisterData: (state, { payload }) => {
      state.registerData = { ...state.registerData, ...payload };
    },
    removeRegisterData: (state, { payload }) => {
      state.registerData = {
        name: "",
        email: "",
        password: "",
        phonenumber: "",
        usertypes: 0,
        city: "",
      };
    },
  },
});

export default signUpSlice.reducer;

export const { addRegisterData, removeRegisterData } = signUpSlice.actions;

export const selectSignUp = (state) => state.signUp;
