import React from "react";
import { FiMail } from "react-icons/fi";
import { FaEnvelopeOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { BsBell } from "react-icons/bs";

function NotificationItem({ item, handleNavState }) {
  // Sellers\\Notifications\\GigStatusChanged
  // Order\\Notifications\\OrderMessageSent
  // Order\Notifications\OrderPaymentSuccess
  // order_id
  // user_type
  const handleUrl = () => {
    if (item?.order_id) {
      if (item?.user_type === "buyer") {
        return `/users/dashboard/singleorders/${item?.order_id}`;
      } else if (item?.user_type === "seller") {
        return `/users/seller_dashboard/singleorders/${item?.order_id}`;
      } else {
        return "#";
      }
    } else if (item?.type === "Sellers\\Notifications\\GigStatusChanged") {
      return `/users/seller_dashboard/gigs`;
    } else {
      return "#";
    }
  };
  return (
    <li className="messageBox">
      <Link to={handleUrl()} onClick={handleNavState}>
        <div className="userAvatar">
          {item?.senderImage?.url ? (
            <img
              src={item?.senderImage?.url?.full}
              alt={item?.senderImage?.alt}
            />
          ) : (
            <BsBell />
          )}
        </div>
        <div className="messageContant">
          {item?.title}
          <div className="messageMetas">
            <small>{item?.date}</small>
            <BsDot />
            <small>{item?.description}</small>
            <BsDot />
            <FaArrowAltCircleRight className="arrowRight" />
          </div>
        </div>
        <div className="messageStatus">
          {item?.read_at != null ? <FaEnvelopeOpen /> : <FiMail />}
        </div>
      </Link>
    </li>
  );
}

export default NotificationItem;
