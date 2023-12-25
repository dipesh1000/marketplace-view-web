import { Button, Dropdown, Tab } from "react-bootstrap";
import React, { useState } from "react";
import { Col, Row, ProgressBar } from "react-bootstrap";
import { FaStar, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { getSingleGigFeedback, postReviewStatus } from "./redux/Action";
import ContainerSpinner from "../common/ContainerSpinner/ContainerSpinner";
import moment from "moment";
import { openModal } from "../../redux/Modal/Modal.action";

const GigReview = () => {
  const { gigs, feedbacks, pagination, filterData, feedbackLoading } =
    useSelector((state) => state.gigDetails, shallowEqual);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [count, setCount] = useState(2);
  const [active, setActive] = useState(false);
  const starCount = gigs?.gig_rating?.average_rating;
  const dispatch = useDispatch();
  const { slug } = useParams();

  const gigRatingCount = [
    {
      title: "5 star",
      value: gigs?.gig_rating?.five_star_rating,
      id: 5,
    },
    {
      title: "4 star",
      value: gigs?.gig_rating?.four_star_rating,
      id: 4,
    },
    {
      title: "3 star",
      value: gigs?.gig_rating?.three_star_rating,
      id: 3,
    },
    {
      title: "2 star",
      value: gigs?.gig_rating?.two_star_rating,
      id: 2,
    },
    {
      title: "1 star",
      value: gigs?.gig_rating?.one_star_rating,
      id: 1,
    },
  ];

  const gigRatingTotal = gigRatingCount.reduce(
    (previousCount, newCount) => previousCount + newCount.value,
    0
  );

  const handleFilterReview = (name, sort_by) => {
    let newFilterData = { ...filterData, sort_by: sort_by, sort_name: name };
    dispatch(getSingleGigFeedback(slug, newFilterData));
  };

  const handleStarRating = (rating_type) => {
    let newFilterData = { ...filterData, rating_type: rating_type };
    dispatch(getSingleGigFeedback(slug, newFilterData));
    setActive(rating_type);
  };

  const handlePagination = (count) => {
    setCount((prev) => prev + 1);
    let newFilterData = { ...filterData, page: count };
    dispatch(getSingleGigFeedback(slug, newFilterData));
  };

  return (
    <>
      {feedbacks ? (
        <div className="Review_FeedBack_Box">
          <div className="Review_Head">
            <Row className="align-items-center">
              <Col md={6}>
                <div className="total_Reviews">
                  {gigs?.gig_rating?.total_rating} Reviews
                  <div className="overall_Rating">
                    <span>
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
                      </ul>
                    </span>
                    {starCount}
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="sort_By text-right">
                  Sort By
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      {filterData?.sort_name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {/* <Dropdown.Item  className="actionCall">
                                        <span>Most Recent</span>
                                    </Dropdown.Item> */}
                      <Dropdown.Item
                        onClick={() =>
                          handleFilterReview("Most Relevant", "most_relevant")
                        }
                        className={
                          filterData?.sort_name === "Most Relevant" &&
                          "actionCall"
                        }
                      >
                        <span>Most Relevant</span>
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handleFilterReview("Most Recent", "most_recent")
                        }
                        className={
                          filterData?.sort_name === "Most Recent" &&
                          "actionCall"
                        }
                      >
                        <span>Most Recent</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>
            </Row>
          </div>
          <div className="Review_Body">
            <Tab.Container id="left-tabs-example">
              <Row>
                <Col md={6}>
                  <div className="rating_Navs">
                    {gigRatingCount?.map((item, index) => {
                      let progressUpdate =
                        (item?.value / (gigRatingTotal && gigRatingTotal)) *
                        100;
                      return (
                        <div
                          className="rating_By_Number"
                          key={item?.id}
                          onClick={() => handleStarRating(item?.id)}
                        >
                          <span
                            className={`rating_Orders ${
                              active === item?.id ? "active" : ""
                            }`}
                          >
                            {item?.title}
                          </span>
                          <ProgressBar
                            className="progress_Review"
                            variant="warning"
                            now={progressUpdate}
                          />
                          <span className="rating_Count">({item?.value})</span>
                        </div>
                      );
                    })}
                  </div>
                </Col>
                <Col md={6}>
                  <ul className="review_By_Types_Wrap">
                    <li className="review_Breakdown">Rating Breakdown</li>
                    <li className="review_By_Types">
                      Seller communication level
                      <span className="buyer_Avg_Review">
                        {gigs?.gig_rating?.communication_rating}
                        <FaStar />
                      </span>
                    </li>
                    <li className="review_By_Types">
                      Recommend to a friend
                      <span className="buyer_Avg_Review">
                        {gigs?.gig_rating?.recommend_rating} <FaStar />
                      </span>
                    </li>
                    <li className="review_By_Types">
                      Service as described
                      <span className="buyer_Avg_Review">
                        {gigs?.gig_rating?.service_rating} <FaStar />
                      </span>
                    </li>
                  </ul>
                </Col>
              </Row>
              {/* <div className="review_List_Filter">
                        <label className="filter_Toggle_container">
                            <input type="checkbox" />
                            <span className="filter_btn"></span>
                        </label>
                        <span className="review_Filter_text">Show only reviews with delivery images (168)</span>
                    </div> */}
              {/* <div className="Filter_Details">Showing 4 stars reviews with delivery images</div> */}
              {feedbackLoading ? (
                <ContainerSpinner backgroundColor="#ffffff" height="200px" />
              ) : (
                <div className="revier_List_Items">
                  {feedbacks?.map((feedback, index) => (
                    <Feedback
                      feedback={feedback}
                      isAuthenticated={isAuthenticated}
                      slug={slug}
                      key={feedback?.id}
                      filterData={filterData}
                    />
                  ))}
                </div>
              )}
              {pagination?.total_pages >= count && (
                <Button onClick={() => handlePagination(count)}>
                  + See More
                </Button>
              )}
            </Tab.Container>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default GigReview;

const Feedback = ({ feedback, isAuthenticated, slug, filterData }) => {
  const [helpful, setHelpful] = useState(feedback?.feedback_action?.helpful);
  const [notHelpful, setNotHelpful] = useState(
    feedback?.feedback_action?.not_helpful
  );

  const dispatch = useDispatch();

  const handleReviewStatus = (status, id) => {
    dispatch(postReviewStatus(status, id, slug, filterData));
    if (status === "helpful") {
      helpful ? setHelpful(false) : setHelpful(true);
      setNotHelpful(false);
    } else if (status === "not_helpful") {
      setHelpful(false);
      notHelpful ? setNotHelpful(false) : setNotHelpful(true);
    }
  };
  return (
    <div className="reviewer_Item_main" id="reviews" key={feedback?.id}>
      <div className="reviewer_Item">
        <div
          className="reviewer_profile_img"
          style={{
            backgroundImage: `url(${feedback?.user?.profileImage?.url?.resize})`,
          }}
        ></div>
        <div className="review_Meta_Contents">
          <div className="reviewer_User">
            <h5>{feedback?.user?.username}</h5>
            <span>
              <FaStar />
              {feedback?.average_rating}
            </span>
          </div>
          <div className="reviewer_Country">
            <img
              className="country_Falg"
              src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
              alt="flag"
            />
            <span>{feedback?.user?.country}</span>
          </div>
          <div className="reviewer_Message">
            <p>{feedback?.message}</p>
          </div>
          <div className="review_Date">
            Published {moment(feedback?.created_at).fromNow()}
          </div>
          <div className="option_Btn">
            <div
              className="option_Helpful"
              style={
                // feedback?.feedback_action?.helpful === 1 ||
                helpful ? { color: "blue" } : {}
              }
              onClick={() =>
                isAuthenticated
                  ? handleReviewStatus("helpful", feedback?.id)
                  : dispatch(openModal("login"))
              }
            >
              <FaRegThumbsUp />
              Helpful
            </div>
            <div
              className="option_Nhelpful"
              style={
                // feedback?.feedback_action?.not_helpful === 1 ||
                notHelpful ? { color: "blue" } : {}
              }
              onClick={() =>
                isAuthenticated
                  ? handleReviewStatus("not_helpful", feedback?.id)
                  : dispatch(openModal("login"))
              }
            >
              <FaRegThumbsDown />
              Not HelpFul
            </div>
            <span>{helpful ? "You found this review helpful." : ""}</span>
          </div>
        </div>
        <div className="reviewer_work_deliver"></div>
      </div>

      {feedback?.seller_response !== null && (
        <div className="seller_Item_Response">
          <div
            className="reviewer_profile_img"
            style={{
              backgroundImage: `url(${feedback?.seller_response?.user?.profileImage?.url?.resize})`,
            }}
          ></div>
          <div className="review_Meta_Contents">
            <div className="reviewer_User">
              <h5>{feedback?.seller_response?.user?.username}</h5>
              <span>
                <FaStar />
                {feedback?.seller_response?.rating}
              </span>
            </div>
            <div className="reviewer_Country">
              <img
                className="country_Falg"
                src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                alt="flag"
              />
              <span>{feedback?.seller_response?.user?.country}</span>
            </div>
            <div className="reviewer_Message">
              <p>{feedback?.seller_response?.message}</p>
            </div>
            <div className="review_Date">
              Published{" "}
              {moment(feedback?.seller_response?.created_at).fromNow()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
