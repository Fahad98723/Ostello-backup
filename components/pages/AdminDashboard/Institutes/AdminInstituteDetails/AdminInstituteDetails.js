import Head from "next/head";
import React, { useState } from "react";
import AdminDashboard from "../../AdminDashboard";
import Header from "../../Header/Header";
import AdminInstituteCourse from "./AdminInstituteCourse/AdminInstituteCourse";
import AdminInstituteOverview from "./AdminInstituteOverview/AdminInstituteOverview";
import OldAdminInstitute from "./AdminInstituteOverview/OldAdminInstitute";
import AdminInstituteSubscriberChart from "./AdminInstituteSubscriberChart/AdminInstituteSubscriberChart";
import InstituteSidebar from "./InstituteSidebar";

const AdminInstituteDetails = () => {
  const [active, setActive] = useState("Overview");
  return (
    <AdminDashboard hideSidebar>
      {/* <Head>
        <title>Institute Overview - Admin Dashboard - Ostello</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head> */}
      <div className="flex md:flex-row flex-col">
        <div className="w-[240px] ">
          <InstituteSidebar active={active} setActive={setActive} />
        </div>
        <div className="w-full">
          <Header pageTitle={active} />
          <>
            {active === "Overview" ? (
              <>
                <AdminInstituteOverview />
              </>
            ) : active === "Institute Courses" ? (
              <>
                <AdminInstituteCourse />
              </>
            ) : active === "Subscriber Chart" ? (
              <>
                <AdminInstituteSubscriberChart />{" "}
              </>
            ) : null}
          </>
        </div>
      </div>
    </AdminDashboard>
  );
};

export default AdminInstituteDetails;
