import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";
// import {getIn} from "formik";

function CustomTextEditor({ form, field, name, height, errorName }) {
  const handleEditorChange = (content) => {
    form.setFieldValue(field.name, content);
  };

  // const errorText =
  // 	getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <>
      <Editor
        apiKey={process.env.REACT_APP_TINY_MCE}
        value={form.values && form.values[field.name]}
        name={field.name}
        init={{
          height: height,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            // eslint-disable-next-line
            "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
        }}
        onEditorChange={(e) => handleEditorChange(e)}
      />
      <div
        className="errors"
        style={{
          color: "#f53e3e",
          fontSize: "12px",
        }}
      >
        {form?.errors?.description}
      </div>
    </>
  );
}

CustomTextEditor.propType = {
  name: PropTypes.string.isRequired,
  height: PropTypes.string,
};
CustomTextEditor.defaultProps = {
  height: 300,
};
export default CustomTextEditor;
