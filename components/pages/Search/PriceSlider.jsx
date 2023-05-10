import { Slider } from 'antd'
import React, { useState } from 'react'

export default function PriceSlider({ onChange }) {
  const marks = {
    0: '₹0',
    50000: '₹50,000+',
  }
  const [price, setPrice] = useState([50, 50000])

  return (
    <div className=' w-full rounded-lg '>
      <div className=' md:px-10 px-2 md:py-5 rounded-lg bg-white '>
        <Slider
          onAfterChange={() => onChange(price)}
          min={0}
          max={50000}
          onChange={(e) => {
            setPrice(e)
          }}
          value={price}
          range={{ draggableTrack: true }}
          tipFormatter={(value) => {
            return `₹ ${value}`
          }}
          className='flex flex-col z-[100]'
          trackStyle={{ background: '#7d23e0' }}
          marks={marks}
        />
      </div>
      
      <div className='w-2/4 ml-auto hidden md:block'>
      <div className='flex p-2 rounded-lg  border  border-b-0 border-l-0  border-r-0 border-gray/10  bg-white '>
        <button
          onClick={() => {
            setPrice(null)
            onChange(null)
          }}
          className='text-primary rounded-md text-sm px-8 py-1 border border-primary mr-2 font-medium'
        >
          Rest
        </button>

        <button
          onClick={() => {
            setPrice(price)
            onChange(price)
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
