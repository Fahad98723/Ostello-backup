import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getUser } from "../../../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const TopHeader = dynamic(
  () => {
    return import("./TopHeader");
  },
  { ssr: false }
);
const AuthModal = dynamic(
  () => {
    return import("./AuthModal");
  },
  { ssr: false }
);
const DescTopNavbar = dynamic(
  () => {
    return import("./DescTopNavbar");
  },
  { ssr: false }
);
const MobileNavbar = dynamic(
  () => {
    return import("./MobileNavbar");
  },
  { ssr: false }
);

export default function Navbar({ usingFor, bg }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <section className="pb-10">
      <section className="fixed bg-white z-50 top-0  md:max-w-[1350px] w-full mx-auto  shadow">
        <TopHeader />
        <AuthModal
          handleClose={handleClose}
          handleOpen={handleOpen}
          open={open}
        />
        {/* Mobile Navbar */}
        <MobileNavbar usingFor={usingFor} />
        {/* Desktop Navbar */}
        <DescTopNavbar usingFor={usingFor} bg={bg} />
      </section>
    </section>
  );
}
