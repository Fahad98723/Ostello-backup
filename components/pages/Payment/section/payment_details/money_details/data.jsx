import React from 'react';

import RubeeOne from '../../../assets/RubeeLight.svg';
import RubeeTwo from '../../../assets/RubeePurple.svg';
import RubeeThree from '../../../assets/RubeeRed.svg';
import RubeeFour from '../../../assets/RubeeGray.svg';

const RubeeLight = <img src={RubeeOne} className="inline mr-1 mb-1 " />
const RubeePurple = <img src={RubeeTwo} className="inline mr-1 mb-1 " />
const RubeeRed = <img src={RubeeThree} className="inline mr-1 mb-1 " />
const RubeeGray = <img src={RubeeFour} className="inline mr-1 mb-1 " />

const PurchaseData = [
    {
        id: 1,
        title: "Amount",
        // price: "64,240",
        icon: RubeeLight,
    },
    // {
    //     id: 2,
    //     title: "Material cost",
    //     price: "64,240",
    //     icon: RubeeLight,
    // },
    // {
    //     id: 3,
    //     title: "GST",
    //     price: "64,240",
    //     icon: RubeeLight,
    // },
    {
        id: 4,
        title: "Coupon",
        // price: "-64,240",
        icon: RubeePurple,
    },
    {
        id: 5,
        title: "Discount",
        // price: "-12,400",
        icon: RubeeRed ,
    },
    {
        id: 6,
        title: "Total",
        // price: "64,240",
        icon: RubeeGray,
    },
]

export default PurchaseData