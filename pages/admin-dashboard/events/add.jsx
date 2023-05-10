import React, { useState } from 'react'
import AdminDashboard from '../../../components/pages/AdminDashboard/AdminDashboard'
import { AddImageIcon, CrossIcon } from '../../../components/SVGIcons'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import MetaHelmet from '../../../components/MetaHelmet'
import PageHeader from '../../../components/pages/AdminDashboard/PageHeader/PageHeader'
import { adminAddEvent } from '../../../redux/slices/adminEventSlice'

export default function AddEvent({meta}) {
  const [selectedVideo, setSelectedVideo] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [link, setLink] = useState('')
  const [youtube, setYoutube] = useState()
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()
  const [category, setCategory] = useState('programming')
  const [thumbnailFiles, setThumbnailFiles] = useState([])
  const [selectedThumbnail, setSelectedThumbnail] = useState([])

  const onSelectFile = (e) => {
    const selectedFiles = e.target.files[0]
    setVideoFile(selectedFiles)
    setSelectedVideo(URL.createObjectURL(selectedFiles))
    setYoutube(false)
  }
  const onSelectThumbnailFile = (e) => {
    const selectedFiles = e.target.files[0]
    setThumbnailFiles(selectedFiles)
    setSelectedThumbnail(URL.createObjectURL(selectedFiles))
  }
  const [isAdded, setIsAdded] = useState(false)

  const handleAddEvent = () => {
    if (!title) {
      setError('Please Fill The All Required Field')
      return
    }

    // if(!selectedVideo || !link){
    //   setError("Please Upload Video Or Link");
    //   return;
    // }
    setError('')
    const myForm = new FormData()
    myForm.append('category', category)
    myForm.append('title', title)
    {
      !youtube ? myForm.append('video', videoFile) : myForm.append('url', link)
    }
    dispatch(adminAddEvent(myForm), setIsAdded(true))
  }

  useEffect(() => {
    if (isAdded) {
      router.push('/admin-dashboard/events')
    }
  }, [isAdded])
  return (
    <AdminDashboard>
      <MetaHelmet title={meta.title} />
      <PageHeader title={'Create Event'} />
      <>
        <div className='px-[30px] pt-4 pb-16 '>
          <div className='flex flex-col space-y-3'>
            {error && <div className='text-[#FF0000]-500'>{error}</div>}
            <input
              onChange={(e) => setTitle(e.target.value)}
              type='text'
              className='w-full px-6 py-2 outline-none bg-[#FAFAFA] border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg'
              placeholder='Enter event title**'
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
                checked={youtube}
                type='checkbox'
                onChange={() => {
                  setYoutube(!youtube)
                }}
              ></input>
            </p>

            {!youtube ? (
              <div className='relative w-full md:w-[50%] lg:w-[35%] p-3 border-2 text-[#A8A8A8] h-[280px] overflow-hidden rounded-lg border-[#A4A4A4]'>
                <label>
                  {!selectedVideo ? (
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
                        controls
                        className='w-full h-[252px] shadow-sm rounded-3xl object-cover'
                        src={selectedVideo}
                        alt=''
                      ></video>
                    </div>
                  )}
                </label>
                {selectedVideo && (
                  <button
                    className='absolute top-6 w-[30px] right-6 '
                    onClick={() => setSelectedVideo('')}
                  >
                    <CrossIcon className='w-full' />
                  </button>
                )}
              </div>
            ) : (
              <input
                onChange={(e) => setLink(e.target.value)}
                onClick={() => setYoutube(true)}
                type='text'
                className='w-full px-6 py-2 outline-none bg-[#FAFAFA] border-2 border-[#A4A4A4] placeholder:text-[#A8A8A8]  text-[#414141] rounded-lg'
                placeholder='Enter Youtube video link **'
              />
            )}

            <div className='flex justify-center mt-5 gap-x-5'>
              <button
                onClick={handleAddEvent}
                className='px-12 font-bold rounded-lg py-2 text-white bg-[#7D23E0]'
              >
                Confirm
              </button>
              <Link legacyBehavior prefetch={false} href='/admin-dashboard/events'>
                <a
                  href=''
                  className='px-12 font-bold rounded-lg py-2 text-white bg-[#E46060]'
                >
                  Cancel
                </a>
              </Link>
            </div>
          </div>
        </div>
      </>
    </AdminDashboard>
  )
}

export const getStaticProps = async () => {
  const meta = {
    title: "Add Event - Admin Dashboard - Ostello", 
  }
  // 
  return {
    props: {
      meta,
    },
  };
};