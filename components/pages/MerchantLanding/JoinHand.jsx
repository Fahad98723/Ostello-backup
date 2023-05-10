import React from 'react';
import image1 from '../../../assets/Pages/MerchantLanding/join(3).svg'
import image2 from '../../../assets/Pages/MerchantLanding/join(2).svg'
import image3 from '../../../assets/Pages/MerchantLanding/join(1).svg'
import image4 from '../../../assets/Pages/MerchantLanding/join(4).svg'
import { VscGraphLine } from 'react-icons/vsc'
import { AiOutlineAreaChart } from 'react-icons/ai'
import { MdBlurLinear } from 'react-icons/md'
import { MdPayment } from 'react-icons/md'
const JoinHand = () => {
    const data = [
        {
          icon:<VscGraphLine/>,
          heading: 'Increased Visibility',
          title: 'Speak to our friendly team',
          desc: "A platform for increasing your visibility to students",
        },
        { icon:<AiOutlineAreaChart/>,
          heading: 'National Reach',
          title: 'We are to help',
          desc: 'Reach out to students around the country',
        },
        { icon:<MdBlurLinear/>,
          heading: 'Create Your Own URL',
          title: 'Visit our office HQ',
          desc: 'Create a unique URL for easily listing you institute',
        },
        { icon:<MdPayment/>,
          heading: 'Secure Payment',
          title: 'Mon-Fri from 8am to 5pm.',
          desc: "Simple and secure payment methods",
        },
      ]
      const StatsCard = ({ heading, title, desc, icon }) => {
        return (
          <>
            <div className='p-5 text-center md:text-left bg-[#F9F5FF]' >
                {/* <img className='mb-5 md:mx-0 mx-auto' src={image.src} alt="" /> */}

                <div className='text-white p-3 text-2xl bg-primary w-[50px] mx-auto md:mx-0 rounded mb-2'>
                  {icon}
                </div>
              <h1 className='text-[20px] text-primary font-bold text-[#42307D] '>
                {heading}
              </h1>
              {/* <h2 className=' mt-1 lg:text-lg whitespace-nowrap  text-[#6941C6]'>
                {title}
              </h2> */}
              <p className=' text-[16px] text-[#6941C6] mt-2  '>{desc}</p>
            </div>
          </>
        )
      }
    
    return (
        <section className='container mx-auto lg:px-10 px-5 md:my-20 my-8' >
        <div>
          <h1 className='lg:text-4xl  text-xl font-bold leading-6'>
          Why join hands with Ostello
          </h1>
          {/* <p className='lg:text-lg mt-5 text-gray md:w-2/4'>
          Why join hands with Ostello? Increased visibility, national reach, create your own url, secure payments
          </p> */}
        </div>
  
        <div className=' w-full  grid md:grid-cols-4 grid-cols-1 mx-auto gap-5  py-10  rounded-md'>
          {data.map((item, key) => (
            <StatsCard key={key} {...item} />
          ))}
        </div>
      </section>
    );
};

export default JoinHand;