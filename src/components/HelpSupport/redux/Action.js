import {
	getHelpInfo,
	postHelpInfo,
} from "../../../api/HelpSupport/HelpSupportApi";
import {returnSuccess} from "../../../redux/Success/Success.action";
import * as actions from "./Type";

export const fetchHelpInfo = () => dispatch => {
	dispatch({
		type: actions.FETCH_HELP_BEGIN,
	});
	getHelpInfo()
		.then(res => {
			dispatch({
				type: actions.FETCH_HELP_SUCCESS,
				payload: res.data,
			});
		})
		.catch(err =>
			dispatch({
				type: actions.FETCH_HELP_ERROR,
			})
		);
};

export const createHelpInfo = data => dispatch => {
	postHelpInfo(data)
		.then(res => {
			dispatch({
				type: actions.POST_HELP_SUCCESS,
			});
			dispatch(returnSuccess(res.data));
		})
		.catch(err =>
			dispatch({
				type: actions.POST_HELP_ERROR,
			})
		);
};
