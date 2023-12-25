import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleOrderBuyer } from "../redux/Action";
import MainContainerBuyer from "./MainContainerBuyer";
import OrderBread from "./OrderBread";
import SideBar from "./SideBar";
import "../styles/Styles.scss";
import { useState } from "react";
import moment from "moment";
import ContainerSpinner from "../../common/ContainerSpinner/ContainerSpinner";

function SingleOrderBuyer() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [reload, setReload] = useState(false);
  // eslint-disable-next-line
  const handleReload = () => {
    setReload((prev) => !prev);
  };

  useEffect(() => {
    dispatch(fetchSingleOrderBuyer(orderId));
    // eslint-disable-next-line
  }, [reload, orderId]);
  const { singleOrder, loading } = useSelector((state) => state.sellerOrders);

  const [singleArray, setSingleArray] = useState();
  const handleSorting = () => {
    const newDeliveries = singleOrder?.deliveries?.map((item) => ({
      ...item,
      datatype: "delivery",
    }));
    const newRevision = singleOrder?.request_revisions?.map((item) => ({
      ...item,
      datatype: "revision",
    }));
    const newMessages = singleOrder?.messages?.map((item) => ({
      ...item,
      datatype: "message",
    }));
    const newResolution = singleOrder?.resolution_data?.map((item) => ({
      ...item,
      datatype: "resolution",
    }));
    const newResolutionInfo = singleOrder?.resolution_data?.map((item) => ({
      ...item,
      datatype: "resolution_info",
      created_at: item?.approved_at || item?.rejected_at,
    }));
    const orderArray = [
      ...newDeliveries,
      ...newMessages,
      ...newResolution,
      ...newResolutionInfo,
      ...newRevision,
    ];
    setSingleArray(
      orderArray.sort((a, b) => {
        return moment(a.created_at).diff(b.created_at);
      })
    );
  };
  useEffect(() => {
    singleOrder && handleSorting();
    // eslint-disable-next-line
  }, [singleOrder]);

  return loading ? (
    <ContainerSpinner />
  ) : (
    <div className="SingleOrderWrapper">
      <OrderBread
        status={singleOrder?.orders?.status}
        resolution={singleOrder?.resolution_data}
      />
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 1 }}>
            <MainContainerBuyer
              singleOrder={singleOrder}
              orderId={orderId}
              singleArray={singleArray}
            />
          </Col>
          <Col>
            <SideBar md={3} orderId={orderId} singleOrder={singleOrder} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SingleOrderBuyer;
