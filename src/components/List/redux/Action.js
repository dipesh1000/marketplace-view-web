import {
  fetchWishlistApi,
  postGigApi,
  postSellerApi,
} from "../../../api/Wishlist/WishlistApi";
import { returnSuccess } from "../../../redux/Success/Success.action";
import { fetchUserMessage } from "../../chat/redux/Action";
import { fetchGigByCategory } from "../../GigList/redux/Action";
import { getSingleGigDetails } from "../../GigSingle/redux/Action";
import { fetchFreelancerInfo } from "../../Profile/Freelancer/redux/Action";
import { postSearch } from "../../Search/redux/Action";
import { fetchTags } from "../../Tags/redux/Action";
import { getTempGigList } from "../../userHome/redux/Action";
import * as actions from "./Type";

export const fetchWishlist = () => (dispatch) => {
  dispatch({
    type: actions.FETCH_WISHLIST_BEGIN,
  });
  fetchWishlistApi()
    .then((res) => {
      dispatch({
        type: actions.FETCH_WISHLIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: actions.FETCH_WISHLIST_ERROR,
      })
    );
};

export const postSeller =
  (data, user = null) =>
  (dispatch) => {
    postSellerApi(data)
      .then((res) => {
        dispatch({
          type: actions.POST_WISHLIST_SUCCESS,
        });
        dispatch(returnSuccess(res.data));
        dispatch(fetchWishlist());
        // user && dispatch(fetchFreelancerInfo(user));
      })
      .catch((err) =>
        dispatch({
          type: actions.POST_WISHLIST_ERROR,
        })
      );
  };

export const postGig = (data, fetchType, postData) => (dispatch) => {
  postGigApi(data)
    .then((res) => {
      dispatch({
        type: actions.POST_WISHLIST_SUCCESS,
      });
      dispatch(returnSuccess(res.data));
      if (fetchType === "indexPage") dispatch(getTempGigList());
      else if (fetchType === "wishlist") dispatch(fetchWishlist());
      else if (fetchType === "freelancer" && postData)
        dispatch(fetchFreelancerInfo(postData));
      else if (fetchType === "singleGig")
        dispatch(getSingleGigDetails(postData));
      else if (fetchType === "categoryCard")
        dispatch(fetchGigByCategory(postData));
      else if (fetchType === "searchCard") dispatch(postSearch(postData));
      else if (fetchType === "user_services")
        dispatch(fetchUserMessage({ chat_room_id: postData, page: 1 }));
      else if (fetchType === "tags") dispatch(fetchTags(postData));
    })
    .catch((err) =>
      dispatch({
        type: actions.POST_WISHLIST_ERROR,
      })
    );
};
