import React from 'react'
// import './style.css'
const Referral = () => {
  return (
    <div className='flex md:w-[380px] w-[95%] mx-auto border-b border-[#D0D5DD]'>
      <input
        type='text'
        placeholder='Type referral code here'
        className='input-referral w-full px-3 '
      />
      <button className='py-1 px-3 rounded-xl ml-4 font-bold'>Submit</button>
    </div>
  )
}

export default Referral
