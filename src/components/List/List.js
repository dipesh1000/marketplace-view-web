import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { AiFillLock } from "react-icons/ai";
import "./styles/style.scss";
import GigCard from "../common/GigCard/GigCard";
import SellersList from "./SellersList";
import { fetchWishlist } from "./redux/Action";
import { useDispatch, useSelector } from "react-redux";
import ContainerSpinner from "../common/ContainerSpinner/ContainerSpinner";
import useTitle from "../../utils/useTitle";

function List() {
  const [show, setShow] = useState(true);
  const { wishlist, isLoading } = useSelector((state) => state.wishList);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useTitle("Fuchas - Wishlist");
  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <>
      <Container>
        <div className="list-page">
          <div className="list-header">
            <div>
              <div className="title-section">
                <div className="title">My Lists</div>
                <div className="title-list">
                  <AiFillLock className="icon" />
                  Private List
                </div>
              </div>
              <div className="profile">
                {user?.profileImage?.url?.full ? (
                  <img
                    className="avatar"
                    src={user?.profileImage?.url?.full}
                    alt={user?.name}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <span className="avatar">x</span>
                )}
                <p className="creator-name">
                  Created by <b>{user?.name}</b>
                </p>
              </div>
            </div>
          </div>
          <div className="list-nav">
            <div
              className={show ? "list-active" : "list-inactive"}
              onClick={() => setShow(true)}
            >
              Gigs ({wishlist?.data?.gigs?.length})
            </div>
            <div
              className={!show ? "list-active" : "list-inactive"}
              onClick={() => setShow(false)}
            >
              Sellers ({wishlist?.data?.sellers?.length})
            </div>
          </div>
          {isLoading ? (
            <ContainerSpinner backgroundColor="#fff" />
          ) : show ? (
            wishlist?.data?.gigs?.length ? (
              <div className="gig-list row-list">
                <div className="section-wrapper">
                  <div className="row">
                    {wishlist?.data?.gigs?.map((item, index) => (
                      <div
                        className="col-lg-3 col-md-4 col-sm-6"
                        key={item?.id}
                      >
                        <GigCard
                          data={item}
                          id={item?.id}
                          wishlist={item?.is_wishlist}
                          fetchType="wishlist"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <h5 style={{ minHeight: "150px" }}>
                Sorry, no gigs added to wishlist.
              </h5>
            )
          ) : wishlist?.data?.sellers?.length ? (
            <div className="sellers">
              <div className="row" style={{ rowGap: "2rem" }}>
                {wishlist?.data?.sellers?.map((item, index) => (
                  <SellersList key={index} index={item?.id} item={item} />
                ))}
              </div>
            </div>
          ) : (
            <h5 style={{ minHeight: "150px" }}>
              Sorry, no sellers added to wishlist.
            </h5>
          )}
        </div>
      </Container>
    </>
  );
}

export default List;
