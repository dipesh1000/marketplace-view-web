import React from "react";
import FacebookLogin from "react-facebook-login";
import { FBAppId } from "../../../utils/baseUrl";
import { useDispatch } from "react-redux";
import { fbLogin } from "../../../redux/Auth/Auth.action";
import { FaFacebook } from "react-icons/fa";

export default function FBLogin() {
  const dispatch = useDispatch();
  const responseFacebook = (res) => {
    const fbData = {
      grant_type: "password",
      provider: "facebook",
      access_token: res.accessToken,
    };
    if (res.id) dispatch(fbLogin(fbData));
  };
  return (
    <>
      <FacebookLogin
        appId={FBAppId}
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="authFacebook authSocial"
      />
      <FaFacebook className="fbIconFa" />
    </>
  );
}
