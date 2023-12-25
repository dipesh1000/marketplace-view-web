import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ArrowSlider from "../common/slider/ArrowSlider";

const truncate = (str, max, suffix) =>
  str.length < max
    ? str
    : `${str.substr(
        0,
        str.substr(0, max - suffix.length).lastIndexOf(" ")
      )}${suffix}`;
function GigSellerReview() {
  const { top_feedbacks } = useSelector(
    (state) => state.gigDetails,
    shallowEqual
  );
  return (
    <>
      {top_feedbacks?.length > 0 && (
        <div className="GigSellerReview">
          <div className="GSRtitle">
            <h4>What people loved about this seller</h4>
            <Link to="/">See all reviews</Link>
          </div>
          <ArrowSlider slidesToShow={1}>
            {top_feedbacks?.map((item, index) => {
              return (
                <div key={item?.id} className="GSRboxContainer">
                  <div className="GSRBox">
                    <div className="GSRBoxProfile">
                      <img
                        src={item?.user?.profileImage?.url?.resize}
                        alt={item?.user?.profileImage?.alt}
                      />
                    </div>
                    <div className="GDRBoxInfo">
                      <div className="GDRBoxInfoInner">
                        <h6 className="GDRtext">{item?.user?.username}</h6>
                        {/* <img className="GDRtext" src={item.flag} /> */}
                        <span className="GDRtext GDRFont">
                          {item?.user?.country}
                        </span>
                        <div className="GDRtext">
                          <span className="scRating">
                            <i className="fas fa-star"></i>
                            {item?.average_rating}
                          </span>
                        </div>
                      </div>
                      <p>{truncate(item?.message, 135, "...")}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ArrowSlider>
        </div>
      )}
    </>
  );
}

export default GigSellerReview;
