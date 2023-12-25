import React from "react";
import { Link } from "react-router-dom";
import { FaRegImage } from "react-icons/fa";
import { FaRecycle } from "react-icons/fa";
import { formatDate } from "../../../utils/TimestamptoDate";
import { fileDownload } from "../../../utils/FileDownload";

function Revision({ item, buyer, orderId }) {
  return (
    <div className="revision-wrap pl-4 pr-4">
      <div className="message-section">
        <div className="single-card msg-card">
          <div className="msg-img">
            <img
              src={buyer?.profileImage?.url?.resize}
              alt={buyer?.profileImage?.alt}
            />
          </div>
          <div className="msg-content">
            <Link to="/home">{buyer?.username}</Link>
            <p>{item?.buyer_comment}</p>
            {item?.revision_files?.length > 0 && (
              <>
                <div className="attactment-title">Attachments</div>
                <div className="attachment-wrapper">
                  {item?.revision_files?.map((list, index) => (
                    <div className="order-attachements" index={list?.id}>
                      <div className="attach-box">
                        <a
                          onClick={() =>
                            fileDownload(
                              orderId,
                              item?.revision_files[index]?.id,
                              list.name
                            )
                          }
                          href="/"
                        >
                          <div className="desc-expire">
                            <FaRegImage />
                          </div>
                          <div className="desc-bottom">
                            <span className="img-filename" title={list?.name}>
                              {list?.name}
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            <ul>
              <li>{formatDate(item?.created_at, "DD MMM, YYYY (HH:mm A)")}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="revision-show">
        <div className="cards-group">
          <div className="single-card item  pl-0">
            <FaRecycle className="single-icons" />
            <h6 className="text-heading">You Requested Revision</h6>
            <p className="text-subheading">
              Countdown will begin after succesfully submission of Requirement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Revision;
