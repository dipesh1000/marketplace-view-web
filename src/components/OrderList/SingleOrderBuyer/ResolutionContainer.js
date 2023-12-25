import React from "react";
import CancelRequest from "./CancelRequest";
import ExtendRequest from "./ExtendRequest";
import ModificationRequest from "./ModificationRequest";
import ProgressRequest from "./ProgressRequest";

function ResolutionContainer({ item, buyer, seller }) {
  return (
    <>
      {item?.type === "seller_modify_order" ? (
        <ModificationRequest item={item} buyer={buyer} seller={seller} />
      ) : item?.type === "seller_extended_delivery_time" ? (
        <ExtendRequest item={item} buyer={buyer} seller={seller} />
      ) : item?.type === "seller_cancel_order" ||
        item?.type === "buyer_cancel_order" ? (
        <CancelRequest item={item} buyer={buyer} seller={seller} />
      ) : item?.type === "buyer_progress_update" ? (
        <ProgressRequest item={item} buyer={buyer} seller={seller} />
      ) : null}
    </>
  );
}

export default ResolutionContainer;
