import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { AuthenticationHeaders, host } from '../../utils/constant'

const initialState = {
  loading: false,
  error: null,
  adminEvents: [],
  isDeleted: false,
  isAddedNewEvent: false,
  isUpdated: false,
  adminEvent: {},
  message: '',
}

const adminEventSlice = createSlice({
  name: 'adminEvents',
  initialState,
  reducers: {
    //----------------get all events-------------------//
    getAdminEventsRequest: (state) => {
      state.loading = true
    },
    getAdminEventsSuccess: (state, { payload }) => {
      state.adminEvents = payload
      state.loading = false
      state.error = null
    },
    getAdminEventsFail: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    //----------------get event-------------------//
    getAdminEventRequest: (state) => {
      state.loading = true
    },
    getAdminEventSuccess: (state, { payload }) => {
      state.adminEvent = payload
      state.loading = false
      state.error = null
    },
    getAdminEventFail: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    //----------------add new Event-------------------//
    adminAddNewEventRequest: (state) => {
      state.loading = true
      state.isAddedNewEvent = false
    },
    adminAddNewEventSuccess: (state, { payload }) => {
      state.loading = false
      state.isAddedNewEvent = true
      state.message = payload
    },
    adminAddNewEventFail: (state) => {
      state.loading = true
      state.isAddedNewEvent = false
    },
    //----------------Delete Event-------------------//
    adminEventDeleteRequest: (state) => {
      state.loading = true
      state.isDeleted = false
    },
    adminEventDeleteSuccess: (state) => {
      state.loading = false
      state.isDeleted = true
    },
    adminEventDeleteFail: (state) => {
      state.loading = false
      state.isDeleted = false
    },
    //----------------Update Event-------------------//
    adminEventUpdateRequest: (state) => {
      state.loading = true
      state.isUpdated = false
    },
    adminEventUpdateSuccess: (state) => {
      state.loading = false
      state.isUpdated = true
    },
    adminEventUpdateFail: (state) => {
      state.loading = false
      state.isUpdated = false
    },
  },
})

export const {
  getAdminEventsRequest,
  getAdminEventsSuccess,
  getAdminEventsFail,
  getAdminEventRequest,
  getAdminEventSuccess,
  getAdminEventFail,
  adminAddNewEventRequest,
  adminAddNewEventSuccess,
  adminAddNewEventFail,
  adminEventDeleteRequest,
  adminEventDeleteSuccess,
  adminEventDeleteFail,
  adminEventUpdateRequest,
  adminEventUpdateSuccess,
  adminEventUpdateFail,
  EventPreviewData,
} = adminEventSlice.actions

// get all Events
export function fetchAdminEvents() {
  return async (dispatch) => {
    dispatch(getAdminEventsRequest())
    try {
      const { data } = await axios.get(`${host}/event`)
      dispatch(getAdminEventsSuccess(data.message))
    } catch (err) {
      dispatch(getAdminEventsFail(err))
      toast.error(err.toString())
    }
  }
}

import { toast } from 'react-hot-toast'

// get Event
export function fetchAdminEvent(id) {
  return async (dispatch) => {
    dispatch(getAdminEventRequest())
    try {
      const { data } = await axios.get(`${host}/event?id=${id}`)
      dispatch(getAdminEventSuccess(data.message))
    } catch (err) {
      dispatch(getAdminEventFail(err))
    }
  }
}

// add new Event
export function adminAddEvent(eventData, afterSuccess = () => {}) {
  return async (dispatch) => {
    dispatch(adminAddNewEventRequest())
    try {
      const config = {
        headers: AuthenticationHeaders,
      }
      const { data } = await axios.post(`${host}/event`, eventData, config)
      dispatch(adminAddNewEventSuccess(data.message))
      afterSuccess()
    } catch (err) {
      dispatch(adminAddNewEventFail(err))
      toast.error(err.toString())
    }
  }
}

// remove Event
export function adminDeleteEvent(id) {
  return async (dispatch) => {
    dispatch(adminEventDeleteRequest())
    try {
      const config = {
        headers: AuthenticationHeaders,
      }
      const { data } = await axios.delete(`${host}/event?id=${id}`, config)
      dispatch(adminEventDeleteSuccess(data.message))
    } catch (err) {
      dispatch(adminEventDeleteFail(err))
    }
  }
}

// update Event
export function adminUpdateEvent(updateData) {
  return async (dispatch) => {
    dispatch(adminEventDeleteRequest())
    try {
      const config = {
        headers: AuthenticationHeaders,
      }
      const { data } = await axios.patch(`${host}/event`, updateData, config)
      dispatch(adminEventDeleteSuccess(data.message))
    } catch (err) {
      dispatch(adminEventDeleteFail(err))
    }
  }
}

export default adminEventSlice.reducer
