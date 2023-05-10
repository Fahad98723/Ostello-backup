import axios from 'axios'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import MetaHelmet from '../../../components/MetaHelmet'
import AdminDashboard from '../../../components/pages/AdminDashboard/AdminDashboard'
import PageHeader from '../../../components/pages/AdminDashboard/Header/Header'
import {
  adminCareerSliceSelector
} from '../../../redux/slices/adminCareerSlice'
import { ACCESS_TOKEN, host } from '../../../utils/constant'

export default function AddCareer({meta}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()
  const { error, loading } = useSelector(adminCareerSliceSelector)

  const onSubmit = async (data) => {
    
    try {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${ACCESS_TOKEN}}`,
        },
      }
      const { data } = await axios.post(`${host}/career`, data, config)
      dispatch(adminAddNewCareerSuccess(data.message))
    } catch (err) {
      
    }
    // dispatch(adminAddCareer(data))
  }

  useEffect(() => {
    if (!loading && error?.length) {
      toast.error(error)
    }
  }, [error, loading])
  return (
    <AdminDashboard>
      <MetaHelmet title={meta.title} />
      <div>
        <PageHeader pageTitle={'Add new job posting'} />
        <div className='px-[30px] pt-4 pb-16 '>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col space-y-3'
          >
            <input
              type='text'
              className='w-full px-6 bg-[#FAFAFA] border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg'
              placeholder='Job title*'
              {...register('title', { required: true })}
            />
            {errors.title && (
              <span className='!mt-0 text-[#FF0000]-500'>This field is required</span>
            )}
            <textarea
              {...register('desc', { required: true })}
              rows='4'
              placeholder='Job description (2-3 lines)*'
              className='w-full px-6 bg-[#FAFAFA] border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg'
            />
            {errors.desc && (
              <span className='!mt-0 text-[#FF0000]-500'>This field is required</span>
            )}
            <input
              type='text'
              {...register('link', { required: true })}
              className='w-full px-6 bg-[#FAFAFA] border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg'
              placeholder='Provide Google forms link*'
            />
            {errors.link && (
              <span className='!mt-0 text-[#FF0000]-500'>This field is required</span>
            )}
            <div className='flex md:flex-row flex-col justify-center md:space-y-0 space-x-0 space-y-5 md:space-x-5'>
              <button
                type='submit'
                className='px-12 font-bold rounded-lg py-2 text-white bg-[#7D23E0]'
              >
                Confirm
              </button>
              <Link legacyBehavior prefetch={false} href='/admin-dashboard/careers'>
                <a
                  href=''
                  className='px-12 text-center font-bold rounded-lg py-2 text-white bg-[#E46060]'
                >
                  {' '}
                  Cancel
                </a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AdminDashboard>
  )
}

export const getStaticProps = async () => {
  const meta = {
    title: "Add Career - Admin Dashboard - Ostello", 
  }
  // 
  return {
    props: {
      meta,
    },
  };
};