import axios from "axios";
import { getServerSideSitemap } from "next-sitemap";
import { host } from "../../utils/constant";

export const getServerSideProps = async (ctx) => {
  const instituteData = await axios.get(`${host}/institute?nolimit=true`);
  const metaData = await axios.get(`${host}/meta?nolimit=true`);
  const topLocationData = await axios.get(`${host}/locations?nolimit=true`);
  const blogsData = await axios.get(`${host}/blog?adminBlogsOnly=true`);

  const blogsSitemaps = blogsData?.data?.message?.map((item) => ({
    loc: `https://www.ostello.co.in/blogs/${item?.slugurl.toString()}`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 0.9,
  }));

  const instituteSitemaps = instituteData?.data?.message?.map((item) => ({
    loc: `https://www.ostello.co.in/institue/${item?.slug.toString()}`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 0.9,
  }));

  const metaSitemaps = metaData?.data?.message?.map((item) => ({
    loc: `https://www.ostello.co.in/${item?.url.toString()}`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 0.9,
  }));
  const topLocationSitemaps = topLocationData?.data?.message?.map((item) => ({
    loc: `https://www.ostello.co.in/search/${item?.slugurl.toString()}`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 0.9,
  }));

  const fields = [
    ...instituteSitemaps,
    ...metaSitemaps,
    ...topLocationSitemaps,
    ...blogsSitemaps,
  ];
  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
