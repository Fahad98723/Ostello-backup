import React, {useState} from "react";
import EMIMain from "./EMI_main";
import AvailableEmi from "./check_available_EMI_option_input";
import EmiAccordion from './EMI_options/index';
import FinalProceed from "./final_EMI_proceed";
const EmiInput = () => { 
    const [active, setActive] = useState('main');
    const handleActive = (val) => {
        setActive(val)
    }
    
    return (
            <>
                {active === "main" && <EMIMain handleActive={handleActive} />}
                {active === "AvailableEmi" && <AvailableEmi handleActive={handleActive} />}
                {active === "EmiAccordion" && <EmiAccordion handleActive={handleActive} />}
                {active === "FinalProceed" && <FinalProceed handleActive={handleActive}/>}
            </>
        
    )
}

export default EmiInput