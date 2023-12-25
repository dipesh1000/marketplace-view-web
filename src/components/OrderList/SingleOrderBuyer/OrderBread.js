import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {FaCheck} from "react-icons/fa";
import {IoIosPin} from "react-icons/io";
import {useDispatch} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {openModal} from "../../../redux/Modal/Modal.action";

function OrderBread({status, resolution}) {
	const dispatch = useDispatch();
	const {orderId} = useParams();
	const handleCancel = () => {
		dispatch(openModal("orderCancel", orderId));
	};
	const resolutionFilter = resolution?.filter(
		item => item.approved_at == null && item.rejected_at == null
	);
	const barStatus = resolutionFilter?.length > 0 ? true : false;
	return status?.slug === "cancelled" ? (
		<div className='OrderBreadWrapper cancelled'>
			<Container>
				<Row>
					<Col md={{span: 8, offset: 1}}>
						<div className='OrderBread'>
							<div className='orderbread-text'>
								{" "}
								<i className='fa fa-times'></i> Order has been Cancelled
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	) : status?.slug === "complete" ? (
		<div className='OrderBreadWrapper complete'>
			<Container>
				<Row>
					<Col md={{span: 8, offset: 1}}>
						<div className='OrderBread'>
							<div className='bread-menu'>
								<div className='bread-item '>
									<span>
										<FaCheck />
									</span>
									<p>Buyer Submitted Information</p>
								</div>
								<div className='bread-item '>
									<span>
										<IoIosPin />
									</span>
									<p>Order in progress delivery soon</p>
								</div>
							</div>
							<div className='orderbread-text'>
								{" "}
								<i className='fa fa-check'></i> Order Completed.{" "}
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	) : status?.slug === "incomplete" ? (
		<div className='OrderBreadWrapper incomplete'>
			<Container>
				<Row>
					<Col md={{span: 8, offset: 1}}>
						<div className='OrderBread'>
							<div className='bread-menu'>
								<div className='bread-item '>
									<span>
										<i className='fas fa-exclamation-triangle'></i>
									</span>
									<p>Requirement Submission Pending </p>
								</div>
							</div>

							<div className='delivery-btn'>
								<a href='#requirement' className='skipBtn'>
									Submit Requirement
								</a>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	) : barStatus ? (
		<div className='OrderBreadWrapper resolution'>
			<Container>
				<Row>
					<Col md={{span: 8, offset: 1}}>
						<div className='OrderBread'>
							<div className='bread-menu'>
								<>
									<div className='bread-item '>
										<span>
											<FaCheck />
										</span>
										<p>Buyer Submitted Information</p>
									</div>
									<div className='bread-item '>
										<span>
											<IoIosPin />
										</span>
										<p>Order in progress delivery soon</p>
									</div>
								</>
							</div>

							<div className='orderbread-text'>
								{" "}
								Resolution Has not been Resolved
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	) : status?.slug === "revision" ? (
		<div className={`OrderBreadWrapper revision`}>
			<Container>
				<Row>
					<Col md={{span: 8, offset: 1}}>
						<div className='OrderBread'>
							<div className='bread-menu'>
								<div className='bread-item '>
									<span>
										<FaCheck />
									</span>
									<p>Buyer Submitted Information</p>
								</div>
								<div className='bread-item '>
									<span>
										<IoIosPin />
									</span>
									<p>Order in progress delivery soon</p>
								</div>
							</div>
							<div className='status-actions'>Revision Pending</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	) : status?.slug === "late" || status?.slug === "very_late" ? (
		<div className={`OrderBreadWrapper late`}>
			<Container>
				<Row>
					<Col md={{span: 8, offset: 1}}>
						<div className='OrderBread'>
							<div className='bread-menu'>
								<div className='bread-item'>
									<span>
										<FaCheck />
									</span>
									<p>Buyer Submitted Information</p>
								</div>
								<div className='bread-item'>
									<span>
										<IoIosPin />
									</span>
									<p>Order in progress delivery soon</p>
								</div>
							</div>

							{status?.slug === "late" && (
								<div className='status-actions'>Your order is Late</div>
							)}
							{status?.slug === "very_late" && (
								<div className='status-actions'>You order is Very Late</div>
							)}
							{status?.slug === "very_late" && (
								<div className='delivery-btn'>
									<Button onClick={handleCancel} className='cancelBtn'>
										Cancel Order
									</Button>
								</div>
							)}
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	) : status?.slug === "dispute" ? (
		<div className={`OrderBreadWrapper dispute`}>
			<Container>
				<Row>
					<Col md={{span: 8, offset: 1}}>
						<div className='OrderBread'>
							<div className='bread-menu'>
								<div className='bread-item '>
									<span>
										<FaCheck />
									</span>
									<p>Buyer Submitted Information</p>
								</div>
								<div className='bread-item '>
									<span>
										<IoIosPin />
									</span>
									<p>Order in progress delivery soon</p>
								</div>
							</div>

							<div className='status-actions'>Dispute Occured</div>

							<div className='delivery-btn'>
								<Link className='deliveryOrderBtn' to='#'>
									Got to Customer Support
								</Link>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	) : (
		<div className={`OrderBreadWrapper`}>
			<Container>
				<Row>
					<Col md={{span: 8, offset: 1}}>
						<div className='OrderBread'>
							<div className='bread-menu'>
								{(status?.slug === "inprogress" ||
									status?.slug === "delivered") && (
									<>
										<div className='bread-item active'>
											<span>
												<FaCheck />
											</span>
											<p>Buyer Submitted Information</p>
										</div>
										{status?.slug === "inprogress" && (
											<div className='bread-item warning'>
												<span>
													<IoIosPin />
												</span>
												<p>Order in progress delivery soon</p>
											</div>
										)}
										{status?.slug === "delivered" && (
											<div className='bread-item active'>
												<span>
													<FaCheck />
												</span>
												<p>Order delivered waiting for response</p>
											</div>
										)}
									</>
								)}
							</div>

							<div className='delivery-btn'>
								{status?.slug === "incomplete" && (
									<a href='#requirement' className='skipBtn'>
										Submit Requirement
									</a>
								)}
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default OrderBread;
