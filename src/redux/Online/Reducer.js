import * as actions from "./Type";

const inititalState = {
  members: {},
  me: {},
};

export const onlineReducer = (state = inititalState, action) => {
  switch (action.type) {
    case actions.FETCH_SUBSCRIBED_USERS:
      return {...state,
        members: action.payload.members,
        me: action.payload.me,
      };

    case actions.FETCH_ADDED_USERS:
      return {
        ...state,
        members: { ...state.members, [action.payload.id]: action.payload.info },
      };

    case actions.FETCH_REMOVED_USERS:
      return {
        ...state,
        members: { ...state.members, [action.payload.id]: null },
      };
    default:
      return state;
  }
};
