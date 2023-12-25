import React from "react";
import { GoPackage } from "react-icons/go";
import { Link } from "react-router-dom";
import { FaRegImage } from "react-icons/fa";
import { formatDate } from "../../../utils/TimestamptoDate";
import { fileDownload } from "../../../utils/FileDownload";

function DeliveryShow({ item, seller, orderId }) {
  return (
    <div className="orderstart-wrap">
      <div className="cards-group">
        <div className="single-card item">
          <div className="title_box">
            <GoPackage className="single-icons" />
            <div className="title_contains">
              <h6 className="text-heading">here's your delivery!</h6>
              <p className="text-subheading">
                Countdown will begin after succesfully submission of
                Requirement.
              </p>
              <span className="dates">
                {formatDate(item?.created_at, "DD MMM, YYYY (HH:mm A)")}
              </span>
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
                          <span className="img-filename" title={list.name}>
                            {/* <FaArrowCircleDown /> */}
                            {list.name}
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="button-container">
          {item?.revision_approved ? (
            <span>{buyer?.name} Approved Your Delivery Request</span>
          ) : item?.revision_rejected ? (
            <span>{buyer?.name} Rejected Your Delivery Request</span>
          ) : (
            <span>Delivery Request Pending</span>
          )}
        </div> */}
    </div>
  );
}

export default DeliveryShow;
