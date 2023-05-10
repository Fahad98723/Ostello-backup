import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useClickOutside } from '../../../../../components/hooks/useClickOutside'
import { isEmpty, titleToUrl } from '../../../../../utils/utils'

import {
  fetchCourses,
  selectCourse,
} from '../../../../../redux/slices/courseSlice'
import {
  fetchInstitutes,
  institutesSelector,
} from '../../../../../redux/slices/instituteSlice'
import {
  setLocationQuery,
  setSearchQuery,
} from '../../../../../redux/slices/SearchSlice'
import Scroll from './scroll'
import SearchList from './searchList'
import { useRouter } from 'next/router'

function Search({ style, className, placeholder }) {
  const [searchField, setSearchField] = useState('')
  const [searchShow, setSearchShow] = useState(false)
  const [searchData, setSearchData] = useState([])
  const dispatch = useDispatch()
  const { institutes } = useSelector(institutesSelector)
  const { courses } = useSelector(selectCourse)

  const filteredItems =
    searchField.length > 0 &&
    searchData.filter((item) => {
      return item?.keywords?.toLowerCase().includes(searchField.toLowerCase())
    })

  useEffect(() => {
    dispatch(fetchInstitutes())
    dispatch(fetchCourses())
  }, [])

  useEffect(() => {
    const courseData = courses.map(
        ({ id, name, ratings, images, slug }, idx) => {
            return {
                id,
                name,
                rating: ratings,
                type: 'course',
                url: slug,
                img: images,
                keywords: name,
            };
        }
    );

    const instituteData = institutes.map(
        ({ id, name, rating, images, locations, slug }, idx) => {
            const { city, area, state, line1 } = locations[0];
            return {
                id,
                name,
                rating,
                type: 'institute',
                url: `/institute/${slug}`,
                img: images,
                keywords: name + line1 + area + city + state,
            };
        }
    );
    if (!isEmpty(courseData) || !isEmpty(instituteData)) {
        setSearchData([...instituteData, ...courseData]);
    }
}, [courses, institutes]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!filteredItems.length) {
        setSearchShow(false)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [filteredItems])

  const router = useRouter()

  const handleChange = (e) => {
    setSearchField(e.target.value)
    if (e.target.value.length > 0) {
      setSearchShow(true)
    }
  }

  let domNode = useClickOutside(() => {
    setSearchShow(false)
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        router.push(`/search`)
        dispatch(setSearchQuery(searchField))
        dispatch(setLocationQuery(''))
      }}
      ref={domNode}
      style={style}
      className={className}
    >
      <input
        onClick={() => setSearchShow(true)}
        className='w-full h-full z-10 outline-none'
        type='search'
        onChange={handleChange}
        placeholder={placeholder}
      />
      <div>
        {searchShow ? (
          filteredItems.length > 0 ? (
            <Scroll
              style={{
                height: '44vh',
                boxShadow: '0px 4px 15px rgba(125, 35, 224, 0.2)',
              }}
              className='overflow-y-scroll'
            >
              {' '}
              <SearchList filteredItems={filteredItems} />{' '}
            </Scroll>
          ) : (
            <Scroll>
              <div className='flex justify-center items-center my-8 '>
                No matched Courses or Institutions
              </div>
            </Scroll>
          )
        ) : (
          ''
        )}
      </div>
    </form>
  )
}

export default Search
