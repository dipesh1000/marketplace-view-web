import {
	getFreelancerApi,
	getFreelancerReview,
} from "../../../../api/FreeLancer/FreeLancerApi";
import * as actions from "./Type";

export const fetchFreelancerInfo = user => dispatch => {
	dispatch({
		type: actions.FETCH_FREELANCER_BEGIN,
	});
	getFreelancerApi(user)
		.then(res => {
			dispatch({
				type: actions.FETCH_FREELANCER_SUCCESS,
				payload: res.data.data,
			});
		})
		.catch(err =>
			dispatch({
				type: actions.FETCH_FREELANCER_ERROR,
			})
		);
};

export const fetchFreelancerReview = (user, filterData) => dispatch => {
	dispatch({
		type: actions.FETCH_FREELANCER_REVIEW_BEGIN,
	});
	getFreelancerReview(user, filterData)
		.then(res => {
			dispatch({
				type: actions.FETCH_FREELANCER_REVIEW_SUCCESS,
				payload: res.data.data,
			});
		})
		.catch(err =>
			dispatch({
				type: actions.FETCH_FREELANCER_REVIEW_ERROR,
			})
		);
};
