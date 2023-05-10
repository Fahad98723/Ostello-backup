import React, { useRef, useState } from 'react'
import { getVideoDuration, makeDateFormat } from '../../../../utils/utils'
import VideoPlayer from '../../../VideoPlayer'

const EventCard = ({ data }) => {
  const { title, timestamp, video } = data
  const videoEl = useRef(null)
  const [videoDuration, setVideoDuration] = useState('')

  const eventDate = makeDateFormat(timestamp)

  const handleLoadedMetadata = () => {
    setVideoDuration(getVideoDuration(videoEl))
  }

  return (
    <div className='p-4 bg-white rounded-[2.5rem] shadow-md'>
      <div className='flex flex-col'>
        {data.video ? (
          <video
            controlsList='nodownload'
            ref={videoEl}
            onLoadedMetadata={handleLoadedMetadata}
            src={video?.url}
            alt=''
            controls
          />
        ) : (
          <div>
            {' '}
            <VideoPlayer
              playing={false}
              loop={false}
              videoURL={data?.url}
            ></VideoPlayer>{' '}
          </div>
        )}
        <p className='text-[14px] pt-3 text-[#A0A0A0]'>
          {eventDate} <span className='mx-1'>|</span> {videoDuration || '1'} min
        </p>
        <h3 className=' text-[22px] py-2 font-semibold leading-[30px] '>
          {title}
        </h3>
      </div>
    </div>
  )
}

export default EventCard
