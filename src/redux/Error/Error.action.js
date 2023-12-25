import * as actions from './Error.type';

export const returnErrors = (message, status, id = null)=> (dispatch) =>{
    dispatch({
        type: actions.GET_ERRORS,
        payload: {message, status, id}
    })
    setTimeout(() => dispatch(clearErrors()),3000);
};

export const clearErrors = () =>{
    return{
        type: actions.CLEAR_ERRORS
    }
};