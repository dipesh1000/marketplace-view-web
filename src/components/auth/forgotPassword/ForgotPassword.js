import React from "react";
import {Field, ErrorMessage} from "formik";
import {useDispatch} from "react-redux";
import {Button} from "@material-ui/core";
// import { userForgotPassword } from "../../../api/auth/Authapi";
import {useHistory} from "react-router";
import {forgot} from "../../../redux/Auth/Auth.action";
import {useForm} from "../../common/form/useForm";
import {ForgetPasswordValidation} from "./ForgetPasswordValidation";

// const useStyles = makeStyles(() => ({
// 	form: {
// 		width: "100%",
// 		margin: "0 auto",
// 		padding: "20px 0 40px 0",
// 	},
// }));
const input = {
	outline: "none",
	width: "100%",
	padding: ".5em",
	border: "1px solid #ddd",
	borderRadius: "3px",
	marginBottom: "10px",
};

export default function ForgotPassword() {
	const dispatch = useDispatch();
	const history = useHistory();

	const initialValues = {
		email: "",
		url: `${window.location.origin.toString()}/forgotpassword/`,
	};

	const onSubmit = values => {
		dispatch(forgot(values))
			.then(res => {
				history.push("/");
			})
			.catch(err => history.push("/tokenPage"));
		// setSubmitting(false);
	};

	const {CustomForm} = useForm({
		initialValues,
		validationSchema: ForgetPasswordValidation,
		onSubmit,
	});

	return (
		<>
			<div className='forgetForm'>
				<CustomForm>
					<Field
						type='email'
						name='email'
						style={input}
						id='outlined-basic'
						label='Email'
					/>
					<ErrorMessage
						name='email'
						render={msg => <span className='error-message'>{msg}</span>}
					/>
					<Button type='submit' color='primary' fullWidth variant='contained'>
						Submit
					</Button>
				</CustomForm>
			</div>
		</>
	);
}
