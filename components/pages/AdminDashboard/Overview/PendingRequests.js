import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { BsFillCircleFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdminInstitutes } from '../../../../redux/slices/adminInstitutesSlice'
import { HybridIcon } from '../../../SVGIcons'
import Loader from '../../../Loader'
import { isEmpty } from '../../../../utils/utils'
import axios from 'axios'
import { host } from '../../../../utils/constant'

const PendingRequests = () => {
  const dispatch = useDispatch()
  const {  adminInstitutes, error, isUpdated } = useSelector(
    (state) => state.adminInstitutes
  )

  
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const run = async() => {
      setLoading(true)
      try {
        const config = {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${window.localStorage.getItem(
              "ACCESS_TOKEN"
            )}`,
          },
        };
        const { data } = await axios.get(`${host}/institute?approval=4&limit=50`, config )
        setData(data?.message)
     
      } catch (err) {
        toast.error(err.message)
      }
      finally{
        setLoading(false)
      }
    }
    run()
  },[])

 

  if (isEmpty(data)) return null



  return (
    <div className='lg:w-5/12 w-full'>
      <div className='bg-white md:p-3 p-5 rounded-lg'>
        <div className='md:px-8'>
          <div className='flex justify-between items-center'>
            <h4 className='capitalize font-bold text-[21px]'>
              Pending Requests{' '}
            </h4>
            <Link legacyBehavior prefetch={false}
              className='text-[#AD62FF] font-medium text-[14px]'
              href='/admin-dashboard/requests/institute-requests'
            >
              View All
            </Link>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className='max-h-[320px] overflow-y-auto'>
            {data.length ===
            0 ? (
              <div className='py-8 font-medium flex justify-center'>
                No pending requests are available now
              </div>
            ) : (
              <div className='space-y-3 pt-5 '>
                {data
                  ?.filter((d) => d?.approval === 4)
                  .map((d, index, self) => (
                    <div
                      key={index}
                      className={`  
           ${self.length - 1 !== index && 'border-b border-light-gray'}
           flex items-center gap-x-2 pb-2`}
                    >
                      <div className='space-y-1 md:px-8 flex w-full items-center justify-between'>
                        {!isEmpty(d.locations) && (
                          <p className='font-semibold text-[14px]'>
                            {d.name} ,{' '}
                            {isEmpty(d) &&
                              JSON?.parse(d?.locations)?.state}
                          </p>
                        )}

                        <div className='py-[2.5px] text-[#9FA2B4]'>
                          <div className='flex  md:mt-1 mb-2 mt-[-4px] items-center'>
                            {d.classmode === 1 ? (
                              <HybridIcon />
                            ) : (
                              <BsFillCircleFill
                                className={`text-[6px] ${
                                  d.classmode === 2
                                    ? 'text-[#3AC817]'
                                    : 'text-[#FF0000]-600'
                                }`}
                              />
                            )}
                            <span className='ml-2 capitalize text-[#414141]'>
                              {d.classmode === 1
                                ? 'Hybrid'
                                : d.classmode === 2
                                ? 'Online'
                                : 'Offline'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PendingRequests
