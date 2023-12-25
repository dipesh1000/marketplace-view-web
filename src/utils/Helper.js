import moment from "moment";
import Store from "../redux/store";

export const getAgo = (date, check = true) => {
  return moment(date).fromNow(check);
};

export const checkGigUser = (gigUser) => {
  const { auth } = Store.getState();
  if (auth?.user?.username === gigUser) {
    return true;
  } else {
    return false;
  }
};

export const checkActiveUser = (userId) => {
  const { online } = Store.getState();

  return online?.members && online?.members[userId] ? true : false;
};
