import React from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../../images/logo_d.png";
import { Container, Nav, Navbar } from "react-bootstrap";
import styles from "./Navbar.module.css";
import "./Navbar.css";
import DropdownNav from "./Dropdown/DropdownNav";
import NavNotification from "../../../components/NavNotification/NavNotification";
import NavOrder from "../../../components/NavOrder/NavOrder";
import SearchBar from "../../../components/Search/SearchBar";

export default function LoggedInNavbar({ auth, orderStatus }) {
  const history = useHistory();

  const handleRoute = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={`${styles.navBarOnScroll}`}
        variant="dark"
      >
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Brand onClick={(e) => handleRoute(e)}>
            <img
              src={Logo}
              alt="Navbar brand"
              width="100px"
              style={{ cursor: "pointer" }}
            />
          </Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <SearchBar styles={styles} />
            </Nav>
            <Nav className="align-items-center">
              <NavNotification />
              <Nav.Link>
                <Link to="/lists/mylist" className={styles.navTypoOnScroll}>
                  Lists
                </Link>
              </Nav.Link>
              {auth?.user?.role === "buyer" ? (
                <Nav.Link>
                  <Link
                    to="/users/dashboard/orders"
                    className={styles.navTypoOnScroll}
                  >
                    Orders
                  </Link>
                </Nav.Link>
              ) : (
                <NavOrder />
              )}
              {auth?.user?.role === "seller" && (
                <Nav.Link>
                  <Link
                    to="/users/seller_dashboard"
                    className={
                      (styles.navTypoOnScroll, "switch_loggedin_navbar")
                    }
                  >
                    Switch to Selling
                  </Link>
                </Nav.Link>
              )}
              {auth?.user?.role === "buyer" && (
                <Nav.Link>
                  <Link
                    to="/users/dashboard"
                    className={styles.navTypoOnScroll}
                  >
                    Dashboard
                  </Link>
                </Nav.Link>
              )}

              <DropdownNav />
              {auth?.user?.role === "seller" && (
                <Nav.Link>
                  <div className="newamount">
                    <span>${auth?.user?.totalEarning}</span>
                  </div>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          <hr />
        </Container>
      </Navbar>
    </>
  );
}
