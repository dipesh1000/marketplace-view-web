import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Logo from "../../../images/logo_d.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useRouteMatch } from "react-router-dom";

function NavigationBar() {
  const { url } = useRouteMatch();

  const handleActive = (path) => {
    if (url.includes("/checkout/submitrequirements")) {
      return "active";
    } else if (url.includes("/checkout/payments/")) {
      if (path === "/checkout/payments/") return "active";
      if (path === "/checkout/customize") return "active";
    }

    if (url.includes("/checkout/customize")) {
      if (path === "/checkout/customize") return "active";
    }
  };
  return (
    <div>
      <Navbar bg="white">
        <div className="orderHeaderRow">
          <Container>
            <Navbar.Brand href="/">
              <img src={Logo} width="100px" />
            </Navbar.Brand>
            <Nav className="mr-auto steps">
              <Nav.Link className={handleActive("/checkout/customize")}>
                <span className="stepLevel">1</span>
                <span className="stepText">Order Details</span>
              </Nav.Link>
              <span className="stepArrow">
                <MdKeyboardArrowRight />
              </span>
              <Nav.Link className={handleActive("/checkout/payments/")}>
                <span className="stepLevel">2</span>
                <span className="stepText">Confirm & Pay</span>
              </Nav.Link>
              <span className="stepArrow">
                <MdKeyboardArrowRight />
              </span>
              <Nav.Link
                className={handleActive("/checkout/submitrequirements")}
              >
                <span className="stepLevel">3</span>
                <span className="stepText">Submit Requirements</span>
              </Nav.Link>
            </Nav>
          </Container>
        </div>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
