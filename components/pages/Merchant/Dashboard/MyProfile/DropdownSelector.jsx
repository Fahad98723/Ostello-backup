import { useState } from 'react'
import { RiArrowDropDownFill, RiArrowDropUpFill } from 'react-icons/ri'

const DropdownSelector = ({ title, isDropDown1State, className = '' }) => {
  const [isDropDown, setIsDropDown] = useState(false)
  const [isDropDown1, setIsDropDown1] = isDropDown1State

  return (
    <div className={` ${className} flex items-center space-x-2  `}>
      <h1 className='font-bold text-xl md:text-xl '>{title}</h1>

      <RiArrowDropDownFill
        className={`bg-white rounded-full text-2xl cursor-pointer ${
          isDropDown ? 'flex' : 'hidden'
        } `}
        onClick={() => {
          setIsDropDown(!isDropDown)
          setIsDropDown1(!isDropDown1)
        }}
      />
      <RiArrowDropUpFill
        className={`bg-white rounded-full text-2xl cursor-pointer  ${
          isDropDown ? 'hidden' : 'flex'
        } `}
        onClick={() => {
          setIsDropDown(!isDropDown)
          setIsDropDown1(!isDropDown1)
        }}
      />
    </div>
  )
}

export default DropdownSelector
