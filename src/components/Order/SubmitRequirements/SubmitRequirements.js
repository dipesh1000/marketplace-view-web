import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import OrderLayout from "../OrderLayout";
import "./styles/Styles.scss";
import SideBar from "./SideBar";
import MainContent from "./MainContent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderByCode, getOrderRequirement } from "../redux/action";
function SubmitRequirements({ location }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByCode(location?.state?.orderId));
    dispatch(getOrderRequirement(location?.state?.slug));
    // eslint-disable-next-line
  }, [dispatch]);

  const { orderData, orderRequirement } = useSelector(
    (state) => state.checkout
  );
  return (
    <>
      <OrderLayout>
        <div className="SubmitRequirementsWrapper">
          <Container>
            <Row>
              <Col md={8}>
                <MainContent
                  orderRequirement={orderRequirement}
                  orderId={location?.state?.orderId}
                />
              </Col>
              <Col md={4}>
                <SideBar orderData={orderData} />
              </Col>
            </Row>
          </Container>
        </div>
      </OrderLayout>
    </>
  );
}
export default SubmitRequirements;
