import React from "react";
import { BsStarFill, BsStar } from "react-icons/bs";
import { BiChat } from "react-icons/bi";

function SellerReview({ seller, buyer_feedback }) {
  const starCount = buyer_feedback?.rating;
  return (
    <div className="review-container">
      <div className="single-card">
        <div className="title_box">
          <BiChat className="single-icons" />
          <div className="title_contains">
            <h6 className="text-heading">Your Review</h6>
            <span className="dates">jan 03, 2021</span>
          </div>
        </div>
      </div>
      <div className="review-content dark_contain_box">
        <div className="first-wrap">
          <div className="img-wrap">
            <img
              src={seller?.profileImage?.url?.resize}
              alt={seller?.profileImage?.alt}
            />
            <div className="name">{seller?.username}</div>{" "}
          </div>
        </div>
        <div className="second-wrap">
          <ul className="star-list">
            {[...Array(5).keys()].map((item, index) =>
              item < starCount ? (
                <li key={index}>
                  <BsStarFill />
                </li>
              ) : (
                <li key={index}>
                  <BsStar />
                </li>
              )
            )}
            <li className="revie_count">{starCount} Stars</li>
            {/* <li className="colored-list">
              <div className="title">
                <div>Overall Experience </div>
                <span>Review given by seller to buyer </span>
              </div>{" "}
            </li> */}
          </ul>
          <div className="review">{buyer_feedback?.message}</div>
        </div>
      </div>
    </div>
  );
}

export default SellerReview;
