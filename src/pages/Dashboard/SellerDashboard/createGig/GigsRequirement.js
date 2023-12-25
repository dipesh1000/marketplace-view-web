import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import GigBreadCrumb from '../../../../components/Gig/BreadCrumb/BreadCrumb';
import GigRequirementAdd from "../../../../components/Gig/GigRequirementForm/GigRequirement";

import Styles from "./Gig.module.css";

function GigsRequirement() {
    return (
      <>
        <GigBreadCrumb />
        <div className={Styles.requirement}>
          <Container>
            <Row>
              <Col sm={{ offset: 1, span: 8 }}>
                <GigRequirementAdd />
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
}

export default GigsRequirement;