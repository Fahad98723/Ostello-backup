import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { GrFormClose } from 'react-icons/gr'
import { ImCancelCircle } from 'react-icons/im'
import { RiArrowRightSLine } from 'react-icons/ri'
import AdminDashboard from '../../../components/pages/AdminDashboard/AdminDashboard'
import Modal from '../../../components/UI/Modal/Modal'

const EditFilters = () => {
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [category, setCategory] = useState('')

  const [data, setData] = useState([])

  const [number, setNumber] = useState(5)

  const handleSave = (e) => {
    var data = new FormData(e.target)
    let formObject = Object.fromEntries(data.entries())
    
    let results = []

    Object.entries(formObject).map((val) =>
      results.push({
        subCategory: val[1],
      })
    )
    
    e.preventDefault()
    setData((prev) =>
      prev.concat({
        category: category,
        subcategory: results,
      })
    )
  }

  const [result, setResult] = useState([])

  
  const [selectedSubCategory, setSelectedSubCategory] = useState([])

  useEffect(() => {
    // let results = []

    // Object.entries(selectedSubCategory).map(val => results.push({
    //   subCategory : val[1]
    // }))
    setResult(selectedSubCategory)
  }, [selectedSubCategory])

  const [selectedIndex, setSelectedIndex] = useState()

  const removeSubCategory = (i) => {
    const temp = []
    result.forEach((box, idx) => {
      if (idx !== i) temp.push(box)
    })
    //   data[i].subCategory = temp
    
    data[selectedIndex].subcategory = temp
    setResult(temp)
    
  }

  const removeFilter = (i) => {
    const temp = []
    result.forEach((box, idx) => {
      if (idx !== i) temp.push(box)
    })
    //   data[i].subCategory = temp
    
    data[selectedIndex].subcategory = temp
    setResult(temp)
    
  }

  const [deleteSelect, setDeleteSelect] = useState(false)
  
  return (
    <AdminDashboard currentSection='Edit Filters'>
      <Head>
        <title>Edit Filter - Admin Dashboard - Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='md:px-[30px] px-[5px] w-11/12 mt-[0px]'>
        <div className='flex justify-between'>
          <h1 className='text-2xl font-bold'>Filters</h1>

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
              Edit
            </button>
          )}
        </div>

        <div className='sm:block hidden'>
          <div className='filter flex  '>
            <div className='w-3/12 h-fit bg-white  border-[#C8C8C8] border-[1px] '>
              {data?.map((d, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedSubCategory(d.subcategory)
                    setSelectedIndex(i)
                  }}
                  className='border-[#C8C8C8] border-b-[1px] cursor-pointer full py-2 px-2 flex items-center justify-between'
                >
                  <p className='text-xl'>{d.category}</p>
                  {!deleteSelect ? (
                    <RiArrowRightSLine className='scale-125' />
                  ) : (
                    <ImCancelCircle className='scale-125 bg-red-400 rounded-full text-white text-xl'></ImCancelCircle>
                  )}
                </div>
              ))}
              <div className='px-2  '>
                <button
                  onClick={() => setOpen(true)}
                  className='bg-ghost/20 rounded w-full items-center justify-center py-2 my-2  flex'
                >
                  Add More{' '}
                  <AiOutlinePlus className='scale-100 ml-2'></AiOutlinePlus>
                </button>
              </div>
            </div>
            <div className='w-3/12 h-fit bg-white  border-[#C8C8C8] border-[1px] '>
              {result?.map((d, i) => (
                <div
                  key={i}
                  className='border-[#C8C8C8] border-b-[1px] cursor-pointer full py-2 px-2 flex items-center justify-between'
                >
                  <p className='text-xl'>{d.subCategory}</p>
                  {!deleteSelect ? (
                    <RiArrowRightSLine className='scale-125' />
                  ) : (
                    <ImCancelCircle
                      onClick={() => removeSubCategory(i)}
                      className='scale-125 bg-red-400 rounded-full text-white text-xl'
                    ></ImCancelCircle>
                  )}
                </div>
              ))}
              <div className='px-2  '>
                <button
                  onClick={() => setOpen1(true)}
                  className='bg-ghost/20 rounded w-full items-center justify-center py-2 my-2  flex'
                >
                  Add More{' '}
                  <AiOutlinePlus className='scale-100 ml-2'></AiOutlinePlus>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='sm:hidden block'>
          <div className='filter  my-2 '>
            {!result.length ? (
              <div className='w-full h-fit bg-white  border-[#C8C8C8] border-[1px] '>
                {data?.map((d, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedSubCategory(d.subcategory)
                      setSelectedIndex(i)
                    }}
                    className='border-[#C8C8C8] border-b-[1px] cursor-pointer full py-2 px-2 flex items-center justify-between'
                  >
                    <p className='text-xl'>{d.category}</p>
                    {!deleteSelect ? (
                      <RiArrowRightSLine className='scale-125' />
                    ) : (
                      <ImCancelCircle className='scale-125 bg-red-400 rounded-full text-white text-xl'></ImCancelCircle>
                    )}
                  </div>
                ))}
                <div className='px-2  '>
                  <button
                    onClick={() => setOpen(true)}
                    className='bg-ghost/20 rounded w-full items-center justify-center py-2 my-2  flex'
                  >
                    Add More{' '}
                    <AiOutlinePlus className='scale-100 ml-2'></AiOutlinePlus>
                  </button>
                </div>
              </div>
            ) : (
              ''
            )}
            {result.length ? (
              <div className='w-full h-fit bg-white  border-[#C8C8C8] border-[1px] '>
                {result?.map((d, i) => (
                  <div
                    key={i}
                    className='border-[#C8C8C8] border-b-[1px] cursor-pointer full py-2 px-2 flex items-center justify-between'
                  >
                    <p className='text-xl'>{d.subCategory}</p>
                    {!deleteSelect ? (
                      <RiArrowRightSLine className='scale-125' />
                    ) : (
                      <ImCancelCircle
                        onClick={() => removeSubCategory(i)}
                        className='scale-125 bg-red-400 rounded-full text-white text-xl'
                      ></ImCancelCircle>
                    )}
                  </div>
                ))}
                <div className='px-2  '>
                  <button
                    onClick={() => setOpen(true)}
                    className='bg-ghost/20 rounded w-full items-center justify-center py-2 my-2  flex'
                  >
                    Add More{' '}
                    <AiOutlinePlus className='scale-100 ml-2'></AiOutlinePlus>
                  </button>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>

        <Modal
          open={open}
          onClose={() => {
            setOpen(false)
            setNumber(5)
          }}
        >
          <div style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
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
                  Add Filters
                </h1>
                <GrFormClose
                  className=' w-7 h-7 shadow-lavender cursor-pointer p-1 text-lg rounded-full ml-auto '
                  style={{
                    boxShadow: '0px 4px 34px rgba(136, 136, 136, 0.4)',
                    backgroundColor: 'white',
                  }}
                  onClick={(e) => {
                    setOpen(false)
                    setNumber(5)
                  }}
                />{' '}
              </div>

              <div className={`border w-12/12 rounded-lg py-2 mr-auto`}>
                <input
                  type='text'
                  className={` w-full focus:outline-none px-5 text-lg`}
                  name='category'
                  placeholder='Category Name'
                  required
                  onChange={(e) => {
                    setCategory(e.target.value)
                  }}
                />
              </div>

              <form action='' className='' onSubmit={handleSave}>
                <div>
                  <h1 className='text-violet font-bold text-xl py-3 md:py-5  '>
                    Add Sub Filters
                  </h1>
                </div>

                {[...Array(number)].map((elementInArray, index) => (
                  <div
                    key={index}
                    className={`border w-12/12 rounded-lg py-2 mr-auto my-1`}
                  >
                    <input
                      type='text'
                      className={` w-full focus:outline-none px-5 text-lg`}
                      name={`subCategory${index + 1}`}
                      placeholder={`subCategory ${index + 1}`}
                      required
                    />
                  </div>
                ))}

                <button
                  onClick={() => setNumber(number + 1)}
                  className='bg-ghost/20 rounded w-full py-2 my-1'
                >
                  Add More{' '}
                </button>

                <button
                  className='bg-primary text-white  w-full py-3 rounded-lg my-6 mr-auto'
                  onClick={(e) => {
                    //   handleSave();
                  }}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </Modal>
        <Modal
          open={open1}
          onClose={() => {
            setOpen1(false)
            setNumber(5)
          }}
        >
          <div style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
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
              <form action='' className='' onSubmit={handleSave}>
                <div>
                  <h1 className='text-violet font-bold text-xl py-3 md:py-5  '>
                    Add Sub Category
                  </h1>
                </div>

                {[...Array(number)].map((elementInArray, index) => (
                  <div
                    key={index}
                    className={`border w-12/12 rounded-lg py-2 mr-auto my-1`}
                  >
                    <input
                      type='text'
                      className={` w-full focus:outline-none px-5 text-lg`}
                      name={`subCategory${index + 1}`}
                      placeholder={`subCategory ${index + 1}`}
                      required
                    />
                  </div>
                ))}

                <button
                  onClick={() => setNumber(number + 1)}
                  className='bg-ghost/20 rounded w-full py-2 my-1'
                >
                  Add More{' '}
                </button>

                <button
                  className='bg-primary text-white  w-full py-3 rounded-lg my-6 mr-auto'
                  onClick={(e) => {
                    //   handleSave();
                  }}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </AdminDashboard>
  )
}

export default EditFilters
