import React from "react";
import {useEffect} from "react";
import {useState} from "react";

function Expected({form, items}) {
	const [expectedDays, setExpectedDays] = useState(0);
	const [totalAmount, setTotalAmount] = useState(0);
	let amt = 0;
	let days = 0;
	useEffect(() => {
		const price = form.values?.custom_extra_services[0]?.extra_price || 0;
		const day = form.values?.custom_extra_services[0]?.extra_value || 0;

		const filterData = items?.filter((data, index) => {
			return form.values?.extra_services?.some(item => item?.id === data?.id);
		});
		filterData?.length > 0 &&
			// eslint-disable-next-line
			filterData.map(data => {
				// eslint-disable-next-line
				days = days + data.extra_day;
			});
		// eslint-disable-next-line
		setExpectedDays(Number(days) + Number(day));

		const filterAmount = form.values?.extra_services?.filter((data, index) => {
			return items?.some(item => item?.id === data?.id);
		});
		filterAmount?.length > 0 &&
			// eslint-disable-next-line
			filterAmount.map(data => {
				// eslint-disable-next-line
				amt = amt + data.price;
			});
		setTotalAmount(Number(amt) + Number(price));
	}, [form.values]);
	return (
		<>
			<div className='extra-info'>
				<div className='expected'>
					Expected Duration: <span>{expectedDays || 0} Days</span>
				</div>
				<div className='expected'>
					Total: <span>$ {totalAmount || 0}</span>
				</div>
			</div>
		</>
	);
}

export default Expected;
