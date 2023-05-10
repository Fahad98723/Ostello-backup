import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

function Modal({
  open,
  children,
  onClose = () => {},
  modalRef,
  closeOnOutsideClick = true,
}) {
  if (!open) return null

  const JSX_MODAL = (
    <>
      <div
        className='h-screen w-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-[999]  '
        ref={modalRef}
        onClick={() => {
          closeOnOutsideClick && onClose()
        }}
      >
        <ModalContainer
          className=' rounded-[10px]'
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </ModalContainer>
      </div>
    </>
  )
  return ReactDOM.createPortal(JSX_MODAL, document.querySelector('#root'))
}

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.75);
`

export default Modal