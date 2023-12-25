import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { openModal } from "../../redux/Modal/Modal.action";
import { startChat } from "../chat/redux/Action";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { formatDate } from "../../utils/TimestamptoDate";
import { checkGigUser } from "../../utils/Helper";

function AboutThisSeller() {
  const { gigs } = useSelector((state) => state.gigDetails, shallowEqual);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const startChatHandle = (user_id) => {
    dispatch(startChat(user_id));
  };

  const starCount = gigs?.seller?.rating?.average_rating;
  return (
    <>
      <div className="AboutThisSeller" id="about_seller">
        <h4 id="abouttheseller">About The Seller</h4>
        <div className="SellerMainDetails">
          <div className="SellerImg">
            <img
              src={gigs?.seller?.profileImage?.url?.resize}
              alt={gigs?.seller?.profile_image?.alt}
            />
          </div>
          <div className="sellerDetailsContact">
            <Link to={`/${gigs?.seller?.username}`}>
              <h6>{gigs?.seller?.username}</h6>
            </Link>
            <p>Logo and branding Expert</p>
            <div className="scDetails d-flex ">
              <span className="scRating">
                {gigs?.seller?.rating?.average_rating ? (
                  <div className="d-flex">
                    <ul className="star-list">
                      {[...Array(5).keys()].map((item, index) =>
                        item <= starCount - 1 ? (
                          <li className="pr-2" key={index}>
                            <BsStarFill />
                          </li>
                        ) : item + 1 > starCount && item < starCount ? (
                          <li className="pr-2" key={index}>
                            <BsStarHalf />
                          </li>
                        ) : (
                          <li className="pr-2" key={index}>
                            <BsStar />
                          </li>
                        )
                      )}
                    </ul>
                    <span style={{ fontSize: "1rem" }}>{starCount}</span>
                  </div>
                ) : (
                  ""
                )}
              </span>

              {gigs?.seller?.rating?.total_rating
                ? `(${gigs?.seller?.rating?.total_rating})`
                : ""}
            </div>
            {!checkGigUser(gigs?.seller?.username) && (
              <Button
                variant="outline-secondary sc-btn-sec"
                onClick={() =>
                  isAuthenticated
                    ? dispatch(openModal("sendMessageModal", gigs?.seller?.id))
                    : dispatch(openModal("login"))
                }
              >
                Contact Me
              </Button>
            )}
          </div>
        </div>
        <div className="SellerBio">
          <Row>
            <Col cd={6}>
              <div className="SellerBioGrid">
                From <br />
                <strong>{gigs?.seller?.country}</strong>
              </div>
              <div className="SellerBioGrid">
                Avg. response time <br />
                <strong>{gigs?.seller?.response_time}</strong>
              </div>
            </Col>
            <Col cd={6}>
              <div className="SellerBioGrid">
                Member since <br />
                <strong>
                  {formatDate(gigs?.seller?.join_date, "MMM, YYYY")}
                </strong>
              </div>
              <div className="SellerBioGrid">
                Last delivery <br />
                <strong>about {gigs?.seller?.last_delivery}</strong>
              </div>
            </Col>
          </Row>
          <hr />
          <p
            className="textContainer"
            dangerouslySetInnerHTML={{
              __html: gigs?.seller?.description,
            }}
          ></p>
        </div>
      </div>
    </>
  );
}

export default AboutThisSeller;
