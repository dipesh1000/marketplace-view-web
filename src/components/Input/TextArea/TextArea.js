import React, { useCallback, useState } from 'react'
import styles from './TextArea.module.css'
import {ErrorMessage, Field} from 'formik';
import ErrorField from '../ErrorField/ErrorField';

function TextArea({field, name, placeholder, form, value, limit}) {
    // const [description, setDescription] = useState(value.slice(0, limit));
    // const setFormattedDescription = useCallback(
    //     text => {
    //       setDescription(text.slice(0, limit));
    //     },
    //     [limit, setDescription]
    //   );
    return (
        <> 
            <Field
                name={name}
                as="textarea" 
                placeholder={placeholder}
                className={styles.inputTextArea}
                {...field}
            /> 
            <ErrorMessage name={name} component={ErrorField} />
               
            {/* <div className="text-right">
                {description.length}/{limit}            
            </div> */}
        </>
    )
}

export default TextArea
