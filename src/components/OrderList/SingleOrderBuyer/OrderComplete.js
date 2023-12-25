import React from "react";
import { Link } from "react-router-dom";

function OrderComplete({ orderId, seller_feedback }) {
  return (
    <div className="order-complete-wrap">
      <div className="order-complete">
        <i className="fas fa-box-open"></i>
        <div className="order-title">Order Complete</div>
      </div>
      {!seller_feedback && (
        <div className="give-feedback">
          <Link to={`/users/dashboard/review/${orderId}`}>Give Feedback</Link>
        </div>
      )}
      <div className="order-footer">
        This order is complete. Click <Link to="#">here</Link> to contact the
        seller.
      </div>
    </div>
  );
}

export default OrderComplete;
