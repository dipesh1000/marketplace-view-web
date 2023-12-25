import React from "react";
import {Badge} from "react-bootstrap";
import {FaCheck, FaQuestionCircle} from "react-icons/fa";

function SideBar({orderData}) {
	return (
		<div className='OrdersDetail'>
			<div className='OrderDetailsContainer'>
				<div className='AsideTop'>
					<div className='AsideMain'>
						<div className='imgBox'>
							<img src={orderData?.gig?.image?.url?.resize} />
						</div>
						<div className='sideHeadingText'>
							<p>{orderData?.gig?.title}</p>
						</div>
					</div>
					<hr />
					<div className='AsideSec'>
						<div className='AsideSecPrice'>
							<b>{orderData?.package_title}</b>
						</div>
						{orderData?.order_include?.map(item => (
							<div key={item.id}>
								<FaCheck className='checkIcon active' />
								<span>{item.title}</span>
							</div>
						))}
					</div>
				</div>
				<div className='AsideButton'>
					<div className='serviceFee'>
						<span>
							Status
							<FaQuestionCircle className='ml-1' />
						</span>
						<Badge className='badge-warning'>{orderData?.status}</Badge>
					</div>
					<div className='serviceFee'>
						<p>Order</p>
						<span>#{orderData?.order_code}</span>
					</div>
					<div className='serviceFee'>
						<p>Order Date</p>
						<span>{orderData?.order_date}</span>
					</div>
					<div className='serviceFee'>
						<p>Quantity</p>
						<span>X {orderData?.quantity}</span>
					</div>
					<div className='serviceFee'>
						<p>Price</p>
						<span>${orderData?.total_price}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SideBar;
