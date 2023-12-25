import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import GigBreadCrumb from '../../../../components/Gig/BreadCrumb/BreadCrumb';
import GigGalleryAdd from "../../../../components/Gig/GigGalleryForm/GigGallery";

import Styles from "./Gig.module.css";

function GigsGallery() {
    return (
      <>
        <GigBreadCrumb />
        <div className={Styles.gallery}>
          <Container>
            <Row>
              <Col sm={{ offset: 1, span: 8 }}>
                <GigGalleryAdd />
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
}

export default GigsGallery;