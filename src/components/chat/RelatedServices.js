import React from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { postGig } from "../List/redux/Action";

const RelatedServices = ({ receiverGigs, aboutReceiver }) => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const fetchType = "user_services";
  const handleAdd = (id) => {
    dispatch(postGig({ gig_id: id }, fetchType, username));
  };
  return (
    <>
      {receiverGigs?.length && (
        <section className="recommendations">
          <header className="carousel-header">
            <div className="title">
              <h4>User Services&nbsp;</h4>
            </div>
          </header>
          <div className="related-gigs">
            {receiverGigs?.slice(0, 4)?.map((gig) => (
              <div className="related-gigs-section" key={gig?.id}>
                <header className="related-gigs-header">
                  <div className="related-image-container">
                    <Link to={`/${aboutReceiver?.username}/${gig?.slug}`}>
                      {Object.keys(gig?.gig_images)
                        ?.slice(0, 1)
                        ?.map((key, index) => (
                          <img
                            key={index}
                            className="related-gigs-image"
                            src={gig?.gig_images[key]?.url?.full}
                          />
                        ))}
                    </Link>
                    <i
                      onClick={() => handleAdd(gig?.id)}
                      className={`fas fa-heart related-gigs-heart ${
                        gig?.is_wishlist && "related-gigs-like"
                      }`}
                    ></i>
                  </div>
                  <div className="related-gigs-title">
                    <Link to={`/${aboutReceiver?.username}/${gig?.slug}`}>
                      <h3>{gig?.title}</h3>
                    </Link>
                    <Link to={`/${aboutReceiver?.username}`}>
                      <small>by {aboutReceiver?.username}</small>
                    </Link>
                  </div>
                </header>
                <footer className="related-gigs-footer">
                  <div className="ratings-container">
                    {gig?.gig_rating?.average_rating && (
                      <span className="related-gigs-rating">
                        <i className="fas fa-star"></i>
                        &nbsp;
                        {gig?.gig_rating?.average_rating}
                      </span>
                    )}
                    {gig?.gig_rating?.total_rating && (
                      <span className="related-gigs-reviews">
                        ({gig?.gig_rating?.total_rating})
                      </span>
                    )}
                  </div>
                  <Link to={`/${aboutReceiver?.username}/${gig?.slug}`}>
                    <div className="related-gigs-price">
                      <small>FROM</small>
                      <span>${gig?.starting_price}</span>
                    </div>
                  </Link>
                </footer>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default RelatedServices;
