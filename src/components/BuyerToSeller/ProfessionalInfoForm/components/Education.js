import React, { useState } from "react";
import styles from "../styles.module.css";
import { Col, Row } from "react-bootstrap";
import EducationTable from "../../../Table/LanguageTable/EducationTable";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";

const eduTitleList = [
  { id: "Associate", value: "Associate" },
  { id: "B.A.", value: "B.A." },
  { id: "B.Sc.", value: "B.Sc." },
  { id: "M.A.", value: "M.A." },
  { id: "M.B.A.", value: "M.B.A." },
  { id: "M.Sc.", value: "M.Sc." },
  { id: "J.D.", value: "J.D." },
  { id: "M.D.", value: "M.D." },
  { id: "Ph.D.", value: "Ph.D." },
  { id: "BArch", value: "BArch" },
  { id: "BM", value: "BM" },
  { id: "BFA", value: "BFA" },
  { id: "MFA", value: "MFA" },
  { id: "Certificate", value: "Certificate" },
  { id: "LLB", value: "LLB" },
  { id: "LLM", value: "LLM" },
  { id: "Other", value: "Other" },
];

function Education({ form }) {
  const dataList = new Date().getFullYear();
  const years = Array.from(new Array(52), (val, index) => dataList - index);
  const optionsYear = years?.map((year, index) => ({
    id: year,
    name: year,
    value: year,
  }));

  const { universities } = useSelector((state) => state.professionalInfo);
  const countryList = useSelector((state) => state.countryList);

  const allCountryList = countryList?.data?.map((item) => ({
    id: item.code,
    value: item.title,
  }));

  const [show, setShow] = useState(false);
  const [country, setCountry] = useState();
  const [college, setCollege] = useState();
  const [title, setTitle] = useState();
  const [major, setMajor] = useState();
  const [year, setYear] = useState();
  const [edit, setEdit] = useState();
  // eslint-disable-next-line
  const [error, setError] = useState();

  const handleShow = () => {
    setShow((prev) => !prev);
    setCountry(allCountryList[0].value);
    setCollege();
    setTitle(eduTitleList[0].value);
    setMajor();
    setYear(optionsYear[0].value);
    setError();
    setEdit();
  };

  const canAdd = () => {
    if (country && college && title && major && year) return true;
    return false;
  };

  const handleChange = (name, e) => {
    if (name === "country") {
      setCountry(e.target.value);
    }
    if (name === "college") {
      setCollege(e.value);
    }
    if (name === "title") {
      setTitle(e.target.value);
    }
    if (name === "major") {
      setMajor(e.target.value);
    }
    if (name === "year") {
      setYear(e.target.value);
    }
  };

  const handleAdd = () => {
    if (!country || !college || !title || /[^a-zA-Z\s]/.test(major) || !year) {
      setError("Please Select Required Fields");
      return;
    }
    let value = form.values.education;
    value.push({
      country: country,
      college: college,
      title: title,
      major: major,
      year: year,
    });
    form.setFieldValue("education", value);
    handleShow();
  };

  const handleEdit = (index) => {
    setShow(true);
    let data = form.values.education;
    setCountry(data[index].country);
    setCollege(data[index].college);
    setTitle(data[index].title);
    setMajor(data[index].major);
    setYear(data[index].year);
    setEdit(index);
  };

  const handleUpdate = () => {
    if (!country || !college || !title || /[^a-zA-Z\s]/.test(major) || !year) {
      setError("Please Select Required Fields");
      return;
    }
    let value = form.values.education;
    value[edit].country = country;
    value[edit].college = college;
    value[edit].title = title;
    value[edit].major = major;
    value[edit].year = year;
    form.setFieldValue("education", value);
    handleShow();
  };

  const handleDelete = (index) => {
    let value = form.values.education;
    value = value.filter((item, key) => key !== index);
    form.setFieldValue("education", value);
  };

  return (
    <>
      {show ? (
        <div className={styles.selectorWrapper}>
          <Row>
            <Col md={6}>
              <CustomSellerSelect
                name="country"
                classprop={`${styles.selectxl} ${styles.select}`}
                options={allCountryList}
                handleChange={handleChange}
                value={country}
              />
              {/* <KeyboardArrowDownIcon fontSize="small" className={styles.arrowIcon} /> */}
            </Col>
            <Col md={6} className="pl-0">
              <CreateSelect
                name="college"
                universities={universities}
                handleChange={handleChange}
                value={college}
              />
            </Col>
          </Row>
          <Row className="pt-2">
            <Col md={2} className={`pr-0 customSellerBorder`}>
              <CustomSellerSelect
                name="title"
                options={eduTitleList}
                handleChange={handleChange}
                value={title}
                classprop={`${styles.selectxs} ${styles.select}`}
              />
              {/* <KeyboardArrowDownIcon fontSize="small" className={styles.arrowIcon} /> */}
            </Col>
            <Col md={8} className="pl-0">
              <CustomSellerInput
                name="major"
                handleChange={handleChange}
                placeholder="College/University Name"
                value={major}
              />
            </Col>
            <Col md={2} className="pl-0">
              <CustomSellerSelect
                options={optionsYear}
                name="year"
                handleChange={handleChange}
                value={year}
                classprop={`${styles.selectxs} ${styles.select}`}
              />
              {/* <KeyboardArrowDownIcon fontSize="small" className={styles.arrowIcon} /> */}
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
                    styles.RepeaterBtnAdd + " " + (canAdd() && styles.btnGreen)
                  }
                  onClick={handleAdd}
                >
                  Add
                </span>
              </div>
            ) : (
              <div className={styles.buttonEdu}>
                <span
                  type="reset"
                  className={
                    styles.RepeaterBtnAdd + " " + (canAdd() && styles.btnGreen)
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

      <EducationTable
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleShow={handleShow}
        form={form}
      />
    </>
  );
}

export default Education;

const CustomSellerSelect = ({
  name,
  options,
  handleChange,
  classprop,
  value,
}) => {
  return (
    <Form.Control
      as="select"
      name={name}
      onChange={(e) => handleChange(name, e)}
      value={value}
      className={classprop}
    >
      {options?.map((item, index) => (
        <option value={item.id}> {item.value} </option>
      ))}
    </Form.Control>
  );
};

const CreateSelect = ({ name, handleChange, universities, value }) => {
  return (
    <>
      <CreatableSelect
        name={name}
        className="creatableField"
        placeholder="Select University"
        options={universities.map((university) => ({
          value: university,
          label: university,
        }))}
        value={value ? { value: value, label: value } : null}
        onChange={(e) => handleChange(name, e)}
      />
    </>
  );
};

const CustomSellerInput = ({ name, handleChange, value }) => {
  return (
    <Form.Group controlId="formGroupEmail">
      <Form.Control
        className="formControl"
        name={name}
        type="text"
        value={value}
        placeholder="Your Major Subject"
        onChange={(e) => handleChange(name, e)}
      />
    </Form.Group>
  );
};
