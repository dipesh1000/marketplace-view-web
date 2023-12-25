import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import GigBreadCrumb from "../../../../components/Gig/BreadCrumb/BreadCrumb";
import GigPublishAdd from "../../../../components/Gig/GigPublishForm/GigPublish";

import Styles from "./Gig.module.css";

function GigsPublish() {
  return (
    <>
      <GigBreadCrumb />
      <div className={Styles.publish}>
        <Container>
          <Row>
            <Col sm={{ offset: 1, span: 8 }}>
              <GigPublishAdd />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default GigsPublish;
