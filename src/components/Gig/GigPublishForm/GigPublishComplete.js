import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { hideSpinner } from "../../common/Spinner/redux/Action";
import "./style/GigPublish.scss";

function GigPublishComplete() {
  const dispatch = useDispatch();

  const { slug } = useParams();
  useEffect(() => {
    dispatch(hideSpinner());
    // dispatch(getShareLinks(slug));
  }, [dispatch]);
  //   const { singleGig } = useSelector((state) => state.gig);

  const history = useHistory();
  // eslint-disable-next-line
  const handleHistory = () => {
    history.push(
      `/users/seller_dashboard/manage_gigs/${slug}/gigs_requirement`
    );
  };
  // eslint-disable-next-line
  const handleSubmit = () => {
    // dispatch(publishGig(singleGig.id, handleHistory));
  };

  return (
    <div className="publish">
      <div className="publish-wrapper">
        <div className="main-title">You did it! Your Gig is now live</div>
        <div className="main-subtitle">
          Let’s get the word out to boost your sales
        </div>
        <div className="link-copy">
          <i className="fa fa-link"></i>{" "}
          <span>https://www.fucha.com/s2/dfd60a0544</span>
        </div>
        <ul className="social-links">
          <li>
            <a href="/">
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="/">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="/">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </li>
        </ul>
      </div>
      <div className="d-flex justify-content-end mt-4">
        <Link
          to="/users/seller_dashboard/gigs"
          className="custom-btn successBtn"
        >
          Done
        </Link>
      </div>
    </div>
  );
}

export default React.memo(GigPublishComplete);
