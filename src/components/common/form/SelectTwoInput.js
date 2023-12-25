import React from "react";
import Select from "react-select";
// import { getOptionValue } from 'react-select/src/builtins'

function SelectTwoInput({
	options,
	changeData,
	form,
	isClearable,
	value,
	className,
	field,
	...props
}) {
	const onChange = option => {
		form.setFieldValue(field.name, option ? option.value : "+977 -");
	};
	const getValue = () => {
		options.find(option => option.value === field.value);
	};
	const brandColor = "green";

	const customStyles = {
		indicatorSeparator: () => {}, // removes the "stick"
		dropdownIndicator: defaultStyles => ({
			...defaultStyles,
			"& svg": {display: "none"},
		}),
		control: (base, state) => ({
			...base,
			height: "34px",
			"min-height": "34px",
			fontSize: "14px",
			boxShadow: state.isFocused ? 0 : 0,
			borderColor: state.isFocused
				? brandColor
				: state.isSelected
				? brandColor
				: base.borderColor,
			"&:hover": {
				borderColor: state.isFocused ? brandColor : base.borderColor,
			},
		}),
		valueContainer: base => ({
			...base,
			minHeight: "20px",
		}),
	};
	return (
		<div>
			<Select
				styles={customStyles}
				isClearable
				className='testing'
				value={getValue()}
				onChange={onChange}
				options={options}
				name={field.name}
				// {...field}
				// {...props}
			/>
		</div>
	);
}

export default SelectTwoInput;
