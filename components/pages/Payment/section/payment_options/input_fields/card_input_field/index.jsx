import React, { useState } from 'react'
import PaymentCard from '../../../../components/paymentCard'
import SecureConnection from '../../../../components/secure_connection'
// import '../../../../App.css'
import { usePaymentInputs } from 'react-payment-inputs';
import { useDispatch } from 'react-redux'

import {setCreateOrder } from "../../../../../../../redux/slices/orderSlice"
const CardInputField = () => {
  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const dispatch = useDispatch();
  const card = cardNumber.replace(/\s/g, '');
    const orderData  = {
      method: "card",
      name: cardName,
      number: card,
      expiry_month: expiryDate.replace(/\s/g, '').split('/')[0],
      expiry_year: expiryDate.replace(/\s/g, '').split('/')[1],
      cvv: cvc,
    }

  const handleChangeCardNumber = (e) => {
    setCardNumber(e.target.value);
  }
  const handleChangeExpiryDate = (e) => {
    setExpiryDate(e.target.value);
  }
  const handleChangeCVC = (e) => {
    setCvc(e.target.value);
  }
  const handleBlur = ()=>{
    if(cardName.length > 1 && card.length > 1 && cvc.length > 1 && expiryDate.length > 1) {
    dispatch(setCreateOrder(orderData));
    }
  }

  const handleCardDisplay = () => {
    const rawText = [...cardNumber.split(' ').join('')]
    const creditCard = []
    rawText?.forEach((t, i) => {
        if (i % 4 === 0) creditCard.push(' ')
        creditCard.push(t)
    })
    return  creditCard.join('')
}
  return (
    <PaymentCard className={'payment-card'}>
      <div className='font-color-one mb-4'>Name on card</div>
      <input
        onChange={(e) => setCardName(e.target.value)} 
        type='text'
        placeholder='Name on card'
        className='p-5 w-full bg-[#F4F4F4] rounded-[10px]'
      />

      <div className='font-color-one mt-9 mb-4'>Card Number</div>
      <input
      {...getCardNumberProps({ onChange: handleChangeCardNumber })} value={handleCardDisplay()}
        placeholder={'xxxx xxxx xxxx xxxx'}
        className='p-6 w-full bg-[#F4F4F4] rounded-[10px]'
        onBlur={handleBlur}
      />

      <div className='flex flex-col md:flex-row'>
        <div className='w-full'>
          <div className='font-color-one mt-9 mb-4'>Expiry Date</div>
          <input
          {...getExpiryDateProps({ onChange: handleChangeExpiryDate })} value={expiryDate} 
            type='text'
            placeholder='MM/YY'
            className='p-6 w-full bg-[#F4F4F4]'
            onBlur={handleBlur}
          />
        </div>
        <div className='w-full'>
          <div className='font-color-one mt-9 mb-4'>Security Code</div>
          <input
          {...getCVCProps({ onChange: handleChangeCVC })} value={cvc} 
            type='password'
            placeholder='CVV/CVC'
            className='p-6 w-full bg-[#F4F4F4] ml-2'
            onBlur={handleBlur}
          />
        </div>
      </div>
      {meta.isTouched && meta.error && <div><span>Error: {meta.error}</span></div>}

      <div className="flex justify-start items-center gap-2 mt-2">
      <input onChange={()=> localStorage.setItem('Order',orderData)} type='checkbox' className='' />
      <span form='checkbox' className='font-color-one'>
        Remember this card
      </span>
      </div>

      <SecureConnection />
    </PaymentCard>
  )
}

export default CardInputField
