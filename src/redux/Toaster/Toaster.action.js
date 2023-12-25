import * as actions from "./Toaster.type";

export const openToaster = (openToaster) => {
  return {
    type: actions.OPEN_TOASTER,
    payload: openToaster,
  };
};

export const closeToaster = () => {
  return {
    type: actions.CLOSE_TOASTER,
  };
};
