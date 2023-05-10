import { DownOutlined, UpOutlined } from '@ant-design/icons'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Card from '../header/search_field/card'
import {
  addRecentLocations,
  authSelector,
} from '../../../../redux/slices/authSlice'
import {
  fetchInstitutes,
  institutesSelector,
} from '../../../../redux/slices/instituteSlice'
import {
  clearFilters,
  selectSearch,
  setFilteredCourses,
  setFilteredInstitutes,
  setLocationQuery,
  setSearchQuery,
} from '../../../../redux/slices/SearchSlice'

import {
  fetchCourses,
  selectCourse,
} from '../../../../redux/slices/courseSlice'
import { geo_api_search_url, geo_api_url } from '../../../../utils/constant'
import { useRouter } from 'next/router'
import { useClickOutside } from '../../../hooks/useClickOutside'
import { isEmpty } from '../../../../utils/utils'
import Link from 'next/link'

export default function Tabs({ currentValue, onToggle, active, setClicked }) {
  const { icon, type, id, placeholderText, content } = currentValue
  const [isOpened, setIsOpened] = useState(false)
  const inputRef = useRef({})
  const searchRef = useRef(null)
  const [searchField, setSearchField] = useState('')
  const [locationShow, setLocationShow] = useState(false)
  const [searchShow, setSearchShow] = useState(false)
  const [searchData, setSearchData] = useState([])
  const dispatch = useDispatch()
  const { institutes } = useSelector(institutesSelector)
  const { courses } = useSelector(selectCourse)
  const [locationType, setLocationType] = useState('')
  const { userLocation, recentLocations } = useSelector(authSelector)
  const { locationQuery, searchQuery } = useSelector(selectSearch)
  const [filteredItems, setFilteredItems] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (
      !isEmpty(searchData) &&
      (locationType?.length > 1 || searchField?.length > 1) &&
      active
    ) {
      const temp = searchData?.filter((item) => {
        if (type === 'location') {
          return item?.keywords
            ?.toLowerCase()
            .includes(locationType?.toLowerCase().split(' ').slice(0, 1)[0])
        } else
          return item?.keywords
            ?.toLowerCase()
            .includes(searchField?.toLowerCase())
      })
      setFilteredItems(temp)
    }
  }, [searchData, searchField, locationType, type, active])

  useEffect(() => {
    dispatch(
      setFilteredCourses(
        filteredItems?.filter((item) => item.type === 'course')
      )
    )
    dispatch(
      setFilteredInstitutes(
        filteredItems?.filter((item) => item.type === 'institute')
      )
    )
  }, [filteredItems])

  useEffect(() => {
    if (locationQuery?.length > 1) {
      setLocationType(locationQuery)
      setClicked(1)
    }
    if (searchQuery?.length > 1) {
      setSearchField(searchQuery)
      setClicked(2)
    }
  }, [locationQuery, searchQuery])

  useEffect(() => {
    isEmpty(institutes) && dispatch(fetchInstitutes())
    isEmpty(courses) && dispatch(fetchCourses())

    const courseData = courses.map((item, idx) => {
      const { id, name, ratings, images, slug } = item
      return {
        ...item,
        id,
        name,
        rating: ratings,
        type: 'course',
        url: slug,
        img: images,
        keywords: name,
      }
    })
    const instituteData = institutes.map((item, idx) => {
      const { id, name, rating, images, locations, slug } = item
      const { city, area, state, line1 } = locations[0]
      return {
        ...item,
        id,
        name,
        rating,
        type: 'institute',
        url: `/institute/${slug}`,
        img: images,
        keywords: name + line1 + area + city + state,
      }
    })
    if (!isEmpty(courseData) && !isEmpty(instituteData)) {
      setSearchData([...instituteData, ...courseData])
    }
  }, [courses, institutes])

  useEffect(() => {
    inputRef.current.autoFocus = true
    const interval = setInterval(() => {
      if (!filteredItems.length) {
        setSearchShow(false)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [filteredItems])

  useEffect(() => {
    if (locationType.length < 1) {
      dispatch(addRecentLocations({}))
    } else {
      window.localStorage.removeItem('RECENT_LOCATIONS')
      axios
        .get(geo_api_search_url(locationType))
        .then(({ data }) => {
          const { lat, lng } = data?.results[0]?.geometry?.location
          axios
            .get(geo_api_url(lat, lng))
            .then(({ data }) => {
              const root = data.results
              const formattedLocationInformation = {
                formatted: root,
              }
              dispatch(addRecentLocations(formattedLocationInformation))
            })
            .catch((err) => 
        })
        .catch((err) => 
    }
  }, [locationType])

  const handleChange = (e) => {
    type === 'location'
      ? setLocationType(e.target.value)
      : setSearchField(e.target.value)
    if (e.target.value.length > 0) {
      setSearchShow(true)
    } else {
      dispatch(clearFilters({ courses, institutes }))
    }
  }

  let domNode = useClickOutside(() => {
    setSearchShow(false)
    setLocationShow(false)
  })

  const Scroll = ({ style, children, className }) => {
    return (
      <div
        style={style}
        className={`${className} w-full absolute left-0 bg-white`}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      ref={domNode}
      className={
        active
          ? 'relative w-full flex  items-center border border-primary  rounded-full p-2  space-x-1 transition-all duration-700 ease-in border-opacity-40 '
          : 'border-primary border-opacity-40 flex items-center border rounded-full p-2 space-x-1  '
      }
      key={id}
    >
      <div
        onClick={onToggle}
        className={`text-primary text-2xl rounded-full ${
          id === 2 && active && 'order-2'
        }`}
      >
        {icon}
      </div>

      <form
        className='w-full'
        action=''
        onSubmit={(e) => {
          e.preventDefault()
          setSearchShow(false)
          setSearchField(type === 'search' ? searchField : locationType)
          if (type === 'search') {
            dispatch(
              setFilteredCourses(
                filteredItems.filter((item) => item.type === 'course')
              )
            )
            router.push(`/search`)
            dispatch(setSearchQuery(searchField))
            dispatch(setLocationQuery(''))
          } else {
            dispatch(
              setFilteredCourses(
                filteredItems.filter((item) => item.type === 'institute')
              )
            )
            router.push(`/search`)
            dispatch(setLocationQuery(locationType))
            dispatch(setSearchQuery(''))
          }
        }}
      >
        {type === 'location' ? (
          <input
            ref={inputRef}
            onClick={() => {
              setIsOpened(!isOpened)
              type === 'location' && setLocationShow(true)
            }}
            autoFocus={true}
            className={` outline-none
            border-none
            w-full
            placeholder:text-sm
            focus:bg-none
             transition-all duration-1000 ease-in
            autofill:bg-transparent ${!active && 'hidden'}`}
            placeholder={placeholderText}
            name={type}
            onChange={handleChange}
            value={locationType || ''}
          />
        ) : (
          <input
            ref={searchRef}
            onClick={() => {
              setIsOpened(!isOpened)
              setSearchShow(true)
            }}
            autoFocus={true}
            className={` outline-none
            border-none
            w-full
            placeholder:text-sm
            focus:bg-none
             transition-all duration-1000 ease-in
            autofill:bg-transparent ${!active && 'hidden'}`}
            placeholder={placeholderText}
            name={type}
            onChange={handleChange}
            value={searchField || ''}
          />
        )}
      </form>
      {type === 'search' && active && (
        <div ref={domNode} className='mt-5'>
          {searchShow &&
            (filteredItems.length > 0 ? (
              <Scroll
                style={{
                  boxShadow: '0px 4px 15px rgba(125, 35, 224, 0.2)',
                }}
                className='overflow-y-scroll z-10 max-h-[44vh] rounded-xl'
              >
                {' '}
                {filteredItems.map((item, index) => (
                  <Card key={index} currentValue={item} />
                ))}
              </Scroll>
            ) : (
              <Scroll className='rounded-xl'>
                <div className='flex justify-center items-center my-8 '>
                  No matched Courses or Institutions
                </div>
              </Scroll>
            ))}
        </div>
      )}
      {type === 'location' && active && (
        <div ref={domNode} className='mt-5'>
          <Scroll
            style={{
              boxShadow: '0px 4px 15px rgba(125, 35, 224, 0.2)',
            }}
            className='rounded-t-xl'
          >
            {' '}
            {recentLocations.length > 1 && locationShow && (
              <>
                <p className='lg:text-xl ml-5 mt-2 text-md text-gray'>
                  Nearby Locations
                </p>
                <Scroll className='overflow-y-scroll z-10 max-h-[44vh] rounded-b-xl'>
                  <div className='divide-y-[.5px] space-y-5 divide-light-slate/10 font-sm text-gray bg-white'>
                    {recentLocations[0]?.formatted?.map((item, idx) => (
                      <>
                        <div key={idx}>
                          {item.formatted_address && (
                            <div
                              className='flex bg-white p-2 cursor-pointer'
                              onClick={(e) => {
                                e.preventDefault()
                                setLocationType(
                                  item.formatted_address
                                    .split(',')
                                    .slice(0, 2)
                                    .join(',')
                                )
                                dispatch(setSearchQuery(''))
                              }}
                            >
                              <Link legacyBehavior prefetch={false}
                                href={`/search`}
                              >
                                {item.formatted_address}
                              </Link>
                            </div>
                          )}
                        </div>
                      </>
                    ))}
                  </div>
                </Scroll>
              </>
            )}
          </Scroll>
        </div>
      )}
    </div>
  )
}
