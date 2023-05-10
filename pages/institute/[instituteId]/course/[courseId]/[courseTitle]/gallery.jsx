import { useRouter } from 'next/router'
import React from 'react'
import Gallery from '../../../../../../components/pages/Gallery'

export default function CourseGallery() {
  const router = useRouter()
  

  return (
    <div>
      <Gallery />
    </div>
  )
}