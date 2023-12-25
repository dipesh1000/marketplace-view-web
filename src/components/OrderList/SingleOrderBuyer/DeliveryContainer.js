import React from "react";
import { useParams } from "react-router-dom";
import DeliveryShow from "./DeliveryShow";
import Revision from "./Revision";

function DeliveryContainer({ item, seller, buyer }) {
  const {orderId} = useParams();
  return <>{item?.request_revision ? <Revision item={item} buyer={buyer}  /> : <DeliveryShow item={item} seller={seller} orderId={orderId} />}</>;
}

export default DeliveryContainer;
