import React from 'react';

const Join = () => {
    return (
        <section className='bg-white p-5 md:p-16 mt-10'>
            <section className='bg-[#7F56D9] rounded-2xl'>
      <div className='  md:flex justify-between py-10 md:px-10 px-5 items-center'>
        <div className=' '>
          <h1 className='text-[30px] mb-2 text-white'>Join our 2,000+ subscribers</h1>
          <p className='text-[#E9D7FE] text-[20px]'>Stay in the loop with everything you need to know.</p>
        </div>
        <div>
        <div className='flex flex-col lg:flex-row   space-y-5 lg:space-x-5 lg:space-y-0 mt-5 items-center'>
          <input
            type='text'
            className='border border-gray/40 outline-none join p-2 rounded-md w-full md:w-[250px] '
            placeholder='Enter your email'
          />

          <button className='px-4  py-2 rounded-md bg-primary hover:bg-white border border-primary hover:text-primary text-white duration-300 w-full md:w-fit'>
            Subscribe
          </button>
        </div>
        <p className='text-[14px] text-[#E9D7FE] mt-2'>We care about your data in our privacy policy</p>
        </div>
        
      </div>
    </section>
        </section>
    );
};

export default Join;