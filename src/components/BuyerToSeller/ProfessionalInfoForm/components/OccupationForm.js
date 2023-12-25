import React, { useEffect } from "react";
import styles from "../styles.module.css";
import OccupationRepeater from "./OccupationRepeater";

const OccupationForm = ({ newInitialValue, setNewInitialvalue, form }) => {
  useEffect(() => {
    if (form.values.occupation.length === 0) {
      let occupationValue = form.values.occupation;
      occupationValue.push({
        category_id: "",
        from: "",
        to: "",
        child_category_id: [],
      });
      form.setFieldValue("occupation", occupationValue);
    }
    // eslint-disable-next-line
  }, [form.values.occupation]);

  const handleAdd = () => {
    let occupationValue = form.values.occupation;
    occupationValue.push({
      category_id: "",
      from: "",
      to: "",
      child_category_id: [],
    });
    form.setFieldValue("occupation", occupationValue);
  };
  return (
    <>
      {form.values.occupation.map((item, index) => (
        <OccupationRepeater
          form={form}
          index={index}
          item={item}
          keyLoop={index}
          key={item.id}
        />
      ))}
      {form.values.occupation.length < 2 &&
      form.values?.occupation[0]?.category_id ? (
        <span type="reset" className={styles.addNewBtn} onClick={handleAdd}>
          + Add New{" "}
        </span>
      ) : (
        ""
      )}
    </>
  );
};

export default OccupationForm;
