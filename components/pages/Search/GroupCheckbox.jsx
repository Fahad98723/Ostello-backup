import React, { useEffect, useState } from 'react'
import { Checkbox } from 'antd'
import { DownOutlined, RightOutlined, UpOutlined } from '@ant-design/icons'

export default function GroupCheckbox({
  dropdownEffect = true,
  groupTitle,
  className,
  style,
  onChange = () => {},
  options,
  openState,
  haveFilter = true,
  checkedState,
}) {
  const [checkedList, setCheckedList] = useState([])
  const [indeterminate, setIndeterminate] = useState(true)
  const [checkAll, setCheckAll] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (list) => {
    
    setCheckedList(list)
    setIndeterminate(!!list.length && list.length < options.length)
    setCheckAll(list.length === options.length)
    onChange(list)
  }

  useEffect(() => {
    setCheckedList(checkedState)
  }, [checkedState])

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? options : [])
    // setIndeterminate(false)
    setCheckAll(e.target.checked)
    
  }
  return (
    <div className='z-[100] w-full'>
      {dropdownEffect ? (
        <div className='sm:p-3  w-full  bg-white sm:mx-1 '>
          <Checkbox.Group
            className='grid grid-cols-6 space-x-0 w-full space-y-2 sm:space-y-0 divide-y-[.5px] divide-gray/10 sm:divide-y-0 '
            value={checkedList}
            onChange={handleChange}
          >
            {options.map((option, i) => (
              <Checkbox
                className='pt-2 md:col-span-3 col-span-6 sm:pt-0 px-4'
                key={i}
                checked
                value={option}
              >
                {option}
              </Checkbox>
            ))}
          </Checkbox.Group>

          {/* {haveFilter && (
            <div className='w-2/4 ml-auto hidden md:block'>
              <div className='flex px-2  rounded-lg  border  border-b-0 border-l-0  border-r-0 border-gray/10  bg-white pt-2 mt-2 '>
            <button

              onClick={() => handleChange([])}
              className='text-primary text-sm px-8 py-1 border border-primary mr-2 rounded-md font-medium'
            >
              Rest
            </button>

            <button
              onClick={(e) => {
                e.preventDefault()
                handleChange(checkedList)
              }}
              className='bg-primary text-white px-8 py-1 rounded-md '
            >
              Apply
            </button>
          </div>
          </div>
          )} */}
        </div>
      ) : (
        <>
          <div className='bg-white hidden sm:block'>
            <Checkbox
              className='mb-2'
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              {groupTitle}
            </Checkbox>
            <Checkbox.Group
              className='flex flex-col space-x-0 ml-10'
              value={checkedList}
              onChange={handleChange}
            >
              {options.map((option, i) => (
                <Checkbox key={i} value={option}>
                  {option}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </div>

          <div className='bg-white sm:hidden'>
            <>
              <div className='flex justify-between'>
                <Checkbox
                  className='mb-2'
                  indeterminate={indeterminate}
                  onChange={onCheckAllChange}
                  checked={checkAll}
                >
                  <span className={`${checkAll && 'text-primary '}`}>
                    {groupTitle}
                  </span>
                </Checkbox>
                <div onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? <DownOutlined /> : <RightOutlined />}
                </div>
              </div>
              {isOpen && (
                <Checkbox.Group
                  className='flex flex-col space-x-0 ml-10 pb-5'
                  value={checkedList}
                  onChange={handleChange}
                >
                  {options.map((option, i) => (
                    <Checkbox key={i} value={option}>
                      {option}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              )}
            </>
          </div>
        </>
      )}
    </div>
  )
}

// const CheckboxCard = ({
//   indeterminate,
//   onCheckAllChange,
//   checkAll,
//   groupTitle,
// }) => {
//   const [isOpen, setIsOpen] = useState(false)
//   return (
//     <>
//       <div>
//         <Checkbox
//           onClick={() => setIsOpen(!isOpen)}
//           className='mb-2'
//           indeterminate={indeterminate}
//           onChange={onCheckAllChange}
//           checked={checkAll}
//         >
//           {groupTitle}
//         </Checkbox>
//         {isOpen ? <UpOutlined /> : <DownOutlined />}
//       </div>
//       <Checkbox.Group
//         className='flex flex-col space-x-0 ml-10'
//         value={checkedList}
//         onChange={handleChange}
//       >
//         {options.map((option, i) => (
//           <Checkbox key={i} value={option}>
//             {option}
//           </Checkbox>
//         ))}
//       </Checkbox.Group>
//     </>
//   )
// }
