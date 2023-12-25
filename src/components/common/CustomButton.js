import React, { memo, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  
}));

function CustomButton({
  variant,
  children,
  spinner,
  startIcon,
  endIcon,
  color,
  onClick,
  ...rest
}) {
  const classes = useStyles();

  const loading = useSelector((state) => state.loading);
  useEffect(() => {}, [loading]);
  

  return (
    <div className={classes.wrapper}>
      <Button
        variant={variant}
        color={color}
        startIcon={startIcon}
        endIcon={endIcon}
        {...rest}
        disabled={loading.isLoading}
      >
        {children}
      </Button>
      {spinner &&  loading.isLoading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
}
CustomButton.defaultProps = {
  variant: "contained",
  color: "primary",
  spinner: false,
};
export default memo(CustomButton);
