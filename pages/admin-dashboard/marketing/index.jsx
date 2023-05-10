import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import AdminDashboard from "../../../components/pages/AdminDashboard/AdminDashboard";
export default function AdminWhatsapp() {
  const router = useRouter();
  const navigate = (link) => router.push(link);
  return (
    <AdminDashboard currentSection="Marketing">
      <Head>
        <title>Marketing - Admin Dashboard - Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="md:px-[30px] px-[5px] !mt-[0px]">
        <div
          onClick={() =>
            navigate("/admin-dashboard/marketing/whatsapp-marketing")
          }
          className="flex justify-between bg-white p-3 cursor-pointer"
        >
          <p className="text-xl bold ml-4 font-bold">Whatsapp Marketing</p>
          <div className="cursor-pointer mr-16">
            <RiArrowRightSLine className="scale-125 text-3xl" />
          </div>
        </div>
        <div
          onClick={() =>
            navigate("/admin-dashboard/marketing/whatsapp-onboarding")
          }
          className="flex justify-between bg-white cursor-pointer p-3 mt-1"
        >
          <p className="text-xl bold ml-4 font-bold">
            Whatsapp Institute Onboarding
          </p>
          <div className="cursor-pointer mr-16">
            <RiArrowRightSLine className="scale-125 text-3xl" />
          </div>
        </div>
        <div
          onClick={() => navigate("/admin-dashboard/marketing/email-marketing")}
          className="flex justify-between bg-white p-3 cursor-pointer"
        >
          <p className="text-xl bold ml-4 font-bold">Email Marketing</p>
          <div className="cursor-pointer mr-16">
            <RiArrowRightSLine className="scale-125 text-3xl" />
          </div>
        </div>
      </div>
    </AdminDashboard>
  );
}
