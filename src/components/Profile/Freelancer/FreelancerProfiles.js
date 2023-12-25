import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import FreelancerLeftContainer from "./FreelancerLeftContainer";
import FreelancerMainContainer from "./FreelancerMainContainer";
import { fetchFreelancerInfo } from "./redux/Action";
import "./styles/FreelancerProfile.scss";
import useTitle from "../../../utils/useTitle";

function FreelancerProfiles() {
  const { user } = useParams();
  useTitle(`${user} | Fuchas`);
  const dispatch = useDispatch();
  const { data, review, filterData, isLoading, reviewLoading } = useSelector(
    (state) => state.freelancer
  );
  const { user: userRole } = useSelector((state) => state.auth);
  useEffect(() => {
    userRole?.role === "seller" && dispatch(fetchFreelancerInfo(user));
    // eslint-disable-next-line
  }, [userRole, user, dispatch]);

  return (
    <>
      <div className="freelancerProfile-layout">
        <Container>
          <Row>
            <Col md={4}>
              <FreelancerLeftContainer data={data} />
            </Col>
            <Col md={8}>
              <FreelancerMainContainer
                data={data}
                review={review}
                filterData={filterData}
                reviewLoading={reviewLoading}
                isLoading={isLoading}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default FreelancerProfiles;
