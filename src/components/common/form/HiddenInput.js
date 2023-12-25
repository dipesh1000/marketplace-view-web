import {useEffect} from "react";

function HiddenInput({form, props}) {
	useEffect(() => {
		form.setFieldValue(props.name, props.value);
		// eslint-disable-next-line
	}, []);

	return <input type='hidden' />;
}
export default HiddenInput;
