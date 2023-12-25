import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ContainerSpinner from "../../../components/common/ContainerSpinner/ContainerSpinner";
import { getSingleGigDetails } from "../../../components/GigSingle/redux/Action";
import OrderDetails from "../../../components/Order/OrderDetails/OrderDetails";

function OrderPage({ location }) {
  const { slug } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    slug && dispatch(getSingleGigDetails(slug));
    // eslint-disable-next-line
  }, []);
  const { gigs, isLoading } = useSelector((state) => state.gigDetails);

  return isLoading ? (
    <ContainerSpinner />
  ) : (
    <div>
      <OrderDetails orderItem={location?.state} gigs={gigs} />
    </div>
  );
}

export default OrderPage;
