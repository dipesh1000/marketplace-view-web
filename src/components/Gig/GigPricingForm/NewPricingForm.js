import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "../../common/form/useForm";
import "./style/GigPricing.scss";
import { Field, getIn } from "formik";
import ExtraServiceItem from "./components/ExtraServiceItem";
import ExtraPackageItem from "./components/ExtraPackageItem";
import ExtraPriceList from "./components/ExtraPriceList";
import ExtraHidden from "./components/ExtraHidden";
import { makeStyles } from "@material-ui/core";
import FocusError from "../../../utils/FocusError";

const deliveryOptions = [
  { value: "1 Day Delivery", id: "1" },
  { value: "2 Days Delivery", id: "2" },
  { value: "3 Days Delivery", id: "3" },
  { value: "4 Days Delivery", id: "4" },
  { value: "5 Days Delivery", id: "5" },
  { value: "6 Days Delivery", id: "6" },
  { value: "7 Days Delivery", id: "7" },
];

const shippingOptions = [
  { value: "1 Day", id: "1" },
  { value: "2 Days", id: "2" },
  { value: "3 Days", id: "3" },
  { value: "4 Days", id: "4" },
  { value: "5 Days", id: "5" },
  { value: "6 Days", id: "6" },
  { value: "7 Days", id: "7" },
];

const optionsExtra = [
  { value: "1", id: "1" },
  { value: "2", id: "2" },
  { value: "3", id: "3" },
  { value: "4", id: "4" },
  { value: "5", id: "5" },
  { value: "6", id: "6" },
  { value: "7", id: "7" },
];

const useStyles = makeStyles({
  temporaryTable: {
    tableLayout: "auto !important",
  },
});
function NewGigPricingForm({
  initialValues,
  validationSchema,
  categoryPackageMeta,
  onSubmit,
  allPackages,
  priceLimit,
  singleGig,
}) {
  const {
    formik,
    CustomForm,
    CustomHiddenInput,
    CustomTextarea,
    CustomSelect,
    CustomCheckbox,
    CustomInput,
  } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const classes = useStyles();
  // eslint-disable-next-line
  const [active, setActive] = useState("active");
  const activeRef = useRef();
  const handleActive = (e, form) => {
    let oldVal = form.values.hasMultiplePackage;
    if (oldVal) {
      toggleInactive([activeRef.current, e.target]);
    } else {
      toggleActive([activeRef.current, e.target]);
    }
    form.setFieldValue("hasMultiplePackage", !oldVal);
    form.setFieldValue("package[0]['status']", 1);
    form.setFieldValue("package[1]['status']", oldVal ? 0 : 1);
    form.setFieldValue("package[2]['status']", oldVal ? 0 : 1);
  };

  const toggleActive = (targets = []) => {
    // eslint-disable-next-line
    targets.map((el) => {
      el.classList.remove("inactive");
      el.classList.remove("active");
    });
  };

  const toggleInactive = (targets = []) => {
    // eslint-disable-next-line
    targets.map((el) => {
      el.classList.remove("active");
      el.classList.remove("inactive");
    });
  };
  const handleChange = (e, index, form) => {
    form.setFieldValue(e.target.name, e.target.value);
  };

  const handleCheck = (e, index, form) => {
    form.setFieldValue(e.target.name, e.target.checked ? "on" : "off");
  };

  const validateForBasic = (value) => {
    let error;
    if (!value) {
      error = "Pricing  is required";
    } else if (value < priceLimit?.min_price) {
      error = "Price must be greater than $10";
    }
    return error;
  };
  const validateForOthers = (value) => {
    let error;
    if (!value && activeRef.current.classList.contains("active")) {
      error = "Pricing  is required";
    } else if (
      value < priceLimit?.min_price &&
      activeRef.current.classList.contains("active")
    ) {
      error = "Price must be greater than $10";
    }
    return error;
  };
  const validateForBasicDelivery = (value) => {
    let error;
    if (!value) {
      error = "Required";
    }
    return error;
  };
  const validateForOthersDelivery = (value) => {
    let error;
    if (!value && activeRef.current.classList.contains("active")) {
      error = "Pricing  is required";
    }
    return error;
  };

  return (
    <div className="pricing">
      <CustomForm>
        <FocusError />
        <div className="gig-header">
          <div className="title">Scope & Pricing</div>
          <div className="slide-btn">
            Switch Packages
            <Field>
              {({ field, form, meta, name }) => (
                <>
                  <span
                    value={form.values.hasMultiplePackage}
                    className={`fake-toggle ${
                      form.values.hasMultiplePackage ? "active" : "inactive"
                    }`}
                    onClick={(e) => handleActive(e, form)}
                  ></span>
                </>
              )}
            </Field>
          </div>
        </div>
        <div className="sub-title">Packages</div>

        <div className="pricing-wrapper">
          <Field>
            {({ field, form, meta, name }) => (
              <div
                className={`use-three-package ${
                  form?.values?.hasMultiplePackage ? "active" : "inactive"
                } `}
                data-active={form?.values?.hasMultiplePackage}
                ref={activeRef}
              >
                <div className="use-title">
                  Unlock your potential revenue with all 3 packages
                </div>
                <Button
                  onClick={(e) => handleActive(e, form)}
                  type="button"
                  className="use-button"
                >
                  Try Now
                </Button>
                <h4>Switch Packages Now.</h4>
              </div>
            )}
          </Field>
          <table className={`packages-type-table ${classes.temporaryTable}`}>
            <thead>
              <tr>
                <th className="first-table-col"></th>
                {allPackages?.map((list) => (
                  <th key={list.id} key={list.id}>
                    {list.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="textarea-wrapper">
                <td className="first-table-col"></td>
                <td>
                  <CustomTextarea
                    validate={validateForBasic}
                    errorname="Title"
                    className="package-textarea-title"
                    name="package[0]['title']"
                    placeholder="Name your package"
                  />
                </td>
                <>
                  <td>
                    <CustomTextarea
                      validate={validateForOthers}
                      errorname="Title"
                      className="package-textarea-title"
                      name="package[1]['title']"
                      placeholder="Name your package"
                    />
                  </td>
                  <td>
                    <CustomTextarea
                      validate={validateForOthers}
                      className="package-textarea-title"
                      name="package[2]['title']"
                      placeholder="Name your package"
                    />
                  </td>
                </>
              </tr>
              <tr className="textarea-wrapper">
                <td className="first-table-col"></td>
                <td>
                  <CustomTextarea
                    validate={validateForBasic}
                    errorname="Description"
                    className="package-textarea-description"
                    name="package[0]['description']"
                    placeholder="Describe the details of your offering"
                  />
                </td>
                <>
                  <td>
                    <CustomTextarea
                      validate={validateForOthers}
                      errorname="Description"
                      className="package-textarea-description"
                      name="package[1]['description']"
                      placeholder="Describe the details of your offering"
                    />
                  </td>
                  <td>
                    <CustomTextarea
                      validate={validateForOthers}
                      errorname="Description"
                      className="package-textarea-description"
                      name="package[2]['description']"
                      placeholder="Describe the details of your offering"
                    />
                  </td>
                </>
              </tr>
              <tr>
                <td className="first-table-col"></td>
                <td>
                  <Field
                    component={SelectDelivery}
                    validate={validateForBasicDelivery}
                    errorname="Delivery Days"
                    name="package[0]['delivery_duration']"
                    title="Delivery Time"
                    className="form-control"
                    index={0}
                    options={deliveryOptions}
                    label="Delivery Time"
                  />
                </td>
                <>
                  <td>
                    <Field
                      component={SelectDelivery}
                      validate={validateForOthersDelivery}
                      errorname="Delivery Days"
                      name="package[1]['delivery_duration']"
                      title="Delivery Time"
                      className="form-control"
                      index={1}
                      options={deliveryOptions}
                      label="Delivery Time"
                    />
                  </td>
                  <td>
                    <Field
                      component={SelectDelivery}
                      validate={validateForOthersDelivery}
                      errorname="Delivery Days"
                      name="package[2]['delivery_duration']"
                      title="Delivery Time"
                      className="form-control"
                      index={2}
                      options={deliveryOptions}
                      label="Delivery Time"
                    />
                  </td>
                </>
              </tr>
            </tbody>
          </table>
          <table className="packages-pricing-factors">
            <tbody>
              <tr>
                <td className="first-table-col">Revisions</td>
                <td>
                  <CustomSelect
                    title="Select Total"
                    name={`package[0]['revision']`}
                    options={optionsExtra}
                  />
                </td>
                <td>
                  <CustomSelect
                    title="Select Total"
                    name={`package[1]['revision']`}
                    options={optionsExtra}
                  />
                </td>
                <td>
                  <CustomSelect
                    title="Select Total"
                    name={`package[2]['revision']`}
                    options={optionsExtra}
                  />
                </td>
              </tr>
              {singleGig?.category?.has_shipping ? (
                <tr>
                  <td className="first-table-col">Shipping</td>
                  <td>
                    <Field
                      component={SelectShipping}
                      validate={validateForOthersDelivery}
                      errorname="Shipping Days"
                      name="package[0]['shipping_days']"
                      title="Shipping"
                      className="form-control"
                      index={0}
                      options={shippingOptions}
                      label="Shipping Days"
                    />
                  </td>
                  <td>
                    <Field
                      component={SelectShipping}
                      validate={validateForOthersDelivery}
                      errorname="Shipping Days"
                      name="package[1]['shipping_days']"
                      title="Shipping"
                      className="form-control"
                      index={1}
                      options={shippingOptions}
                      label="Shipping Days"
                    />
                  </td>
                  <td>
                    <Field
                      component={SelectShipping}
                      validate={validateForOthersDelivery}
                      errorname="Shipping Days"
                      name="package[2]['shipping_days']"
                      title="Shipping Time"
                      className="form-control"
                      index={2}
                      options={shippingOptions}
                      label="Shipping Days"
                    />
                  </td>
                </tr>
              ) : null}

              {categoryPackageMeta &&
                categoryPackageMeta.map((item, index) => (
                  <tr key={item.id}>
                    <td className="first-table-col">{item.title}</td>
                    <td>
                      <CustomHiddenInput
                        name={`package[0]['metas'][${index}]['meta_id']`}
                        value={item.id}
                      />
                      {item.selection_type === "Checkbox" && (
                        <Field
                          component={PackageCheckBox}
                          label={`package[0]['metas'][${index}]['value']`}
                          index={index}
                          pIndex={0}
                          handleCheck={handleCheck}
                        />
                      )}
                      {item.selection_type === "Select" && (
                        <Field
                          component={SelectPackageMeta}
                          label={`package[0]['metas'][${index}]['value']`}
                          title="Select"
                          handleChange={handleChange}
                          option={item.value?.map((list, index) => ({
                            id: index,
                            value: list,
                          }))}
                          index={index}
                          pIndex={0}
                        />
                      )}
                    </td>
                    <>
                      <td>
                        <CustomHiddenInput
                          name={`package[1]['metas'][${index}]['meta_id']`}
                          value={item.id}
                        />
                        {item.selection_type === "Checkbox" && (
                          <Field
                            component={PackageCheckBox}
                            label={`package[1]['metas'][${index}]['value']`}
                            index={index}
                            pIndex={1}
                            handleCheck={handleCheck}
                          />
                        )}
                        {item.selection_type === "Select" && (
                          <Field
                            component={SelectPackageMeta}
                            label={`package[1]['metas'][${index}]['value']`}
                            title="Select"
                            handleChange={handleChange}
                            option={item.value?.map((list, index) => ({
                              id: index,
                              value: list,
                            }))}
                            index={index}
                            pIndex={1}
                          />
                        )}
                      </td>
                      <td>
                        <CustomHiddenInput
                          name={`package[2]['metas'][${index}]['meta_id']`}
                          value={item.id}
                        />
                        {item.selection_type === "Checkbox" && (
                          <Field
                            component={PackageCheckBox}
                            label={`package[2]['metas'][${index}]['value']`}
                            index={index}
                            pIndex={2}
                            handleCheck={handleCheck}
                          />
                        )}
                        {item.selection_type === "Select" && (
                          <Field
                            component={SelectPackageMeta}
                            label={`package[2]['metas'][${index}]['value']`}
                            title="Select"
                            handleChange={handleChange}
                            option={item.value?.map((list, index) => ({
                              id: index,
                              value: list,
                            }))}
                            index={index}
                            pIndex={2}
                          />
                        )}
                      </td>
                    </>
                  </tr>
                ))}

              <tr>
                <td className="first-table-col">Price</td>
                <td>
                  <CustomInput
                    validate={validateForBasic}
                    errorname="Price"
                    type="number"
                    addon="$"
                    min="0"
                    name="package[0]['price']"
                  />
                </td>
                <>
                  <td>
                    <CustomInput
                      validate={validateForOthers}
                      errorname="Price"
                      type="number"
                      addon="$"
                      min="0"
                      name="package[1]['price']"
                    />
                  </td>
                  <td>
                    <CustomInput
                      validate={validateForOthers}
                      errorname="Price"
                      type="number"
                      addon="$"
                      min="0"
                      name="package[2]['price']"
                    />
                  </td>
                </>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="sub-title">Add Extra Services</div>
        <Field
          component={ExtraPriceList}
          CustomInput={CustomInput}
          CustomSelect={CustomSelect}
          active={active}
        />
        {categoryPackageMeta
          ?.filter((list) => list.is_extra_service && list.has_package_price)
          ?.map((item, index) => (
            <div className="extra-pricing-factor-list" key={item?.id}>
              <Field
                component={ExtraPackageItem}
                index={index}
                active={active}
                item={item}
                CustomInput={CustomInput}
                CustomHiddenInput={CustomHiddenInput}
                CustomSelect={CustomSelect}
                allPackages={allPackages}
              />
            </div>
          ))}
        {categoryPackageMeta
          ?.filter((list) => list.is_extra_service && !list.has_package_price)
          ?.map((item, index) => (
            <div className="extra-pricing-factor-list" key={index}>
              <Field
                component={ExtraServiceItem}
                formik={formik}
                item={item}
                index={index}
                CustomHiddenInput={CustomHiddenInput}
                options={deliveryOptions}
                CustomInput={CustomInput}
                CustomSelect={CustomSelect}
                CustomCheckbox={CustomCheckbox}
              />
            </div>
          ))}
        <Field
          component={ExtraHidden}
          CustomSelect={CustomSelect}
          CustomInput={CustomInput}
          options={deliveryOptions}
        />

        <div className="d-flex justify-content-between mt-4">
          <Link to="/users/seller_dashboard/gigs" className="custom-btn cancel">
            Cancel
          </Link>
          <Field>
            {({ form }) => (
              <button type="submit" className="custom-btn successBtn">
                Save & Continue
              </button>
            )}
          </Field>
        </div>
      </CustomForm>
    </div>
  );
}

export default React.memo(NewGigPricingForm);

const SelectDelivery = ({
  label,
  title,
  handleChange,
  value,
  index = null,
  form,
  options,
  errorname,
  field,
  ...props
}) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <Form.Group controlId="exampleForm.ControlSelect1" {...field}>
      <Form.Control isInvalid={!!errorText} as="select" {...props} {...field}>
        <option value="">{label}</option>
        {options.map((opt) => (
          <option value={opt.id} key={opt.id}>
            {opt.value}
          </option>
        ))}
      </Form.Control>
      <div
        className="errors"
        style={{
          color: "#f53e3e",
          fontSize: "12px",
          transform: "translateY(-15px)",
        }}
      >
        {/* {errorText && errorname ? `${errorname} is required` : errorText} */}
      </div>
    </Form.Group>
  );
};

const SelectShipping = ({
  label,
  title,
  handleChange,
  value,
  index = null,
  form,
  options,
  errorname,
  field,
  ...props
}) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <Form.Group controlId="exampleForm.ControlSelect1" {...field}>
      <Form.Control isInvalid={!!errorText} as="select" {...props} {...field}>
        <option value="0">{label}</option>
        {options.map((opt) => (
          <option value={opt.id} key={opt.id}>
            {opt.value}
          </option>
        ))}
      </Form.Control>
      <div
        className="errors"
        style={{
          color: "#f53e3e",
          fontSize: "12px",
          transform: "translateY(-15px)",
        }}
      >
        {/* {errorText && errorname ? `${errorname} is required` : errorText} */}
      </div>
    </Form.Group>
  );
};

const SelectPackageMeta = ({
  label,
  title,
  handleChange,
  index,
  form,
  option,
  pIndex,
}) => {
  return (
    <select
      name={label}
      title={title}
      onChange={(e) => handleChange(e, index, form)}
      className="form-control"
      value={form?.values?.package[pIndex]?.metas[index]?.value}
    >
      <option value="" className="p-1">
        Select
      </option>
      {option.map((opt, index) => (
        <option value={opt.value} key={index} className="p-1">
          {opt.value}
        </option>
      ))}
    </select>
  );
};

const PackageCheckBox = ({ label, form, index, pIndex, handleCheck }) => {
  return (
    <input
      type="checkbox"
      name={label}
      defaultChecked={
        form?.values?.package[pIndex]?.metas[index]?.value === "on"
          ? true
          : false
      }
      onChange={(e) => handleCheck(e, index, form)}
    />
  );
};
