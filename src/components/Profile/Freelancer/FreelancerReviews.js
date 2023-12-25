import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { openModal } from "../../../redux/Modal/Modal.action";
import { postReviewStatus } from "../../GigSingle/redux/Action";
import { useParams } from "react-router";
import { Dropdown } from "react-bootstrap";
import { fetchFreelancerReview } from "./redux/Action";

const FreelancerReviews = ({ data, review, filterData, reviewLoading }) => {
  const type = "review";
  const { user } = useParams();
  const { isAuthenticated, user: userRole } = useSelector(
    (state) => state.auth
  );
  const [filter, setFilter] = useState(filterData?.sort_name);
  const dispatch = useDispatch();
  useEffect(() => {
    userRole?.role === "seller" && dispatch(fetchFreelancerReview(user));
  }, [user, userRole, dispatch]);
  const handleReviewStatus = (status, id) => {
    dispatch(postReviewStatus(status, id, user, null, type));
  };

  const handleFilterReview = (name, sort_by) => {
    setFilter(name);
    let newFilterData = { ...filterData, sort_by: sort_by, sort_name: name };
    dispatch(fetchFreelancerReview(user, newFilterData));
  };

  return (
    <div className="freelancer-review-container">
      {reviewLoading
        ? // <ContainerSpinner backgroundColor='#fff' />
          ""
        : data?.profile?.seller_rating && (
            <>
              <div className="freelancer-review-header">
                <div className="freelancer-review-title">
                  <h2 className="review-title">
                    Reviews as Seller
                    <small>
                      <i className="fas fa-star"></i>
                      <span className="average-rating">
                        {data?.profile?.seller_rating?.average_rating}
                      </span>
                      <span className="total-rating">
                        ({data?.profile?.seller_rating?.total_rating})
                      </span>
                    </small>
                  </h2>
                </div>
                <div className="freelancer-review-select">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      {filter}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {/* <Dropdown.Item  className="actionCall">
                                        <span>Most Recent</span>
                                    </Dropdown.Item> */}
                      <Dropdown.Item
                        onClick={() =>
                          handleFilterReview("Most Relevant", "most_relevant")
                        }
                        className={filter === "Most Relevant" && "actionCall"}
                      >
                        <span>Most Relevant</span>
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handleFilterReview("Most Recent", "most_recent")
                        }
                        className={filter === "Most Recent" && "actionCall"}
                      >
                        <span>Most Recent</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>

              <div className="freelancer-review-level">
                <div className="freelancer-ratings">
                  <span>Seller communication level</span>
                  <small>
                    <i className="fas fa-star"></i>
                    <span className="star-gap">
                      {data?.profile?.seller_rating?.communication_rating}
                    </span>
                  </small>
                </div>
                <div className="freelancer-ratings">
                  <span>Recommend to a friend</span>
                  <small>
                    <i className="fas fa-star"></i>
                    <span className="star-gap">
                      {data?.profile?.seller_rating?.recommend_rating}
                    </span>
                  </small>
                </div>
                <div className="freelancer-ratings">
                  <span>Service as described</span>
                  <small>
                    <i className="fas fa-star"></i>
                    <span className="star-gap">
                      {data?.profile?.seller_rating?.service_rating}
                    </span>
                  </small>
                </div>
              </div>
            </>
          )}
      <div className="revier_List_Items">
        {review?.data?.map((feedback) => (
          <div className="reviewer_Item_main" key={feedback?.id}>
            <div className="reviewer_Item">
              <div
                className="reviewer_profile_img"
                style={{
                  backgroundImage: `url(${feedback?.user?.profileImage?.url?.full})`,
                }}
              ></div>
              <div className="review_Meta_Contents">
                <div className="reviewer_User">
                  <h5>{feedback?.user?.name}</h5>
                  <span>
                    <FaStar />
                    <span className="star-gap">{feedback?.average_rating}</span>
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
                      feedback?.feedback_action?.helpful === 1
                        ? { color: "blue" }
                        : {}
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
                      feedback?.feedback_action?.not_helpful === 1
                        ? { color: "blue" }
                        : {}
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
                  <span>
                    {feedback?.feedback_action?.helpful === 1
                      ? "You found this review helpful."
                      : ""}
                  </span>
                </div>
              </div>
              <div className="reviewer_work_deliver"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreelancerReviews;
