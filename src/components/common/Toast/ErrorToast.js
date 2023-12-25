import { makeStyles, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Alert(props) {
  return <MuiAlert elevation={3} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
  },
}));

function ErrorToast() {
  const error = useSelector((state) => state.error);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    error.message && setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  }, [error.message]);
  return (
    <div>
      <Snackbar
        className={classes.root}
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          color="error"
          message="Error"
        >
          {typeof error.message === "string" ||
          error.message instanceof String
            ? error.message
            : "Error Occured"}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ErrorToast;
