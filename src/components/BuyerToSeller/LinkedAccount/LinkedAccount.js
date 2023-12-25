import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProfileInfoStep } from "../../../redux/Profile/Profile.action";
import FbConnect from "./components/fbConnect";
// import GoogleConnect from './components/googleConnect'
import GoogleConnect from "./components/googleConnect";
import "./style.scss";
import { useHistory } from "react-router-dom";
import ContainerSpinner from "../../common/ContainerSpinner/ContainerSpinner";
import ButtonSpinner from "../../common/ButtonSpinner/ButtonSpinner";

function LinkedAccount() {
  const dispatch = useDispatch();
  const history = useHistory();
  let step = "linked_accounts";
  useEffect(() => {
    dispatch(getProfileInfoStep(step));
    // eslint-disable-next-line
  }, []);

  const profile = useSelector((state) => state.profile);

  let googleStatus = profile?.data?.linked_accounts?.find(
    (p) => p.provider_name === "google"
  )
    ? true
    : false;
  let facebookStatus = profile?.data?.linked_accounts?.find(
    (p) => p.provider_name === "facebook"
  )
    ? true
    : false;
  let githubStatus = profile?.data?.linked_accounts?.find(
    (p) => p.provider_name === "github"
  )
    ? true
    : false;
  let vimeoStatus = profile?.data?.linked_accounts?.find(
    (p) => p.provider_name === "vimeo"
  )
    ? true
    : false;
  let dribbbleStatus = profile?.data?.linked_accounts?.find(
    (p) => p.provider_name === "dribbble"
  )
    ? true
    : false;

  const handleRoute = () => {
    history.push(`/seller_onboarding/account_security`);
  };
  return profile?.isLoading ? (
    <ContainerSpinner />
  ) : (
    <>
      <div className="parent-form">
        <div className="FormInnerContainer">
          <h2>Linked Accounts</h2>
          <p>
            Taking the time to verify and link your accounts can upgrade your
            credibility and help us provide you with more business. Don’t worry,
            your information is and always will remain private.
          </p>
          <hr className="mt-0" />
          <div className="subHeading">
            <h5>Your Social Presence</h5>
            <i>Private</i>
          </div>
          <Row className="pb-5 pt-4">
            <Col md={8} className="socialBrand">
              <img
                src="https://img.icons8.com/fluent/26/000000/google-logo.png"
                alt="google"
              />
              <p>Google</p>
              {googleStatus ? <small> ✓ Verified</small> : ""}
            </Col>
            <Col md={4}>
              <GoogleConnect googleStatus={googleStatus} />
            </Col>
          </Row>
          <Row className="pb-5 pt-4">
            <Col md={8} className="socialBrand">
              <img
                src="https://img.icons8.com/material-rounded/24/4a90e2/facebook-f--v2.png"
                alt="facebook"
              />
              <p>Facebook</p>
              {facebookStatus ? <small> ✓ Verified</small> : ""}
            </Col>
            <Col md={4}>
              <FbConnect facebookStatus={facebookStatus} />
              {/* <span type="button" className={styles.connectButton}>Continue</span>  */}
            </Col>
          </Row>
          <hr />
          <div className="subHeading">
            <h5>Your Professional Presence</h5>
            <i>Private</i>
          </div>
          <Row className="pb-5 pt-4">
            <Col md={8} className="socialBrand">
              <img
                src="https://img.icons8.com/ios-glyphs/30/000000/github.png"
                alt="github"
              />
              <p>Github</p>
              {githubStatus ? <small> ✓ Verified</small> : ""}
            </Col>
            <Col md={4}>
              <button
                type="button"
                className={`connectButton ${githubStatus ? "active" : ""}`}
                disabled={githubStatus ? true : false}
              >
                Continue
              </button>
            </Col>
          </Row>
          <Row className="pb-5 pt-4">
            <Col md={8} className="socialBrand">
              <img
                src="https://img.icons8.com/fluent-systems-regular/20/fa314a/dribbble.png"
                alt="dribble"
              />
              <p>Dribble</p>
              {dribbbleStatus ? <small> ✓ Verified</small> : ""}
            </Col>
            <Col md={4}>
              <button
                type="button"
                className={`connectButton ${dribbbleStatus ? "active" : ""}`}
                disabled={dribbbleStatus ? true : false}
              >
                Continue
              </button>
            </Col>
          </Row>
          <Row className="pb-5 pt-4">
            <Col md={8} className="socialBrand">
              <img
                src="https://img.icons8.com/color/26/fa314a/vimeo.png"
                alt="vimeo"
              />
              <p>Vimeo</p>
              {vimeoStatus ? <small> ✓ Verified</small> : ""}
            </Col>
            <Col md={4}>
              <button
                type="button"
                className={`connectButton ${vimeoStatus ? "active" : ""}`}
                disabled={vimeoStatus ? true : false}
              >
                Continue
              </button>
            </Col>
          </Row>
          <hr />
          <div className={`pb-5 pt-1 buttonEdu`}>
            <button type="submit" onClick={handleRoute} className="formSubmit">
              {" "}
              {profile?.postLoading && <ButtonSpinner />} Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LinkedAccount;
