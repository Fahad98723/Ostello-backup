import { Menu, MenuItem, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Modal from '@mui/material/Modal'
import Select from '@mui/material/Select'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/system'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaFilter, FaSortAmountUp } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import AdminDashboard from '../../../components/pages/AdminDashboard/AdminDashboard'
import MobileWhatsappOnboarding from '../../../components/pages/AdminDashboard/Whatsapp/MobileWhatsappOnboarding'
import { fetchAdminInstitutes } from '../../../redux/slices/adminInstitutesSlice'
import { host } from '../../../utils/constant'
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

const WhatsappOnboarding = () => {
  // const [instituteNumber, setInstituteNumber] = useState('')
  const [instituteName, setInstituteName] = useState([])
  const [numbers, setNumbers] = useState([])

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


  const [adminInstitutesData, setAdminInstitutesData] = useState([])

  useEffect(() => {
    const run = async() => {

      try {
        const config = {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${window.localStorage.getItem(
              "ACCESS_TOKEN"
            )}`,
          },
        };
        const { data } = await axios.get(`${host}/institute?&limit=20`, config )
        setAdminInstitutesData(data?.message)
        
      } catch (err) {
        toast.error(err.message)
      }
      finally{
        
      }
    }
    run()
  },[])

  useEffect(() => {

    if (adminInstitutesData) {
      setData(adminInstitutesData)
    }
  }, [dispatch, adminInstitutesData])

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
    const sortedDates = adminInstitutesData
      ?.map((obj) => {
        return { ...obj, date: new Date(obj.registeredon) }
      })
      .sort((a, b) => b.date - a.date)
    setData(sortedDates)
    handleClose()
  }

  const handleByType = () => {
    const sortedType = adminInstitutesData
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
      setData(adminInstitutesData)
    }

    if (type) {
      setData(adminInstitutesData.filter((a) => a.classmode === type))
    }
  }, [type])

  useEffect(() => {
    if (!search) {
      setData(adminInstitutesData)
    } else {
      const result = !type
        ? adminInstitutesData.filter((cur) => {
            return cur.name.toLowerCase().includes(search.toLowerCase())
          })
        : adminInstitutesData
            .filter((a) => a.classmode === type)
            .filter((cur) => {
              return cur.name.toLowerCase().includes(search.toLowerCase())
            })
      setData(result)
    }

    
  }, [search])

  const sendMessageHandle = async () => {
    const uploading = toast.loading('Sending Please wait ...')
    const data = {
      phonenumber: numbers,
      messagetype: 'welcome',
      institutes: instituteName,
    }

    try {
      
      // {
      //   message: 'Message sent!',
      //   statuscode: HttpStatus.ACCEPTED,
      // }

      await axios.post(`${host}/whatsapp/send/`, data, {
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

  

  return (
    <AdminDashboard currentSection='Whatsapp Institute Onboarding'>
      <Head>
        <title>WhatsApp Onboarding - Admin Dashboard - Ostello</title>
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
              Add Onboarding
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
                Delivered
              </th>

              <th
                scope='col'
                className='text-[15px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left'
              >
                Read
              </th>
            </tr>
          </thead>
          <tbody className='block max-h-[70vh] scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-gray-100 overflow-y-auto'>
            {data?.map((d, index) => (
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
                    <p className='font-bold'> 01865233836</p>
                    <p className='text-[11px] text-[#717171]'>on 24.05.2019</p>
                  </div>
                </td>
                <td
                  onClick={() => handleOnclick(d.id)}
                  className='text-[#252733] font-medium px-6 py-4 whitespace-nowrap'
                >
                  <div className='flex flex-col'>
                    <p className='font-bold'>
                      {' '}
                      {d?.registeredon?.split('T')[0]}
                    </p>
                    <p className='text-[11px] text-[#717171]'>
                      {d?.registeredon?.split('T')[1].split('.')[0]}
                    </p>
                  </div>
                </td>
                <td
                  onClick={() => handleOnclick(d.id)}
                  className='text-[#252733] font-medium px-6 py-4 whitespace-nowrap'
                >
                  <div className='flex flex-col'>
                    <p className='font-bold'> Yes</p>
                    {/* <p className="text-[11px] text-[#717171]">{d?.locations[0].city}</p> */}
                  </div>
                </td>

                <td
                  onClick={() => handleOnclick(d.id)}
                  className='text-[#252733] font-medium px-6 py-4 whitespace-nowrap flex items-center'
                >
                  <p>unread</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <MobileWhatsappOnboarding
          adminInstitutes={data}
        ></MobileWhatsappOnboarding>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style} className={modalBox}>
          <div className=' p-3 '>
            <p className='text-2xl text-center my-5'>
              Whatsapp Institute Onboarding
            </p>
            <div
              className={` shrink w-full px-6 py-2 mb-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  
                                    
                                        `}
            >
              <h2 className=' mb-1' style={{ fontSize: '15px' }}>
                Institute Number
              </h2>

              {/* <input
                                            type="text"
                                            placeholder='Institute Number'
                                            autoFocus
                                            className="text-xl bg-white  focus:outline-none w-full"
                                            defaultValue={instituteNumber}
                                            disabled={isDisable}
                                            onChange={(e) => {
                                                setInstituteNumber(e.target.value)
                                            }}
                                        /> */}

              <Autocomplete
                multiple
                id='tags-standard'
                onChange={(event, newValue) => {
                  setNumbers(newValue)
                }}
                options={numbers}
                getOptionLabel={(tag) => tag}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    // hiddenLabel
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setNumbers([...numbers, e.target.value])
                      }
                    }}
                    // style={{ backgroundColor:"white" , outline: 'none'}}
                    // className={classes.root}
                    {...params}
                    variant='standard'
                    placeholder='Numbers'
                  />
                )}
              />
            </div>
            <div
              className={` shrink w-full px-6 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0  
                                    
                                        `}
            >
              <h2 className=' mb-1' style={{ fontSize: '15px' }}>
                Institute Name
              </h2>

              <Autocomplete
                multiple
                id='tags-standard'
                onChange={(event, newValue) => {
                  setInstituteName(newValue)
                }}
                options={instituteName}
                getOptionLabel={(tag) => tag}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    // hiddenLabel
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setInstituteName([...instituteName, e.target.value])
                      }
                    }}
                    // style={{ backgroundColor:"white" , outline: 'none'}}
                    // className={classes.root}
                    {...params}
                    variant='standard'
                    placeholder='Names'
                  />
                )}
              />
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
        </Box>
      </Modal>
    </AdminDashboard>
  )
}

export default WhatsappOnboarding
