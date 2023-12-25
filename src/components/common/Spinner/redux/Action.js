import * as actions from './Type'

export const showSpinner =()=>(dispatch)=>{
    dispatch({
        type: actions.SHOW_SPINNER
    })
}
export const hideSpinner = ()=> (dispatch) =>{
    dispatch ({
        type: actions.HIDE_SPINNER
    })
}