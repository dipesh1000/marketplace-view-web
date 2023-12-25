import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Field } from "formik";
import { useForm } from "../../common/form/useForm";
import "../styles/style.scss";
import { useSelector, useDispatch } from "react-redux";
import { postDeactivation } from "../redux/Action";

const AccountDeactivation = () => {
  const [show, setShow] = useState(false);
  const { siteSetting } = useSelector((state) => state?.siteSetting);
  const dispatch = useDispatch();

  let initialValues = {
    status: "Deactive",
    options_id: "",
    reason: "",
  };

  const handleChange = (form, e) => {
    form.setFieldValue("options_id", parseInt(e.target.value));
  };

  const validationSchema = Yup.object({
    options_id: Yup.number().required("Select a reason"),
    reason: Yup.string(),
  });

  const onSubmit = (values, { resetForm }) => {
    dispatch(postDeactivation(values));
    setShow(true);
    resetForm();
  };
  const { CustomTextarea, CustomForm } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <CustomForm>
      <div className="form-rows">
        <div className="label-wrap">
          <label className="uppercase">ACCOUNT DEACTIVATION</label>
        </div>
        <div className="free-text">
          <div className="free-text-caption">
            <label htmlFor="freetext">
              <strong>What happens when you deactivate your account?</strong>
              <ul className="freetext-list">
                <li>
                  Your profile and Gigs won't be shown on Fiverr anymore.{" "}
                  <span
                    className="hint--top"
                    data-hint='People who will try to view your profile or Gigs will get an "Unavailable Page" message.'
                  >
                    <i className="fa fa-question-circle"></i>
                  </span>
                </li>
                <li>
                  Active orders will be cancelled.{" "}
                  <span
                    className="hint--top"
                    data-hint="Not including delivered orders."
                  >
                    <i className="fa fa-question-circle"></i>
                  </span>
                </li>
                <li>You won't be able to re-activate your Gigs.</li>
              </ul>
            </label>
          </div>
        </div>
      </div>
      {!show ? (
        <>
          <div className="form-rows">
            <div className="label-wrap">
              <label>I'm leaving because...</label>
            </div>

            <div className="input-wrap">
              <Field
                name="reason"
                component={CustomSelect}
                className="online-status"
                handleChange={handleChange}
                siteSetting={siteSetting}
              />
            </div>
          </div>
          <Field component={ReasonCheck} CustomTextarea={CustomTextarea} />
        </>
      ) : (
        <>
          <h6>Your account is currently deactivated. Activate your account?</h6>
          <div className="form-button-container">
            <button className={"form-button"} type="submit">
              Activate Account
            </button>
          </div>
        </>
      )}
    </CustomForm>
  );
};

export default AccountDeactivation;

const CustomSelect = ({ handleChange, form, siteSetting }) => {
  return (
    <>
      <select
        name="options_id"
        className="js-dectivation-dropdown"
        onChange={(e) => handleChange(form, e)}
      >
        <option value="">Choose a reason</option>
        {siteSetting?.data?.account_disabled_options?.map((item) =>
          item?.childs?.length ? (
            <optgroup key={item?.id} label={item?.title} value={item?.id}>
              {item?.childs?.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.title}
                </option>
              ))}
            </optgroup>
          ) : (
            <option value={item?.id}>{item?.title}</option>
          )
        )}
      </select>
    </>
  );
};

const ReasonCheck = ({ form, CustomTextarea }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (form.values["options_id"]) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [form.values]);
  return (
    <>
      {show && (
        <div className="form-rows">
          <div className="label-wrap">
            <label className="label">Tell us more (optional)</label>
          </div>
          <div className="input-wrap">
            <CustomTextarea
              name="reason"
              rows="5"
              className="feedback-section"
              placeholder="Help us become better..."
            />
          </div>
        </div>
      )}
      <div className="form-button-container">
        <button
          className={!show ? "deactivate-button" : "form-button"}
          type="submit"
          disabled={!show}
        >
          Deactivate Account
        </button>
      </div>
    </>
  );
};
