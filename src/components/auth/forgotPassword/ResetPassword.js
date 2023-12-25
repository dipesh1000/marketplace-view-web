import React, { useEffect } from "react";
import { Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
// import {makeStyles} from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import { useForm } from "../../common/form/useForm";
import { ResetPasswordValidation } from "./ResetPasswordValidation";
import "./styles/ForgotPassword.scss";
import "./styles/ResetPassword.scss";
import { resetPassword } from "../../../redux/Auth/Auth.action";

// const useStyles = makeStyles(() => ({
// 	resetForm: {
// 		width: "300px",
// 	},
// 	input: {
// 		outline: "none",
// 		width: "100%",
// 		padding: ".5em",
// 		border: "1px solid #ddd",
// 		borderRadius: "3px",
// 		marginBottom: "20px",
// 	},
// 	errorMsg: {
// 		fontSize: "12px",
// 		color: "#d64747",
// 		position: "absolute",
// 		marginLeft: "15px",
// 		textAlign: "left",
// 		paddingTop: "5px",
// 		width: "250px",
// 	},
// }));

export default function ResetPassword() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { email } = useParams();
  const { token } = useParams();

  const success = useSelector((state) => state.success);

  useEffect(() => {
    if (success?.message) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [success]);

  const initialValues = {
    email: email,
    token: token,
    password: "",
    password_confirmation: "",
  };

  const onSubmit = (values) => {
    dispatch(resetPassword(values));
  };

  const { CustomForm } = useForm({
    initialValues,
    validationSchema: ResetPasswordValidation,
    onSubmit,
  });

  return (
    <>
      <div className="resetForm">
        <h1 className="resetForm-header">Reset Password</h1>
        <CustomForm>
          <label htmlFor="password" className="resetForm-label">
            New password
          </label>
          <div className="resetForm-lock">
            <Field
              className="resetForm-input"
              type="password"
              name="password"
              placeholder="New Password"
              id="outlined-basic"
            />
            <i className="fa fa-lock resetForm-icon"></i>
            <ErrorMessage
              name="password"
              render={(msg) => <span className="error-message">{msg}</span>}
            />
          </div>
          <label htmlFor="password_confirmation" className="resetForm-label">
            Confirm password
          </label>
          <div className="resetForm-lock">
            <Field
              className="resetForm-input"
              type="password"
              name="password_confirmation"
              placeholder="Confirm Password"
              id="outlined-basic"
            />
            <i className="fa fa-lock resetForm-icon"></i>
            <ErrorMessage
              name="password_confirmation"
              render={(msg) => <span className="error-message">{msg}</span>}
            />
          </div>
          <span className="resetForm-helperText">
            8 characters or longer. Combine upper and lowercase letters and
            numbers.
          </span>
          <div className="resetForm-buttons">
            <button type="button" className="resetForm-cancel">
              Cancel
            </button>
            <button type="submit" className="resetForm-save">
              Save Changes
            </button>
          </div>
        </CustomForm>
      </div>
    </>
  );
}
