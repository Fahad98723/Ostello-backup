import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showSideBar: false,
  logoForBottomMenu : false,
}

const UserProfileSidePopUp = createSlice({
  name: 'userProfileSidePopup',
  initialState,
  reducers: {
    setShowSideBar: (state, { payload }) => {
      state.showSideBar = payload
    },
    setLogoForBottomMenu: (state, { payload }) => {
      state.logoForBottomMenu = payload
    },
  },
})

export default UserProfileSidePopUp.reducer

export const { setShowSideBar , setLogoForBottomMenu } = UserProfileSidePopUp.actions

export const userSidePopupSelector = (state) => state.userProfileSidePopup
