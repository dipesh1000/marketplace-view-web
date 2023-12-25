import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useDispatch } from "react-redux";
import {
  addPersonalInfo,
  getProfileInfoStep,
} from "../../../../redux/Profile/Profile.action";
import { FBAppId } from "../../../../utils/baseUrl";
import "../style.scss";

function FbConnect({ facebookStatus }) {
  const dispatch = useDispatch();

  const actionSuccess = () => {
    dispatch(getProfileInfoStep("linked_accounts"));
  };

  const responseFacebook = (res) => {
    const data = {
      grant_type: "social",
      provider: "facebook",
      access_token: res.accessToken,
      step: "linked_accounts",
    };
    if (res.id) {
      dispatch(addPersonalInfo(data, actionSuccess));
    }
  };

  return (
    <FacebookLogin
      appId={FBAppId}
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      render={(renderProps) => (
        <button
          className={`connectButton ${facebookStatus ? "active" : ""}`}
          disabled={facebookStatus ? true : false}
          onClick={renderProps.onClick}
        >
          Continue
        </button>
      )}
    />
  );
}

export default FbConnect;
