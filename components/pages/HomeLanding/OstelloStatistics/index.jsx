import React from 'react'

export default function OstelloStatistics() {
  const data = [
    {
      heading: '600+',
      title: 'Building Brands',
      desc: "We’ve helped 600+ institutes build their brand with Ostello",
    },
    {
      heading: '100+',
      title: 'Return on Investment ',
      desc: 'Our customers are claiming an average of 100+ ROI',
    },
    {
      heading: '10k+',
      title: 'Global Searches',
      desc: '10K+ global searches weekly',
    },
    {
      heading: '300+',
      title: '5 -star reviews',
      desc: "We’ve over 300+ reviews with a 5- star rating",
    },
  ]
  const StatsCard = ({ heading, title, desc }) => {
    return (
      <>
        <div className='p-2 md:w-[250px] text-center md:text-left'>
          <h1 className='text-4xl lg:text-6xl  text-primary font-bold '>
            {heading}
          </h1>
          <h2 className=' mt-2 lg:text-lg whitespace-nowrap font-bold'>
            {title}
          </h2>
          <p className='text-gray lg: mt-2 hidden md:block'>{desc}</p>
        </div>
      </>
    )
  }

  return (
    <section className=' lg:px-10 px-5 md:my-20 my-10'>
      <div>
        <h1 className='lg:text-4xl  text-xl font-bold leading-6'>
          Become the torch bearer of your future with Ostello
        </h1>
        <p className='lg:text-lg mt-5 text-gray'>
          Coaching is the backbone of the education system. Lets make this
          backbone a part of your brilliant success story!
        </p>
      </div>

      <div className='bg-[#F4EBFF] flex w-full   p-5 py-10 mt-10 md:justify-around  flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 rounded-md'>
        {data.map((item, key) => (
          <StatsCard key={key} {...item} />
        ))}
      </div>
    </section>
  )
}
