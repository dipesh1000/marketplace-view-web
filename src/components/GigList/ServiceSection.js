import React from "react";
import {Link} from "react-router-dom";
import ArrowSlider from "../common/slider/ArrowSlider";

function ServiceSection({service_types}) {
	return (
		<>
			{service_types?.length > 5 ? (
				<ArrowSlider slidesToShow={Math.min(service_types.length, 6)}>
					{service_types?.map(item => (
						<>
							<Link to={item.slug}>
								<div className='category-service-type' key={item.id}>
									<div className='service-type-box temp-width'>
										<div className='service-type-image'>
											<img src={item.image?.icon?.url?.resize} alt='' />
										</div>
										<div className='service-type-text'>
											<p className='service-type-title'>{item.title}</p>
										</div>
									</div>
								</div>
							</Link>
						</>
					))}
				</ArrowSlider>
			) : (
				<div className='d-flex'>
					{service_types?.map(item => (
						<>
							<div className='category-service-type pr-2' key={item.id}>
								<div className='service-type-box temp-width'>
									<Link to={item.slug}>
										<div className='service-type-image'>
											<img src={item.image?.icon?.url?.resize} alt='' />
										</div>
										<div className='service-type-text'>
											<p className='service-type-title'>{item.title}</p>
										</div>
									</Link>
								</div>
							</div>
						</>
					))}
				</div>
			)}
		</>
	);
}

export default ServiceSection;
