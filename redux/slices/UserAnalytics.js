import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { host } from '../../utils/constant'

const initialState = {
  visitInstitute: {instituteId: '', timeStamps: ''},
  watchingVideos: {videoUrl: '', timeStamps: ''},
  visitCourseOffered: {courseId: '', timeStamps: ''},
  researchFaculty: {facultyId: '', timeStamps: ''},
  knowInstitute: {instituteId: '', timeStamps: ''},
  userLocation: {latitude: '', longitude: ''},
  merchantAnalytics: [],
  enquiryFormModal : false,
}

const userAnalytics = createSlice({
  name: 'userAnalytics',
  initialState,
  reducers: {
    setVisitInstitute: (state, { payload }) => {
      state.visitInstitute = payload
    },
    setWatchingVideos: (state, { payload }) => {
      state.watchingVideos = payload
    },
    setVisitCourseOffered: (state, { payload }) => {
      state.visitCourseOffered = payload
    },
    setResearchFaculty: (state, { payload }) => {
      state.researchFaculty = payload
    },
    setKnowInstitute: (state, { payload }) => {
      state.clickOnAbout = payload
    },
    setUserLocation: (state, { payload }) => {
      state.userLocation = payload
    },
    setMerchantAnalytics: (state, { payload }) => {
      state.merchantAnalytics = payload
    },
    setEnquiryFormModal: (state, { payload }) => {
      state.enquiryFormModal = payload
    },
  }
})

export default userAnalytics.reducer

export const {
  setVisitInstitute,
  setWatchingVideos,
  setVisitCourseOffered,
  setResearchFaculty,
  setKnowInstitute,
  setUserLocation,
  setMerchantAnalytics,
  setEnquiryFormModal
} =  userAnalytics.actions

export const selectUserAnalytics = (state) => state.userAnalytics

export function postUserAnalytics(body) {
  return async () => {
    try {
      const response = await axios.post(`${host}/analytics`, body, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      
    } catch (err) {
      
    }
  }
}
export function getMerchantAnalytics(instituteId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${host}/analytics?instituteid=${instituteId}&limit=1000`,{
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${
            typeof window !== 'undefined' &&
            window.localStorage.getItem('ACCESS_TOKEN')
          }`,
        },
      })
      dispatch(setMerchantAnalytics(response.data.message))
      
    } catch (err) {
     
    }
  }
}

