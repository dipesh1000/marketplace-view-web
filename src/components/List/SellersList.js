import React from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { openModal } from "../../redux/Modal/Modal.action";
import { formatDate } from "../../utils/TimestamptoDate";
import { postSeller } from "./redux/Action";

const SellersList = ({ index, item }) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(postSeller({ seller_id: index }));
  };

  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 seller-card-item">
      <div className="profile">
        <img
          className="profile-image"
          src={item?.profileImage?.url?.full}
          style={{ objectFit: "cover" }}
          alt={item?.profileImage?.alt}
        />
        <div className="profile-name">
          <div className="profile-title">
            <b>{item?.name}</b>
            {item?.rating?.average_rating ? (
              <>
                <span className="rating">
                  <strong>
                    <AiFillStar />
                    {item?.rating?.average_rating}
                  </strong>
                </span>
                <span>({item?.rating?.total_rating})</span>
              </>
            ) : null}
          </div>
          <div
            className="contact-seller"
            onClick={() => dispatch(openModal("sendMessageModal", index))}
          >
            Contact Seller
          </div>
        </div>
        <div className="profile-info">
          <div>
            Lives in<b>{item?.country}</b>
          </div>
          <div>
            On Fiverr since
            <b>{formatDate(item?.created_at, "MMM DD")}</b>
          </div>
          <div>
            Avg. response time<b>{item?.average_response_time}</b>
          </div>
        </div>
        <footer className="footer">
          <div className="footer-icons">
            <i className={`fas fa-heart like`} onClick={handleAdd}></i>
          </div>
          <Link to={`/${item?.username}`}>
            <div className="services">
              {item?.total_gigs} Available Services
            </div>
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default SellersList;
