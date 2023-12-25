import { ErrorMessage } from 'formik';
import React, { useState, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

const ExtraHidden = ({ form, CustomInput, CustomSelect, options }) => {
  const [extraHidden, setExtraHidden] = useState(0);

  const handleExtraHidden = () => {
    if (extraHidden < 2) {
      setExtraHidden((prev) => prev + 1);
    }
  };
  const handleChange = (e) => {
    form.setFieldValue(e.target.name, e.target.value);
  };
  const handleDelete = (index) => {
    let extraService = form.values.custom_extra_services;
    extraService.splice(index, 1);
    setExtraHidden((prev) => prev - 1);
    form.setFieldValue('custom_extra_services', extraService);
  };
  useEffect(() => {
    setExtraHidden(form.values.custom_extra_services.length);
  }, [form.values.custom_extra_services]);
  return (
    <>
      {extraHidden
        ? [...Array(extraHidden)]?.map((val, index) => (
            <div className="add-gig-extra-hidden" key={index}>
              <div className="first-line">
                <div className="title-wrapper">
                  <Trash className="ml-2" onClick={() => handleDelete(index)} />
                  <div className="extra-title">Title</div>
                </div>
                <div className="counter-input">
                  <InputGroup>
                    <Form.Control
                      name={`custom_extra_services[${index}]['title']`}
                      value={form?.values?.custom_extra_services[index]?.title}
                      type="text"
                      min="3"
                      max="20"
                      placeholder="Title your extra service"
                      onChange={(e) => handleChange(e)}
                    />
                    <ErrorMessage
                      name={`custom_extra_services[${index}]['title']`}
                    />
                  </InputGroup>
                </div>
                <div className="counter">
                  <span>
                    {form?.values?.custom_extra_services[index]?.title
                      ?.length || 0}
                    /20 max
                  </span>
                </div>
              </div>
              <div className="second-line">
                <div className="title">Description</div>
                <div className="description-input">
                  <InputGroup>
                    <Form.Control
                      name={`custom_extra_services[${index}]['description']`}
                      value={
                        form?.values?.custom_extra_services[index]?.description
                      }
                      type="text"
                      min="3"
                      max="20"
                      placeholder="Describe your service"
                      onChange={(e) => handleChange(e)}
                    />
                  </InputGroup>
                  <ErrorMessage
                    name={`custom_extra_services[${index}]['description']`}
                    className="error-message"
                  />
                </div>
              </div>
              <div className="third-line">
                <div className="title">For an extra</div>
                <div className="extra-list-inline">
                  <div className="extra-detail">
                    <InputGroup>
                      <Form.Control
                        name={`custom_extra_services[${index}]['extra_price']`}
                        value={
                          form?.values?.custom_extra_services[index]
                            ?.extra_price
                        }
                        type="text"
                        min="3"
                        max="20"
                        placeholder="$"
                        onChange={(e) => handleChange(e)}
                      />
                    </InputGroup>
                    <ErrorMessage
                      name={`custom_extra_services[${index}]['extra_price']`}
                    />
                    <span className="second-label">
                      $ &nbsp;&nbsp; and an additional
                    </span>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Control
                        as="select"
                        name={`custom_extra_services[${index}]['additional_day']`}
                        value={
                          form?.values?.custom_extra_services[index]
                            ?.additional_day
                        }
                        onChange={(e) => handleChange(e)}
                      >
                        <option value="">Select</option>
                        {options &&
                          options.map((option, index) => (
                            <option key={index} value={option.id}>
                              {option.value}
                            </option>
                          ))}
                      </Form.Control>
                    </Form.Group>
                    <ErrorMessage
                      name={`custom_extra_services[${index}]['additional_day']`}
                    />
                    <span className="third-label"></span>
                  </div>
                </div>
              </div>
            </div>
          ))
        : null}
      {extraHidden < 2 && (
        <div className="add-gig-extra">
          <div className="title" onClick={handleExtraHidden}>
            <i className="fa fa-plus"></i> Add Gig Extra
          </div>
        </div>
      )}
    </>
  );
};

export default ExtraHidden;
