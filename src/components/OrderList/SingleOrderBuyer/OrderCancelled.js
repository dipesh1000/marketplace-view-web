import React from "react";
import { Link } from "react-router-dom";

function OrderCancelled() {
  return (
    <div className="order-complete-wrap">
      <div className="order-cancel">
        <i class="fas fa-box-open"></i>
        <div className="order-title">Order Cancelled</div>
      </div>
      <div className="order-footer">
        This order is cancelled. Click <Link to="#">here</Link> to contact the
        Seller.
      </div>
    </div>
  );
}

export default OrderCancelled;
