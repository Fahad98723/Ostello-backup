import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import AdminDashboard from '../../../components/pages/AdminDashboard/AdminDashboard'
import ChangesRequest from '../../../components/pages/AdminDashboard/Request/ChangeRequrest/ChangesRequest'
import CourseRequests from '../../../components/pages/AdminDashboard/Request/CourseRequests'
import InstituteRequests from '../../../components/pages/AdminDashboard/Request/InstituteRequests'
import MentorRequests from '../../../components/pages/AdminDashboard/Request/MentorRequests'
import RejectedList from '../../../components/pages/AdminDashboard/Request/RejectedList/RejectedList'
const menuItems = [
  {
    name: 'Institute Requests',
    route: 'institute-requests',
  },
  {
    name: 'Course Requests',
    route: 'course-requests',
  },
  {
    name: 'Changes Request',
    route: 'changes-request',
  },
  {
    name: "Mentor Request",
    route: "mentor-request",
  },
  {
    name: 'Rejected List',
    route: 'rejected-list',
  },
]
const RequestContainer = ({ name }) => {
  switch (name) {
    case "Institute Requests":
      return <InstituteRequests />;
    case "Course Requests":
      return <CourseRequests />;
    case "Changes Request":
      return <ChangesRequest />;
    case "Mentor Request":
      return <MentorRequests />;
    case "Rejected List":
      return <RejectedList />;
    default:
      return <InstituteRequests />;
  }
};

const Requests = () => {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const router = useRouter()
  const section = router.query?.section?.[0]

  useEffect(() => {
    if (section?.length) {
      menuItems.forEach((item) => {
        if (item.route === section) {
          setActiveSection(item.name)
        }
      })
    } else {
      setActiveSection(menuItems[0].name)
    }
  }, [section])

  
  return (
    <AdminDashboard currentSection='Pending Requests'>
      <Head>
        <title>Section - Admin Dashboard - Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='bg-[#fafafa]'>
        <div className='md:px-[30px] px-[5px] !mt-[0px]'>
          {/* for desktop view */}
          <div className='md:block hidden'>
            <div className='flex mb-8 space-x-5'>
              {menuItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSection(item.name)}
                  className={
                    activeSection === item.name
                      ? 'font-medium text-[#ffffff] px-4 rounded-md py-1 bg-[#7D23E0]'
                      : 'font-medium text-[#868686] px-4 rounded-md py-1 bg-[#F0F0F0]'
                  }
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          {/* for mobile view */}
          <div className=' md:hidden block pt-5 pb-8 px-3'>
            <div className=' flex justify-between items-center'>
              <div className='font-bold font-[18px]'>Pending Requests</div>
              <div className='relative w-[170px]'>
                <div
                  onClick={() => setOpen(!open)}
                  className='flex items-center justify-end cursor-pointer font-medium text-[#7D23E0]'
                >
                  {activeSection}
                  <MdKeyboardArrowDown className='ml-1 text-2xl' />
                </div>
                {open && (
                  <div className='w-[100%] text-[#747474] shadow-xl absolute top-[30px] rounded-lg left-0 bg-white'>
                    <div className='grid grid-cols-1 divide-y-[1px]'>
                      {menuItems
                        .filter((menu) => menu.name !== activeSection)
                        .map((menu, key) => (
                          <button
                            key={key}
                            onClick={() => {
                              setActiveSection(menu.name)
                              setOpen(false)
                            }}
                            className='px-3 py-3'
                          >
                            {menu.name}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <RequestContainer name={activeSection} />
        </div>
      </div>
    </AdminDashboard>
  )
}

export default Requests
