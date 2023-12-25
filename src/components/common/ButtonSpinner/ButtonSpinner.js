import React from "react";
import { Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import "./Style.css";

function ButtonSpinner({ variant, animation, size, className }) {
  return (
    <div className="spinner-wrap">
      <Spinner
        size={size}
        animation={animation}
        variant={variant}
        className={`spinner ${className}`}
      />
    </div>
  );
}
ButtonSpinner.propTypes = {
  variant: PropTypes.string,
  animation: PropTypes.string,
};
ButtonSpinner.defaultProps = {
  variant: "light",
  animation: "border",
};

export default ButtonSpinner;
