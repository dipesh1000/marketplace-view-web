import { ErrorMessage } from "formik";
import React from "react";

function FileUpload({ form, CustomUpload }) {
  let fileCount = form.values?.files?.length;

  const handleDelete = (count) => {
    form.setFieldValue(
      `files`,
      form.values?.files?.filter((item, index) => index !== count)
    );
  };

  return (
    <>
      {form.values?.files?.length > 0 && (
        <div className="uploaded-files-wrap">
          {form.values?.files?.map((item, index) => (
            <div className="upload-container solid" key={index}>
              <div className="order-file-details">
                <i className="far fa-check-circle"></i>
                <div className="name">"{item.name}"</div>
              </div>
              <div className="delete">
                <i
                  className="fa fa-trash"
                  onClick={() => handleDelete(index)}
                ></i>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="upload-container-file dashed ">
        <div className="file-type image"></div>
        <CustomUpload
          name={`files[${fileCount}]`}
          label={
            <span>
              <i class="fas fa-paperclip"></i> Attach Files
            </span>
          }
        />
      </div>
      <ErrorMessage
        name="attachments"
        render={(msg) => <span className="error-message">{msg}</span>}
      />
    </>
  );
}

export default FileUpload;
