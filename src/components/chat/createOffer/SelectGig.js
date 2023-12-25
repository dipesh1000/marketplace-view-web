import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {openModal} from "../../../redux/Modal/Modal.action";
import ContainerSpinner from "../../common/ContainerSpinner/ContainerSpinner";
import {fetchChatGig, fetchOfferOption} from "./redux/Action";
import "./style/style.scss";

function SelectGig({chatRoom}) {
	const dispatch = useDispatch();
	const handleModal = (id, gigId) => {
		dispatch(fetchOfferOption(id));
		dispatch(openModal("createOffer", {gigId: gigId, chatRoom: chatRoom}));
	};

	useEffect(() => {
		dispatch(fetchChatGig());
		// eslint-disable-next-line
	}, []);

	const {chatGig, isLoading} = useSelector(state => state.chatOffer);
	return isLoading ? (
		<ContainerSpinner height='300px' />
	) : (
		<div className='select-gig'>
			{chatGig?.map(item => (
				<div
					className='select-item'
					onClick={() => handleModal(item?.category_id, item?.id)}
					key={item?.id}
				>
					<div className='img-wrapper'>
						<img
							src={
								item?.gig_images
									? item?.gig_images[Object.keys(item?.gig_images)[0]]?.url
											?.resize
									: ""
							}
							alt=''
						/>
					</div>
					<div className='title'>{item?.title}</div>
				</div>
			))}
		</div>
	);
}

export default SelectGig;
