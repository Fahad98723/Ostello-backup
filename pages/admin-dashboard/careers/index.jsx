import Link from "next/link";
import React from "react";
import MetaHelmet from "../../../components/MetaHelmet";
import AdminDashboard from "../../../components/pages/AdminDashboard/AdminDashboard";

export default function Careers({ meta }) {
  return (
    <AdminDashboard currentSection="Careers">
      <MetaHelmet title={meta.title} link={meta.link} />
      <section>
        <div className="flex justify-between  px-6">
          <Link legacyBehavior prefetch={false} href={"/admin-dashboard/careers/add"}>
            <button className="px-12 ml-auto font-bold rounded-lg py-2 text-white bg-[#7D23E0]">
              Add Career
            </button>
          </Link>
        </div>

        <section className=" pt-4 pb-16">
          <div className="grid gap-10 md:grid-cols-2 grid-cols-1">
            {/* {allData.map((data, index) => (
              <div key={index} className='relative'>
                <Link legacyBehavior prefetch={false} href='/admin-dashboard/careers/edit'>
                  <div className='bg-white rounded-xl shadow-md px-4 py-6'>
                    <div className='flex flex-col'>
                      <div className='text-[#1C1C1C] text-3xl font-medium'>
                        {data.title}
                      </div>
                      <hr className='my-3' />
                      <div className='text-[#616161]'>{data.desc}</div>
                    </div>
                  </div>
                </Link>
                <div className='absolute top-5 right-6 bg-white p-2.5 shadow-lg cursor-pointer rounded-full'>
                  <DeleteIcon />
                </div>
              </div>
            ))} */}
          </div>
        </section>
      </section>
    </AdminDashboard>
  );
}

export const getStaticProps = async () => {
  const meta = {
    title: "Careers - Admin Dashboard - Ostello",
  };
  // 
  return {
    props: {
      meta,
    },
  };
};

// const allData = [
//   {
//     title: 'Ui/Ux Designer',
//     desc: 'You don’t need any advanced degrees or experiences to be a part of the Ostello team. You don’t need any advanced degrees or experiences to be a part of the Ostello team.',
//   },
//   {
//     title: 'Ui/Ux Designer',
//     desc: 'You don’t need any advanced degrees or experiences to be a part of the Ostello team. You don’t need any advanced degrees or experiences to be a part of the Ostello team.',
//   },
//   {
//     title: 'Ui/Ux Designer',
//     desc: 'You don’t need any advanced degrees or experiences to be a part of the Ostello team. You don’t need any advanced degrees or experiences to be a part of the Ostello team.',
//   },
//   {
//     title: 'Ui/Ux Designer',
//     desc: 'You don’t need any advanced degrees or experiences to be a part of the Ostello team. You don’t need any advanced degrees or experiences to be a part of the Ostello team.',
//   },
//   {
//     title: 'Ui/Ux Designer',
//     desc: 'You don’t need any advanced degrees or experiences to be a part of the Ostello team. You don’t need any advanced degrees or experiences to be a part of the Ostello team.',
//   },
//   {
//     title: 'Ui/Ux Designer',
//     desc: 'You don’t need any advanced degrees or experiences to be a part of the Ostello team. You don’t need any advanced degrees or experiences to be a part of the Ostello team.',
//   },
//   {
//     title: 'Ui/Ux Designer',
//     desc: 'You don’t need any advanced degrees or experiences to be a part of the Ostello team. You don’t need any advanced degrees or experiences to be a part of the Ostello team.',
//   },
//   {
//     title: 'Ui/Ux Designer',
//     desc: 'You don’t need any advanced degrees or experiences to be a part of the Ostello team. You don’t need any advanced degrees or experiences to be a part of the Ostello team.',
//   },
//   {
//     title: 'Ui/Ux Designer',
//     desc: 'You don’t need any advanced degrees or experiences to be a part of the Ostello team. You don’t need any advanced degrees or experiences to be a part of the Ostello team.',
//   },
// ]
