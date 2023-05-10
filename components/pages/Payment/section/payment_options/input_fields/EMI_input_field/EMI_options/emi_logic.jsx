import React, {useState} from "react";
// import './style.css';
import Rubee from '../../../../../assets/RubeeLight.svg';
import PurpleRubee from '../../../../../assets/RubeePurple.svg'; 
import GrayRubee from '../../../../../assets/RubeeGray.svg';

const EmiOptions = ({currentValue, handleActive}) => {
    const [toggle, setToggle] = useState(false);

    return (
                    <div className={toggle ? "justify-between w-full p-2 md:p-5 rounded-lg border-green my-3" : "justify-between w-full p-2 md:p-5 rounded-lg border border-gray-300 my-3"}>
                        <div onClick={() => setToggle(!toggle)} key={currentValue.id} className="cursor-pointer justify-between my-3">
                            <div className="text-base md:text-lg font-normal font-color-one">{currentValue.duration}  </div>
                            <div className="font-color-one text-lg md:text-2xl font-bold">{currentValue.amount} <span className="font-normal per text-base md:text-lg">{currentValue.per}</span></div>
                            <div className={toggle ? "divider" : "hidden"}></div>
                        </div>
                        {toggle && <div>
                            <div className="flex justify-between">
                                    <div>
                                        <div className="text-base font-medium regular my-1">{currentValue.one }</div>
                                        <div className="text-base font-medium regular my-1">{currentValue.two }</div>
                                        <div className="font-color-two font-medium text-base my-1">{currentValue.three}</div>
                                        <div className="divider"></div>
                                        <div className="font-color-one text-base md:text-lg font-medium my-1">{currentValue.four }</div>
                                    </div>
                                    <div>
                                        <div className="text-base font-medium regular my-1 flex items-center"><img className="w-3 h-3 mr-2" src={Rubee} alt="" />{currentValue.EMIValue}</div>
                                        <div className="text-base font-medium regular my-1 flex items-center"><img className="w-3 h-3 mr-2" src={Rubee} alt="" />{currentValue.interest}</div>
                                        <div className="font-color-two font-medium text-base my-1 flex items-center"><img className="w-3 h-3 mr-2" src={PurpleRubee} alt="" />{currentValue.discount}</div>
                                        <div className="divider"></div>
                                        <div className="font-color-one text-base md:text-lg font-medium my-1 flex items-center"><img className="w-3 h-3 mr-2" alt=""  src={GrayRubee} />{currentValue.total}</div>
                                    </div>
                            </div>    
                            <div className="flex justify-center md:justify-end"><button onClick={() => handleActive("FinalProceed")} className={toggle ? "next text-white py-1 px-8 md:px-7 mt-3 text-base md:text-lg" : "next text-white text-base md:text-lg"}>Next</button></div>
                        </div>}
            
                    </div>
    )
}

export default EmiOptions