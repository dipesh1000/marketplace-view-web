import * as actions from "./Type";

const initialState = {
  isLoading: false,
  data: null,
  review: null,
  filterData: { sort_name: "Most Relevant", sort_by: "most_relevant" },
  reviewLoading: false,
};

export const freelancerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_FREELANCER_SUCCESS:
      return { ...state, data: action.payload, isLoading: false };

    case actions.FETCH_FREELANCER_BEGIN:
      return { ...state, isLoading: true };

    case actions.FETCH_FREELANCER_ERROR:
      return { ...state, isLoading: false };

    case actions.FETCH_FREELANCER_REVIEW_SUCCESS:
      return {
        ...state,
        review: action.payload.feedbacks,
        reviewLoading: false,
      };

    case actions.FETCH_FREELANCER_REVIEW_BEGIN:
      return { ...state, reviewLoading: true };

    case actions.FETCH_FREELANCER_REVIEW_ERROR:
      return { ...state, reviewLoading: false };

    default:
      return state;
  }
};
