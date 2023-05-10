import { Radio } from 'antd'
import React, { useRef, useState } from 'react'

export default function GroupRadio({
  className,
  style,
  options = [],
  onChange = () => {},
  onClose = () => {},
  onClear = () => {},
}) {
  const [value, setValue] = useState('')

  return (
    <div
      // style={{ boxShadow: '0px 2px 40px rgba(125, 35, 224, 0.15)' }}
      className=' sm:w-fit sm:p-3 rounded-xl mx-1  py-2 '
    >
      <Radio.Group
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        className='flex flex-col select-none space-y-2 divide-y-[.5px] divide-gray/10 sm:divide-y-0'
      >
        {options.map((option, i) => (
          <Radio className=' pt-2 sm:pt-0 px-2' key={option} value={option}>
            {option}
          </Radio>
        ))}
      </Radio.Group>
      <div className='flex px-2  rounded-lg justify-between border  border-b-0 border-l-0  border-r-0 border-gray/10   pt-2 mt-2 '>
        <button
          onClick={() => {
            setValue(null)
            onChange(null)
          }}
          className='text-primary text-sm px-8 py-1 font-medium'
        >
          Clear All
        </button>

        <button
          onClick={() => {
            onClose()
            onChange(value)
          }}
          className='bg-primary text-white px-8 py-1 rounded-md '
        >
          Apply
        </button>
      </div>
    </div>
  )
}
