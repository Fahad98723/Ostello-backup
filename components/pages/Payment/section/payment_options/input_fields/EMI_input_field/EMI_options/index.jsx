import React from "react";
import EmiOptions from "./emi_logic";
import Data from './data';
import { BsChevronLeft } from 'react-icons/bs';
const EmiAccordion = ({handleActive}) => {

    return (
        <div className="shadow-2 rounded-3xl p-7 md:overflow-y-scroll h-screen">
        <div>
            <button onClick={() => handleActive("main")}  className="flex items-center border-0 font-color-one font-medium text-base hover:text-gray-800"><BsChevronLeft className="mr-3"/>Bank</button>
            <div>
                    <div className="font-color-one my-7 text-xl font-medium">No Cost EMI</div>
                    {
                        Data?.NoCostEmi?.map((item,idx) => (
                            <EmiOptions key={idx} currentValue={item} handleActive={handleActive}/>
                        ))
                    }
            </div>

            <div>
                <div className="font-color-one my-7 text-xl font-medium">EMI with interest</div>
                {
                        Data?.EmiWithInterest?.map((item,idx) => (
                            <EmiOptions key={idx} currentValue={item}  handleActive={handleActive} />
                        ))
                    }
            </div>

        </div>
</div>
    )
}

export default EmiAccordion 