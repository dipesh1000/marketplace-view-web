import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ContainerSpinner from "../common/ContainerSpinner/ContainerSpinner";
import { fetchOrders } from "../OrderList/redux/Action";
import "./style/style.scss";

function MainArea() {
  const [dropdown, setDropdown] = useState("active");
  const dropTab = useRef(null);
  const dispatch = useDispatch();

  const { orders, loading } = useSelector((state) => state.sellerOrders);

  useEffect(() => {
    const child = dropTab.current.querySelectorAll(".tab-section");
    // eslint-disable-next-line
    Array.from(child)?.map((list) => {
      list.classList.remove("show");
      list.getAttribute("eventKey") === dropdown && list.classList.add("show");
    });
  }, [dropdown]);

  const handleDropdown = (e) => {
    e.preventDefault();
    setDropdown(e.target.value);
    dispatch(fetchOrders(e.target.value));
  };

  const handleLabel = () => {
    if (dropdown === "active") {
      return "Active Orders";
    } else if (dropdown === "cancelled") {
      return "Cancelled Orders";
    } else if (dropdown === "complete") {
      return "Completed Orders";
    }
  };

  return (
    <div className="main-area">
      <div className="orders">
        <div className="order-bar">
          <div className="order-title">{handleLabel()}</div>
          <div className="order-filter">
            <select onChange={handleDropdown}>
              <option value="active">Active Orders</option>
              <option value="complete">Completed Orders</option>
              <option value="cancelled">Cancelled Orders</option>
            </select>
          </div>
        </div>
        <div className="order-container" ref={dropTab}>
          <div className="tab-section" eventkey={dropdown}>
            {loading ? (
              <ContainerSpinner />
            ) : (
              orders &&
              orders.map((order) => (
                <div className="tab-list" key={order?.id}>
                  <div className="first-wrap">
                    <div className="gig-image">
                      {/* eslint-disable-next-line*/}
                      <img
                        src={order?.gig?.image?.url?.resize}
                        alt={order?.gig?.image?.alt}
                      />
                    </div>
                    <div className="user-profile">
                      <img
                        src={order?.user?.profileImage?.url?.resize}
                        alt={order?.user?.profileImage?.alt}
                      />
                    </div>
                    <div className="user-name">{order.user.username}</div>
                  </div>
                  <div className="price">
                    <div className="title">Price</div>
                    <div className="value">${order.total_price}</div>
                  </div>
                  <div className="status">
                    <div className="title">Status</div>
                    <div className="value">{order.status}</div>
                  </div>
                  <div className="action">
                    <Link
                      to={`/users/seller_dashboard/singleorders/${order.order_code}`}
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainArea;
