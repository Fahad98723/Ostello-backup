import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { BsCheckLg } from 'react-icons/bs'
import { useRouter } from 'next/router'

export const CLoseBtn = ({ className }) => {
  const router = useRouter()

  return (
    <div
      className={`${className} text-primary text-xl float-right hidden md:block cursor-pointer`}
    >
      <div onClick={() => router.back()}>
        <FaTimes />
      </div>
    </div>
  )
}

export const Check = ({ className }) => {
  return (
    <div
      className={`${className} rounded-full p-1 text-sm`}
      style={{ backgroundColor: '#0D9F1C40', color: '#0D9F1C' }}
    >
      <BsCheckLg />
    </div>
  )
}

export const Times = ({ className }) => {
  return (
    <div
      className={`${className} rounded-full p-1 text-sm`}
      style={{ backgroundColor: '#E46060', color: '#fff' }}
    >
      <FaTimes />
    </div>
  )
}
