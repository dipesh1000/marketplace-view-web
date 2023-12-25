import React from "react";
import { Link } from "react-router-dom";
import { FaRegImage } from "react-icons/fa";
import { formatDate } from "../../../utils/TimestamptoDate";
import { fileDownload } from "../../../utils/FileDownload";

function Message({ item, orderId }) {
  return (
    <>
      <div className="orderstart-wrap">
        {item?.type === "progress_update" && (
          <div className="message-progress-ribon">Progress Update</div>
        )}
        <div className="single_card_chat">
          <div className="message_inner_wrap_chat">
            <div className="msg-img">
              <img src={item?.user?.profileImage?.url?.resize} />
            </div>
            <div className="msg-content">
              <Link to="/home">{item?.user?.username}</Link>
              <p>{item?.message}</p>
              {item?.attachments.length > 0 && (
                <div className="text-center attactment-title">Attachments</div>
              )}
              <div className="attachment-wrapper">
                {item?.attachments?.map((list, index) => (
                  <div className="order-attachements" key={list?.id}>
                    {/* <h6>{list.name}</h6> */}
                    <div className="attach-box">
                      {/* eslint-disable-next-line*/}
                      <a
                        onClick={() =>
                          fileDownload(
                            orderId,
                            item?.attachments[index]?.id,
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
                            {list.name}
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
    </>
  );
}

export default Message;
