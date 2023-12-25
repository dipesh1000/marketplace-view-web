import React from "react";
import DeliveryShow from "./DeliveryShow";
import Revision from "./Revision";

function DeliveryContainer({ item, seller, buyer }) {
  return <>{item?.datatype ? <Revision item={item} buyer={buyer}  /> : <DeliveryShow item={item} buyer={buyer} seller={seller} />}</>;
}

export default DeliveryContainer;
