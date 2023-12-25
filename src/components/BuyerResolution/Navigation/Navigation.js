import React, {useEffect} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {MdKeyboardArrowRight} from "react-icons/md";
import {useRouteMatch} from "react-router-dom";
import "./styles/Style.scss";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchResolution} from "../../SellerResolution/redux/Action";

function Navigation({orderId}) {
	const {url} = useRouteMatch();
	const dispatch = useDispatch();
	useEffect(() => {
		orderId && dispatch(fetchResolution(orderId));
		// eslint-disable-next-line
	}, [dispatch]);

	const {resolutions} = useSelector(state => state.resolution);

	const handleActive = path => {
		if (
			url.includes("/resolution/progress") ||
			url.includes("/resolution/cancel")
		) {
			return "active";
		}
	};
	return (
		<div>
			{!(
				resolutions?.order?.status === "Complete" ||
				resolutions?.order?.status === "Cancelled"
			) ? (
				<Navbar bg='white'>
					<div className='orderHeaderRow'>
						<Container>
							<Nav className='mr-auto steps'>
								<Nav.Link className='active'>
									<span className='stepLevel'>1</span>
									<Link
										to={`/users/dashboard/resolution/select/${orderId}`}
										className='stepText'
									>
										Select Action
									</Link>
								</Nav.Link>
								<span className='stepArrow'>
									<MdKeyboardArrowRight />
								</span>
								<Nav.Link className={handleActive("/resolution/detail")}>
									<span className='stepLevel'>2</span>
									<span className='stepText'>Ask Details & Submit</span>
								</Nav.Link>
							</Nav>
						</Container>
					</div>
				</Navbar>
			) : (
				""
			)}
		</div>
	);
}

export default Navigation;
