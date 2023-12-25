import React, {useEffect} from "react";
import {Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {acceptOffer, fetchOffers, removeOffer} from "../redux/Action";
import "../styles/ManageRequest.scss";

function ViewOffer() {
	const history = useHistory();
	const dispatch = useDispatch();
	const {requestId} = useParams();
	useEffect(() => {
		dispatch(fetchOffers(requestId));
		// eslint-disable-next-line
	}, []);
	const {offers} = useSelector(state => state.manageRequest);

	const handleRemoveOffer = id => {
		dispatch(removeOffer(id, requestId));
	};
	const handleHistory = data => {
		history.push({
			pathname: `/checkout/payments/${data?.order_code}`,
			state: data,
		});
	};
	const handleAcceptOffer = id => {
		dispatch(acceptOffer(id, handleHistory));
	};

	return (
		<div className='manage_request'>
			<Container>
				<div className='manage-request-wrapper'>
					<div className='main-wrapper'>
						<div className='main_title'>
							<h1>View Offers ({offers?.length} Offers)</h1>
						</div>
						<div onClick={() => history.goBack()} className='back'>
							Back to Manage Request
						</div>
					</div>
					<div className='my-request-wrapper'>
						<div className='img-container'>
							<img
								src={
									offers &&
									offers[0]?.buyer_request_offer?.user?.profileImage?.url
										?.resize
								}
								alt=''
							/>
						</div>
						<div className='content-section'>
							<div className='title'>My Request</div>
							<div className='description'>
								{offers && offers[0]?.buyer_request_offer?.description}
							</div>
							<i className='fa fa-clock'></i>
							<div className='list'>
								{offers && offers[0]?.buyer_request_offer?.delivery_time} Day
								Delivery
							</div>
							<i className='fas fa-dollar-sign'></i>
							<div className='list'>
								Budget ${offers && offers[0]?.buyer_request_offer?.budget}
							</div>
						</div>
					</div>
					{offers?.map(offer => (
						<div className='offer-item-section' key={offer?.id}>
							<div className='img-container'>
								<img src={offer?.gig?.image?.url?.resize} alt='' />
							</div>
							<div className='offer-content'>
								<div className='title-wrapper'>
									<div className='title-content'>
										<div className='profile-img'>
											<img
												src={offer?.user?.profileImage?.url?.resize}
												alt=''
											/>
										</div>
										<div>
											<div className='user-name'>{offer?.user?.username}</div>
											<div className='contact-me'>
												<i className='fa fa-envelope'></i>
												Contact Me
											</div>
										</div>
									</div>
									<div className='budget'>${offer?.budget}</div>
								</div>
								<div className='title'>{offer?.gig?.title}</div>
								<div className='description'>{offer?.description}</div>
								<div className='list-wrapper'>
									{offer?.offer_include?.map(list => (
										<>
											<i className='fa fa-check'></i>
											<div className='list-item'>{list?.title}</div>
										</>
									))}
								</div>
								<div className='delivery-time'>
									<i className='fa fa-clock'></i> {offer?.delivery_time} Day
									Delivery
								</div>
								<div className='button-wrapper'>
									<div
										className='remove'
										onClick={() => handleRemoveOffer(offer?.id)}
									>
										Remove Offer
									</div>
									<div
										className='order-now'
										onClick={() => handleAcceptOffer(offer?.id)}
									>
										Order Now
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</Container>
		</div>
	);
}

export default ViewOffer;
