import React from 'react';
import Link  from 'next/link';
import image from '../../../assets/nodata.png'

import { useRouter } from 'next/router';
const NoData = ({text}) => {
    const router = useRouter()
    return (
        <div className='mb-16'>
            <img src={image.src} className='mx-auto' alt="" />

            <div className='text-center mb-5'>
                <p className='text-3xl font-semibold my-5'> {text}</p>
           <p onClick={() => {
                  router.push('/merchant')
                }} className='px-4 py-2 w-[200px] mx-auto bg-primary text-white text-xl rounded'>Start Browsing</p> 
            </div>
        </div>
    );
};

export default NoData;