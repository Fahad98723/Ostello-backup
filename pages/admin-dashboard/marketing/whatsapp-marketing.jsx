import { useRouter } from 'next/router'

import React, { useEffect, useRef, useState } from 'react'
import AdminDashboard from '../../../components/pages/AdminDashboard/AdminDashboard'

import { Menu, MenuItem, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Modal from '@mui/material/Modal'
import Select from '@mui/material/Select'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/system'
import axios from 'axios'
import Head from 'next/head'
import { toast } from 'react-hot-toast'
import { FaFilter, FaSortAmountUp } from 'react-icons/fa'
import { RiArrowRightSLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteIcon } from '../../../components/SVGIcons'
import { fetchAdminInstitutes } from '../../../redux/slices/adminInstitutesSlice'
import { ACCESS_TOKEN, host } from '../../../utils/constant'

export default function WhatsAppMarketing() {
  const [userNumber, setUserNumber] = useState('')
  const [userMessage, setUserMessage] = useState('')
  const [title, setTitle] = useState('')
  const [isDisable, setIsDisable] = useState(false)
  const router = useRouter()
  const navigate = (link) => router.push(link)

  const handleOnclick = (id) => {
    navigate(`/admin-dashboard/institutes/details/${id}`)
  }

  const dispatch = useDispatch()
  const { loading, adminInstitutes, error, isUpdated } = useSelector(
    (state) => state.adminInstitutes
  )

  const [data, setData] = useState([])

  const theme = useTheme()
  const useStyle = makeStyles({
    modalBox: {
      width: '50%',
      [theme.breakpoints.down('sm')]: {
        width: '80%',
        height: '60%',
        overflowY: 'scroll!important',
      },
    },
  })

  const { modalBox } = useStyle()

  const [messageData, setMessageData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
        const res = await axios.get(`${host}/whatsapp`, config)
        setMessageData(res.data.message)
      } catch (err) {
        
        toast.error(err.toString())
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    dispatch(fetchAdminInstitutes())
    if (adminInstitutes) {
      setData(adminInstitutes)
    }
  }, [dispatch, isUpdated])

  const [currentValue, setCurrentValue] = useState(false)

  // 

  const [anchorEl, setAnchorEl] = React.useState(null)
  const filterOpen1 = Boolean(anchorEl)

  const [filterAnchorEl, setFilterAnchorEl] = React.useState(null)
  const filterOpen = Boolean(filterAnchorEl)

  const [open, setOpen] = useState(false)

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget)
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
  }

  const handleByDate = () => {
    const sortedDates = adminInstitutes
      ?.map((obj) => {
        return { ...obj, date: new Date(obj.registeredon) }
      })
      .sort((a, b) => b.date - a.date)
    setData(sortedDates)
    handleClose()
  }

  const handleByType = () => {
    const sortedType = adminInstitutes
      ?.map((obj) => {
        return { ...obj }
      })
      .sort((a, b) => a.classmode - b.classmode)

    // 
    setData(sortedType)
    handleClose()
  }

  const handleChange = (event) => {
    setType(event.target.value)
  }
  const [type, setType] = React.useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!type) {
      setData(adminInstitutes)
    }

    if (type) {
      setData(adminInstitutes.filter((a) => a.classmode === type))
    }
  }, [type])

  useEffect(() => {
    if (!search) {
      setData(adminInstitutes)
    } else {
      const result = !type
        ? adminInstitutes.filter((cur) => {
            return cur.name.toLowerCase().includes(search.toLowerCase())
          })
        : adminInstitutes
            .filter((a) => a.classmode === type)
            .filter((cur) => {
              return cur.name.toLowerCase().includes(search.toLowerCase())
            })
      setData(result)
    }

    
  }, [search])

  const editor = useRef(null)
  const getValue = (value) => {
    setUserMessage(value)
  }

  const sendMessageHandle = async () => {
    const uploading = toast.loading('Sending Please wait ...')
    const d = {
      phonenumber: userNumber,
      message: userMessage,
    }

    try {
      
      // {
      //   message: 'Message sent!',
      //   statuscode: HttpStatus.ACCEPTED,
      // }

      const { data } = await axios.post(`${host}/whatsapp/send`, d, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${window.localStorage.getItem(
            'ACCESS_TOKEN'
          )}`,
        },
      })
      
      toast.success('successfully sent')
    } catch (err) {
      toast.error('something went wrong !!')
    } finally {
      toast.remove(uploading)
      // setOpen(false)
    }
  }

  

  const handleDelete = async (n) => {
    try {
      const d = {
        number: n,
      }

      
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${window.localStorage.getItem(
            'ACCESS_TOKEN'
          )}`,
        },
      }
      
      const { data } = await axios.delete(`${host}/whatsapp`, d, config)
      // 
      
    } catch (err) {
      
    }
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    p: 2,
    borderRadius: '20px',
    backgroundColor: 'white',
    color: 'black',
    overflow: 'hidden',
  }

  return (
    <AdminDashboard currentSection='Whatsapp Marketing'>
      <Head>
        <title>WhatsApp Marketing - Admin Dashboard - Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='bg-white mr-3 p-3 rounded-lg'>
        <div className='flex gap-x-1 md:px-5 px-3  justify-between'>
          <div className='flex'>
            {/* <h3 className="font-bold text-[19px] text-[#252733] mr-3">All Institutes</h3> */}
            <button
              onClick={() => setOpen(true)}
              className='px-4 py-2 text-[#525252] mr-2 text-lg font-medium rounded-lg bg-[#F0F0F0] border-0'
            >
              Add Marketing
            </button>
          </div>
          <div className='flex md:gap-x-8 gap-x-5 items-center'>
            <div
              id='basic-button'
              aria-controls={filterOpen1 ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={filterOpen1 ? 'true' : undefined}
              onClick={handleClick}
              className='flex items-center'
            >
              <FaSortAmountUp className='text-[#C5C7CD]' />
              <span className=' cursor-pointer font-bold md:block hidden ml-2'>
                Sort
              </span>
            </div>
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={filterOpen1}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => handleByDate()}>By Date</MenuItem>
              <MenuItem onClick={() => handleByType()}>By Type</MenuItem>
            </Menu>
            <div
              onClick={handleFilterClick}
              id='basic-button'
              aria-controls={filterOpen ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={filterOpen ? 'true' : undefined}
              className='flex items-center cursor-pointer'
            >
              <FaFilter className='text-[#C5C7CD]' />
              <span className='font-bold md:block hidden ml-2'>Filter</span>
            </div>
            <Menu
              id='basic-menu'
              anchorEl={filterAnchorEl}
              open={filterOpen}
              onClose={handleFilterClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <Box sx={{ minWidth: 200, padding: '10px 10px' }}>
                <FormControl sx={{ marginBottom: '10px' }} fullWidth>
                  <InputLabel id='demo-simple-select-label'>Type</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={type}
                    label='Type'
                    onChange={handleChange}
                  >
                    <MenuItem value={null}>All</MenuItem>
                    <MenuItem value={1}>Hybrid</MenuItem>
                    <MenuItem value={2}>Online</MenuItem>
                    <MenuItem value={3}>Offline</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  onChange={(e) => setSearch(e.target.value)}
                  id='outlined-basic'
                  label='Search'
                  variant='outlined'
                />
              </Box>
            </Menu>
          </div>
        </div>
        <table className='mt-10 md:block hidden table-auto'>
          <thead className='bg-white table w-full table-fixed border-b border-light-gray'>
            <tr>
              <th
                scope='col'
                className='text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left'
              >
                Name
              </th>
              <th
                scope='col'
                className='text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left'
              >
                Number
              </th>
              <th
                scope='col'
                className='text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left'
              >
                Time
              </th>
              <th
                scope='col'
                className='text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left'
              >
                Status
              </th>

              <th
                scope='col'
                className='text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left'
              >
                Read
              </th>
              <th
                scope='col'
                className='text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left'
              ></th>
            </tr>
          </thead>
          <tbody className='block max-h-[70vh] scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-gray-100 overflow-y-auto'>
            {messageData?.map((d, index) => (
              <tr
                key={index}
                className='bg-white border-b border-light-gray cursor-pointer transition duration-300 ease-in-out hover:bg-light-gray table w-full table-fixed'
              >
                <td
                  onClick={() => handleOnclick(d.id)}
                  className='px-6 py-4  font-medium text-[#252733]'
                >
                  <div className='flex items-center space-x-3'>
                    {/* <img
                      className="w-[50px] h-[50px] rounded-full"
                      src={d?.images[0]?.url}
                      alt=""
                    /> */}
                    <div className='w-full '>
                      <p className='font-bold '>{d.name}</p>
                      {/* <p className="text-[11px] text-[#717171]">
                        Updated 1 day ago
                      </p> */}
                    </div>
                  </div>
                </td>
                <td
                  onClick={() => handleOnclick(d.id)}
                  className='text-[#252733] font-medium px-6 py-4 whitespace-nowrap'
                >
                  <div className='flex flex-col'>
                    <p className='font-bold'>{d?.number}</p>
                  </div>
                </td>
                <td
                  onClick={() => handleOnclick(d.id)}
                  className='text-[#252733] font-medium px-6 py-4 whitespace-nowrap'
                >
                  <div className='flex flex-col'>
                    <p className='font-bold'> {d?.timestamp?.split('T')[0]}</p>
                    <p className='text-[11px] text-[#717171]'>
                      {d?.timestamp?.split('T')[1].split('.')[0]}
                    </p>
                  </div>
                </td>
                <td
                  onClick={() => handleOnclick(d.id)}
                  className='text-[#252733] font-medium px-6 py-4 whitespace-nowrap'
                >
                  <div className='flex flex-col'>
                    <p className='font-bold'> {d?.status}</p>
                    {/* <p className="text-[11px] text-[#717171]">{d?.locations[0].city}</p> */}
                  </div>
                </td>

                <td
                  onClick={() => handleOnclick(d.id)}
                  className='text-[#252733] font-medium px-6 py-4 whitespace-nowrap flex items-center'
                >
                  <p>unread</p>
                </td>
                <td className='text-[#252733] font-medium px-6 py-4 whitespace-nowrap'>
                  <div className=''>
                    <div
                      onClick={() => {
                        handleDelete(d.number)
                      }}
                      className='bg-white w-[40px] block p-2.5 shadow-lg cursor-pointer rounded-full'
                    >
                      <DeleteIcon />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <>
          <div className='md:hidden block p-3'>
            <h3 className='mb-3 font-bold text-[#9FA2B4]'>
              Onboarding Details
            </h3>
            <div className='flex space-y-4 flex-col'>
              {adminInstitutes?.map((data, i) => (
                <div onClick={() => handleOnclick(data?.id)} key={i}>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center justify-between'>
                      {/* <img
                    className="h-[56px] w-[56px] rounded-full"
                    src={data?.images[0]?.url}
                    alt=""
                  /> */}
                      <div>
                        <p className='text-[#252733] font-bold '>
                          {data?.name}
                        </p>
                        <p className='text-[#9766CD] text-xs font-bold '>
                          Updated 1 day ago
                        </p>
                      </div>
                    </div>
                    <div className='cursor-pointer'>
                      <RiArrowRightSLine className='scale-125 text-3xl' />
                    </div>
                  </div>
                  <div className='flex mt-3 space-x-1 justify-between'>
                    <div className='w-6/12 text-[#717171] text-sm'>
                      <div>Number :</div>
                      <div>Time :</div>
                      <div>Delivered</div>
                      <div>Read :</div>
                    </div>
                    <div className='w-6/12 font-bold text-sm'>
                      <div>01865233836</div>
                      <div>{data?.registeredon?.split('T')[0]}</div>
                      <div>Yes</div>
                      <div>Unread</div>
                    </div>
                  </div>
                  <hr className='mt-3' />
                </div>
              ))}
            </div>
          </div>
        </>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style} className={modalBox}>
          <div className=' p-3 '>
            <div className=' w-full mx-auto my-5'>
              <p className='text-2xl text-center my-5'>Whatsapp Marketing</p>
              <div
                className={` shrink w-full px-6 py-2 mb-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  
                                    
                                        `}
              >
                <h2 className=' mb-1' style={{ fontSize: '15px' }}>
                  User Number
                </h2>

                <input
                  type='text'
                  placeholder='User Number'
                  autoFocus
                  className='text-xl bg-white  focus:outline-none w-full'
                  defaultValue={userNumber}
                  disabled={isDisable}
                  onChange={(e) => {
                    setUserNumber(e.target.value)
                  }}
                />
              </div>
              <div
                className={` shrink w-full px-6 py-2 mb-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  
                                    
                                        `}
              >
                <h2 className=' mb-1' style={{ fontSize: '15px' }}>
                  Title
                </h2>

                <input
                  type='text'
                  placeholder='Title'
                  autoFocus
                  className='text-xl bg-white  focus:outline-none w-full'
                  defaultValue={title}
                  disabled={isDisable}
                  onChange={(e) => {
                    setTitle(e.target.value)
                  }}
                />
              </div>
              <div
                className={` shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  
                                    
                                        `}
              >
                <h2 className=' mb-1' style={{ fontSize: '15px' }}>
                  User Message
                </h2>

                <textarea
                  type='text'
                  placeholder='User Message'
                  autoFocus
                  rows={5}
                  className='text-xl bg-white  focus:outline-none w-full'
                  defaultValue={userMessage}
                  disabled={isDisable}
                  onChange={(e) => {
                    setUserMessage(e.target.value)
                  }}
                />

                {/* <JoditEditor
      ref={editor}
      value={""}
      config={config}
      tabIndex={2}
      //   onBlur={(newContent) => getValue(newContent)}
      onChange={(newContent) => getValue(newContent)}
    /> */}
              </div>
              <div className='bg-primary w-28 my-3 py-2 rounded-lg '>
                <button
                  className='m-auto w-full text-lg font-bold z-50 text-white'
                  onClick={sendMessageHandle}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </AdminDashboard>
  )
}
