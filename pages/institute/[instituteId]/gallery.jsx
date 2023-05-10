import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import ContentGallery from '../../../components/pages/Gallery'


export default function InstituteGallery() {
  const router = useRouter()
  

  return (
    <div>
      <Head>
        <title>Content Gallery - Institute - Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ContentGallery/>
    </div>
  )
}