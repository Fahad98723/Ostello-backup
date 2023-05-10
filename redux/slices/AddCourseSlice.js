import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  basicDetails: {},
  additionalDescription: {},
  syllabusDescription: {},
  syllabus: [],
  coursePrice: {},
  selectedImages: [],
  selectedVideos: [],
  thumbnails: [],
  classes: [],
  subjects: [],
  boards: [],
  exams: [],
  division: [],
  subCategories: [],
  categorySelected: "",
  percentageCount: 0,
  courseSlugDescription: "",
  courseSlugTitle: "",
  courseSlugLink: "",
  guaranteeDay: "",
  courseEnrolledStudents: 0,
  coursePriceDetails: {},
};

const addCourseSlice = createSlice({
  name: "addCourse",
  initialState,
  reducers: {
    addBasicDetails: (state, { payload }) => {
      const basicDetails = payload;
      state.basicDetails = basicDetails;
    },
    addAdditionalDescription: (state, { payload }) => {
      const additionalDescription = payload;
      state.additionalDescription = additionalDescription;
    },
    addSelectedImage: (state, { payload }) => {
      state.selectedImages = payload;
    },
    addCourseSlugDescription: (state, { payload }) => {
      state.courseSlugDescription = payload;
    },
    addCourseSlugTitle: (state, { payload }) => {
      state.courseSlugTitle = payload;
    },
    addCourseSlugLink: (state, { payload }) => {
      state.courseSlugLink = payload;
    },
    removeAllSelectedImages: (state) => {
      state.selectedImages = [];
    },
    addSelectedVideo: (state, { payload }) => {
      state.selectedVideos = payload;
    },
    removeAllSelectedVideos: (state) => {
      state.selectedVideos = [];
    },
    addSyllabusDescription: (state, { payload }) => {
      state.syllabusDescription = payload;
    },
    addSyllabus: (state, { payload }) => {
      state.syllabus = payload;
    },
    addCoursePrice: (state, { payload }) => {
      state.coursePrice = payload;
    },
    addCoursePriceDetails: (state, { payload }) => {
      state.coursePriceDetails = payload;
    },

    addGuaranteeDay: (state, { payload }) => {
      state.guaranteeDay = payload;
    },
    addCourseEnrolledStudent: (state, { payload }) => {
      state.courseEnrolledStudents = payload;
    },
    addThumbnails: (state, { payload }) => {
      state.thumbnails = payload;
    },
    setClasses: (state, { payload }) => {
      state.classes = payload;
    },
    setExams: (state, { payload }) => {
      state.exams = payload;
    },
    setBoards: (state, { payload }) => {
      state.boards = payload;
    },
    setDivision: (state, { payload }) => {
      state.division = payload;
    },
    setSubjects: (state, { payload }) => {
      state.subjects = payload;
    },
    setSubCategories: (state, { payload }) => {
      state.subCategories = payload;
    },
    setCategorySelected: (state, { payload }) => {
      state.categorySelected = payload;
    },
    setPercentageCount: (state, { payload }) => {
      state.percentageCount = payload;
    },
    clearAddCourseState: (state) => {
      state.loading = false;
      state.error = null;
      state.basicDetails = {};
      state.additionalDescription = {};
      state.syllabusDescription = {};
      state.coursePrice = {};
      state.selectedImages = [];
      state.selectedVideos = [];
      state.thumbnails = [];
      state.classes = [];
      state.subjects = [];
      state.boards = [];
      state.exams = [];
      state.division = [];
      state.subCategories = [];
      state.categorySelected = "";
      state.percentageCount = 0;
      state.courseSlugDescription = "";
      state.courseSlugTitle = "";
      state.courseSlugLink = "";
      state.guaranteeDay = "";
      state.courseEnrolledStudents = 0;
      (state.syllabus = []), (state.coursePriceDetails = {});
    },
  },
});

export default addCourseSlice.reducer;

export const {
  addBasicDetails,
  addCourseEnrolledStudent,
  addAdditionalDescription,
  addSelectedImage,
  addSelectedVideo,
  removeAllSelectedImages,
  removeAllSelectedVideos,
  addSyllabusDescription,
  addCoursePrice,
  addCoursePriceDetails,
  addProductionSupport,
  addThumbnails,
  setBoards,
  setClasses,
  setExams,
  setSubCategories,
  setSubjects,
  setDivision,
  setCategorySelected,
  setPercentageCount,
  addCourseSlugDescription,
  addCourseSlugLink,
  addSyllabus,
  addCourseSlugTitle,
  addGuaranteeDay,
  clearAddCourseState,
} = addCourseSlice.actions;

export const addCourseSelector = (state) => state.addCourse;
