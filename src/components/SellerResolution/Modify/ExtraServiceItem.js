import React, {useEffect, useRef} from "react";

const ExtraServiceItem = ({item, form, index}) => {
	const handleMultiply = indexs => {
		return `${indexs}($${indexs * item?.extra_price})`;
	};
	const options = [
		{id: "1", value: handleMultiply(1)},
		{id: "2", value: handleMultiply(2)},
		{id: "3", value: handleMultiply(3)},
		{id: "4", value: handleMultiply(4)},
		{id: "5", value: handleMultiply(5)},
	];
	const selectField = useRef();
	const handleOtherExtra = (e, id) => {
		let length = form.values?.extra_services?.length;
		let value = form.values?.extra_services?.filter(
			(item, ind) => item?.id === id
		);
		if (value.length > 0) {
		} else {
			e.target.checked &&
				form.setFieldValue(`extra_services[${length}].id`, item.id);
			e.target.checked &&
				form.setFieldValue(`extra_services[${length}].quantity`, 1);
			e.target.checked &&
				form.setFieldValue(`extra_services[${length}].price`, item.extra_price);
		}
		//
		!e.target.checked &&
			form.setFieldValue(
				"extra_services",
				form.values?.extra_services?.filter((item, ind) => item?.id !== id)
			);

		selectField.current.value = 1;
	};
	useEffect(() => {
		// setCount((prev) => prev + 1);
		// setOtherExtra(
		//   form.values.extra_services?.filter((old) => old.meta_id == item.id)[0]
		//     ? true
		//     : false
		// );
	}, []);

	const handleChange = (e, id) => {
		let value = form.values?.extra_services?.filter(
			(item, ind) => item?.id === id
		);
		let data = form.values?.extra_services?.map((el, index) => {
			if (el?.id === id) {
				return {
					id: el.id,
					price: e.target.value * item?.extra_price,
					quantity: e.target.value,
				};
			}
			return el;
		});
		if (value.length > 0) {
			form.setFieldValue(`extra_services`, data);
		}
	};

	return (
		<div className='title-wrapper-inline'>
			<div className='inline-title-wrap '>
				<div className='checkbox-wrapper'>
					<input
						type='checkbox'
						defaultChecked={false}
						// name={`extra_services[${index}].id`}
						onChange={e => handleOtherExtra(e, item.id)}
					/>
				</div>
				<div className='extra-title'>
					{item?.title} {`(${item.extra_day} Days)`}
				</div>
			</div>

			<select
				onChange={e => handleChange(e, item.id)}
				className='form-control'
				// name={`extra_services[${index}].quantity`}
				ref={selectField}
			>
				{options.map(opt => (
					<option value={opt.id}>{opt.value}</option>
				))}
			</select>
		</div>
	);
};

export default ExtraServiceItem;
