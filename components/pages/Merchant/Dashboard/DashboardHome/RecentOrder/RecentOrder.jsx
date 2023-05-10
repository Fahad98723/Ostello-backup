import React, { useState } from 'react';
import {AiOutlineArrowDown} from 'react-icons/ai'
import {AiOutlineArrowUp} from 'react-icons/ai'
const RecentOrder = ({revenueData}) => {
    const [slice, setSlice] = useState(2)
    const image = {
        height : '30px',
        width : '30px',
        borderRadius : '5px'
    }
    const data = [
        // {image : 'img1', name : '', price : 0, totalOrder : 0,  totalAmount :' 0'},
        // {image : 'img1', name : '', price : 0, totalOrder : 0,  totalAmount :' 0'},
        // {image : 'img1', name : '', price : 0, totalOrder : 0,  totalAmount :' 0'},
        // {image : 'img1', name : '', price : 0, totalOrder : 0,  totalAmount :' 0'}
    ]

    return (
        <div>
            <div className=" bg-white p-4 rounded-2xl col-span-6 lg:col-span-6 md:col-span-3">
        <div className="flex  justify-between">
          <p style={{ fontWeight: "700", fontSize: "20px" }}>Recent Order</p>
          
          <div className="select-dropdown">
          <select>
            <option className="option" value="Option 1">Today</option>
            <option className="option" value="Option 1">Last Week</option>
            <option className="option" value="Option 2">Last Month</option>
          </select>
        </div>

        </div>
        <div className='mb-5'>
            <p className='text-xs hidden sm:block'>January</p>
        </div>

<div className="px-1  hidden sm:block">
<div className="grid grid-cols-12  gap-6  ">
          
          <div className="bg-white   rounded-2xl col-span-8 sm:col-span-3">
                    <p className='text-xs font-bold  text-left '>COURSE NAME</p>
          </div>
          <div className="bg-white  rounded-2xl  col-span-8 sm:col-span-3">
                    <p className='text-xs font-bold  text-left '>PRICE</p>
          </div>
  
          <div className="bg-white   rounded-2xl  col-span-8 sm:col-span-3">
                    <p className='text-xs font-bold  text-left '>TOTAL ORDER</p>
          </div>
          <div className="bg-white   rounded-2xl  col-span-8 sm:col-span-3">
                    <p className='text-xs font-bold text-right '>TOTAL AMOUNT</p>
          </div>

</div>
<hr className='mt-3' style={{height:'10px'}} />
</div>


                {/* <thead class="">
                    <tr>
                        <th scope="col" class="py-3 px-6 text-xs font-bold tracking-wider text-left uppercase ">
                            Course Name
                        </th>
                        <th scope="col" class="py-3 px-6 text-xs font-bold tracking-wider text-left  uppercase ">
                            Price
                        </th>
                        <th scope="col" class="py-3 px-6 text-xs font-bold tracking-wider text-left  uppercase ">
                            Total Order
                        </th>
                        <th scope="col" class="py-3 px-6 text-xs font-bold tracking-wider text-right  uppercase ">
                            Total Amount
                        </th>
                        
                    </tr>
                </thead> */}
                <div className="bg-white  hidden sm:block " style={{minHeight:'200px'}}>
                    {
                        data.map((d,idx )=>     <div key={idx} className="hover:bg-gray/10 grid grid-cols-12 rounded  sm:gap-6 gap-0  px-2 items-center">

                        <div className="sm:py-4 py-2  text-sm font-medium flex items-center col-span-6 sm:col-span-3">
                            <img src={d.image} style={image} alt="" />
                            <p className='ml-4 text-black name'>{d.name}</p>
                            </div>
                        <div className="sm:py-4 py-2  text-sm font-medium text-right sm:text-left text-black col-span-6 sm:col-span-3 price"> ₹{d.price}</div>
                        <div className="sm:py-4 py-2 text-sm font-medium text-black flex items-center  col-span-6 sm:col-span-3"> <p className='sm:hidden mr-2'>Total Order - </p> <p className='sm:bg-blue/30  text-blue/60  font-bold text inline-block sm:px-5 sm:p-2  rounded'> {d.totalOrder}</p></div>
                        <div className="sm:py-4 py-2 text-sm font-medium text-right col-span-6 sm:col-span-3">
                        <span className='sm:hidden mr-2 text-black'>Total Amount - </span> <p className='sm:text-black text-blue/60  text inline-block sm:px-5 sm:p-2  rounded text-black'> ₹ {d.totalAmount}</p>
                           
                        </div>
                    </div>).slice(0,4)

                    }
                </div>
                <div className="bg-white block sm:hidden " >
                {
                        data.map((d,idx) => <div key={idx} className="hover:bg-gray/10 grid grid-cols-12 rounded    sm:gap-6 gap-0  px-2 items-center">

                        <div className="sm:py-4 py-2  text-sm font-medium flex items-center col-span-6 sm:col-span-3">
                            <img src={d.image} style={image} alt="" />
                            <p className='ml-4 text-black name'>{d.name}</p>
                            </div>
                        <div className="sm:py-4 py-2  text-sm font-medium text-right sm:text-left text-black col-span-6 sm:col-span-3 price"> ₹{d.price}</div>
                        <div className="sm:py-4 py-2 text-sm font-medium text-black flex items-center  col-span-6 sm:col-span-3"> <p className='sm:hidden mr-2'>Total Order - </p> <p className='sm:bg-blue/20  text-blue/60 font-bold text inline-block sm:px-5 sm:p-2  rounded'> {d.totalOrder}</p></div>
                        <div className="sm:py-4 py-2 text-sm font-medium text-right col-span-6 sm:col-span-3">
                        <span className='sm:hidden mr-2 text-black'>Total Amount - </span> <p className='sm:text-black text-blue/60  text inline-block sm:px-5 sm:p-2  rounded text-black'> ₹ {d.totalAmount}</p>
                        
                        </div>
                        </div>).slice(0,slice)

                    }

                    {
                        slice === 2 ? <div style={{cursor:'pointer', color:'#7D23E0', fontWeight:'500'}} onClick={() => setSlice(4)} className='flex items-center justify-center font-medium '>
                        <p className='mr-2'>View More</p>
                        <AiOutlineArrowDown></AiOutlineArrowDown>
                        </div> :
                        <div style={{cursor:'pointer', color:'#7D23E0', fontWeight:'500'}} onClick={() => setSlice(2)} className='flex items-center justify-center  font-medium '>
                        <p className='mr-2'>View Less</p>
                        <AiOutlineArrowUp></AiOutlineArrowUp>
                        </div>
                    }
                </div>

         
      </div>
        </div>
    );
};

export default RecentOrder;