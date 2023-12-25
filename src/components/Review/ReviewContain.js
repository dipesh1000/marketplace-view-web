import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import Rating from "../Rating/Rating";
import * as yup from "yup";
import { useForm } from "../common/form/useForm";
import { ErrorMessage, Field } from "formik";
import { useDispatch } from "react-redux";
import { buyerReviewSubmit } from "../OrderList/redux/Action";

function ReviewContain() {
  // const [rates, setRates] = useState(0);
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues = {
    communication_rating: 0,
    service_rating: 0,
    recommend_rating: 0,
    message: "",
  };

  const validationSchema = yup.object({
    message: yup.string().required("Message Field is Required"),
    service_rating: yup
      .number()
      .required("Service Rating is Required")
      .min(1, "Service Rating is Required"),
    communication_rating: yup
      .number()
      .required("Communication Rating is Required")
      .min(1, "Communication Rating is Required"),
    recommend_rating: yup
      .number()
      .required("Recommend Rating is Required")
      .min(1, "Recommend Rating is Required"),
  });

  const handleRoute = () => {
    history.push(`/users/dashboard/singleorders/${orderId}`);
  };

  const onSubmit = (values) => {
    dispatch(buyerReviewSubmit(orderId, values, handleRoute));
  };

  const { CustomForm, CustomTextarea } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <CustomForm>
      <div className="contain-wrapper">
        <div className="header_box">
          <h2>Public Feedback</h2>
          <p>
            Share you experience with the community to help them make better
            decision
          </p>
        </div>
        <div className="contain_box">
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="6">
              <h6>Communication with Seller</h6>
              <span>How response was the seller during the process?</span>
            </Form.Label>
            <Col sm="6" className="rating_box">
              <Field component={Rating} name="communication_rating" />
              <ErrorMessage
                name="communication_rating"
                render={(msg) => <span className="error-message">{msg}</span>}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="6">
              <h6>Communication with Seller</h6>
              <span>How response was the seller during the process?</span>
            </Form.Label>
            <Col sm="6" className="rating_box">
              <Field component={Rating} name="service_rating" />
              <ErrorMessage
                name="service_rating"
                render={(msg) => <span className="error-message">{msg}</span>}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="6">
              <h6>Communication with Seller</h6>
              <span>How response was the seller during the process?</span>
            </Form.Label>
            <Col sm="6" className="rating_box">
              <Field component={Rating} name="recommend_rating" />
              <ErrorMessage
                name="recommend_rating"
                render={(msg) => <span className="error-message">{msg}</span>}
              />
            </Col>
          </Form.Group>
          {/* <Form.Group as={Row} className="mb-3 text_area">
                        <Form.Label>
                            <h6>What was it like working with this seller</h6>
                        </Form.Label>
                        <Form.Control as="textarea" rows={4} 
                            placeholder="Why did you buy this Gig? Did the seller help you to achieve goal"
                        />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group> */}
          <CustomTextarea
            name="message"
            rows={4}
            placeholder="Type your message here"
            maxLength="2500"
            counter
            max="2500"
            maxText="max"
          />
          {/* <div className="skill_indors">
                        <h6>Skill Indorsment <span>(Optional)</span></h6>
                        <div className="skill_indors_list">
                            <div className="indors_item">
                                webdevelopment
                            </div>
                            <div className="indors_item">
                                web design
                            </div>
                        </div>
                    </div> */}
          <div className="action_btn_grp">
            <button className="skipBtn">Skip</button>
            <button className="submitBtn" type="submit">
              Send Feedback
            </button>
          </div>
        </div>
      </div>
    </CustomForm>
  );
}

export default ReviewContain;
