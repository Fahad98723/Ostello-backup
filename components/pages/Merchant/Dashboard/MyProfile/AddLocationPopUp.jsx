import axios from 'axios'
import { useState } from 'react'
import { GrFormClose } from 'react-icons/gr'
import toast from 'react-hot-toast'
import Modal from '../../../../UI/Modal/Modal'
import { host } from '../../../../../utils/constant'

const AddLocationPopUp = ({
  showPopUpState,
  locationValuesState,
  instituteDetails,
  afterSuccess = () => {},
}) => {
  const [, setShowPopUp] = showPopUpState
  const [locationValues, setLocationValues] = locationValuesState
  const [values, setValues] = useState([])

  const handleChange = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }))
  }
  // (JSON.stringify(values))

  return (
   <Modal open={true}>
      <form
      action=''

    >
      <div
        className='  w-10/12 lg:w-96 px-6  shadow-md rounded-xl text-base font-normal text-slate bg-white  border-2 border-solid border-light-gray'
      >
        <div className='flex items-center justify-center'>
          <h1 className='text-primary font-bold text-xl py-3 md:py-5 '>
            Add Location
          </h1>
          <GrFormClose
            className=' w-7 h-7 shadow-lavender p-1 text-lg rounded-full ml-auto '
            style={{
              boxShadow: '0px 4px 34px rgba(136, 136, 136, 0.4)',
              backgroundColor: 'white',
            }}
            onClick={(e) => {
              setShowPopUp(false)
            }}
          />
        </div>
        <div className='space-y-3 md:space-y-4'>
          <div className='border w-12/12 rounded-lg py-2 mr-auto'>
            <input
              type='text'
              className='w-full focus:outline-none px-5 text-lg'
              name='line1'
              placeholder='Address line 1'
              onChange={handleChange}
            />
          </div>
          <div className='border w-12/12 rounded-lg py-2 mr-auto'>
            <input
              type='text'
              className='w-full focus:outline-none px-5 text-lg'
              name='line2'
              placeholder='Address line 2 (optional)'
              onChange={handleChange}
            />
          </div>
          <div className='border w-12/12 rounded-lg py-2 mr-auto'>
            <input
              type='text'
              className='w-full focus:outline-none px-5 text-lg'
              name='pincode'
              placeholder='Pincode'
              onChange={handleChange}
            />
          </div>
          <div className='border w-12/12 rounded-lg py-2 mr-auto'>
            <input
              type='text'
              className='w-full focus:outline-none px-5 text-lg'
              name='area'
              placeholder='Area'
              onChange={handleChange}
            />
          </div>
          <div className='border w-12/12 rounded-lg py-2 mr-auto'>
            <input
              type='text'
              className='w-full focus:outline-none px-5 text-lg'
              name='city'
              placeholder='City'
              onChange={handleChange}
            />
          </div>
          <div className='border w-12/12 rounded-lg py-2 mr-auto'>
            <input
              type='text'
              className='w-full focus:outline-none px-5 text-lg'
              name='state'
              placeholder='State'
              onChange={handleChange}
            />
          </div>
          <div className='border w-12/12 rounded-lg py-2 mr-auto'>
            <input
              type='text'
              className='w-full focus:outline-none px-5 text-lg'
              name='country'
              placeholder='Country'
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          className='bg-primary text-white  w-full py-3 rounded-lg my-6 mr-auto'
          onClick={(e) => {
            e.preventDefault()
            const temp = [JSON.stringify(values)]
            locationValues.forEach((item) => temp.push(JSON.stringify(item)))
            const myForm = new FormData()
            const updates = {
              locations: temp,
            }
            myForm.append('id', instituteDetails.id)
            myForm.append('updates', JSON.stringify(updates))

            try {
              axios
                .patch(`${host}/institute/update/`, myForm, {
                  headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${typeof window !== 'undefined' && window.localStorage.getItem(
                      'ACCESS_TOKEN'
                    )}`,
                  },
                })
                .then((res) => {
                  toast.success('Successfully Added !')
                  afterSuccess()
                })
                .catch((err) => console.error(err))
            } catch (error) {
              
            }
          }}
        >
          Save
        </button>
      </div>
    </form>
   </Modal>
  )
}

export default AddLocationPopUp
