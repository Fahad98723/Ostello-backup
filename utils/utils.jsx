import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useState } from "react";
import { cdnHost, host } from "./constant";

export const titleToUrl = (title) =>
  title
    ?.trim()
    .toLowerCase()
    .replaceAll(" ", "-")
    .replace(/&/g, "and")
    .replaceAll("?", "-")
    .replaceAll("+", "%2B")
    .replaceAll("/", "-or-");
export const urlToTitle = (title) =>
  capitalizeFirstLetter(title).replaceAll("-", " ");

export const capitalize = (str) =>
  str.replace(
    /\b([a-zÁ-ú]{3,})/g,
    (w) => w.charAt(0).toUpperCase() + w.slice(1)
  );

export const isEmptyObj = (obj) => Object?.keys(obj)?.length === 0;

export const phoneNumberToNumber = (phoneNumber) =>
  parseInt(phoneNumber.replace(/\s/g, ""));
let navigator;

if (typeof window !== "undefined") {
  navigator = window.navigator;
}

export const capitalizeFirstLetter = (name) => {
  const nameArray = name.split(" ");
  return (
    nameArray[0].charAt(0).toUpperCase() +
    nameArray[0].slice(1) +
    " " 
  );
};

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("ACCESS_TOKEN");
  }
  return null;
};

export const headers = {
  "Access-Control-Allow-Origin": "*",
  Authorization: `Bearer ${getAccessToken()}`,
};

export const isEmpty = (value) => {
  if (typeof value === "number" && value !== 0) {
    return false;
  }
  return (
    value === null ||
    value === "" ||
    value === undefined ||
    value === 0 ||
    value?.length === 0 ||
    isEmptyObj(value)
  );
};

export const FilterImagesAndVideos = ({ filesArray, setImages, setVideos }) => {
  Object.values(filesArray).forEach((item) => {
    if (item.type.toLowerCase().includes("video")) {
   
      setVideos((prev) => (!isEmpty(prev) ? [...prev, item] : [item]));
    }
    if (item.type.toLowerCase().includes("image")) {
  
      setImages((prev) => (!isEmpty(prev) ? [...prev, item] : [item]));
    }
  });
};

export const downloadPdfDocument = (rootElementId, fileName) => {
  const input = document.getElementById(rootElementId);
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "JPEG", 0, 0);
    pdf.save(`${fileName}.pdf`);
  });
};
export const extractISOString = (string) => {
  const d = new Date(string?.slice(0, -1));
  const [day, month, date, year, time] = [
    d.getDay(),
    d.getMonth(),
    d.getDate(),
    d.getFullYear(),
    d.getTime(),
  ];

  return {
    day,
    month,
    date,
    year,
    time,
    formatted: d,
  };
};

// blog reading time
export function readingTime(text) {
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
}

// date format
export function makeDateFormat(timestamp) {
  const date = new Date(timestamp);
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear()
  );
}

// get video duration
export function getVideoDuration(useRef) {
  const video = useRef.current;
  if (!video) return;
  return Math.ceil(secToMinConvert(video.duration));
}

// sec to min convert
export function secToMinConvert(sec) {
  return (1 / 60) * sec;
}

export const ReadMoreComponent = ({
  text,
  percentOfLessShow = 50,
  className = "",
  toggleClass,
}) => {
  const [show, setShow] = useState(false);
  const lengthOfText = text?.length;
  const lessShowCharactersCount = Math.round(
    (lengthOfText * percentOfLessShow) / 100
  );

  return (
    <>
      <div className={className}>
        <p>
          {" "}
          {show ? text : text.slice(0, lessShowCharactersCount)}{" "}
          <span className={toggleClass} onClick={() => setShow(!show)}>
            {show ? "Read Less" : "Read More"}
          </span>{" "}
        </p>
      </div>
    </>
  );
};

export const isJsonParsable = (string) => {
  if (isEmpty(string)) {
    return false;
  } else {
    try {
      JSON.parse(string);
      return true;
    } catch (err) {
      return false;
    }
  }
};

const CHUNK_SIZE = 10000000;

async function handleFile(file, updatePercentage) {
  let counter = 0;

  const extension = file.name.split(".")[file.name.split(".").length - 1];
  const parts =
    file.size % CHUNK_SIZE === 0
      ? file.size / CHUNK_SIZE
      : Math.floor(file.size / CHUNK_SIZE) + 1;

  const signedUrlsResponse = await axios.get(
    `${host}/utils/url?extension=${extension}&parts=${parts}`
  );

  const { key, urls, uploadId } = signedUrlsResponse.data;


  const results = [];
  const keys = Object.keys(urls);

  const awsAxios = axios.create();
  delete awsAxios.defaults.headers.put["Content-Type"];

  for (const indexStr of keys) {
    const index = parseInt(indexStr);
    const start = index * CHUNK_SIZE;
    const end = (index + 1) * CHUNK_SIZE;
    const percent = (counter / parts) * 100;
    const blob =
      index < keys.length ? file.slice(start, end) : file.slice(start);

    const uploadResponse = await awsAxios.put(urls[index], blob);
    updatePercentage(percent);

  

    results.push(uploadResponse);
    counter = counter + 1;
  }

  const uploadedParts = [];

  results.forEach((p, index) => {
    uploadedParts.push({
      ETag: p.headers.etag,
      PartNumber: index + 1,
    });
  });



  const multiPartUploadCompleteRes = await axios.post(
    `${host}/utils/complete`,
    {
      key,
      uploadId,
      parts: uploadedParts,
    }
  );


  updatePercentage(100);

  return {
    url: `${cdnHost}/${key}`,
    key,
  };
}

export const FileUploader = async (filesArray = [], updatePercentage) => {
  return new Promise(async (resolve, reject) => {
    const resultArray = [];

    try {
      for (let i = 0; i < filesArray.length; i++) {
        const res = await handleFile(filesArray[i], updatePercentage);
        resultArray.push(res);
      }

      resolve(resultArray);
    } catch (err) {
      reject(err);
    }
  });
};
