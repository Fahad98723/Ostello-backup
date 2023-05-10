import React, { useEffect, useRef, useState } from "react";
import useScreenWidth from "../../hooks/useScreenWidth";
import Carousel from "react-elastic-carousel";
import { toast } from "react-hot-toast";
import { host } from "../../../utils/constant";
import axios from "axios";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { authSelector } from "../../../redux/slices/authSlice";
import PostCard from "./PostCard";

const InstitutePostSection = ({ currentInstitute }) => {
  const [posts, setPosts] = useState([]);

  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    if (currentInstitute?.id) {
      const run = async () => {
        try {
          const { data } = await axios.get(
            `${host}/blog?instituteid=${currentInstitute?.id}`
          );
          setPosts(data?.message);
          
          setRefetch(false);
        } catch (err) {
          toast.error(err.message);
        }
      };
      run();
    }
  }, [currentInstitute?.id, refetch]);

  const { userData } = useSelector(authSelector);

  

  const [userLiked, setUserLiked] = useState([]);

  useEffect(() => {
    if (userData?.usertype === 3) {
      if (userData?.id) {
        const run = async () => {
          try {
            const { data } = await axios.get(
              `${host}/blog?studentid=${userData?.id}`
            );
            setUserLiked(data?.message);
            
          } catch (err) {
            toast.error(err.message);
          }
        };
        run();
      }
    }
  }, [userData?.id, userData?.usertype]);

  

  const { screenWidth } = useScreenWidth();
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3 },
  ];

  return (
    <>
      {posts.length ? (
        <div className="md:px-5 px-1 py-10">
          <div className="px-1 md:px-[80px]">
            <h1 className="text-2xl md:text-4xl font-bold">Our Posts</h1>
          </div>
          <Carousel
            renderPagination={({ pages, activePage, onClick }) => {
              return (
                <div className="flex items-center space-x-2 mt-3 ">
                  {pages?.map((page, i) => {
                    const isActivePage = activePage === page;
                    return (
                      <div
                        className={`cursor-pointer  h-2 rounded-lg my-5 transition-all duration-500 ease-in-out ${
                          isActivePage
                            ? "bg-primary md:w-28 w-16 "
                            : "bg-gray/20 md:w-6 w-2"
                        }`}
                        key={i}
                        onClick={() => onClick(page)}
                        // active={isActivePage}
                      />
                    );
                  })}
                </div>
              );
            }}
            breakPoints={breakPoints}
            showArrows={screenWidth > 768 && posts?.length > 3 ? true : false}
            // enableAutoPlay
            autoPlaySpeed={1500}
            pagination={true}
          >
            {posts?.map((data, index) => (
              <PostCard
                key={index}
                data={data}
                index={index}
                setRefetch={setRefetch}
                refetch={refetch}
              />
            ))}
          </Carousel>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default InstitutePostSection;
