import React from "react";
import {Form} from "react-bootstrap";

function CustomPhoneNumber({field}) {
	return (
		<Form.Control className='inputPhone' size='lg' type='phone' {...field} />
	);
}

export default CustomPhoneNumber;
