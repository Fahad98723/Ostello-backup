import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AddLocationModal from '../../../AdminModal/AddLocationModal/AddLocationModal'
const ManageLocations = () => {
  const { adminSingleInstitute } = useSelector((state) => state.adminInstitutes)
  const { adminLocations } = useSelector((state) => state.adminInstitutes)
  const [addLocation, setAddLocation] = useState(false)
  const [locations, setLocations] = useState([])
  useEffect(() => {
    if (adminSingleInstitute?.locations?.length > 0) {
      setLocations(adminSingleInstitute.locations)
    }
  }, [adminSingleInstitute])
  return (
    <div className='my-3'>
      {locations?.length &&
        locations.map((data, index) => (
          <div
            key={index}
            className='bg-white px-6 rounded-xl md:my-4 my-1 border border-[#C8C8C8] py-2 w-full'
          >
            <p className='text-[14px] md:text-black text-[#979797] md:font-normal font-bold'>
              Location {index + 1}
            </p>
            <textarea
              defaultValue={
                data &&
                `${data.line1}, ${data.line2}, ${data.area}, ${data.city}, ${data.state}- ${data.pincode}`
              }
              readOnly
              rows='2'
              className='border-0 outline-0 text-[#000000] text-[18px] focus:ring-0 p-0 w-full'
            />
          </div>
        ))}
      {adminLocations &&
        adminLocations.map((newLocation, i) => (
          <div
            key={i}
            className='bg-white px-6 rounded-xl md:my-4 my-1 border border-[#C8C8C8] py-2 w-full'
          >
            <p className='text-[14px] md:text-black text-[#979797] md:font-normal font-bold'>{`Location ${
              locations.length + i + 1
            }`}</p>
            <textarea
              defaultValue={`${newLocation.line1}, ${newLocation.line2}, ${newLocation.area}, ${newLocation.city}, ${newLocation.state}, ${newLocation.pincode}`}
              readOnly
              rows='2'
              className='border-0 text-[#000000] text-[18px] focus:ring-0 p-0 w-full'
            />
          </div>
        ))}
      <div className=' md:hidden block mt-6 mb-4'>
        <div className='flex justify-center'>
          <button
            onClick={() => setAddLocation(true)}
            className='text-[14px] none px-5 py-2 rounded-full text-white bg-[#7D23E0]'
          >
            + Add Location
          </button>
        </div>
      </div>
      {addLocation && <AddLocationModal setAddLocation={setAddLocation} />}
    </div>
  )
}

export default ManageLocations
