import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {openModal} from "../../../redux/Modal/Modal.action";

function SelectPackage({data}) {
	const [packages, setPackages] = useState([]);
	const dispatch = useDispatch();
	const handleBack = () => {
		dispatch(openModal("createOffer", data));
	};
	const handleOpen = id => {
		dispatch(openModal("createOffer", {...data, packageId: id}));
	};
	const {chatGig} = useSelector(state => state.chatOffer);
	useEffect(() => {
		const filtered = chatGig?.filter(item => item?.id === data?.gigId);
		chatGig && setPackages(filtered[0]?.gig_packages);
		// eslint-disable-next-line
	}, []);

	const checkPackage = id => {
		if (id === "1") {
			return "Basic";
		} else if (id === "2") {
			return "Premium";
		} else {
			return "Gold";
		}
	};
	return (
		<div className='select-package-offer'>
			{packages?.map(item => (
				<div className='package-item' key={item?.id}>
					<div className='title-wrapper'>
						<div className='first-wrap'>
							<div className='title'>
								{checkPackage(item?.package_id)} - {item?.title}
							</div>
							<div className='others'>
								<i class='far fa-clock'></i>
								<span>{item?.delivery_duration} Days Delivery</span>
								<i class='fab fa-rev'></i>
								<span>{item?.revision} Revisions</span>
							</div>
						</div>
						<div className='price-wrap'>${item?.price}</div>
						<div
							className='select-btn'
							onClick={() => handleOpen(item?.package_id)}
						>
							Select
						</div>
					</div>
					<div className='description'>{item?.description}</div>
					<div className='options'>
						{item?.metas?.map(
							list =>
								list?.value !== "" &&
								list?.value !== "off" && (
									<>
										<i class='fas fa-check'></i>
										<div className='title'>{list?.title}</div>
									</>
								)
						)}
					</div>
				</div>
			))}

			<div className='select-package-footer'>
				<div className='back-btn' onClick={handleBack}>
					Back
				</div>
			</div>
		</div>
	);
}

export default SelectPackage;
