import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../components/Loader'
import MetaHelmet from '../../../components/MetaHelmet'
import EventCard from '../../../components/pages/AdminDashboard/AdminCard/EventCard'
import AdminDashboard from '../../../components/pages/AdminDashboard/AdminDashboard'
import DeleteConfirmationModal from '../../../components/pages/AdminDashboard/AdminModal/DeleteConfirmationModal/DeleteConfirmationModal'
import PageHeader from '../../../components/pages/AdminDashboard/PageHeader/PageHeader'
import { DeleteIcon } from '../../../components/SVGIcons'
import {
  adminDeleteEvent,
  fetchAdminEvents
} from '../../../redux/slices/adminEventSlice'

export default function AdminEventIndex({meta}) {
  const [deleteCoupon, setDeleteCoupon] = useState(false)
  const dispatch = useDispatch()

  const [id, setId] = useState('')

  const { adminEvents, loading, isDeleted, isAddedNewEvent } = useSelector(
    (state) => state.adminEvents
  )


  useEffect(() => {
    if (deleteCoupon) {
      dispatch(adminDeleteEvent(id))
    }
  }, [id, deleteCoupon, dispatch])

  useEffect(() => {
    dispatch(fetchAdminEvents())
  }, [isAddedNewEvent, isDeleted])

  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  if (loading) return <Loader />
  return (
    <AdminDashboard currentSection={'Active Events'}>
      <MetaHelmet title={meta.title} link={meta.link} />
      <PageHeader
        title={'Active Events'}
        actionName={'Add Event'}
        route={'/admin-dashboard/events/add'}
      />

      {openDeleteModal && (
        <DeleteConfirmationModal
          setDeleteCoupon={setDeleteCoupon}
          setDeleteConfirmationModal={setOpenDeleteModal}
        />
      )}
      <>
        {!adminEvents?.length > 0 ? (
          <div className='py-8 mx-10 w-4/6 font-medium bg-white flex justify-center'>
            No active events are available now
          </div>
        ) : (
          <>
            <div className='px-[30px] pt-4 pb-16'>
              <div className='grid gap-10 md:grid-cols-2 grid-cols-1 lg:grid-cols-3'>
                {adminEvents?.map((data, index) => (
                  <div key={index} className='relative'>
                    <Link legacyBehavior prefetch={false} href={`/admin-dashboard/events/edit/${data?.id}`}>
                      <EventCard data={data} />
                    </Link>
                    <div
                      onClick={() => {
                        setOpenDeleteModal(true)
                        setId(data?.id)
                      }}
                      className='absolute top-8 right-8 bg-white p-2.5 shadow-lg cursor-pointer rounded-full'
                    >
                      <DeleteIcon />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </>
    </AdminDashboard>
  )
}

export const getStaticProps = async () => {
  const meta = {
    title: "Events - Admin Dashboard - Ostello", 
  }
  // 
  return {
    props: {
      meta,
    },
  };
};