import React, { useEffect, useState } from "react";
import { Field } from "formik";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "../../common/form/useForm";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addPersonalInfo,
  getCountryDial,
} from "../../../redux/Profile/Profile.action";
import styles from "../LinkedAccount/styles.module.css";
import "../LinkedAccount/style.css";
import { openModal } from "../../../redux/Modal/Modal.action";
import Select from "react-select";
import { ErrorMessage } from "formik";
import { serialize } from "object-to-formdata";
import "./styles/AccountSecurity.scss";

function AccountSecurityForm() {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile);
  const [country, setCountry] = useState();
  const [dialCode, setDialCode] = useState();

  useEffect(() => {
    dispatch(getCountryDial());
  }, [dispatch]);

  const showVerification = () => {
    dispatch(openModal("phoneVerification"));
  };

  const countryList = profile?.dialCode.map((item) => ({
    value: item.dial_code,
    label: item.title,
  }));

  let initialValues = {
    step: "phone_verification",
    dial_code: dialCode || countryList[0]?.value,
    phone_number: "",
  };
  const validationSchema = yup.object({
    phone_number: yup.string().required("Phone Number is Required"),
  });
  const onSubmit = (values, e) => {
    const serializeOptions = {
      indices: true,
      allowEmptyArrays: false,
    };
    dispatch(
      addPersonalInfo(serialize(values, serializeOptions), showVerification)
    );
  };

  const handleChange = (e, form) => {
    setCountry(e);
    setDialCode(e.value);
    form.setFieldValue("dial_code", e.value);
  };

  const { CustomPhoneNumber, CustomForm } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <CustomForm>
      <Container>
        <h4 className={styles.titleAccount}>Verify Phone Number</h4>
        <p className={styles.subTitleAccount}>
          Thank you for taking a moment to verify your phone number. Learn more
        </p>

        <div className="pb-2">
          <Form.Group controlId="formBasicEmail">
            <Form.Label className={`${styles.formLevelAccount}`}>
              Enter Country
            </Form.Label>
            <Field
              component={CustomSelect}
              name="country"
              options={countryList}
              handleChange={handleChange}
              value={country || countryList[0]}
            />
          </Form.Group>
        </div>
        <div className="pt-4">
          <Form.Group controlId="country">
            <Form.Label className={styles.formLevelAccount}>
              Enter your Phone Number
            </Form.Label>
            <div>
              <div className={styles.inputFieldPhone}>
                <input
                  disabled
                  className={styles.countryCode}
                  value={dialCode || countryList[0]?.value}
                />
                <CustomPhoneNumber
                  name="phone_number"
                  className={styles.inputPhone}
                />
              </div>
              <ErrorMessage
                name="phone_number"
                render={(msg) => <span className="error-message">{msg}</span>}
              />
            </div>
          </Form.Group>
        </div>
        <Row className="pt-5 pb-4">
          <Col className="pr-1">
            <Button className={styles.formAccountButtons} type="submit">
              Verify By SMS
            </Button>
          </Col>
        </Row>
        <p className={styles.subFooterAccount}>
          Your phone number will remain private and will not be shared or used
          for marketing purposes.Privacy Policy
        </p>
      </Container>
    </CustomForm>
  );
}

export default AccountSecurityForm;

const CustomSelect = ({
  name,
  language,
  options,
  value,
  handleChange,
  form,
}) => {
  return (
    <>
      <Select
        className="selectAccountSecurity"
        name={name}
        options={options}
        value={value}
        onChange={(e) => handleChange(e, form)}
      />
    </>
  );
};
