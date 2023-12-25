import React, { useEffect } from "react";
// import {getIn} from "formik";
import { Form } from "react-bootstrap";

function CustomSelect({
  label,
  defaultValue,
  options,
  field,
  setId,
  setData,
  title,
  form,
  errorName,
  ...props
}) {
  // const errorText =
  // 	getIn(form.touched, field.name) && getIn(form.errors, field.name);
  useEffect(() => {
    setId && setId(form.values[`${field.name}`]);
    setData && setData(form.values);
    setData &&
      field.name === "category" &&
      setData({ ...form.values, category_id: "", gig_metas: [] });
    // eslint-disable-next-line
  }, [form.values[`${field.name}`]]);
  return (
    <Form.Group controlId="exampleForm.ControlSelect1">
      <Form.Control
        className="abc"
        as="select"
        {...props}
        {...field}
        // name="city"
        // onChange={e => {form.handleChange(e); setId && setId(form.values[`${field.name}`]); setData && setData(form.values)}}
        // isInvalid={!!errorText}
      >
        <option value="" disabled>
          {title ? title : "Select"}
        </option>
        {options &&
          options.map((option, index) => (
            <option key={option.id} value={option.id}>
              {option.value}
            </option>
          ))}
      </Form.Control>
      {/* <div
          className="errors"
          style={{
            color: "#f53e3e",
            fontSize: "12px",
            transform: "translateY(-15px)",
          }}
        >
          {errorText && errorName ? `${errorName} is required` : errorText}
        </div> */}
      {/* <Form.Control.Feedback type="invalid">{errorText}</Form.Control.Feedback> */}
    </Form.Group>
  );
}

export default React.memo(CustomSelect);
