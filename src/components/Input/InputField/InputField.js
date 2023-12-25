import React from 'react'
import styles from './InputField.module.css'
import {ErrorMessage, Field} from 'formik';
import ErrorField from '../ErrorField/ErrorField';

function InputField({field, name, errors, touched, placeholder}) {    
    return (
        <>
            <Field 
                type="text" 
                name={name} 
                className={`${styles.inputStyle} ${errors.name && touched.name ? styles.errors : null}`}
                placeholder={placeholder}
                {...field} 
            />
            <ErrorMessage name={name} component={ErrorField} />
        </>
    )
}

export default InputField
