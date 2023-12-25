import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import React from "react";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { FormHelperText, MenuItem } from "@material-ui/core";
import { getIn } from "formik";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  input: {
    "& .MuiOutlinedInput-input": {
      padding: theme.spacing(2),
    },
  },
  childSelect: {
    paddingLeft: theme.spacing(4),
  },
  grandChild: {
    paddingLeft: theme.spacing(8),
  },
}));

function CustomNestedSelect({
  label,
  defaultValue,
  options,
  field,
  form,
  ...props
}) {
  const classes = useStyles();
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <FormControl variant="outlined" className={classes.formControl} fullWidth>
      <InputLabel id={`outlined-age-native-simple-${field.name}`}>
        {label}
      </InputLabel>
      <Select
        labelId={`outlined-age-native-simple-${field.name}`}
        label={label}
        className={classes.input}
        error={!!errorText}
        {...field}
        {...props}
      >
        <MenuItem value={defaultValue ? defaultValue : ""}>
          <em>None</em>
        </MenuItem>

        {options &&
          options.map((option, index) => {
            return [
              <MenuItem value={option.value} key={index}>
                {option.label}
              </MenuItem>,
              option?.child?.map((option, index) => {
                return [
                  <MenuItem
                    value={option.value}
                    className={classes.childSelect}
                    key={index}
                  >
                    {option.label}
                  </MenuItem>,
                  option?.child?.map((option, index) => (
                    <MenuItem
                      value={option.value}
                      className={classes.grandChild}
                      key={index}
                      disabled
                    >
                      {option.label}
                    </MenuItem>
                  )),
                ];
              }),
            ];
          })}
      </Select>

      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  );
}

export default CustomNestedSelect;
