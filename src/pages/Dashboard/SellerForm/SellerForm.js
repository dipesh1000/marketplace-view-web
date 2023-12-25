import React from "react";
import Footer from "../../../components/Footer/Footer";
import Logo from "../../../images/logo_d.png";
import { Container, Navbar } from "react-bootstrap";
import styles from "./SellerForm.module.css";
import { Link, Switch } from "react-router-dom";
import RouteWithSubRoutes from "../../../navigation/RouteWithSubRoutes";

function SellerForm({ routes }) {
  return (
    <>
      <div className={styles.stepForm}>
        <Navbar>
          <Navbar.Brand>
            <Link to="/">
              <img src={Logo} alt="Fucha Logo" width="90px" />
            </Link>
          </Navbar.Brand>
        </Navbar>
      </div>
      {/* <StepsNav /> */}
      <Container>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </Container>

      <Footer />
    </>
  );
}

export default SellerForm;
