import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'

import BasicDetails from './BasicDetails'
import ManageLocations from './ManageLocations'
import YourServices from './YourServices'
import OwnerDetails from './OwnerDetails.js'

import { useDispatch } from 'react-redux'
import ManageMedia from './ManageMedia'
import Faculty from './Faculty'
import Achievements from './Achievements'
import BankingDetails from './BankingDetails'
import Header from '../../../Header/Header'
import { fetchAdminSingleInstitute } from '../../../../../../redux/slices/adminInstitutesSlice'
import { useRouter } from 'next/router'
import DropDown from './DropDown'

const OldAdminInstitute = () => {
  const router = useRouter()

  const { instituteId } = router.query

  const [formData, setFormData] = useState({})

  const dispatch = useDispatch()

  const handleChange = (e) => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    setFormData((prev) => ({ ...prev, [name]: value }))

 
  }

 

  const goBack = () => {
    navigate('/admin-dashboard/requests/institute-requests', {
      replace: true,
    })
  }

  //add again

  const allData = [
    {
      title: 'Basic Details',
      component: <BasicDetails handleChange={handleChange} />,
    },
    {
      title: 'Manage locations',
      component: <ManageLocations handleChange={handleChange} />,
    },
    {
      title: 'Owner Details',
      component: <OwnerDetails handleChange={handleChange} />,
    },
    // {
    //   title: 'Your Services',
    //   component: <YourServices handleChange={handleChange} />,
    // },
    // {
    //   title: 'Manage Media',
    //   component: <ManageMedia handleChange={handleChange} />,
    // },
    // {
    //   title: 'Faculty',
    //   component: <Faculty handleChange={handleChange} />,
    // },
    // {
    //   title: 'Achievements',
    //   component: <Achievements handleChange={handleChange} />,
    // },
    // {
    //   title: 'Banking details',
    //   component: <BankingDetails handleChange={handleChange} />,
    // },
  ]

  useEffect(() => {
    dispatch(fetchAdminSingleInstitute(instituteId))
  }, [dispatch, instituteId])

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className='w-full'>
      <div className='w-[93%] pl-8 pr-4'>
        <Header pageTitle={'Institutes'} />
      </div>
      <form
        onSubmit={handleSubmit}
        className='md:ml-[30px] ml-0 mr-0 md:mr-[7rem]'
      >
        {allData.map((data, index) => (
          <DropDown key={index} title={data?.title}>
            {data?.component}
          </DropDown>
        ))}
        <div className='mb-12 border mx-5 border-[#000] bg-white border-dashed mt-6'>
          <div className='flex py-5 flex-col space-y-3 items-center justify-center'>
            <p className='text-2xl font-bold text-[#E46060]'>Danger Section</p>
            <p className='font-medium text-lg'>This action cannot be undone</p>
            <button className='px-8 py-3 text-[#525252] text-lg font-medium rounded-lg bg-[#F0F0F0] border-0'>
              Delete Institute
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default OldAdminInstitute
