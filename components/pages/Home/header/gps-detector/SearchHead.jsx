import React, { useEffect, useState } from 'react'
import { IoLocationOutline } from 'react-icons/io5'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {
  addRecentLocations,
  authSelector,
} from '../../../../../redux/slices/authSlice'
import { isEmpty } from '../../../../../utils/utils'
import { geo_api_search_url, geo_api_url } from '../../../../../utils/constant'

const SearchHead = ({ onClick, currentValue }) => {
  const { userLocation } = useSelector(authSelector)
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (search.length < 0) {
      const empty = {}
      dispatch(addRecentLocations(empty))
      
    } else if (!isEmpty(search)) {
      window.localStorage.removeItem('RECENT_LOCATIONS')
      setSearch(search)
      axios
        .get(geo_api_search_url(search))
        .then(({ data }) => {
          
          const { lat, lng } = data?.results[0]?.geometry.location

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
  }, [userLocation, search])
  return (
    <div className='flex items-center justify-between' onClick={onClick}>
      <div className='flex items-center w-full'>
        <IoLocationOutline className='text-primary text-2xl md:ml-4 mr-2' />
        <div className='font-dm-sans md:text-xl text-sm text-light-black w-full truncate'>
          <input
            type='text'
            className='w-full outline-none'
            placeholder='Search location here'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className='md:ml-4 mr-2'>
        {currentValue ? <BsChevronUp /> : <BsChevronDown />}
      </div>
    </div>
  )
}

export default SearchHead