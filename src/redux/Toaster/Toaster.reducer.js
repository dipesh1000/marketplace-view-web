import { PlaylistAddOutlined } from '@material-ui/icons';
import * as actions from './Toaster.type';

const initialState = {
    toasterName: "",
    toasterStatus: true 
}
export default (state = initialState, action) => {
    switch (action.type) {
        case actions.OPEN_TOASTER: 
         return {
            toasterStatus: true,
            toasterName: state.payload
         };

        case actions.CLOSE_TOASTER:
        return  {
            ...state,
            toasterStatus: false
        }
    }
}