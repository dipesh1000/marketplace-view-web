import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFaqParent } from "./redux/Action";
import ContainerSpinner from "../common/ContainerSpinner/ContainerSpinner";
import "./styles/styles.scss";
import useTitle from "../../utils/useTitle";

const Support = () => {
  const dispatch = useDispatch();
  const { faq, isLoading } = useSelector((state) => state.faq);
  const [show, setShow] = useState(true);
  useTitle("Fuchas - FAQ & Guides");
  useEffect(() => {
    dispatch(fetchFaqParent());
  }, [dispatch]);
  return (
    <div className="support-section">
      <div className="nav-section">
        <div
          className={show ? "nav-active" : "nav-deactive"}
          onClick={() => setShow(true)}
        >
          Buyers
        </div>
        <div
          className={!show ? "nav-active" : "nav-deactive"}
          onClick={() => setShow(false)}
        >
          Sellers
        </div>
      </div>
      <div className="topic-section">
        <h6 className="heading">Popular topics</h6>
        {isLoading ? (
          <ContainerSpinner backgroundColor="#fff" />
        ) : show ? (
          <div className="popular-topics">
            {faq?.for_buyers?.map((item, index) => (
              <div className="popular-item" key={item?.id}>
                <Link to={`/support/${item?.slug}`}>
                  <div className="items">
                    <span className="icon-container">
                      <img src={item?.icon?.url?.full} alt={item?.icon?.alt} />
                    </span>
                    <div>
                      <b>{item.title}</b>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="popular-topics">
            {faq?.for_sellers?.map((item, index) => (
              <div className="popular-item" key={item?.id}>
                <Link to={`/support/${item?.slug}`}>
                  <div className="items">
                    <span className="icon-container">
                      <img src={item?.icon?.url?.full} alt={item?.icon?.alt} />
                    </span>
                    <div>
                      <b>{item?.title}</b>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;
