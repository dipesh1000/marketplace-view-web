import { makeStyles, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Alert(props) {
  return <MuiAlert elevation={3} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
  },
}));

function SuccessToast() {
  const success = useSelector((state) => state.success);
  // const classes = useStyles();
  // const [open, setOpen] = useState(false);
  // const handleClose = () => {
  //   setOpen(false);
  // };
  useEffect(() => {
    const notify = () => toast.success(success.message); 
    // success.message && setOpen(true);
  
  }, [success.message]);
  return (
    <div>
      
        {/* <button onClick={notify}>Notify!</button> */}
        <ToastContainer />
    </div>
      // <Snackbar
      //   className={classes.root}
      //   open={open}
      //   anchorOrigin={{ vertical: "top", horizontal: "right" }}
      // >
      //   <Alert
      //     onClose={handleClose}
      //     severity="success"
      //     color="success"
      //     message="Success"
      //   >
      //     {typeof success.message === "string" ||
      //     success.message instanceof String
      //       ? success.message
      //       : "Successfully Completed"}
      //   </Alert>
      // </Snackbar>
  );
}

export default SuccessToast;
