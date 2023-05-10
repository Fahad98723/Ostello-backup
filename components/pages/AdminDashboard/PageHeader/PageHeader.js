import React, { useState } from 'react'
import BlogPreviewModal from '../AdminModal/BlogPreviewModal/BlogPreviewModal'
import AddCouponModal from '../AdminModal/AddCouponModal/AddCouponModal'
import Link from 'next/link'

const PageHeader = ({ title, actionName, route, onAction = () => {} }) => {
  const [showModal, setShowModal] = useState(false)
  const [couponModal, setCouponModal] = useState(false)
 
  return (
    <div className='flex justify-between px-8 py-6 items-center'>
      <div className='text-2xl font-bold text-[#010025]'>{title}</div>
      {route && (
        <Link legacyBehavior prefetch={false} href={route}>
          <a
            href=''
            className='px-8 rounded-lg text-white bg-[#7D23E0] font-medium py-2'
          >
            {actionName}
          </a>
        </Link>
      )}
      {actionName && !route && (
        <button
          onClick={() => {
            onAction()
         
            if (actionName === 'Add Coupon') {
              setCouponModal(true)
            } else {
              setShowModal(true)
            }
          }}
          className='px-8 rounded-lg text-white bg-[#7D23E0] font-medium py-2'
        >
          {actionName}
        </button>
      )}
      {/* <AddCouponModal setCouponModal={setCouponModal} /> */}
      {/* {showModal && <BlogPreviewModal setShowModal={setShowModal} />} */}
      {couponModal && <AddCouponModal setCouponModal={setCouponModal} />}
    </div>
  )
}

export default PageHeader
