import { useRouter } from "next/router";
import React from "react";

const TopHeader = () => {
  const router = useRouter();
  return (
    <div>
      {router.pathname === "/institute/[instituteId]" ? (
        ""
      ) : (
        <div className="p-2 bg-primary text-white md:text-[16px] text-[14px] text-center ">
          For Coaching Discounts and Further Details,{" "}
          <br className="md:hidden block " />
          <a className="text-white" href="tel:+91-82714-69630">
            Call - 8271469630
          </a>{" "}
        </div>
      )}
    </div>
  );
};

export default TopHeader;
