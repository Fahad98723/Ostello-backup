import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  getInstituteDetails,
} from "../../../../../redux/slices/authSlice";
import { isEmpty } from "../../../../../utils/utils";
import LoadingSpinner from "../../../../layout/LoadingSpinner";
import DashboardSidebar from "../DashboardSidebar";
import ToggleDashboard from "../ToggleDashboard";

//   import "./styles.css";
const QRCodeStyling = dynamic(() => import("qr-code-styling"), {
  ssr: false,
});

const useQRCodeStyling = (options) => {
  //Only do this on the client
  if (typeof window !== "undefined") {
    const QRCodeStylingLib = require("qr-code-styling");
    const qrCodeStyling = new QRCodeStylingLib(options);
    return qrCodeStyling;
  }
  return null;
};

export default function QRCodeFunction() {
  const qrOptions = {
    width: 300,
    height: 300,
    dotsOptions: { type: "classy", color: "#000000" },
    backgroundOptions: { color: "#ffffff" },
    cornersSquareOptions: { type: "square", color: "#000000" },
    cornersDotOptions: { type: "dot", color: "#000000" },
  };

  const qrCode = useQRCodeStyling(qrOptions);

  const ref = useRef(null);
  const { instituteDetails, loading } = useSelector(authSelector);

  const router = useRouter();
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     qrCode.append(ref.current);
  //     qrCode.update({
  //       data: `https://ostello.co.in/institute/${currentInstitute?.slug}`,
  //     });
  //   }, [currentInstitute]);

  const [showSidebar, setShowSidebar] = useState(false);

  // Image Options
  const [imageFile, setImageFile] = useState("");

  // Download Options
  const [fileExt, setFileExt] = useState("png");

  const onExtensionChange = (event) => {
    setFileExt(event.target.value);
  };

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt,
    });
  };

  function toDataURL(url) {
    return new Promise(async (resolve, reject) => {
      const response = await axios.get(url, {
        responseType: "blob",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });

      const reader = new window.FileReader();
      reader.readAsDataURL(response.data);
      reader.onload = function () {
        const imageDataUrl = reader.result;
        resolve(imageDataUrl);
      };
    });
  }

  async function generateImage() {
    const data = await toDataURL(
      "https://cdn.ostello.co.in/logo.png"
    );

    setImageFile(data);
  }

  useEffect(() => {
    qrCode.append(ref.current);
    qrCode.update({
      data: `https://ostello.co.in/institute/${instituteDetails?.slug}`,
    });
    generateImage();
  }, [instituteDetails, qrCode]);

  useEffect(() => {
    qrCode.update({
      image: imageFile,
    });
  }, [imageFile, qrCode]);
  //   useEffect(() => {
  //     if (
  //       typeof window !== "undefined" &&
  //       window.localStorage.getItem("OWNER_ID") === null
  //     )
  //       router.push("/merchant/login");
  //     else if (
  //       typeof window !== "undefined" &&
  //       window.localStorage.getItem("INSTITUTE_ID") === null
  //     )
  //       router.push("/merchant/details");
  //     dispatch(getInstituteDetails());
  //   }, [router]);

  //   useEffect(() => {
  //     if (
  //       !loading &&
  //       !isEmpty(instituteDetails) &&
  //       instituteDetails.approval !== 1
  //     ) {
  //       router.push("/merchant/details/success");
  //     } else {
  //       return;
  //     }
  //   }, [instituteDetails, loading, router]);

  // useEffect(() => {});

  function logout() {
    router.push("/merchant");
    localStorage.clear();
    typeof window !== "undefined" && window.location.reload();
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="main">
      <div className="">
        {/* <label htmlFor="">
                File Download Options
              </label> */}
        <div className="flex">
          <select
            className="shrink w-full px-3 py-2  shadow-md rounded-xl text-base font-normal text-slate bg-white bg-clip-padding bg-no-repeat border-2 border-solid border-light-gray first-letter:transition ease-in-out m-0 focus:outline-none text-md mt-2"
            name=""
            onChange={onExtensionChange}
            value={fileExt}
          >
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WEBP</option>
          </select>

          <button
            className="ml-3 bg-primary text-white px-3 py-0 rounded-xl "
            onClick={onDownloadClick}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  inputWrapper: {
    margin: "20px 0",
    display: "flex",
    justifyContent: "space-between",
    width: "95%",
  },
  inputBox: {
    flexGrow: 1,
    marginRight: 20,
  },
};
