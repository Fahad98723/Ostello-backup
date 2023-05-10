import React from 'react';
import Link  from 'next/link';
import Data from './data';


const Cards = () => {
    return (
        <div className='flex justify-center items-center flex-wrap w-12/12 md:w-11/12 mb-16'>
            {Data.map((d,idx) => (
                <div key={idx} className="bg-white rounded-2xl p-1 w-36 h-36 md:w-64 md:h-64 shadow flex flex-col justify-center items-center m-2 md:m-7">
                    <img className='w-16 h-16 md:w-32 md:h-32' src={d.src.src} alt="vector" />
                    <Link legacyBehavior prefetch={false} href="/faq" className='font-dm-sans font-medium text-center text-lg mt-2 md:mt-8'>{d.title}</Link>
                </div>
            ))}
        </div>
    )
}

export default Cards