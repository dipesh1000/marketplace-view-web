import React from "react";
import { Field } from "formik";
import styles from "../../../pages/Dashboard/SellerForm/StepsFrom/styles.module.css";
import { Col, Row } from "react-bootstrap";
import "../../../pages/Dashboard/SellerForm/StepsFrom/imageStyle.css";
import { useForm } from "../../common/form/useForm";
import ImageField from "../../../components/Input/ImageField/ImageField";
import Repeater from "../../../components/Repeater/Repeater";
import { useSelector } from "react-redux";
import Select from "react-select";
import { ErrorMessage } from "formik";
import ButtonSpinner from "../../common/ButtonSpinner/ButtonSpinner";
import FocusError from "../../../utils/FocusError";

function PersonalInfoForm({
  initialValue,
  validationSchema,
  onSubmit,
  postLoading,
}) {
  const lang = useSelector((state) => state.lang);

  const countryList = useSelector((state) => state.countryList);

  const allCountryList = countryList?.data?.map((item) => ({
    id: item.code,
    value: item.title,
  }));

  const handleChange = (form, e) => {
    form.setFieldValue("country", e.value);
  };

  const { CustomForm, CustomInput, CustomTextarea } = useForm({
    initialValues: initialValue,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <div className={styles.FormInnerContainer}>
        <h2>Personal Info</h2>
        <p>
          Tell us a bit about yourself. This information will appear on your
          public profile, so that potential buyers can get to know you better.
        </p>
        <i className="text-right">* Mandatory fields</i>
        <hr className="mt-0" />

        <CustomForm>
          {/* <input type="hidden" name="step" value={values.step} name="hiddenField" /> */}
          <Row className="align-items-center pb-5">
            <Col md={4}>
              <span className={styles.formLevels}>
                Full Name <b>*</b>
              </span>
              <small>
                <i className="d-inline-block">Private</i>
              </small>
            </Col>
            <Col md={3}>
              <CustomInput
                name="first_name"
                placeholder="First Name"
                label="First Name"
              />
            </Col>
            <Col md={3}>
              <CustomInput
                name="last_name"
                placeholder="Last Name"
                label="Last Name"
              />
            </Col>
          </Row>

          <Row className="align-items-center pt-5 pb-5">
            <Col md={4}>
              <span className={styles.formLevels}>
                Profile Picture <b>*</b>
              </span>
              <p className={`${styles.formSubLevels} w-100 pr-2`}>
                Add a profile picture of yourself so customers will know exactly
                who they’ll be working with.
              </p>
            </Col>
            <Col md={3}>
              <div className="form__img-input-container">
                <Field name="profile_image" component={ImageField} />
                <ErrorMessage
                  name="profile_image"
                  render={(msg) => <span className="error-message">{msg}</span>}
                />
              </div>
            </Col>
          </Row>

          <Row className="align-items-center pt-5 pb-5">
            <Col md={4}>
              <span className={styles.formLevels}>
                Country <b>*</b>
              </span>
              <p className={`${styles.formSubLevels} w-100 pr-2`}>
                Add your country of residance
              </p>
            </Col>
            <Col md={6}>
              <Field
                name="country"
                component={CustomSelect}
                className={styles.select}
                handleChange={handleChange}
                options={allCountryList}
              />
              <ErrorMessage
                name="country"
                render={(msg) => <span className="error-message">{msg}</span>}
              />
            </Col>
          </Row>

          <Row className="pt-5 pb-5">
            <Col md={4}>
              <span className={styles.formLevels}>
                Description <b>*</b>
              </span>
            </Col>
            <Col md={8}>
              <CustomTextarea
                limit={600}
                name="description"
                rows={4}
                placeholder="Share a bit about your work experience, cool projects you’ve completed, and your area of expertise."
              />
            </Col>
          </Row>
          <Row className="pt-5 pb-5">
            <Col md={4}>
              <span className={styles.formLevels}>
                Languages <b>*</b>
              </span>
            </Col>
            <Col md={8}>
              <Field component={Repeater} name="language" lang={lang} />
              <input type="hidden" name="language" />
            </Col>
          </Row>

          <button type="submit" className={styles.formSubmit}>
            {postLoading && <ButtonSpinner />}Continue
          </button>
          <FocusError />
        </CustomForm>
      </div>
    </>
  );
}

export default PersonalInfoForm;

const CustomSelect = ({ name, handleChange, options, form }) => {
  return (
    <>
      <Select
        name={name}
        placeholder="Select a country"
        options={options.map((country) => ({
          value: country.value,
          label: country.value,
        }))}
        value={
          form.values.country
            ? { value: form.values.country, label: form.values.country }
            : null
        }
        onChange={(e) => handleChange(form, e)}
      />
    </>
  );
};
