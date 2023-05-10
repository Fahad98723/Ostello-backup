import { Slider } from 'antd'
import React, { useState } from 'react'

export default function DistanceSlider({ onChange }) {
  const [value, setValue] = useState(null)
  const marks = {
    0: '0km',
    1: '1km',
    2: '2km',
    3: '3km',
    4: '4km',
    5: '5km',
    6: '6km',
  }
  const [distance, setDistance] = useState(null)
  return (
    <div className=' w-full rounded-lg '>
      <div className='  px-2 md:py-5 rounded-lg bg-white '>
        <Slider
          onChange={(v) => {
            setValue(v)
            onChange(v)
          }}
          // onAfterChange={() => {
          //   onChange(value)
          // }}
          min={0}
          max={6}
          className='flex flex-col'
          // tooltipVisible={false}
          trackStyle={{ background: '#7d23e0' }}
          handleStyle={{ background: '#7d23e0' }}
          marks={marks}
          defaultValue={value}
        />
      </div>
      <div className='w-2/4 ml-auto hidden md:block'>
      <div className='flex p-2 rounded-lg  border  border-b-0 border-l-0  border-r-0 border-gray/10  bg-white '>
        <button
          onClick={() => {
            setDistance(null)
            onChange(distance)
          }}
          className='text-primary rounded-md text-sm px-8 py-1 border border-primary mr-2 font-medium'
        >
          Rest
        </button>

        <button
          onClick={() => {
            onChange(distance)
          }}
          className='bg-primary text-white px-8 py-1 rounded-md '
        >
          Apply
        </button>
      </div>
      </div>
      
    </div>
  )
}
