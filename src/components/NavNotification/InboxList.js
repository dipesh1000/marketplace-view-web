import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkActiveUser, getAgo } from "../../utils/Helper";

function InboxList({ handleNavState, chatLists }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <ul className="user-list">
      {chatLists?.map((list) => (
        <CheckOnlineStatus
          user={user}
          list={list}
          key={list?.id}
          handleNavState={handleNavState}
        />
      ))}
    </ul>
  );
}

export default InboxList;

const CheckOnlineStatus = ({ handleNavState, list, user }) => {
  // eslint-disable-next-line
  const [status, setStatus] = useState(navigator.onLine);

  useEffect(() => {
    const setOnline = () => {
      setStatus(true);
    };
    const setOffline = () => {
      setStatus(false);
    };
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  const checkactive = (list) => {
    if (!list?.latestMessage?.read_at) {
      if (list?.latestMessage?.sender?.id !== user?.id) {
        return "active";
      }
    }
  };

  return (
    <li
      key={list?.id}
      className={checkactive(list) || ""}
      onClick={handleNavState}
    >
      <Link to={`/inbox/${list?.id}`}>
        <div className="user-list-wrap">
          <div className="profile-img">
            <div
              className={`indicator ${
                checkActiveUser(list?.receiver?.id) ? "active" : ""
              }`}
            ></div>
            <img
              src={list?.receiver?.profileImage?.url?.full}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>
            <div className="top-wrap">
              <span className="name">{list?.receiver?.username}</span>
              <span className="time">
                {getAgo(list?.latestMessage?.created_at)?.replace(
                  "minutes",
                  "mins"
                )}{" "}
                ago
              </span>
            </div>

            <div className="message">{list?.latestMessage?.message}</div>
          </div>
        </div>
      </Link>
    </li>
  );
};
