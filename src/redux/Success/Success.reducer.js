import * as actions from './Success.type';

const inititalState = {
    message : null

}

export const successReducer = ( state = inititalState, action) =>{

    switch(action.type){
        case actions.GET_SUCCESS :
            return{
                message: action.payload.message,
               
            };

        case actions.CLEAR_SUCCESS :
            return{
                message: {},
               
            };
        
        default:
            return state;
    }
}