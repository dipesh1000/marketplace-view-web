import * as actions from "./Type";

const initialState = {
  loading: false,
  category: null,
  serviceType: null,
  searchTag: null,
  globalGigMeta: []
};

export const gigOverviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CATEGORY_FETCH_SUCCESS:
      return {
        ...state,
        category: action.payload.categories,
        serviceType: action.payload.servicetypes,
        loading: false,
      };

    case actions.CLEARGIGMETA:
      return { ...state, globalGigMeta: [] };
    case actions.CATEGORYGIGMETA_FETCH_SUCCESS:
      return {
        ...state,
        globalGigMeta: action.payload.categorygigmetas,
        loading: false,
      };
    case actions.SEARCHTAG_FETCH_SUCCESS:
      return {
        ...state,
        searchTag: action.payload.searchtags,
        loading: false,
      };
    // case actions.CATEGORYPACKAGEMETA_EDIT_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     serviceType: state.serviceType.map((item) =>
    //       item.id === action.payload.id ? action.payload : item
    //     ),
    //   };
    // case actions.CATEGORYPACKAGEMETA_DELETE_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     serviceType: state.serviceType.filter(
    //       (item) => item.id !== action.payload
    //     ),
    //   };

    case actions.CATEGORYGIGMETA_FETCH_BEGIN:
      return { ...state, loading: true };

    case actions.CATEGORYGIGMETA_FETCH_ERROR:
      return { ...state, loading: false };

    // case actions.CATEGORYPACKAGEMETA_DELETE_ERROR:

    // case actions.CATEGORYPACKAGEMETA_EDIT_ERROR:
    //   return { ...state, loading: false };
    // case actions.CATEGORYPACKAGEMETA_EDIT_BEGIN:
    // case actions.CATEGORYPACKAGEMETA_DELETE_BEGIN:
    //   return { ...state, loading: true };

    default:
      return state;
  }
};
