import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import HomeLayout from "../../../layout/homeLayout/HomeLayout";
import CustomRequestComponent from "../../../components/ManageRequest/CustomRequest/CustomRequest";
import "./style.css";

function CustomRequest() {
  return (
    <HomeLayout>
      <div className="custom-request-page">
        <Container>
        <div className="page-title">What Service Are You Looking For?</div>
          <Row>
            <Col sm={7}>
              <CustomRequestComponent />
            </Col>
          </Row>
        </Container>
      </div>
    </HomeLayout>
  );
}

export default CustomRequest;
