import { Container } from '@mui/material';
import React from 'react';
import {  AiFillStar } from "react-icons/ai";
import { IoIosArrowDown} from "react-icons/io";
import { AiOutlineShareAlt} from "react-icons/ai";
import { FiEdit} from "react-icons/fi";
import { RiDeleteBin5Line} from "react-icons/ri";

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import NoData from './NoData';

const InstituteReviews = ({api}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const institute = api?.filter(a => a.type === "institute")
    return (
        <Container className='py-5 pb-8'>
        {
          institute.length > 0 ? <div className="w-full  grid lg:grid-cols-2 gap-4  lg:py-6 lg:m-0">
          {institute.map((a, i) => 
            <div key={i} className="bg-white w-12/12 rounded-[10px] shadow-lg p-5 md:max-w-[408px] md:max-h-[250px] m-auto lg:m-0">
            <div className="flex justify-between">
            
              <div className='flex items-center'>
              <img src={`https://cdn.ostello.co.in/${a?.key}`} alt="" className="w-[60px] h-[60px] rounded-[10px]" />
              <div className='ml-3'>
                  <p className='text-[20px] font-semibold'>{a.name}</p>
                  <p className='text-[15px]'>{a.location}</p>
              </div>
              </div>

              <div>

              <div>
             
              <IoIosArrowDown className='text-[15px]' onClick={handleMenu} />
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}> <FiEdit className='mr-2'/> Edit</MenuItem>
                <MenuItem onClick={handleClose}><RiDeleteBin5Line className='mr-2'/> Delete</MenuItem>
              </Menu>
            </div>

              </div>
            </div>
      
            <div className="flex items-center py-3">
              <div className="">
                <div className='flex items-center mt-3'>
                <div
                className="flex items-center rounded-[10px]  text-white  px-2 lg:mr-2"
                style={{ backgroundColor: "#FFD130" }}
              >
                <p className="lg:text-[15px]">{a?.ratings}</p>
                <AiFillStar />
              </div>
              <p className=' ml-2 text-[15px]'>{a?.date}</p>
                </div>

                <p className='mt-2 text-[15px]'>{a?.reviews}</p>
              </div>
              {/* <div
                className=" rounded-full  shadow-lg  ml-auto p-2 cursor-pointer "
                style={{ backgroundColor: "white" }}
              >
                <AiOutlineShareAlt onClick={() => handleOpen()} className='text-2xl' />
              </div> */}
            </div>
      
            <div className="pb-5 flex items-center justify-between">
                <div className=" flex justify-center items-center"><AiOutlineShareAlt className='text-[15px] mr-3 items-center'/>  Share</div>
                <p
                className=''
                >
                  {a?.upVoted} people upvoted 
                </p>
            </div>
          </div>
          )}
        </div> : 

        <NoData text={`You haven’t reviewed anything yet.`}></NoData>
        }
        </Container>
    );
};

export default InstituteReviews;