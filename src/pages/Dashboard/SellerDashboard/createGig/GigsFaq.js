import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import GigBreadCrumb from '../../../../components/Gig/BreadCrumb/BreadCrumb';
import GIGFaq from '../../../../components/Gig/GigFAQ/GIGFaq';

import Styles from "./Gig.module.css";

function GigsFaq() {
    return (
      <>
        <GigBreadCrumb />
        <div className={Styles.faq}>
          <Container>
            <Row>
              <Col sm={{ offset: 1, span: 8 }}>
                <GIGFaq />
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
}

export default GigsFaq;