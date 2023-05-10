import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { addCourseSelector, setExams } from '../../../../../../redux/slices/AddCourseSlice'

const Medical = () => {
  const [isDropDown21, setIsDropDown21] = useState(false)
  const [isDropDown12, setIsDropDown12] = useState(false)

  const { exams } = useSelector(addCourseSelector)

  const dispatch = useDispatch()


  // useEffect(() => {
  //   if(selectedExam){
  //     dispatch(setExams(selectedExam))
  //   }
  // }, [dispatch, selectedExam])

  let handleChange = (e) => {
    if (e.target.checked) {
      dispatch(setExams(exams.concat(e.target.name)))
    } else {
      dispatch(setExams(exams.filter((item) => item !== e.target.name)))
    }
  }

  const isChecked = (item) => exams.includes(item)
  return (
    <form className='lg:flex  gap-3 lg:py-5 ' onChange={handleChange}>
      <div className='relative'>
        <div
          className='flex items-center  lg:w-40  rounded-lg text-lg px-3 py-2 border cursor-pointer '
          onClick={() => {
            setIsDropDown21(!isDropDown21)
            setIsDropDown12(false)
          }}
        >
          <input
            type='text'
            className='text-slate px-2  focus:outline-none cursor-pointer w-full lg:w-24 bg-white'
            placeholder='Exam'
            disabled
          />
          <MdKeyboardArrowDown
            className={`text-2xl ${isDropDown21 ? 'hidden' : 'flex'}`}
          />
          <MdKeyboardArrowUp
            className={`text-2xl ${isDropDown21 ? 'flex' : 'hidden'}`}
          />
        </div>
        <div className='block lg:absolute '>
          {isDropDown21 && (
            <div
              className='bg-white w-full m-auto rounded-lg  py-3 flex-col text-[#939393] px-5 space-y-5'
              style={{
                boxShadow: '0px 2px 40px rgba(125, 35, 224, 0.15)',
              }}
            >
              <div className='flex items-center space-x-3'>
                <input
                  type='checkbox'
                  name='NEET'
                  className='text-xl'
                  checked={isChecked('NEET')}
                />{' '}
                <label htmlFor='NEET' className='text-xl'>
                  NEET
                </label>
              </div>
              <div className='flex items-center space-x-3'>
                <input
                  type='checkbox'
                  name='NEET PG'
                  className='text-xl'
                  checked={isChecked('NEET PG')}
                />{' '}
                <label htmlFor='PG' className='text-xl'>
                  NEET PG
                </label>
              </div>
              <div className='flex items-center space-x-3'>
                <input
                  type='checkbox'
                  name='AIIMS'
                  className='text-xl'
                  checked={isChecked('AIIMS')}
                />{' '}
                <label htmlFor='AIIMS' className='text-xl'>
                  AIIMS
                </label>
              </div>
              <div className='flex items-center space-x-3'>
                <input
                  type='checkbox'
                  name='AIIMS PG'
                  className='text-xl'
                  checked={isChecked('AIIMS PG')}
                />{' '}
                <label htmlFor='AIIMS PG' className='text-xl'>
                  AIIMS PG
                </label>
              </div>
              <div className='flex items-center space-x-3'>
                <input
                  type='checkbox'
                  name='PGIMER'
                  className='text-xl'
                  checked={isChecked('PGIMER')}
                />{' '}
                <label htmlFor='PGIMER' className='text-xl'>
                  PGIMER
                </label>
              </div>
              <div className='flex items-center space-x-3'>
                <input
                  type='checkbox'
                  name='CMSE'
                  className='text-xl'
                  checked={isChecked('CMSE')}
                />{' '}
                <label htmlFor='CMSE' className='text-xl'>
                  CMSE
                </label>
              </div>
              <div className='flex items-center space-x-3'>
                <input
                  type='checkbox'
                  name='FPMT'
                  className='text-xl'
                  checked={isChecked('FPMT')}
                />{' '}
                <label htmlFor='FPMT' className='text-xl'>
                  FPMT
                </label>
              </div>
              <div className='flex items-center space-x-3'>
                <input
                  type='checkbox'
                  name='NBE FET'
                  className='text-xl'
                  checked={isChecked('NBE FET')}
                />{' '}
                <label htmlFor='NBE' className='text-xl'>
                  NBE FET
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  )
}

export default Medical
