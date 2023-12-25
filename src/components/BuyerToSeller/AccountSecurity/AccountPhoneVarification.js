import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "../LinkedAccount/styles.module.css";
import "../LinkedAccount/style.scss";
import ReactCodeInput from "react-verification-code-input";
import { useFormik } from "formik";
import {
  getProfileInfoStep,
  phoneNumberVerification,
} from "../../../redux/Profile/Profile.action";
import { useDispatch, useSelector } from "react-redux";
import "./styles/AccountSecurity.css";

const validate = (values) => {
  const errors = {};

  if (!values.otp) {
    errors.otp = "Required";
  }

  return errors;
};

function AccountPhoneVarification() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileInfoStep("phone_verification"));
  }, [dispatch]);

  const profile = useSelector((state) => state.profile);

  const actionSuccess = () => {
    dispatch(getProfileInfoStep("phone_verification"));
  };

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validate,

    onSubmit: (values) => {
      dispatch(phoneNumberVerification(values, actionSuccess));
      //    setTimeout(() => {
      //      alert(JSON.stringify(values, null, 2));
      //     //  setSubmitting(false);
      //    }, 400);
      // setSubmitting(false);
    },
  });

  const [newVal, setNewVal] = useState();

  const handleClick = (value) => {
    setNewVal(value);
    formik.setFieldValue("otp", value);
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <Container className="text-center">
        <h4 className={styles.titleAccount}>Verify Phone Number</h4>
        <p className={styles.subTitleAccount}>
          A verification code has been sent to:
        </p>
        <div>
          {profile?.data?.phone_data?.dial_code} -{" "}
          {profile?.data?.phone_data?.phone_number}
          {/* <Nav.Link href="/home">Edit</Nav.Link> */}
        </div>
        <p>Please enter the Verification code</p>
        <div className="optCodeBox">
          <input type="hidden" name="otp" />
          <ReactCodeInput
            className="otpCode"
            type="number"
            fields={6}
            autoFocus={true}
            values={newVal}
            onChange={handleClick}
          />
        </div>

        <Row className="pt-5 pb-4">
          <Col className="pr-1">
            <Button className={styles.formAccountButtons} type="submit">
              Submit Code
            </Button>
          </Col>
        </Row>
        <p className={styles.subFooterAccount}>
          Your phone number will remain private and will not be shared or used
          for marketing purposes.Privacy Policy
        </p>
      </Container>
    </form>
  );
}

export default AccountPhoneVarification;
