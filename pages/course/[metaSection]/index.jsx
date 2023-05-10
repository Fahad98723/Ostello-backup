import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Footer from '../../../components/layout/Footer';
import CardSection from '../../../components/pages/Course/MetaCourseSection/CardSection';
import SearchHeader from '../../../components/pages/Course/MetaCourseSection/SearchHeader';
import Navbar from '../../../components/pages/HomeLanding/Header/Navbar';
import OstelloSubscribe from '../../../components/pages/HomeLanding/OstelloSubscribe';
import { selectSearch } from '../../../redux/slices/SearchSlice';
import { setUserLocation } from '../../../redux/slices/UserAnalytics';

const MetaCourseSection = () => {
      const router = useRouter()
      const dispatch = useDispatch()
      const { metaSection } = router.query;
      const { locationQuery } = useSelector(selectSearch);

      useEffect(()=> {
        navigator.geolocation && navigator.geolocation.getCurrentPosition(function(position) {
          dispatch(setUserLocation({latitude:position.coords.latitude,longitude: position.coords.longitude}))
        });
      })

    const arr = metaSection?.split("-");

    //loop through each element of the array and capitalize the first letter.
    
    
    for (var i = 0; i < arr?.length; i++) {
        arr[i] = arr[i]?.charAt(0)?.toUpperCase() + arr[i]?.slice(1);
    
    }
    

    const str2 = arr?.join(" ");
   

    return (
    <main className='md:max-w-[1350px] mx-auto '>
      {/* <MetaHelmet title={`${title} | Ostello`} description={description} link={url} /> */}
      <div className="md:fixed md:top-0 md:z-50 md:max-w-[1350px] w-full mx-auto md:bg-white  md:shadow md:rounded-xl">
    <Navbar />

    </div>
    <div className="md:mt-[50px]">
      <SearchHeader metaSection={str2}/>
      <CardSection metaSection={str2}/>
      {/* <MetaSection/> */}
      <OstelloSubscribe />
      <Footer/>
      </div>
    </main>
    );
};

export default MetaCourseSection;


