import * as yup from 'yup'

export const ForgetPasswordValidation = yup.object({
    email: yup.string().email('Email must be Valid').required('Email Field is Required')
})