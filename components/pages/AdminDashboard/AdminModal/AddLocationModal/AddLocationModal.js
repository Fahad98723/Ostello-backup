import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewLocation } from '../../../../../redux/slices/adminCourseSlice'

const AddLocationModal = ({ setAddLocation }) => {
  const dispatch = useDispatch()
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [pincode, setPincode] = useState('')
  const [area, setArea] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [error, setError] = useState('')

  const handleOnSubmit = () => {
    if (!line1 || !pincode || !area || !city || !state || !country) {
      setError('Please Fill The All Required Field')
      return
    }
    setError('')


    const newLocation = {
      line1,
      line2,
      pincode,
      state,
      city,
      country,
      area,
    }

    dispatch(addNewLocation(newLocation))
    setAddLocation(false)
  }
  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative md:w-[27%] w-[90%] w mb-6 mx-auto max-w-6xl'>
          {/*content*/}
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className=' py-3 px-5 rounded-t'>
              <div className='flex items-start justify-between'>
                <div className='text-[22px] text-[#7D23E0] leading-[47px] font-medium'>
                  Add Location
                </div>
                <button
                  className='p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                  onClick={() => setAddLocation(false)}
                >
                  <span className=' bg-white border border-[#7D23E0] rounded-full p-4 flex justify-center items-center h-6 w-6 text-2xl text-[#7D23E0] outline-none focus:outline-none'>
                    ×
                  </span>
                </button>
              </div>
              {error && <div className='text-[14px] text-[#FF0000]-500'>{error}</div>}
            </div>
            {/*body*/}
            <div className='relative px-6 md:h-[50vh] h-[65vh] overflow-y-auto scrollbar-hide flex-auto'>
              <div className='flex flex-col'>
                <input
                  onChange={(e) => setLine1(e.target.value)}
                  className='py-2 px-3 my-2 outline outline-1 rounded-lg outline-[#000]'
                  type='text'
                  placeholder='Address line 1'
                />
                <input
                  onChange={(e) => setLine2(e.target.value)}
                  className='py-2 px-3 my-2 outline outline-1 rounded-lg outline-[#000]'
                  type='text'
                  placeholder='Address line 2 (optional)'
                />
                <input
                  onChange={(e) => setPincode(e.target.value)}
                  className='py-2 px-3 my-2 outline outline-1 rounded-lg outline-[#000]'
                  type='number'
                  placeholder='Pincode'
                />
                <input
                  onChange={(e) => setArea(e.target.value)}
                  className='py-2 px-3 my-2 outline outline-1 rounded-lg outline-[#000]'
                  type='text'
                  placeholder='area'
                />
                <input
                  onChange={(e) => setCity(e.target.value)}
                  className='py-2 px-3 my-2 outline outline-1 rounded-lg outline-[#000]'
                  type='text'
                  placeholder='City'
                />
                <input
                  onChange={(e) => setState(e.target.value)}
                  className='py-2 px-3 my-2 outline outline-1 rounded-lg outline-[#000]'
                  type='text'
                  placeholder='State'
                />
                <input
                  onChange={(e) => setCountry(e.target.value)}
                  className='py-2 px-3 my-2 outline outline-1 rounded-lg outline-[#000]'
                  type='text'
                  placeholder='Country'
                />
              </div>
            </div>
            {/*footer*/}
            <div className='p-5 border-solid border-slate-200 rounded-b'>
              <button
                onClick={() => handleOnSubmit()}
                className='border  bg-[#7D23E0] w-full md:px-12 py-2 px-4 md:py-3 font-bold rounded-lg text-white'
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed !mt-0 inset-0 z-40 bg-black'></div>
    </>
  )
}

export default AddLocationModal
