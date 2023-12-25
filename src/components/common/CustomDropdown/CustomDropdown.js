import React from "react";
import {Link} from "react-router-dom";
import "./styles/CustomDropdown.css";
import {FaAngleDown} from "react-icons/fa";

function CustomDropdown({title}) {
	return (
		<div className='Custom_dropdown'>
			<div className='custom_dropdown_item'>
				{title} <FaAngleDown />
			</div>
			<ul className='custom_dropdown_menu'>
				<li>
					<Link to='#'>My Contact</Link>
				</li>
				<li>
					<Link to='#'>My Contact</Link>
				</li>
			</ul>
		</div>
	);
}

export default CustomDropdown;
