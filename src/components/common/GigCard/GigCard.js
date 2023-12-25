import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { openModal } from "../../../redux/Modal/Modal.action";
import { checkActiveUser } from "../../../utils/Helper";
import { postGig } from "../../List/redux/Action";
import CardSlider from "../slider/CardSlider";

function GigCard({ data, id, wishlist, fetchType, postData }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleAdd = () => {
    isAuthenticated
      ? dispatch(postGig({ gig_id: id }, fetchType, postData))
      : dispatch(openModal("login"));
  };

  return (
    <>
      <div className="gig-box" id="card-item">
        <CardSlider>
          {Object.keys(data.gig_images)?.length > 0 ? (
            Object.keys(data.gig_images)?.map((key, index) => {
              return (
                <div key={index} className="image">
                  <Link to={`/${data?.seller?.username}/${data?.slug}`}>
                    <img
                      src={data.gig_images[key]?.url?.resize}
                      title=""
                      alt=""
                    />
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="image">
              <Link to={`/${data?.seller?.username}/${data?.slug}`}>
                <img
                  src="https://dummyimage.com/320x200&text=fucha.com"
                  title=""
                  alt=""
                />
              </Link>
            </div>
          )}
        </CardSlider>
        <div className="seller-info">
          <div className="seller-icon">
            <a href="/">
              <div
                className={`indicator ${
                  checkActiveUser(data?.seller?.id) ? "active" : ""
                }`}
              ></div>
              <img
                src={data?.seller?.profileImage?.url?.full}
                className="gig-seller-image"
                alt=""
              />
            </a>
          </div>
          <div className="seller-name">
            <Link to={`/${data?.seller?.username}`}>
              {data?.seller?.username}
            </Link>
          </div>
        </div>
        <div className="gig-info">
          <h3>
            <Link to={`/${data?.seller?.username}/${data?.slug}`}>
              {data?.title}
            </Link>
          </h3>
          {data?.gig_rating ? (
            <div className="rating-wrapper">
              <span className="gig-rating">
                <i className="fas fa-star"></i>
                &nbsp;
                {data?.gig_rating?.average_rating}
              </span>
              <span className="gig-reviews">
                ({data?.gig_rating?.total_rating})
              </span>
            </div>
          ) : (
            <div className="rating-wrapper">
              <span className="gig-rating"></span>
            </div>
          )}
          <div className="gig-ext">
            <div className="gig-btn">
              <button className="save-gig">
                <i
                  className={`fas fa-heart ${wishlist ? "like" : ""}`}
                  onClick={handleAdd}
                ></i>
              </button>
            </div>
            <div className="gig-price">
              <a href="/">
                <span>Starting at</span> ${data?.starting_price}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GigCard;
