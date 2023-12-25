import React, {useEffect} from "react";
import {getIn} from "formik";
import {Form} from "react-bootstrap";
import "./CustomInput.css";

function CustomSellerSelect({
	label,
	defaultValue,
	options,
	field,
	setId,
	setData,
	new_data,
	form,
	defaultOption,
	...props
}) {
	const errorText =
		getIn(form.touched, field.name) && getIn(form.errors, field.name);

	useEffect(() => {
		setId && setId(field.value);
		setData && setData(form.values);
		// eslint-disable-next-line
	}, [field.value]);
	return (
		<Form.Group controlId='exampleForm.ControlSelect1'>
			<Form.Control as='select' {...props} {...field} isInvalid={!!errorText}>
				<option>{defaultOption ? defaultOption : "Select"}</option>
				{options &&
					options.map((option, index) => {
						return (
							<option key={index} value={option.id}>
								{option && option.value}
							</option>
						);
					})}
			</Form.Control>

			<Form.Control.Feedback type='invalid'>{errorText}</Form.Control.Feedback>
		</Form.Group>
	);
}

export default React.memo(CustomSellerSelect);
