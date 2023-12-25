import React, { useState } from "react";
import { GoPackage } from "react-icons/go";
import { Link } from "react-router-dom";
import { FaRegImage } from "react-icons/fa";
import { formatDate } from "../../../utils/TimestamptoDate";
import { sendDeliveryAction } from "../redux/Action";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import RevisionBox from "./RevisionBox";
import { fileDownload } from "../../../utils/FileDownload";

function DeliveryShow({ item, seller, revision, orderId }) {
  const dispatch = useDispatch();
  const handleDispatch = () => {
    dispatch(
      sendDeliveryAction(orderId, { type: "accept", delivery_id: item?.id })
    );
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="orderstart-wrap">
      <div className="cards-group">
        <div className="single-card item">
          <div className="title_box">
            <GoPackage className="single-icons" />
            <div className="title_contains">
              <h6 className="text-heading">here's your delivery!</h6>
              <p className="text-subheading">
                Order will be automatically marked as completed after 3 Days.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <div className="single-card msg-card">
          <div className="message_inner_wrap">
            <div className="msg-img">
              <img
                src={seller?.profileImage?.url?.resize}
                alt={seller?.profileImage?.alt}
              />
              <Link to="/home">{seller?.username}</Link>
            </div>
            <div className="msg-content">
              <p className="text-center">{item?.seller_comment}</p>
              {item?.delivery_files?.length > 0 && (
                <div className="text-center attactment-title">Attachments</div>
              )}
              <div className="attachment-wrapper">
                {item?.delivery_files?.map((list, index) => (
                  <div className="order-attachements" key={list?.id}>
                    {/* <h6>{list.name}</h6> */}
                    <div className="attach-box">
                      {/* eslint-disable-next-line*/}
                      <a
                        onClick={() =>
                          fileDownload(
                            orderId,
                            item?.delivery_files[index]?.id,
                            list.name
                          )
                        }
                      >
                        <div className="desc-expire">
                          <FaRegImage />
                        </div>
                        <div className="desc-bottom">
                          <span
                            className="img-filename"
                            title="order-hero-image-ing-s.png"
                          >
                            {/* <FaArrowCircleDown /> */}
                            {list?.name}
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <ul>
                <li>
                  {formatDate(item?.created_at, "DD MMM, YYYY (HH:mm A)")}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {!item?.revision_approved &&
        !item?.revision_rejected &&
        !item?.approved_at &&
        !item?.request_revision && (
          <>
            <h5 className="button-title">
              Are you Satisfied with the delivery and complete the delivery?{" "}
            </h5>
            <div className="button-container">
              <div className="accept" onClick={handleDispatch}>
                Accept
              </div>
              <div className="reject" onClick={handleShow}>
                Request Revision{revision ? `(${revision})` : ""}
              </div>
            </div>
          </>
        )}
      {/* {
          revision === 0 && <span>Go to the <Link to={`/users/dashboard/resolution/select/${orderId}`}> Resolution Center </Link>for any inconvinience</span>
        } */}

      <Modal show={show} onHide={handleClose}>
        <RevisionBox handleClose={handleClose} delivery_id={item?.id} />
      </Modal>
    </div>
  );
}

export default DeliveryShow;
