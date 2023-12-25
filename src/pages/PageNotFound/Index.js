import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import './styles/style.scss';
import notFoundImg from '../../images/pagenotfound.png';
import { Link } from 'react-router-dom';

export default function PageNotFound({ title, subtitle }) {
  return (
    <div className="pageNotFound">
      <Container>
        <Row>
          <Col md={3}>
            <div className="notfoundcontent">
              <h1>Error 404</h1>
              <p>{title}</p>
              <span>{subtitle} </span>
              <div className="goBack_btn_container">
                <Link to="/" className="goBack_btn">
                  Go Back
                </Link>
              </div>
            </div>
          </Col>
          <Col md={9}>
            <div className="image_container">
              <img src={notFoundImg} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

PageNotFound.defaultProps = {
  title: 'Page Not Found',
};
