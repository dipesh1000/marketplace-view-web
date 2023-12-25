import React, {useEffect} from "react";
import {Field, ErrorMessage} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {Button, makeStyles} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {registerUser} from "../../../redux/Auth/Auth.action";
import {closeModal} from "../../../redux/Modal/Modal.action";
import {userRegisterValidation} from "./userRegisterValidation";
import {useForm} from "../../common/form/useForm";

const useStyles = makeStyles(() => ({
	input: {
		outline: "none",
		width: "100%",
		padding: ".5em",
		border: "1px solid #ddd",
		borderRadius: "3px",
		marginBottom: "10px",
	},
}));

export default function Register() {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const auth = useSelector(state => state.auth);
	useEffect(() => {
		if (auth.isAuthenticated) {
			history.push("/");
		}
		// eslint-disable-next-line
	}, [auth.isAuthenticated]);

	const initialValues = {
		name: "",
		username: "",
		email: "",
		password: "",
		password_confirmation: "",
		url: `${window.location.origin.toString()}/verify/`,
	};

	const onSubmit = values => {
		dispatch(registerUser(values));
		// setSubmitting(false);
		dispatch(closeModal("register"));
	};

	const {CustomForm} = useForm({
		initialValues,
		validationSchema: userRegisterValidation,
		onSubmit,
	});

	return (
		<>
			<CustomForm>
				<Field
					type='text'
					name='name'
					placeholder='Full Name'
					id='outlined-basic'
					label='Name'
					className={classes.input}
				/>
				<ErrorMessage
					name='name'
					render={msg => <span className='error-message'>{msg}</span>}
				/>
				<Field
					type='text'
					name='username'
					placeholder='Username'
					id='outlined-basic'
					label='Username'
					maxLength={15}
					className={classes.input}
				/>
				<ErrorMessage
					name='username'
					render={msg => <span className='error-message'>{msg}</span>}
				/>

				<Field
					type='email'
					name='email'
					placeholder='Email'
					id='outlined-basic'
					label='Email'
					className={classes.input}
				/>
				<ErrorMessage
					name='email'
					render={msg => <span className='error-message'>{msg}</span>}
				/>
				<Field
					type='password'
					name='password'
					placeholder='Password'
					id='outlined-basic'
					label='Password'
					className={classes.input}
				/>
				<ErrorMessage
					name='password'
					render={msg => <span className='error-message'>{msg}</span>}
				/>
				<Field
					type='password'
					name='password_confirmation'
					id='outlined-basic'
					placeholder='Password Confirmation'
					label='Confirm Password'
					className={classes.input}
				/>
				<ErrorMessage
					name='password_confirmation'
					render={msg => <span className='error-message'>{msg}</span>}
				/>
				<Button type='submit' className='loginContinueBtn'>
					Continue
				</Button>
			</CustomForm>
		</>
	);
}
