import dynamic from "next/dynamic";
import React, { Component, useEffect, useState } from "react";
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const SubscriberChart = ({ dates, datesData }) => {
  const [usersCount, setUsersCount] = useState([]);



  useEffect(() => {
    let users = [];
    const temp = new Set();
    const tempNew = new Set();

    datesData.forEach((a) => {
      users.push(a?.data?.length);
    });

    // datesData?.map((d) => {
    //   let arrOld = [];
    //   let arrNew = [];
    //   d?.data?.map((u) => {
    //     temp.add(u?.payload?.userid);
    //     tempNew.add(u?.payload?.ipaddress);
    //   });
    //   arrOld = [...temp];
    //   arrNew = [...tempNew];
    //   users?.push(arrNew?.length);
    // });
    setUsersCount(users);
  }, [datesData]);

  const config = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: dates,
      },
      dataLabels: {
        enabled: true,
      },

      stroke: {
        curve: "smooth",
      },
    },
    series: [
      {
        name: "Total Users",
        data: usersCount,
      },
    ],
  };

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={config.options}
            series={config.series}
            type="line"
            height="300"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default SubscriberChart;
