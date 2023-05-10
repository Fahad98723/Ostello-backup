import React from "react";
import {
  ExamFAQsData,
  FAQsData,
  MentorFAQsData,
  MerchantFAQsData,
} from "./data";
import dynamic from "next/dynamic";
const FAQCard = dynamic(
  () => {
    return import("../InstituteSection/FAQCard");
  },
  { ssr: false }
);

export default function OstelloFAQ({ usingFor, blogsFaq }) {
  return (
    <div className=" my-10 grid grid-cols-1 md:grid-cols-2    p-5 lg:px-24 md:space-x-10 space-y-10 md:space-y-0 ">
      <div className=" space-y-5">
        <h1 className="text-4xl font-bold ">FAQs</h1>
        <p className="text-[18px] font-[400px] text-gray  max-w-[450px]">
          FAQs enable you to deal with specific queries that your students have
          about their future coaching institutions. The FAQs also represent
          another way to reach out your favorable institutions.
        </p>
      </div>
      <div className="">
        {usingFor === "merchantLanding"
          ? MerchantFAQsData.map((item, key) => <FAQCard key={key} {...item} />)
          : usingFor === "examPage"
          ? ExamFAQsData.map((item, key) => <FAQCard key={key} {...item} />)
          : usingFor === "mentorPage"
          ? MentorFAQsData.map((item, key) => <FAQCard key={key} {...item} />)
          : usingFor === "blogFaq"
          ? blogsFaq.map((item, key) => <FAQCard key={key} {...item} />)
          : FAQsData.map((item, key) => <FAQCard key={key} {...item} />)}
      </div>
    </div>
  );
}
