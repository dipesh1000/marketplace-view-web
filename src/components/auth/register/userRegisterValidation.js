import * as yup from "yup";

export const userRegisterValidation = yup.object().shape({
	name: yup
		.string()
		.min(2, "Name must have at least 2 characters")
		.required("Name is required"),
	username: yup
		.string()
		.min(6, "Username must have at least 6 characters")
		.matches(
			/^(?=[a-zA-Z0-9_]{6,15}$)[^_0-9]/,
			"Username must begin with a letter and can include numbers and underscores."
		)
		.required(
			"Username must begin with a letter and can include numbers and underscores."
		),

	email: yup
		.string()
		.email("Enter a valid email")
		.required("Email is required"),

	password: yup
		.string()
		.required("Password  is required")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
			"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
		),

	password_confirmation: yup
		.string()
		.required("Password Confrimation is Required")
		.oneOf([yup.ref("password")], "Password does not match"),
});
