import React from "react";
import dynamic from "next/dynamic";
import MetaHelmet from "../components/MetaHelmet";

const HomeLanding = dynamic(
  () => {
    return import("../components/pages/HomeLanding");
  },
  { ssr: false }
);

export default function Home({ meta }) {
  return (
    <div>
      <MetaHelmet
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        link={meta.link}
      />
      <HomeLanding />
    </div>
  );
}

export const getStaticProps = async () => {
  const meta = {
    title: "Ostello | World's Largest Marketplace for Coaching Institutes",
    description:
      "Book your course at Ostello & choose best coaching near you. Compare & Choose from the best teachers through Demo classes | Interact with the toppers & choose best for you.",
    keywords:
      "Coaching Institutes in Jangpura, best Coaching institutes in Jangpura, Coaching classes in Jangpura, Coaching in Jangpura",
    link: "https://www.ostello.co.in/",
  };

  return {
    props: {
      meta,
    },
  };
};
