import React, {useEffect, useState} from "react";
import {Container, Nav, Tab} from "react-bootstrap";
import {useDispatch} from "react-redux";
import BuyerRequestTable from "./BuyerRequestTable";
import {FaSearch} from "react-icons/fa";
import {GiBookPile} from "react-icons/gi";
import "./styles/BuyerRequest.scss";
import BuyerOfferTable from "./BuyerOfferTable";

// eslint-disable-next-line
const orderDefault = [
	{
		title: "Active",
		slug: "active",
	},
	{
		title: "SentOffers",
		slug: "sentOffers",
	},
];
const requests = [
	{
		date: "jul 16, 2021",
		buyer:
			"https://fiverr-res.cloudinary.com/image/upload/t_profile_small,q_auto,f_auto/v1/attachments/profile/photo/88f1321c8300f012946189700fd8144b-1623752449960/5002fb8c-8595-48f3-a415-72db274b5939.jpg",
		request:
			"md_zaheer_khan	I'm looking for someone to develop a website like trends24.in for me.",
		offers: 25,
		duration: "3 days",
		budget: "$70",
		tags: ["website"],
	},
	{
		date: "jul 15, 2021",
		buyer:
			"https://fiverr-res.cloudinary.com/image/upload/t_profile_small,q_auto,f_auto/v1/attachments/profile/photo/88f1321c8300f012946189700fd8144b-1623752449960/5002fb8c-8595-48f3-a415-72db274b5939.jpg",
		request:
			"Hello, I'm a real Estate Investor, and i want to create a landing page on HubSpot for me to get information of interested people(Like, Email, Name etc.). Kindly Send me Everything i must provide you for you to get this work done ASAP. send everything at once, so i can provide it once, because i don't stay on Fiverr for hours. Also let me know how many days will it take you to complete this. Don't forget to let me know the cost",
		offers: 10,
		duration: "20 days",
		budget: "$700",
		tags: [],
	},
	{
		date: "jul 15, 2021",
		buyer:
			"https://fiverr-res.cloudinary.com/image/upload/t_profile_small,q_auto,f_auto/v1/attachments/profile/photo/88f1321c8300f012946189700fd8144b-1623752449960/5002fb8c-8595-48f3-a415-72db274b5939.jpg",
		request:
			"Looking for a bot to monitor walmart, target, newegg, amazon, best buy, bh photo and send in stock notification to discord",
		offers: 30,
		duration: "3 days",
		budget: "$50",
		tags: ["python", "Cross Brouser Compatibality"],
	},
];
const offers = [
	{
		id: 1,
		offer_title: "make custom web application in PHP laravel",
		offer_content:
			"Respected Sir, I will can do as per your requirement with in your timing requrements. I, Dipesh Shrestha am writing this letter to introduce myself as a web developer and doing. I have a more than 5 years experience in this website designing and development. I am the senior developer An4Soft, A complete web solution and our office is located at Sankhamul, Kathmandu. Having a good Profile and a fame as an IT company, we have been dedicated in offering top quality Web/App design and development, Graphic designs, Video Production, Digital Marketing, SEO and various IT support. I am providing the best services to each one of our clients with dedication and professionalism. Our clients come to us with complex challenges that need solving. That’s why, I take time to fully understand their business goals, their industry and their competition to design in innovative solution to their challenges. I am here to help you and also provide urgent services. I can design customized packages of services that suit all your requirements and needs and are willing to provide every IT services related to web design and development. I am looking forward to serving you in the best possible way and keep trying to improve ourselves for better productivity of client businesses. If you have any other doubts regarding our services or need any kind of information, feel free to contact me. Thanking you, Dipesh Shrestha",
		offer_tags: [],
		duration: "30days",
		price: "$550",
		request_user: "saqibiqbal336",
		request_user_profie:
			"https://fiverr-res.cloudinary.com/image/upload/t_profile_small,q_auto,f_auto/v1/attachments/profile/photo/7b6c2e7463a81383bcd39b3b8ae2a04a-175173631584182500408/JPEG_20200314_154122_1100576351.jpg",
		request_project:
			"i need a web module in php that can generate questions of maths on required patterns. There are around 2000 question types. Each question type should generate multiple, non-repeated questions. Like x+y=? So the value of x and y keep on changing everytime user tries to attempt the question.",
		request_delivery_time: "30days",
		request_budget: "500",
		tags: ["WC3 Validation", "PHP"],
	},
	{
		id: 2,
		offer_title: "do any kind of web development or web design related work",
		offer_content:
			"Subject: Requesting for project Respected Sir, I will can do as per your requirement with in your timing requrements. I, Dipesh Shrestha am writing this letter to introduce myself as a web developer and doing. I have a more than 5 years experience in this website designing and development. I am the senior developer An4Soft, A complete web solution and our office is located at Sankhamul, Kathmandu. Having a good Profile and a fame as an IT company, we have been dedicated in offering top quality Web/App design and development, Graphic designs, Video Production, Digital Marketing, SEO and various IT support. I am providing the best services to each one of our clients with dedication and professionalism. Our clients come to us with complex challenges that need solving. That’s why, I take time to fully understand their business goals, their industry and their competition to design in innovative solution to their challenges. I am here to help you and also provide urgent services. I can design customized packages of services that suit all your requirements and needs and are willing to provide every IT services related to web design and development. I am looking forward to serving you in the best possible way and keep trying to improve ourselves for better productivity of client businesses. If you have any other doubts regarding our services or need any kind of information, feel free to contact us. Thanking you, Dipesh Shrestha",
		offer_tags: ["5 Pages", "Design Customization", "Source Code"],
		duration: "30days",
		price: "$550",
		request_user: "saqibiqbal336",
		request_user_profie:
			"https://fiverr-res.cloudinary.com/image/upload/t_profile_small,q_auto,f_auto/v1/attachments/profile/photo/7b6c2e7463a81383bcd39b3b8ae2a04a-175173631584182500408/JPEG_20200314_154122_1100576351.jpg",
		request_project:
			"i need a web module in php that can generate questions of maths on required patterns. There are around 2000 question types. Each question type should generate multiple, non-repeated questions. Like x+y=? So the value of x and y keep on changing everytime user tries to attempt the question.",
		request_delivery_time: "30days",
		request_budget: "500",
		tags: ["WC3 Validation", "PHP"],
	},
	{
		id: 3,
		offer_title: "design modern minimalist logo with unlimited revisions",
		offer_content:
			"AS a versatile Modern minimalist logo and graphic designer with good experience in modern Graphics Designing and have worked with many national clients designing new modern logos, Minimalist logos, Brandings logo Banners with official color co-ordination website graphics and so on. Furthermore, I have worked for ANFA (All Nepal Football Association) where I handle their websites, designings, designing visiting cards. I have even made their official logo with a new modern designing concept. I handled their many designing projects. Indeed, I also worked for peak power for similar minimalist graphic designing projects. Moreover, I’m always on the look for exciting projects to work on and smart people to collaborate with! I have been in graphic design professionally since 2014. In this period, I have complete lots of project starting from logo design, modern minimalist creative logo design, stationery design, business card, web banner design, psd webpage design, magazine design to modern minimalist logo design. Modern logo, graphic design and modern minimalist creative logo design are my profession. I have strong command over Photoshop, Illustrator, InDesign and coral draw. What I can offer you to ensure your satisfaction: - Individual, professional and modern minimalist creative logo design for any size company. - I can perfectly translate your message into an image for minimalist creative logo design.",
		offer_tags: [
			" Include Source File",
			"Logo Transparency",
			"Printable Resolution Fil",
			"Stationery Designs",
		],
		duration: "30days",
		price: "$550",
		request_user: "saqibiqbal336",
		request_user_profie:
			"https://fiverr-res.cloudinary.com/image/upload/t_profile_small,q_auto,f_auto/v1/attachments/profile/photo/7b6c2e7463a81383bcd39b3b8ae2a04a-175173631584182500408/JPEG_20200314_154122_1100576351.jpg",
		request_project:
			"I'm looking for a ranch brand-type logo for a clothing line. The style will be pretty flat/modern/simplistic.",
		request_delivery_time: "30days",
		request_budget: "500",
		tags: ["Flat/Minimalist"],
	},
];
function BuyerRequest() {
	const [count, setCount] = useState();
	const [offerCount, setOfferCount] = useState();
	const collectCount = [];
	// eslint-disable-next-line
	const [active, setActive] = useState("active");
	// eslint-disable-next-line
	const [currentStatus, setCurrentStatus] = useState("Active");

	const dispatch = useDispatch();

	useEffect(() => {}, [dispatch]);

	return (
		<div className='gig-container'>
			<Container>
				<div className='gig-header'>
					<div className='title'>Buyer Requests</div>
					<div className='search-btn'>
						<div className='search-field'>
							<input type='text' placeholder='Search requests' />
							<button type='button'>
								<FaSearch />
							</button>
						</div>
					</div>
				</div>
				<Tab.Container id='left-tabs-example' defaultActiveKey='active'>
					<div className='gig-filter-bar request-counter'>
						<Nav variant='tabs' className='flex-row'>
							<Nav.Item key='active'>
								<Nav.Link eventKey='active'>Active</Nav.Link>
								<span>{count}</span>
							</Nav.Item>
							<Nav.Item key='sentoffter'>
								<Nav.Link eventKey='sentoffter'>SentOffer</Nav.Link>
								<span>{offerCount}</span>
							</Nav.Item>
						</Nav>
						<span className='left-order-level'>
							<GiBookPile /> 10 Offers left Today
						</span>
					</div>
					<Tab.Content>
						<Tab.Pane eventKey='active' key='active'>
							<BuyerRequestTable
								label={currentStatus}
								count={collectCount}
								setCount={setCount}
								data={requests}
							/>
						</Tab.Pane>
						<Tab.Pane eventKey='sentoffter' key='sentoffter'>
							<BuyerOfferTable
								label={currentStatus}
								setOfferCount={setOfferCount}
								data={offers}
							/>
						</Tab.Pane>
					</Tab.Content>
				</Tab.Container>
			</Container>
		</div>
	);
}

export default BuyerRequest;
