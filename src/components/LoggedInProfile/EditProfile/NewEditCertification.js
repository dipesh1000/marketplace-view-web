import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import { updateProfileInfo } from "./redux/Action";
import { Brush, Trash } from "react-bootstrap-icons";

const NewEditCertification = () => {
  const dataList = new Date().getFullYear();
  const years = Array.from(new Array(52), (val, index) => dataList - index);
  const optionsYear = years?.map((year, index) => ({
    label: year,
    value: year,
  }));
  const { data } = useSelector((state) => state.editProfile);
  const [formData, setFormData] = useState([]);
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState(false);
  const [award, setAward] = useState();
  const [awardFrom, setAwardFrom] = useState();
  const [year, setYear] = useState();
  // eslint-disable-next-line
  const [placeholder, setPlaceholder] = useState(false);
  const [edit, setEdit] = useState();
  const [error, setError] = useState();
  // eslint-disable-next-line
  const [active, setActive] = useState();
  const dispatch = useDispatch();

  const onSubmit = () => {
    const values = {
      type: "certifications",
      certifications: formData,
    };
    dispatch(updateProfileInfo(values));
    setUpdate(false);
  };

  useEffect(() => {
    data?.professional?.certifications &&
      setFormData(data.professional.certifications);
  }, [data?.professional?.certifications]);

  const handleShow = () => {
    setShow((prev) => !prev);
    setAward();
    setAwardFrom();
    setYear();
    setError();
    setPlaceholder(false);
    setEdit(null);
  };

  const handleAdd = () => {
    if (!award || !awardFrom || !year) {
      setError("Please Select Required Fields");
      return;
    }
    let value = formData;
    value.push({
      award: award,
      award_from: awardFrom,
      year: year,
    });
    setFormData(value);
    handleShow();
    setUpdate(true);
  };

  const handleEdit = (index) => {
    setShow(true);
    let data = formData;
    setAward(data[index].award);
    setAwardFrom(data[index].award_from);
    setYear(data[index].year);
    setEdit(index);
  };

  const handleUpdate = () => {
    if (!award || !awardFrom || !year) {
      setError("Please Select All Fields");
      return;
    }
    let value = formData;
    value[edit].award = award;
    value[edit].award_from = awardFrom;
    value[edit].year = year;
    setFormData(value);
    handleShow();
    setUpdate(true);
  };

  const handleChange = (type, e) => {
    if (type === "award") {
      setAward(e.target.value);
    }
    if (type === "awardFrom") {
      setAwardFrom(e.target.value);
    }

    if (type === "year") {
      setYear(e.value);
    }
  };

  const handleDelete = (index) => {
    let value = formData;
    const newValues = value.filter((item, key) => key !== index);
    setFormData(newValues);
    setUpdate(true);
  };

  return (
    <>
      <div className="meta-content-head">
        <h5>Certification</h5>
        <Link to="#">
          <p onClick={() => handleShow()}>{!show && "Add New"}</p>
        </Link>
      </div>
      <div className="meta-content-body">
        {show && (
          <div className="form-wrapper">
            <input
              className="form-input education-input"
              name="award"
              type="text"
              placeholder="Certificate Or Award"
              value={award}
              onChange={(e) => handleChange("award", e)}
            />
            <input
              className="form-input education-input"
              name="awardFrom"
              type="text"
              placeholder="Certified From (E.G. Adobe)"
              value={awardFrom}
              onChange={(e) => handleChange("awardFrom", e)}
            />
            <CustomSelect
              name="year"
              type="year"
              value={year}
              handleChange={handleChange}
              options={optionsYear}
              placeholder="Year"
            />
            <Buttons
              formData={formData}
              setShow={setShow}
              edit={edit}
              active={active}
              handleUpdate={handleUpdate}
              handleAdd={handleAdd}
            />
          </div>
        )}
        <>
          <div>{error && <span className={`error-message`}>{error}</span>}</div>
          <DataTable
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            formData={formData}
          />
          <UpdateButton update={update} onSubmit={onSubmit} />
        </>
      </div>
    </>
  );
};

export default NewEditCertification;

const CustomSelect = ({
  name,
  value,
  type,
  options,
  handleChange,
  placeholder,
}) => {
  return (
    <>
      <Select
        name={name}
        options={options}
        placeholder={placeholder}
        value={value ? { value: value, label: value } : null}
        onChange={(e) => handleChange(type, e)}
      />
    </>
  );
};

const DataTable = ({ formData, handleEdit, handleDelete }) => {
  return (
    <>
      {formData?.map((item, index) => (
        <div className="content-level" key={index}>
          <p>{item.award}</p>
          <br />
          <span>
            {item.award_from}, {item.year}
          </span>
          <div className="ml-2 edit-delete-icons">
            <Brush onClick={() => handleEdit(index)} title="Edit" />
            {formData?.length > 1 ? (
              <Trash
                className="ml-2"
                onClick={() => handleDelete(index)}
                title="Delete"
              />
            ) : null}
          </div>
        </div>
      ))}
    </>
  );
};

const Buttons = ({ setShow, edit, active, handleUpdate, handleAdd }) => {
  return (
    <div className="buttons">
      <div
        className="btn-lrg-standard btn-white cancel"
        value="Cancel"
        onClick={() => setShow(false)}
      >
        Cancel
      </div>
      {edit !== null ? (
        <button
          type="button"
          className={`btn-lrg-standard add ${active ? "incomplete" : ""}`}
          onClick={() => handleUpdate()}
          disabled={active}
        >
          Edit
        </button>
      ) : (
        <button
          type="button"
          className={`btn-lrg-standard add ${active ? "incomplete" : ""}`}
          onClick={() => handleAdd()}
          disabled={active}
        >
          Add
        </button>
      )}
    </div>
  );
};

const UpdateButton = ({ update, up, onSubmit }) => {
  return (
    <>
      {(update || up) && (
        <div className="submit-button">
          <button
            type="submit"
            className="btn-lrg-standard add"
            value="Update"
            onClick={() => onSubmit()}
          >
            Update
          </button>
        </div>
      )}
    </>
  );
};
