import axios from 'axios';
import React, { useState } from 'react';
import { host } from '../../../../../utils/constant';

const EmailChange = ({emailId, setEmailComponents}) => {
    const [changeEmail, setChangeEmail]= useState(emailId)
    

    const handleEmailChanging = (e) => {
      e.preventDefault()
      const ID = typeof window !== 'undefined' && window.localStorage.getItem("OWNER_ID");
      axios
        .patch(
          `${host}/users/`,
          {
            id: ID,
            updates: {
              email: changeEmail,
            },
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${typeof window !== 'undefined' && window.localStorage.getItem(
                "ACCESS_TOKEN"
              )}`,
            },
          }
        )
        .then((res) => {
          
          setEmailComponents(false)
          typeof window !== 'undefined' && window.location.reload()
        })
        .catch((err) => console.error(err));
    }
    return (
        <div className='sm:w-5/12 w-11/12'>
            <form onSubmit={handleEmailChanging}>

            <div className="email bg-white pl-5 p-3 rounded-xl  flex justify-between items-center cursor-pointer border border-ghost">
                <div className='w-11/12'>
                <p>Email Id</p>
                <input required defaultValue={emailId} onBlur={(e) => setChangeEmail(e.target.value)} type="text" id="base-input" className="bg-gray-50 border-none focus:outline-none border-gray-300 text-gray-900 w-full px-1 py-2 text-xl font-medium"/>
                </div>
            </div>
            
            <div className="btn flex mt-5 justify-end">
            <button  onClick={() => {
                    setEmailComponents(false)
                  }} className="text-white bg-ghost  hover:bg-primary px-3  py-3 rounded-lg mr-2 ">
                    Cancel
                  </button>
                  <input  type='submit' value='Save Changes'  className="text-white bg-primary px-3 py-3 rounded-lg cursor-pointer"
                    
                  />
                </div>
            </form>
        </div>
    );
};

export default EmailChange;