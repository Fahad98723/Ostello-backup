import { Rating } from '@mui/material'
import { Progress } from 'antd'
import Container from '../../../layout/Container'
import { isEmpty } from '../../../../utils/utils'
import RatingBox from './RatingBox'
import ReviewSection from './ReviewSection'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, getUser } from '../../../../redux/slices/authSlice'
export default function Reviews({ isForInstitute, id, reviews }) {
  const progresses = [
    {
      percentage: 0,
    },
    {
      percentage: 0,
    },
    {
      percentage: 0,
    },
    {
      percentage: 0,
    },
    {
      percentage: 0,
    },
  ]

  // const RatingBox = dynamic(import('./RatingBox'))

  return (
    <section name='Reviews' className=' bg-[#ffff] my-10  '>
      <Container>
        <h1 className='lg:text-5xl text-4xl text-center font-medium mb-10'>
          Reviews
        </h1>
        <div className=''>
          <div className='  flex justify-around items-center flex-col lg:flex-row space-y-10 md:space-y-0 lg:mx-10 '>
            <div className='flex items-center justify-center  gap-2 space-x-1 '>
              <div className='text-center flex md:justify-center items-center flex-col justify-between  my-5 '>
                <p className='md:text-7xl text-2xl my-0   font-bold '>3.0</p>
                <Rating
                  onChange={() => null}
                  readOnly
                  precision={0.5}
                  className='text-yellow-300 text-xl md:text-3xl'
                  value={3.0}
                />
                <p className='md:text-xl text-md w-[105px] md:w-[150px] font-bold m-0 p-0 '>
                  Course Rating
                </p>
              </div>

              <div className=''>
                {progresses.map((item, i) => (
                  <div key={i} className='flex items-center gap-2 my-1'>
                    <Progress
                      strokeColor='#7D23E0'
                      strokeWidth={10}
                      className='text-xs lg:text-lg md:w-[200px] xl:w-[400px]   hidden md:block'
                      percent={item.percentage}
                      showInfo={false}
                    />
                    <Progress
                      strokeColor='#7D23E0'
                      strokeWidth={5}
                      className=' text-xs lg:text-lg w-[100px]  md:hidden'
                      percent={item.percentage}
                      showInfo={false}
                    />

                    <Rating
                      readOnly
                      onChange={() => null}
                      className='text-sm md:text-2xl text-yellow-300 flex '
                      value={0}
                    />

                    <p className='w-[50px] text-lg font-bold hidden lg:block ml-3'>
                      {item.percentage}%
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className=''>
              <RatingBox isForInstitute={isForInstitute} id={id} />
            </div>
          </div>
          {!isEmpty(reviews) && (
            <div>
              <ReviewSection reviews={reviews} />
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
