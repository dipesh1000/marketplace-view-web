import {  updateFaqApi } from '../../../../api/Gig/GigFaqApi';
import { hideSpinner, showSpinner } from '../../../common/Spinner/redux/Action';



export const updateGigFaq = (data, id, handleHistory) => (dispatch) => {
  dispatch(showSpinner());
    updateFaqApi(data, id).then((res) => {
      dispatch(hideSpinner());
      handleHistory();
    });
  };