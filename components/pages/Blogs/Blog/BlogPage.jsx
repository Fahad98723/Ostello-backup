import React, { useEffect } from "react";
import { useCopyToClipboard } from "react-use";

import copyIcon from "./blog-assets/copyIcon.svg";

import { useRouter } from "next/router";
import toast from "react-hot-toast";
import facebook from "../../../../assets/icons/facebook.svg";
import linkedin from "../../../../assets/icons/linkedin.svg";
import twitter from "../../../../assets/icons/twitter.svg";
import MetaHelmet from "../../../MetaHelmet";
import { host } from "../../../../utils/constant";
import axios from "axios";
import { AiFillEye } from "react-icons/ai";

import useScreenWidth from "../../../hooks/useScreenWidth";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(
  () => {
    return import("react-player");
  },
  { ssr: false }
);
const Navbar = dynamic(
  () => {
    return import("../../HomeLanding/Header/Navbar");
  },
  { ssr: false }
);

// Tag Components ==>>
const Section = ({ children, className }) => (
  <section className={` space-y-2 mt-10 md:max-w-3xl md:mx-auto ${className}`}>
    {children}
  </section>
);
const Title = ({ children, className }) => (
  <h1
    className={`font-bold text-2xl mt-10
    ${className}`}
  >
    {children}
  </h1>
);
const Paragraph = ({ children, className }) => (
  <p className={`text-gray py-2 md:text-lg mt-2 ${className}`}>{children}</p>
);
const Image = ({ src, className }) => (
  <div className="w-full">
    <img className={`w-fit mx-auto ${className}`} src={src} alt="" />
  </div>
);

const Divider = ({ className }) => (
  <span
    className={`border-2 border-l-0 border-r-0 border-b-0 block w-full max-w-3xl mx-auto border-gray/10 ${className}`}
  />
);

const Quote = ({ caption, text }) => {
  return (
    <section className="border py-2 border-primary  border-l-2 border-r-0 border-t-0 border-b-0 pl-5 mt-10">
      <p className=" font-bold italic max-w-lg md:text-lg">" {text} "</p>
      <p className="mt-5 text-gray"> - {caption}</p>
    </section>
  );
};

const Tag = ({ type, children, className }) => {
  let red = ` text-[#FF0000]-600 bg-red-100 `;
  let green = ` text-green-600 bg-green-100 `;
  let blue = ` text-blue-600 bg-blue-100 `;

  return (
    <span
      className={` rounded-xl px-2 py-1 ${
        type == "red"
          ? red
          : type == "green"
          ? green
          : type == "blue"
          ? blue
          : null
      } ${className}`}
    >
      {children}
    </span>
  );
};

const LinkButton = ({ children, className, url, onClick, ...rest }) => {
  const router = useRouter();
  const handleClick = () => {
    if (url?.length) {
      router.push(url);
    }
  };

  return (
    <button
      onClick={() => {
        handleClick();
      }}
      className={`  border-2 border-gray/30 rounded-md  active:opacity-80 duration-300 transition-all p-2 h-8 flex items-center justify-center w-fit  ${className}`}
    >
      {children}
    </button>
  );
};

export default function BlogPage({
  id,
  category,
  title,
  images,
  videos,
  alt,
  description,
  metaDesc,
  slugUrl,
  authorSrc,
  authorAlt,
  authorName,
  postDate,
  read,
  currentBlog,
  isPreview,
  views,
  onBack = () => {},
}) {
  const [state, copyToClipboard] = useCopyToClipboard();
  // const content =
  //   (isJsonParsable(description) && JSON.parse(description)) || null;

  const PostDate = () => {
    let formatted;

    let parts = Date(postDate).split(" ");
    formatted = parts[2] + "-" + parts[1] + "-" + parts[3];
    return formatted;
  };

  const parseTag = (block) => {
    const { type, data, id } = block;
    const renderTextOrHTML = () => {
      const sanitizedText = data?.text?.replaceAll("&nbsp;", " ");
      if (data?.text?.indexOf("<") !== -1) {
        return (
          <div key={id} dangerouslySetInnerHTML={{ __html: sanitizedText }} />
        );
      } else {
        return sanitizedText;
      }
    };
    if (type === "paragraph") {
      return <Paragraph key={id}>{renderTextOrHTML(data?.text)}</Paragraph>;
    } else if (type === "header") {
      return <Title key={id}>{renderTextOrHTML(data?.text)}</Title>;
    } else if (type === "quote") {
      return (
        <Quote
          key={id}
          text={renderTextOrHTML(data?.text)}
          caption={renderTextOrHTML(data?.caption)}
        />
      );
    } else if (type === "list") {
      const listType = data?.style === "ordered" ? "ol" : "ul";
      const childrens = data?.items?.reduce(
        (acc, item) => acc + `<li>${item}</li>`,
        ""
      );
      return (
        <div className="pl-6">
          {renderTextOrHTML(`<${listType} >${childrens}</${listType}>`)}
        </div>
      );
    } else if (type === "image") {
      return (
        <div className="" key={id}>
          <Image src={data?.file?.url} alt="" />
          <Paragraph>{data?.caption}</Paragraph>
        </div>
      );
    }
  };
  useEffect(() => {
    const patchViews = async () => {
      const body = {
        id: id,
      };
      try {
        const response = await axios.patch(`${host}/blog/views`, body, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
      } catch (err) {}
    };
    patchViews();
  }, [id]);

  const { screenWidth } = useScreenWidth();

  return (
    <>
      {!isPreview && (
        <>
          <div className="md:mb-[100px]">
            <div className=" md:max-w-[1350px] w-full">
              <Navbar />
            </div>
          </div>
        </>
      )}
      <main className="my-20 px-6 max-w-5xl mx-auto">
        {/* Header */}
        <Section className="flex justify-center items-center flex-col -mt-6 ">
          {/* <p className=" text-primary text-center  font-bold ">
            Published on {PostDate()}
          </p> */}
          <p className=" text-primary text-center  font-bold  md:block text-lg">
            {category?.charAt(0).toUpperCase() +
              category?.slice(1).toLowerCase()}
          </p>

          <Title className={"text-4xl text-center "}>{title}</Title>
          {/* {content?.intro?.length > 0 && ( */}
          <Paragraph className="text-center max-w-xl">{metaDesc}</Paragraph>
          {/* )} */}

          {/* Author */}
          {/* <div className="flex items-center justify-center space-x-2 pt-2  whitespace-nowrap">
            <Image src={authorSrc.src} className="w-full " alt={authorAlt} />
            <div>
              <h6 className="text-black font-bold whitespace-nowrap">
                {authorName}
              </h6>
              <p className="block text-gray text-xs">{PostDate()}</p>
            </div>
          </div> */}
        </Section>

        {/* Cover */}
        <section className=" space-y-4 my-10">
          <Image
            src={
              images?.url
                ? `https://cdn.ostello.co.in/${images?.key}`
                : images?.length
                ? `https://cdn.ostello.co.in/${images[0]?.key}`
                : images
            }
            className="w-full h-full "
            alt={authorAlt}
          />

          <Divider />

          {videos?.length ? (
            <ReactPlayer
              controls
              width="100%"
              height={screenWidth > 768 ? "500px" : "350px"}
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: 1,
                    controls: 1,
                    // frameborder: 0,
                  },
                },
              }}
              url={
                videos[0]?.key
                  ? `https://cdn.ostello.co.in/${videos[0]?.key}`
                  : videos[0]?.url
              }
            />
          ) : (
            ""
          )}
        </section>
        {/*  */}
        <Section>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </Section>
        {/* {content?.blocks?.map((block) => parseTag(block))} */}

        <Section>
          <Divider className={" my-5"} />
        </Section>
        <Section className={"md:flex justify-between space-y-5 md:space-y-0"}>
          <div className=" space-x-2">
            <Tag type={"blue"}>Product</Tag>
            <Tag type={"red"}>Tools</Tag>
            <Tag type={"red"}>SaaS</Tag>
          </div>

          <div className="flex space-x-2">
            <div className="flex  items-center space-x-2 px-2 text-[16px] text-[#7F56D9]">
              <AiFillEye />
              <span>
                {parseInt(views) > 1000 ? `${parseInt(views) / 1000} k` : views}{" "}
                views
              </span>
            </div>
            <LinkButton
              onClick={() => {
                copyToClipboard(location.href);
                toast.success("Link coppied !");
              }}
            >
              <div className="flex items-center  space-x-2 px-2">
                <img src={copyIcon.src} className="w-5 h-5" alt="" />
                <p className="text-gray">Copy link</p>
              </div>
            </LinkButton>
            <LinkButton>
              <img src={twitter.src} className="w-5 h-5" alt="" />
            </LinkButton>
            <LinkButton>
              <img src={facebook.src} className="w-5 h-5" alt="" />
            </LinkButton>
            <LinkButton>
              <img src={linkedin.src} className="w-5 h-5" alt="" />
            </LinkButton>
          </div>
        </Section>
      </main>
      {/* <OstelloSubscribe /> */}
    </>
  );
}
