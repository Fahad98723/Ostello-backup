import dynamic from 'next/dynamic'
import Head from 'next/head'
import React from 'react'
const EditCourse = dynamic(
  () => {
    return import('../../../../../components/pages/Merchant/Dashboard/Courses/EditCourse/EditCourse')
  },
  { ssr: false }
)

export default function MerchantEditCourses() {
  return (
    <>
    <Head>
        <title>Edit Course - Merchant Dashboard - Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
     <EditCourse/>
     </>
  )
}