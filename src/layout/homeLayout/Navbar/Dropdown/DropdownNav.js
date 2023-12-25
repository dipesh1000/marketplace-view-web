import React from "react";
import {Dropdown} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";
// import Logout from '../../../../components/auth/Logout/Logout';
import {logout} from "../../../../redux/Auth/Auth.action";

function DropdownNav() {
	const {user} = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const history = useHistory();
	const handleProfile = () => {
		history.push(`/${user.username}`);
	};
	const handleHistory = () => {
		history.push("/");
	};
	const handleLogout = e => {
		e.preventDefault();
		dispatch(logout({user_id: user?.id}, handleHistory));
	};

	return (
		<Dropdown className='profile_dropdown_logged'>
			<Dropdown.Toggle variant='success' id='dropdown-basic'>
				<div className='profile_img'>
					{
						<img
							src={user?.profileImage?.url?.full}
							style={{objectFit: "cover"}}
							alt=''
						/>
					}
				</div>
			</Dropdown.Toggle>

			<Dropdown.Menu>
				<Dropdown.Item onClick={handleProfile}>Profile</Dropdown.Item>
				<div className='line-break'></div>
				<Dropdown.Item>
					<Link to='/users/edit/account'>Settings</Link>
				</Dropdown.Item>
				<Dropdown.Item href='#/action-3'>
					English <i className='fa fa-globe'></i>
				</Dropdown.Item>
				<Dropdown.Item href='#/action-2'>$USD</Dropdown.Item>
				<Dropdown.Item>
					<Link to='/users/manage_requests'>Manage Request</Link>
				</Dropdown.Item>
				<Dropdown.Item>
					<Link to='/support_tickets/new'>Help & Support</Link>
				</Dropdown.Item>
				<div className='line-break'></div>
				<Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default DropdownNav;
