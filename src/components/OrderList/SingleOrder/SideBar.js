import React from "react";
import PrivateNote from "./PrivateNote";
import { Link } from "react-router-dom";

function SideBar({ orderId, isSeller, singleOrder }) {
  const isCancelled = singleOrder?.orders?.enable_cancelled;
  return (
    <div className="orderSingleSideBar">
      <PrivateNote />
      <div className="resolution-entry">
        <div className="entry-title">Need to contact Customer Support?</div>
        <Link
          to={{
            pathname: `/users/seller_dashboard/resolution/select/${orderId}`,
            state: { isSeller: isSeller, isCancelled: isCancelled },
          }}
        >
          Visit the Resolution Center
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
