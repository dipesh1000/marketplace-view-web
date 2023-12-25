import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import GigBreadCrumb from "../../../../components/Gig/BreadCrumb/BreadCrumb";
import GigPublishComplete from "../../../../components/Gig/GigPublishForm/GigPublishComplete";

import Styles from "./Gig.module.css";

function GigsPublishDone() {
  return (
    <>
      <GigBreadCrumb />
      <div className={Styles.publish}>
        <Container>
          <Row>
            <Col sm={{ offset: 1, span: 8 }}>
              <GigPublishComplete />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default GigsPublishDone;
