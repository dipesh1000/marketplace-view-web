const ShowSelected = ({
	filter_data,
	findDeliveryLabel,
	findGigmetaTitle,
	form,
}) => {
	const handleRemove = key => {
		form.setFieldValue(key, "");
		form.submitForm(form.values);
	};

	const handleRemoveArray = (key, value) => {
		let newData = filter_data[key].filter(item => item !== value);
		form.setFieldValue(key, newData);
		form.submitForm(form.values);
	};
	const handleRemovePrice = () => {
		form.setFieldValue("min_price", "");
		form.setFieldValue("max_price", "");
		form.submitForm(form.values);
	};

	return (
		<div className='show-selected'>
			<ul>
				{filter_data?.min_price && filter_data?.max_price && (
					<li>
						<div className='item-wrap' onClick={handleRemovePrice}>
							${filter_data.min_price} - ${filter_data.max_price}{" "}
							<i className='fa fa-times'></i>
						</div>
					</li>
				)}
				{filter_data?.delivery_time && (
					<li>
						<div
							className='item-wrap'
							onClick={() => handleRemove("delivery_time")}
						>
							{findDeliveryLabel(filter_data.delivery_time)}{" "}
							<i className='fa fa-times'></i>
						</div>
					</li>
				)}
				{filter_data?.seller_country?.map((item, index) => (
					<li key={index}>
						<div
							className='item-wrap'
							onClick={() => handleRemoveArray("seller_country", item)}
						>
							{item}
							<i className='fa fa-times'></i>
						</div>
					</li>
				))}
				{filter_data?.seller_level?.map((item, index) => (
					<li key={index}>
						<div
							className='item-wrap'
							onClick={() => handleRemoveArray("seller_level", item)}
						>
							{item}
							<i className='fa fa-times'></i>
						</div>
					</li>
				))}
				{filter_data?.seller_language?.map((item, index) => (
					<li key={index}>
						<div
							className='item-wrap'
							onClick={() => handleRemoveArray("seller_language", item)}
						>
							{item}
							<i className='fa fa-times'></i>
						</div>
					</li>
				))}
				{filter_data?.gig_meta?.map((item, index) => (
					<li key={index}>
						<div
							className='item-wrap'
							onClick={() => handleRemoveArray("gig_meta", item)}
						>
							{findGigmetaTitle(item)} <i className='fa fa-times'></i>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ShowSelected;
