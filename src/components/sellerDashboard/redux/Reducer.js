import * as actions from './Type';

const initialState = {
    loading: false,
    sidebarData: null
}

export const sellerDashboardReducer = (state = initialState, action) => {
    switch(action.type){
        case actions.FETCH_SELLERDASHBOARD_BEGIN:
            return{...state, loading: true}
        
        case actions.FETCH_SELLERDASHBOARD_SUCCESS:
            return{
                ...state,
                loading: false,
                sidebarData: action.payload
            }
        case actions.FETCH_SELLERDASHBOARD_ERROR:
            return{
                ...state,
                loading: false
            }    
        default: 
            return state;
    }
}