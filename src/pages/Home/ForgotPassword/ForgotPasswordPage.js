import React from "react";
// import ForgotPassword from '../../../components/auth/forgotPassword/ForgotPassword';
import ResetPassword from "../../../components/auth/forgotPassword/ResetPassword";
import HomeLayout from "../../../layout/homeLayout/HomeLayout";
import "./styles/styles.scss";

function ForgotPasswordPage() {
	return (
		<HomeLayout>
			<div className='forgetpasswordwrapper'>
				<div className='forgetPasswordForm'>
					<div className='forget-Image-Container'>
						<img
							src='../../../../resetPassword.png'
							alt='Forgot Password'
							className='forget-Image'
						/>
					</div>
					<ResetPassword />
				</div>
			</div>
		</HomeLayout>
	);
}

export default ForgotPasswordPage;
