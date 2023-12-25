import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useParams} from "react-router-dom";
import {getOrderByCode} from "../Order/redux/action";
import {Col, Container, Row} from "react-bootstrap";
import SideBar from "../Order/SubmitRequirements/SideBar";
import "./styles.scss";

const ResolutionComplete = () => {
	const location = useLocation();
	const isSeller = location?.state?.isSeller;
	const {orderId} = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getOrderByCode(orderId, isSeller));
		// eslint-disable-next-line
	}, [dispatch]);

	const {orderData} = useSelector(state => state.checkout);

	return (
		<div className='main-container'>
			<Container>
				<Row>
					<Col md={8}>
						<div className='left-container'>
							<div className='header'>
								The order was completed. Need any help?
							</div>
							<div className='sub-text'>
								<small>
									This order was already marked as complete. If you encountered
									any issue, our{" "}
									<Link
										to={{
											pathname: "/support_tickets/new",
											state: {orderId: orderId},
										}}
									>
										Customer Support
									</Link>{" "}
									team is available to assist you.
								</small>
							</div>
						</div>
					</Col>
					<Col md={4}>
						<SideBar orderData={orderData} />
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default ResolutionComplete;
