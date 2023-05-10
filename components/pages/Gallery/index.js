import { CloseCircleOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import obj from '../../../assets/images/objects/obj.png'
import obj1 from '../../../assets/images/objects/obj1.png'
import obj2 from '../../../assets/images/objects/obj2.png'
import obj3 from '../../../assets/images/objects/obj3.png'
import obj4 from '../../../assets/images/objects/obj4.png'
import obj5 from '../../../assets/images/objects/obj5.png'
import obj6 from '../../../assets/images/objects/obj6.png'
import Container from '../../layout/Container'
import LoadingSpinner from '../../layout/LoadingSpinner'
import { isEmpty, isEmptyObj, titleToUrl } from '../../../utils/utils'

import {
  fetchInstitutes,
  institutesSelector,
  setCurrentInstitute,
} from '../../../redux/slices/instituteSlice'
import Error404 from '../../../pages/404'
import {
  fetchCourses,
  selectCourse,
  setCurrentCourse,
} from '../../../redux/slices/courseSlice'
import { useRouter } from 'next/router'
import Navbar from '../HomeLanding/Header/Navbar'

export default function ContentGallery() {
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
    if (!isEmpty(courseId)) {
      setImages(currentCourse.images)
      setVideos(currentCourse.videos)
      return
    }

    setImages(currentInstitute.images)
    setVideos(currentInstitute.videos)
  }, [currentCourse, currentInstitute, courseId])

  if (loading) return <LoadingSpinner />
  if (!loading && !isEmpty(instituteId) && isEmptyObj(currentInstitute))
    return <Error404 />
  if (!loading && !isEmpty(courseId) && isEmptyObj(currentCourse))
    return <Error404 />

  return (
    <div>
      <Navbar/>
      <Container className={'relative m-20 mx'}>
        <div className=' grid grid-cols-1 md:grid-cols-2  place-items-stretch  gap-2'>
          {images?.map((item, i) => (
            <img
              className=' object-cover mx-10 md:mx-0 md:h-[400px] '
              key={i}
              src={item.url}
              alt=''
            />
          ))}
        </div>
        <CloseCircleOutlined
          onClick={() => router.back(-1)}
          className='absolute -top-10 right-10  text-xl text-[#7D23E0]'
        />
      </Container>
    </div>
  )
}
