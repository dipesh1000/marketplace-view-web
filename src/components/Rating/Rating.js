import React, {useMemo, useState} from "react";
import propTypes from "prop-types";
import {FaStar} from "react-icons/fa";

function Rating({count, color, form, label, field}) {
	const [hoverRating, setHoverRating] = useState(0);
	const getColor = index => {
		if (hoverRating >= index) {
			return color.filled;
		} else if (!hoverRating && form?.values[field.name] >= index) {
			return color.filled;
		}
		return color.unFilled;
	};

	const onRating = rate => {
		form.setFieldValue(field.name, rate);
	};

	const starRating = useMemo(() => {
		return Array(count)
			.fill(0)
			.map((_, i) => i + 1)
			.map(idx => (
				<FaStar
					key={idx}
					onClick={() => onRating(idx)}
					style={{color: getColor(idx)}}
					onMouseEnter={() => setHoverRating(idx)}
					onMouseLeave={() => setHoverRating(0)}
				/>
			));
		// eslint-disable-next-line
	}, [count, form?.values[field.name], hoverRating]);

	return (
		<>
			<div> {starRating} </div>
		</>
	);
}
Rating.propTypes = {
	count: propTypes.number,
	rating: propTypes.number,
	onChange: propTypes.func,
	color: {
		filled: propTypes.string,
		unFilled: propTypes.string,
	},
};
Rating.defaultProps = {
	count: 5,
	rating: 0,
	color: {
		filled: "#f5eb1b",
		unFilled: "#dcdcdc",
	},
};

export default Rating;
