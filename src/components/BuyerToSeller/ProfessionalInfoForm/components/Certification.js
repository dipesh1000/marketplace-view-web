import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "../styles.module.css";
import "../style.scss";
import CertificateTable from "../../../Table/LanguageTable/CertificateTable";
import { Form } from "react-bootstrap";

function Certification({ form }) {
  const dataList = new Date().getFullYear();
  const years = Array.from(new Array(52), (val, index) => dataList - index);
  const optionsYear = years?.map((year, index) => ({
    id: year,
    name: year,
    value: year,
  }));

  const [show, setShow] = useState(false);
  const [award, setAward] = useState();
  const [awardFrom, setAwardFrom] = useState();
  const [year, setYear] = useState(optionsYear[0].value ?? "");
  // eslint-disable-next-line
  const [error, setError] = useState();
  const [edit, setEdit] = useState();

  const handleShow = () => {
    setShow((prev) => !prev);
    setAward();
    setAwardFrom();
    setYear(year);
    setError();
    setEdit();
  };

  const handleChange = (name, e) => {
    if (name === "award") {
      setAward(e.target.value);
    }
    if (name === "awardFrom") {
      setAwardFrom(e.target.value);
    }
    if (name === "year") {
      setYear(e.target.value);
    }
  };

  const handleAdd = () => {
    if (!award || !awardFrom || !year) {
      setError("Please Select Required Fields");
      return;
    }
    let value = form.values.certifications;
    value.push({
      award: award,
      award_from: awardFrom,
      year: year,
    });
    form.setFieldValue("certifications", value);
    handleShow();
  };
  const handleEdit = (index) => {
    setShow(true);
    let data = form.values.certifications;
    setAward(data[index].award);
    setAwardFrom(data[index].award_from);
    setYear(data[index].year);
    setEdit(index);
  };
  const handleUpdate = () => {
    if (!award || !awardFrom || !year) {
      setError("Please Select Required Fields");
      return;
    }

    let value = form.values.certifications;
    value[edit].award = award;
    value[edit].award_from = awardFrom;
    value[edit].year = year;
    form.setFieldValue("certifications", value);
    handleShow();
  };

  const handleDelete = (index) => {
    let value = form.values.certifications;
    value = value.filter((item, key) => key !== index);
    form.setFieldValue("certifications", value);
  };
  return (
    <>
      {show ? (
        <div className={styles.selectorWrapper}>
          <Row>
            <Col md={5}>
              <CustomSellerInput
                name="award"
                placeholder="Certificate Or Award"
                value={award}
                handleChange={handleChange}
              />
            </Col>
            <Col md={5} className="pl-0">
              <CustomSellerInput
                name="awardFrom"
                placeholder="Certified From (E.G. Adobe)"
                value={awardFrom}
                handleChange={handleChange}
              />
            </Col>
            <Col md={2} className="pl-0">
              <CustomSellerSelect
                name="year"
                options={optionsYear}
                handleChange={handleChange}
                value={year}
              />
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <div className={styles.buttonEdu}>
              <span
                type="reset"
                className={styles.RepeaterBtnCancel}
                onClick={handleShow}
              >
                Cancel
              </span>
            </div>
            {/* {error && <span className="text-danger">{error}</span>} */}
            {edit == null ? (
              <div className={`${styles.buttonEdu} pl-2`}>
                <span
                  type="reset"
                  className={
                    styles.RepeaterBtnCancel +
                    " " +
                    (award && awardFrom && year ? styles.btnGreen : "")
                  }
                  onClick={handleAdd}
                >
                  Add
                </span>
              </div>
            ) : (
              <div className={styles.buttonEdu}>
                <span
                  type="button"
                  className={
                    styles.RepeaterBtnCancel +
                    " " +
                    (award && awardFrom && year ? styles.btnGreen : "")
                  }
                  onClick={handleUpdate}
                >
                  Edit
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}

      <CertificateTable
        handleShow={handleShow}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        form={form}
      />
    </>
  );
}

export default Certification;

const CustomSellerInput = ({ name, handleChange, value, placeholder }) => {
  return (
    <Form.Group controlId="formGroupEmail">
      <Form.Control
        className="formControl"
        name={name}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(name, e)}
      />
    </Form.Group>
  );
};

const CustomSellerSelect = ({ name, options, handleChange, value }) => {
  return (
    <Form.Control
      as="select"
      name={name}
      onChange={(e) => handleChange(name, e)}
      value={value}
      className={`${styles.selectxs} ${styles.select}`}
    >
      {options?.map((item, index) => (
        <option value={item.id}> {item.value} </option>
      ))}
    </Form.Control>
  );
};
