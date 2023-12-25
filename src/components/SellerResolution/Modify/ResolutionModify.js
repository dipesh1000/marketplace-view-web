import React, { useEffect } from "react";
import { useForm } from "../../common/form/useForm";
import { Col, Row, Container } from "react-bootstrap";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import * as yup from "yup";
import "./style/style.scss";
import SideBar from "./SideBar";
import ExtraServiceItem from "./ExtraServiceItem";
import { Field } from "formik";
import ExtraHidden from "./ExtraHidden";
import { useDispatch, useSelector } from "react-redux";
import { fetchResolution, submitResolution } from "../redux/Action";
import Navigation from "../Navigation/Navigation";
import Expected from "./Expected";
import ButtonSpinner from "../../common/ButtonSpinner/ButtonSpinner";

function ResolutionModify() {
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
    extra_services: [],
    custom_extra_services: [],
    message: "",
    other_message: location?.state?.other_message,
    resolution_id: location?.state?.id,
    type: location?.state?.type,
  };

  const validationSchema = yup.object({
    message: yup.string().required("Please fill the required fields"),
    // custom_extra_services: yup.array().when('checkExtra',{
    //   is: (val) => val === 1,
    //   then: yup.object().shape({
    //     title: yup.string().required(),
    //     extra_value: yup.string().required(),
    //     extra_price: yup.string().required()
    //   }),
    //   otherwise: yup.array().nullable()
    // }),
    custom_extra_services: yup.array().of(
      yup.object().shape({
        checkExtra: yup.boolean(),
        title: yup.string().when("checkExtra", {
          is: (val) => val === true,
          then: yup.string().required("Please add the title"),
          otherwise: yup.string().nullable(),
        }),
        extra_value: yup.string().when("checkExtra", {
          is: (val) => val === true,
          then: yup.string().required("Please add extra number of days"),
          otherwise: yup.string().nullable(),
        }),
        extra_price: yup.string().when("checkExtra", {
          is: (val) => val === true,
          then: yup.string().required("Please add extra price"),
          otherwise: yup.string().nullable(),
        }),
      })
    ),
    extra_services: yup.array().when("custom_extra_services", {
      is: (val) => val?.length === 0,
      then: yup.array().min(1, "Please Select One Modification"),
      otherwise: yup.array().nullable(),
    }),
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
                <div className="resolution-header">Modify Your Order</div>
                <div className="resolution-header-sub">
                  You can modify your order to accommodate your buyer.
                </div>
                <div className="extend-container">
                  <div className="question">
                    Select what you would like to add to your order
                  </div>
                  {resolutions?.extra_services?.map((item, index) => (
                    <Field
                      component={ExtraServiceItem}
                      key={item.id}
                      item={item}
                      index={index}
                    />
                  ))}

                  <Field
                    component={ExtraHidden}
                    extra_services={resolutions?.extra_services}
                    CustomTextarea={CustomTextarea}
                  />
                  <Field
                    component={Expected}
                    items={resolutions?.extra_services}
                  />
                  <div className="question">
                    Explain why would you like to modify your order.
                  </div>
                  <CustomTextarea
                    rows={4}
                    placeholder="Type your message here"
                    maxLength="2500"
                    counter
                    max="2500"
                    maxText="max"
                    name="message"
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

export default ResolutionModify;
