import React from "react";
import { Link } from "react-router-dom";

function OrderComplete({ orderId }) {
  return (
    <div className="order-complete-wrap">
      <div className="order-complete">
        <i className="fas fa-box-open"></i>
        <div className="order-title">Order Complete</div>
      </div>
      <div className="order-footer">
        This order is complete. Click <Link to="#">here</Link> to contact the
        Buyer.
      </div>
    </div>
  );
}

export default OrderComplete;
