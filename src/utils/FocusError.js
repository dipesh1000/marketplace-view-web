import React, { useEffect } from "react";
import { useFormikContext } from "formik";

const FocusError = () => {
  const { errors, isSubmitting, isValidating } = useFormikContext();

  useEffect(() => {
    if (isSubmitting && !isValidating) {
      let keys = Object.keys(errors);
      if (keys.length > 0) {
        const selector = "[class=error-message]";
        const errorElement =
          document.querySelector(selector) ??
          document.querySelector(`[name*=${keys[0]}]`);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
          errorElement.focus({ preventScroll: true });
        }
      }
    }
  }, [errors, isSubmitting, isValidating]);
  return <></>;
};

export default FocusError;
