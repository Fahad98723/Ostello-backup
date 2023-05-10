import React, { useState } from "react";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const handleChange = (e, setState) => {
    setState(e.target.value);
  };
  return (
    <div className="md:py-10 py-5">
      <div className="heading">
        <p className="md:text-[36px] text-[30px] font-semibold text-center">
          Register your Tuition Center
        </p>
      </div>

      <div className="form md:w-2/4 w-full mx-auto">
        <div className="shrink px-2   mx-auto w-full md:my-10 my-3  text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
          <input
            type="text"
            autoFocus
            className="text-xl bg-white  w-full mx-auto rounded-[5px] py-4 px-5  focus:outline-none border-2 border-solid border-[#C4C4C4]  w-full"
            placeholder="Name of your Tuition Center"
            onChange={(e) => handleChange(e, setName)}
            value={name}
          />
        </div>
        <div className="shrink px-2   mx-auto w-full md:my-10 my-3   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
          <input
            type="text"
            autoFocus
            className="text-xl bg-white  focus:outline-none rounded-[5px] py-4 px-5 border-2 border-solid border-[#C4C4C4]   w-full"
            placeholder="Name of Tuition Center Owner"
            onChange={(e) => handleChange(e, setName)}
            value={name}
          />
        </div>
        <div className="shrink px-2   mx-auto w-full md:my-10 my-3   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
          <p className="text-[26px] text-[#1B1B1B] font-semibold mb-5">
            Address
          </p>
          <div className="flex">
            <input
              type="text"
              autoFocus
              className="text-xl bg-white w-3/5  focus:outline-none rounded-[5px] py-4 px-5 border-2 border-solid border-[#C4C4C4]   w-full"
              placeholder="City"
              onChange={(e) => handleChange(e, setName)}
              value={name}
            />
            <input
              type="text"
              autoFocus
              className="text-xl bg-white w-2/5 ml-2  focus:outline-none rounded-[5px] py-4 px-5 border-2 border-solid border-[#C4C4C4]   w-full"
              placeholder="Pincode"
              onChange={(e) => handleChange(e, setName)}
              value={name}
            />
          </div>
        </div>

        <div className="shrink px-2   mx-auto w-full md:my-10 my-3   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
          <input
            type="text"
            autoFocus
            className="text-xl bg-white  focus:outline-none rounded-[5px] py-4 px-5 border-2 border-solid border-[#C4C4C4]   w-full"
            placeholder="Subjects your tuition offers"
            onChange={(e) => handleChange(e, setName)}
            value={name}
          />
        </div>

        <div className="shrink px-2   mx-auto w-full md:my-10 my-3   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
          <input
            type="text"
            autoFocus
            className="text-xl bg-white  focus:outline-none rounded-[5px] py-4 px-5 border-2 border-solid border-[#C4C4C4]   w-full"
            placeholder="Tuition’s Mobile/ Telephone Number"
            onChange={(e) => handleChange(e, setName)}
            value={name}
          />
        </div>

        <div className="shrink px-2   mx-auto w-full md:my-10 my-3   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
          <input
            type="text"
            autoFocus
            className="text-xl bg-white  focus:outline-none rounded-[5px] py-4 px-5 border-2 border-solid border-[#C4C4C4]   w-full"
            placeholder="Tuition Owner’s Mobile/ Telephone Number"
            onChange={(e) => handleChange(e, setName)}
            value={name}
          />
        </div>

        <div className="shrink px-2   mx-auto w-full md:my-10 my-3   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
          <input
            type="text"
            autoFocus
            className="text-xl bg-white  focus:outline-none rounded-[5px] py-4 px-5 border-2 border-solid border-[#C4C4C4]   w-full"
            placeholder="Nearby School names?"
            onChange={(e) => handleChange(e, setName)}
            value={name}
          />
        </div>


        <p className="bg-primary text-white border-[1px] border-white rounded-[5px] md:w-[400px] mx-auto text-center w-[200px] text-[21px] py-2">Register Now</p>


      </div>
    </div>
  );
};

export default RegisterForm;
