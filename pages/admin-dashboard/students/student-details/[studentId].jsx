import Head from 'next/head'
import { useState } from 'react'
import AdminDashboard from '../../../../components/pages/AdminDashboard/AdminDashboard'
import StudentOngoing from '../../../../components/pages/AdminDashboard/students/StudentOngoing'
import StudentOverview from '../../../../components/pages/AdminDashboard/students/StudentOverview'
import StudentPurchased from '../../../../components/pages/AdminDashboard/students/StudentPurchased'
import StudentRecentlyViewed from '../../../../components/pages/AdminDashboard/students/StudentRecentlyViewed'
import StudentSidebar from '../../../../components/pages/AdminDashboard/students/StudentSidebar/StudentSidebar'
import StudentSubscribed from '../../../../components/pages/AdminDashboard/students/StudentSubscribed'
import StudentWishlist from '../../../../components/pages/AdminDashboard/students/StudentWishList'

const StudentDetails = () => {
  const [active, setActive] = useState('Overview')
  const RenderComponent = () => {
    switch (active) {
      case 'Overview':
        return <StudentOverview />
      case 'Wishlist':
        return <StudentWishlist />
      case 'Recently Viewed':
        return <StudentRecentlyViewed />
      case 'Purchased':
        return <StudentPurchased />
      case 'Ongoing':
        return <StudentOngoing />
      case 'Subscribed':
        return <StudentSubscribed />
      default:
        return <StudentOverview />
    }
  }
  return (
    <AdminDashboard hideSidebar={true}>
      <Head>
        <title>Student Details - Admin Dashboard - Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='flex md:flex-row flex-col'>
        <StudentSidebar active={active} setActive={setActive} />
        <div className='w-full'>
          <RenderComponent />
        </div>
      </div>
    </AdminDashboard>
  )
}

export default StudentDetails
