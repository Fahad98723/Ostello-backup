import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Footer from '../../../../components/layout/Footer';
import CoursesAndInstitutes from '../../../../components/pages/Filter/CoursesAndInstitutes';
import LocationRecommended from '../../../../components/pages/Filter/LocationRecommended';
import Recommended from '../../../../components/pages/Filter/Recommended';
import Navbar from '../../../../components/pages/HomeLanding/Header/Navbar';
import LocationSearch from '../../../../components/pages/HomeLanding/Header/SearchBar/LocationSearch';
import Search from '../../../../components/pages/HomeLanding/Header/SearchBar/Search';
import OstelloConnect from '../../../../components/pages/HomeLanding/OstelloConnect';
import OstelloSubscribe from '../../../../components/pages/HomeLanding/OstelloSubscribe';
import { urlToTitle } from '../../../../components/utils';
import { setSearch } from '../../../../redux/slices/courseSlice';
import { selectSearch, setLocationQuery } from '../../../../redux/slices/SearchSlice';
import { setUserLocation } from '../../../../redux/slices/UserAnalytics';
const SearchLocation = () => {
    const {
        selectedInstituteName,
        filteredCourses,
        filteredInstitutes,
        locationQuery,
        searchQuery,
        filters,
        areaLocation,
        searchByName,
      } = useSelector(selectSearch);
      const router = useRouter()
      const dispatch = useDispatch()
  useEffect(()=> {
    navigator.geolocation && navigator.geolocation.getCurrentPosition(function(position) {
      dispatch(setUserLocation({latitude:position.coords.latitude,longitude: position.coords.longitude}))
    });
  })
    // useEffect(() => {
    //     if(router.query.location && !locationQuery){
    //         const {location} = router.query
    //         const loc =  urlToTitle(location)

    //         dispatch(setLocationQuery(loc))
    //         dispatch(setSearch({
    //           type:'institute',
    //           name:''
    //         }))
    //     }
    // },[router.query,locationQuery ])

    return (
    <main className='md:max-w-[1350px] mx-auto '>
     <div className="md:fixed md:top-0 md:z-50 md:max-w-[1350px] w-full mx-auto md:bg-white  md:shadow md:rounded-xl">
      <Navbar />
      {/* <div className=" p-3 rounded-b-xl md:shadow-md ">
        <div className=" md:max-w-[700px] mx-auto grid grid-cols-1 sm:grid-cols-2 divide-gray/30 divide-y sm:divide-x sm:divide-y-0 rounded-md border border-gray p-2  sm:mx-auto bg-white ">
          <div className="w-full">
            <LocationSearch />
          </div>
          <div className="relative w-full">
            <Search />
          </div>
        </div>
      </div> */}
      </div>
      <div className="md:mt-[50px]">
      <LocationRecommended />
      <OstelloConnect />
      <CoursesAndInstitutes />
      <OstelloSubscribe />
      <Footer />
      </div>
    </main>
    );
};

export default SearchLocation;


