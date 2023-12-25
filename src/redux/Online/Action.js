import * as actions from './Type';

export const fetchSubscribedUsers =(data)=>(dispatch)=>{
  dispatch({
    type: actions.FETCH_SUBSCRIBED_USERS,
    payload: data
  })
}

export const fetchAddedUsers =(data) => (dispatch)=>{
  dispatch({
    type: actions.FETCH_ADDED_USERS,
    payload: data
  })
}

export const fetchRemovedUsers = (data) => (dispatch) => {
  dispatch({
    type: actions.FETCH_ADDED_USERS,
    payload: data,
  });
};