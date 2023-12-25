import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkActiveUser, getAgo } from "../../utils/Helper";
import { fetchChatList } from "./redux/Action";

function Chatlist({ params }) {
  const dispatch = useDispatch();
  const { chatLists } = useSelector((state) => state.chats);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchChatList());
  }, [dispatch, params]);
  const checkactive = (list) => {
    if (!list?.latestMessage?.read_at) {
      if (list?.latestMessage?.sender?.id !== user?.id) {
        return "active";
      }
    }
  };
  return (
    <div className="chatlist">
      <div className="chat-header">
        <span>All Conversations</span>
        <span>
          <i className="fa fa-search"></i>
        </span>
      </div>
      <ul className="user-list">
        {chatLists?.map((list) => (
          <li key={list?.id} className={checkactive(list) || ""}>
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
        ))}
      </ul>
    </div>
  );
}

export default Chatlist;
