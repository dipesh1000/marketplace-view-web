import React, { useState, useEffect } from "react";
import { IoLocationSharp, IoPersonSharp } from "react-icons/io5";
import { VscDebugStackframeDot } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postSeller } from "../../List/redux/Action";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import ReportForm from "../../GigSingle/ReportForm";
import { Modal } from "react-bootstrap";
import { openModal } from "../../../redux/Modal/Modal.action";
import { checkActiveUser } from "../../../utils/Helper";

function FreelancerProfileInfo({ data }) {
  const dispatch = useDispatch();
  const { user } = useParams();
  const [show, setShow] = useState(false);
  const [like, setLike] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => {
    isAuthenticated ? setShow(true) : dispatch(openModal("login"));
  };
  const starCount = data?.profile?.seller_rating?.average_rating;
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleAdd = () => {
    if (isAuthenticated) {
      dispatch(postSeller({ seller_id: data?.profile?.id }, user));
      setLike(!like);
    } else {
      dispatch(openModal("login"));
    }
  };
  useEffect(() => {
    setLike(data?.profile?.is_wishlist);
  }, [data]);
  return (
    <div className="profile-Info">
      <div>
        <div className="profile-image">
          <div className="profile-save">
            <i
              className={`fas fa-heart ${like ? "like" : ""}`}
              onClick={() => handleAdd()}
            ></i>
            {checkActiveUser(data?.profile?.id) && (
              <span>
                <VscDebugStackframeDot />
                Online
              </span>
            )}
          </div>
          <div className="image-div">
            <img
              src={data?.profile?.personal?.profile_image?.url?.full}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="freelancer-details">
          <div className="profile-username">{data?.profile?.username}</div>
          <div>
            <div className="profile-rating-section">
              <ul className="profile-stars">
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
              <b className="profile-rating">{starCount ? starCount : 0}</b>
              <span className="profile-rating-count">
                (
                {data?.profile?.seller_rating?.total_rating
                  ? data?.profile?.seller_rating?.total_rating
                  : "0"}
                &nbsp;reviews)
              </span>
            </div>
            <div
              className="report-user"
              onClick={handleShow}
              title="Report Seller"
            >
              <i className="fas fa-flag"></i>Report
            </div>
            <Modal
              show={show}
              onHide={handleClose}
              dialogClassName="modalwrapper"
            >
              <Modal.Header closeButton>
                <div className="modal-title">Report This Seller</div>
              </Modal.Header>
              <Modal.Body>
                <ReportForm handleClose={handleClose} id={data?.profile?.id} />
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
      <div className="buttons-wrapper">
        <button
          className="contact-button"
          onClick={() =>
            isAuthenticated
              ? dispatch(openModal("sendMessageModal", data?.profile?.id))
              : dispatch(openModal("login"))
          }
        >
          Contact Me
        </button>
        <button className="quote-button">Get a Quote</button>
      </div>
      <hr />
      <div className="profile-details">
        <div>
          <div className="detail-level">
            <IoLocationSharp />
            <span>From</span>
          </div>
        </div>
        <div>
          <p>{data?.profile?.personal?.country}</p>
        </div>
      </div>
      <div className="profile-details">
        <div>
          <div className="detail-level">
            <IoPersonSharp />
            <span>Member Since</span>
          </div>
        </div>
        <div>
          <p>Apr 2021</p>
        </div>
      </div>
    </div>
  );
}

export default FreelancerProfileInfo;
