import React, {useEffect} from "react";
import {Col, Row} from "react-bootstrap";
import styles from "../LinkedAccount/styles.module.css";
import EmailIcon from "@material-ui/icons/Email";
import CallIcon from "@material-ui/icons/Call";
import {useDispatch, useSelector} from "react-redux";
import {openModal} from "../../../redux/Modal/Modal.action";
import "./styles/AccountSecurity.scss";
import {
	getProfileInfoStep,
	profileSuccess,
} from "../../../redux/Profile/Profile.action";
import {useHistory} from "react-router-dom";
import ButtonSpinner from "../../common/ButtonSpinner/ButtonSpinner";

function AccountSecurity() {
	const dispatch = useDispatch();
	const history = useHistory();
	const handleRoute = () => {
		history.push("/users/seller_dashboard/manage_gigs/create_gigs");
		// history.push('/');
	};
	const handleComplete = () => {
		dispatch(profileSuccess(handleRoute));
	};
	useEffect(() => {
		dispatch(getProfileInfoStep("phone_verification"));
	}, [dispatch]);

	const profile = useSelector(state => state.profile);
	const verificationSuccess = profile?.data?.phone_data?.phone_verified;

	return (
		<>
			<div className={styles.FormInnerContainer}>
				<h2>Account Security</h2>
				<p>
					Trust and safety is a big deal in our community. Please verify your{" "}
					<br /> email and phone number so that we can keep your account
					secured.
				</p>
				<hr className='mt-0' />
				<Row className='pb-5 pt-4'>
					<Col md={8} className={styles.socialBrand}>
						<EmailIcon className={styles.Accounts_icon} />
						<p>Email</p>
						<i>private</i>
					</Col>
					<Col md={4}>
						<button
							type='button'
							className={`${styles.connectButton} ${styles.active}`}
						>
							{" "}
							Verified{" "}
						</button>
					</Col>
				</Row>
				<Row className='pb-2 pt-4'>
					<Col md={8}>
						<div className={styles.socialBrand}>
							<CallIcon className={styles.Accounts_icon} />
							<p>Phone Number</p>
							<i>private</i>
						</div>
						<span className={styles.shortText}>
							We'll never share your phone number.
						</span>
					</Col>
					<Col md={4}>
						<button
							onClick={() => dispatch(openModal("account_security"))}
							type='button'
							className={`${styles.connectButton} ${
								verificationSuccess === 1 ? styles.active : ""
							}`}
							disabled={verificationSuccess === 1 ? true : false}
						>
							{verificationSuccess === 1 ? (
								<small> ✓ Verified</small>
							) : (
								"Add Phone Number"
							)}
						</button>
					</Col>
				</Row>
				<hr />
				<div className={`pb-5 pt-2 ${styles.buttonEdu}`}>
					<button
						type='button'
						onClick={handleComplete}
						className={styles.formSubmit}
					>
						{profile?.postLoading && <ButtonSpinner />}Finish
					</button>
				</div>
			</div>
		</>
	);
}

export default AccountSecurity;
