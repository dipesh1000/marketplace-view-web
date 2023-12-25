import React, { useState } from "react";
import "./ImageField.css";

function ImageField({ field, form }) {
  const [{ alt, src }, setImg] = useState(
    form.values?.profile_preview
      ? {
          src:
            form.values?.profile_preview?.url?.full ||
            form.values?.profile_preview?.src,
          alt: form.values?.profile_preview?.alt,
        }
      : {
          src: process.env.PUBLIC_URL + "/profileimg.png",
          alt: "Upload an Image",
        }
  );
  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
      form.setFieldValue("profile_image", e.target.files[0]);
      // setNewInitialValue({...newInitialValue, profile_image: e.target.files[0]})
    }
  };
  return (
    <>
      <input
        type="file"
        name={field.name}
        className="visually-hidden"
        id="photo"
        onChange={(e) => handleImg(e)}
      />
      {/* {form.touched && form.error && (
                    <div className="error">{form.error}</div>
                )} */}
      <label htmlFor="photo" className="form-img__file-label">
        <svg
          width="150"
          height="150"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#56ceef"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
          <circle cx="12" cy="10" r="3" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      </label>

      <img
        src={src}
        alt={alt}
        className="form-img__img-preview"
        style={{ objectFit: "cover" }}
      />
    </>
  );
}

export default ImageField;
