import React from 'react'
import { reviewsData } from './Data'
import ReviewCard from './ReviewCard'

export default function OstelloReviews() {
  return (
    <section className='px-5 lg:px-20 py-10 '>
      <ReviewCard data={reviewsData} />
    </section>
  )
}
