import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import ConfirmFooter from "./ConfirmFooter";
import MainContent from "./MainContent";
import SideBar from "./SideBar";
import "./styles/ConfirmPay.scss";
import { FaCheck } from "react-icons/fa";
import { IoIosPin } from "react-icons/io";
import { fetchModifiedOrder } from "../../redux/Action";

function ResolutionConfirmPay() {
  const location = useLocation();
  const { orderId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchModifiedOrder(location?.state?.id));
    // eslint-disable-next-line
  }, [dispatch]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStatus = () => {
    setIsSubmitting((prev) => !prev);
  };
  const { modifyOrder } = useSelector((state) => state.sellerOrders);

  return (
    <>
      <div className="OrderBreadWrapper">
        <Container>
          <Row>
            <Col md={{ span: 8, offset: 1 }}>
              <div className="OrderBread">
                <div className="bread-menu">
                  <>
                    <div className="bread-item active">
                      <span>
                        <FaCheck />
                      </span>
                      <p>Buyer Submitted Information</p>
                    </div>
                    <div className="bread-item warning">
                      <span>
                        <IoIosPin />
                      </span>
                      <p>Order in progress delivery soon</p>
                    </div>
                  </>
                </div>
                <div className="delivery-btn">
                  <span>Confirm & Pay for Modified Order</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="ConfirmPayWrapper">
        <Container>
          <Row>
            <Col md={7}>
              <MainContent
                orderId={orderId}
                slug={modifyOrder?.options?.gig?.slug}
                handleStatus={handleStatus}
                isSubmitting={isSubmitting}
                resolution_id={location?.state?.id}
              />
            </Col>
            <Col md={5}>
              <SideBar
                orderData={modifyOrder?.options}
                isSubmitting={isSubmitting}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <ConfirmFooter />
    </>
  );
}

export default ResolutionConfirmPay;
