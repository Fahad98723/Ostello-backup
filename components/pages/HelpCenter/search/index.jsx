import React from 'react'
import { BiSearch } from 'react-icons/bi'
const Search = () => {
  return (
    <div className='bg-white w-11/12 md:w-4/12 px-4 py-4 flex justify-center items-center rounded-lg shadow mb-16'>
      <BiSearch className='text-primary text-2xl' />
      <input
        className='w-full outline-none border-none pl-6'
        type='search'
        placeholder='What are you looking for?'
      />
    </div>
  )
}
export default Search