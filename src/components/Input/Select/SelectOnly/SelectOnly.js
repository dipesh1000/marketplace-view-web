import React from "react";
import styles from "./styles.module.css";
function SelectOnly({ values, name, selectHandleChange, options, handleBlur }) {
  return (
    <>
      <select
        name={name}
        className={styles.SelectOnly}
        onChange={selectHandleChange}
        style={{ display: "block" }}
      >
        {!options.length ? (
          <>"No post"</>
        ) : (
          options.map((data) => {
            return (
              <option value={data?.value} key={data.id} label={data.name} />
            );
          })
        )}
      </select>
    </>
  );
}

export default SelectOnly;
