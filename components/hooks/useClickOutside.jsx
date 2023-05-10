import { useRef, useEffect, createRef } from 'react'

export const useClickOutside = (handler) => {
  let domNode = createRef({})

  useEffect(() => {
    let maybeHandler = (event) => {
      let verify = !domNode.current?.contains(event?.target) || false
      if (verify) {
        handler()
      }
    }

    document.addEventListener('mousedown', maybeHandler)

    return () => {
      document.removeEventListener('mousedown', maybeHandler)
    }
  })
  return domNode
}
