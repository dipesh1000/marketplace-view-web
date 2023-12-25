import React from "react";
import {BsStarFill, BsStar} from "react-icons/bs";

function SellerReview({seller, buyer_feedback}) {
	const starCount = buyer_feedback?.rating;
	return (
		<div className='review-container'>
			<div className='review-header'>Seller Review</div>

			<div className='review-content'>
				<div className='first-wrap'>
					<div className='img-wrap'>
						<img
							src={seller?.profileImage?.url?.resize}
							alt={seller?.profileImage?.alt}
						/>
					</div>
				</div>
				<div className='second-wrap'>
					<div className='name'>{seller?.username}</div>{" "}
					<ul className='review-lists'>
						<li className='colored-list'>
							<div className='title'>
								<div>Overall Experience </div>
								<span>Review given by seller to buyer </span>
							</div>{" "}
							<div className='stars'>
								{[...Array(5).keys()].map(item =>
									item < starCount ? <BsStarFill /> : <BsStar />
								)}
								<span>{starCount}</span>
							</div>
						</li>
					</ul>
					<div className='review'>{buyer_feedback?.message}</div>
				</div>
			</div>
		</div>
	);
}

export default SellerReview;
