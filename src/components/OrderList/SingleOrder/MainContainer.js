import React from "react";
import { useState } from "react";
import CountDown from "./CountDown";
import DeliveryShow from "./DeliveryShow";
import Message from "./Message";
import OrderCancelled from "./OrderCancelled";
import OrderComplete from "./OrderComplete";
import OrderItem from "./OrderItem";
import OrderStarted from "./OrderStarted";
import PauseCountDown from "./PauseCountDown";
import QuickResponseBox from "./QuickResponseBox";
import RequirementDetails from "./RequirementDetails";
import ResolutionContainer from "./ResolutionContainer";
import ResolutionInfoContainer from "./ResolutionInfoContainer";
import Review from "./Review";
import Revision from "./Revision";
import SellerReview from "./SellerReview";
import SellerReviewForm from "./SellerReviewForm";

function MainContainer({ singleOrder, orderId, singleArray }) {
  // eslint-disable-next-line
  const [reload, setReload] = useState(false);
  let totalNumber = parseInt(singleOrder?.orders?.remaning_time);
  let totalSeconds = Math.floor(totalNumber / 1000);

  let totalMinutes = Math.floor(totalSeconds / 60);
  let totalHours = Math.floor(totalMinutes / 60);
  let days = Math.floor(totalHours / 24);
  let hours = totalHours - days * 24;
  let minutes = totalMinutes - days * 24 * 60 - hours * 60;
  let seconds =
    totalSeconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

  const handleReload = () => {
    setReload((prev) => !prev);
  };

  return (
    <div className="MainOrderContainer">
      <OrderItem
        singleOrder={singleOrder?.orders}
        resolution_data={singleOrder?.resolution_data}
      />
      {singleOrder?.orders?.status?.slug === "inprogress" &&
        (totalSeconds > 0 ? (
          singleOrder?.orders?.pause_time ? (
            <PauseCountDown
              myDays={days}
              myHours={hours}
              myMinutes={minutes}
              mySeconds={seconds}
            />
          ) : (
            <CountDown
              myDays={days}
              myHours={hours}
              myMinutes={minutes}
              mySeconds={seconds}
            />
          )
        ) : (
          <div className="late-box">You are Late, Deadline is Crossed.</div>
        ))}
      {singleOrder?.orders?.status?.slug === "late" && (
        <div className="late-box">You are Late, Deadline is Crossed.</div>
      )}
      {singleOrder?.orders?.status?.slug === "very_late" && (
        <div className="late-box">You are Very Late, Deadline is Crossed.</div>
      )}
      <RequirementDetails
        requirements={singleOrder?.orders?.order_requirements}
        buyer={singleOrder?.buyer}
        status={singleOrder?.orders?.status}
        orderId={orderId}
      />

      <OrderStarted status={singleOrder?.orders?.status} />
      {singleArray?.map((item, index) => (
        <div key={index}>
          {item?.datatype === "resolution_info" && (
            <ResolutionInfoContainer item={item} />
          )}
          {item?.datatype === "message" && (
            <Message item={item} orderId={orderId} />
          )}
          {item?.datatype === "delivery" && (
            <DeliveryShow
              item={item}
              buyer={singleOrder?.buyer}
              seller={singleOrder?.seller}
              orderId={orderId}
            />
          )}
          {item?.datatype === "revision" && (
            <Revision
              item={item}
              buyer={singleOrder?.buyer}
              seller={singleOrder?.seller}
              orderId={orderId}
            />
          )}
          {item?.datatype === "resolution" && (
            <ResolutionContainer
              item={item}
              buyer={singleOrder?.buyer}
              seller={singleOrder?.seller}
              orderId={orderId}
            />
          )}
          {/* {item?.datatype == "no_revision" && <CheckRevision item={item} />} */}
        </div>
      ))}
      {singleOrder?.orders?.status?.slug !== "cancelled" &&
        singleOrder?.orders?.status?.slug !== "complete" && (
          <QuickResponseBox
            status={singleOrder?.orders?.status}
            handleReload={handleReload}
            orderId={orderId}
          />
        )}
      {singleOrder?.orders?.status?.slug === "complete" &&
        singleOrder?.is_buyer_feedback && (
          <Review
            buyer={singleOrder?.buyer}
            buyer_feedback={singleOrder?.buyer_feedback}
            seller_feedback={singleOrder?.seller_feedback}
            isReview={singleOrder?.is_buyer_feedback}
            orderId={orderId}
          />
        )}
      {singleOrder?.orders?.status?.slug === "complete" &&
        singleOrder?.is_buyer_feedback &&
        (singleOrder?.buyer_feedback ? (
          <SellerReview
            seller={singleOrder?.seller}
            buyer_feedback={singleOrder?.buyer_feedback}
            orderId={orderId}
          />
        ) : (
          <SellerReviewForm seller={singleOrder?.seller} orderId={orderId} />
        ))}
      {singleOrder?.orders?.status?.slug === "cancelled" && <OrderCancelled />}
      {singleOrder?.orders?.status?.slug === "complete" && (
        <OrderComplete orderId={orderId} />
      )}
    </div>
  );
}

export default MainContainer;
