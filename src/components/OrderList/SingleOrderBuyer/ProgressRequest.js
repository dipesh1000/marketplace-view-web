import React from "react";
import { IoRocketOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AiFillWarning } from "react-icons/ai";

function ProgressRequest({ item, buyer, seller }) {
  return (
    <div className="modification-request">
      <div className="single-card item">
        <div className="title_box">
          <IoRocketOutline className="single-icons" />
          <div className="title_contains">
            <h6 className="text-heading">Progress Update Request</h6>
            <span className="text-subheading">You stated the issue is:</span>
            <h6 className="issue-name">
              {item?.other_option_message || item?.resolution_type?.title}
            </h6>
          </div>
        </div>
      </div>

      <div className="single-card message-box">
        <div className="title">
          You offered to cancel the order and the following are the details
        </div>
        <div className="message_inner_wrap">
          <div className="profile_details">
            <div className="msg-img">
              <img src={seller?.profileImage?.url?.resize} />
            </div>
            <div className="modify-username">
              <Link to="/home">{seller?.name}</Link>
            </div>
          </div>
          <p className="comment-box">{item?.message}</p>
        </div>
        <div className="modify-content">
          <div className="message-box">
            <div className="subtitle">
              <AiFillWarning /> Buyer need to request within next 4 days or the
              order will be automatically cancelled.
            </div>
          </div>
        </div>
        <div className="button-container">
          {item?.approved_at ? (
            <span>{seller?.name} Approved Your Request</span>
          ) : item?.rejected_at ? (
            <span>{seller?.name} Rejected Your Request</span>
          ) : (
            <span>{seller?.name} Request Pending</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgressRequest;
