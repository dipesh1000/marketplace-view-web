import React from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../../../redux/Modal/Modal.action";
import ButtonSpinner from "../../common/ButtonSpinner/ButtonSpinner";

function SideBar({
  subTotal,
  shipping_days,
  initialPrice,
  totalDays,
  initialDays,
  extraServiceTotal,
  extraMetaTotal,
  customExtraServiceTotal,
  extraServiceTotalDays,
  extraMetaTotalDays,
  customExtraServiceTotalDays,
  onSubmit,
  serviceCharge,
}) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let initTotal =
    subTotal +
    initialPrice +
    (extraMetaTotal || 0) +
    (extraServiceTotal || 0) +
    (customExtraServiceTotal || 0);
  let serviceFee = (initTotal * 100 * (serviceCharge / 100)) / 100;
  let total = initTotal + Number(serviceFee.toFixed(2));
  let finalDays =
    (totalDays || initialDays) +
    (extraServiceTotalDays || 0) +
    (Number(extraMetaTotalDays) || 0) +
    (customExtraServiceTotalDays || 0);

  const { postLoading } = useSelector((state) => state.checkout);
  return (
    <>
      <div className="priceOverviewWrapper">
        <div className="priceOverview">
          <h6>Summary</h6>
          <div className="pricingItem">
            <p>Subtotal</p>
            <span>$ {initTotal}</span>
          </div>
          <div className="pricingItem">
            <p>Service Fee</p>
            <span>$ {serviceFee.toFixed(2)}</span>
          </div>
          <hr></hr>
          <div className="pricingItem">
            <b>Total</b>
            <b>$ {total.toFixed(2)}</b>
          </div>
          <div className="pricingItem">
            <p>Delivery Time</p>
            <span>{finalDays} days</span>
          </div>
          {shipping_days ? (
            <div className="pricingItem">
              <p>Shipping Days</p>
              <span>{shipping_days} days</span>
            </div>
          ) : null}
          <div className="pricingItem">
            <Button
              onClick={
                isAuthenticated ? onSubmit : () => dispatch(openModal("login"))
              }
            >
              {postLoading && <ButtonSpinner />}
              Continue to Checkout
            </Button>
          </div>
          <span>You won't be changed yet</span>
        </div>
      </div>
    </>
  );
}

export default SideBar;
