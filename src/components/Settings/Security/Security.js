import React from "react";
import "../styles/style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../common/form/useForm";
import * as Yup from "yup";
import SettingsLayout from "../SettingsLayout";
import { postPasswordInfo } from "../redux/Action";
import ButtonSpinner from "../../common/ButtonSpinner/ButtonSpinner";

const Security = () => {
  const { postLoading } = useSelector((state) => state.checkout);

  const dispatch = useDispatch();
  const initialValues = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };

  const onSubmit = (values) => {
    dispatch(postPasswordInfo(values));
  };

  const validationSchema = Yup.object({
    old_password: Yup.string().required(),
    new_password: Yup.string()
      .required()
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "8 characters or longer. Combine upper and lowercase letters and numbers."
      ),
    confirm_password: Yup.string()
      .required()
      .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
  });

  const { CustomInput, CustomForm } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <SettingsLayout>
      <CustomForm>
        <div class="form-header">
          <label for="changePassword">CHANGE PASSWORD</label>
        </div>
        <div class="form-row">
          <label for="old_password">Current Password</label>
          <div className="form-input">
            <CustomInput name="old_password" type="password" />
          </div>
        </div>
        <div className="form-row">
          <label for="new_password">New Password</label>

          <div className="form-input">
            <CustomInput name="new_password" type="password" />
          </div>
        </div>
        <div className="form-row confirm">
          <label for="confirm_password">Confirm Password</label>
          <div className="form-input">
            <CustomInput name="confirm_password" type="password" />
          </div>
        </div>
        <p className="password-hint">
          8 characters or longer. Combine upper and lowercase letters and
          numbers.
        </p>
        <div className="form-button-container">
          <button className="form-button" type="submit">
            {postLoading && <ButtonSpinner />} Save Changes
          </button>
        </div>
      </CustomForm>
    </SettingsLayout>
  );
};

export default Security;
