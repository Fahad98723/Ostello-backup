import { CloseCircleOutlined } from '@ant-design/icons'
import { Progress } from 'antd'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { AiOutlineVideoCameraAdd } from 'react-icons/ai'
import { BiImageAdd } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { authSelector } from '../../../../../redux/slices/authSlice'
import VideoPlayer from '../../../../VideoPlayer'

export default function VideoManager({
  onChange = () => {},
  d_video,
  d_thumbnail,
  isEditing,
  setNoVideo = () => {},
}) {
  const [isChanged, setIsChanged] = useState(false)
  const [video, setVideo] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const videoRef = useRef(null)
  const thumbnailRef = useRef(null)

  const { percentage, isUploading } = useSelector(authSelector)

  useEffect(() => {
    if (video?.name?.length > 0 && thumbnail?.name?.length > 0) {
      onChange({
        video,
        thumbnail,
      })
      setNoVideo(false)
    }
  }, [video, thumbnail])

  useEffect(() => {
    if (isEditing && isChanged && video === null) {
      setNoVideo(true)
    }
  }, [isEditing, isChanged, video])

  if (isEditing && !isChanged && d_video?.length > 0)
    return (
      <section className='video_thumbnail flex justify-between  items-center'>
        <div className='relative'>
          <p>Video:</p>
          <VideoPlayer className={'max-h-[100px]'} videoURL={d_video} />
          <CloseCircleOutlined
            onClick={() => {
              setIsChanged(true)
            }}
            className='text-[#FF0000]-400 absolute right-0 top-0 text-xl'
          />
        </div>
        <div className='thumbnail_section '>
          <p>Thumbnail:</p>
          <img className=' max-h-[100px]' src={d_thumbnail} alt='' />
        </div>
      </section>
    )

  return (
    <div>
      {video?.name?.length > 0 ? (
        <section className='video_thumbnail flex justify-between  items-center'>
          <div className='relative'>
            <p>Video:</p>
            <VideoPlayer
              className={'max-h-[100px]'}
              videoURL={URL.createObjectURL(video)}
            />
            <CloseCircleOutlined
              onClick={() => {
                setVideo(null)
                setThumbnail(null)
              }}
              className='text-[#FF0000]-400 absolute right-0 top-0 text-xl'
            />
          </div>
          <section className='thumbnail_section '>
            <input
              ref={thumbnailRef}
              type='file'
              name='thumbnail'
              id=''
              accept='image/*'
              onChange={(e) => {
                setThumbnail(Array.from(e.target.files)?.[0])
              }}
              hidden
            />
            {thumbnail?.name?.length > 0 ? (
              <div className='w-full relative'>
                <p>Thumbnail:</p>
                <img
                  className=' max-h-[100px]'
                  src={URL.createObjectURL(thumbnail)}
                  alt=''
                />
                <CloseCircleOutlined
                  onClick={() => {
                    setThumbnail(null)
                  }}
                  className='text-[#FF0000]-400 absolute right-0 top-0 text-xl'
                />
              </div>
            ) : (
              <div
                onClick={() => {
                  thumbnailRef.current.click()
                }}
                className='border p-4 m-2 flex justify-center items-center flex-col'
              >
                <BiImageAdd size={20} />
                <p className='text-center'>Upload Thumbnail</p>
              </div>
            )}
          </section>
        </section>
      ) : (
        <section className='video_section'>
          <input
            type='file'
            name='video/*'
            id=''
            ref={videoRef}
            accept='video'
            onChange={(e) => {
              setVideo(Array.from(e.target.files)?.[0])
            }}
            hidden
          />
          <div
            onClick={() => {
              videoRef.current.click()
            }}
            className='border p-4'
          >
            <AiOutlineVideoCameraAdd size={20} />
            <p className='text-center'>Upload Video</p>
          </div>
        </section>
      )}

      <div className='w-full flex justify-center'>
        {isUploading && <Progress percent={percentage} />}
      </div>
    </div>
  )
}
