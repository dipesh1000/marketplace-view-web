import React from "react";
import { Button } from "react-bootstrap";
import { FaCheck, FaQuestionCircle, FaLock } from "react-icons/fa";

function SideBar({ orderData, isSubmitting }) {
  return (
    <div className="OrdersDetail">
      <div className="OrderDetailsContainer">
        <div className="AsideTop">
          <div className="AsideMain">
            <div className="imgBox">
              {/* eslint-disable-next-line*/}
              <img
                src={orderData?.gig?.image?.url?.resize}
                alt={orderData?.gig?.image?.alt}
              />
            </div>
            <div className="sideHeadingText">
              <p>{orderData?.gig?.title}</p>
            </div>
          </div>
          <hr />
          <div className="AsideSec">
            <div className="AsideSecPrice">
              <b>{orderData?.package_title}</b>
              <span>${orderData?.sub_total}</span>
            </div>
            {orderData?.order_include?.map((item) => (
              <div key={item.id}>
                <FaCheck className="checkIcon active" />
                {item.selection_type === "Select" ? item.value : null}{" "}
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="AsideButton">
          <div className="serviceFee">
            <span>
              Service Fee
              <FaQuestionCircle className="ml-1" />
            </span>
            <span>${orderData?.service_charge}</span>
          </div>
          <hr />
          <div className="serviceFee textBold">
            <p>Total</p>
            <span>${orderData?.total_price}</span>
          </div>
          <div className="serviceFee">
            <p>Total Delivery Time</p>
            <span>{orderData?.delivery_time} day</span>
          </div>
          {orderData?.shipping_days ? (
            <div className="serviceFee">
              <p>Shipping Days</p>
              <span>{orderData?.shipping_days} days</span>
            </div>
          ) : null}
          <hr />

          <div className="ConfirmSection">
            <Button form="stripe-form" type="submit" disabled={isSubmitting}>
              Confirm & Pay
            </Button>

            <span>
              <FaLock />
              SSL Secure Payment
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
