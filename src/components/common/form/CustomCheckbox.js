import React from "react";
import PropTypes from "prop-types";
import { getIn } from "formik";
import { Form } from "react-bootstrap";

function CustomCheckbox({ color, field, content, label, form, ...props }) {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <>
      <div className="checkbox-wrap">
        <Form.Check type="checkbox" id={`check-api-checkbox-${label}`}>
          <Form.Check.Input
            type="checkbox"
            {...field}
            {...props}
            checked={
              (content && field.value?.includes(content?.toString())) ||
              field.value === true
            }
          />
          <Form.Check.Label className="pl-2">{label}</Form.Check.Label>
          <Form.Control.Feedback type="valid">
            {errorText}
          </Form.Control.Feedback>
        </Form.Check>
      </div>
    </>
  );
}

CustomCheckbox.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
};
CustomCheckbox.defaultProps = {
  color: "primary",
};
export default CustomCheckbox;
