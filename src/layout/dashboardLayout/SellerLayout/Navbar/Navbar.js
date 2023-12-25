import React from "react";
import { Dropdown } from "react-bootstrap";
import Logo from "../../../../images/logo_d.png";
import "./style/Navbar.css";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../redux/Auth/Auth.action";
import NavNotification from "../../../../components/NavNotification/NavNotification";

function SellerNavbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleHistory = () => {
    history.push("/");
  };
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout({ user_id: user?.id }, handleHistory));
  };
  const handleProfile = () => {
    history.push(`/${user.username}`);
  };
  return (
    <div className="navbar sellerNav">
      <div className="container">
        <div className="navbar_wrapper">
          <div className="flex_first">
            <div className="logo">
              <Link to="/users/seller_dashboard">
                <img src={Logo} alt="Company logo" />
              </Link>
            </div>
            <ul className="nav_list">
              <li>
                <NavLink
                  exact
                  to="/users/seller_dashboard"
                  activeStyle={{ color: "#1dbf73" }}
                  style={{ color: "#7d8088" }}
                >
                  Dashboard
                </NavLink>
              </li>
              <li style={{ paddingTop: "23px", marginRight: "16px" }}>
                <NavNotification />
              </li>
              <li>
                <NavLink
                  to="/users/seller_dashboard/orders"
                  activeStyle={{ color: "#1dbf73" }}
                  style={{ color: "#7d8088" }}
                >
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/users/seller_dashboard/gigs"
                  activeStyle={{ color: "#1dbf73" }}
                  style={{ color: "#7d8088" }}
                >
                  Gigs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/users/seller_dashboard/analytics"
                  activeStyle={{ color: "#1dbf73" }}
                  style={{ color: "#7d8088" }}
                >
                  Analytics
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/users/seller_dashboard/earnings"
                  activeStyle={{ color: "#1dbf73" }}
                  style={{ color: "#7d8088" }}
                >
                  Earnings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/users/seller_dashboard/buyer_requests"
                  activeStyle={{ color: "#1dbf73" }}
                  style={{ color: "#7d8088" }}
                >
                  Buyer Request
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/users/seller_dashboard/manage_contact"
                  activeStyle={{ color: "#1dbf73" }}
                  style={{ color: "#7d8088" }}
                >
                  Contacts
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex_second">
            <div className="switch_link">
              <Link to="/?force_buying_nav">Switch to Buying</Link>
            </div>
            <Dropdown className="profile_dropdown">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <div className="profile_img">
                  <img src={user?.profileImage?.url?.resize} alt="" />
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleProfile}>Profile</Dropdown.Item>
                <div className="line-break"></div>
                <Dropdown.Item href="#/action-2">
                  <Link to="/users/edit/account">Settings</Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  English <i className="fa fa-globe"></i>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">$USD</Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                  <Link to="/support_tickets/new">Help & Support</Link>
                </Dropdown.Item>
                <div className="line-break"></div>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <div className="amount">
              <span>${user?.totalEarning}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerNavbar;
