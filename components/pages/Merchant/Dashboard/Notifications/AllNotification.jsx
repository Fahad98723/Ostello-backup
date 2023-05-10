import React from "react";
import NotificationCard from "../../../../UI/NotificationCard";
import { IoIosNotificationsOutline } from "react-icons/io";

const AllNotification = ({api}) => {
  
  return (
    <div className="flex flex-col gap-5 lg:gap-5 py-10 lg:px-5 ">
      {
        !api.length ?  <h2 className="text-[#FF0000]/60 text-xl flex items-center justify-center mt-5"> <IoIosNotificationsOutline className="text-5xl"></IoIosNotificationsOutline> You Have No Notification Yet</h2> : api.map((item,idx) => (
          <NotificationCard key={idx} item={item} />
        )) 
      }
    </div>
  );
};

export default AllNotification;
