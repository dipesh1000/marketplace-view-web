import {getSellerDashboardApi} from "../../../api/SellerDashboard/SellerDashboardApi"
import * as actions from "./Type";

export const getSellerDashboard = () => dispatch => {
    dispatch({
        type: actions.FETCH_SELLERDASHBOARD_BEGIN
    })
    getSellerDashboardApi()
    .then(res => {
        dispatch({
            type: actions.FETCH_SELLERDASHBOARD_SUCCESS,
            payload: res.data.data
        });
    })
    .catch(err => {
        dispatch({
            type: actions.FETCH_SELLERDASHBOARD_ERROR
        });
    })

}