import React from "react";
import "./MarketPlace.css";

const marplaceList = [
	{
		id: 1,
		title: "Graphics & Design",
		url:
			"https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg",
	},
	{
		id: 2,
		title: "Digital Marketing",
		url:
			"https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg",
	},
	{
		id: 3,
		title: "Writing & Translation",
		url:
			"https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg",
	},
	{
		id: 4,
		title: "Video & Animation",
		url:
			"https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg",
	},
	{
		id: 5,
		title: "Music & Audio",
		url:
			"https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg",
	},
	{
		id: 6,
		title: "Programming & Tech",
		url:
			"https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg",
	},
	{
		id: 7,
		title: "Business",
		url:
			"https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg",
	},
	{
		id: 8,
		title: "Lifestyle",
		url:
			"https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg",
	},
	{
		id: 9,
		title: "Data",
		url:
			"https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg",
	},
];
function MarketPlace() {
	return (
		<section className='explore-market'>
			<div className='container'>
				<h2>Explore the marketplace</h2>
				<ul className='categories-list'>
					{marplaceList &&
						marplaceList.map(item => {
							return (
								<li key={item?.id}>
									<a href='/'>
										<img src={item.url} alt='' title={item.title} />
										{item.title}
									</a>
								</li>
							);
						})}
				</ul>
			</div>
		</section>
	);
}

export default MarketPlace;
