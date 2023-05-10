import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/layout/Footer/index";
import MetaHelmet from "../../components/MetaHelmet";
import logo from '../../assets/merchantDashboard/Accountancy/logo.png'
import OstelloSubscribe from "../../components/pages/HomeLanding/OstelloSubscribe";
import Profile from "../../components/pages/Profile/Profile";
import { authSelector } from "../../redux/slices/authSlice";
import { setUserLocation } from "../../redux/slices/UserAnalytics";

export default function UserProfile({ meta }) {
  const dispatch = useDispatch();
  useEffect(() => {
    navigator.geolocation &&
      navigator.geolocation.getCurrentPosition(function (position) {
        dispatch(
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
      });
  });
  const router = useRouter();
  const { isAuthenticated, loading, userData } = useSelector(authSelector);



  useEffect(() => {
    if (!isAuthenticated && !loading )
      return router.push("/");
    if (userData.usertype !== 3)
      return router.push("/");
  }, [loading, isAuthenticated, router, userData.usertype]);

  return (
    <div>
      <MetaHelmet
        title={meta.title}
        description={meta.description}
        link={meta.link}
      />
      <Link legacyBehavior prefetch={false} href={'/'}>
        <a
          href=''
          className='logo lg:flex items-center ml-4 mt-5 mb-12 hidden '
        >
          <img src={logo.src} alt='' />
        </a>
      </Link>
      <Profile />
      <OstelloSubscribe />
      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  const meta = {
    title: "Profile - ostello.co.in",
    description:
      "Book your course at Ostello at the best coaching institutes in Delhi near you. | Compare and Choose from the best teachers through Demo classes | Interact with the toppers and choose what's best for you",
    link: "https://www.ostello.co.in/profile",
  };

  return {
    props: {
      meta,
    },
  };
};
