import * as actions from './Error.type';

const inititalState = {
    message : {},
    status: null,
    id: null

}

export const errorReducer = ( state = inititalState, action) =>{

    switch(action.type){
        case actions.GET_ERRORS :
            return{
                message: action.payload.message,
                status: action.payload.status,
                id: action.payload.id
            };

        case actions.CLEAR_ERRORS :
            return{
                data: {},
                status: null,
                id: null
            };
        
        default:
            return state;
    }
}