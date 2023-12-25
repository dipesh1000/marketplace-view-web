import React from "react";
import GitHubLogin from "react-github-login";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addPersonalInfo } from "../../LoggedInProfile/EditProfile/redux/Action";
import "../styles.scss";

const GithubLogin = () => {
  const dispatch = useDispatch();
  const onSuccess = (response) => {
    const values = {
      step: "linked_accounts",
      provider: "github",
      access_token: response?.code,
    };
    dispatch(addPersonalInfo(values));
  };

  const onFailure = (response) => console.error(response, "GITHUB FAILURE");

  return (
    <GitHubLogin
      clientId="77248c60e16a96f25182"
      redirectUri="http://localhost:3000"
      onSuccess={onSuccess}
      onFailure={onFailure}
      buttonText={<FaPlus />}
      className="plus-login-button"
    />
  );
};

export default GithubLogin;
