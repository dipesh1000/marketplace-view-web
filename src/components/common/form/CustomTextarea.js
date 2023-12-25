import React from "react";
import PropTypes from "prop-types";
import {Form} from "react-bootstrap";
import {getIn} from "formik";

function CustomTextarea({
	variant,
	margin,
	rowsMin,
	label,
	field,
	max,
	helperText,
	counter,
	form,
	maxText,
	errorName,
	...props
}) {
	const errorText =
		getIn(form.touched, field.name) && getIn(form.errors, field.name);
	return (
		<>
			<Form.Group className={errorText ? "invalid_Field" : ""}>
				<Form.Control
					as='textarea'
					rows={2}
					{...field}
					{...props}
					isInvalid={!!errorText}
				/>
				{counter && (
					<Form.Text className='text-muted text-right counter'>
						{`${field.value?.length || 0}/${max || ""} ${maxText || ""}`}
					</Form.Text>
				)}
				<div
					className='errors'
					style={{
						color: "#f53e3e",
						fontSize: "12px",
						transform: "translateY(-15px)",
					}}
				>
					{/* {errorText && errorName ? <MdErrorOutline /> : errorText} */}
				</div>
			</Form.Group>
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
		</>
	);
}

CustomTextarea.propTypes = {
	variant: PropTypes.string,
	margin: PropTypes.string,
};

export default CustomTextarea;
