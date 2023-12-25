import * as actions from './Type'

const initialState = {
    show: false
}


export const spinnerReducer = (state = initialState, action)=>{
    switch(action.type){
        case actions.SHOW_SPINNER: 
         return {...state, show : true}
        case actions.HIDE_SPINNER:
            return {...state, show: false}
        default:
            return state;
    }
    
}