import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { checkRevision } from '../redux/Action';

function CheckRevision({item}) {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const handleDispatch = (type) => {
    dispatch(
      checkRevision({ type: type, delivery_id: item?.id }, orderId)
    );
  };
  return (
    <div className="check-revision">
      <div className="title">
        Buyer Send a Revision Request
      </div>
      <div className="subtitle">
        Buyer doesn't have revisions left. You can reject if you like. 
      </div>
      <div className="button-container">
        <div className="accept" onClick={() => handleDispatch("accept")}>
          Accept
        </div>
        <div className="reject" onClick={() => handleDispatch("reject")}>
          Reject
        </div>
      </div>
    </div>
  );
}

export default CheckRevision;