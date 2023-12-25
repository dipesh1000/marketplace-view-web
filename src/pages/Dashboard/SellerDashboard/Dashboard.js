import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  fetchOrders,
  fetchOrderStatus,
} from "../../../components/OrderList/redux/Action";
import MainArea from "../../../components/sellerDashboard/MainArea";
import { getSellerDashboard } from "../../../components/sellerDashboard/redux/Action";
import Sidebar from "../../../components/sellerDashboard/Sidebar";
import useTitle from "../../../utils/useTitle";

function SellerDashboard() {
  const dispatch = useDispatch();
  useTitle("Fuchas - Dashboard");

  useEffect(() => {
    dispatch(fetchOrders("active"));
    dispatch(fetchOrderStatus());
    dispatch(getSellerDashboard());
  }, [dispatch]);

  return (
    <>
      <Container fluid>
        <Row noGutters={true}>
          <Col sm={3}>
            <Sidebar />
          </Col>
          <Col sm={9}>
            <MainArea />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SellerDashboard;
