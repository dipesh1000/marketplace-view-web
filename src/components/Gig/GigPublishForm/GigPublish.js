import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router";
import {Link} from "react-router-dom";
import {hideSpinner, showSpinner} from "../../common/Spinner/redux/Action";
import {fetchsingleGig} from "../GigPage/redux/Action";
import {publishGig} from "./redux/Action";
import "./style/GigPublish.scss";

function GigPublishAdd() {
	const dispatch = useDispatch();

	const {slug} = useParams();
	useEffect(() => {
		dispatch(fetchsingleGig(slug));
		dispatch(hideSpinner());
		// eslint-disable-next-line
	}, []);
	const {singleGig} = useSelector(state => state.gig);

	const history = useHistory();
	const handleHistory = () => {
		history.push(`/users/seller_dashboard/manage_gigs/${slug}/gigs_complete`);
	};
	const handleSubmit = () => {
		dispatch(showSpinner());
		dispatch(publishGig({step: "publish"}, singleGig.id, handleHistory));
		// handleHistory();
	};

	return (
		<div className='publish'>
			<div className='publish-wrapper'>
				<div className='main-title'>Almost there...</div>
				<div className='main-subtitle'>
					Let's publish your Gig and get <br /> some buyers rolling in.
				</div>
			</div>
			<div className='d-flex justify-content-between mt-4'>
				<Link to='/users/seller_dashboard/gigs' className='custom-btn cancel'>
					Cancel
				</Link>
				<button onClick={handleSubmit} className='custom-btn successBtn'>
					Publish
				</button>
			</div>
		</div>
	);
}

export default React.memo(GigPublishAdd);
