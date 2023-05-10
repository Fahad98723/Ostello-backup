import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'
import { AuthenticationHeaders, host } from '../../utils/constant'

const initialState = {
  loading: false,
  loadingData: false,
  adminSingleInstitute: {},
  adminInstitutes: [],
  adminLocations: [],
  adminFaculty: [],
  adminAchievement: [],
  error: null,
  isUpdated: false,
  isUpdatedData: false,
}

const adminInstitutesSlice = createSlice({
  name: 'adminInstitutes',
  initialState,
  reducers: {
    // -----------get all institutes------------ //
    getAdminInstitutesRequest: (state) => {
      state.loading = true
    },
    getAdminInstitutesSuccess: (state, { payload }) => {
      state.adminInstitutes = payload
      state.loading = false
      state.error = null
    },
    getAdminInstitutesFail: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    // -----------get single institute------------ //
    getSingleInstituteRequest: (state) => {
      state.loading = true
    },
    getSingleInstituteSuccess: (state, { payload }) => {
      state.adminSingleInstitute = payload
      state.loading = false
      state.error = null
    },
    getSingleInstituteFail: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    //----------------Delete institute-------------------//
    adminInstituteDeleteRequest: (state) => {
      state.loading = true
      state.isDeleted = false
    },
    // -----------institute approve update------------ //
    instituteApproveRequest: (state) => {
      state.loading = true
      state.isUpdated = false
    },
    instituteApproveSuccess: (state) => {
      state.loading = false
      state.isUpdated = true
    },
    //----------------Update institute-------------------//
    adminInstituteUpdateRequest: (state) => {
      state.loading = true
      state.isUpdated = false
    },
    adminInstituteUpdateSuccess: (state) => {
      state.loading = false
      state.isUpdatedData = true
    },
    adminInstituteUpdateFail: (state) => {
      state.loading = false
      state.isUpdated = false
    },
    adminInstituteDeleteSuccess: (state) => {
      state.loading = false
      state.isUpdated = true
    },
    instituteApproveFail: (state) => {
      state.loading = false
    },
    adminInstituteDeleteFail: (state) => {
      state.loading = false
    },
    // -----------loading------------ //
    handleLoading: (state, {payload}) => {
      state.loadingData = payload
    },

    // -----------add new location------------ //
    addNewLocation: (state, { payload }) => {
      const newLocation = payload
      state.adminLocations.push(newLocation)
    },
    // -----------add new faculty------------ //
    addNewFaculty: (state, { payload }) => {
      const newFaculty = payload
      state.adminFaculty.push(newFaculty)
    },
    // -----------add new faculty------------ //
    addNewAchievement: (state, { payload }) => {
      const newFaculty = payload
      state.adminAchievement.push(newFaculty)
    },
  },
})

export const {
  getAdminInstitutesFail,
  getAdminInstitutesRequest,
  getAdminInstitutesSuccess,
  getSingleInstituteRequest,
  getSingleInstituteSuccess,
  getSingleInstituteFail,
  instituteApproveRequest,
  adminInstituteDeleteRequest,
  adminInstituteUpdateRequest,
  instituteApproveSuccess,
  adminInstituteDeleteSuccess,
  instituteApproveFail,
  adminInstituteDeleteFail,
  adminInstituteUpdateFail,
  addNewLocation,
  addNewFaculty,
  adminInstituteUpdateSuccess,
  addNewAchievement,
  handleLoading,
} = adminInstitutesSlice.actions

// get all institutes
export function fetchAdminInstitutes() {
  return async (dispatch) => {
    dispatch(getAdminInstitutesRequest())
    try {
      const { data } = await axios.get(`${host}/institute?limit=1000`)
      dispatch(getAdminInstitutesSuccess(data.message))
    } catch (err) {
      dispatch(getAdminInstitutesFail(err))
    }
  }
}

// get single institute
export function fetchAdminSingleInstitute(id) {
  return async (dispatch) => {
    dispatch(getSingleInstituteRequest())
    try {
      const { data } = await axios.get(`${host}/institute?id=${id}`)
      dispatch(getSingleInstituteSuccess(data.message))
    } catch (err) {
      dispatch(getSingleInstituteFail(err))
    }
  }
}

// remove institute
export function adminDeleteInstitute(id) {
  return async (dispatch) => {
    dispatch(adminInstituteDeleteRequest())
    try {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${
            typeof window !== 'undefined' &&
            window.localStorage.getItem('ACCESS_TOKEN')
          }`,
        },
      }
      const { data } = await axios.delete(`${host}/institute?id=${id}`, config)
      dispatch(adminInstituteDeleteSuccess(data.message))
    } catch (err) {
      dispatch(adminInstituteDeleteFail(err))
    }
  }
}

// approve institute
export function instituteApprove(instituteData) {
  return async (dispatch) => {
    dispatch(instituteApproveRequest())
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${
          typeof window !== 'undefined' &&
          window.localStorage.getItem('ACCESS_TOKEN')
        }`,
      },
    }
    const url = `${host}/institute/approve`
    try {
      const { data } = await axios.patch(url, instituteData, config)

      dispatch(instituteApproveSuccess(data.message))

      if (instituteData.approve === 1) {
        Swal.fire({
          icon: 'success',
          title: 'Institute approval approved',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Institute approval rejected',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
      }
    } catch (err) {
      dispatch(instituteApproveFail(err))
      Swal.fire({
        icon: 'error',
        title: err.message,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
    }
  }
}

// update institute
export function adminUpdateInstitute(updateData) {
  return async (dispatch) => {
    dispatch(adminInstituteUpdateRequest())
    try {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${
            typeof window !== 'undefined' &&
            window.localStorage.getItem('ACCESS_TOKEN')
          }`,
        },
      }
      const { data } = await axios.patch(
        `${host}/institute`,
        updateData,
        config
      )
      dispatch(adminInstituteUpdateSuccess(data.message))
      Swal.fire({
        icon: 'success',
        title: 'Institute update approved',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
    } catch (err) {
      dispatch(adminInstituteUpdateFail(err))
   
      Swal.fire({
        icon: 'error',
        title: `${err.message}`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
    }
  }
}

export default adminInstitutesSlice.reducer
