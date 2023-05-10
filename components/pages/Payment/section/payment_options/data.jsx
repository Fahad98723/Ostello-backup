import React from 'react';

//react icons
import { BsCreditCard, BsCashStack } from 'react-icons/bs';
import { BiWallet } from 'react-icons/bi';
import { BsBank2 } from 'react-icons/bs';

//various input fields
import CardInputField from './input_fields/card_input_field';
import UpiInputField from './input_fields/UPI_input_field';
import PaytmInputField from './input_fields/PayTm_input_field';
import NetbankingInputField from './input_fields/NetBanking_input_field';
import MobileWalletField from './input_fields/MobileWallets_input_field';
import EmiInput from './input_fields/EMI_input_field';
import PayTM from '../../assets/PayTm.svg';
import Upi from '../../assets/UPI.svg';

//caching icons and images
const Card = <BsCreditCard />
const Wallet = <BiWallet />
const Banking = <BsBank2 />
const UPI = <img src={Upi.src} alt="" className='bg-white rounded' />
const PayTm = <img src={PayTM.src} alt=""  className='bg-white rounded' />
const EMI = <BsCashStack className='-rotate-90' />

const cardData = [
    {
        id: 1,
        title: "Card",
        icon: Card,
        input: <CardInputField />
    },
    {
        id: 2,
        title: "UPI",
        icon: UPI,
        input: <UpiInputField />
    },
    {
        id: 3,
        title: "PayTm",
        icon: PayTm,
        input: <PaytmInputField />
    },
    {
        id: 4,
        title: "Net Banking",
        icon: Banking,
        input: <NetbankingInputField />
    },
    {
        id: 5,
        title: "Mobile Wallets",
        icon: Wallet,
        input: <MobileWalletField />
    },
    {
        id: 6,
        title: "EMI",
        icon: EMI,
        input: <EmiInput />
    },
]

export default cardData