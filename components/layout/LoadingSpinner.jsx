import React from "react";
import imgLoadingpng from "../../assets/slackLoading.webp";
import Image from "next/image";

export default function LoadingSpinner() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-white">
      <Image
        width="0"
        height="0"
        sizes="100vw"
        src={imgLoadingpng.src}
        alt="Loader"
        className="w-16 h-16 animate-spin"
      />
    </div>
  );
}
