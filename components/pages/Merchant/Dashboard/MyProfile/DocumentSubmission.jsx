import {
  CloudUploadOutlined,
  DownloadOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { Button } from 'antd'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { MdFileUpload } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { getInstituteDetails } from '../../../../../redux/slices/authSlice'
import { isEmpty } from '../../../../utils'
import { host } from '../../../../../utils/constant'

export default function DocumentSubmission({ instituteDetails }) {
  const [showUploader, setShowUploader] = useState(false)
  const adhaarInputRef = useRef({})
  const addressInputRef = useRef({})
  const registrationInputRef = useRef({})
  const [isBusy, setIsBusy] = useState(false)

  const [adhaar, setAdhaar] = useState(null)
  const [address, setAddress] = useState(null)
  const [registration, setRegistration] = useState(null)

  const [adhaarFile, setAdhaarFile] = useState()
  const [addressFile, setAddressFile] = useState()
  const [registrationFile, setRegistrationFile] = useState()

  const handleFileChange = (e, setFunction) => {
    const FileArray = Array.from(e.target.files)
    setFunction(FileArray[0])
  }

  useEffect(() => {
    if (
      instituteDetails?.documents &&
      !instituteDetails?.updatedRequest?.documents
    ) {
      setRegistration(instituteDetails?.documents?.registration)
      setAddress(instituteDetails?.documents?.address)
      setAdhaar(instituteDetails?.documents?.adhaar)
    }
    if (instituteDetails?.updatedRequest?.documents) {
      setRegistration(instituteDetails?.updatedRequest?.documents?.registration)
      setAddress(instituteDetails?.updatedRequest?.documents?.address)
      setAdhaar(instituteDetails?.updatedRequest?.documents?.adhaar)
    }
  }, [instituteDetails])

  const handleSave = async (e) => {
    setIsBusy(true)
    let uploading = toast.loading('Files are uploading,please wait ...')
    e.preventDefault()
    const formBody = new FormData()
    formBody.append(
      'id',
      typeof window !== 'undefined' &&
        window.localStorage.getItem('INSTITUTE_ID')
    )

    !isEmpty(adhaarFile?.name) && formBody.append('adhaardoc', adhaarFile)
    !isEmpty(addressFile?.name) && formBody.append('addressdoc', addressFile)
    !isEmpty(registrationFile?.name) &&
      formBody.append('registrationdoc', registrationFile)
    formBody.append('updates', JSON.stringify({}))

    try {
      await axios.patch(`${host}/institute/update`, formBody, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${
            typeof window !== 'undefined' &&
            window.localStorage.getItem('ACCESS_TOKEN')
          }`,
        },
      })
      toast.success('Successfully Updated docs !')
      dispatch(getInstituteDetails())
    } catch (err) {
      toast.error('Something went wrong !')
      
    } finally {
      setShowUploader(false)
      setRegistrationFile(null)
      setAdhaarFile(null)
      setAddressFile(null)
      toast.remove(uploading)
      setIsBusy(false)
    }
  }
  const dispatch = useDispatch()

  return (
    <div>
      <div className='flex space-x-2'>
        {!isEmpty(adhaar) && (
          <a
            className='my-2 p-2 border border-dashed flex items-center space-x-4'
            href={adhaar.url}
          >
            <div>
              <p className='  '>Adhaar Doc</p>
              <p className=''>{adhaar.key}</p>
            </div>
            <DownloadOutlined />
          </a>
        )}
        {!isEmpty(address) && (
          <a
            className='my-2 p-2 border border-dashed flex items-center space-x-4'
            href={address.url}
          >
            <div>
              <p className='  '>Address Doc</p>
              <p className=''>{address.key}</p>
            </div>
            <DownloadOutlined />
          </a>
        )}
        {!isEmpty(registration) && (
          <a
            className='my-2 p-2 border border-dashed flex items-center space-x-4'
            href={registration.url}
          >
            <div>
              <p className='  '>Registration Doc</p>
              <p className=''>{registration.key}</p>
            </div>
            <DownloadOutlined />
          </a>
        )}
      </div>
      <div>
        {(!isEmpty(adhaar) || !isEmpty(address) || !isEmpty(address)) && (
          <div
            onClick={() => setShowUploader(true)}
            className='my-2 p-2 border border-dashed rounded-lg text-primary w-fit mx-auto flex items-center space-x-2 cursor-pointer'
          >
            <CloudUploadOutlined />
            <span>Update Documents</span>
          </div>
        )}
      </div>
      {isEmpty(adhaar) && isEmpty(address) && isEmpty(registration) && (
        <>
          <div>
            <p className='text-center text-lg mb-6'>No document found</p>
            <div>
              <div
                onClick={() => setShowUploader(true)}
                className='my-2 p-2 border border-dashed rounded-lg text-primary w-fit mx-auto flex items-center space-x-2 cursor-pointer'
              >
                <PlusOutlined className='' /> <span>Add Documents</span>
              </div>
            </div>
          </div>
        </>
      )}

      <>
        {showUploader && (
          <div>
            <div
              className={`mb-6 px-4 py-3 w-full shadow-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat  first-letter:transition ease-in-out m-0 cursor-pointer`}
              style={{ border: '0.5px dashed ', borderColor: '#2A2A2A ' }}
              onClick={() => adhaarInputRef.current.click()}
            >
              <div className='flex items-center'>
                <h2
                  className=''
                  id='custom-text'
                  style={{ color: 'rgba(0, 0, 0, 0.68)' }}
                >
                  Upload adhaar card{' '}
                </h2>
                <MdFileUpload className='ml-auto text-primary lg:text-xl' />
              </div>
              <p>{adhaarFile?.name}</p>
              <input
                onChange={(e) => handleFileChange(e, setAdhaarFile)}
                ref={adhaarInputRef}
                type='file'
                name='filename'
                className='hidden'
              />
            </div>

            <div
              className={` px-4 py-3 w-full mb-6 shadow-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat  first-letter:transition ease-in-out m-0 cursor-pointer`}
              style={{ border: '0.5px dashed ', borderColor: '#2A2A2A' }}
              onClick={() => addressInputRef.current.click()}
            >
              <div className='flex items-center'>
                <h2
                  className=''
                  id='custom-text2'
                  style={{ color: 'rgba(0, 0, 0, 0.68)' }}
                >
                  Upload address proof{' '}
                </h2>
                <MdFileUpload className='ml-auto text-primary lg:text-xl' />
              </div>
              <p>{addressFile?.name}</p>
              <input
                onChange={(e) => handleFileChange(e, setAddressFile)}
                ref={addressInputRef}
                type='file'
                id='myFile2'
                name='filename'
                className='hidden'
              />
            </div>
            <div
              className={` px-4 py-3 w-full shadow-md text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat  first-letter:transition ease-in-out m-0 cursor-pointer`}
              style={{ border: '0.5px dashed ', borderColor: '#2A2A2A' }}
              onClick={() => registrationInputRef.current.click()}
            >
              <div className='flex items-center'>
                <h2
                  className=''
                  id='custom-text3'
                  style={{ color: 'rgba(0, 0, 0, 0.68)' }}
                >
                  Upload Institute registration document{' '}
                </h2>
                <MdFileUpload className='ml-auto text-primary lg:text-xl' />
              </div>
              <p>{registrationFile?.name}</p>
              <input
                onChange={(e) => handleFileChange(e, setRegistrationFile)}
                ref={registrationInputRef}
                type='file'
                id='myFile3'
                name='filename'
                className='hidden'
              />
            </div>
            <div className='w-full flex'>
              <Button
                disabled={
                  (isEmpty(addressFile?.name) &&
                    isEmpty(adhaarFile?.name) &&
                    isEmpty(registrationFile?.name)) ||
                  isBusy
                }
                loading={isBusy}
                onClick={handleSave}
                className=' bg-primary text-white rounded-lg my-5 mx-auto '
              >
                Save & Submit
              </Button>
            </div>
          </div>
        )}
      </>
    </div>
  )
}
