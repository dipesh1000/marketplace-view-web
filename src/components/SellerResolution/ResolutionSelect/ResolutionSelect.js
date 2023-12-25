import React, { useEffect } from "react";
import { Col, Row, Container, Form, Modal } from "react-bootstrap";
import "./style/style.scss";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrderSeller, fetchResolution } from "../redux/Action";
import { useState } from "react";
import { useRef } from "react";
import { GoAlert } from "react-icons/go";
import Navigation from "../Navigation/Navigation";
import ContainerSpinner from "../../common/ContainerSpinner/ContainerSpinner";
import ResolutionComplete from "../../ResolutionComplete/ResolutionComplete";

function ResolutionSelect() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation();
  const otherMessage = useRef(null);
  const [error, setError] = useState();
  const { resolutions, isLoading } = useSelector((state) => state.resolution);
  const [child, setChild] = useState();
  const [optionType, setOptionType] = useState();
  const [show, setShow] = useState();
  const [optionSelect, setOptionSelect] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    orderId && dispatch(fetchResolution(orderId));
    // eslint-disable-next-line
  }, [dispatch]);

  const handleClose = () => setShowModal(false);

  const handleShow = () => {
    setShowModal(true);
  };

  const handleHistory = () => {
    history.push(`/users/seller_dashboard/singleorders/${orderId}`);
  };

  const handleCancelOrder = () => {
    setShowModal(false);
    dispatch(cancelOrderSeller(orderId, handleHistory));
    history.push(`/users/seller_dashboard/singleorders/${orderId}`);
  };

  const handleOption = (data) => {
    setOptionType(data);
    setOptionSelect();
    setShow(false);
    resolutions?.options?.map(
      (item) => item.type === data && setChild(item?.childs)
    );
  };

  const handleSelection = (id, title) => {
    if (title.toLowerCase().trim() === "other") {
      setShow(true);
    } else {
      setShow(false);
    }
    setOptionSelect(id);
    setError();
  };

  const handleRoute = () => {
    let pathname;
    switch (true) {
      case optionSelect !== null &&
        show !== false &&
        otherMessage?.current?.value === "":
        setError("Please fill the required fields");
        break;

      case optionType === "seller_modify_order" && optionSelect !== null:
        pathname = `/users/seller_dashboard/resolution/modify/${orderId}`;
        break;

      case optionType === "seller_extended_delivery_time" &&
        optionSelect !== null:
        pathname = `/users/seller_dashboard/resolution/extend/${orderId}`;
        break;

      case optionType === "seller_cancel_order" && optionSelect !== null:
        pathname = `/users/seller_dashboard/resolution/cancel/${orderId}`;
        break;

      case optionSelect == null:
        setError("Please fill the required fields");
        break;

      default:
        setError("Something Went Wrong");
    }
    history.push({
      pathname: pathname,
      state: {
        id: optionSelect,
        type: optionType,
        other_message: otherMessage?.current?.value || "",
      },
    });
  };

  return (
    <>
      <Navigation orderId={orderId} />
      <div className="resolution-wrapper">
        {isLoading ? (
          <ContainerSpinner />
        ) : (
          <Container>
            {!(
              resolutions?.order?.status === "Complete" ||
              resolutions?.order?.status === "Cancelled"
            ) ? (
              <Row>
                <Col md={{ span: 8, offset: 2 }}>
                  {state?.isCancelled ? (
                    <>
                      <div className="resolution-cancel">
                        <span className="resolution-icon">
                          <GoAlert />
                        </span>
                        <span className="resolution-text">
                          Do you want to cancel your order?
                        </span>
                        <button
                          type="button"
                          className="resolution-button"
                          onClick={handleShow}
                        >
                          Cancel Order
                        </button>
                      </div>
                      <Modal
                        show={showModal}
                        onHide={handleClose}
                        dialogClassName="modalwrapper"
                        className="res-cancel-container"
                      >
                        <div className="cancel-header">
                          Your order will be cancelled. Are you sure you want to
                          continue?
                        </div>
                        {/* <Modal.Body className='modal-body'> */}
                        <div className="cancel-body">
                          <button
                            type="button"
                            className="cancel-button1"
                            onClick={handleClose}
                          >
                            No, thank you
                          </button>
                          <button
                            type="button"
                            className="cancel-button2"
                            onClick={handleCancelOrder}
                          >
                            Cancel Order
                          </button>
                        </div>
                        {/* </Modal.Body> */}
                      </Modal>
                    </>
                  ) : (
                    ""
                  )}

                  <div className="resolution-header">Resolution Center</div>
                  <div className="resolution-header-sub">
                    Welcome! Here you can work things out and resolve issue
                    regarding your orders
                  </div>
                  <div className="center-container">
                    <div className="question">What can we help you do?</div>
                    {resolutions?.options?.map((option) => (
                      <Form.Check
                        type="radio"
                        key={option.id}
                        id={`check-api-${option.id}`}
                      >
                        <Form.Check.Input
                          type="radio"
                          name="options"
                          onClick={() => handleOption(option.type)}
                        />
                        <Form.Check.Label>{option.title}</Form.Check.Label>
                      </Form.Check>
                    ))}

                    <div className="question">
                      Can you give us more detail on why?
                    </div>
                    {child?.map((item) => (
                      <Form.Check
                        type="radio"
                        id={`check-detail-${item.id}`}
                        key={item.id}
                      >
                        <Form.Check.Input
                          type="radio"
                          name="same"
                          onClick={() => handleSelection(item.id, item.title)}
                        />
                        <Form.Check.Label>{item.title}</Form.Check.Label>
                      </Form.Check>
                    ))}
                    {show && (
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                          as="textarea"
                          rows={3}
                          ref={otherMessage}
                        />
                      </Form.Group>
                    )}
                  </div>
                  {error ? (
                    <span className="error-message">{error}</span>
                  ) : null}
                  <div className="resolution-footer">
                    <div className="footer-title">
                      Couldn't find what you need? Contact our
                      <Link
                        to={{
                          pathname: "/support_tickets/new",
                          state: { orderId: orderId },
                        }}
                      >
                        {" "}
                        Customer Support{" "}
                      </Link>
                    </div>
                    <div className="continue-btn">
                      <button onClick={handleRoute}>Continue</button>
                    </div>
                  </div>
                </Col>
              </Row>
            ) : (
              <ResolutionComplete />
            )}
          </Container>
        )}
      </div>
    </>
  );
}

export default ResolutionSelect;
