import React, { useState, useEffect } from "react";
import NotificationItem from "./NotificationItem";

function NoticationContainer({ notifications, handleNavState, setCount }) {
  const [uniqueNotification, setUniqueNotification] = useState([]);

  useEffect(() => {
    if (notifications?.length > 0) {
      const unique = [...new Set(notifications.map((item) => item))];
      setUniqueNotification(unique);
      let unread = 0;
      unique?.forEach((element) => {
        if (!element.read_at || element?.read_at == null) unread++;
      });
      setCount(unread);
    }
    // eslint-disable-next-line
  }, [notifications]);
  return (
    <ul className="messageList">
      {uniqueNotification?.map((notify) => {
        return (
          <NotificationItem
            key={notify.id}
            item={notify}
            handleNavState={handleNavState}
          />
        );
      })}
    </ul>
  );
}

export default NoticationContainer;
