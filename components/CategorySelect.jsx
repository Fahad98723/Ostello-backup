import React, { useState } from 'react'
import { GrFormClose } from 'react-icons/gr'

const CategorySelect = ({
  className = '',
  categories,
  placeholderText,
  selectedState,
  errorState,
  disabled,
}) => {
  const [selected, setSelected] = selectedState
  const [error, setError] = errorState
  const [optionSelected, setOptionSelected] = useState('')

  const handleSelect = (e) => {
    e.preventDefault()
    const currentValue = e.target.value
    if (!selected?.includes(currentValue)) {
      setError('')
      setSelected((prv) => prv.concat(currentValue))
    }
    setOptionSelected('')
  }

  const removeSelected = (name) => {
    if (selected.includes(name)) {
      setSelected(selected.filter((item) => item !== name))
    }
  }

  return (
    <div className={` my-4 flex-col ${className}`}>
      {error.length > 0 && (
        <p className=' text-xs w-full text-right text-[#FF0000]'>{error}</p>
      )}
      <select
        // disabled={disabled}
        value={optionSelected}
        onChange={(e) => handleSelect(e)}
        className={`my-2 form-select   marker:block w-full px-4 py-2 text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border border-solid border-[#D0D5DD] ${
          error.length === 0 ? 'border-[#D0D5DD]' : 'border-red'
        } rounded-xl shadow-md first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#D0D5DD] focus:outline-none`}
      >
        <option
          className='w-full text-xs sm:text-sm'
          selected
          value=''
          disabled
        >
          {placeholderText}
        </option>
        {categories.map((category, idx) => {
          return (
            <option
              key={idx}
              className='w-full text-[14px] font-normal text-black rounded-[10px] cursor-pointer'
            >
              {category}
            </option>
          )
        })}
      </select>
      <div className='flex flex-wrap'>
        {selected?.map((name, idx) => (
          <CategoryTag
            key={idx}
            disabled={disabled}
            categoryName={name}
            removeSelected={removeSelected}
          />
        ))}
      </div>
    </div>
  )
}

const CategoryTag = ({ categoryName, removeSelected, disabled }) => {
  return (
    <div className='mr-4 mb-2 w-fit px-4 py-2  font-dm-sans space-x-2 flex border border-light-gray rounded-xl shadow-md bg-primary/10'>
      <p className=''>{categoryName}</p>

      {disabled ? null : (
        <button
          className='text-lg text-primary'
          onClick={() => removeSelected(categoryName)}
        >
          <GrFormClose color='#7D23E0' className='text-primary' />
        </button>
      )}
    </div>
  )
}

export default CategorySelect
