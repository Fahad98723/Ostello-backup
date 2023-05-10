import React, { useState } from 'react'
import medicalImg from '../../../assets/images/medical.png'
import engeImg from '../../../assets/images/enge.png'
import webDevImg from '../../../assets/images/webDev.png'
import academicImg from '../../../assets/images/academic.png'
import programmingImg from '../../../assets/images/programming.png'
import webDesignImg from '../../../assets/images/webDesign.png'
import { useEffect } from 'react'
import { isJsonParsable, isEmpty, titleToUrl } from '../../../../utils/utils'

import { skills } from '../../Search/Data'
import { data } from 'autoprefixer'

import { setCategory } from '../../../../redux/slices/SearchSlice'
import { useDispatch } from 'react-redux'
import Link from 'next/link'

export default function AboutUs({ institute }) {
  const [readMore, setReadMore] = useState(false)
  const statisticalData = [
    {
      heading: institute?.studentsenrolled || 0,
      subTitle: 'Students enrolled',
    },
    {
      heading: institute.courses?.length,
      subTitle: 'Number of courses',
    },
    {
      heading: 3 || '4.6+',
      subTitle: 'Average Rating',
    },
    {
      heading: 0,
      subTitle: 'Achievements',
    },
  ]

  const platforms = [
    {
      title: 'Medical',
      image: medicalImg,
    },
    {
      title: 'Engineering',
      image: engeImg,
    },
    {
      title: 'Web Development',
      image: webDevImg,
    },
    {
      title: 'Academics',
      image: academicImg,
    },
    {
      title: 'Programming Languages',
      image: programmingImg,
    },
    {
      title: 'Web Design',
      image: webDesignImg,
    },
  ]
  const [description, setDescription] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    if (isJsonParsable(institute.description)) {
      setDescription(JSON.parse(institute.description))
    } else {
      setDescription([institute.description])
    }
  }, [institute])

  const [specializedItems, setSpecializedItems] = useState([])

  useEffect(() => {
    if (!isEmpty(institute.services)) {
      let domainNames = []
      institute.services.forEach((item) => {
        if (!isEmpty(item.domainName)) {
          domainNames.push(item.domainName)
        }
        if (!isEmpty(item.fields)) {
          domainNames.push(...item.fields)
        }
        if (!isEmpty(item.skills)) {
          domainNames.push(...item.skills)
        }
        if (
          item.domainName === 'Junior Secondary School (Class 6-10th)' ||
          item.domainName === 'Senior Secondary School (Class 11-12th)'
        ) {
          domainNames.push('academics')
        }
      })
      data = []
      domainNames.forEach((itm) => {
        let domain = skills.filter((skill) =>
          skill?.title?.toLowerCase().includes(itm?.toLowerCase())
        )

        !isEmpty(domain) && data.push(...domain)
      })
      setSpecializedItems([...new Set(data)])
    }
  }, [institute])

  return (
    <div className=' py-10 space-y-5 container mx-auto md:px-10 '>
      <div
        name='About Us'
        className='flex container mx-auto md:justify-around flex-wrap justify-center  '
      >
        <div className='md:w-6/12 mx-5'>
          <h1 className='text-4xl font-bold mb-10'>About Us</h1>
          <div className=' space-y-4'>
            {description.map((item, idx) => (
              <p className='' key={idx}>
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className='grid grid-cols-2 grid-rows-2 h-fit md:gap-10 gap-5 mx-5 mt-5 '>
          {statisticalData.map((item, i) => (
            <div
              key={i}
              className='md:p-8 p-3  bg-white rounded-lg text-center md:space-y-5 space-y-3 shadow-3xl '
            >
              <h1 className='md:text-5xl text-3xl font-bold text-[#F99DCB]'>
                {item.heading}
              </h1>
              <p>{item.subTitle}</p>
            </div>
          ))}
        </div>
      </div>
      {!isEmpty(specializedItems) && (
        <div name='Categories' className='mx-5  py-10'>
          <h1 className='text-center mb-10 text-4xl py-10 font-bold'>
            We specialize in
          </h1>
          <div className='grid lg:grid-cols-3 grid-cols-2 place-items-center md:gap-10 gap-8'>
            {specializedItems.map((item, i) => (
              <Link legacyBehavior prefetch={false}
                href={`/search`}
                onClick={() => {
                  dispatch(setCategory(item.title))
                }}
                key={i}
              >
                <a href='' className='relative md:h-[100px] h-[60px] md:w-[300px] w-full  rounded-xl'>
                  <img
                    className='h-full w-full'
                    src={item.image.src}
                    alt={item.title}
                  />
                  <p className='absolute lg:text-xl sm:text-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center '>
                    {item.title}
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
