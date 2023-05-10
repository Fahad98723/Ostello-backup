import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useClickOutside } from "../../../../../hooks/useClickOutside";
import useScript from "../../../../../hooks/useScripts";

const SearchHead = dynamic(
  () => {
    return import("./SearchHead");
  },
  { ssr: false }
);
const LocationCard = dynamic(
  () => {
    return import("./locationCard");
  },
  { ssr: false }
);
const Scroll = dynamic(
  () => {
    return import("../scroll");
  },
  { ssr: false }
);

const LocationSearch = () => {
  const [toggle, setToggle] = useState(false);
  let domNode = useClickOutside(() => {
    setToggle(false);
  });

  const [loaded, error] = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&region=in`
  );
  return (
    loaded && (
      <div ref={domNode} className="relative w-full ">
        <SearchHead currentValue={toggle} setToggle={setToggle} />

        {toggle && (
          <Scroll
            style={{ boxShadow: "0px 4px 15px rgba(125, 35, 224, 0.2)" }}
            className=""
          >
            <LocationCard toggle={toggle} setToggle={setToggle} />
          </Scroll>
        )}
      </div>
    )
  );
};

export default LocationSearch;
