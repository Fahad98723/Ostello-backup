import React from "react";
import NotificationCard from "../../../../UI/NotificationCard";
import { IoIosNotificationsOutline } from "react-icons/io";

const SalesNotification = ({api}) => {
  const sales = api.filter(a => a.type === 'sales')
  return (
    <div className="flex flex-col gap-5 lg:gap-5 py-10 lg:px-5 ">
      {!sales.length ? <h2 className="text-[#FF0000]/60 text-xl flex items-center justify-center mt-5"> <IoIosNotificationsOutline className="text-5xl"></IoIosNotificationsOutline> You Have No Sales Notification Yet</h2>  : sales.map((item,idx) => (
        <NotificationCard key={idx} item={item} />
      ))}
    </div>
  );
};

export default SalesNotification;
