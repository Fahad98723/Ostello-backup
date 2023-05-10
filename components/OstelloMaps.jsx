import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import dynamic from "next/dynamic";

const GoogleMapReact = dynamic(
  () => {
    return import("google-map-react");
  },
  { ssr: false }
);

const MapReactComponent = ({ text }) => (
  <div className="flex items-center justify-center">
    <FaMapMarkerAlt className="bg-red" />
    {text}
  </div>
);

export default function OstelloMap() {
  const defaultProps = {
    center: {
      lat: 28.56619,
      lng: 77.197141,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "48vh", width: "48vh" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <MapReactComponent text="Ostello India" />
      </GoogleMapReact>
    </div>
  );
}
