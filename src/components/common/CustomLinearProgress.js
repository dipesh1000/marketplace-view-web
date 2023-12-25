import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme)=>({
  root: {
    width: "100%",
    marginBottom:  theme.spacing(3)
  },
}));

export default function CustomLinearProgress() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress color="primary" />
    </div>
  );
}
