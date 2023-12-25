import * as yup from 'yup';

export const PersonalInfoValidation = yup.object().shape({
    email: yup.string()
        .min(2, "*First Name must have at least 2 characters")
        .max(50, "*First Name  can't be longer than 100 characters")
        .required("*First Name  is required"),
    
    last_name: yup.string()
        .min(2, "*Last Name  must have at least 2 characters")
        .max(70, "*Last Name  can't be longer than 100 characters")
        .required("*Last Name  is required"),
    
    description: yup.string()
        .min(1, "*Please Enter 150 characters")
        .max(600, "*Please Enter less then 600 characters")
        .required("*Description  is required"),
    
  });

  