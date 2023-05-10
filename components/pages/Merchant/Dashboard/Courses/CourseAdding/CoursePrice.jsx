import axios from "axios";
import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseEnrolledStudent,
  addCoursePrice,
  addCoursePriceDetails,
  addCourseSelector,
  addGuaranteeDay,
} from "../../../../../../redux/slices/AddCourseSlice";
import {
  authSelector,
  getUser,
} from "../../../../../../redux/slices/authSlice";
import { host } from "../../../../../../utils/constant";
import { isEmpty } from "../../../../../utils";
import { DownOutlined, PlayCircleFilled } from "@ant-design/icons";
import toast from "react-hot-toast";

const CoursePriceAndCoupens = ({
  proceedState4,
  setIsCoursePrice = () => {},
  // setIsProduct,
  // isProduct,
  courseData,
  setHandleButton = () => {},
}) => {
  // const { coursePrice } = useSelector(addCourseSelector)(
  //   "coursePrice from redux",
  //   coursePrice
  // );
  const [proceed5, setProceed5] = proceedState4;
  const [isDropDown1, setIsDropDown1] = useState(false);

  const [coupons, setCoupons] = useState([]);

  const {
    coursePrice,
    courseEnrolledStudents,
    guaranteeDay,
    coursePriceDetails,
  } = useSelector(addCourseSelector);

  const [grossPrice, setGrossPrice] = useState("");
  const [discPrice, setDiscPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [effPrice, setEffPrice] = useState("");
  const [emiPrice, setEmiPrice] = useState("");
  const [priceFre, setPriceFre] = useState("One Time");
  // const [emiPrice, setEmiPrice] = useState((courseData?.grossprice * 18) / 100)

  const [monthlyGrossPrice, setMonthlyGrossPrice] = useState("");
  const [monthlyDiscPrice, setMonthlyDiscPrice] = useState("");
  const [monthlyMinPrice, setMonthlyMinPrice] = useState("");
  const [monthlyEffPrice, setMonthlyEffPrice] = useState("");

  const [halfYearlyGrossPrice, setHalfYearlyGrossPrice] = useState("");
  const [halfYearlyDiscPrice, setHalfYearlyDiscPrice] = useState("");
  const [halfYearlyMinPrice, setHalfYearlyMinPrice] = useState("");
  const [halfYearlyEffPrice, setHalfYearlyEffPrice] = useState("");
  const [halfYearlyEmiPrice, setHalfYearlyEmiPrice] = useState("");

  const [yearlyGrossPrice, setYearlyGrossPrice] = useState("");
  const [yearlyDiscPrice, setYearlyDiscPrice] = useState("");
  const [yearlyMinPrice, setYearlyMinPrice] = useState("");
  const [yearlyEffPrice, setYearlyEffPrice] = useState("");
  const [yearlyEmiPrice, setYearlyEmiPrice] = useState("");

  const [oneTimeGrossPrice, setOneTimeGrossPrice] = useState("");
  const [oneTimeDiscPrice, setOneTimeDiscPrice] = useState("");
  const [oneTimeMinPrice, setOneTimeMinPrice] = useState("");
  const [oneTimeEffPrice, setOneTimeEffPrice] = useState("");

  const [grossPriceError, setGrossPriceError] = useState("");
  const [discPriceError, setDiscPriceError] = useState("");
  const [minPriceError, setMinPriceError] = useState("");
  const [effPriceError, setEffPriceError] = useState("");
  const [emiPriceError, setEmiPriceError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [guarantee, setGuarantee] = useState("");
  const [enrolledStudents, setEnrolledStudents] = useState(0);
  const dispatch = useDispatch();

  const { userData } = useSelector(authSelector);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    dispatch(getUser());
    if (userData?.usertype === 1) {
      setAdmin(true);
    }
  }, [userData?.usertype]);

  useEffect(() => {
    if (
      courseData?.pricingdetails?.monthly?.grossprice ||
      courseData?.pricingdetails?.halfYearly?.grossprice ||
      courseData?.pricingdetails?.yearly?.grossprice
    ) {
      setPriceFre("Partial");
    }
    if (courseData?.pricingdetails?.oneTime?.grossprice) {
      setPriceFre("One Time");
    }
    if (courseData?.updatedRequest?.pricingdetails?.oneTime?.grossprice) {
      setPriceFre("One Time");
    }
  }, [
    courseData?.pricingdetails?.monthly?.grossprice,
    courseData?.pricingdetails?.halfYearly?.grossprice,
    courseData?.pricingdetails?.yearly?.grossprice,
    courseData?.pricingdetails?.oneTime?.grossprice,
    courseData?.updatedRequest?.pricingdetails?.oneTime?.grossprice,
  ]);

  useEffect(() => {
    if (courseData && !Object.entries(coursePrice).length) {
      if (admin) {
        if (courseData.coupon?.id && !courseData.updatedRequest.couponid) {
          setSelectedId(courseData?.coupon?.id);
        }
        if (courseData.updatedRequest.couponid) {
          setSelectedId(courseData?.updatedRequest?.couponid);
        }

        if (courseData.grossprice && !courseData.updatedRequest.grossprice) {
          setGrossPrice(courseData?.grossprice);
        }
        if (courseData.updatedRequest.grossprice) {
          setGrossPrice(courseData?.updatedRequest?.grossprice);
        }
        if (
          courseData.minimumprice &&
          !courseData.updatedRequest.minimumprice
        ) {
          setMinPrice(courseData?.minimumprice);
        }
        if (courseData.updatedRequest.minimumprice) {
          setMinPrice(courseData?.updatedRequest?.minimumprice);
        }
        if (
          courseData.discountprice &&
          !courseData.updatedRequest.discountprice
        ) {
          setDiscPrice(courseData?.discountprice);
        }
        if (courseData.updatedRequest.discountprice) {
          setDiscPrice(courseData?.updatedRequest?.discountprice);
        }
        if (
          courseData.effectiveprice &&
          !courseData.updatedRequest.effectiveprice
        ) {
          setEffPrice(courseData?.effectiveprice);
        }
        if (courseData.updatedRequest.effectiveprice) {
          setEffPrice(courseData?.updatedRequest?.effectiveprice);
        }
        if (courseData.emi && !courseData.updatedRequest.emi) {
          setEmiPrice(courseData?.emi);
        }
        if (courseData.updatedRequest.emi) {
          setEmiPrice(courseData?.updatedRequest?.emi);
        }

        if (
          courseData.pricingdetails &&
          courseData?.updatedRequest?.pricingdetails
            ? !Object.entries(courseData?.updatedRequest?.pricingdetails).length
            : courseData?.updatedRequest?.pricingdetails
        ) {
          if (
            courseData.pricingdetails?.monthly &&
            !courseData.updatedRequest?.pricingdetails?.monthly
          ) {
            setMonthlyGrossPrice(
              courseData.pricingdetails?.monthly?.grossprice
            );
            setMonthlyDiscPrice(
              courseData.pricingdetails?.monthly?.discountprice
            );
            setMonthlyEffPrice(
              courseData.pricingdetails?.monthly?.effectiveprice
            );
            setMonthlyMinPrice(
              courseData.pricingdetails?.monthly?.minimumprice
            );
          }
          if (
            courseData.pricingdetails?.halfYearly &&
            !courseData.updatedRequest?.pricingdetails?.halfYearly
          ) {
            setHalfYearlyGrossPrice(
              courseData.pricingdetails?.halfYearly?.grossprice
            );
            setHalfYearlyDiscPrice(
              courseData.pricingdetails?.halfYearly?.discountprice
            );
            setHalfYearlyEffPrice(
              courseData.pricingdetails?.halfYearly?.effectiveprice
            );
            setHalfYearlyMinPrice(
              courseData.pricingdetails?.halfYearly?.minimumprice
            );
            setHalfYearlyEmiPrice(courseData.pricingdetails?.halfYearly?.emi);
          }
          if (
            courseData.pricingdetails?.yearly &&
            !courseData.updatedRequest?.pricingdetails?.yearly
          ) {
            setYearlyGrossPrice(courseData.pricingdetails?.yearly?.grossprice);
            setYearlyDiscPrice(
              courseData.pricingdetails?.yearly?.discountprice
            );
            setYearlyEffPrice(
              courseData.pricingdetails?.yearly?.effectiveprice
            );
            setYearlyMinPrice(courseData.pricingdetails?.yearly?.minimumprice);
            setYearlyEmiPrice(courseData.pricingdetails?.yearly?.emi);
          }
          if (
            courseData.pricingdetails?.oneTime &&
            !courseData.updatedRequest?.pricingdetails?.oneTime
          ) {
            setOneTimeGrossPrice(
              courseData.pricingdetails?.oneTime?.grossprice
            );
            setOneTimeDiscPrice(
              courseData.pricingdetails?.oneTime?.discountprice
            );
            setOneTimeEffPrice(
              courseData.pricingdetails?.oneTime?.effectiveprice
            );
            setOneTimeMinPrice(
              courseData.pricingdetails?.oneTime?.minimumprice
            );
          }
        }
        if (courseData.updatedRequest?.pricingdetails) {
          if (courseData.updatedRequest?.pricingdetails?.monthly) {
            setMonthlyGrossPrice(
              courseData?.updatedRequest?.pricingdetails?.monthly?.grossprice
            );
            setMonthlyDiscPrice(
              courseData?.updatedRequest?.pricingdetails?.monthly?.discountprice
            );
            setMonthlyEffPrice(
              courseData?.updatedRequest?.pricingdetails?.monthly
                ?.effectiveprice
            );
            setMonthlyMinPrice(
              courseData?.updatedRequest?.pricingdetails?.monthly?.minimumprice
            );
          }
          if (!courseData.updatedRequest?.pricingdetails?.monthly) {
            setMonthlyGrossPrice();
            setMonthlyDiscPrice();
            setMonthlyEffPrice();
            setMonthlyMinPrice();
          }
          if (courseData.updatedRequest?.pricingdetails?.halfYearly) {
            setHalfYearlyGrossPrice(
              courseData?.updatedRequest?.pricingdetails?.halfYearly?.grossprice
            );
            setHalfYearlyDiscPrice(
              courseData?.updatedRequest?.pricingdetails?.halfYearly
                ?.discountprice
            );
            setHalfYearlyEffPrice(
              courseData?.updatedRequest?.pricingdetails?.halfYearly
                ?.effectiveprice
            );
            setHalfYearlyMinPrice(
              courseData?.updatedRequest?.pricingdetails?.halfYearly
                ?.minimumprice
            );
            setHalfYearlyEmiPrice(
              courseData?.updatedRequest?.pricingdetails?.halfYearly?.emi
            );
          }
          if (!courseData.updatedRequest?.pricingdetails?.halfYearly) {
            setHalfYearlyGrossPrice();
            setHalfYearlyDiscPrice();
            setHalfYearlyEffPrice();
            setHalfYearlyMinPrice();
            setHalfYearlyEmiPrice();
          }
          if (courseData.updatedRequest?.pricingdetails?.yearly) {
            setYearlyGrossPrice(
              courseData?.updatedRequest?.pricingdetails?.yearly?.grossprice
            );
            setYearlyDiscPrice(
              courseData?.updatedRequest?.pricingdetails?.yearly?.discountprice
            );
            setYearlyEffPrice(
              courseData?.updatedRequest?.pricingdetails?.yearly?.effectiveprice
            );
            setYearlyMinPrice(
              courseData?.updatedRequest?.pricingdetails?.yearly?.minimumprice
            );
            setYearlyEmiPrice(
              courseData?.updatedRequest?.pricingdetails?.yearly?.emi
            );
          }
          if (!courseData.updatedRequest?.pricingdetails?.yearly) {
            setYearlyGrossPrice();
            setYearlyDiscPrice();
            setYearlyEffPrice();
            setYearlyMinPrice();
            setYearlyEmiPrice();
          }
          if (courseData.updatedRequest?.pricingdetails?.oneTime) {
            setOneTimeGrossPrice(
              courseData?.updatedRequest?.pricingdetails?.oneTime?.grossprice
            );
            setOneTimeDiscPrice(
              courseData?.updatedRequest?.pricingdetails?.oneTime?.discountprice
            );
            setOneTimeEffPrice(
              courseData?.updatedRequest?.pricingdetails?.oneTime
                ?.effectiveprice
            );
            setOneTimeMinPrice(
              courseData?.updatedRequest?.pricingdetails?.oneTime?.minimumprice
            );
          }
          if (!courseData.updatedRequest?.pricingdetails?.oneTime) {
            setOneTimeGrossPrice();
            setOneTimeDiscPrice();
            setOneTimeEffPrice();
            setOneTimeMinPrice();
          }
        }
      }

      if (!courseEnrolledStudents && courseData.studentsenrolled) {
        setEnrolledStudents(courseData?.studentsenrolled);
      }
      if (!guaranteeDay && courseData.moneybackguaranteedate) {
        setGuarantee(courseData?.moneybackguaranteedate);
      }

      if (!admin) {
        setSelectedId(courseData?.coupon?.id);
        setGrossPrice(courseData?.grossprice);
        setDiscPrice(courseData?.discountprice);
        setMinPrice(courseData?.minimumprice);
        setEffPrice(courseData?.effectiveprice);
        setEmiPrice(courseData?.emi);

        if (courseData?.pricingdetails?.monthly) {
          setMonthlyGrossPrice(courseData.pricingdetails?.monthly?.grossprice);
          setMonthlyDiscPrice(
            courseData.pricingdetails?.monthly?.discountprice
          );
          setMonthlyEffPrice(
            courseData.pricingdetails?.monthly?.effectiveprice
          );
          setMonthlyMinPrice(courseData.pricingdetails?.monthly?.minimumprice);
        } else if (courseData?.pricingdetails?.halfYearly) {
          setHalfYearlyGrossPrice(
            courseData.pricingdetails?.halfYearly?.grossprice
          );
          setHalfYearlyDiscPrice(
            courseData.pricingdetails?.halfYearly?.discountprice
          );
          setHalfYearlyEffPrice(
            courseData.pricingdetails?.halfYearly?.effectiveprice
          );
          setHalfYearlyMinPrice(
            courseData.pricingdetails?.halfYearly?.minimumprice
          );
          setHalfYearlyEmiPrice(courseData.pricingdetails?.halfYearly?.emi);
        }
        if (courseData?.pricingdetails?.yearly) {
          setYearlyGrossPrice(courseData.pricingdetails?.yearly?.grossprice);
          setYearlyDiscPrice(courseData.pricingdetails?.yearly?.discountprice);
          setYearlyEffPrice(courseData.pricingdetails?.yearly?.effectiveprice);
          setYearlyMinPrice(courseData.pricingdetails?.yearly?.minimumprice);
          setYearlyEmiPrice(courseData.pricingdetails?.yearly?.emi);
        }
        if (courseData?.pricingdetails?.oneTime) {
          setOneTimeGrossPrice(courseData.pricingdetails?.oneTime?.grossprice);
          setOneTimeDiscPrice(
            courseData.pricingdetails?.oneTime?.discountprice
          );
          setOneTimeEffPrice(
            courseData.pricingdetails?.oneTime?.effectiveprice
          );
          setOneTimeMinPrice(courseData.pricingdetails?.oneTime?.minimumprice);
        } else {
          setYearlyGrossPrice(courseData?.grossprice);
          setYearlyDiscPrice(courseData?.discountprice);
          setYearlyEffPrice(courseData?.effectiveprice);
          setYearlyMinPrice(courseData?.minimumprice);
          setYearlyEmiPrice(courseData?.emi);
        }
      }
    }
    if (Object.entries(coursePrice).length) {
      setGrossPrice(coursePrice?.grossPriceValue);
      setDiscPrice(coursePrice?.discPriceValue);
      setMinPrice(coursePrice?.minimumPriceValue);
      setEffPrice(coursePrice?.effectivePriceValue);
      setEmiPrice(coursePrice?.emiPriceValue);
      setSelectedId(coursePrice?.coupon);

      setEnrolledStudents(courseEnrolledStudents);
      setGuarantee(guaranteeDay);
    }

    if (
      coursePriceDetails?.monthly?.grossprice ||
      coursePriceDetails?.halfYearly?.grossprice ||
      coursePriceDetails?.yearly?.grossprice ||
      coursePriceDetails?.oneTime?.grossprice
    ) {
      if (coursePriceDetails?.monthly) {
        setMonthlyGrossPrice(coursePriceDetails?.monthly?.grossprice);
        setMonthlyDiscPrice(coursePriceDetails?.monthly?.discountprice);
        setMonthlyEffPrice(coursePriceDetails?.monthly?.effectiveprice);
        setMonthlyMinPrice(coursePriceDetails?.monthly?.minimumprice);
      }
      if (coursePriceDetails?.halfYearly) {
        setHalfYearlyGrossPrice(coursePriceDetails?.halfYearly?.grossprice);
        setHalfYearlyDiscPrice(coursePriceDetails?.halfYearly?.discountprice);
        setHalfYearlyEffPrice(coursePriceDetails?.halfYearly?.effectiveprice);
        setHalfYearlyMinPrice(coursePriceDetails?.halfYearly?.minimumprice);
        setHalfYearlyEmiPrice(coursePriceDetails?.halfYearly?.emi);
      }
      if (coursePriceDetails?.yearly) {
        setYearlyGrossPrice(coursePriceDetails?.yearly?.grossprice);
        setYearlyDiscPrice(coursePriceDetails?.yearly?.discountprice);
        setYearlyEffPrice(coursePriceDetails?.yearly?.effectiveprice);
        setYearlyMinPrice(coursePriceDetails?.yearly?.minimumprice);
        setYearlyEmiPrice(coursePriceDetails?.yearly?.emi);
      }
      if (coursePriceDetails?.oneTime) {
        setOneTimeGrossPrice(coursePriceDetails?.oneTime?.grossprice);
        setOneTimeDiscPrice(coursePriceDetails?.oneTime?.discountprice);
        setOneTimeEffPrice(coursePriceDetails?.oneTime?.effectiveprice);
        setOneTimeMinPrice(coursePriceDetails?.oneTime?.minimumprice);
      }
    }
  }, [
    courseData,
    coursePrice,
    admin,
    courseEnrolledStudents,
    guaranteeDay,
    coursePriceDetails,
  ]);

  useEffect(() => {
    axios
      .get(`${host}/coupon/`)
      .then((res) => {
        setCoupons(res.data.message);
      })
      .catch((err) => {})
      .finally(() => {});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !monthlyGrossPrice?.toString()?.length &&
      !halfYearlyGrossPrice?.toString()?.length &&
      !yearlyGrossPrice?.toString()?.length &&
      !oneTimeGrossPrice?.toString()?.length
    ) {
      toast.error("Please fill atleast one Price Frequency ");
      return;
    }

    if (
      monthlyGrossPrice?.toString()?.length ||
      monthlyDiscPrice?.toString()?.length ||
      monthlyEffPrice?.toString()?.length ||
      monthlyMinPrice?.toString()?.length
    ) {
      if (
        !monthlyGrossPrice?.toString()?.length ||
        !monthlyDiscPrice?.toString()?.length ||
        !monthlyEffPrice?.toString()?.length ||
        !monthlyMinPrice?.toString()?.length
      ) {
        toast.error("Please fill all the fields of monthly price frequency");
        return;
      }
    }

    if (
      halfYearlyGrossPrice?.toString()?.length ||
      halfYearlyDiscPrice?.toString()?.length ||
      halfYearlyEffPrice?.toString()?.length ||
      halfYearlyMinPrice?.toString()?.length
    ) {
      if (
        !halfYearlyGrossPrice?.toString()?.length ||
        !halfYearlyDiscPrice?.toString()?.length ||
        !halfYearlyEffPrice?.toString()?.length ||
        !halfYearlyMinPrice?.toString()?.length
      ) {
        toast.error(
          "Please fill all the fields of half Yearly price frequency"
        );
        return;
      }
    }

    if (
      yearlyGrossPrice?.toString()?.length ||
      yearlyDiscPrice?.toString()?.length ||
      yearlyEffPrice?.toString()?.length ||
      yearlyMinPrice?.toString()?.length
    ) {
      if (
        !yearlyGrossPrice?.toString()?.length ||
        !yearlyDiscPrice?.toString()?.length ||
        !yearlyEffPrice?.toString()?.length ||
        !yearlyMinPrice?.toString()?.length
      ) {
        toast.error("Please fill all the fields of  Yearly price frequency");
        return;
      }
    }

    if (
      oneTimeGrossPrice?.toString()?.length ||
      oneTimeDiscPrice?.toString()?.length ||
      oneTimeEffPrice?.toString()?.length ||
      oneTimeMinPrice?.toString()?.length
    ) {
      if (
        !oneTimeGrossPrice?.toString()?.length ||
        !oneTimeDiscPrice?.toString()?.length ||
        !oneTimeEffPrice?.toString()?.length ||
        !oneTimeMinPrice?.toString()?.length
      ) {
        toast.error("Please fill all the fields of  One time price frequency");
        return;
      }
    }

    if (isEmpty(selectedId)) {
      toast.error("Please Select coupon");
    } else {
      let data = {};

      if (oneTimeGrossPrice?.toString()?.length) {
        data.oneTime = {
          grossprice: Number(oneTimeGrossPrice),
          discountprice: Number(oneTimeDiscPrice),
          minimumprice: Number(oneTimeMinPrice),
          effectiveprice: Number(oneTimeEffPrice),
        };
      } else {
        if (monthlyGrossPrice?.toString()?.length) {
          data.monthly = {
            grossprice: Number(monthlyGrossPrice),
            discountprice: Number(monthlyDiscPrice),
            minimumprice: Number(monthlyMinPrice),
            effectiveprice: Number(monthlyEffPrice),
          };
        }
        if (halfYearlyGrossPrice?.toString()?.length) {
          data.halfYearly = {
            grossprice: Number(halfYearlyGrossPrice),
            discountprice: Number(halfYearlyDiscPrice),
            minimumprice: Number(halfYearlyMinPrice),
            effectiveprice: Number(halfYearlyEffPrice),
            emi: Number(halfYearlyEmiPrice),
          };
        }
        if (yearlyGrossPrice?.toString()?.length) {
          data.yearly = {
            grossprice: Number(yearlyGrossPrice),
            discountprice: Number(yearlyDiscPrice),
            minimumprice: Number(yearlyMinPrice),
            effectiveprice: Number(yearlyEffPrice),
            emi: Number(yearlyEmiPrice),
          };
        }
      }

      // const data = {
      //   monthly: {
      //     grossprice: monthlyGrossPrice,
      //     discountprice: monthlyDiscPrice,
      //     minimumprice: monthlyMinPrice,
      //     effectiveprice: monthlyEffPrice,
      //   },
      //   "half-yearly": {
      //     grossprice: halfYearlyGrossPrice,
      //     discountprice: halfYearlyDiscPrice,
      //     minimumprice: halfYearlyMinPrice,
      //     effectiveprice: halfYearlyEffPrice,
      //     emi: halfYearlyEmiPrice,
      //   },
      //   yearly: {
      //     grossprice: yearlyGrossPrice,
      //     discountprice: yearlyDiscPrice,
      //     minimumprice: yearlyMinPrice,
      //     effectiveprice: yearlyEffPrice,
      //     emi: yearlyEmiPrice,
      //   },
      // };

      dispatch(addCoursePriceDetails(data));
      dispatch(
        addCoursePrice({
          grossPriceValue: Number(yearlyGrossPrice) || 0,
          minimumPriceValue: Number(yearlyMinPrice) || 0,
          discPriceValue: Number(yearlyDiscPrice) || 0,
          effectivePriceValue: Number(yearlyEffPrice) || 0,
          emiPriceValue: Number(yearlyEffPrice) || 0,
          coupon: selectedId,
        })
      );
      dispatch(addGuaranteeDay(guarantee));
      dispatch(addCourseEnrolledStudent(enrolledStudents));
      setIsCoursePrice(false);
      // setIsProduct(!isProduct);
      setProceed5(true);
      setHandleButton(true);
    }
  };

  const [monthly, setMonthly] = useState(true);
  const [yearly, setYearly] = useState(false);
  const [halfYearly, setHalfYearly] = useState(false);

  return (
    <div className="bg-white rounded-lg lg:p-8 my-5 lg:w-11/12 w-12/12  lg:mr-20">
      <h1 className="text-2xl w-full space-x-2 hidden lg:flex items-center  py-4 pb-2  font-dm-sans font-bold">
        Set a price
      </h1>

      {/* <div className="shrink  md:w-3/4 w-full   text-base font-normal text-slate">
        <h1 className="text-[#A8A8A8] pb-3">Price Frequency *</h1>
        <select
          onChange={(e) => setPriceFre(e.target.value)}
          value={priceFre}
          className={` px-4 py-2 mb-3 lg:w-44 w-full rounded-lg text-base items-center font-normal text-slate flex bg-clip-padding bg-no-repeat border-2 border-solid border-[#A4A4A4]   first-letter:transition ease-in-out m-0`}
        >
          <option className="w-full" value="monthly">
            Monthly Fee
          </option>

          <option className="w-full" value="halfYearly">
            Half-Yearly Fee
          </option>
          <option className="w-full" value="yearly">
            Yearly Fee
          </option>
        </select>
      </div> */}

      <div className="shrink   md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out mb-5 focus:outline-none mt-1 mr-2">
        <p className="text-base mb-1">Price Method </p>
        <select
          onChange={(e) => setPriceFre(e.target.value)}
          value={priceFre}
          className={` form-select   marker:block md:w-2/4 w-full px-4 py-3 text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 rounded-lg first-letter:transition ease-in-out m-0 focus:text-gray-700 focus:bg-white 
         
           focus:outline-none`}
        >
          <option className="w-full" value="One Time">
            One Time
          </option>
          <option className="w-full" value="Partial">
            Partial
          </option>
        </select>
      </div>

      {priceFre === "Partial" ? (
        <>
          <div
            className=" p-2 border-2  mb-3 border-[#A4A4A4]  flex justify-between"
            onClick={() => {
              setMonthly(!monthly);
            }}
          >
            <p className="text-[#A8A8A8] font-bold text-2xl">
              Monthly Price Frequency
            </p>{" "}
            <DownOutlined
              className={`flex justify-center text-2xl transition-all text-[#475467] duration-300 ease-in-out ${
                monthly && "rotate-180"
              }`}
            />
          </div>

          {monthly ? (
            <>
              <div className="flex w-full flex-col lg:flex-row gap-5 mb-5 lg:mb-0 lg:gap-16">
                <div>
                  <h1 className="text-[#A8A8A8] pb-3">Gross Price *</h1>
                  <div
                    className={` px-4 py-2 mb-3 lg:w-44 w-full rounded-lg text-base items-center font-normal text-slate flex bg-clip-padding bg-no-repeat border-2 border-solid  first-letter:transition ease-in-out m-0`}
                  >
                    <p className="border-r px-2 lg:px-1">Rs. </p>
                    <input
                      type="number"
                      onBlur={(e) => {
                        setMonthlyGrossPrice(e.target.value);
                        setOneTimeGrossPrice("");
                      }}
                      className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
                      defaultValue={monthlyGrossPrice}
                      placeholder="0000"
                    />
                  </div>
                  <h1 className="text-primary pb-4 text-sm">
                    *The base price of the course
                  </h1>
                </div>
              </div>

              <h1 className="text-[#A8A8A8] pb-3">Discount Price</h1>
              <div
                className={` px-4 py-2 mb-3 lg:w-44 w-full rounded-lg text-base items-center font-normal text-slate flex bg-clip-padding bg-no-repeat border-2 border-solid  first-letter:transition ease-in-out m-0`}
              >
                <p className="border-r px-2 lg:px-1">Rs. </p>
                <input
                  type="number"
                  onBlur={(e) => setMonthlyDiscPrice(e.target.value)}
                  className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
                  defaultValue={monthlyDiscPrice}
                  placeholder="0000"
                />
              </div>
              <h1 className="text-primary text-sm">
                *The maximum discount offered on course
              </h1>

              <div className="flex flex-col lg:flex-row gap-5 mb-5 lg:mb-0 lg:gap-16 mt-5">
                <div className="">
                  <h1 className="text-[#A8A8A8] pb-3">Minimum Price</h1>
                  <div
                    className={` px-4 py-2 mb-3 lg:w-44 w-full rounded-lg text-base items-center font-normal text-slate flex bg-clip-padding bg-no-repeat border-2 border-solid $  first-letter:transition ease-in-out m-0`}
                  >
                    <p className="border-r px-2 lg:px-1">Rs. </p>
                    <input
                      type="number"
                      onBlur={(e) => setMonthlyMinPrice(e.target.value)}
                      className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
                      defaultValue={monthlyMinPrice}
                      placeholder="0000"
                    />
                  </div>
                  <h1 className="text-sm text-primary">
                    *This is to help you get more sales
                  </h1>
                </div>

                <div className="">
                  <h1 className="text-[#A8A8A8] pb-3">
                    Effective Price (Final Price)
                  </h1>
                  <div
                    className={` px-4 py-2 mb-3 lg:w-44 w-full rounded-lg text-base items-center font-normal text-slate flex bg-clip-padding bg-no-repeat border-2 border-solid   first-letter:transition ease-in-out m-0`}
                  >
                    <p className="border-r px-2 lg:px-1">Rs. </p>
                    <input
                      type="number"
                      onBlur={(e) => setMonthlyEffPrice(e.target.value)}
                      className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
                      defaultValue={monthlyEffPrice}
                      placeholder="0000"
                    />
                  </div>
                  <h1 className="text-primary text-sm">
                    *The effective price after discount
                  </h1>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          <div
            className=" p-2 border-2 border-[#A4A4A4]  my-3  flex justify-between"
            onClick={() => {
              setHalfYearly(!halfYearly);
            }}
          >
            <p className="text-[#A8A8A8] font-bold text-2xl">
              Half-Yearly Price Frequency
            </p>{" "}
            <DownOutlined
              className={`flex justify-center text-2xl transition-all text-[#475467] duration-300 ease-in-out ${
                halfYearly && "rotate-180"
              }`}
            />
          </div>

          {halfYearly ? (
            <>
              <div className="flex w-full flex-col lg:flex-row gap-5 mb-5 lg:mb-0 lg:gap-16">
                <div>
                  <h1 className="text-[#A8A8A8] pb-3">Gross Price *</h1>
                  <div
                    className={` px-4 py-2 mb-3 lg:w-44 w-full rounded-lg text-base items-center font-normal text-slate flex bg-clip-padding bg-no-repeat border-2 border-solid  first-letter:transition ease-in-out m-0`}
                  >
                    <p className="border-r px-2 lg:px-1">Rs. </p>
                    <input
                      type="number"
                      className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
                      onBlur={(e) => {
                        setHalfYearlyGrossPrice(e.target.value);
                        setOneTimeGrossPrice("");
                      }}
                      defaultValue={halfYearlyGrossPrice}
                      placeholder="0000"
                    />
                  </div>
                  <h1 className="text-primary pb-4 text-sm">
                    *The base price of the course
                  </h1>
                </div>

                <div>
                  <h1 className="text-[#A8A8A8] pb-3">
                    Set EMI Price * (per month)
                  </h1>
                  <div
                    className={` px-4 py-2 mb-3 lg:w-44 w-full rounded-lg text-base items-center font-normal text-slate flex bg-clip-padding bg-no-repeat border-2 border-solid  first-letter:transition ease-in-out m-0`}
                  >
                    <p className="border-r px-2 lg:px-1">Rs. </p>
                    <input
                      type="number"
                      className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
                      onBlur={(e) => setHalfYearlyEmiPrice(e.target.value)}
                      defaultValue={halfYearlyEmiPrice}
                      placeholder="0000"
                    />
                  </div>
                  <h1 className="text-primary pb-4 text-sm">
                    *The EMI price of the user
                  </h1>
                </div>
              </div>

              <h1 className="text-[#A8A8A8] pb-3">Discount Price</h1>
              <div
                className={` px-4 py-2 mb-3 lg:w-44 w-full rounded-lg text-base items-center font-normal text-slate flex bg-clip-padding bg-no-repeat border-2 border-solid   first-letter:transition ease-in-out m-0`}
              >
                <p className="border-r px-2 lg:px-1">Rs. </p>
                <input
                  type="number"
                  onBlur={(e) => setHalfYearlyDiscPrice(e.target.value)}
                  className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
                  defaultValue={halfYearlyDiscPrice}
                  placeholder="0000"
                />
              </div>
              <h1 className="text-primary text-sm">
                *The maximum discount offered on course
              </h1>

              <div className="flex flex-col lg:flex-row gap-5 mb-5 lg:mb-0 lg:gap-16 mt-5">
                <div className="">
                  <h1 className="text-[#A8A8A8] pb-3">Minimum Price</h1>
                  <div
                    className={` px-4 py-2 mb-3 lg:w-44 w-full rounded-lg text-base items-center font-normal text-slate flex bg-clip-padding bg-no-repeat border-2 border-solid  first-letter:transition ease-in-out m-0`}
                  >
                    <p className="border-r px-2 lg:px-1">Rs. </p>
                    <input
                      type="number"
                      onBlur={(e) => setHalfYearlyMinPrice(e.target.value)}
                      className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
                      defaultValue={halfYearlyMinPrice}
                      placeholder="0000"
                    />
                  </div>
                  <h1 className="text-sm text-primary">
                    *This is to help you get more sales
                  </h1>
                </div>

                <div className="">
                  <h1 className="text-[#A8A8A8] pb-3">
                    Effective Price (Final Price)
                  </h1>
                  <div
                    className={` px-4 py-2 mb-3 lg:w-44 w-full rounded-lg text-base items-center font-normal text-slate flex bg-clip-padding bg-no-repeat border-2 border-solid  first-letter:transition ease-in-out m-0`}
                  >
                    <p className="border-r px-2 lg:px-1">Rs. </p>
                    <input
                      type="number"
                      onBlur={(e) => setHalfYearlyEffPrice(e.target.value)}
                      className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
                      defaultValue={halfYearlyEffPrice}
                      placeholder="0000"
                    />
                  </div>
                  <h1 className="text-primary text-sm">
                    *The effective price after discount
                  </h1>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          <div
            className=" p-2 border-2 border-[#A4A4A4]  my-3  flex justify-between"
            onClick={() => {
              setYearly(!yearly);
            }}
          >
            <p className="text-[#A8A8A8] font-bold text-2xl">
              Yearly Price Frequency
            </p>{" "}
            <DownOutlined
              className={`flex justify-center text-2xl transition-all text-[#475467] duration-300 ease-in-out ${
                yearly && "rotate-180"
              }`}
            />
          </div>

          {yearly ? (
            <>
              <div className="flex w-full flex-col lg:flex-row gap-5  lg:mb-0 lg:gap-16">
                <div>
                  <h1 className="text-[#A8A8A8] pb-3">Gross Price *</h1>
                  <div
                    className={` px-4 py-2 mb-3 lg:w-44 w-full rounded-lg text-base items-center font-normal text-slate flex bg-clip-padding bg-no-repeat border-2 border-solid  first-letter:transition ease-in-out m-0`}
                  >
                    <p className="border-r px-2 lg:px-1">Rs. </p>
                    <input
                      type="number"
                      onBlur={(e) => {
                        setYearlyGrossPrice(e.target.value);
                        setOneTimeGrossPrice("");
                      }}
                      className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
                      defaultValue={yearlyGrossPrice}
                      placeholder="0000"
                    />
                  </div>
                  <h1 className="text-primary pb-4 text-sm">
                    *The base price of the course
                  </h1>
                </div>

                <div>
                  <h1 className="text-[#A8A8A8] pb-3">
                    Set EMI Price * (per month)
                  </h1>
                  <div
                    className={` px-4 py-2 mb-3 lg:w-44 w-full rounded-lg text-base items-center font-normal text-slate flex bg-clip-padding bg-no-repeat border-2 border-solid  first-letter:transition ease-in-out m-0`}
                  >
                    <p className="border-r px-2 lg:px-1">Rs. </p>
                    <input
                      type="number"
                      onBlur={(e) => setYearlyEmiPrice(e.target.value)}
                      className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
                      defaultValue={yearlyEmiPrice}
                      placeholder="0000"
                    />
                  </div>
                  <h1 className="text-primary pb-4 text-sm">
                    *The EMI price of the user
                  </h1>
                </div>
              </div>

              <h1 className="text-[#A8A8A8] pb-3">Discount Price</h1>
              <div
                className={` px-4 py-2 mb-3 lg:w-44 w-full rounded-lg text-base items-center font-normal text-slate flex bg-clip-padding bg-no-repeat border-2 border-solid ${
                  discPriceError.length > 0
                    ? "border-red "
                    : "border-[#A4A4A4]  "
                }  first-letter:transition ease-in-out m-0`}
              >
                <p className="border-r px-2 lg:px-1">Rs. </p>
                <input
                  type="number"
                  onBlur={(e) => setYearlyDiscPrice(e.target.value)}
                  className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
                  defaultValue={yearlyDiscPrice}
                  placeholder="0000"
                />
              </div>
              <h1 className="text-primary text-sm">
                *The maximum discount offered on course
              </h1>

              <div className="flex flex-col lg:flex-row gap-5 mb-5 lg:mb-0 lg:gap-16 mt-5">
                <div className="">
                  <h1 className="text-[#A8A8A8] pb-3">Minimum Price</h1>
                  <div
                    className={` px-4 py-2 mb-3 lg:w-44 w-full rounded-lg text-base items-center font-normal text-slate flex bg-clip-padding bg-no-repeat border-2 border-solid  first-letter:transition ease-in-out m-0`}
                  >
                    <p className="border-r px-2 lg:px-1">Rs. </p>
                    <input
                      type="number"
                      onBlur={(e) => setYearlyMinPrice(e.target.value)}
                      className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
                      defaultValue={yearlyMinPrice}
                      placeholder="0000"
                    />
                  </div>
                  <h1 className="text-sm text-primary">
                    *This is to help you get more sales
                  </h1>
                </div>

                <div className="">
                  <h1 className="text-[#A8A8A8] pb-3">
                    Effective Price (Final Price)
                  </h1>
                  <div
                    className={` px-4 py-2 mb-3 lg:w-44 w-full rounded-lg text-base items-center font-normal text-slate flex bg-clip-padding bg-no-repeat border-2 border-solid first-letter:transition ease-in-out m-0`}
                  >
                    <p className="border-r px-2 lg:px-1">Rs. </p>
                    <input
                      type="number"
                      onBlur={(e) => setYearlyEffPrice(e.target.value)}
                      className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
                      defaultValue={yearlyEffPrice}
                      placeholder="0000"
                    />
                  </div>
                  <h1 className="text-primary text-sm">
                    *The effective price after discount
                  </h1>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          <div className="flex w-full flex-col lg:flex-row gap-5  lg:mb-0 lg:gap-16">
            <div>
              <h1 className="text-[#A8A8A8] pb-3">Gross Price *</h1>
              <div
                className={` px-4 py-2 mb-3 lg:w-44 w-full rounded-lg text-base items-center font-normal text-slate flex bg-clip-padding bg-no-repeat border-2 border-solid  first-letter:transition ease-in-out m-0`}
              >
                <p className="border-r px-2 lg:px-1">Rs. </p>
                <input
                  type="number"
                  onBlur={(e) => {
                    setOneTimeGrossPrice(e.target.value);
                    setMonthlyGrossPrice("");
                    setHalfYearlyGrossPrice("");
                    setYearlyGrossPrice("");
                  }}
                  className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
                  defaultValue={oneTimeGrossPrice}
                  placeholder="0000"
                />
              </div>
              <h1 className="text-primary pb-4 text-sm">
                *The base price of the course
              </h1>
            </div>
          </div>

          <h1 className="text-[#A8A8A8] pb-3">Discount Price</h1>
          <div
            className={` px-4 py-2 mb-3 lg:w-44 w-full rounded-lg text-base items-center font-normal text-slate flex bg-clip-padding bg-no-repeat border-2 border-solid ${
              discPriceError.length > 0 ? "border-red " : "border-[#A4A4A4]  "
            }  first-letter:transition ease-in-out m-0`}
          >
            <p className="border-r px-2 lg:px-1">Rs. </p>
            <input
              type="number"
              onBlur={(e) => {
                setOneTimeDiscPrice(e.target.value);
                setYearlyDiscPrice("");
                setMonthlyDiscPrice("");
                setHalfYearlyDiscPrice("");
              }}
              className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
              defaultValue={oneTimeDiscPrice}
              placeholder="0000"
            />
          </div>
          <h1 className="text-primary text-sm">
            *The maximum discount offered on course
          </h1>

          <div className="flex flex-col lg:flex-row gap-5 mb-5 lg:mb-0 lg:gap-16 mt-5">
            <div className="">
              <h1 className="text-[#A8A8A8] pb-3">Minimum Price</h1>
              <div
                className={` px-4 py-2 mb-3 lg:w-44 w-full rounded-lg text-base items-center font-normal text-slate flex bg-clip-padding bg-no-repeat border-2 border-solid  first-letter:transition ease-in-out m-0`}
              >
                <p className="border-r px-2 lg:px-1">Rs. </p>
                <input
                  type="number"
                  onBlur={(e) => {
                    setOneTimeMinPrice(e.target.value);
                    setMonthlyMinPrice("");
                    setYearlyMinPrice("");
                    setHalfYearlyMinPrice("");
                  }}
                  className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
                  defaultValue={oneTimeMinPrice}
                  placeholder="0000"
                />
              </div>
              <h1 className="text-sm text-primary">
                *This is to help you get more sales
              </h1>
            </div>

            <div className="">
              <h1 className="text-[#A8A8A8] pb-3">
                Effective Price (Final Price)
              </h1>
              <div
                className={` px-4 py-2 mb-3 lg:w-44 w-full rounded-lg text-base items-center font-normal text-slate flex bg-clip-padding bg-no-repeat border-2 border-solid first-letter:transition ease-in-out m-0`}
              >
                <p className="border-r px-2 lg:px-1">Rs. </p>
                <input
                  type="number"
                  onBlur={(e) => {
                    setOneTimeEffPrice(e.target.value);
                    setMonthlyEffPrice("");
                    setYearlyEffPrice("");
                    setHalfYearlyEffPrice("");
                    setYearlyEmiPrice("");
                    setHalfYearlyEmiPrice("");
                  }}
                  className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
                  defaultValue={oneTimeEffPrice}
                  placeholder="0000"
                />
              </div>
              <h1 className="text-primary text-sm">
                *The effective price after discount
              </h1>
            </div>
          </div>
        </>
      )}

      {admin ? (
        <div className="flex flex-col lg:flex-row gap-5 mb-5 lg:mb-0 lg:gap-16 mt-5">
          <div className="">
            <h1 className="text-[#A8A8A8] pb-3">Money-Back Guarantee</h1>
            <div
              className={` px-4 py-2 mb-3 lg:w-56 w-full rounded-lg text-base items-center font-normal text-slate flex bg-clip-padding bg-no-repeat border-2 border-solid first-letter:transition ease-in-out m-0`}
            >
              <p className="border-r px-2 lg:px-1">Guarantee. </p>
              <input
                type="text"
                className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
                defaultValue={guarantee}
                onBlur={(e) => setGuarantee(e.target.value)}
                placeholder="1 Month"
              />
            </div>
            <h1 className="text-sm text-primary">Money-Back Guarantee</h1>
          </div>
          <div className="">
            <h1 className="text-[#A8A8A8] pb-3">Enrolled Students</h1>
            <div
              className={` px-4 py-2 mb-3 lg:w-52 w-full rounded-lg text-base items-center font-normal text-slate flex bg-clip-padding bg-no-repeat border-2 border-solid first-letter:transition ease-in-out m-0`}
            >
              <p className="border-r px-2 lg:px-1">Students. </p>
              <input
                type="number"
                className="text-slate text-lg px-3 bg-transparent  placeholder-ghost w-full focus:outline-none"
                defaultValue={enrolledStudents}
                onBlur={(e) => setEnrolledStudents(e.target.value)}
                placeholder="00"
              />
            </div>
            <h1 className="text-sm text-primary">Course Enrolled Students</h1>
          </div>
        </div>
      ) : (
        ""
      )}

      <h1 className="text-2xl w-full space-x-2 hidden lg:flex items-center  py-7   font-dm-sans font-bold">
        Add Coupons
      </h1>

      <div
        className={`border border-primary  px-3 lg:hidden rounded-lg  flex items-center my-3 ${
          isDropDown1 ? "bg-primary" : "bg-white"
        } `}
        onClick={() => [setIsDropDown1(!isDropDown1)]}
      >
        <h1
          className={`text-lg  w-full space-x-2 flex items-center  py-3  font-dm-sans font-medium ${
            isDropDown1 ? "text-white" : ""
          }`}
        >
          Add Coupons
        </h1>
        <MdKeyboardArrowDown
          className={`text-2xl ${isDropDown1 ? "hidden" : "flex"} lg:hidden`}
        />
        <MdKeyboardArrowUp
          className={`text-2xl lg:hidden ${
            isDropDown1 ? "flex text-white" : "hidden"
          }`}
        />
      </div>

      <div
        className={`${
          isDropDown1 ? "grid " : "hidden lg:grid"
        }  lg:grid-cols-2 gap-7`}
      >
        {coupons?.map((item) => (
          <CouponCard
            key={item.id}
            onClick={(id) => setSelectedId((prev) => (prev === id ? null : id))}
            isSelected={item.id === selectedId}
            {...item}
          />
        ))}
      </div>
      <div className="flex py-5 justify-start">
        <button
          onClick={handleSubmit}
          className="text-white bg-primary w-44 py-3 rounded-lg "
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
};

export default CoursePriceAndCoupens;

export const CouponCard = ({
  id,
  couponcode,
  discountrate,
  maxdiscountprice,
  minimumprice,
  onClick = () => {},
  isSelected,
}) => {
  return (
    <div
      className={` px-4 py-2   rounded-lg text-base items-center font-normal text-slate  bg-clip-padding bg-no-repeat border cursor-pointer ${
        isSelected ? "bg-primary border-primary" : "border-[#A4A4A4] bg-white "
      }  first-letter:transition ease-in-out m-0`}
      onClick={() => {
        onClick(id);
      }}
    >
      <div className="">
        <h1
          className={`${isSelected ? "text-white" : ""} text-2xl font-medium`}
        >
          {couponcode}
        </h1>
        <h1
          className={`${
            isSelected ? "text-white" : "text-primary"
          } text-lg  font-medium`}
        >
          Get {discountrate}% Off Upto Rs. {maxdiscountprice}
        </h1>
      </div>
      <hr className="my-2 text-light-white" />

      <div className=" flex items-center ">
        <h2
          className={`${isSelected ? "text-white" : "text-[#B3B3B3]"}  text-xs`}
        >
          Valid on total value of items worth Rs. {minimumprice}
        </h2>
        <button
          type="button"
          className={`${
            isSelected ? "text-white" : "text-primary"
          } text- ml-auto text-sm font-medium`}
        >{`${isSelected ? "REMOVE" : "SELECT"}`}</button>
      </div>
    </div>
  );
};
