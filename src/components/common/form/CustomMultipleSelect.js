import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import React , {useState} from "react";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Chip, Input, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: `${theme.spacing(1)}px  0`,
    minWidth: 120,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



function CustomMultipleSelect({ label, name, formik, options, ...rest }) {
  const classes = useStyles();
  const [singleName, setSingleName] = useState([]);
  const handleChange = (event) => {
    setSingleName(event.target.value);
  };

  const MultipleChange = (e) => {
    handleChange(e);
    formik.handleChange(e);
  };
  return (
    <FormControl variant="outlined" className={classes.formControl} fullWidth>
      <InputLabel id={`demo-mutiple-chip-label-${name}`}>{label}</InputLabel>
      <Select
        labelId={`demo-mutiple-chip-label-${name}`}
        id="demo-mutiple-chip"
        multiple
        name={name}
        value={singleName}
        onChange={MultipleChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((value) => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helpetext={formik.touched[name] && formik.errors[name]}
        MenuProps={MenuProps}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CustomMultipleSelect;
