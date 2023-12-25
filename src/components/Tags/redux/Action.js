import { fetchTagsApi } from "../../../api/Tags/TagsApi";
import * as actions from "./Type";

export const fetchTags = (data) => (dispatch) => {
  dispatch({
    type: actions.FETCH_TAGS_BEGIN,
  });
  fetchTagsApi(data)
    .then((res) => {
      dispatch({
        type: actions.FETCH_TAGS_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: actions.FETCH_TAGS_ERROR,
      })
    );
};
