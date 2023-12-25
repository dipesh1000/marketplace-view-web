import React, { useState, useEffect } from "react";
import NoticationContainer from "./NoticationContainer";
import { useDispatch, useSelector } from "react-redux";
import { clearMessageIcon, markAllRead } from "./redux/Action";
import { Tab, Tabs } from "react-bootstrap";
import { AiFillNotification } from "react-icons/ai";
import { FiMessageCircle } from "react-icons/fi";
import InboxList from "./InboxList";
import { useHistory } from "react-router-dom";
import { useRef } from "react";
import NotificationSound from "../../sound.mp3";
import "./styles/NavNotification.scss";

function NavNotification() {
  const showRef = useRef();
  const history = useHistory();
  const [navState, setNavState] = useState(false);
  const [key, setKey] = useState("notification");
  const [count, setCount] = useState(0);
  const { chatLists, chatCount } = useSelector((state) => state.chats);
  const { userNotifications, newMessage } = useSelector(
    (state) => state.notifications
  );
  const dispatch = useDispatch();
  const messageSound = new Audio(NotificationSound);
  const playSound = (audioFile) => {
    audioFile.play();
  };

  useEffect(() => {
    newMessage && playSound(messageSound);
    // eslint-disable-next-line
  }, [newMessage]);
  const handleNavState = () => {
    setNavState((prev) => !prev);
  };
  const clearNewMessage = () => {
    dispatch(clearMessageIcon());
  };
  const handleRead = (e) => {
    dispatch(markAllRead());
  };

  const handleChatView = () => {
    history.push("/inbox");
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!showRef.current.contains(e.target)) {
        setNavState(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [navState]);

  return (
    <div className="NavNotificationWrapper" ref={showRef}>
      {(newMessage || chatCount > 0) && (
        <div className="new-notification" onClick={clearNewMessage}></div>
      )}
      <div className="notificationTitle" onClick={handleNavState}>
        Messages
      </div>
      {navState === true ? (
        <div className="nav-dropdown-item">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="customTabHeaders"
          >
            <Tab
              eventKey="notification"
              className="headerItem"
              title={
                <span>
                  <AiFillNotification /> Notification ({count})
                </span>
              }
            >
              <NoticationContainer
                setCount={setCount}
                notifications={userNotifications}
                handleNavState={handleNavState}
              />
              <div className="notification-bottom">
                <span onClick={handleRead}>Mark all as Read</span>
              </div>
            </Tab>
            <Tab
              eventKey="inbox"
              className="headerItem"
              title={
                <span>
                  <FiMessageCircle /> Inbox ({chatCount})
                </span>
              }
            >
              {/* <InboxContainer
                setCount={setCount}
                notifications={userNotifications}
                handleNavState={handleNavState}
              /> */}
              <InboxList
                handleNavState={handleNavState}
                chatLists={chatLists}
                chatCount={chatCount}
              />
              <div className="notification-bottom chat-message-bottom">
                <span onClick={handleRead}>Mark all as Read</span>
                <span onClick={handleChatView}>View all Message</span>
              </div>
            </Tab>
          </Tabs>
        </div>
      ) : (
        ""
      )}
      {/* <Dropdown className="profile_dropdown_logged">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                <div className="notificationTitle">
                    Messages
                </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="notification_item">
                    <NoticationContainer />
                </Dropdown.Menu>
            </Dropdown> */}
    </div>
  );
}

export default NavNotification;
