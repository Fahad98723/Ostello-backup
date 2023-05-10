import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import axios from 'axios'
import { useRouter } from 'next/router'
import { host } from '../../../utils/constant'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '5px',
}

export default function LogAndDeleteModal({
  open,
  setOpen,
  handleOpen,
  modalType,
}) {
  const handleClose = () => setOpen(false)
  const router = useRouter()

  function logout() {
    handleClose()
    localStorage.clear();
      router.push('/')
      // typeof typeof window !== 'undefined' && window !== 'undefined' && typeof window !== 'undefined' && window.location('/')
      router.reload();
  }

  const deleteAccount = async () => {
    try {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        }
      };
      const id = localStorage.getItem('OWNER_ID')
      const { data } = await axios.delete(`${host}/users?id=${id}`, config);
      // 
      localStorage.clear()
      handleClose()
      router.push('/')
      // typeof typeof window !== 'undefined' && window !== 'undefined' && typeof window !== 'undefined' && window.location.reload()
    } catch (err) {
      
    }

  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        {modalType === 'delete' ? (
          <Box sx={style}>
            <p className='text-2xl mb-3 text-center'>
              Are you sure you want to delete your account ?{' '}
            </p>
            <div className='text-center'>
              <button onClick={() => deleteAccount()} className='bg-primary text-white rounded p-2 w-9/12 my-2'>
                Confirm
              </button>
              <button  onClick={() => handleClose()} className='text-[#FF0000]/80 bg-ghost/20 rounded p-2 w-9/12'>
                Cancel
              </button>
            </div>
          </Box>
        ) : (
          <Box sx={style}>
            <p className='text-2xl mb-3 text-center'>
              Are you sure you want to Logout?{' '}
            </p>
            <div className='text-center'>
              <button
                onClick={() => logout()}
                className='bg-primary text-white rounded p-2 w-9/12 my-2'
              >
                Confirm
              </button>
              <button
                onClick={() => handleClose()}
                className='text-[#FF0000]/80 bg-ghost/20 rounded p-2 w-9/12'
              >
                Cancel
              </button>
            </div>
          </Box>
        )}
      </Modal>
    </div>
  )
}
