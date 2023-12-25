import React, { useEffect } from "react";
import { useForm } from "../../common/form/useForm";
import { Col, Row, Container } from "react-bootstrap";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import * as yup from "yup";
import "./style/style.scss";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchResolution, submitResolution } from "../redux/Action";
import Navigation from "../Navigation/Navigation";
import ButtonSpinner from "../../common/ButtonSpinner/ButtonSpinner";

function ResolutionCancel() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    orderId && dispatch(fetchResolution(orderId));
    // eslint-disable-next-line
  }, [dispatch]);

  const { resolutions, postLoading } = useSelector((state) => state.resolution);

  const initialValues = {
    message: "",
    resolution_id: location?.state?.id,
    type: location?.state?.type,
    other_message: location?.state?.other_message,
  };

  const validationSchema = yup.object({
    message: yup.string().required("Message Field is required"),
  });

  const handleHistory = () => {
    history.push(`/users/seller_dashboard/singleorders/${orderId}`);
  };

  const onSubmit = (values) => {
    dispatch(submitResolution(orderId, values, handleHistory));
  };

  const handleBack = () => {
    history.goBack();
  };

  const { CustomTextarea, CustomForm } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <>
      <Navigation orderId={orderId} />
      <div className="resolution-wrapper">
        <CustomForm>
          <Container>
            <Row>
              <Col md={{ span: 7, offset: 1 }}>
                <div className="resolution-header">Cancel Order</div>
                <div className="resolution-header-sub">
                  You can ask buyer to cancel the order.
                </div>
                <div className="cancel-container">
                  <div className="question">
                    Explain to the buyer why would you like to cancel the order.
                  </div>
                  <CustomTextarea
                    name="message"
                    rows={4}
                    placeholder="Type your message here"
                    maxLength="2500"
                    counter
                    max="2500"
                    maxText="max"
                  />
                  <div className="question">
                    Cancelling the order might affect you in the following ways.
                  </div>
                  <ul>
                    <li>
                      <div className="icon">
                        <i className="fas fa-columns"></i>
                      </div>
                      <div>
                        <div className="title">Loss of revenue</div>
                        <div className="description">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <i className="fas fa-chart-line"></i>
                      </div>
                      <div>
                        <div className="title">
                          Weaken order Completion Rate
                        </div>
                        <div className="description">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Id accusantiumId accusantium lor sit amet
                          consectetur adipisicing elit. Id accusantium
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <i className="fas fa-dollar-sign"></i>
                      </div>
                      <div>
                        <div className="title">
                          Listing placement could change
                        </div>
                        <div className="description">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Id accusantium
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="resolution-footer">
                  <div className="footer-title">
                    Couldn't find what you need? Contact our
                    <Link to="/"> Customer Support </Link>
                  </div>
                  <span className="back" onClick={handleBack}>
                    Back
                  </span>
                  <div className="continue-btn">
                    <button>
                      {" "}
                      {postLoading ? <ButtonSpinner /> : ""} Continue
                    </button>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <SideBar orderData={resolutions?.order} />
              </Col>
            </Row>
          </Container>
        </CustomForm>
      </div>
    </>
  );
}

export default ResolutionCancel;
