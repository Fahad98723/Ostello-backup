import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  error: null,
  newCourseValues: {},
}

const sidePopupSlice = createSlice({
  name: 'sidePopup',
  initialState,
  reducers: {
    addNewCourseValues: (state, { payload }) => {
      const newCourse = payload
      state.newCourseValues = newCourse
    },
  },
})

export default sidePopupSlice.reducer

export const { addNewCourseValues } = sidePopupSlice.actions

export const sidePopupSelector = (state) => state.sidePopup
