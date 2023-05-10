import React from 'react'
import MetaHelmet from '../../../components/MetaHelmet'
import AddCourse from '../../../components/pages/Merchant/Dashboard/Courses/AddCourse'

export default function MerchantAddCourses({meta}) {
  return (
    <>
    <MetaHelmet
        title={meta.title}
        link={meta.link}
      />
    <AddCourse/>
    </>
  )
}
export const getStaticProps = async () => {
  const meta = {
    title: 'Add Courses- ostello.co.in',
    link: 'https://www.ostello.co.in/merchant/dashboard/addCourse',
  }
  return {
    props: {
      meta,
    },
  }
}
