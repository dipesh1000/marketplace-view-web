import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import "./CustomInput.css";

function CustomSellerInput({ field, form, setTextval, placeholder, ...props }) {
  useEffect(() => {
    setTextval && setTextval(field.value);
    // eslint-disable-next-line
  }, [field.value]);

  return (
    <Form.Group controlId="formGroupEmail">
      <Form.Control
        className="formControl"
        type="text"
        {...field}
        {...props}
        placeholder={placeholder ? placeholder : "your Text"}
      />
    </Form.Group>
  );
}

export default CustomSellerInput;
