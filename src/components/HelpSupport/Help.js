import React, { useState, useEffect } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useForm } from "../common/form/useForm";
import { useSelector, useDispatch } from "react-redux";
import { Field } from "formik";
import * as Yup from "yup";
import "./styles/styles.scss";
import { createHelpInfo, fetchHelpInfo } from "./redux/Action";
import { serialize } from "object-to-formdata";
import ButtonSpinner from "../common/ButtonSpinner/ButtonSpinner";
import useTitle from "../../utils/useTitle";

const Help = () => {
  const dispatch = useDispatch();
  const { help } = useSelector((state) => state.help);
  const history = useHistory();
  const location = useLocation();
  let orderId = location?.state?.orderId;
  useTitle("Fuchas - Help & Support");

  useEffect(() => {
    dispatch(fetchHelpInfo());
  }, [dispatch]);
  const initialValues = {
    subject: "",
    support_id: "",
    description: "",
    order_id: orderId || null,
  };
  const validationSchema = Yup.object({
    subject: Yup.string().required(),
    // support_id: Yup.number().required(),
    description: Yup.string().required(),
    // order_id: Yup.string().required(),
    // attachments: Yup.mixed()
    // 	.required()
    // 	.test("fileSize", "File too large", value => {
    // 		return value && value[0]?.size <= 1000000;
    // 	}),
  });
  const onSubmit = (values) => {
    const options = {
      indices: true,
    };
    const formData = serialize(
      values,
      options // optional
    );
    dispatch(createHelpInfo(formData));
    history.replace({
      pathname: "/support_tickets/new",
      state: { orderId: "" },
    });
  };
  const handleSubjectChange = (form, e) => {
    form.setFieldValue("reason", e.target.value);
  };
  const handleIssueChange = (form, e) => {
    form.setFieldValue("support_id", e.target.value);
  };

  const { CustomTextarea, CustomInput, CustomForm, CustomUpload } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <CustomForm>
      <div className="help-support ">
        <header className="help-support-header">
          <h1 className="title">Help &amp; Support</h1>
        </header>
        <div className="submit-request">
          <div className="form-title">
            <h2 className="subtitle">Submit a Request</h2>
            <NavLink to="/users/edit/account">
              <span className="wide-link">My Activities</span>
            </NavLink>
          </div>
          <label className="form-label">What can we help you with?</label>
          <Field
            name="reason"
            component={CustomSelectSubject}
            CustomInput={CustomInput}
            className="online-status"
            handleChange={handleSubjectChange}
            help={help}
            orderId={orderId}
          />
          <Field
            name="support_id"
            component={CustomSelectIssue}
            className="online-status"
            handleChange={handleIssueChange}
            CustomInput={CustomInput}
            orderId={orderId}
            help={help}
          />
          <Field
            component={FormCheck}
            CustomUpload={CustomUpload}
            CustomInput={CustomInput}
            CustomTextarea={CustomTextarea}
            help={help}
          />
        </div>
      </div>
    </CustomForm>
  );
};

export default Help;

const CustomSelectSubject = ({
  handleChange,
  form,
  help,
  orderId,
  CustomInput,
}) => {
  return (
    <>
      <select
        className="select-subject"
        onChange={(e) => handleChange(form, e)}
        defaultValue="Subject"
      >
        <option value="Subject" disabled>
          Select the relevant subject
        </option>
        {orderId
          ? help?.data?.helpsupports?.map((help) => {
              if (help.has_orderid === 1)
                return (
                  <option className="show_option" value={help.id} key={help.id}>
                    {help.title}
                  </option>
                );
              else return null;
            })
          : help?.data?.helpsupports.map((help) => (
              <option className="show_option" value={help.id} key={help.id}>
                {help.title}
              </option>
            ))}
      </select>
    </>
  );
};

const CustomSelectIssue = ({
  handleChange,
  form,
  help,
  CustomInput,
  orderId,
}) => {
  const [show, setShow] = useState(true);
  const found = help?.data?.helpsupports?.find(
    (element) => element?.id === parseInt(form.values["reason"])
  );
  useEffect(() => {
    if (form.values["reason"]) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [form.values]);
  return (
    show && (
      <>
        {help?.data?.helpsupports?.map((help) => {
          if (
            help.id === parseInt(form.values["reason"]) &&
            help.has_orderid === 1
          )
            return (
              <div className="form-subject" key={help?.id}>
                <label>Order ID</label>
                <CustomInput
                  className="form-input"
                  name="order_id"
                  type="text"
                  disabled={orderId ? true : false}
                />
              </div>
            );
          else return null;
        })}
        {found?.child?.length ? (
          <>
            {/* eslint-disable-next-line*/}
            {help?.data?.helpsupports?.map((help) => {
              if (help.id === parseInt(form.values["reason"]))
                return (
                  <label className="form-label" key={help?.id}>
                    {help.child_label}
                  </label>
                );
            })}
            <select
              className="select-subject"
              onChange={(e) => handleChange(form, e)}
              defaultValue="Issue"
            >
              <option value="Issue" disabled>
                Issue...
              </option>
              {help?.data?.helpsupports
                ?.filter((help) => {
                  return help.id === parseInt(form.values["reason"]);
                })[0]
                ?.child?.map((item) => {
                  return (
                    <option
                      className="show_option"
                      value={item.id}
                      key={item.id}
                    >
                      {item.title}
                    </option>
                  );
                })}
            </select>
          </>
        ) : (
          ""
        )}
      </>
    )
  );
};

const FormCheck = ({
  form,
  CustomInput,
  CustomTextarea,
  CustomUpload,
  help,
}) => {
  const { postLoading } = useSelector((state) => state.checkout);

  const found = help?.data?.helpsupports?.find(
    (element) => element?.id === parseInt(form.values["reason"])
  );

  const [show, setShow] = useState(false);
  useEffect(() => {
    if (form.values["support_id"] || found?.child.length === 0) {
      setShow(true);
    } else {
      setShow(false);
    }
    // eslint-disable-next-line
  }, [form.values]);
  return (
    show && (
      <>
        <div className="form">
          <div className="form-subject">
            <label>Subject</label>
            <CustomInput className="form-input" name="subject" type="text" />
          </div>
          <div className="form-description">
            <label>Description</label>
            <CustomTextarea
              name="description"
              rows="6"
              className="form-input"
            />
          </div>
          <Field component={FileUpload} CustomUpload={CustomUpload} />
        </div>
        <div className="form-footer">
          <button type="submit" className="submit-button">
            {postLoading && <ButtonSpinner />}Submit Request
          </button>
          <p>
            <span>
              Please note that our current response time can take up to 12
              hours, however, we promise to do our best to respond sooner! For
              this reason, please don’t submit multiple support requests for the
              same issue. Instead, you can add any extra information to your
              existing ticket through{" "}
              <NavLink to="/users/edit/account">
                <span className="wide-link">My Activities</span>
              </NavLink>
              .
            </span>
          </p>
        </div>
      </>
    )
  );
};

const FileUpload = ({ form, CustomUpload }) => {
  let fileCount = form.values?.attachments?.length || 0;

  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [show]);

  const handleDelete = (count) => {
    form.setFieldValue(
      `attachments`,
      form.values?.attachments?.filter((item, index) => index !== count)
    );
  };
  function bytesToSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    var k = 1024,
      dm = 2,
      sizes = ["Bytes", "KB", "MB"],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return (
    <>
      <div className="form-attachment">
        <label>
          Attachments <span>Optional</span>
        </label>
        <CustomUpload name={`attachments[${fileCount}]`}>
          <div className="add-file">
            <i className="fas fa-paperclip"></i>
            <span>Add File</span>
          </div>
        </CustomUpload>
      </div>

      {form.values?.attachments?.map((item, index) => (
        <div className="upload-container solid" key={index}>
          {item.size > 5000000 ? (
            <p className="error">Max file size : 5 MB</p>
          ) : (
            <div className="name overrideHelp">
              <i className="far fa-check-circle"></i>
              <div className="file-info">
                <strong>{item.name}</strong>
                <small>{bytesToSize(item.size)}</small>
              </div>
            </div>
          )}
          <div className="delete">
            <i
              className="fa fa-trash-alt"
              onClick={() => handleDelete(index)}
            ></i>
          </div>
        </div>
      ))}
    </>
  );
};
