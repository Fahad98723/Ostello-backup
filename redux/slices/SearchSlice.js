import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { host } from '../../utils/constant'

const initialState = {
  loading: false,
  error: false,
  filters: {
    category: null,
    classType: null,
    duration: null,
    sortBy: null,
    rating: null,
    price: null,
    classes: [],
    subjects: [],
    board: [],
    exam: [],
    skill: [],
  },
  selectedInstituteName : '',
  filteredInstitutes: [],
  filteredCourses: [],
  locationQuery: '',
  searchQuery: '',
  topLocations: [],
  areaLocation:''
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setFilteredInstitutes: (state, { payload }) => {
      state.filteredInstitutes = payload
    },
    setFilteredCourses: (state, { payload }) => {
      state.filteredCourses = payload
    },
    setTopLocations: (state, { payload }) => {
      state.topLocations = payload
    },
    setSelectedInstituteName: (state, { payload }) => {
      state.selectedInstituteName = payload
      state.locationQuery = ''
      state.searchQuery = ''
    },
    setLocationQuery: (state, { payload }) => {
      state.locationQuery = payload
      state.searchQuery = ''
      state.selectedInstituteName = ''
    },
    setSearchQuery: (state, { payload }) => {
      state.searchQuery = payload
      state.locationQuery = ''
      state.selectedInstituteName = ''
    },
    setCategory: (state, { payload }) => {
      state.filters.category = payload
    },
    setClassType: (state, { payload }) => {
      state.filters.classType = payload
    },
    setSkill: (state, { payload }) => {
      state.filters.skill = payload
    },
    setDuration: (state, { payload }) => {
      state.filters.duration = payload
    },
    setSortBy: (state, { payload }) => {
      state.filters.sortBy = payload
    },
    setRating: (state, { payload }) => {
      state.filters.rating = payload
    },
    setPrice: (state, { payload }) => {
      state.filters.price = payload
    },
    setClass: (state, { payload }) => {
      state.filters.classes = payload
    },
    setSubjects: (state, { payload }) => {
      state.filters.subjects = payload
    },
    setBoard: (state, { payload }) => {
      state.filters.board = payload
    },
    setExam: (state, { payload }) => {
      state.filters.exam = payload
    },
    setAreaLocation : (state, { payload }) => {
      state.areaLocation = payload
    },

    clearFilters: (state, { payload }) => {
      state.filteredCourses = payload.courses
      state.filteredInstitutes = payload.institutes
      state.searchQuery = ''
      state.selectedInstituteName = ''
      state.location = ''
      state.filters = {
        category: null,
        classType: null,
        duration: null,
        sortBy: null,
        rating: null,
        price: null,
        classes: [],
        subjects: [],
        board: [],
        exam: [],
        skill: [],
      }
    },
  },
})

export default searchSlice.reducer

export const {
  setCategory,
  setDuration,
  setClassType,
  setSkill,
  setPrice,
  setRating,
  setSortBy,
  setBoard,
  setClass,
  setSubjects,
  setExam,
  clearFilters,
  setFilteredCourses,
  setFilteredInstitutes,
  setSelectedInstituteName,
  setLocationQuery,
  setAreaLocation, 
  setSearchQuery,
  setTopLocations,
} = searchSlice.actions

export const selectSearch = (state) => state.search

export const filterInstitute = () => {
  return async (state,dispatch) => {
  if(state?.locationQuery?.length > 0){
      try {
        const { data } = await axios.get(`${host}/institute?location=${state?.locationQuery}`)
        dispatch(setFilteredInstitutes(data.message))
      } catch (error) {
        toast.error(error.toString())
      }
    }
  }
}
export const filterCourse = () => {
  return async (state,dispatch) => {
  if(state?.searchQuery?.length > 1){
      try {
        const { data } = await axios.get(`${host}/course?name=${state?.searchQuery}`)
        dispatch(setFilteredCourses(data.message))
      } catch (error) {
        toast.error(error.toString())
      }
    }
    // else if(state?.selectedInstituteName?.length > 1){
    //   try {
    //     const { data } = await axios.get(`${host}/course`)
    //     const courses = data.message.filter((course) =>{
    //       return course.institute?.name.toLowerCase().includes(state.selectedInstituteName.toLowerCase())
    //     })
    //     
    //     dispatch(setFilteredCourses(courses))
    //   } catch (error) {
    //     toast.error(error.toString())
    //   }
    // }
  }
}
