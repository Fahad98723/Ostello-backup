import { useEffect, useState } from 'react'

export default function useScreenWidth() {
  const [screenSize, setScreenSize] = useState(null)
  const [screenWidth, setScreenWidth] = useState(null)
  const checkScreenSize = () => {
    let width = window.innerWidth
    setScreenWidth(width)
    if (width <= 640) {
      setScreenSize('sm')
    } else if (width <= 768) {
      setScreenSize('md')
    } else if (width <= 1024) {
      setScreenSize('lg')
    } else if (width <= 1280) {
      setScreenSize('xl')
    } else if (width <= 1536) {
      setScreenSize('2xl')
    }
  }
  useEffect(() => {
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return { screenSize, screenWidth }
}
