import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "../../common/form/useForm";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import "../styles/style.scss";
import { fetchUsername, postUsername } from "../redux/Action";
import ButtonSpinner from "../../common/ButtonSpinner/ButtonSpinner";

const AccountDetails = () => {
  const dispatch = useDispatch();
  const { username, usernameLoading } = useSelector((state) => state.username);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    dispatch(fetchUsername());
  }, [dispatch]);

  let initialValues = {
    first_name: username?.personal?.first_name || "",
    last_name: username?.personal?.last_name || "",
    username: username?.user?.username || "",
    email: username?.user?.email || "",
    online_status: "",
  };

  const onSubmit = (values) => {
    // eslint-disable-next-line
    dispatch(postUsername(values));
    values.online_status ? setOnline(false) : setOnline(true);
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    username: Yup.string()
      .min(6, "Username must have at least 6 characters")
      .matches(
        /^(?=[a-zA-Z0-9_]{6,20}$)[^_0-9]/,
        "Username must begin with a letter and can include numbers and underscores."
      )
      .required(
        "Username must begin with a letter and can include numbers and underscores."
      ),
    email: Yup.string().email().required(),
    online_status: Yup.string(),
  });

  const { CustomInput, CustomForm, CustomSelect } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <CustomForm>
      <div className="profile-link">
        <label className="profile-link-label">
          Need to update your public profile?
        </label>
        <NavLink to={`/${username?.user?.username}`} className="myprofile-link">
          Go to My Profile
        </NavLink>
      </div>
      <div className="form-divider"></div>
      <div className="form-row">
        <label htmlFor="first_name">FIRST NAME</label>
        <div className="form-input">
          <CustomInput name="first_name" type="text" />
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="last_name">LAST NAME</label>
        <div className="form-input">
          <CustomInput name="last_name" type="text" />
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="username">USERNAME</label>
        <div className="form-input">
          <CustomInput name="username" type="text" maxLength={20} />
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="email">EMAIL</label>
        <div className="form-input">
          <CustomInput
            name="email"
            type="email"
            disabled={username?.user?.email ? true : false}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="online">
          <label htmlFor="online-status" className="online-icon">
            ONLINE STATUS
            <div className={online ? "online-circle" : ""} />
          </label>
          <p>
            When online, your Gigs are visible under the Online search filter.
          </p>
        </div>
        <div className="select-section">
          {online ? (
            <CustomSelect
              name="online_status"
              className="online-status"
              title="Go Offline For..."
              options={[
                { id: 1, value: "1 Hour" },
                { id: 2, value: "1 Day" },
                { id: 3, value: "1 Week" },
                { id: 4, value: "Forever" },
              ]}
            />
          ) : (
            <CustomSelect
              name="online_status"
              className="online-status"
              title="You're currrently offline"
              options={[{ id: 1, value: "Go Online" }]}
            />
          )}
        </div>
      </div>
      <div className="form-button-container">
        <button className="form-button" type="submit">
          {usernameLoading && (
            <ButtonSpinner size="sm" className="save-button-spinner" />
          )}
          Save Changes
        </button>
      </div>
      <div className="form-divider" />
    </CustomForm>
  );
};

export default AccountDetails;
