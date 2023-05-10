import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CourseCard from '../../../components/pages/Home/PopularCourses/CourseCard';
import InstituteCard from '../../../components/UI/InstituteCard';
import { selectCourse } from '../../../redux/slices/courseSlice';
import { institutesSelector } from '../../../redux/slices/instituteSlice';
import { selectSearch } from '../../../redux/slices/SearchSlice';
import { isEmpty } from '../../../utils/utils';

const RecommendedCard = () => {
    const {
        selectedInstituteName,
        filteredCourses,
        filteredInstitutes,
        locationQuery,
        searchQuery,
        filters,
      } = useSelector(selectSearch);
      const { institutes } = useSelector(institutesSelector);
      const { courses, search } = useSelector(selectCourse);

      


      const [type , setType] = useState(search?.type)

        useEffect(() => {
          if(filteredCourses?.length > filteredInstitutes?.length ){
            setType('course')
          }
          else{
            setType('institute')
          }
        },[filteredCourses?.length, filteredInstitutes?.length])

    return (
        <div className="grid xl:grid-cols-3 grid-cols-1 md-mx-auto gap-x-[50px] gap-y-[25px] my-10">

            {
              type === 'course' ?   !isEmpty(filteredCourses) ? (
                filteredCourses?.slice(0,9)?.map((item, i) => (
                  <CourseCard key={item.id} {...item} />
                ))) : <div>
                <p className='text-[#FF0000] text-3xl '>No Result Found </p>
                

              </div>    
                   : filteredInstitutes?.length > 0
                    ? filteredInstitutes?.slice().sort((a, b) => b?.images?.length - a?.images?.length)
                    ?.sort((a, b) => b?.reviews?.length - a?.reviews?.length)
                    ?.sort((a, b) => b?.rating - a?.rating)
                    ?.slice(0, 9).map((item, key) => (
                        <InstituteCard {...item} key={key} />
                      )) : <div>
                        <p className='text-[#FF0000] text-3xl '>No Result Found </p>
                        
    
                      </div>                   
    
            }

            
              
            </div>
    );
};

export default RecommendedCard;