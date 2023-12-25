import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { formatDate } from "../../utils/TimestamptoDate";
import { acceptOffer, rejectOffer } from "./redux/Action";
import "./style/style.scss";

function ChatOfferSeller({ customOffer, sender, chatRoom }) {
  const { user } = useSelector((state) => state.auth);
  const [userType, setUserType] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (user?.id === sender?.id) {
      setUserType("seller");
    } else {
      setUserType("buyer");
    }
    // eslint-disable-next-line
  }, []);
  const handleHistory = (data) => {
    history.push({
      pathname: `/checkout/payments/${data?.order_code}`,
      state: data,
    });
  };
  const handleAcceptOffer = (id) => {
    dispatch(acceptOffer(id, handleHistory));
  };
  const handleRejectOffer = (id) => {
    dispatch(
      rejectOffer(
        { type: "reject", offer_id: id },
        { chat_room_id: chatRoom, page: 1 }
      )
    );
  };
  const handleWithdrawOffer = (id) => {
    dispatch(
      rejectOffer(
        { type: "withdraw", offer_id: id },
        { chat_room_id: chatRoom, page: 1 }
      )
    );
  };
  return (
    <>
      <div className="chat-offer-message-title">Here's your Custom Offer</div>
      <div className="chat-offer-seller">
        <div className="title-wrapper">
          <div className="title">{customOffer?.gig?.title}</div>
          <div className="price">${customOffer?.budget}</div>
        </div>
        <div className="content-wrapper">
          <div className="description">{customOffer?.description}</div>
          <div className="offer-title">Your offer Includes</div>
          <div className="offer-list">
            {customOffer?.offer_include?.map((offer) => (
              <>
                <i class="fa fa-check"></i>
                <span>
                  {offer?.title} {offer?.value}
                </span>
              </>
            ))}
          </div>
          <div className="expire-time">
            Offer expired in{" "}
            {formatDate(customOffer?.expired_in, "MMMM d, YYYY")}
          </div>
          {userType === "buyer" &&
            !customOffer?.approved_at &&
            !customOffer?.rejected_at &&
            !customOffer?.withdraw_at && (
              <div className="button-wrapper">
                <div
                  className="accept-btn"
                  onClick={() => handleAcceptOffer(customOffer?.id)}
                >
                  Accept Offer
                </div>
                <div
                  className="reject-btn"
                  onClick={() => handleRejectOffer(customOffer?.id)}
                >
                  Reject Offer
                </div>
              </div>
            )}
          {userType === "seller" &&
            !customOffer?.approved_at &&
            !customOffer?.rejected_at &&
            !customOffer?.withdraw_at && (
              <div className="button-wrapper">
                <div
                  className="withdraw-btn"
                  onClick={() => handleWithdrawOffer(customOffer?.id)}
                >
                  Withdraw Custom Offer
                </div>
              </div>
            )}
          {customOffer?.approved_at && (
            <div className="info-wrapper">Offer Accepted</div>
          )}
          {customOffer?.rejected_at && (
            <div className="info-wrapper">Offer Rejected</div>
          )}
          {customOffer?.withdraw_at && (
            <div className="info-wrapper">Offer Withdrawn</div>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatOfferSeller;
