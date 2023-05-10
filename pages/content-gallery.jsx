import { CloseCircleOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../components/layout/Container'
import LoadingSpinner from '../components/layout/LoadingSpinner'
import MetaHelmet from '../components/MetaHelmet'
import { isEmpty, isEmptyObj, titleToUrl } from '../components/utils'
import {
  fetchCourses,
  selectCourse,
  setCurrentCourse
} from '../redux/slices/courseSlice'
import {
  fetchInstitutes,
  institutesSelector,
  setCurrentInstitute
} from '../redux/slices/instituteSlice'
import Error404 from './404'

export default function ContentGallery({meta}) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])
  const { instituteId, courseId } = router.query
  const { institutes, currentInstitute } = useSelector(institutesSelector)
  const { courses, currentCourse } = useSelector(selectCourse)
  useEffect(() => {
    institutes?.forEach((item) => {
      if (titleToUrl(item.name) === instituteId) {
        setLoading(false)
        dispatch(setCurrentInstitute(item))
        return
      }

      setLoading(false)
    })

    courses?.forEach((item) => {
      if (titleToUrl(item.name) === courseId) {
        setLoading(false)
        dispatch(setCurrentCourse(item))
        return
      }

      setLoading(false)
    })
  }, [dispatch, instituteId, courseId, courses, institutes])

  useEffect(() => {
    dispatch(fetchInstitutes())
    dispatch(fetchCourses())
  }, [dispatch])

  useEffect(() => {
    if (!isEmpty(currentCourse.images || currentCourse.videos)) {
      setImages(currentCourse.images)
      setVideos(currentCourse.videos)
    }
    if (!isEmpty(currentInstitute.images || currentInstitute.videos)) {
      setImages(currentInstitute.images)
      setVideos(currentInstitute.videos)
    }
  }, [currentCourse, currentInstitute])

  if (!loading && isEmptyObj(currentInstitute)) return <Error404 />
  if (loading) return <LoadingSpinner />

  return (
    <div>
      <MetaHelmet title={meta.title} description={meta.description} link={meta.link} />
      <Container className={'relative m-20 mx'}>
        <div className=' grid grid-cols-1 md:grid-cols-2  place-items-stretch  gap-2'>
          {images.map((item, i) => (
            <img
              className=' object-cover mx-10 md:mx-0 md:h-[400px] '
              key={i}
              src={item.url}
              alt=''
            />
          ))}
        </div>
        <CloseCircleOutlined
          onClick={() => router.push(-1)}
          className='absolute -top-10 right-10  text-xl text-[#7D23E0]'
        />
      </Container>
    </div>
  )
}

export const getStaticProps = async () => {
  const meta = {
    title: "Content Gallery - Ostello.co.in",
    description: "Book your course at Ostello at the best coaching institutes in Delhi near you. | Compare and Choose from the best teachers through Demo classes | Interact with the toppers and choose what's best for you",
    link: "https://www.ostello.co.in/content-gallery",
  }
  return {
    props: {
      meta,
    },
  };
};