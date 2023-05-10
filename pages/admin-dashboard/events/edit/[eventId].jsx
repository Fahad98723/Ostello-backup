import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminDashboard from '../../../../components/pages/AdminDashboard/AdminDashboard'
import { AddImageIcon, CrossIcon } from '../../../../components/SVGIcons'
import {
  adminDeleteEvent,
  adminUpdateEvent, fetchAdminEvents
} from '../../../../redux/slices/adminEventSlice'

export default function EditEvent() {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const router = useRouter()
  const { eventId } = router.query
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const { adminEvents } = useSelector((state) => state.adminEvents)

  const [eventTitle, setEventTitle] = useState('')
  const [videoFile, setVideoFile] = useState('')
  const [link, setLink] = useState('')
  const [youtube, setYoutube] = useState()
  const [category, setCategory] = useState('programming')

  const onSelectFile = (e) => {
    const selectedFiles = e.target.files[0]
    setVideoFile(selectedFiles)
    setSelectedVideo(URL.createObjectURL(selectedFiles))
  }

  const handleDelete = () => {
    dispatch(adminDeleteEvent(id))
  }

  const updateEvent = () => {
    if (!eventTitle) {
      setError('Please Fill The All Required Field')
      return
    }
    setError('')
    const updates = JSON.stringify({
      title: eventTitle,
    })

    const myForm = new FormData()
    myForm.append('id', eventId)
    myForm.append('updates', updates)

    {
      !youtube ? myForm.append('video', videoFile) : myForm.append('url', link)
    }
    dispatch(adminUpdateEvent(myForm))
    navigate('/admin-dashboard/events/activeEvents')
  }

  useEffect(() => {
    // dispatch(fetchAdminEvent(eventId));
    dispatch(fetchAdminEvents())
    const event = adminEvents.find((a) => a.id === eventId)
    if (event) {
      setEventTitle(event?.title)
      setVideoFile(event?.video?.url)
      setCategory(event?.category)
      setLink(event?.url)
      setYoutube(event?.url)
    }
  }, [eventId, adminEvents])

  return (
    <AdminDashboard currentSection='Edit Event'>
      <Head>
        <title>Edit Event - Admin Dashboard - Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <>
        <div className='px-[30px] pt-4 pb-16 '>
          <div className='flex flex-col space-y-3'>
            {error && <div className='text-[#FF0000]-500'>{error}</div>}
            <input
              defaultValue={eventTitle}
              key={eventTitle}
              type='text'
              onChange={(e) => setEventTitle(e.target.value)}
              className='w-full px-6 bg-[#FAFAFA] border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg'
              placeholder='Enter blog title*'
            />

            <select
              onChange={(e) => setCategory(e.target.value)}
              className='w-full px-6 bg-[#FAFAFA] py-2 outline-none  border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg'
            >
              <option value='programming'>Programming </option>
              <option value='movie'>Movie </option>
              <option value='english'>English </option>
              <option value='world'>World </option>
            </select>

            <p>
              Upload With Youtube video link{' '}
              <input
                checked={link}
                type='checkbox'
                onChange={() => {
                  setYoutube(!youtube)
                }}
              ></input>
            </p>

            {!youtube ? (
              <div className='relative w-full md:w-[50%] lg:w-[35%] p-3 border-2 text-[#A8A8A8] h-[280px] overflow-hidden rounded-lg border-[#A4A4A4]'>
                <label>
                  {!videoFile && !selectedVideo ? (
                    <div className='h-full'>
                      <p className='h-[10%]'>Add Video*</p>
                      <div className='h-[90%] flex justify-center items-center flex-col'>
                        <AddImageIcon />
                        <p className='text-[20px]'>Add Video</p>
                      </div>
                      <input
                        onChange={onSelectFile}
                        accept='video/*'
                        type='file'
                        className='hidden'
                      />
                    </div>
                  ) : (
                    <div>
                      <video
                        controlsList='nodownload'
                        className='w-full h-[252px] shadow-sm rounded-3xl object-cover'
                        src={selectedVideo || videoFile}
                        alt=''
                        controls
                      />
                    </div>
                  )}
                </label>
                {selectedVideo ||
                  (videoFile && (
                    <button
                      className='absolute top-6 w-[30px] right-6 '
                      onClick={() => setSelectedVideo(null)}
                    >
                      <CrossIcon className='w-full' />
                    </button>
                  ))}
              </div>
            ) : (
              <input
                defaultValue={link}
                onChange={(e) => setLink(e.target.value)}
                onClick={() => setYoutube(true)}
                type='text'
                className='w-full px-6 py-2 outline-none bg-[#FAFAFA] border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg'
                placeholder='Enter Youtube video link **'
              />
            )}
            <div className='flex md:flex-row flex-col justify-center mt-5 gap-y-5 md:gap-x-5'>
              <button
                onClick={updateEvent}
                className='px-12 font-bold rounded-lg py-2 text-white bg-[#7D23E0]'
              >
                Confirm
              </button>
              <Link legacyBehavior prefetch={false} href='/admin-dashboard/events/'>
                <a
                  href=''
                  className='px-12 font-bold rounded-lg py-2 text-white bg-[#E46060]'
                >
                  Cancel
                </a>
              </Link>
              <button
                onClick={handleDelete}
                className='px-12 font-bold rounded-lg py-2 text-[#414141] bg-[#F0F0F0]'
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      </>
    </AdminDashboard>
  )
}
