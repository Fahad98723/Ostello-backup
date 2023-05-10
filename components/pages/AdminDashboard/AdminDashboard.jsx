import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../../redux/slices/authSlice";
import PageHeader from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

export default function AdminDashboard({
  children,
  currentSection = "Dashboard",
  hideSidebar,
}) {
  const router = useRouter();
  const { userData } = useSelector(authSelector);


  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage.getItem('OWNER_ID') === null) {
      router.push('/merchant/login')
    }  
    if (userData?.usertype === 2) {
      router.push('/merchant/dashboard')
    }
  }, [userData]);

  return (
    <main className="md:flex min-h-screen">
      <section className=''>{!hideSidebar && <Sidebar />}</section>
      <section className="md:px-10 px-5 w-full">
        {!hideSidebar && <PageHeader pageTitle={currentSection} />}
        <>{children}</>
      </section>
    </main>
  );
}
