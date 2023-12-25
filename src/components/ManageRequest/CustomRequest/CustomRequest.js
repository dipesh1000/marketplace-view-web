import React from "react";
import "./style/style.scss";
import { useForm } from "../../../components/common/form/useForm";
import { Field } from "formik";
import FileUpload from "./FileUpload";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import Category from "./Category";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategory } from "../../Gig/GigOverviewForm/redux/Action";
import Duration from "./Duration";
import validationSchema from "./CustomRequestValidation";
import { customRequest } from "../redux/Action";
import { serialize } from "object-to-formdata";
import { useHistory } from "react-router-dom";
import useTitle from "../../../utils/useTitle";

function CustomRequest() {
  const options = [{ value: "design" }, { value: "new Design" }];

  const dispatch = useDispatch();
  useTitle("Request a Custom Order | Fuchas");
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const initialValues = {
    description: "",
    files: [],
    delivery_time: "",
    budget: "",
    category: "",
    status: "active",
  };

  const history = useHistory();
  const handleHistory = () => {
    history.push("/users/manage_requests");
  };
  const onSubmit = (values) => {
    const options = {
      indices: true,
    };
    const formData = serialize(
      values,
      options // optional
    );
    dispatch(customRequest(formData, handleHistory));
  };
  const { category, serviceType } = useSelector((state) => state.gigOverview);

  const { CustomForm, CustomInput, CustomUpload, CustomTextarea } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Max 1GB Upto 5 Files
    </Tooltip>
  );

  return (
    <div className="custom-request-container">
      <CustomForm>
        <div className="title">
          Describe the service you're looking to purchase - please be as
          detailed as possible:
        </div>
        <div className="textarea-wrapper">
          <CustomTextarea
            maxLength="2500"
            counter
            max="2500"
            className="custom-text"
            name="description"
            placeholder="I'm looking for..."
          />
        </div>
        <Field component={FileUpload} CustomUpload={CustomUpload} />
        <Field
          component={Category}
          serviceType={serviceType}
          options={options}
          category={category}
        />
        <Field component={Duration} />
        {/* <ErrorMessage
					name='delivery_time'
					render={msg => <span className='error-message'>{msg}</span>}
				/> */}
        <div className="amount-wrapper">
          <div className="title">What is your budget for this service?</div>
          <Row>
            <Col sm={3}>
              <CustomInput name="budget" placeholder="$" />
            </Col>
          </Row>
        </div>
        <div className="button-wrapper">
          <OverlayTrigger
            placement="top"
            delay={{ show: 100, hide: 100 }}
            overlay={renderTooltip}
          >
            <button type="submit">Submit Request</button>
          </OverlayTrigger>
        </div>
      </CustomForm>
    </div>
  );
}

export default CustomRequest;
