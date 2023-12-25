import React from "react";
import { BsStarHalf, BsStarFill, BsStar, BsEyeSlash } from "react-icons/bs";
import { BiChat } from "react-icons/bi";

function Review({ buyer, buyer_feedback, seller_feedback }) {
  const starCount = seller_feedback?.average_rating;
  return (
    <div className="review-container">
      <div className="single-card item pl-30">
        <div className="title_box">
          <BiChat className="single-icons" />
          <div className="title_contains">
            <h6 className="text-heading">Buyer's Review</h6>
            <span className="dates">jan 03, 2021</span>
          </div>
        </div>
      </div>
      {buyer_feedback ? (
        <div className="review-content dark_contain_box">
          <div className="first-wrap">
            <div className="img-wrap">
              <img
                src={buyer?.profileImage?.url?.resize}
                alt={buyer?.profileImage?.alt}
              />
              <div className="name">{buyer?.username}</div>{" "}
            </div>
          </div>
          <div className="second-wrap">
            <ul className="star-list">
              {[...Array(5).keys()].map((item, index) =>
                item <= starCount - 1 ? (
                  <li key={index}>
                    <BsStarFill />
                  </li>
                ) : item + 1 > starCount && item < starCount ? (
                  <li key={index}>
                    <BsStarHalf />
                  </li>
                ) : (
                  <li key={index}>
                    <BsStar />
                  </li>
                )
              )}
              <li className="revie_count">{starCount} Stars</li>
            </ul>
            <div className="review">{seller_feedback?.message}</div>
            <ul className="review-lists">
              <li>
                <div className="title">Communication with Seller</div>{" "}
                <div className="stars">
                  {[...Array(5).keys()].map((item, index) =>
                    item < seller_feedback?.communication_rating ? (
                      <BsStarFill key={index} />
                    ) : (
                      <BsStar key={index} />
                    )
                  )}
                  <span>{seller_feedback?.communication_rating} Stars</span>
                </div>
              </li>
              <li>
                <div className="title">Service as Described</div>{" "}
                <div className="stars">
                  {[...Array(5).keys()].map((item, index) =>
                    item < seller_feedback?.service_rating ? (
                      <BsStarFill key={index} />
                    ) : (
                      <BsStar key={index} />
                    )
                  )}
                  <span>{seller_feedback?.service_rating} Stars</span>
                </div>
              </li>
              <li>
                <div className="title">Buy Again or Recommend</div>{" "}
                <div className="stars">
                  {[...Array(5).keys()].map((item, index) =>
                    item < seller_feedback?.recommend_rating ? (
                      <BsStarFill key={index} />
                    ) : (
                      <BsStar key={index} />
                    )
                  )}
                  <span>{seller_feedback?.recommend_rating} Stars</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="review-content">
          <div className="note">
            <BsEyeSlash /> Buyer review will be hidden untill you give your
            review.
          </div>
        </div>
      )}
    </div>
  );
}

export default Review;
