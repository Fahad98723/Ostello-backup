import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {
  addCourseSelector,
  setBoards,
  setClasses,
  setDivision,
  setSubjects
} from '../../../../../../redux/slices/AddCourseSlice'
import CourseSubject from '../CourseAdding/DropDowns/CourseSubject'

const Acadamics = (
  // {selectedClass, selectedSubject, selectedBoard, setClass, setBoard, setSubject}
  ) => {

  const [isDropDown10, setIsDropDown10] = useState(false)
  const [isDropDown20, setIsDropDown20] = useState(false)
  const [isDropDown30, setIsDropDown30] = useState(false)
  const [isDropDown40, setIsDropDown40] = useState(false)
  const isChecked = (array, existingItem) => array.includes(existingItem)
  const { classes, boards, division } = useSelector(addCourseSelector)


  const dispatch = useDispatch()

  // useEffect(() => {
  //   if(selectedClass){
  //     dispatch(setClasses(selectedClass))
  //   }
  //   if(selectedSubject){
  //     dispatch(setSubjects(selectedSubject))
  //   }
  //   if(selectedBoard){
  //     dispatch(setBoards(selectedBoard))
  //   }
  // },[selectedBoard, selectedClass, dispatch, selectedSubject])

  
  // 

  return (
    <>
      <div className='lg:flex  gap-3 bg-white rounded-lg  lg:my-5'>
        <div className='reltive'>
          <div
            className={` px-4 py-3 w-full mb-5 lg:mb-5 lg:w-40  rounded-lg text-base cursor-pointer font-normal text-white bg-primary flex   first-letter:transition ease-in-out m-0`}
            onClick={() => {
              setIsDropDown10(!isDropDown10)
              setIsDropDown20(false)
              setIsDropDown30(false)
              setIsDropDown40(false)
            }}
          >
            Select Class
          </div>
          <div className='block lg:absolute '>
            {isDropDown10 && (
              <div
                className='bg-white mb-5 lg:mb-5 lg:w-40 rounded-lg py-3 flex-col text-[#939393] px-5 space-y-5 whitespace-nowrap'
                style={{
                  boxShadow: '0px 2px 40px rgba(125, 35, 224, 0.15)',
                }}
                onChange={(e) => {
                  if (e.target.checked) {
                    dispatch(setClasses(classes.concat(e.target.name)))
                    // setClass(classes.concat(e.target.name))
                  } else {
                    dispatch(
                      setClasses(
                        classes.filter((item) => item !== e.target.name)
                      )
                    )
                    // setClass(
                    //   classes.filter((item) => item !== e.target.name)
                    // )
                  }
                }}
              >
                <div className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    onChange={() => {}}
                    name='Pre-nursery'
                    className='text-xl Pre-nursery'
                    checked={isChecked(classes, 'Pre-nursery')}
                  />{' '}
                  <label htmlFor='Pre-nursery' className='text-xl'>
                    Pre-nursery
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    name='Nursery'
                    className='text-xl Nursery'
                    checked={isChecked(classes, 'Nursery')}
                    onChange={() => {}}
                  />{' '}
                  <label htmlFor='Nursery' className='text-xl'>
                    Nursery
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    name='KG'
                    className='text-xl KG'
                    checked={isChecked(classes, 'KG')}
                    onChange={() => {}}
                  />{' '}
                  <label htmlFor='KG' className='text-xl'>
                    KG
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    name='Class 1'
                    className='text-xl Class 1'
                    checked={isChecked(classes, 'Class 1')}
                    onChange={() => {}}
                  />{' '}
                  <label htmlFor='Class 1' className='text-xl'>
                    Class 1
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    name='Class 2'
                    className='text-xl Class 2'
                    checked={isChecked(classes, 'Class 2')}
                    onChange={() => {}}
                  />{' '}
                  <label htmlFor='Class 2' className='text-xl'>
                    Class 2
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    onChange={() => {}}
                    name='Class 3'
                    className='text-xl Class 3'
                    checked={isChecked(classes, 'Class 3')}
                  />{' '}
                  <label htmlFor='Class 3' className='text-xl'>
                    Class 3
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    onChange={() => {}}
                    name='Class 4'
                    className='text-xl Class 4'
                    checked={isChecked(classes, 'Class 4')}
                  />{' '}
                  <label htmlFor='Class 4' className='text-xl'>
                    Class 4
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    onChange={() => {}}
                    name='Class 5'
                    className='text-xl Class 5'
                    checked={isChecked(classes, 'Class 5')}
                  />{' '}
                  <label htmlFor='Class 5' className='text-xl'>
                    Class 5
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    onChange={() => {}}
                    name='Class 6'
                    className='text-xl'
                    checked={isChecked(classes, 'Class 6')}
                  />{' '}
                  <label htmlFor='Class 6' className='text-xl'>
                    Class 6
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    onChange={() => {}}
                    name='Class 7'
                    className='text-xl'
                    checked={isChecked(classes, 'Class 7')}
                  />{' '}
                  <label htmlFor='Class 7' className='text-xl'>
                    Class 7
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    onChange={() => {}}
                    name='Class 8'
                    className='text-xl'
                    checked={isChecked(classes, 'Class 8')}
                  />{' '}
                  <label htmlFor='Class 8' className='text-xl'>
                    Class 8
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    onChange={() => {}}
                    name='Class 9'
                    className='text-xl'
                    checked={isChecked(classes, 'Class 9')}
                  />{' '}
                  <label htmlFor='Class 9' className='text-xl'>
                    Class 9
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    onChange={() => {}}
                    name='Class 10'
                    className='text-xl'
                    checked={isChecked(classes, 'Class 10')}
                  />{' '}
                  <label htmlFor='Class 10' className='text-xl'>
                    Class 10
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    onChange={() => {}}
                    name='Class 11'
                    className='text-xl'
                    checked={isChecked(classes, 'Class 11')}
                  />{' '}
                  <label htmlFor='Class 11' className='text-xl'>
                    Class 11
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    onChange={() => {}}
                    name='Class 12'
                    className='text-xl'
                    checked={isChecked(classes, 'Class 12')}
                  />{' '}
                  <label htmlFor='Class 12' className='text-xl'>
                    Class 12
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        { classes.includes('Class 11') || classes.includes('Class 12') ?
                  <div className=''>
                  <div
                    className='flex items-center mb-5 lg:mb-5 rounded-lg cursor-pointer text-lg px-3 py-2 border '
                    onClick={() => {
                      setIsDropDown20(false)
                      setIsDropDown40(!isDropDown40)
                      setIsDropDown30(false)
                      setIsDropDown10(false)
                    }}
                  >
                    <input
                      type='text'
                      className='text-slate focus:outline-none cursor-pointer w-full lg:w-36 bg-white'
                      placeholder='Select Division'
                      disabled
                    />
                    <MdKeyboardArrowDown
                      className={`text-2xl ${isDropDown40 ? 'hidden' : 'flex'}`}
                    />
                    <MdKeyboardArrowUp
                      className={`text-2xl ${isDropDown40 ? 'flex' : 'hidden'}`}
                    />
                  </div>
        
                  <div
                    className=' lg:absolute left-0 w-full h-auto bg-white  '
                    style={{
                      boxShadow: '0px 2px 40px rgba(125, 35, 224, 0.15)',
                    }}
                  >
                    {isDropDown40 &&            <div
                className='bg-white w-full m-auto rounded-lg  py-3 flex-col text-[#939393] px-5 space-y-5'
                style={{
                  boxShadow: '0px 2px 40px rgba(125, 35, 224, 0.15)',
                }}
                onChange={(e) => {
                  if (e.target.checked) {
                    dispatch(setDivision(division.concat(e.target.name)))
                    // setBoard(boards.concat(e.target.name))
                  } else {
                    dispatch(setDivision(division.filter((item) => item !== e.target.name)))
                    // setBoard(boards.filter((item) => item !== e.target.name))
                  }
                  
                }}
              >
            <div className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    onChange={() => {}}
                    name='Science'
                    className='text-xl'
                    checked={isChecked(division, 'Science')}
                  />{' '}
                  <label htmlFor='Science' className='text-xl'>
                    Science
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    onChange={() => {}}
                    name='Commerce'
                    className='text-xl'
                    checked={isChecked(division, 'Commerce')}
                  />{' '}
                  <label htmlFor='Commerce' className='text-xl'>
                    Commerce
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    onChange={() => {}}
                    name='Humanities'
                    className='text-xl'
                    checked={isChecked(division, 'Humanities')}
                  />{' '}
                  <label htmlFor='Humanities' className='text-xl'>
                    Humanities
                  </label>
                </div>
            </div>}
                  </div>
                </div> : ''
        }

        <div className=''>
          <div
            className='flex items-center mb-5 lg:mb-5 rounded-lg cursor-pointer text-lg px-3 py-2 border '
            onClick={() => {
              setIsDropDown20(!isDropDown20)
              setIsDropDown30(false)
              setIsDropDown10(false)
              setIsDropDown40(false)
              
            }}
          >
            <input
              type='text'
              className='text-slate focus:outline-none cursor-pointer w-full lg:w-36 bg-white'
              placeholder='Select Subjects'
              disabled
            />
            <MdKeyboardArrowDown
              className={`text-2xl ${isDropDown20 ? 'hidden' : 'flex'}`}
            />
            <MdKeyboardArrowUp
              className={`text-2xl ${isDropDown20 ? 'flex' : 'hidden'}`}
            />
          </div>

          <div
            className=' lg:absolute left-0 w-full h-auto bg-white  '
            style={{
              boxShadow: '0px 2px 40px rgba(125, 35, 224, 0.15)',
            }}
          >
            {isDropDown20 && <CourseSubject/>}
          </div>
        </div>

        <div className='relative'>
          <div
            className='flex items-center  lg:w-44  rounded-lg text-lg px-3 py-2 border cursor-pointer '
            onClick={() => {
              setIsDropDown30(!isDropDown30)
              setIsDropDown20(false)
              setIsDropDown10(false)
              setIsDropDown40(false)
            }}
          >
            <input
              type='text'
              className='text-slate focus:outline-none cursor-pointer w-full lg:w-32 bg-white'
              placeholder='Select Board'
              disabled
            />
            <MdKeyboardArrowDown
              className={`text-2xl ${isDropDown30 ? 'hidden' : 'flex'}`}
            />
            <MdKeyboardArrowUp
              className={`text-2xl ${isDropDown30 ? 'flex' : 'hidden'}`}
            />
          </div>
          <div className='block lg:absolute '>
            {isDropDown30 && (
              <div
                className='bg-white w-full m-auto rounded-lg  py-3 flex-col text-[#939393] px-5 space-y-5'
                style={{
                  boxShadow: '0px 2px 40px rgba(125, 35, 224, 0.15)',
                }}
                onChange={(e) => {
                  if (e.target.checked) {
                    dispatch(setBoards(boards.concat(e.target.name)))
                    // setBoard(boards.concat(e.target.name))
                  } else {
                    dispatch(setBoards(boards.filter((item) => item !== e.target.name)))
                    // setBoard(boards.filter((item) => item !== e.target.name))
                  }
                  
                }}
              >
                <div className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    onChange={() => {}}
                    name='CBSE'
                    className='text-xl'
                    checked={isChecked(boards, 'CBSE')}
                  />{' '}
                  <label htmlFor='CBSE' className='text-xl'>
                    CBSE
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    onChange={() => {}}
                    name='ICSE'
                    className='text-xl'
                    checked={isChecked(boards, 'ICSE')}
                  />{' '}
                  <label htmlFor='ICSE' className='text-xl'>
                    ICSE
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    onChange={() => {}}
                    name='NIOS'
                    className='text-xl'
                    checked={isChecked(boards, 'NIOS')}
                  />{' '}
                  <label htmlFor='NIOS' className='text-xl'>
                    NIOS
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    onChange={() => {}}
                    name='State'
                    className='text-xl'
                    checked={isChecked(boards, 'State')}
                  />{' '}
                  <label htmlFor='State' className='text-xl'>
                    State
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Acadamics
