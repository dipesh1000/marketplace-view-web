import React from "react";
import { Link } from "react-router-dom";
import { FaArrowCircleDown, FaInfoCircle } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import { fileDownload } from "../../../utils/FileDownload";

function AccordionSection({ requirements, buyer, orderId }) {
  return requirements?.length > 0 ? (
    <div className="order-item-acc">
      <div className="avatar_contain">
        <div
          className="avatar_img"
          style={{
            backgroundImage: `url('${buyer?.profileImage?.url.resize}')`,
          }}
        ></div>
        <span>{buyer.username}</span>
      </div>
      <div className="order-acc">
        {requirements?.map((item) =>
          item.type === "Free text" ? (
            <>
              <h6>{item?.question}</h6>
              <p>{item.answer}</p>
            </>
          ) : item.type === "Multiple choice" ? (
            <>
              <h6>{item.question}</h6>
              <ul className="order-mutiple-select">
                {item.answer?.map((list, index) => (
                  <li key={index}>
                    <FaCheckSquare /> {list}
                  </li>
                ))}
              </ul>
            </>
          ) : item.type === "Attachment" ? (
            <div className="order-attachements">
              <p>Attachments</p>
              <h6>{item.question}</h6>
              <div className="attach-box">
                <Link to="#">
                  <div className="desc-expire">
                    <FaRegImage />
                  </div>
                </Link>
                {/* eslint-disable-next-line*/}
                <a onClick={() => fileDownload(orderId, item?.id)}>
                  <div className="desc-bottom">
                    <span
                      className="img-filename"
                      title="order-hero-image-ing-s.png"
                    >
                      <FaArrowCircleDown />
                      Requirement
                    </span>
                    <span className="img-sizes">(134.15KB)</span>
                  </div>
                </a>
              </div>
            </div>
          ) : null
        )}
      </div>
      <hr />
      <div className="order-foot">
        <FaInfoCircle />
        <p>
          The buyer agreed that the information provided is accurate and
          complete. The buyer is aware that any changes, requiring your
          approval, may be subject to additional costs.
        </p>
      </div>
    </div>
  ) : (
    <div className="order-item-ac">
      <div className="order-foot">
        <p>
          {" "}
          Seller has skipped the requirements. Order has been started since the
          requirement is skipped.
        </p>
      </div>
    </div>
  );
}

export default AccordionSection;
