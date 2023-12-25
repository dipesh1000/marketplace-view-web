import React from "react";
import "./style.scss";
function GigCardProfile({data}) {
	return (
		<div className='gigcard-profile-wrap'>
			<div className='img-container'>
				<img
					src={
						data?.gig_images[Object.keys(data?.gig_images)[0]]
							? data?.gig_images[Object.keys(data?.gig_images)[0]]?.url?.resize
							: data?.gig_default_image?.url?.full
					}
					alt={
						data?.gig_images[Object.keys(data?.gig_images)[0]]
							? data?.gig_images[Object.keys(data?.gig_images)[0]]?.alt
							: `Gig Image`
					}
				/>
			</div>
			<div className='info-wrap'>
				<a href='/' className='title'>
					{data.title}
				</a>
				<div className='button-wrap'>
					<i className='fas fa-ellipsis-h'></i>
					<div className='starting'>
						Starting at
						<span className='price'>${data.starting_price}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default GigCardProfile;
