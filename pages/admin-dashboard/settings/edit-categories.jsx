import React, { useRef, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { GrFormClose } from 'react-icons/gr'
import { MdAddPhotoAlternate } from 'react-icons/md'

import Head from 'next/head'
import { useDispatch } from 'react-redux'
import AdminDashboard from '../../../components/pages/AdminDashboard/AdminDashboard'
import Modal from '../../../components/UI/Modal/Modal'

const EditCategories = () => {
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState(null)
  const [input1, setInput1] = useState('')
  const [deleteSelect, setDeleteSelect] = useState(false)
  const [data, setData] = useState([])

  const [indexNumber, setIndexNumber] = useState(null)
  const [dataSubCategory, setDataSubCategory] = useState([])
  const [image1, setImage1] = useState(null)
  const [input2, setInput2] = useState('')

  const imageHandleChange = (e) => {
    const fileArray = Array.from(e.target.files)
    setImage(fileArray[0])
  }

  const imageSubHandleChange = (e) => {
    const fileArray = Array.from(e.target.files)
    setImage1(fileArray[0])
  }

  const dispatch = useDispatch

  const imageInputRef = useRef({})

  const handleSave = () => {
    setData((prev) =>
      prev.concat({
        name: input1,
        images: image,
        subCategory: [],
      })
    )
    setOpen(false)
    setImage(null)
  }

  const handleSubCategory = (i) => {
    setDataSubCategory({
      name: input1,
      images: image1,
    })
    const sub = [
      ...data[i].subCategory,
      {
        name: input2,
        images: image1,
      },
    ]
    data[i].subCategory = sub
    setOpen(false)
    setImage1(null)
    setInput2('')
  }

  const deleteHandleCategory = (i) => {
    if (i > -1)
      setData((prev) => {
        const temp = []
        prev.forEach((box, idx) => {
          if (idx !== i) temp.push(box)
        })

        return temp
      })
  }

  const deleteHandleSubCategory = (i, si) => {
    const temp = []
    data[i].subCategory.forEach((box, idx) => {
      if (idx !== si) temp.push(box)
    })
    data[i].subCategory = temp
  }

  const [addCategory, setAddCategory] = useState(false)
  const [addSubCategory, setSubCategory] = useState(false)

  

  const name1 = 'Category Name'
  const name2 = 'Sub Category Name'
  return (
    <AdminDashboard currentSection={'Edit Categories'}>
      <Head>
        <title>Edit Categories - Admin Dashboard - Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='md:px-[30px] px-[5px] mt-[0px]'>
        <table className='table-auto bg-white w-full border-2'>
          <thead>
            <tr>
              <th className='border-r-2 w-2/12'>
                {' '}
                <div className=' '>
                  <div className='flex p-5'>
                    <p className='text-2xl mr-2'>Categories</p>
                    <svg
                      width='42'
                      height='42'
                      viewBox='0 0 42 42'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='cursor-pointer'
                      onClick={() => {
                        setOpen(true)
                        setSubCategory(false)
                        setAddCategory(true)
                      }}
                    >
                      <g filter='url(#filter0_d_214_1722)'>
                        <rect
                          x='4'
                          width='34'
                          height='34'
                          rx='17'
                          fill='#7D23E0'
                        />
                        <path
                          d='M28 16H22V10C22 9.73478 21.8946 9.48043 21.7071 9.29289C21.5196 9.10536 21.2652 9 21 9C20.7348 9 20.4804 9.10536 20.2929 9.29289C20.1054 9.48043 20 9.73478 20 10V16H14C13.7348 16 13.4804 16.1054 13.2929 16.2929C13.1054 16.4804 13 16.7348 13 17C13 17.2652 13.1054 17.5196 13.2929 17.7071C13.4804 17.8946 13.7348 18 14 18H20V24C20 24.2652 20.1054 24.5196 20.2929 24.7071C20.4804 24.8946 20.7348 25 21 25C21.2652 25 21.5196 24.8946 21.7071 24.7071C21.8946 24.5196 22 24.2652 22 24V18H28C28.2652 18 28.5196 17.8946 28.7071 17.7071C28.8946 17.5196 29 17.2652 29 17C29 16.7348 28.8946 16.4804 28.7071 16.2929C28.5196 16.1054 28.2652 16 28 16Z'
                          fill='white'
                        />
                      </g>
                      <defs>
                        <filter
                          id='filter0_d_214_1722'
                          x='0'
                          y='0'
                          width='42'
                          height='42'
                          filterUnits='userSpaceOnUse'
                          colorInterpolationFilters='sRGB'
                        >
                          <feFlood
                            floodOpacity='0'
                            result='BackgroundImageFix'
                          />
                          <feColorMatrix
                            in='SourceAlpha'
                            type='matrix'
                            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                            result='hardAlpha'
                          />
                          <feOffset dy='4' />
                          <feGaussianBlur stdDeviation='2' />
                          <feComposite in2='hardAlpha' operator='out' />
                          <feColorMatrix
                            type='matrix'
                            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
                          />
                          <feBlend
                            mode='normal'
                            in2='BackgroundImageFix'
                            result='effect1_dropShadow_214_1722'
                          />
                          <feBlend
                            mode='normal'
                            in='SourceGraphic'
                            in2='effect1_dropShadow_214_1722'
                            result='shape'
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </div>
              </th>
              <th className='w-10/12 p-5 '>
                {' '}
                <div className=''>
                  <div className='flex justify-between'>
                    <p className='text-2xl'>Sub Categories</p>
                    {deleteSelect ? (
                      <button
                        onClick={() => setDeleteSelect(false)}
                        className='bg-ghost py-2 px-5 text-white text-xl text rounded-3xl'
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => setDeleteSelect(true)}
                        className='bg-[#7D23E0] py-2 px-5 text-white text-xl text rounded-3xl'
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((d, i) => (
              <tr key={i} className=''>
                {' '}
                <td className='border-2 border-t-0'>
                  {' '}
                  <div className='p-5 pt-0 mt-5 relative'>
                    {deleteSelect && (
                      <GrFormClose
                        className=' w-7 h-7  absolute top-[-10px] mb-[10px] text-white right-2  p-1 text-lg rounded-full ml-auto cursor-pointer'
                        style={{
                          backgroundColor: 'red',
                          color: 'white',
                        }}
                        onClick={(e) => {
                          deleteHandleCategory(i)
                        }}
                      />
                    )}

                    <div
                      style={{
                        background: `url(${URL.createObjectURL(
                          d.images
                        )}) center center no-repeat`,
                        backgroundSize: 'cover',
                        padding: '15px',
                        borderRadius: '20px',
                        marginBottom: '10px',
                      }}
                    >
                      <p className='text-white text-3xl text-center'>
                        {d.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className='border-2 border-t-0'>
                  <div className='p-5 pt-0 mt-5 grid grid-cols-6 gap-4'>
                    {d?.subCategory?.map((s, si) => (
                      <div key={si}>
                        <div className='relative'>
                          {deleteSelect && (
                            <GrFormClose
                              className=' w-7 h-7  absolute top-[-10px] mb-[10px] text-white right-0  p-1 text-lg rounded-full ml-auto cursor-pointer'
                              style={{
                                backgroundColor: 'red',
                                color: 'white',
                              }}
                              onClick={(e) => {
                                deleteHandleSubCategory(i, si)
                              }}
                            />
                          )}

                          <div
                            className='px-12 py-3'
                            style={{
                              background: `url(${URL.createObjectURL(
                                s?.images
                              )}) center center no-repeat`,
                              backgroundSize: 'cover',
                              borderRadius: '20px',
                              marginBottom: '10px',
                            }}
                          >
                            <p className='text-white text-3xl text-center'>
                              {s?.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setOpen(true)
                        setAddCategory(false)
                        setSubCategory(true)
                        setIndexNumber(i)
                      }}
                      className='bg-[#7D23E0] flex items-center px-12 text-center mx-auto text-white text-xl text rounded'
                    >
                      <AiOutlinePlus className='mr-2'></AiOutlinePlus> Add
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal open={open} onClose={() => setOpen(false)}>
          <form
            action=''
            className=''
            style={{ background: 'rgba(0, 0, 0, 0.5)' }}
          >
            <div
              className='w-[300px] lg:w-96 px-6  shadow-md rounded-xl text-base font-normal text-slate bg-white  border-2 border-solid border-light-gray '
              style={{
                position: 'absolute',
                transform: 'translate(-50%,-50%)',
                marginRight: '-50%',
                top: '50%',
                left: '50%',
              }}
            >
              <div className='flex items-center justify-center'>
                <h1 className='text-violet font-bold text-xl py-3 md:py-5  '>
                  {addCategory && ' Add Category'}
                  {addSubCategory && 'Add Sub-category'}
                </h1>
                <GrFormClose
                  className=' w-7 h-7 shadow-lavender p-1 text-lg rounded-full ml-auto '
                  style={{
                    boxShadow: '0px 4px 34px rgba(136, 136, 136, 0.4)',
                    backgroundColor: 'white',
                  }}
                  onClick={(e) => {
                    setOpen(false)
                  }}
                />{' '}
              </div>
              {addCategory && (
                <div className='space-y-3 lg:space-y-4'>
                  <p className='text-[#FF0000]/70'>
                    Please upload a image smaller than 5 MB
                  </p>
                  <div className='border h-28 w-full lg:my-3 relative rounded-lg'>
                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        className='w-full h-full  mx-auto '
                        alt=''
                      />
                    ) : (
                      <MdAddPhotoAlternate
                        className='text-3xl   mb-auto'
                        style={{
                          position: 'absolute',
                          transform: 'translate(-50%,-50%)',
                          top: '50%',
                          left: '50%',
                        }}
                        onClick={() => imageInputRef.current.click()}
                      />
                    )}
                    <input
                      type='file'
                      accept='image/*'
                      id='myFile'
                      name='filename'
                      className='hidden'
                      onChange={imageHandleChange}
                      required
                      ref={imageInputRef}
                      hidden
                    />
                  </div>

                  <div className={`border w-12/12 rounded-lg py-2 mr-auto`}>
                    <input
                      type='text'
                      className={` w-full focus:outline-none px-5 text-lg`}
                      name='name1'
                      placeholder={name1}
                      required
                      onChange={(e) => {
                        setInput1(e.target.value)
                      }}
                    />
                  </div>
                </div>
              )}

              {addSubCategory && (
                <div className='space-y-3 lg:space-y-4'>
                  <p className='text-[#FF0000]/70'>
                    Please upload a image smaller than 5 MB
                  </p>
                  <div className='border h-28 w-full lg:my-3 relative rounded-lg'>
                    {image1 ? (
                      <img
                        src={URL.createObjectURL(image1)}
                        className='w-full h-full  mx-auto '
                        alt=''
                      />
                    ) : (
                      <MdAddPhotoAlternate
                        className='text-3xl   mb-auto'
                        style={{
                          position: 'absolute',
                          transform: 'translate(-50%,-50%)',
                          top: '50%',
                          left: '50%',
                        }}
                        onClick={() => imageInputRef.current.click()}
                      />
                    )}
                    <input
                      type='file'
                      accept='image/*'
                      id='myFile'
                      name='filename'
                      className='hidden'
                      onChange={imageSubHandleChange}
                      required
                      ref={imageInputRef}
                      hidden
                    />
                  </div>

                  <div className={`border w-12/12 rounded-lg py-2 mr-auto`}>
                    <input
                      type='text'
                      className={` w-full focus:outline-none px-5 text-lg`}
                      name='name2'
                      placeholder={name2}
                      required
                      onChange={(e) => {
                        setInput2(e.target.value)
                      }}
                    />
                  </div>
                </div>
              )}

              {addCategory ? (
                <button
                  className='bg-primary text-white  w-full py-3 rounded-lg my-6 mr-auto'
                  onClick={(e) => {
                    e.preventDefault()
                    handleSave()
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  className='bg-primary text-white  w-full py-3 rounded-lg my-6 mr-auto'
                  onClick={(e) => {
                    e.preventDefault()
                    handleSubCategory(indexNumber)
                  }}
                >
                  Save
                </button>
              )}
            </div>
          </form>
        </Modal>
      </div>
    </AdminDashboard>
  )
}

export default EditCategories
