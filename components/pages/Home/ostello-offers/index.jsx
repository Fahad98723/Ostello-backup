import React from 'react'
import Carousel from 'react-elastic-carousel'
import Data from './data'
import Card from './card'
import { Container } from './index.styled'

const OstelloOffers = () => {
  return (
    <section className='offer overflow-x-hidden my-10'>
      <h2 className='font-dm-sans font-semibold text-2xl md:text-4xl text-left md:text-center mb-8 md:mb-14 ml-4 md:ml-0'>
        Exciting offers by Ostello
      </h2>
      <Carousel
        showArrows={false}
        showEmptySlots={false}
        enableAutoPlay
        breakPoints={[
          { width: 1, itemsToShow: 1 },
          { width: 350, itemsToShow: 2 },
          { width: 768, itemsToShow: 3 },
          { width: 900, itemsToShow: 3 },
          { width: 1200, itemsToShow: 4 },
        ]}
      >
        {Data.map((d, idx) => (
          <div className='' key={idx}>
            <Card currentValue={d} />
          </div>
        ))}
      </Carousel>
    </section>
  )
}

export default OstelloOffers
