import React from "react";
import {Formik} from "formik";
import {Button, TextField, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
	form: {
		width: "300px",
	},
}));

export default function Token() {
	const classes = useStyles();

	return (
		<>
			<Formik
				initialValues={{email: ""}}
				validate={values => {
					const errors = {};
					if (!values.email) {
						errors.email = "Required";
					} else if (
						!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
					) {
						errors.email = "Invalid email address";
					}
					return errors;
				}}
				onSubmit={(values, {setSubmitting}) => {
					setSubmitting(false);
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
					/* and other goodies */
				}) => (
					<form onSubmit={handleSubmit} className={classes.form}>
						<TextField
							type='text'
							name='token'
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.email}
							id='outlined-basic'
							label='Token'
							variant='outlined'
							fullWidth
							margin='normal'
						/>
						{errors.token && touched.token && errors.token}

						<Button
							type='submit'
							disabled={isSubmitting}
							color='primary'
							fullWidth
							variant='contained'
						>
							Submit
						</Button>
					</form>
				)}
			</Formik>
		</>
	);
}
