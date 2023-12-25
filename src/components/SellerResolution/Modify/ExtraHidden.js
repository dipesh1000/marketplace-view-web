import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

const ExtraHidden = ({ CustomTextarea, form, extra_services }) => {
  const count = extra_services?.length > 0 ? false : true;
  const [checked, setChecked] = useState(count);
  const handleChange = (e) => {
    form.setFieldValue(e.target.name, e.target.value);
  };
  const handleCheck = (e) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      form.setFieldValue("custom_extra_services", [
        {
          checkExtra: e.target.checked,
          title: "",
          extra_price: "",
          extra_value: "",
        },
      ]);
    } else {
      form.setFieldValue("custom_extra_services", []);
    }
  };
  return (
    <>
      <div className="add-gig-extra-hidden">
        <div className="first-line">
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              defaultChecked={count}
              onChange={handleCheck}
              disabled={count}
              name="custom_extra_services[0].checkExtra"
            />
          </div>
          {checked ? (
            <CustomTextarea
              name="custom_extra_services[0].title"
              rows={2}
              placeholder="I will"
            />
          ) : (
            "Add other Modification"
          )}
        </div>
        {checked && (
          <div className="third-line">
            <div className="title">For an extra</div>
            <div className="extra-list-inline">
              <div className="extra-detail">
                <InputGroup>
                  <Form.Control
                    type="text"
                    min="3"
                    max="20"
                    placeholder="$"
                    name="custom_extra_services[0].extra_price"
                    onChange={handleChange}
                  />
                </InputGroup>
                <span className="second-label">$ and an additional</span>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Control
                    as="select"
                    name="custom_extra_services[0].extra_value"
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {[...Array(10).keys()].map((index) => (
                      <option value={index + 1} key={index}>
                        {index + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <span className="third-label"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <div className="add-gig-extra">
        <div className="title" onClick={handleExtraHidden}>
          <i className="fa fa-plus"></i> Add Gig Extra
        </div>
      </div> */}
    </>
  );
};

export default ExtraHidden;
