import React, { useState } from 'react'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import AddFacultyModal from '../../../AdminModal/AddFacultyModal/AddFacultyModal'
import AddLocationModal from '../../../AdminModal/AddLocationModal/AddLocationModal'
import { BiEditAlt } from 'react-icons/bi'
import AddAchievementModal from '../../../AdminModal/AddAchievementModal/AddAchievementModal'

const DropDown = ({ children, title, setEdit, edit }) => {
  const [show, setShow] = useState(true)
  const [addLocation, setAddLocation] = useState(false)
  const [addFaculty, setAddFaculty] = useState(false)
  const [addAchievement, setAddAchievement] = useState(false)

  return (
    <div
      className={`flex ${
        show && 'bg-[#f4f4f4]'
      } md:border-none border-2 md:bg-transparent border-[#7D23E0] my-3 mx-3 px-3 py-2 rounded-lg flex-col`}
    >
      <div className='flex justify-between'>
        <div className='flex items-center md:justify-start justify-between md:w-fit w-full gap-x-3'>
          <h5 className='text-[24px] capitalize ml-3 md:ml-0 font-medium text-[#414141]'>
            {title}
          </h5>{' '}
          {show ? (
            <TiArrowSortedUp
              onClick={() => setShow(false)}
              className='rounded-full bg-white p-1 cursor-pointer text-2xl drop-shadow-lg text-[#323232]'
            />
          ) : (
            <TiArrowSortedDown
              onClick={() => setShow(true)}
              className='rounded-full bg-white p-1 cursor-pointer text-2xl drop-shadow-lg text-[#323232]'
            />
          )}
        </div>
        {title === 'Manage locations' && (
          <button
            onClick={() => setAddLocation(true)}
            className='text-[14px] md:block hidden none px-5 py-1 rounded-full text-white bg-[#7D23E0]'
          >
            + Add Location
          </button>
        )}
        {title === 'Faculty' && (
          <button
            onClick={() => setAddFaculty(true)}
            className='text-[14px] md:block hidden px-5 py-1 rounded-full text-white bg-[#7D23E0]'
          >
            + Add Faculty
          </button>
        )}
        {title === 'Achievements' && (
          <button
            onClick={() => setAddAchievement(true)}
            className='text-[14px] md:block hidden px-5 py-1 rounded-full text-white bg-[#7D23E0]'
          >
            + Add Achievements
          </button>
        )}
        {title === 'Student Basic Details' && (
          <div className='md:block hidden'>
            {!edit && (
              <button
                onClick={() => setEdit(true)}
                className='text-[14px] flex items-center px-5 py-1 rounded-full text-white bg-[#4C4C4C]'
              >
                <BiEditAlt className='scale-125 mr-2' /> Edit
              </button>
            )}
          </div>
        )}
        {title === 'Mentor Basic Details' && (
          <div className='md:block hidden'>
            {!edit && (
              <button
                onClick={() => setEdit(true)}
                className='text-[14px] flex items-center px-5 py-1 rounded-full text-white bg-[#4C4C4C]'
              >
                <BiEditAlt className='scale-125 mr-2' /> Edit
              </button>
            )}
          </div>
        )}
      </div>
      {show && <div>{children}</div>}
      {addLocation && <AddLocationModal setAddLocation={setAddLocation} />}
      {addFaculty && <AddFacultyModal setAddFaculty={setAddFaculty} />}
      {addAchievement && (
        <AddAchievementModal setAddAchievement={setAddAchievement} />
      )}
    </div>
  )
}

export default DropDown
