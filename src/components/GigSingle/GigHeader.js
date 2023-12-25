import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { shallowEqual, useSelector } from "react-redux";
import useTitle from "../../utils/useTitle";

const GigHeader = () => {
  const { gigs } = useSelector((state) => state.gigDetails, shallowEqual);
  const title = `
  ${
    gigs?.title?.slice(7)?.charAt(0).toUpperCase() + gigs?.title?.slice(8)
  } by ${
    gigs?.seller?.username?.charAt(0).toUpperCase() +
    gigs?.seller?.username?.slice(1)
  } | Fuchas`;
  useTitle(title);
  const starCount = gigs?.gig_rating?.average_rating;
  return (
    <>
      <div className="SingleContentWrapper">
        <h2 id="overview">{gigs?.title}</h2>
        <div className="scInfo">
          <div className="scUser">
            <img
              className="scImage"
              src={gigs?.seller?.profileImage?.url?.resize}
              alt={gigs?.seller?.profile_image?.alt}
            />
            <a href="#about_seller">
              <h6>{gigs?.seller?.username}</h6>
            </a>
            {/* <p>Level {gigs?.seller?.seller_level} Seller</p> */}
          </div>
          {starCount ? (
            <div className="scDetails">
              <span className="scRating">
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
                  <li className="review_count">{starCount}</li>
                </ul>
              </span>
              <div className="total_rating_counter">
                ({gigs?.gig_rating?.total_rating || "0"})
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="scDetails">
            <span>{gigs?.order_queue || "0"} Orders in Queue</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default GigHeader;
