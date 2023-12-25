import React from "react";
import { useGoogleLogin } from "react-google-login";
import { clientSecret, clientId } from "../../../utils/baseUrl";
import { GoogleRefreshToken } from "./GoogleRefreshToken";
import { useDispatch } from "react-redux";
import { googleLogin } from "../../../redux/Auth/Auth.action";

// refresh token

const loginData = {
  grant_type: "social", // static 'social' value
  client_id: clientId, // client id
  client_secret: clientSecret, // client secret
  provider: "google", // name of provider (e.g., 'facebook', 'google' etc.)
  access_token: "",
};
const GoogleLogin = () => {
  const dispatch = useDispatch();
  const onSuccess = (res) => {
    loginData.access_token = res.accessToken;
    dispatch(googleLogin(loginData));
    // console.log("Login Success: currentUser:", res);
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
    <button onClick={signIn} className="authSocial authGoogle">
      <img
        src="https://img-authors.flaticon.com/google.jpg"
        alt="google login"
      ></img>

      <span className="buttonText">Continue with Google</span>
    </button>
  );
};

export default GoogleLogin;
