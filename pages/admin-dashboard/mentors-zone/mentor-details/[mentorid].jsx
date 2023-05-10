import Head from 'next/head'
import { useState } from 'react'
import AdminDashboard from '../../../../components/pages/AdminDashboard/AdminDashboard'
import MentorDetailsOverview from '../../../../components/pages/AdminDashboard/Mentors/MentorDetails/MentorDetails';
import MentorSidebar from '../../../../components/pages/AdminDashboard/Mentors/MentorSidebar/MentorSidebar';

const MentorCheck = () => {
  const [active, setActive] = useState('Overview')
  const RenderComponent = () => {
    switch (active) {
      case 'Overview':
        return <MentorDetailsOverview />
      default:
        return <MentorDetailsOverview />
    }
  }
  return (
    <AdminDashboard hideSidebar={true}>
      <Head>
        <title>Mentor Details - Admin Dashboard - Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='flex md:flex-row flex-col'>
        <MentorSidebar active={active} setActive={setActive} />
        <div className='w-full'>
          <RenderComponent />
        </div>
      </div>
    </AdminDashboard>
  );
};

export default MentorCheck;