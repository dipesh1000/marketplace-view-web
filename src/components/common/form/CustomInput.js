import React from 'react';
import { getIn } from 'formik';
import { Form, InputGroup } from 'react-bootstrap';

function CustomInput({ field, form, helperText, addon, preon, ...props }) {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <>
      <InputGroup>
        {preon && (
          <InputGroup.Prepend>
            <InputGroup.Text>{preon}</InputGroup.Text>
          </InputGroup.Prepend>
        )}
        <Form.Control
          {...props}
          {...field}
          // name="city"
          // value={values.city}
          // onChange={handleChange}
          isInvalid={!!errorText}
        />

        {addon && (
          <InputGroup.Append>
            <InputGroup.Text>{addon}</InputGroup.Text>
          </InputGroup.Append>
        )}
        <Form.Text className="text-muted text-right">
          {helperText && helperText}
        </Form.Text>
        {/* <Form.Control.Feedback type="invalid">
          {errorText}
        </Form.Control.Feedback> */}
      </InputGroup>
    </>
  );
}

export default CustomInput;
