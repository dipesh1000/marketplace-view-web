import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import OrderLayout from "../OrderLayout";
import {getOrderByCode} from "../redux/action";
import ConfirmFooter from "./ConfirmFooter";
import MainContent from "./MainContent";
import SideBar from "./SideBar";
import "./styles/ConfirmPay.scss";

function ConfirmPay() {
	const {orderId} = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getOrderByCode(orderId));
		// eslint-disable-next-line
	}, [dispatch]);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleStatus = data => {
		setIsSubmitting(data);
	};
	const {orderData} = useSelector(state => state.checkout);

	return (
		<OrderLayout>
			<div className='ConfirmPayWrapper'>
				<Container>
					<Row>
						<Col md={7}>
							<MainContent
								orderId={orderId}
								slug={orderData?.gig?.slug}
								handleStatus={handleStatus}
								isSubmitting={isSubmitting}
							/>
						</Col>
						<Col md={5}>
							<SideBar orderData={orderData} isSubmitting={isSubmitting} />
						</Col>
					</Row>
				</Container>
			</div>
			<ConfirmFooter />
		</OrderLayout>
	);
}

export default ConfirmPay;
