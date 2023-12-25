import React from "react";
import { Card } from "react-bootstrap";
import CardDetails from "./CardDetails";
import { Spinner } from "react-bootstrap";
import CheckoutForm from "./CheckoutForm";
import useTitle from "../../../../utils/useTitle";

function MainContent({
  orderId,
  slug,
  handleStatus,
  isSubmitting,
  resolution_id,
}) {
  useTitle("Secure Checkout");
  return (
    <div className="MainContent">
      {/* <CardDetails headerText="Available Balance">
          <Card.Text>
            Personal Balance <span>$1.32</span>
          </Card.Text>
        </CardDetails>
        <p className="RemPayment">Remaining Payment: $11.73</p> */}
      <CardDetails headerText="Select method for the remaining payment">
        <Card.Text>
          <input type="radio" checked /> <span>Credit & Debit Cards</span>
        </Card.Text>

        <CheckoutForm
          orderId={orderId}
          resolution_id={resolution_id}
          isSubmitting={isSubmitting}
          slug={slug}
          handleStatus={handleStatus}
        />
        {isSubmitting && (
          <div className="spinner-wrapper">
            <Spinner animation="grow" />
          </div>
        )}
      </CardDetails>
    </div>
  );
}

export default MainContent;
