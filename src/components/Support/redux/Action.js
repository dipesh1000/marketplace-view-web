import { getFaqParentCategories, getFaqSingle, getFaqSubCategories } from '../../../api/FAQ/FaqApi';
import * as actions from './Type'

export const fetchFaqParent = () => dispatch => {
	dispatch({
		type: actions.FETCH_FAQ_PARENT_BEGIN,
	});
	getFaqParentCategories()
		.then(res => {
			dispatch({
				type: actions.FETCH_FAQ_PARENT_SUCCESS,
				payload: res.data.data,
			});
		})
		.catch(err =>
			dispatch({
				type: actions.FETCH_FAQ_PARENT_ERROR,
			})
		);
};

export const fetchFaqChild = (slug) => dispatch => {
	dispatch({
		type: actions.FETCH_FAQ_CHILD_BEGIN,
	});
	getFaqSubCategories(slug)
		.then(res => {
			dispatch({
				type: actions.FETCH_FAQ_CHILD_SUCCESS,
				payload: res.data.data,
			});
		})
		.catch(err =>
			dispatch({
				type: actions.FETCH_FAQ_CHILD_ERROR,
			})
		);
};

export const fetchFaqSingle = (slug) => dispatch => {
	dispatch({
		type: actions.FETCH_FAQ_SINGLE_BEGIN,
	});
	getFaqSingle(slug)
		.then(res => {
			dispatch({
				type: actions.FETCH_FAQ_SINGLE_SUCCESS,
				payload: res.data.data,
			});
		})
		.catch(err =>
			dispatch({
				type: actions.FETCH_FAQ_SINGLE_ERROR,
			})
		);
};