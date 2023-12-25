import {fetchSearchApi, postSearchApi} from "../../../api/Search/SearchApi";
import * as actions from "./Type";

export const postSearch = data => dispatch => {
	dispatch({
		type: actions.POST_SEARCH_BEGIN,
	});
	postSearchApi(data)
		.then(res => {
			dispatch({
				type: actions.POST_SEARCH_SUCCESS,
				payload: res.data.data,
			});
		})
		.catch(err =>
			dispatch({
				type: actions.POST_SEARCH_ERROR,
			})
		);
	dispatch(setFilterData(data));
};

export const fetchSearch = data => dispatch => {
	dispatch({
		type: actions.FETCH_SEARCH_BEGIN,
	});
	fetchSearchApi(data)
		.then(res => {
			dispatch({
				type: actions.FETCH_SEARCH_SUCCESS,
				payload: res.data,
			});
		})
		.catch(err =>
			dispatch({
				type: actions.FETCH_SEARCH_ERROR,
			})
		);
};

export const setFilterData = data => dispatch => {
	dispatch({
		type: actions.SET_FILTERDATA_SUCCESS,
		payload: data,
	});
};
