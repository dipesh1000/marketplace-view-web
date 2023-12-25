import React from "react";
import { useDispatch } from "react-redux";
import { clientId, clientSecret } from "../../../../utils/baseUrl";
import {
  addPersonalInfo,
  getProfileInfoStep,
} from "../../../../redux/Profile/Profile.action";
import { GoogleRefreshToken } from "../../../auth/googleAuth/GoogleRefreshToken";
import { useGoogleLogin } from "react-google-login";
import "../style.scss";

// refresh token

const loginData = {
  grant_type: "social", // static 'social' value
  client_id: clientId, // client id
  client_secret: clientSecret, // client secret
  provider: "google", // name of provider (e.g., 'facebook', 'google' etc.)
  access_token: "",
};
function GoogleConnect({ googleStatus }) {
  const dispatch = useDispatch();
  const actionSuccess = () => {
    dispatch(getProfileInfoStep("linked_accounts"));
  };
  const onSuccess = (res) => {
    loginData.access_token = res.accessToken;
    loginData.step = "linked_accounts";
    const { access_token, provider, step } = loginData;
    dispatch(addPersonalInfo({ access_token, provider, step }, actionSuccess));

    GoogleRefreshToken(res);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: false,
    accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });
  return (
    <button
      onClick={signIn}
      className={`connectButton ${googleStatus ? "active" : ""}`}
      disabled={googleStatus ? true : false}
    >
      Continue
    </button>
  );
}

export default GoogleConnect;
