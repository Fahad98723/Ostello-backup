import React, { useState } from "react";
// import './style.css'
import offlineIndicator from '../../../../../../assets/images/icons/offlineIndicator.svg'
import onlineIndicator from '../../../../../../assets/images/icons/onlineIndicator.svg'
import hybridIndicator from '../../../../../../assets/images/icons/hybridIndicator.svg'
const XyzCard = ({item,currentInstitute}) => {
    const { name, duration,emi,classtype} = item;
    
  const [timings, setTimings] = useState('')

  const getClassType = (num) => {
    if (num === 1) {
      return 'Hybrid'
    }
    if (num === 2) {
      return 'Online'
    }
    if (num === 3) {
      return 'Offline'
    }
  }
    return (
        <div className="XYz w-full  text-gray-600  py-1">
            <div className="XYZ-title font-bold text-xl">{currentInstitute?.name}</div>
            <h3 className="bg-white text-2xl font-bold capitalize mt-3">{name}</h3>
            <div className="flex justify-between mt-6 pb-3">
            <p className='mr-auto  flex mb-2 space-x-2 uppercase text-[12px] '>
                {
                  <img
                    src={
                        classtype === 1
                        ? hybridIndicator.src
                        : classtype === 2
                        ? onlineIndicator.src
                        : offlineIndicator.src
                    }
                    alt=''
                  />
                }
                <span>{getClassType(classtype)} Course</span>
              </p>
                {/* <div className="XYZ-duration">Starting from 12/03/22</div> */}
            </div>
        </div>
    )
}

export default XyzCard