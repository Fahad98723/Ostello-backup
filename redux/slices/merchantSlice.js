import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  error: null,
  contactInformation: {},
  instituteInformation: {},
  courseDetails: {},
}

const merchantSlice = createSlice({
  name: 'merchant',
  initialState,
  reducers: {
    addContactInformation: (state, { payload }) => {
      const contactInformation = payload
      state.contactInformation = contactInformation
    },
    addInstituteInformation: (state, { payload }) => {
      const data = payload
      state.instituteInformation = data
    },
    addCourseDetails: (state, { payload }) => {
      const data = payload
      state.courseDetails = data
    },
  },
})

export default merchantSlice.reducer

export const {
  addContactInformation,
  addCourseDetails,
  addInstituteInformation,
} = merchantSlice.actions

export const merchantSelector = (state) => state.merchant
