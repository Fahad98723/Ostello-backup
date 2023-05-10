import React, { useState } from 'react'
import EditCouponModal from '../AdminModal/EditCouponModal/EditCouponModal'

const CouponCard = ({ data }) => {
  const [couponModal, setCouponModal] = useState(false)

  const {
    couponcode,
    discountrate,
    maxdiscountprice,
    maximumprice,
    minimumprice,
  } = data

  return (
    <>
      <div
        onClick={() => setCouponModal(true)}
        className='px-6 rounded-xl border border-[#A4A4A4] py-6'
      >
        <div className='flex flex-col'>
          <div className='text-2xl font-medium'>{couponcode}</div>
          <p className='text-[#7D23E0] font-medium text-xl'>
            Get {discountrate}% Off Upto Rs. {maxdiscountprice}
          </p>
          <div className='text-[#B3B3B3] border-dashed border-t mt-4 pt-2'>
            Valid on total value of items worth Rs. {maximumprice}
          </div>
        </div>
      </div>
      {couponModal && (
        <EditCouponModal
          couponData={data}
          title='Edit Coupon'
          setCouponModal={setCouponModal}
        />
      )}
    </>
  )
}

export default CouponCard
