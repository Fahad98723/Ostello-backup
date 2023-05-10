import Head from 'next/head'
import React from 'react'
import AdminInstituteDetails from '../../../../components/pages/AdminDashboard/Institutes/AdminInstituteDetails/AdminInstituteDetails'

export default function InstituteDetailsAdmin() {
  return (
    <>
    <Head>
        <title>Institute Overview - Admin Dashboard - Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AdminInstituteDetails />
    </>
  )
}
