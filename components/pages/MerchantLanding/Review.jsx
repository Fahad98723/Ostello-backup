import React from 'react'
import { testimonialData } from '../HomeLanding/OstelloReviews/Data'
import ReviewCard from '../HomeLanding/OstelloReviews/ReviewCard'


export default function Review() {
  return (
    <section className='px-5 lg:px-10 py-10 '>
      <ReviewCard data={testimonialData} type='merchant-landing'/>
    </section>
  )
}