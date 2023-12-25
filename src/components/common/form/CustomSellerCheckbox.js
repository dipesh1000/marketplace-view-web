import React from 'react'
import { getIn } from 'formik';
import { Form } from 'react-bootstrap';

function CustomSellerCheckbox({
    field, 
    label, 
    form,
    ...props
}) {
    const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
    return (
        <>
            <div className="checkbox-wrap">
                <Form.Check type="checkbox" id={`check-api-checkbox`}>
                <Form.Check.Input type="checkbox" {...field} {...props} />
                <Form.Check.Label className="pl-2 customCheckbox">{label}</Form.Check.Label>
                <Form.Control.Feedback type="valid">
                    {errorText}
                </Form.Control.Feedback>  
                </Form.Check>
            </div>
        </>
    )
}

export default CustomSellerCheckbox
