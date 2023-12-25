import React from "react";
import { getIn } from "formik";
import { Form } from "react-bootstrap";

function CustomRadio({ label, options, content, field, form, ...props }) {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <div className="radio-wrap">
      <Form.Check type="radio" id={`${label}`}>
        <Form.Check.Input
          type="radio"
          checked={field.value === content ? true : false}
          {...field}
          {...props}
        />
        <Form.Check.Label className={`pl-2`}>{label}</Form.Check.Label>
        <Form.Control.Feedback type="valid">{errorText}</Form.Control.Feedback>
      </Form.Check>
    </div>
  );
}
export default CustomRadio;
