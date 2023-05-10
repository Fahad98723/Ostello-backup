import React from 'react'

const Dropdown = ({
  selectValueState,
  options,
  placeholderText,
  className = '',
  errorState,
}) => {
  const [selected, setSelected] = selectValueState
  const [error, setError] = errorState
  const handleSelect = (e) => {
    e.preventDefault()
    setSelected(e.target.value)
    setError('')
  }

  return (
    <div className={`w-full my-2 flex-col space-y-0 ${className}`}>
      {error.length > 0 && (
        <p className='w-full text-right text-xs text-[#FF0000]'>{error}</p>
      )}
      <select
        onChange={(e) => handleSelect(e)}
        value={selected}
        className={`my-2 form-select   marker:block w-full px-4 py-2 text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border border-solid border-[#D0D5DD] ${
          error.length === 0 ? 'border-[#D0D5DD]' : 'border-red'
        } rounded-xl shadow-md first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#D0D5DD] focus:outline-none`}
      >
        <option className='w-full' selected value='' disabled>
          {placeholderText}
        </option>
        {options.map((category, idx) => {
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
    </div>
  )
}

export default Dropdown
