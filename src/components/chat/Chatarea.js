import React, { useState } from "react";
import { useEffect } from "react";
import { BsPaperclip } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/TimestamptoDate";
import ChatForm from "./ChatForm";
import { appendMessage, fetchUserMessage } from "./redux/Action";
import InfiniteScroll from "react-infinite-scroll-component";
import ChatOfferSeller from "./ChatOfferSeller";
import { checkActiveUser, getAgo } from "../../utils/Helper";
import RelatedServices from "./RelatedServices";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { fetchFreelancerInfo } from "../Profile/Freelancer/redux/Action";
import { fileDownload } from "../../utils/FileDownload";
import useTitle from "../../utils/useTitle";

function Chatarea({ setParams }) {
  const { chats, profile, pagination, chatLists, receiverGigs, aboutReceiver } =
    useSelector((state) => state.chats);
  const { data } = useSelector((state) => state.freelancer);
  const starCount = data?.profile?.seller_rating?.average_rating;
  const { user } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const { username } = useParams();
  const [hasMore, setHasMore] = useState(true);
  const type = "chat";

  const dispatch = useDispatch();
  useTitle("Fuchas / Inbox");
  useEffect(() => {
    setHasMore(true);
    setParams(username);
    dispatch(fetchUserMessage({ chat_room_id: username, page: 1 }));
    setPage(2);
    // eslint-disable-next-line
  }, [dispatch, username]);

  useEffect(() => {
    dispatch(fetchFreelancerInfo(profile?.username));
  }, [profile?.username, dispatch]);

  const fetchMoreData = () => {
    if (pagination?.total_pages < page) {
      setHasMore(false);
    }
    dispatch(appendMessage({ chat_room_id: username, page: page }));
    setPage((prev) => prev + 1);
  };
  return (
    <div className="chat-area">
      <div className="chat-area-header">
        <div>
          <div className="username">
            <span
              className={`indicator ${
                checkActiveUser(profile?.id) ? "active" : ""
              }`}
            ></span>
            {profile?.username}
          </div>
          <div className="time">
            <span>
              Last seen {chats?.length > 0 ? getAgo(profile?.last_online) : ""}{" "}
              ago
            </span>{" "}
            |{" "}
            <span>
              Local time : {formatDate(new Date(), "YYYY-MM-DD (HH:mm A)")}
            </span>
          </div>
        </div>
      </div>
      <div className="chat-area-wrap">
        <div className="chatbox">
          <div className="chat-content">
            <InfiniteScroll
              dataLength={chats?.length}
              next={fetchMoreData}
              style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
              inverse={true}
              hasMore={hasMore}
              loader={<div className="loading">Loading...</div>}
              height={`calc(100vh - 350px)`}
              endMessage={
                <div className="end-message">Yay! You have seen it all</div>
              }
            >
              {chats?.map((chat) => (
                <div className="user-list-wrap" key={chat?.id}>
                  <div className="profile-img">
                    <img
                      src={chat?.sender?.profileImage?.url?.full}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="content-wrap">
                    <div className="top-wrap">
                      <span className="name">{chat?.sender?.username}</span>
                      <span className="time">
                        {formatDate(chat?.created_at, "DD MMM, YYYY (HH:mm A)")}
                      </span>
                    </div>

                    {chat?.custom_offer ? (
                      <ChatOfferSeller
                        customOffer={chat?.custom_offer}
                        sender={chat?.sender}
                        chatRoom={username}
                      />
                    ) : (
                      <div className="message">{chat?.message}</div>
                    )}
                    {chat?.file?.id && (
                      <a
                        href={chat?.file?.url}
                        onClick={() =>
                          fileDownload(
                            null,
                            chat?.file?.id,
                            chat?.file?.name,
                            username,
                            type
                          )
                        }
                        className="chat-file"
                      >
                        <BsPaperclip />
                        {chat?.file?.name
                          ? chat?.file?.name
                          : "File Attachment"}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          </div>
          <div className="chat-bottom">
            <ChatForm username={username} chatList={chatLists} user={user} />
          </div>
        </div>
        <div className="chat-about">
          <div className="title">About</div>
          <div className="profile-img">
            <img
              src={profile?.profileImage?.url?.full}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="username">{profile?.username}</div>
          <div className="profile-rating-section">
            <ul className="profile-stars">
              {[...Array(5).keys()].map((item) =>
                item <= starCount - 1 ? (
                  <li key={item}>
                    <BsStarFill />
                  </li>
                ) : item + 1 > starCount && item < starCount ? (
                  <li key={item}>
                    <BsStarHalf />
                  </li>
                ) : (
                  <li key={item}>
                    <BsStar />
                  </li>
                )
              )}
            </ul>
            <b className="profile-rating">{starCount ? starCount : 0}</b>
            <span className="profile-rating-count">
              (
              {data?.profile?.seller_rating?.total_rating
                ? data?.profile?.seller_rating?.total_rating
                : "0"}
              &nbsp;reviews)
            </span>
          </div>
          <ul className="user-detail">
            {profile?.country && (
              <li>
                <span>From</span> <span>{profile?.country}</span>
              </li>
            )}
            {profile?.language?.length && (
              <li>
                <span>Language</span>{" "}
                <span>{profile?.language && profile?.language[0]?.value}</span>
              </li>
            )}
          </ul>
          <RelatedServices
            receiverGigs={receiverGigs}
            aboutReceiver={aboutReceiver}
          />
        </div>
      </div>
    </div>
  );
}

export default Chatarea;
