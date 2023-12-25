import React from "react";
import PropTypes from "prop-types";

function CustomUpload({ children, label, field, images, form }) {
  // const errorText =
  //   getIn(form.touched, field.name) && getIn(form.errors, field.name);

  // const [fileName, setFileName] = useState("");
  // const [fileUrl, setFileUrl] = useState("");
  // const fileRead = (myFile) => {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(myFile);
  //   reader.onloadend = () => {
  //     setFileUrl(reader.result);
  //   };
  // };
  // useEffect(() => {

  //   form.values.image[`${field.name}`] && setFileName(form.values.image[`${field.name}`].name);
  //   form.values.image[`${field.name}`] && fileRead(form.values.image[`${field.name}`]);
  //   setFileUrl('');
  //   if(images && images[`${field.name}`] ) setFileUrl(images[`${field.name}`]);
  // }, [form.values.image[`${field.name}`]]);
  return (
    <>
      {/* <FormControl fullWidth className={classes.root}>
        <input
          className={classes.input}
          name={`image[${field.name}]`}
          id={`icon-button-file-${field.name}`}
          onChange={(event) => {
            form.setFieldValue(`image[${field.name}]`, event.target.files[0]);
          }}
          type="file"
          aria-describedby="my-helper-text"
        />
        <div  overflow="hidden">
          <label htmlFor={`icon-button-file-${field.name}`} className={classes.label}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
            {fileName ? `${label}:${fileName}` : label}
          </label>
        </div>
      </FormControl>
      <Box component="div" textAlign="center" >

      <img src={fileUrl} className={classes.imgfile} />
      </Box>
      {errorText && (
          <FormHelperText id="my-helper-text" className={classes.helpertext}>
            {/* {form.errors.image[field.name]} */}
      {/* {errorText} */}
      {/* </FormHelperText> */}
      {/* )} */}

      <label className="custom-file-upload">
        <input
          type="file"
          style={{ display: "none" }}
          name={`image[${field.name}]`}
          onChange={(event) => {
            form.setFieldValue(field.name, event.target.files[0]);
          }}
        />

        {label}
        {children}
      </label>
    </>
  );
}

CustomUpload.propTypes = {
  label: PropTypes.string,
};

export default CustomUpload;
