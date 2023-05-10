import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewFaculty } from '../../../../../redux/slices/adminCourseSlice'
import { AddImageIcon, CrossIcon } from '../../../../SVGIcons'

const AddFacultyModal = ({ setAddFaculty }) => {
  const [facultyName, setFacultyName] = useState('')
  const [qualification, setQualification] = useState('')
  const [facultyOverview, setFacultyOverview] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const [selectedImage, setSelectedImage] = useState(null)

  const onSelectFile = (e) => {
    const selectedFiles = e.target.files[0]
    setSelectedImage(URL.createObjectURL(selectedFiles))
  }

  const handleOnSubmit = () => {

    if (!selectedImage || !facultyName || !qualification || !facultyOverview) {
      setError('Please Fill The All Required Field')
      return
    }
    setError('')
    const newFaculty = {
      imgUrl: selectedImage,
      facultyName,
      qualification,
      facultyOverview,
    }
    dispatch(addNewFaculty(newFaculty))
    setAddFaculty(false)
  }
  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative md:w-[27%] w-[90%] w mb-6 mx-auto max-w-6xl'>
          {/*content*/}
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className=' py-3 px-5 rounded-t'>
              <div className='flex items-start justify-between'>
                <div className='text-[22px] text-[#7D23E0] leading-[47px] font-medium'>
                  Add Faculty
                </div>
                <button
                  className='p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                  onClick={() => setAddFaculty(false)}
                >
                  <span className=' bg-white border border-[#7D23E0] rounded-full p-4 flex justify-center items-center h-6 w-6 text-2xl text-[#7D23E0] outline-none focus:outline-none'>
                    ×
                  </span>
                </button>
              </div>
              {error && <div className='text-[14px] text-[#FF0000]-500'>{error}</div>}
            </div>
            {/*body*/}
            <div className='relative px-6 md:h-[50vh] h-[65vh]  overflow-y-auto scrollbar-hide flex-auto'>
              <div className='flex flex-col'>
                <div className='relative bg-white w-full my-2 p-3 border text-[#A8A8A8] h-[130px] overflow-hidden rounded-lg border-[#000]'>
                  <label>
                    {!selectedImage ? (
                      <>
                        <div className='flex h-full justify-center items-center flex-col'>
                          <AddImageIcon />
                        </div>
                        <input
                          onChange={onSelectFile}
                          accept='image/*'
                          type='file'
                          className='hidden'
                        />
                      </>
                    ) : (
                      <div>
                        <img
                          className='w-full h-[105px] shadow-sm rounded-3xl object-cover'
                          src={selectedImage}
                          alt=''
                        />
                      </div>
                    )}
                  </label>
                  {selectedImage && (
                    <button
                      className='absolute top-6 w-[30px] right-6 '
                      onClick={() => setSelectedImage(null)}
                    >
                      <CrossIcon className='w-full' />
                    </button>
                  )}
                </div>
                <input
                  onChange={(e) => setFacultyName(e.target.value)}
                  className='py-2 px-3 my-2 outline outline-1 rounded-lg outline-[#000]'
                  type='text'
                  placeholder='Faculty Name'
                />
                <input
                  onChange={(e) => setQualification(e.target.value)}
                  className='py-2 px-3 my-2 outline outline-1 rounded-lg outline-[#000]'
                  type='text'
                  placeholder='Qualification'
                />
                <textarea
                  onChange={(e) => setFacultyOverview(e.target.value)}
                  className='py-2 px-3 my-2 outline outline-1 rounded-lg outline-[#000]'
                  type='text'
                  rows={4}
                  placeholder='Faculty Overview'
                />
              </div>
            </div>
            {/*footer*/}
            <div className='p-5 border-solid border-slate-200 rounded-b'>
              <button
                onClick={() => handleOnSubmit()}
                className='border  bg-[#7D23E0] w-full md:px-12 py-2 px-4 md:py-3 font-bold rounded-lg text-white'
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed !mt-0 inset-0 z-40 bg-black'></div>
    </>
  )
}

export default AddFacultyModal
