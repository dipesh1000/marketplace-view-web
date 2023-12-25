import React from "react";
import AuthModal from "./Modal";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { closeModal, openModal } from "../../redux/Modal/Modal.action";
import ForgotPassword from "../auth/forgotPassword/ForgotPassword";
import Register from "../auth/register/Register";
import Login from "../auth/login/Login";
import FBLogin from "../auth/facebookAuth/FacebookLogin";
import GoogleLogin from "../auth/googleAuth/GoogleLogin";
import { Button, Modal } from "react-bootstrap";
import { FaRegHandPointLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ModalContainer() {
  const modal = useSelector((state) => state.modal, shallowEqual);
  const dispatch = useDispatch();

  const handleRedirectJoin = () => {
    dispatch(openModal("register"));
  };
  const handleRedirectSignIn = () => {
    dispatch(openModal("login"));
  };
  return (
    <>
      {modal.modalName === "login" ? (
        <AuthModal open={modal.modalStatus}>
          <div className="customContainer">
            <h4 className="modalTitle">Sign In to Fucha</h4>
            <FBLogin />
            <GoogleLogin />
            {/* <Button className="authSocial authApple">
              Continue With Apple
              <FaApple className="appleLogoFa" />
            </Button> */}
            <div className="loginDivider">OR</div>
            <Login />
          </div>
          <Modal.Footer>
            <p>Not a member yet ? </p>
            <Button onClick={handleRedirectJoin}>Join Now</Button>
          </Modal.Footer>
        </AuthModal>
      ) : modal.modalName === "register" ? (
        <AuthModal open={modal.modalStatus}>
          <div className="customContainer">
            <h4 className="modalTitle">Join Fucha</h4>
            <FBLogin />
            <GoogleLogin />
            <div className="loginDivider">OR</div>
            <Register />
            <div className="loginRemember d-block">
              By joining, you agree to Fiverr’s{" "}
              <Link to="/">Terms of Service</Link>, as well as to receive
              occasional emails from us.
            </div>
          </div>
          <Modal.Footer>
            <p>Already a member?</p>
            <Button onClick={handleRedirectSignIn}>Sign in</Button>
          </Modal.Footer>
        </AuthModal>
      ) : modal.modalName === "forgot" ? (
        <div className="abc">
          <AuthModal open={modal.modalStatus}>
            <div className="customContainer">
              <h4 className="modalTitle forgotTitle">Reset Password</h4>
              <p className="forgetSubTitle">
                Please enter your email address and we'll send you a link to
                reset your password.
              </p>
              <ForgotPassword />
            </div>
            <Modal.Footer className="forgetFooter">
              <Button onClick={handleRedirectSignIn}>Back to Sign In</Button>
            </Modal.Footer>
          </AuthModal>
        </div>
      ) : modal.modalName === "forgetConformation" ? (
        <AuthModal open={modal.modalStatus}>
          <div className="customContainer">
            <h4 className="modalTitle">Thank You</h4>
            <h2>Sent Success</h2>
            <p>
              We have send you a mail please have Look! and Confirm your by
              clicking Confirmation
              <span>
                if you haven't got mail please feel free to contact our customer
                care
              </span>
            </p>
            <Button
              onClick={() => dispatch(closeModal("forgetConformation"))}
              className="authSocial btnConfimatation"
            >
              Continue &nbsp;&nbsp;
              <FaRegHandPointLeft className="appleLogoFa" />
            </Button>
          </div>
        </AuthModal>
      ) : modal.modalName === "confimation" ? (
        <AuthModal open={modal.modalStatus}>
          <div className="customContainer">
            <h4 className="modalTitle">Thank You</h4>
            <h2>Joining with Us!</h2>
            <p>
              We have send you a mail please have Look! and Confirm your by
              clicking Confirmation
              <span>
                if you haven't got mail please feel free to contact our customer
                care
              </span>
            </p>
            <Button
              onClick={() => dispatch(closeModal("confimation"))}
              className="authSocial btnConfimatation"
            >
              Continue &nbsp;&nbsp;
              <FaRegHandPointLeft className="appleLogoFa" />
            </Button>
          </div>
        </AuthModal>
      ) : null}
    </>
  );
}
