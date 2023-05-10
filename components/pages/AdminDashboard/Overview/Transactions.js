import React from 'react'

const allData = [
  // {
  //   name: "Tarun K",
  //   course: "UX Design Program",
  //   institute: "ALLEN Institute",
  //   date: "Mar 31, 2022",
  //   amount: "Rs. 4999",
  // },
  // {
  //   name: "Tarun K",
  //   course: "UX Design Program",
  //   institute: "ALLEN Institute",
  //   date: "Mar 31, 2022",
  //   amount: "Rs. 4999",
  // },
  // {
  //   name: "Tarun K",
  //   course: "UX Design Program",
  //   institute: "ALLEN Institute",
  //   date: "Mar 31, 2022",
  //   amount: "Rs. 4999",
  // },
  // {
  //   name: "Tarun K",
  //   course: "UX Design Program",
  //   institute: "ALLEN Institute",
  //   date: "Mar 31, 2022",
  //   amount: "Rs. 4999",
  // },
  // {
  //   name: "Tarun K",
  //   course: "UX Design Program",
  //   institute: "ALLEN Institute",
  //   date: "Mar 31, 2022",
  //   amount: "Rs. 4999",
  // },
  // {
  //   name: "Tarun K",
  //   course: "UX Design Program",
  //   institute: "ALLEN Institute",
  //   date: "Mar 31, 2022",
  //   amount: "Rs. 4999",
  // },
  // {
  //   name: "Tarun K",
  //   course: "UX Design Program",
  //   institute: "ALLEN Institute",
  //   date: "Mar 31, 2022",
  //   amount: "Rs. 4999",
  // },
  // {
  //   name: "Tarun K",
  //   course: "UX Design Program",
  //   institute: "ALLEN Institute",
  //   date: "Mar 31, 2022",
  //   amount: "Rs. 4999",
  // },
  // {
  //   name: "Tarun K",
  //   course: "UX Design Program",
  //   institute: "ALLEN Institute",
  //   date: "Mar 31, 2022",
  //   amount: "Rs. 4999",
  // },
  // {
  //   name: "Tarun K",
  //   course: "UX Design Program",
  //   institute: "ALLEN Institute",
  //   date: "Mar 31, 2022",
  //   amount: "Rs. 4999",
  // },
]

const Transactions = () => {
  return (
    <>
      <div className='bg-white  p-3 rounded-lg hidden md:block'>
        <h4 className='capitalize font-bold text-[21px] px-5 pt-3'>
          Transactions by Users
        </h4>
        <table>
          <thead className='bg-white table w-full table-fixed border-b border-light-gray'>
            <tr>
              <th
                scope='col'
                className='text-[18px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left'
              >
                User Name
              </th>
              <th
                scope='col'
                className='text-[18px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left'
              >
                Course
              </th>
              <th
                scope='col'
                className='text-[18px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left'
              >
                Institute
              </th>
              <th
                scope='col'
                className='text-[18px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left'
              >
                Date
              </th>
              <th
                scope='col'
                className='text-[18px] !w-[20%] font-medium text-[#ABABAB] px-6 py-4 text-left'
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody className='block min-h-[300px] max-h-[300px] scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-gray-100 overflow-y-scroll'>
            {allData.map((data, index) => (
              <tr
                key={index}
                className='bg-white border-b border-light-gray transition duration-300 ease-in-out hover:bg-light-gray table w-full table-fixed'
              >
                <td className='px-6 py-4 whitespace-nowrap font-medium text-[#252733]'>
                  {data.name}
                </td>
                <td className='text-[#252733] font-medium px-6 py-4 whitespace-nowrap'>
                  {data.course}
                </td>
                <td className='text-[#252733] font-medium px-6 py-4 whitespace-nowrap'>
                  {data.institute}
                </td>
                <td className='text-[#252733] font-medium px-6 py-4 whitespace-nowrap'>
                  {data.date}
                </td>
                <td className='text-[#252733] font-medium px-6 py-4 whitespace-nowrap'>
                  {data.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Transaction */}

      <div className='bg-white rounded-lg p-5 md:hidden'>
        <div className='flex justify-between items-center mb-12'>
          <h4 className='text-[19px] text-[#414141 ] font-medium'>
            Transactions by Users
          </h4>
          <button className='text-[14px] font-medium text-[#AD62FF]'>
            View All
          </button>
        </div>
        {allData.map((data, index) => (
          <div key={index} className='border-b border-light-gray pt-2'>
            <div className='flex flex-col space-y-3'>
              <div className='flex justify-between'>
                <div className='text-[14px] font-medium text-[#252733]'>
                  {data.name}
                </div>
                <div className=' text-[#252733] font-medium'>{data.amount}</div>
              </div>
              <div className='flex justify-between pb-2'>
                <div>
                  <h3 className='text-[14px] text-[#252733] font-semibold'>
                    {data.course}
                  </h3>
                  <p className='text-[12px] text-[#6B7280]'>{data.institute}</p>
                </div>
                <div className='text-[10px] flex items-end text-[#9E9E9E]'>
                  {data.date}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Transactions
