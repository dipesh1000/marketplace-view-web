import * as actions from './Country.types';
import { getAllCountry } from '../../api/Country/Countryapi';



export const getCountryList = () => (dispatch) => {
    dispatch({ type: actions.COUNTRY_LOADING });
    getAllCountry()
        .then((res) => {
            dispatch({
                type: actions.COUNTRY_SUCCESS,
                payload: res.data.data.countries
            })
        })
        .catch((error) => {
            console.log(error);
            dispatch({ type: actions.COUNTRY_ERROR,
                    error: error
            })
        })
}