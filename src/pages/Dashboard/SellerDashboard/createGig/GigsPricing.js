import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import GigBreadCrumb from '../../../../components/Gig/BreadCrumb/BreadCrumb';
import GigPricingAdd from "../../../../components/Gig/GigPricingForm/GigPricing";

import Styles from "./Gig.module.css";

function GigsPricing() {
    return (
      <>
        <GigBreadCrumb />

        <div className={Styles.pricing}>
          <Container>
            <Row>
              <Col sm={{ offset: 1, span: 8 }}>
                <GigPricingAdd />
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
}

export default GigsPricing;