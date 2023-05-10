import React from 'react'

const InputField = ({
  label,
  type = 'text',
  setOnchange,
  title,
  defaultValue,
  isReadOnly,
}) => {
  return (
    <div className='bg-white px-6 rounded-xl md:my-4 my-1 border border-[#C8C8C8] py-2 w-full'>
      <p className='text-[14px] md:text-black text-[#979797] md:font-normal font-bold'>
        {label}
      </p>
      <input
        name={title}
        onChange={setOnchange}
        defaultValue={defaultValue}
        className='border-0 outline-0 text-[#000000] text-[18px] focus:ring-0 p-0 w-full'
        type={type}
        readOnly={isReadOnly ? true : false}
      />
    </div>
  )
}

export default InputField
