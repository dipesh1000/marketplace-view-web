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

function ResolutionExtend() {
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
    extended_delivery_day: "",
  };

  const validationSchema = yup.object({
    message: yup.string().required("Please fill the required field"),
    extended_delivery_day: yup
      .number()
      .required("Add Extended Delivery Day")
      .positive("Please Enter a Valid Data")
      .integer("Please Enter a Valid Data"),
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

  const { CustomTextarea, CustomInput, CustomForm } = useForm({
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
                <div className="resolution-header">Extend Delivery Time</div>
                <div className="resolution-header-sub">
                  You can ask buyer to extend the delivery time of this order
                </div>
                <div className="extend-container">
                  <div className="question">
                    Select the Number of Days You would like to add to your
                    delivery time
                  </div>
                  <div className="select-wrapper">
                    <CustomInput name="extended_delivery_day" type="number" />
                    <span>The order should be delivered by Jul 10, 2021.</span>
                    {/* <ErrorMessage name="extended_delivery_day" 
                                        render={msg => <span className="error-message">{msg}</span>}/> */}
                  </div>
                  <div className="question">
                    Explain why would you like to extend your delivery time.
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
                  <div>
                    If you find yourself using this tool for most of your
                    orders, consider changing your original order delivery time.
                  </div>
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

export default ResolutionExtend;
