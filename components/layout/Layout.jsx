import React from 'react'
import { Toaster } from 'react-hot-toast'
import PageWrapper from './PageWrapper'

export default function Layout({ children }) {
  return (
    <PageWrapper>
      <>
        <Toaster position='top-center' reverseOrder={true} />
        {children}
      </>
    </PageWrapper>
  )
}
