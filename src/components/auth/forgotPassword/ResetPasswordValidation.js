import * as yup from 'yup';

export const ResetPasswordValidation = yup.object({
    email: yup.string().email('Invalid Email Address').required('Email is required'),
    token: yup.string().required('Token is Required'),
    password: yup.string()
        .required("Password  is required")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    password_confirmation: yup.string()
    .required("Password Confrimation is Required")
    .oneOf([yup.ref("password")], "Password does not match"),  
  });