import React from "react";
import { Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../../redux/Auth/Auth.action";
import { Button } from "react-bootstrap";
import { openModal } from "../../../redux/Modal/Modal.action";
import * as yup from "yup";
import { useForm } from "../../common/form/useForm";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleRole = (role) => {
    role === "seller" && history.push("/users/seller_dashboard");
    role === "buyer" && history.push("/users/dashboard");
  };

  const input = {
    outline: "none",
    width: "100%",
    padding: ".5em",
    border: "1px solid #ddd",
    borderRadius: "3px",
    marginBottom: "10px",
  };

  const initialValues = {
    email: auth?.login?.checked?.length ? auth?.login?.email || "" : "",
    password: auth?.login?.checked?.length ? auth?.login?.password || "" : "",
    checked: auth?.login?.checked?.length ? auth?.login?.checked || "" : "",
  };
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid Email Address")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const onSubmit = (values) => {
    dispatch(login(values, handleRole));
    // setSubmitting(false);
  };

  const { CustomForm } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <CustomForm>
        <Field
          type="email"
          name="email"
          style={input}
          placeholder="Email"
          label="Email"
        />
        <ErrorMessage
          name="email"
          render={(msg) => <span className="error-message">{msg}</span>}
        />
        <Field
          type="password"
          name="password"
          placeholder="Password"
          label="Password"
          style={input}
        />
        <ErrorMessage
          name="password"
          render={(msg) => <span className="error-message">{msg}</span>}
        />
        <Button type="submit" className="loginContinueBtn">
          Continue
        </Button>
        <div className="loginRemember">
          <label>
            <Field type="checkbox" name="checked" value="One" />
            &nbsp;&nbsp;Remember Me
          </label>
          <div
            className="forgotPassword"
            onClick={() => dispatch(openModal("forgot"))}
          >
            Forgot Password?
          </div>
        </div>
      </CustomForm>
    </>
  );
}
