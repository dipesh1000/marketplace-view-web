import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import LeftContainer from "./LeftContainer";
import MainContainer from "./MainContainer";
import "./styles/Profile.scss";

function Profile() {
  return (
    <>
      <div className="profile-layout">
        <Container>
          <Row>
            <Col md={4}>
              <LeftContainer />
            </Col>
            <Col md={8}>
              <MainContainer />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Profile;
