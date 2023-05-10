import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { host } from "../../../../utils/constant";

export default function OstelloSubscribe() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email.length > 5) {
      return toast.error("Please enter valid email address");
    }
    try {
      const { data } = await axios.post(
        `${host}/mailing/`,
        {
          email,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${window.localStorage.getItem(
              "ACCESS_TOKEN"
            )}`,
          },
        }
      );
      toast.success("You are  subscribed to our newsletter !");
    } catch (err) {
      toast.error("You are already subscribed !");
      
    } finally {
      setEmail("");
    }
  };
  return (
    <section className="bg-[#F4EBFF] ">
      <div className="  md:flex justify-between py-10 md:px-10 px-5 items-center">
        <div className="text-md">
          <h1 className="text-2xl md:4xl">Join our newsletter</h1>
          <p>We'll send you a nice letter once per week. No spam</p>
        </div>
        <div className="flex flex-col lg:flex-row   space-y-5 lg:space-x-5 lg:space-y-0 mt-5 items-center">
          <input
            type="email"
            value={email}
            className="border border-gray/40 outline-none join p-2 rounded-md w-full md:w-[250px] "
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <button
            onClick={() => {
              handleSubscribe();
            }}
            className="px-4  py-2 rounded-md bg-primary hover:bg-white border border-primary hover:text-primary text-white duration-300 w-full md:w-fit"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
