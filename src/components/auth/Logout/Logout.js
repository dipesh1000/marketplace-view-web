import {Form, Formik} from "formik";
import React from "react";
import {useDispatch} from "react-redux";
import {logout} from "../../../redux/Auth/Auth.action";

const Logout = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const dispatch = useDispatch();
	return (
		<>
			<Formik
				initialValues={{user_id: user.id}}
				onSubmit={(values, {setSubmitting}) => {
					dispatch(logout(values));
					setSubmitting(false);
				}}
			>
				{({
					values,
					handleSubmit,
					isSubmitting,
					/* and other goodies */
				}) => (
					<Form onSubmit={handleSubmit}>
						<button
							type='submit'
							style={{background: "transparent", border: "none"}}
							disabled={isSubmitting}
						>
							Logout
						</button>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default Logout;
