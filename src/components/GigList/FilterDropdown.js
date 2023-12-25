import React from "react";
import useIsVisible from "../../utils/useIsVisible";
import "./style/style.scss";

function FilterDropdown({children, title}) {
	const {ref, isVisible, setIsVisible} = useIsVisible(false);

	const handleVisible = () => {
		setIsVisible(prev => !prev);
	};
	return (
		<div ref={ref}>
			<span className='filterBtn' onClick={handleVisible}>
				{title}
				{isVisible ? (
					<i className='fas fa-chevron-up'></i>
				) : (
					<i className='fas fa-chevron-down'></i>
				)}
			</span>
			{isVisible ? (
				<div className='custom-dropdown'>
					<div className='content-wrapper'>{children}</div>
					<div className='button-wrapper'>
						<span>Clear All</span>
						<button type='submit'>Apply</button>
					</div>
				</div>
			) : null}
		</div>
	);
}
export default FilterDropdown;
